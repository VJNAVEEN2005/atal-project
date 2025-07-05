import axios from "axios";
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/api";
import { Link } from "lucide-react";
import { Button } from "bootstrap";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
    // Convert the password string to a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Generate hash using SHA-256
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
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

      setIsLoading(true);
      setError("");

      try {
        // Hash the password before sending
        const hashedPassword = await hashPassword(formData.password);

        const response = await axios.post(`${api.web}api/v1/login`, {
          email: formData.email,
          password: hashedPassword,
          isHashed: true, // Flag to inform backend that password is already hashed
        });

        const { data } = response;

        if (data.success) {
          localStorage.setItem("token", data.token);

          console.log("User data stored in localStorage:", {
            userId: data.user._id,
            userName: data.user.email,
            token: data.token,
            isLogin: true,
          });

          // Check if user is admin
          if (data.user.admin === 1) {
            localStorage.setItem("isAuthenticated", 1);
          } else if (data.user.admin === 2) {
            localStorage.setItem("isAuthenticated", 2);
          }

          // Remember me functionality
          if (formData.rememberMe) {
            // You could store a token with longer expiry or set a flag
            localStorage.setItem("rememberUser", formData.email);
          } else {
            localStorage.removeItem("rememberUser");
          }

          // Redirect to homepage

          window.location.href = "/";
        } else {
          setError(data.message || "Login failed");
        }
      } catch (err) {
        console.error("Login error:", err);
        setError(err.response?.data?.message || "Invalid credentials");
      } finally {
        setIsLoading(false);
      }
    },
    [formData, navigate]
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

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700"
              placeholder="Enter your password"
              required
            />
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
            className="ml-auto text-[#3f6197] font-medium hover:underline focus:outline-none">
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
