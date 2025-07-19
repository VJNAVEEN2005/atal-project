import React, { useState } from "react";
import { Upload, Package, Save, X, Zap, Archive, Utensils, ArrowLeft } from "lucide-react";
import axios from "axios";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

const CreateStocks = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    stockId: "AICPECF",
    stockName: "",
    stockImage: null,
    stockType: "Electronic",
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stockTypes = [
    { value: "Electronic", label: "Electronic", icon: Zap },
    { value: "Stationry Items", label: "Stationry Items", icon: Archive },
    { value: "Food Inventory", label: "Food Inventory", icon: Utensils },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          stockImage: "Please select a valid image file",
        }));
        return;
      }

      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          stockImage: "Image size should be less than 2MB",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        stockImage: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);

      // Clear image error
      if (errors.stockImage) {
        setErrors((prev) => ({
          ...prev,
          stockImage: "",
        }));
      }
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      stockImage: null,
    }));
    setPreviewImage(null);
    document.getElementById("stockImage").value = "";
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.stockId.trim()) {
      newErrors.stockId = "Stock ID is required";
    } else if (!/^[a-zA-Z0-9-_]+$/.test(formData.stockId)) {
      newErrors.stockId =
        "Stock ID can only contain letters, numbers, hyphens, and underscores";
    }

    if (!formData.stockName.trim()) {
      newErrors.stockName = "Stock name is required";
    } else if (formData.stockName.length < 2) {
      newErrors.stockName = "Stock name must be at least 2 characters long";
    }

    if (!formData.stockType) {
      newErrors.stockType = "Stock type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    const formDataToSend = new FormData();
    formDataToSend.append('stockId', formData.stockId);
    formDataToSend.append('stockName', formData.stockName);
    formDataToSend.append('stockType', formData.stockType);
    formDataToSend.append('count', '0');
    if (formData.stockImage) {
      formDataToSend.append('stockImage', formData.stockImage);
    }

    await axios.post(`${api.web}api/v1/stock`, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
        token: localStorage.getItem("token")
      }
    });

    // Reset form
    setFormData({
      stockId: "AICPECF",
      stockName: "",
      stockImage: null,
      stockType: "Electronic",
    });
    setPreviewImage(null);
    
    alert("Stock created successfully!");
  } catch (error) {
    console.error("Error creating stock:", error);
    alert("Failed to create stock. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with animated background */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#3f6197]/10 to-[#5a7fb8]/10 rounded-3xl blur-3xl"></div>
          <div className="relative">
            {/* Back Button */}
            <div className="flex justify-start mb-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl hover:border-[#3f6197] hover:text-[#3f6197] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            </div>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] rounded-full blur-lg opacity-60 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] p-4 rounded-full shadow-xl">
                  <Package className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] bg-clip-text text-transparent mb-4">
              Create New Stock
            </h1>
            <p className="text-gray-600 text-lg">
              Add a new item to your inventory system with ease
            </p>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-[#3f6197]/5 to-[#5a7fb8]/5 p-8 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-semibold text-gray-800">
                Stock Information
              </h2>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Stock ID */}
                <div className="group">
                  <label
                    htmlFor="stockId"
                    className="block text-sm font-semibold text-gray-700 mb-3"
                  >
                    Stock ID *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="stockId"
                      name="stockId"
                      value={formData.stockId}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-opacity-30 transition-all duration-300 text-gray-800 placeholder-gray-400 ${
                        errors.stockId
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-200 focus:ring-[#3f6197] focus:border-[#3f6197] hover:border-gray-300"
                      }`}
                      placeholder="e.g., STK-001"
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#3f6197]/5 to-[#5a7fb8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.stockId && (
                    <p className="mt-2 text-sm text-red-600 animate-pulse">
                      {errors.stockId}
                    </p>
                  )}
                </div>

                {/* Stock Name */}
                <div className="group">
                  <label
                    htmlFor="stockName"
                    className="block text-sm font-semibold text-gray-700 mb-3"
                  >
                    Stock Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="stockName"
                      name="stockName"
                      value={formData.stockName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-opacity-30 transition-all duration-300 text-gray-800 placeholder-gray-400 ${
                        errors.stockName
                          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-200 focus:ring-[#3f6197] focus:border-[#3f6197] hover:border-gray-300"
                      }`}
                      placeholder="Enter descriptive stock name"
                      disabled={isSubmitting}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#3f6197]/5 to-[#5a7fb8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.stockName && (
                    <p className="mt-2 text-sm text-red-600 animate-pulse">
                      {errors.stockName}
                    </p>
                  )}
                </div>

                {/* Stock Type */}
                <div className="group">
                  <label
                    htmlFor="stockType"
                    className="block text-sm font-semibold text-gray-700 mb-3"
                  >
                    Stock Type *
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {stockTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <label
                          key={type.value}
                          className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            formData.stockType === type.value
                              ? "border-[#3f6197] bg-gradient-to-r from-[#3f6197]/10 to-[#5a7fb8]/10"
                              : "border-gray-200 bg-white/50 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="stockType"
                            value={type.value}
                            checked={formData.stockType === type.value}
                            onChange={handleInputChange}
                            className="sr-only"
                            disabled={isSubmitting}
                          />
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-lg mr-4 ${
                              formData.stockType === type.value
                                ? "bg-[#3f6197] text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span
                            className={`font-medium ${
                              formData.stockType === type.value
                                ? "text-[#3f6197]"
                                : "text-gray-700"
                            }`}
                          >
                            {type.label}
                          </span>
                          {formData.stockType === type.value && (
                            <div className="absolute right-4 w-2 h-2 bg-[#3f6197] rounded-full animate-pulse"></div>
                          )}
                        </label>
                      );
                    })}
                  </div>
                  {errors.stockType && (
                    <p className="mt-2 text-sm text-red-600 animate-pulse">
                      {errors.stockType}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Stock Image */}
                <div>
                  <label
                    htmlFor="stockImage"
                    className="block text-sm font-semibold text-gray-700 mb-3"
                  >
                    Stock Image (Optional)
                  </label>

                  {!previewImage ? (
                    <div className="group relative">
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#3f6197] transition-all duration-300 bg-gradient-to-br from-gray-50 to-white">
                        <div className="relative">
                          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4 group-hover:text-[#3f6197] transition-colors duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-r from-[#3f6197]/10 to-[#5a7fb8]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <label htmlFor="stockImage" className="cursor-pointer">
                          <span className="text-[#3f6197] hover:text-[#5a7fb8] font-semibold text-lg transition-colors duration-300">
                            Click to upload image
                          </span>
                          <p className="text-gray-500 text-sm mt-2">
                            PNG, JPG, GIF up to 2MB
                          </p>
                        </label>
                        <input
                          type="file"
                          id="stockImage"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative group">
                      <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200">
                        <img
                          src={previewImage}
                          alt="Stock preview"
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                        disabled={isSubmitting}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  {errors.stockImage && (
                    <p className="mt-2 text-sm text-red-600 animate-pulse">
                      {errors.stockImage}
                    </p>
                  )}
                </div>

                {/* Count Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3f6197]/10 to-[#5a7fb8]/10 rounded-full blur-2xl"></div>
                  <div className="relative flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="bg-[#3f6197] p-3 rounded-xl">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#3f6197] mb-2">
                        Initial Count Information
                      </h3>
                      <p className="text-sm text-blue-800 leading-relaxed">
                        This stock will be created with a count of{" "}
                        <span className="font-semibold">0</span>. You can update
                        the quantity later through the inventory management
                        system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-12 mt-8 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    stockId: "",
                    stockName: "",
                    stockImage: null,
                    stockType: "Electronic",
                  });
                  setPreviewImage(null);
                  setErrors({});
                  document.getElementById("stockImage").value = "";
                }}
                className="px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 disabled:opacity-50"
                disabled={isSubmitting}
              >
                Reset Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="px-8 py-4 bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] text-white font-semibold rounded-xl hover:from-[#2d4a7a] hover:to-[#4a6ea6] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating Stock...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Create Stock</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStocks;
