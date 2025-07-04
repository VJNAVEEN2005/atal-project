import axios from "axios";
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/api";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Form validation
      if (!formData.email) {
        setError("Please enter your email address");
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        return;
      }

      setIsLoading(true);
      setError("");
      setSuccess("");

      try {
        const response = await axios.post(`${api.web}api/v1/forgotPassword`, {
          email: formData.email,
        });

        const { data } = response;
        console.log("Forgot password response:", data);

        if (data.success) {
          setSuccess("Password reset link has been sent to your email address. Please check your inbox.");
          setFormData({ email: "" }); // Clear form
        } else {
          setError(data.message || "Failed to send reset link");
        }
      } catch (err) {
        console.error("Forgot password error:", err);
        setError(err.response?.data?.message || "An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [formData]
  );

  // Navigate back to login page
  const navigateToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <div className="flex items-center mb-6">
          <button
            onClick={navigateToLogin}
            className="text-[#3f6197] hover:text-[#2e4b78] transition-colors duration-200 mr-3"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-[#3f6197] flex-1 text-center">
            Forgot Password
          </h1>
        </div>

        <p className="text-gray-600 text-center mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700"
              placeholder="Enter your email address"
              required
            />
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
            {isLoading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;