import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  
  // Track current step
  const [step, setStep] = useState(1);
  
  // Form data
  const [formData, setFormData] = useState({
    domain: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    organizationName: "",
    organizationSize: "",
    organizationIndustry: ""
  });
  
  // Error handling
  const [error, setError] = useState("");
  
  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };
  
  // Handle next step
  const handleNextStep = (e) => {
    e.preventDefault();
    
    // Reset error
    setError("");
    
    // Validation for each step
    if (step === 1) {
      if (!formData.domain) {
        setError("Please select a domain");
        return;
      }
    } else if (step === 2) {
      if (!formData.name || !formData.email || !formData.password || !formData.phoneNumber) {
        setError("All fields are required");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }
    
    setStep(step + 1);
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset error
    setError("");
    
    // Final validation
    if (!formData.organizationName || !formData.organizationIndustry) {
      setError("Organization information is required");
      return;
    }
    
    // Successful signup
    alert("Account created successfully!");
    navigate("/login");
  };
  
  // Render current step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full space-y-4">
            <h2 className="text-2xl font-bold text-[#3f6197] mb-2">Select Your Domain</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="domain" className="text-lg font-semibold text-gray-700">
                Domain Type
              </label>
              <select
                id="domain"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700 bg-white"
                value={formData.domain}
                onChange={handleChange}
              >
                <option value="">Select a domain</option>
                <option value="business">Business</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
                <option value="nonprofit">Non-Profit</option>
                <option value="government">Government</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button
              onClick={handleNextStep}
              className="w-full bg-[#3f6197] text-white font-semibold py-3 mt-4 rounded-lg shadow-md hover:bg-[#2e4b78] transition-all duration-300"
            >
              Continue
            </button>
          </div>
        );
      
      case 2:
        return (
          <div className="w-full space-y-4">
            <h2 className="text-2xl font-bold text-[#3f6197] mb-2">Personal Information</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-lg font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-lg font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-lg font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="text-lg font-semibold text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phoneNumber" className="text-lg font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handlePrevStep}
                className="flex-1 bg-white border border-[#3f6197] text-[#3f6197] font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={handleNextStep}
                className="flex-1 bg-[#3f6197] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#2e4b78] transition-all duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="w-full space-y-4">
            <h2 className="text-2xl font-bold text-[#3f6197] mb-2">Organization Details</h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="organizationName" className="text-lg font-semibold text-gray-700">
                Organization Name
              </label>
              <input
                type="text"
                id="organizationName"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700"
                placeholder="Enter organization name"
                value={formData.organizationName}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="organizationSize" className="text-lg font-semibold text-gray-700">
                  Organization Size
                </label>
                <select
                  id="organizationSize"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700 bg-white"
                  value={formData.organizationSize}
                  onChange={handleChange}
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501+">501+ employees</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="organizationIndustry" className="text-lg font-semibold text-gray-700">
                  Industry
                </label>
                <select
                  id="organizationIndustry"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700 bg-white"
                  value={formData.organizationIndustry}
                  onChange={handleChange}
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="finance">Finance</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="terms"
                className="accent-[#3f6197] w-4 h-4"
                required
              />
              <label htmlFor="terms" className="text-gray-600 text-sm">
                I agree to the{" "}
                <a href="#" className="text-[#3f6197] font-semibold hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handlePrevStep}
                className="flex-1 bg-white border border-[#3f6197] text-[#3f6197] font-semibold py-3 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-[#3f6197] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#2e4b78] transition-all duration-300"
              >
                Create Account
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-2xl shadow-black rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-[#3f6197] text-center mb-6">Create Account</h1>
        
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 px-2">
          <div className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step >= 1 
                  ? 'border-[#3f6197] bg-[#3f6197] text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}
            >
              1
            </div>
            <span className={`text-xs mt-1 font-medium ${step >= 1 ? 'text-[#3f6197]' : 'text-gray-400'}`}>Domain</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-[#3f6197]' : 'bg-gray-200'}`} />
          
          <div className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step >= 2 
                  ? 'border-[#3f6197] bg-[#3f6197] text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}
            >
              2
            </div>
            <span className={`text-xs mt-1 font-medium ${step >= 2 ? 'text-[#3f6197]' : 'text-gray-400'}`}>Personal</span>
          </div>
          
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-[#3f6197]' : 'bg-gray-200'}`} />
          
          <div className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step >= 3 
                  ? 'border-[#3f6197] bg-[#3f6197] text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}
            >
              3
            </div>
            <span className={`text-xs mt-1 font-medium ${step >= 3 ? 'text-[#3f6197]' : 'text-gray-400'}`}>Organization</span>
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="w-full bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            <p className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          </div>
        )}
        
        {/* Step Content */}
        {renderStepContent()}
        
        {/* Login Link */}
        <p className="mt-8 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <div onClick={()=>navigate('/login')} className="text-[#3f6197] font-semibold hover:underline hover:cursor-pointer">
            Sign in
          </div>
        </p>
      </div>
    </div>
  );
};

export default SignUp;