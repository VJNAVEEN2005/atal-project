import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  User,
  Calendar,
  Plus,
  X,
  Check,
  FileText,
  Settings,
  Home,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../Api/api";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Modal } from "@mantine/core";
import { IoReload } from "react-icons/io5";

const ProjectRecordsData = () => {
  // Input focus style for consistent styling
  const inputFocusStyle = {
    borderColor: "#3f6197",
    boxShadow: "0 0 0 3px rgba(63, 97, 151, 0.1)"
  };

  const [records, setRecords] = useState([]);
  const [isEdit, setIsEdit] = useState({ isEdit: false, record: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isReload, setIsReload] = useState(false);
  const [projectImage, setProjectImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchRecords();
  }, [currentPage, recordsPerPage, debouncedSearchTerm, filterStatus]);

  const fetchRecords = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: recordsPerPage.toString()
      });

      if (filterStatus !== 'all') {
        params.append('status', filterStatus);
      }

      if (debouncedSearchTerm.trim()) {
        params.append('search', debouncedSearchTerm.trim());
      }

      const response = await axios.get(`${api.web}api/v1/projects?${params.toString()}`);
      
      if (response.data.success) {
        setRecords(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setTotalRecords(response.data.pagination.totalProjects);
        console.log("Project records fetched successfully:", response.data);
      } else {
        console.error("Failed to fetch project records");
        showNotification({
          title: "Error",
          message: "Failed to fetch project records",
          color: "red"
        });
      }
    } catch (error) {
      console.error("Error fetching project records:", error);
      showNotification({
        title: "Error",
        message: "Error fetching project records",
        color: "red"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update search suggestions to work with current page data
  useEffect(() => {
    if (searchTerm.length > 0) {
      const searchLower = searchTerm.toLowerCase();
      const newSuggestions = [];
      records.forEach((record) => {
        if (record.emailId && record.emailId.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "emailId",
            value: record.emailId,
            record,
            label: `${record.emailId} (Email)`
          });
        }
        if (record.name && record.name.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "name",
            value: record.name,
            record,
            label: `${record.name} (Name)`
          });
        }
        if (record.registerNumber && record.registerNumber.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "registerNumber",
            value: record.registerNumber,
            record,
            label: `${record.registerNumber} (Register No)`
          });
        }
        if (record.department && record.department.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "department",
            value: record.department,
            record,
            label: `${record.department} (Department)`
          });
        }
        if (record.yearOfStudy && record.yearOfStudy.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "yearOfStudy",
            value: record.yearOfStudy,
            record,
            label: `${record.yearOfStudy} (Year)`
          });
        }
        if (record.instituteName && record.instituteName.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "instituteName",
            value: record.instituteName,
            record,
            label: `${record.instituteName} (Institute)`
          });
        }
        if (record.projectTitle && record.projectTitle.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "projectTitle",
            value: record.projectTitle,
            record,
            label: `${record.projectTitle} (Project Title)`
          });
        }
        if (record.projectGuideName && record.projectGuideName.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "projectGuideName",
            value: record.projectGuideName,
            record,
            label: `${record.projectGuideName} (Guide)`
          });
        }
        if (record.projectName && record.projectName.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "projectName",
            value: record.projectName,
            record,
            label: `${record.projectName} (Project Name)`
          });
        }
        if (record.projectId && record.projectId.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "projectId",
            value: record.projectId,
            record,
            label: `${record.projectId} (Project ID)`
          });
        }
        if (record.status && record.status.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "status",
            value: record.status,
            record,
            label: `${record.status} (Status)`
          });
        }
        if (record.description && record.description.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "description",
            value: record.description,
            record,
            label: `${record.description} (Description)`
          });
        }
      });
      const uniqueSuggestions = newSuggestions
        .filter((suggestion, index, self) =>
          index === self.findIndex((s) => s.value === suggestion.value && s.type === suggestion.type)
        )
        .slice(0, 8);
      setSuggestions(uniqueSuggestions);
      setShowSuggestions(uniqueSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedSuggestionIndex(-1);
  }, [searchTerm, records]);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cleanup image URL on component unmount
  useEffect(() => {
    return () => {
      if (projectImage) {
        URL.revokeObjectURL(projectImage);
      }
    };
  }, [projectImage]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.value);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    setSelectedRecord(suggestion.record);
    setShowDetails(true);
    searchInputRef.current?.focus();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSearchFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Since we're using server-side filtering, we display all records from the API
  const filteredRecords = records;

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setShowDetails(true);
    fetchProjectImage(record);
  };

  const fetchProjectImage = async (record) => {
    const projectId = record._id || record.projectId;
    if (!projectId) return;

    setImageLoading(true);
    setImageError(null);
    setProjectImage(null);

    try {
      const response = await axios.get(`${api.web}api/v1/project/${projectId}/image`, {
        headers: { 
          token: localStorage.getItem("token") 
        },
        responseType: 'blob'
      });

      // Create blob URL for the image
      const imageBlob = new Blob([response.data], { type: response.headers['content-type'] || 'image/jpeg' });
      const imageUrl = URL.createObjectURL(imageBlob);
      setProjectImage(imageUrl);
    } catch (error) {
      console.error('Error fetching project image:', error);
      setImageError('Failed to load project image');
    } finally {
      setImageLoading(false);
    }
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedRecord(null);
    // Clean up image URL to prevent memory leaks
    if (projectImage) {
      URL.revokeObjectURL(projectImage);
      setProjectImage(null);
    }
    setImageError(null);
  };

  const handleEdit = (record) => {
    setIsEdit({ isEdit: true, record });
  };

  const handleDelete = () => {
    if (!isEdit.record) return;
    const id = isEdit.record._id || isEdit.record.projectId;
    console.log("Deleting project via DELETE:", id);
    axios
      .delete(`${api.web}api/v1/project/${id}`, {
        headers: { token: localStorage.getItem("token") }
      })
      .then((response) => {
        if (response.data.success) {
          showNotification({ title: "Deleted", message: "Record deleted." });
          setRecords(records.filter((r) => (r._id || r.projectId) !== id));
        } else {
          showNotification({ title: "Error", message: "Could not delete." });
        }
      })
      .catch(() => {
        showNotification({ title: "Error", message: "Could not delete." });
      })
      .finally(() => {
        setIsEdit({ isEdit: false, record: null });
      });
  };

  const handleExport = async () => {
    try {
      showNotification({
        id: 'export-loading',
        title: 'Exporting',
        message: 'Generating Excel file...',
        loading: true,
        autoClose: false,
      });

      // Build query parameters for export
      const params = new URLSearchParams();

      if (filterStatus !== 'all') {
        params.append('status', filterStatus);
      }

      if (debouncedSearchTerm.trim()) {
        params.append('search', debouncedSearchTerm.trim());
      }

      // Use the dedicated Excel export endpoint
      const response = await axios.get(
        `${api.web}api/v1/projects/export/excel?${params.toString()}`,
        {
          headers: { 
            token: localStorage.getItem("token") 
          },
          responseType: 'blob' // Important for file download
        }
      );

      // Create blob URL and trigger download
      const blob = new Blob([response.data], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      
      // Extract filename from response headers or use default
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'project_records_export.xlsx';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      updateNotification({
        id: 'export-loading',
        title: 'Export Complete',
        message: 'Project records exported successfully to Excel.',
        color: 'green',
        icon: <Check className="w-4 h-4" />,
        autoClose: 3000,
      });

    } catch (error) {
      console.error('Export error:', error);
      
      let errorMessage = 'Failed to export records.';
      if (error.response?.status === 404) {
        errorMessage = 'No records found to export.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      updateNotification({
        id: 'export-loading',
        title: 'Export Failed',
        message: errorMessage,
        color: 'red',
        icon: <X className="w-4 h-4" />,
        autoClose: 3000,
      });
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-white p-6 rounded-t-lg bg-gradient-to-r from-[#3f6197] to-[#5478b0] relative">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="absolute left-4 top-4 flex items-center gap-2 px-3 py-2 text-white bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-center">PROJECT RECORDS</h1>
          <p className="text-center mt-2 opacity-90">
            Manage and view all project records
          </p>
        </div>
        {/* Search and Filter Section */}
        <div className="bg-white p-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by email, name, register no, project title..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                  onFocusCapture={(e) =>
                    Object.assign(e.target.style, inputFocusStyle)
                  }
                  onBlur={(e) => {
                    setTimeout(() => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }, 200);
                  }}
                />
                {/* Suggestions Dropdown */}
                {showSuggestions && (
                  <div
                    ref={suggestionsRef}
                    className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
                    style={{ marginTop: "2px" }}
                  >
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                          index === selectedSuggestionIndex
                            ? "bg-blue-50 border-blue-200"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {suggestion.type === "emailId" && (
                              <User className="w-4 h-4 text-gray-400" />
                            )}
                            {suggestion.type === "name" && (
                              <User className="w-4 h-4 text-gray-400" />
                            )}
                            {suggestion.type === "registerNumber" && (
                              <FileText className="w-4 h-4 text-gray-400" />
                            )}
                            {suggestion.type === "department" && (
                              <Settings className="w-4 h-4 text-gray-400" />
                            )}
                            {suggestion.type === "yearOfStudy" && (
                              <Calendar className="w-4 h-4 text-gray-400" />
                            )}
                            {suggestion.type === "instituteName" && (
                              <Home className="w-4 h-4 text-gray-400" />
                            )}
                            {suggestion.type === "projectTitle" && (
                              <FileText className="w-4 h-4 text-gray-400" />
                            )}
                            {suggestion.type === "projectGuideName" && (
                              <User className="w-4 h-4 text-gray-400" />
                            )}
                            {suggestion.type === "projectName" && (
                              <FileText className="w-4 h-4 text-gray-400" />
                            )}
                            {suggestion.type === "projectId" && (
                              <FileText className="w-4 h-4 text-gray-400" />
                            )}
                            {suggestion.type === "status" && (
                              <Settings className="w-4 h-4 text-gray-400" />
                            )}
                            {suggestion.type === "description" && (
                              <FileText className="w-4 h-4 text-gray-400" />
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {suggestion.value}
                              </div>
                              <div className="text-xs text-gray-500">
                                {suggestion.type.charAt(0).toUpperCase() +
                                  suggestion.type.slice(1)}{" "}
                                • {suggestion.record.name}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              suggestion.record.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {suggestion.record.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1); // Reset to first page when filtering
                  }}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                  onFocus={(e) =>
                    Object.assign(e.target.style, inputFocusStyle)
                  }
                  onBlur={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              {/* Add Project Record Button */}
              <div className="relative inline-block">
                <button
                  onClick={() => navigate("/admin/projectRecords")}
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all bg-[#3f6197] duration-200 hover:shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  Add Project Record
                </button>
              </div>
              {/* Export Button */}
              <div className="relative inline-block">
                <button
                  onClick={handleExport} // Implement export if needed
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all duration-200 hover:shadow-lg"
                  style={{
                    backgroundColor: "#3f6197",
                    background:
                      "linear-gradient(135deg, #3f6197 0%, #2f4d7a 100%)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background =
                      "linear-gradient(135deg, #2f4d7a 0%, #3f6197 100%)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background =
                      "linear-gradient(135deg, #3f6197 0%, #2f4d7a 100%)";
                  }}
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
          {/* Show count and reload below the bar */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing {filteredRecords.length} of {totalRecords} records (Page {currentPage} of {totalPages})
            </div>
            <button
              className="flex items-center text-sm text-white border hover:shadow-lg p-2 rounded-lg bg-gray-100 hover:text-gray-800 transition-all"
              onClick={() => {
                fetchRecords();
              }}
              disabled={isLoading}
            >
              <IoReload className={`w-5 h-5 text-gray-600 transition-all ${isLoading ? 'animate-spin' : 'hover:rotate-90'}`} />
              <span className="ml-1 text-sm text-gray-600">{isLoading ? 'Loading...' : 'Reload'}</span>
            </button>
          </div>
        </div>
        {/* Records Table */}
        <div className="bg-white shadow-lg rounded-b-lg overflow-hidden mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-8 w-8 text-[#3f6197] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span className="text-gray-600">Loading records...</span>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#5478b0]">
                  <tr className="text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Register No</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Year</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Institute</th>
                    {/* <th className="px-6 py-4 text-left text-sm font-semibold">Project Type</th> */}
                    <th className="px-6 py-4 text-left text-sm font-semibold">Project Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Guide</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, idx) => (
                    <tr key={idx} className={`border-b border-gray-200 hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                      <td className="px-6 py-4 text-sm text-gray-900">{record.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{record.emailId}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{record.registerNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{record.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{record.yearOfStudy}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{record.instituteName}</td>
                      {/* <td className="px-6 py-4 text-sm text-gray-700">{record.projectType}</td> */}
                      <td className="px-6 py-4 text-sm text-gray-700">{record.projectTitle}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{record.projectGuideName}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button onClick={() => handleViewDetails(record)} className="p-1 text-blue-600 hover:text-blue-800 transition-colors" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => navigate("/admin/projectRecords", { state: { record, isEdit: true } })} className="p-1 text-green-600 hover:text-green-800 transition-colors" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => setIsEdit({ isEdit: true, record })} className="p-1 text-red-600 hover:text-red-800 transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {!isLoading && filteredRecords.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No records found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="bg-white shadow-lg rounded-lg mt-4 p-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Records per page selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Records per page:</span>
                <select
                  value={recordsPerPage}
                  onChange={(e) => {
                    setRecordsPerPage(parseInt(e.target.value));
                    setCurrentPage(1); // Reset to first page
                  }}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* Pagination buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1 || isLoading}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1 || isLoading}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {(() => {
                    const pages = [];
                    const startPage = Math.max(1, currentPage - 2);
                    const endPage = Math.min(totalPages, currentPage + 2);
                    
                    for (let i = startPage; i <= endPage; i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i)}
                          disabled={isLoading}
                          className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
                            i === currentPage
                              ? 'bg-[#3f6197] text-white border-[#3f6197]'
                              : 'border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                          }`}
                        >
                          {i}
                        </button>
                      );
                    }
                    return pages;
                  })()}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || isLoading}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages || isLoading}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Last
                </button>
              </div>

              {/* Page info */}
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Details Modal */}
      {showDetails && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={handleCloseDetails}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="text-white p-6" style={{ background: "linear-gradient(135deg, #3f6197 0%, #2f4d7a 100%)" }}>
              <h2 className="text-2xl font-bold">Project Details</h2>
              <p className="opacity-90">{selectedRecord.projectTitle}</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" style={{ color: "#3f6197" }} />
                    Student Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedRecord.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedRecord.emailId}</p>
                    <p><span className="font-medium">Register No:</span> {selectedRecord.registerNumber}</p>
                    <p><span className="font-medium">Department:</span> {selectedRecord.department}</p>
                    <p><span className="font-medium">Year:</span> {selectedRecord.yearOfStudy}</p>
                    <p><span className="font-medium">Institute:</span> {selectedRecord.instituteName}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" style={{ color: "#3f6197" }} />
                    Project Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Project Type:</span> {selectedRecord.projectType}</p>
                    {selectedRecord.projectType === "OTHERS" && (
                      <p><span className="font-medium">Other Type:</span> {selectedRecord.otherProjectType}</p>
                    )}
                    <p><span className="font-medium">Project Title:</span> {selectedRecord.projectTitle}</p>
                    <p><span className="font-medium">Guide Name:</span> {selectedRecord.projectGuideName}</p>
                    <p><span className="font-medium">Duration:</span> {selectedRecord.projectDuration}</p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" style={{ color: "#3f6197" }} />
                    Project Image
                  </h3>
                  <div className="space-y-2">
                    {imageLoading && (
                      <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                        <div className="flex flex-col items-center">
                          <svg className="animate-spin h-8 w-8 text-[#3f6197] mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                          </svg>
                          <span className="text-sm text-gray-600">Loading image...</span>
                        </div>
                      </div>
                    )}
                    {imageError && (
                      <div className="flex items-center justify-center p-8 bg-red-50 rounded-lg">
                        <div className="flex flex-col items-center">
                          <X className="h-8 w-8 text-red-400 mb-2" />
                          <span className="text-sm text-red-600">{imageError}</span>
                        </div>
                      </div>
                    )}
                    {projectImage && !imageLoading && !imageError && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <img 
                          src={projectImage} 
                          alt="Project Image" 
                          className="max-w-full h-auto rounded-lg shadow-md mx-auto cursor-pointer hover:opacity-80 transition-opacity"
                          style={{ maxHeight: '400px' }}
                          onClick={() => setShowImageModal(true)}
                          onError={() => {
                            setImageError('Failed to display image');
                            setProjectImage(null);
                          }}
                        />
                        <p className="text-xs text-gray-500 text-center mt-2">Click to view full size</p>
                      </div>
                    )}
                    {!imageLoading && !imageError && !projectImage && (
                      <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                        <div className="flex flex-col items-center">
                          <FileText className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">No image available</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5" style={{ color: "#3f6197" }} />
                    Lab/Equipment Usage
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>{selectedRecord.labEquipmentUsage}</p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" style={{ color: "#3f6197" }} />
                    Project Members
                  </h3>
                  <div className="space-y-2 text-sm">
                    {selectedRecord.projectMembers && selectedRecord.projectMembers.length > 0 ? (
                      selectedRecord.projectMembers.map((member, idx) => (
                        <div key={idx} className="flex gap-4">
                          <span>{member.name}</span>
                          <span>({member.regNo}, {member.department}, {member.yearOfStudy})</span>
                        </div>
                      ))
                    ) : (
                      <span>No members listed</span>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5" style={{ color: "#3f6197" }} />
                    Components/Boards Required
                  </h3>
                  <div className="space-y-2 text-sm">
                    {selectedRecord.components && selectedRecord.components.length > 0 ? (
                      selectedRecord.components.map((comp, idx) => (
                        <span key={idx} className="inline-block bg-gray-200 rounded px-2 py-1 mr-2 mb-2 text-xs">{comp}</span>
                      ))
                    ) : (
                      <span>No components listed</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between gap-3 p-6 bg-gray-50 items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={async () => {
                    const newStatus = selectedRecord.status === 'active' ? 'completed' : 'active';
                    showNotification({
                      id: 'status-update',
                      title: 'Updating Status',
                      message: `Changing status to ${newStatus}...`,
                      loading: true,
                      autoClose: false,
                    });
                    try {
                      const id = selectedRecord._id || selectedRecord.projectId;
                      const response = await axios.put(`${api.web}api/v1/project/${id}`, { status: newStatus }, {
                        headers: { token: localStorage.getItem('token') }
                      });
                      if (response.data.success) {
                        setSelectedRecord(prev => ({ ...prev, status: newStatus }));
                        setRecords(records => records.map(r => (r._id === id || r.projectId === id) ? { ...r, status: newStatus } : r));
                        updateNotification({
                          id: 'status-update',
                          title: 'Status Updated',
                          message: `Status changed to ${newStatus}.`,
                          color: 'green',
                          icon: <Check className="w-4 h-4" />,
                          autoClose: 3000,
                        });
                      } else {
                        updateNotification({
                          id: 'status-update',
                          title: 'Update Failed',
                          message: response.data.message || 'Failed to update status.',
                          color: 'red',
                          icon: <X className="w-4 h-4" />,
                          autoClose: 3000,
                        });
                      }
                    } catch (error) {
                      updateNotification({
                        id: 'status-update',
                        title: 'Update Failed',
                        message: error?.response?.data?.message || error.message || 'Failed to update status.',
                        color: 'red',
                        icon: <X className="w-4 h-4" />,
                        autoClose: 3000,
                      });
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-white transition-all duration-200 ${selectedRecord.status === 'active' ? 'bg-green-400 hover:bg-green-500' : 'bg-blue-400 hover:bg-blue-500'}`}
                >
                  {selectedRecord.status}
                </button>
              </div>
              <button onClick={handleCloseDetails} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
      <Modal
        opened={isEdit.isEdit}
        onClose={() => setIsEdit({ ...isEdit, isEdit: false })}
        title="Delete Record"
        centered
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Delete Record</h2>
          <p className="text-gray-700 mb-6">Are you sure you want to delete this record? This action cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <button onClick={() => setIsEdit({ ...isEdit, isEdit: false })} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Delete</button>
          </div>
        </div>
      </Modal>

      {/* Image Modal */}
      {showImageModal && projectImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" onClick={() => setShowImageModal(false)}>
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={projectImage} 
              alt="Project Image - Full Size" 
              className="max-w-full max-h-full rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectRecordsData;
