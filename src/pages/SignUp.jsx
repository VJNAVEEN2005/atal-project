import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { sha256 } from "js-sha256";

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [domainType, setDomainType] = useState("");
  const [formData, setFormData] = useState({
    userId: "",
    domain: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    // Student specific fields
    dateOfBirth: "",
    fatherName: "",
    motherName: "",
    guardianName: "",
    bloodGroup: "",
    address: "",
    educationLevel: "", // "college" or "school"
    collegeName: "",
    collegeNameOther: "",
    registrationNumber: "",
    department: "",
    yearOfGraduation: "",
    standard: "",
    schoolName: "",
    // Startup specific fields
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

  // Password hashing function using js-sha256
  const hashPassword = (password) => {
    return sha256(password);
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
      if (formData.domain === "Students") {
        // Student validation
        const requiredStudentFields = {
          dateOfBirth: "Date of Birth",
          bloodGroup: "Blood Group",
          address: "Address",
          educationLevel: "Education Level",
        };

        // Check for at least one parent/guardian name
        if (
          !formData.fatherName &&
          !formData.motherName &&
          !formData.guardianName
        ) {
          setError(
            "Please provide at least one: Father's Name, Mother's Name, or Guardian's Name"
          );
          return false;
        }

        for (const [field, label] of Object.entries(requiredStudentFields)) {
          if (!formData[field]) {
            setError(`${label} is required`);
            return false;
          }
        }

        // Additional validation based on education level
        if (formData.educationLevel === "college") {
          if (!formData.collegeName) {
            setError("College Name is required");
            return false;
          }
          if (
            formData.collegeName === "Puducherry Technological University" &&
            !formData.registrationNumber
          ) {
            setError("Registration Number is required for PTU students");
            return false;
          }
          if (!formData.department) {
            setError("Department is required");
            return false;
          }
          if (!formData.yearOfGraduation) {
            setError("Year of Graduation is required");
            return false;
          }
        } else if (formData.educationLevel === "school") {
          if (!formData.schoolName) {
            setError("School Name is required");
            return false;
          }
          if (!formData.standard) {
            setError("Standard is required");
            return false;
          }
        }
      } else if (formData.domain === "Startups") {
        // Startup validation
        const requiredStartupFields = {
          organizationName: "Name of the Startup",
          sector: "Sector",
          businessType: "Business Type",
        };

        for (const [field, label] of Object.entries(requiredStartupFields)) {
          if (!formData[field]) {
            setError(`${label} is required`);
            return false;
          }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      try {
        // Generate a unique user ID according to the domain all are in caps without spaces only letters and numbers no special characters and '_
        const domainCode = formData.domain
          .toUpperCase()
          .replace(/\s+/g, "")
          .slice(0, 3);
        const userId = `AICPECF${domainCode}${uuidv4()
          .slice(0, 11).replace(/-/g, "")
          .toUpperCase()}`;

        // Hash the password using js-sha256
        const hashedPassword = hashPassword(formData.password);

        // Create a new form data object with hashed password
        const submissionData = {
          ...formData,
          userId: userId,
          collegeName: formData.collegeNameOther || formData.collegeName,
          password: hashedPassword,
          isHashed: true, // Flag to inform backend that password is already hashed
        };

        // Remove confirmPassword as it's not needed in the API request
        delete submissionData.confirmPassword;

        console.log("Submitting with hashed password");

        // For demonstration purposes, we'll simulate API call
        console.log("API call would be made with:", submissionData);
        
        // Simulate successful registration
        setTimeout(() => {
          localStorage.setItem("user_id", userId);
          localStorage.setItem("user_name", formData.email);
          localStorage.setItem("user_isLogin", true);
          navigate("/login");
        }, 1000);
        
      } catch (err) {
        console.log(err.response?.data);
        setError(err.response?.data?.message || "Registration failed");
      }
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
    { value: "Students", label: "Students" },
  ];

  // Education level options
  const educationLevelOptions = [
    { value: "college", label: "College" },
    { value: "school", label: "School" },
  ];

  // College options
  const collegeOptions = [
    {
      value: "Puducherry Technological University",
      label: "Puducherry Technological University",
    },
    { value: "Other", label: "Other College" },
  ];

  // Blood group options
  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  // Standard options for school
  const standardOptions = [
    { value: "1st", label: "1st Standard" },
    { value: "2nd", label: "2nd Standard" },
    { value: "3rd", label: "3rd Standard" },
    { value: "4th", label: "4th Standard" },
    { value: "5th", label: "5th Standard" },
    { value: "6th", label: "6th Standard" },
    { value: "7th", label: "7th Standard" },
    { value: "8th", label: "8th Standard" },
    { value: "9th", label: "9th Standard" },
    { value: "10th", label: "10th Standard" },
    { value: "11th", label: "11th Standard" },
    { value: "12th", label: "12th Standard" },
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

  // Render student form
  const renderStudentForm = () => {
    return (
      <div className="w-full space-y-4">
        <h2 className="text-2xl font-bold text-[#3f6197] mb-2">
          Student Information
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Fields marked with <span className="text-red-500">*</span> are
          required
        </p>

        {renderField("dateOfBirth", "Date of Birth", "date", null, null, true)}
        {renderField("fatherName", "Father's Name", "text")}
        {renderField("motherName", "Mother's Name", "text")}
        {renderField("guardianName", "Guardian's Name", "text")}
        <p className="text-xs text-gray-500 -mt-2">
          * Please provide at least one: Father's Name, Mother's Name, or
          Guardian's Name
        </p>

        {renderField(
          "bloodGroup",
          "Blood Group",
          "select",
          "",
          bloodGroupOptions,
          true
        )}
        {renderField("address", "Address", "text", null, null, true)}
        {renderField(
          "educationLevel",
          "Education Level",
          "select",
          "",
          educationLevelOptions,
          true
        )}

        {/* College fields */}
        {formData.educationLevel === "college" && (
          <>
            {renderField(
              "collegeName",
              "College Name",
              "select",
              "",
              collegeOptions,
              true
            )}
            {formData.collegeName === "Puducherry Technological University" &&
              renderField(
                "registrationNumber",
                "Registration Number",
                "text",
                null,
                null,
                true
              )}
            {formData.collegeName === "Other" &&
              renderField(
                "collegeNameOther",
                "College Name",
                "text",
                "Enter college name",
                null,
                true
              )}
            {renderField("department", "Department", "text", null, null, true)}
            {renderField(
              "yearOfGraduation",
              "Year of Graduation",
              "number",
              "e.g., 2025",
              null,
              true
            )}
          </>
        )}

        {/* School fields */}
        {formData.educationLevel === "school" && (
          <>
            {renderField(
              "standard",
              "Standard",
              "select",
              "",
              standardOptions,
              true
            )}
            {renderField("schoolName", "School Name", "text", null, null, true)}
          </>
        )}

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
  };

  // Render startup form
  const renderStartupForm = () => {
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
  };

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
        return formData.domain === "Students"
          ? renderStudentForm()
          : renderStartupForm();

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

          <ProgressStep
            number={3}
            label={
              formData.domain === "Students" ? "Student Info" : "Organization"
            }
            active={step >= 3}
          />
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