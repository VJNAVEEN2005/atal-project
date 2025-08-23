import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/api";
import { Link } from "lucide-react";
import { notifications } from "@mantine/notifications";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Load remembered user email on component mount
  useEffect(() => {
    const loadRememberedUser = () => {
      try {
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        if (rememberedEmail) {
          setFormData(prev => ({
            ...prev,
            email: rememberedEmail,
            rememberMe: true,
          }));
        }
      } catch (error) {
        console.error("Error loading remembered email:", error);
        localStorage.removeItem("rememberedEmail");
      }
    };

    loadRememberedUser();
  }, []);

  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  // Password hashing function using browser's Web Crypto API
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  // Handle remember me functionality
  const handleRememberMe = (email, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
  };

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      
      // Form validation
      if (!formData.email || !formData.password) {
        setError("Please fill in all required fields");
        return;
      }
      
      notifications.show({
        id: "login-processing",
        title: "Processing Login",
        message: "Please wait while we log you in...",
        color: "blue",
        loading: true,
        icon: <Link size={20} />,
      });
      
      setIsLoading(true);
      setError("");
      
      try {
        // Hash the password before sending
        const hashedPassword = await hashPassword(formData.password);
        const response = await axios.post(`${api.web}api/v1/login`, {
          email: formData.email,
          password: hashedPassword,
          isHashed: true,
        });
        
        const { data } = response;
        if (data.success) {
          // Store authentication token
          localStorage.setItem("token", data.token);

          // Store user data
          const userDataForStorage = {
            userId: data.user._id,
            userName: data.user.email,
            token: data.token,
            isLogin: true,
            loginTime: new Date().toISOString(),
          };

          localStorage.setItem("userData", JSON.stringify(userDataForStorage));

          // Handle remember me functionality
          handleRememberMe(formData.email, formData.rememberMe);

          notifications.update({
            id: "login-processing",
            title: "Login Successful",
            message: "You have successfully logged in.",
            color: "green",
            loading: false,
            icon: <Link size={20} />,
          });

          // Redirect to homepage
          window.location.href = "/";
        } else {
          setError(data.message || "Login failed");
          notifications.update({
            id: "login-processing",
            title: "Login Failed",
            message: data.message || "Invalid credentials. Please try again.",
            color: "red",
            loading: false,
            icon: <Link size={20} />,
          });
        }
      } catch (err) {
        console.error("Login error:", err);
        const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
        
        notifications.update({
          id: "login-processing",
          title: "Login Error",
          message: errorMessage,
          color: "red",
          loading: false,
          icon: <Link size={20} />,
        });
        
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [formData]
  );

  // Navigate to signup page
  const navigateToSignup = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-[#3f6197] mb-6">
          Login
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700 pr-10"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform translate-y-1/2 text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 accent-[#3f6197]"
            />
            <label htmlFor="rememberMe" className="ml-2 text-gray-600">
              Remember me
            </label>

            <p
              onClick={() => navigate("/forgot-password")}
              className="ml-auto text-[#3f6197] font-medium hover:underline focus:outline-none cursor-pointer"
            >
              Forgot Password?
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition-colors duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#3f6197] hover:bg-[#2e4b78]"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={navigateToSignup}
            className="text-[#3f6197] font-medium hover:underline focus:outline-none"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;