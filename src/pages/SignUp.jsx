import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../Api/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    domain: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    organizationName: "",
    organizationSize: "",
    organizationIndustry: "",
    founderName: "",
    founderWhatsApp: "",
    dpiitNumber: "",
    sector: "",
    womenLed: "",
    panNumber: "",
    gstNumber: "",
    address: "",
    cityStatePostal: "",
    productDescription: "",
    businessType: "",
    websiteUrl: "",
    growthPotential: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Validation for each step
  const validateStep = () => {
    setError("");

    if (step === 1) {
      if (!formData.domain) {
        setError("Please select a domain");
        return false;
      }
    } else if (step === 2) {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.phoneNumber
      ) {
        setError("All fields are required");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        return false;
      }
    } else if (step === 3) {
      // Only validate required organization fields
      const requiredFields = {
        organizationName: "Name of the Startup",
        sector: "Sector",
        businessType: "Business Type",
      };

      for (const [field, label] of Object.entries(requiredFields)) {
        if (!formData[field]) {
          setError(`${label} is required`);
          return false;
        }
      }
    }

    return true;
  };

  // Handle next step
  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setStep(step - 1);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log(formData);
      axios
        .post(`${api.web}api/v1/register`, formData)
        .then((res) => {
          if(res.data.success){
            localStorage.setItem("user_id", res.data.user._id);
            localStorage.setItem("user_name", res.data.user.email);
            localStorage.setItem("user_isLogin", res.data.success);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          setError(err.response.data.message);
        });

      navigate("/login");
    }
  };


  // Form field renderer to reduce repetition
  const renderField = (
    id,
    label,
    type = "text",
    placeholder = "",
    options = null,
    required = false
  ) => {
    // Change this line to separate the asterisk and make it red
    const labelText = required ? (
      <span>
        {label} <span className="text-red-500">*</span>
      </span>
    ) : (
      label
    );

    if (options) {
      return (
        <div className="flex flex-col gap-2">
          <label htmlFor={id} className="text-lg font-semibold text-gray-700">
            {labelText}
          </label>
          <select
            id={id}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700 bg-white"
            value={formData[id] || ""}
            onChange={handleChange}
            required={required}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-lg font-semibold text-gray-700">
          {labelText}
        </label>
        <input
          type={type}
          id={id}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-gray-700"
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          value={formData[id] || ""}
          onChange={handleChange}
          required={required}
        />
      </div>
    );
  };

  // Domain options
  const domainOptions = [
    { value: "Startups", label: "Startups" },
    { value: "Aspirant (or) Individual", label: "Aspirant (or) Individual" },
    { value: "Mentors", label: "Mentors" },
    {
      value: "Startup Ecosystem Enablers",
      label: "Startup Ecosystem Enablers",
    },
    { value: "Investors", label: "Investors" },
    { value: "Innovators", label: "Innovators" },
    {
      value: "Startups Service Providers",
      label: "Startups Service Providers",
    },
  ];

  // Entity nature options
  const entityOptions = [
    { value: "Private Limited", label: "Private Limited" },
    { value: "Partnership", label: "Partnership" },
    { value: "Other", label: "Other" },
  ];

  // Sector options
  const sectorOptions = [
    {
      value: "AI, Deeptech & Cybersecurity",
      label: "AI, Deeptech & Cybersecurity",
    },
    { value: "Agritech", label: "Agritech" },
    {
      value: "B2B & Precision Manufacturing",
      label: "B2B & Precision Manufacturing",
    },
    { value: "Biotech & Health Tech", label: "Biotech & Health Tech" },
    { value: "Climate Tech", label: "Climate Tech" },
    { value: "D2C", label: "D2C" },
    { value: "Defence & Space Tech", label: "Defence & Space Tech" },
    { value: "Fintech", label: "Fintech" },
    { value: "Gaming & Sports", label: "Gaming & Sports" },
    { value: "Incubators & Accelerators", label: "Incubators & Accelerators" },
    { value: "Mobility", label: "Mobility" },
    { value: "Other", label: "Other" },
  ];

  // Yes/No options
  const yesNoOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  // Business type options
  const businessTypeOptions = [
    { value: "Product", label: "Product" },
    { value: "Service Based", label: "Service Based" },
  ];

  // Render current step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full space-y-4">
            <h2 className="text-2xl font-bold text-[#3f6197] mb-2">
              Select Your Domain
            </h2>
            {renderField(
              "domain",
              "Domain Type",
              "select",
              "",
              domainOptions,
              true
            )}
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
            <h2 className="text-2xl font-bold text-[#3f6197] mb-2">
              Personal Information
            </h2>
            {renderField(
              "name",
              "Full Name",
              "text",
              "Enter your full name",
              null,
              true
            )}
            {renderField(
              "email",
              "Email Address",
              "email",
              "Enter your email",
              null,
              true
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField(
                "password",
                "Password",
                "password",
                "Create a password",
                null,
                true
              )}
              {renderField(
                "confirmPassword",
                "Confirm Password",
                "password",
                "Confirm your password",
                null,
                true
              )}
            </div>

            {renderField(
              "phoneNumber",
              "Phone Number",
              "tel",
              "Enter your phone number",
              null,
              true
            )}

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
            <h2 className="text-2xl font-bold text-[#3f6197] mb-2">
              Organization Details
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Fields marked with <span className="text-red-500">*</span> are
              required
            </p>

            {renderField(
              "organizationName",
              "Name of the Startup",
              "text",
              null,
              null,
              true
            )}
            {renderField(
              "organizationSize",
              "Nature of Entity",
              "select",
              "",
              entityOptions
            )}
            {renderField("founderName", "Founder Name", "text")}
            {renderField("founderWhatsApp", "Founder WhatsApp No.", "text")}
            {renderField("dpiitNumber", "DPIIT Recognition Number", "text")}
            {renderField("sector", "Sector", "select", "", sectorOptions, true)}
            {renderField(
              "womenLed",
              "Women Led Startup",
              "select",
              "",
              yesNoOptions
            )}
            {renderField("panNumber", "PAN Number", "text")}
            {renderField("gstNumber", "GST Number", "text")}
            {renderField("address", "Address", "text")}
            {renderField("cityStatePostal", "City, State, Postal Code", "text")}
            {renderField(
              "productDescription",
              "Describe Your Product/Service",
              "text"
            )}
            {renderField(
              "businessType",
              "Are you a Product based startup or a Service based startup",
              "select",
              "",
              businessTypeOptions,
              true
            )}
            {renderField("websiteUrl", "Website URL", "text")}

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="terms"
                className="accent-[#3f6197] w-4 h-4"
                required
              />
              <label htmlFor="terms" className="text-gray-600 text-sm">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-[#3f6197] font-semibold hover:underline"
                >
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

  // Progress step component to reduce repetition
  const ProgressStep = ({ number, label, active }) => (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
          active
            ? "border-[#3f6197] bg-[#3f6197] text-white"
            : "border-gray-300 text-gray-400"
        }`}
      >
        {number}
      </div>
      <span
        className={`text-xs mt-1 font-medium ${
          active ? "text-[#3f6197]" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-2xl shadow-black rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-[#3f6197] text-center mb-6">
          Create Account
        </h1>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 px-2">
          <ProgressStep number={1} label="Domain" active={step >= 1} />

          <div
            className={`flex-1 h-1 mx-2 ${
              step >= 2 ? "bg-[#3f6197]" : "bg-gray-200"
            }`}
          />

          <ProgressStep number={2} label="Personal" active={step >= 2} />

          <div
            className={`flex-1 h-1 mx-2 ${
              step >= 3 ? "bg-[#3f6197]" : "bg-gray-200"
            }`}
          />

          <ProgressStep number={3} label="Organization" active={step >= 3} />
        </div>

        {/* Error message */}
        {error && (
          <div className="w-full bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            <p className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
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
          <span
            onClick={() => navigate("/login")}
            className="text-[#3f6197] font-semibold hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
