import axios from "axios";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Api/api";
import { ArrowLeft, Eye, EyeOff, Clock, Shield } from "lucide-react";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState("");
  const [tokenValid, setTokenValid] = useState(null);

  const navigate = useNavigate();
  const { token: urlToken } = useParams();

  // Extract token from URL and verify
  useEffect(() => {
    if (urlToken) {
      setToken(urlToken);
      verifyToken(urlToken);
    } else {
      setError("Invalid or missing reset token");
    }
  }, [urlToken]);

  // Verify token validity
  const verifyToken = useCallback(async (resetToken) => {
    try {
      const response = await axios.post(`${api.web}api/v1/verifyResetToken`, {
        token: resetToken,
      });

      const { data } = response;
      if (data.success) {
        setTokenValid(true);
      } else {
        setTokenValid(false);
        setError(data.message || "Invalid or expired reset token");
      }
    } catch (err) {
      console.error("Token verification error:", err);
      setTokenValid(false);
      setError("Invalid or expired reset token");
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const hashPassword = async (password) => {
    // Convert the password string to a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    
    // Generate hash using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return null;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!formData.password || !formData.confirmPassword) {
        setError("Please fill in all required fields");
        return;
      }

      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        setError(passwordError);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (!token) {
        setError("Invalid reset token");
        return;
      }

      setIsLoading(true);
      setError("");
      setSuccess("");

      try {
        // Hash the new password before sending
        const hashedPassword = await hashPassword(formData.password);
        const response = await axios.post(`${api.web}api/v1/resetPassword`, {
          token: token,
          newPassword: hashedPassword,
        });

        const { data } = response;

        if (data.success) {
          setSuccess("Password has been reset successfully! Redirecting to login...");
          setFormData({ password: "", confirmPassword: "" });

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setError(data.message || "Failed to reset password");
        }
      } catch (err) {
        console.error("Reset password error:", err);
        setError(err.response?.data?.message || "An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [formData, token, navigate]
  );

  const navigateToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  // While verifying token
  if (tokenValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f6197] mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying reset token...</p>
        </div>
      </div>
    );
  }

  // If token invalid
  if (tokenValid === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
          <Shield size={48} className="text-red-500 mb-4 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Invalid Reset Link</h1>
          <p className="text-gray-600 mb-6">
            This password reset link is invalid or has expired. Please request a new password reset.
          </p>
          <button
            onClick={navigateToLogin}
            className="w-full py-2.5 px-4 rounded-lg font-medium text-white bg-[#3f6197] hover:bg-[#2e4b78] transition-colors duration-300"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white my-10 shadow-lg rounded-xl p-8 w-full max-w-md">
        <div className="flex items-center mb-6">
          <button
            onClick={navigateToLogin}
            className="text-[#3f6197] hover:text-[#2e4b78] transition-colors duration-200 mr-3"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-[#3f6197] flex-1 text-center">
            Reset Password
          </h1>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center text-blue-800 mb-2">
            <Clock size={16} className="mr-2" />
            <span className="font-medium">Security Notice</span>
          </div>
          <p className="text-blue-700 text-sm">
            This reset link will expire in <strong>15 minutes</strong> from the time it was sent.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">{error}</div>
        )}
        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700"
                placeholder="Enter your new password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700"
                placeholder="Confirm your new password"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <p className="font-medium text-gray-700 mb-2">Password Requirements:</p>
            <ul className="text-gray-600 space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Contains uppercase and lowercase letters</li>
              <li>• Contains at least one number</li>
              <li>• Contains at least one special character</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition-colors duration-300 ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#3f6197] hover:bg-[#2e4b78]"
            }`}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Remember your password?{" "}
            <button
              onClick={navigateToLogin}
              className="text-[#3f6197] font-medium hover:underline focus:outline-none"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
