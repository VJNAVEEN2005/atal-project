import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/api";
import { Link } from "lucide-react";
import { notifications } from "@mantine/notifications";
import { Eye, EyeOff, Bug, X } from "lucide-react";
import { sha256 } from 'js-sha256';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [debugInfo, setDebugInfo] = useState("");
  const [showDebug, setShowDebug] = useState(false);

  const navigate = useNavigate();

  // Enhanced debugging - Log API endpoint on component mount
  useEffect(() => {
    const debugData = {
      apiEndpoint: `${api.web}api/v1/login`,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      apiWebValue: api.web,
    };
    
    setDebugInfo(JSON.stringify(debugData, null, 2));
    console.log("Login Debug Info:", debugData);
  }, []);

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

  // Consistent password hashing function using js-sha256
  const hashPassword = (password) => {
    return sha256(password);
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
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        return;
      }
      
      setIsLoading(true);
      setError("");
      
      // Update debug info with request details
      const requestDebugInfo = {
        apiEndpoint: `${api.web}api/v1/login`,
        requestData: {
          email: formData.email,
          password: "••••••••", // Masked for security
          isHashed: true,
        },
        timestamp: new Date().toISOString(),
      };
      
      setDebugInfo(prev => prev + "\n\nRequest: " + JSON.stringify(requestDebugInfo, null, 2));
      
      notifications.show({
        id: "login-processing",
        title: "Processing Login",
        message: "Please wait while we log you in...",
        color: "blue",
        loading: true,
        icon: <Link size={20} />,
        autoClose: false,
      });
      
      try {
        // Hash the password before sending - using consistent method
        const hashedPassword = hashPassword(formData.password);
        
        console.log("Making login request to:", `${api.web}api/v1/login`);
        
        // Add debug info about the hash
        setDebugInfo(prev => prev + `\nPassword hash: ${hashedPassword.substring(0, 10)}...`);
        
        const response = await axios.post(`${api.web}api/v1/login`, {
          email: formData.email,
          password: hashedPassword,
          isHashed: true,
        }, {
          timeout: 10000, // 10 second timeout
          headers: {
            'Content-Type': 'application/json',
          }
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

          // Update debug info with response
          setDebugInfo(prev => prev + "\n\nResponse: " + JSON.stringify({
            success: data.success,
            userId: data.user._id,
            timestamp: new Date().toISOString(),
          }, null, 2));

          notifications.update({
            id: "login-processing",
            title: "Login Successful",
            message: "You have successfully logged in.",
            color: "green",
            loading: false,
            autoClose: 3000,
            icon: <Link size={20} />,
          });

          // Redirect to homepage after a brief delay
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          setError(data.message || "Login failed");
          
          // Update debug info with error
          setDebugInfo(prev => prev + "\n\nError: " + JSON.stringify({
            message: data.message,
            success: data.success,
            timestamp: new Date().toISOString(),
          }, null, 2));
          
          notifications.update({
            id: "login-processing",
            title: "Login Failed",
            message: data.message || "Invalid credentials. Please try again.",
            color: "red",
            loading: false,
            autoClose: 5000,
            icon: <Link size={20} />,
          });
        }
      } catch (err) {
        console.error("Login error details:", err);
        
        let errorMessage = "An error occurred. Please try again.";
        
        if (err.code === 'ECONNABORTED') {
          errorMessage = "Request timeout. Please check your connection.";
        } else if (err.response) {
          // Server responded with error status
          errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
        } else if (err.request) {
          // Request was made but no response received
          errorMessage = "Network error. Please check your connection.";
        }
        
        // Update debug info with error details
        setDebugInfo(prev => prev + "\n\nError: " + JSON.stringify({
          message: errorMessage,
          code: err.code,
          response: err.response ? {
            status: err.response.status,
            data: err.response.data
          } : undefined,
          timestamp: new Date().toISOString(),
        }, null, 2));
        
        notifications.update({
          id: "login-processing",
          title: "Login Error",
          message: errorMessage,
          color: "red",
          loading: false,
          autoClose: 5000,
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

  // Toggle debug panel
  const toggleDebug = () => {
    setShowDebug(!showDebug);
  };

  // Copy debug info to clipboard
  const copyDebugInfo = () => {
    navigator.clipboard.writeText(debugInfo);
    notifications.show({
      title: "Debug Info Copied",
      message: "Debug information has been copied to clipboard.",
      color: "green",
      autoClose: 2000,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md relative">
        <button
          onClick={toggleDebug}
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-blue-500"
          title="Toggle debug info"
        >
          <Bug size={20} />
        </button>
        
        <h1 className="text-3xl font-bold text-center text-[#3f6197] mb-6">
          Login
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-600 focus:outline-none"
              disabled={isLoading}
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
              disabled={isLoading}
            />
            <label htmlFor="rememberMe" className="ml-2 text-gray-600">
              Remember me
            </label>

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="ml-auto text-[#3f6197] font-medium hover:underline focus:outline-none"
              disabled={isLoading}
            >
              Forgot Password?
            </button>
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
            disabled={isLoading}
          >
            Sign up
          </button>
        </p>

        {/* Debug Panel */}
        {showDebug && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-700">Debug Information</h3>
              <div className="flex space-x-2">
                <button
                  onClick={copyDebugInfo}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Copy
                </button>
                <button
                  onClick={toggleDebug}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-40">
              {debugInfo}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;