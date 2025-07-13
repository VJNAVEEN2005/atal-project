import axios from "axios";
import {
  Mail,
  User,
  Phone,
  MapPin,
  Calendar,
  Linkedin,
  Lock,
  Camera,
  X,
  Check,
  Eye,
  EyeOff,
  LinkedinIcon,
  ArrowLeftIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../Api/api";
import { showNotification, updateNotification } from "@mantine/notifications";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";

const TeamsSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
    email: "",
    password: "",
    role: "",
    domain: "Team Member",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    linkedin: "",
    userId: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must contain only digits";
    }
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files && files[0]) {
      const file = files[0];

      // Check file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        showNotification({
          title: "File too large",
          message: "Image must be less than 2MB",
          color: "red",
          icon: <X className="w-4 h-4" />,
        });
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      photo: null,
    }));
    setImagePreview(null);
    const fileInput = document.querySelector('input[name="photo"]');
    if (fileInput) fileInput.value = "";
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification({
        title: "Validation Error",
        message: "Please fill all required fields correctly",
        color: "red",
        icon: <X className="w-4 h-4" />,
      });
      return;
    }

    setIsSubmitting(true);
    const newId = `AICPECFTEA${uuidv4()
      .slice(0, 11)
      .replace(/-/g, "")
      .toUpperCase()}`;
    const hashedPassword = await hashPassword(formData.password);

    showNotification({
      id: "user-creation",
      title: "Creating User...",
      message: "Please wait while we create the user.",
      autoClose: false,
      color: "blue",
      loading: true,
    });

    try {
      // First create the user
      const userResponse = await axios.post(`${api.web}api/v1/register`, {
        ...formData,
        userId: newId,
        password: hashedPassword,
        photo: null, // Photo will be handled separately if it exists
      });

      console.log("User created successfully:", userResponse.data);
      updateNotification({
        id: "user-creation",
        title: "User Created",
        message: "User created successfully.",
        color: "green",
        icon: <Check className="w-4 h-4" />,
        loading: false,
        autoClose: 3000,
      });

      // Only upload profile image if it exists
      if (formData.photo) {
        showNotification({
          id: "image-upload",
          title: "Uploading Profile Image...",
          message: "Please wait while we upload the profile image.",
          autoClose: false,
          color: "blue",
          loading: true,
        });

        const newFormData = new FormData();
        newFormData.append("profilePhoto", formData.photo);
        newFormData.append("_id", userResponse.data.user._id);

        await axios.post(`${api.web}api/v1/uploadProfileImage`, newFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Profile image uploaded successfully");
        updateNotification({
          id: "image-upload",
          title: "Image Uploaded",
          message: "Profile image uploaded successfully.",
          color: "green",
          icon: <Check className="w-4 h-4" />,
          loading: false,
          autoClose: 3000,
        });
      }

      // Reset form after successful submission
      setFormData({
        name: "",
        photo: null,
        email: "",
        password: "",
        role: "",
        domain: "Team Member",
        phoneNumber: "",
        address: "",
        dateOfBirth: "",
        linkedin: "",
        userId: "",
      });
      setImagePreview(null);
      setErrors({});
    } catch (error) {
      console.error("Error:", error);
      updateNotification({
        id: error.config?.url?.includes("uploadProfileImage")
          ? "image-upload"
          : "user-creation",
        title: "Error",
        message: `Failed to ${
          error.config?.url?.includes("uploadProfileImage")
            ? "upload profile image"
            : "create user"
        }: ${error.response?.data?.message || error.message}`,
        color: "red",
        icon: <X className="w-4 h-4" />,
        loading: false,
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFocusStyle = {
    borderColor: "#3f6197",
    boxShadow: "0 0 0 3px rgba(63, 97, 151, 0.1)",
    outline: "none",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-[#2e4a76] to-[#3f6197] relative p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Create Team Members
            </h1>
            <p className="text-blue-100 text-lg">
              Add new members to your team with their details
            </p>
          </div>
          <div onClick={() => navigate("/admin/teamsSignUpControl")} className="absolute left-4 top-[50%] -translate-y-[50%] border border-white rounded-lg flex items-center gap-3 text-white py-2 px-3 cursor-pointer hover:bg-white hover:bg-opacity-10 transition-colors duration-200">
            <ArrowLeftIcon className="w-6 h-6 text-white" /> Back
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto relative">
        {/* Circular Photo Input - Top Right */}
        <div className="absolute top-6 right-6 z-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-dashed border-[#3f6197] bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center cursor-pointer group overflow-hidden">
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
              />

              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-full flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center relative justify-center text-[#3f6197] group-hover:text-[#2e4a76] transition-colors duration-200">
                  <Camera className="w-8 h-8 mb-2" />
                  <span className="text-xs font-medium text-center">
                    Upload Photo (Optional)
                  </span>
                </div>
              )}
            </div>

            {imagePreview && (
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors duration-200 shadow-lg z-20"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <p className="text-xs text-gray-600 mt-2 text-center font-medium">
            Profile Photo (Optional)
          </p>
          <div className="text-[10px] absolute text-gray-500">
            <p className="text-center">The Image should be max of (2MB)</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-40">
              {/* Name */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <User className="w-4 h-4 mr-2 text-[#3f6197]" />
                  FULL NAME
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white`}
                  onFocus={(e) =>
                    Object.assign(e.target.style, inputFocusStyle)
                  }
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.name
                      ? "#ef4444"
                      : "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Mail className="w-4 h-4 mr-2 text-[#3f6197]" />
                  EMAIL ADDRESS
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white`}
                  onFocus={(e) =>
                    Object.assign(e.target.style, inputFocusStyle)
                  }
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.email
                      ? "#ef4444"
                      : "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Lock className="w-4 h-4 mr-2 text-[#3f6197]" />
                  PASSWORD
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white pr-10`}
                    onFocus={(e) =>
                      Object.assign(e.target.style, inputFocusStyle)
                    }
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.password
                        ? "#ef4444"
                        : "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#3f6197]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <User className="w-4 h-4 mr-2 text-[#3f6197]" />
                  ROLE
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white`}
                  onFocus={(e) =>
                    Object.assign(e.target.style, inputFocusStyle)
                  }
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.role
                      ? "#ef4444"
                      : "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Enter role/position"
                />
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">{errors.role}</p>
                )}
              </div>

              {/* phoneNumber */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Phone className="w-4 h-4 mr-2 text-[#3f6197]" />
                  PHONE NUMBER
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white`}
                  onFocus={(e) =>
                    Object.assign(e.target.style, inputFocusStyle)
                  }
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.phoneNumber
                      ? "#ef4444"
                      : "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Enter phone number"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Calendar className="w-4 h-4 mr-2 text-[#3f6197]" />
                  DATE OF BIRTH
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white`}
                  onFocus={(e) =>
                    Object.assign(e.target.style, inputFocusStyle)
                  }
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.dateOfBirth
                      ? "#ef4444"
                      : "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              {/* LinkedIn Profile */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <LinkedinIcon className="w-4 h-4 mr-2 text-[#3f6197]" />
                  LINKEDIN PROFILE
                
                </label>
                <input
                  type="text"
                  name="linkedin"
                  
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.linkedin
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white`}
                  onFocus={(e) =>
                    Object.assign(e.target.style, inputFocusStyle)
                  }
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.linkedin
                      ? "#ef4444"
                      : "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Enter LinkedIn profile URL"
                />
                {errors.linkedin && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.linkedin}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-[#3f6197]" />
                  ADDRESS
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none transition-all duration-200 bg-gray-50 focus:bg-white`}
                  onFocus={(e) =>
                    Object.assign(e.target.style, inputFocusStyle)
                  }
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.address
                      ? "#ef4444"
                      : "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Enter full address"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-200"
                onClick={() => {
                  setFormData({
                    name: "",
                    photo: null,
                    email: "",
                    password: "",
                    role: "",
                    domain: "Team Member",
                    phoneNumber: "",
                    address: "",
                    dateOfBirth: "",
                    linkedin: "",
                    userId: "",
                  });
                  setImagePreview(null);
                  setErrors({});
                }}
              >
                Reset
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-8 py-3 bg-gradient-to-r from-[#2e4a76] to-[#3f6197] text-white font-semibold rounded-lg hover:from-[#253a63] hover:to-[#345583] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Creating..." : "Create Team Member"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamsSignUp;
