import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import api from "../Api/api";

const TendersControl = () => {
  // Utility functions
  const getTodayDate = () => new Date().toISOString().split("T")[0];
  
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysRemaining = (endDate) => {
    if (!endDate) return -1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastDate = new Date(endDate);
    lastDate.setHours(0, 0, 0, 0);
    const diffTime = lastDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // State management
  const [tenderData, setTenderData] = useState([]);
  const [viewMode, setViewMode] = useState("add");
  const [isLoading, setIsLoading] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tenderToDelete, setTenderToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const itemsPerPage = 10;
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const [formData, setFormData] = useState({
    title: "",
    date: getTodayDate(),
    organization: "",
    reference: "",
    lastDate: "",
    lastTime: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    organization: "",
    lastDate: "",
    lastTime: "",
    file: ""
  });

  // Custom hook for error handling
  const handleApiError = (err) => {
    console.error(err);
    let errorMessage = "An error occurred";
    
    if (err.response) {
      errorMessage = err.response.data.message || 
                   `Server error: ${err.response.status}`;
    } else if (err.request) {
      errorMessage = "Network error - please check your connection";
    }
    
    setError(errorMessage);
    setTimeout(() => setError(null), 5000);
  };

  // Data fetching
  const fetchTenders = useCallback(() => {
    setIsLoading(true);
    axios
      .get(`${api.web}api/v1/getTenders`)
      .then((res) => {
        if (res.data.success) {
          setTenderData(res.data.tenders);
        } else {
          setError("Error fetching tenders");
        }
      })
      .catch(handleApiError)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchTenders();
  }, [fetchTenders]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTenders = useMemo(() => 
    tenderData.slice(indexOfFirstItem, indexOfLastItem), 
    [tenderData, indexOfFirstItem, indexOfLastItem]
  );
  const totalPages = Math.ceil(tenderData.length / itemsPerPage);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelection = (file) => {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setErrors(prev => ({ 
        ...prev, 
        file: "File size exceeds 10MB limit" 
      }));
      return;
    }

    if (file.type !== "application/pdf") {
      setErrors(prev => ({ 
        ...prev, 
        file: "Only PDF files are allowed" 
      }));
      return;
    }

    setSelectedFile(file);
    setErrors(prev => ({ ...prev, file: "" }));
  };

  const handleFileChange = (e) => {
    handleFileSelection(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.title) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (!formData.organization) {
      newErrors.organization = "Organization is required";
      isValid = false;
    }
    if (!formData.lastDate) {
      newErrors.lastDate = "Last date is required";
      isValid = false;
    }
    if (!formData.lastTime) {
      newErrors.lastTime = "Last time is required";
      isValid = false;
    }
    if (!selectedFile) {
      newErrors.file = "PDF file is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append("tenderFile", selectedFile);

      const res = await axios.post(`${api.web}api/v1/createTender`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setMessage({ 
          text: "Tender created successfully!", 
          type: "success" 
        });
        fetchTenders();
        setFormData({
          title: "",
          date: getTodayDate(),
          organization: "",
          reference: "",
          lastDate: "",
          lastTime: "",
        });
        setSelectedFile(null);
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tender actions
  const handleDeleteClick = (id) => {
    setTenderToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${api.web}api/v1/deleteTender/${tenderToDelete}`);
      fetchTenders();
      setShowDeleteModal(false);
    } catch (err) {
      handleApiError(err);
    }
  };

  const downloadTender = async (id, fileName) => {
  try {
    const response = await axios.get(`${api.web}api/v1/downloadTender/${id}`, {
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        console.log(`Download progress: ${percentCompleted}%`);
      }
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url); // Clean up
  } catch (err) {
    handleApiError(err);
  }
};

const viewTender = async (id) => {
  try {
    const response = await axios.get(`${api.web}api/v1/downloadTender/${id}`, {
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        console.log(`Loading PDF: ${percentCompleted}%`);
      }
    });

    // Open PDF in new tab
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(blob);
    window.open(pdfUrl, '_blank');
    
    // Optional: Clean up after some time
    setTimeout(() => URL.revokeObjectURL(pdfUrl), 10000);
  } catch (err) {
    handleApiError(err);
  }
};

  // Component rendering
  const SkeletonRow = () => (
    <tr>
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-6 py-4 whitespace-nowrap">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </td>
      ))}
    </tr>
  );

  const TenderRow = React.memo(({ tender }) => {
    const daysRemaining = getDaysRemaining(tender.lastDate);
    const statusColor = daysRemaining < 0 ? "red" : 
                      daysRemaining < 3 ? "yellow" : "green";
    const statusText = daysRemaining < 0 ? "Expired" :
                     daysRemaining === 0 ? "Today" :
                     `${daysRemaining} days left`;

    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap" data-label="Title">
          <div className="text-sm font-medium text-gray-900">
            {tender.title}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap" data-label="Reference">
          <div className="text-sm text-gray-500">
            {tender.reference || "-"}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap" data-label="Organization">
          <div className="text-sm text-gray-500">
            {tender.organization}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap" data-label="Last Date">
          <div className="text-sm text-gray-500">
            {formatDate(tender.lastDate)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap" data-label="Status">
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${statusColor}-100 text-${statusColor}-800`}>
            {statusText}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" data-label="Actions">
  <div className="flex space-x-3">
    <button
      onClick={() => viewTender(tender._id)}
      className="text-blue-600 hover:text-blue-800 flex items-center"
      title="View PDF"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
      </svg>
      View
    </button>
    <button
      onClick={() => downloadTender(tender._id, tender.fileName)}
      className="text-green-600 hover:text-green-800 flex items-center"
      title="Download PDF"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      Download
    </button>
    <button
      onClick={() => handleDeleteClick(tender._id)}
      className="text-red-600 hover:text-red-800 flex items-center"
      title="Delete Tender"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      Delete
    </button>
  </div>
</td>
      </tr>
    );
  });

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Tender Management</h1>
            <p className="text-blue-100">Create and manage tender notices</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode("view")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === "view"
                  ? "bg-white text-[#3f6197] font-medium"
                  : "bg-[#3f6197] text-white border border-white/30 hover:bg-[#2c4b79]"
              }`}
            >
              View Tenders
            </button>
            <button
              onClick={() => setViewMode("add")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === "add"
                  ? "bg-white text-[#3f6197] font-medium"
                  : "bg-[#3f6197] text-white border border-white/30 hover:bg-[#2c4b79]"
              }`}
            >
              Add Tender
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}

      {viewMode === "add" ? (
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Success/Error Message */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <span className="mr-2">
                {message.type === "success" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tender Information Section */}
            <div className="bg-[#f5f8fc] p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-[#3f6197] mb-2">Tender Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                    Tender Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.title ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#3f6197]"
                    }`}
                    placeholder="Enter tender title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="organization" className="block text-gray-700 font-medium mb-2">
                    Organization*
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.organization ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#3f6197]"
                    }`}
                    placeholder="Enter organization name"
                  />
                  {errors.organization && (
                    <p className="mt-1 text-sm text-red-600">{errors.organization}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Reference Information Section */}
            <div className="bg-[#f5f8fc] p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-[#3f6197] mb-2">Reference Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="reference" className="block text-gray-700 font-medium mb-2">
                    Reference Number
                  </label>
                  <input
                    type="text"
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                    placeholder="E.g. Proc/AIC-PECF/2024/092"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave blank to auto-generate
                  </p>
                </div>

                <div>
                  <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                    Tender Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                  />
                </div>
              </div>
            </div>

            {/* Submission Details Section */}
            <div className="bg-[#f5f8fc] p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-[#3f6197] mb-2">Submission Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="lastDate" className="block text-gray-700 font-medium mb-2">
                    Last Date for Submission*
                  </label>
                  <input
                    type="date"
                    id="lastDate"
                    name="lastDate"
                    value={formData.lastDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.lastDate ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#3f6197]"
                    }`}
                  />
                  {errors.lastDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastDate}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastTime" className="block text-gray-700 font-medium mb-2">
                    Last Time for Submission*
                  </label>
                  <input
                    type="time"
                    id="lastTime"
                    name="lastTime"
                    value={formData.lastTime}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.lastTime ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#3f6197]"
                    }`}
                  />
                  {errors.lastTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastTime}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Tender Document Section */}
            <div className="bg-[#f5f8fc] p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-[#3f6197] mb-2">Tender Document</h2>

              <div
                className={`border-2 border-dashed p-8 rounded-lg text-center cursor-pointer ${
                  dragActive ? "border-[#3f6197] bg-blue-50" : "border-gray-300"
                } ${selectedFile ? "bg-green-50" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput").click()}
              >
                <input
                  type="file"
                  id="fileInput"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {selectedFile ? (
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-green-500 mb-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-lg font-medium text-gray-700">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ 
                          width: `${(selectedFile.size / MAX_FILE_SIZE) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1 w-full">
                      <span>0 MB</span>
                      <span>10 MB</span>
                    </div>
                    <button
                      type="button"
                      className="mt-3 text-sm text-red-600 hover:text-red-800"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400 mb-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-lg font-medium text-gray-700">
                      {dragActive
                        ? "Drop your file here"
                        : "Upload Tender Document (PDF)"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Drag & drop your file here or click to browse
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Max file size: 10MB
                    </p>
                  </div>
                )}
              </div>
              {errors.file && (
                <p className="mt-2 text-sm text-red-600 text-center">{errors.file}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-medium text-white flex items-center ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#3f6197] hover:bg-[#2c4b79] transition-colors"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 01-1-1V3a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Create Tender
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#3f6197] mb-4">
            Available Tenders
          </h2>

          {isLoading ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[...Array(5)].map((_, i) => (
                    <SkeletonRow key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : tenderData.length === 0 ? (
            <div className="bg-blue-50 rounded-lg p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-blue-400 mb-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No tenders available
              </h3>
              <p className="text-gray-500">
                There are currently no tenders in the system.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentTenders.map((tender) => (
                      <TenderRow key={tender._id} tender={tender} />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this tender?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TendersControl;