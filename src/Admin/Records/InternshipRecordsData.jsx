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
  Phone,
  Mail,
  MapPin,
  Plus,
  X,
  Check,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../Api/api";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Modal } from "@mantine/core";
import { IoReload } from "react-icons/io5";

const InternshipRecordsData = () => {
  // Input focus style for consistent styling
  const inputFocusStyle = {
    borderColor: "#3f6197",
    boxShadow: "0 0 0 3px rgba(63, 97, 151, 0.1)"
  };

  // Sample data - replace with your actual data source
  const [records, setRecords] = useState([]);
  const [isEdit, setIsEdit] = useState({
    isEdit: false,
    record: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isReload, setIsReload] = useState(false);

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

      const response = await axios.get(`${api.web}api/v1/internships?${params.toString()}`);
      
      if (response.data.success) {
        setRecords(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setTotalRecords(response.data.pagination.totalInternships);
        console.log("Internship records fetched successfully:", response.data);
      } else {
        console.error("Failed to fetch internship records");
        showNotification({
          title: "Error",
          message: "Failed to fetch internship records",
          color: "red"
        });
      }
    } catch (error) {
      console.error("Error fetching internship records:", error);
      showNotification({
        title: "Error",
        message: "Error fetching internship records",
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
        // Check name
        if (record.name && record.name.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "name",
            value: record.name,
            record: record,
            label: `${record.name} (Name)`,
          });
        }

        // Check intern number
        if (record.internNo && record.internNo.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "internNo",
            value: record.internNo,
            record: record,
            label: `${record.internNo} (Intern No)`,
          });
        }

        // Check designation
        if (record.designation && record.designation.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "designation",
            value: record.designation,
            record: record,
            label: `${record.designation} (Designation)`,
          });
        }

        // Check email
        if (record.emailId && record.emailId.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "email",
            value: record.emailId,
            record: record,
            label: `${record.emailId} (Email)`,
          });
        }
      });

      // Remove duplicates and limit to 8 suggestions
      const uniqueSuggestions = newSuggestions
        .filter(
          (suggestion, index, self) =>
            index ===
            self.findIndex(
              (s) => s.value === suggestion.value && s.type === suggestion.type
            )
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

  const updateInternshipStatus = () => {
    // Add logic to update internship status
    const updatedStatus =
      selectedRecord.status === "active" ? "completed" : "active";
    setSelectedRecord({ ...selectedRecord, status: updatedStatus });
    console.log("Updating internship status to:", selectedRecord);
    showNotification({
      id: "status-update",
      title: "Status Updated",
      message: `Internship status changing to ${updatedStatus}`,
      color: "green",
      loading: true,
      autoClose: false,
    });
    axios
      .put(
        `${api.web}api/v1/internship/${selectedRecord._id}`,
        { ...selectedRecord, status: updatedStatus },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          console.log("Internship status updated successfully");
          updateNotification({
            id: "status-update",
            title: "Status Updated",
            message: `Internship status changed to ${updatedStatus}`,
            color: "green",
            icon: <Check className="w-4 h-4" />,
            loading: false,
            autoClose: 3000,
          });
          handleCloseDetails();
          fetchRecords(); // Refresh current page data
        } else {
          updateNotification({
            id: "status-update",
            title: "Status Update Failed",
            message: "Failed to update internship status",
            color: "red",
            loading: false,
            icon: <X className="w-4 h-4" />,
            autoClose: 3000,
          });
          console.error("Failed to update internship status");
        }
      })
      .catch((error) => {
        console.error("Error updating internship status:", error);
        updateNotification({
          id: "status-update",
          title: "Status Update Failed",
          message: error.message || "An error occurred while updating status",
          color: "red",
          loading: false,
          icon: <X className="w-4 h-4" />,
          autoClose: 3000,
        });
      });
  };

  // Since we're using server-side filtering, we display all records from the API
  const filteredRecords = records;

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedRecord(null);
  };

  const handleEdit = (record) => {
    console.log("Edit record:", record);
    navigate("/admin/internshipRecords", {
      state: { record: record, isEdit: true },
    });
    // Add edit functionality here
  };

  const handleDelete = () => {
    showNotification({
      id: "delete-confirm",
      title: "Delete Record",
      message: `The Record ${isEdit.record.internNo} will be deleted`,
      color: "blue",
      loading: true,
      autoClose: false,
    });
    console.log("Delete record:", isEdit.record);
    axios
      .delete(`${api.web}api/v1/internship/${isEdit.record._id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.success) {
          setRecords(records.filter((r) => r._id !== isEdit.record._id));
          updateNotification({
            id: "delete-confirm",
            title: "Record Deleted",
            message: `Internship record ${isEdit.record.internNo} deleted successfully`,
            color: "green",
            icon: <Check className="w-4 h-4" />,
            loading: false,
            autoClose: 3000,
          });
          setIsEdit({ isEdit: false, record: null });
        } else {
          updateNotification({
            id: "delete-confirm",
            title: "Delete Failed",
            message: response.data.message || "Failed to delete record",
            color: "red",
            loading: false,
            icon: <X className="w-4 h-4" />,
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
        updateNotification({
          id: "delete-confirm",
          title: "Delete Error",
          message: error.message || "An error occurred while deleting record",
          color: "red",
          loading: false,
          icon: <X className="w-4 h-4" />,
          autoClose: 3000,
        });
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
        `${api.web}api/v1/internships/export/excel?${params.toString()}`,
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
      let filename = 'internship_records_export.xlsx';
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
        message: 'Internship records exported successfully to Excel.',
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
        <div className="text-white relative bg-gradient-to-br from-[#3f6197] via-[#4a6fa5] to-[#5478b0] overflow-hidden rounded-t-lg">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          {/* Header Content */}
          <div className="relative z-10 px-6 py-6">
            {/* Top Row - Navigation */}
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 px-4 py-2 text-white border border-white/30 rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white hover:shadow-lg hover:scale-105 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back</span>
              </button>
              
              <div className="text-right">
                <p className="text-white/80 text-sm font-light">
                  Records Management Portal
                </p>
              </div>
            </div>

            {/* Title Section */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
                INTERNSHIP RECORDS
              </h1>
              <div className="w-24 h-1 bg-white/60 mx-auto rounded-full"></div>
              <p className="text-white/80 mt-3 text-lg font-light">
                Manage and view all internship records
              </p>
            </div>
          </div>
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
                  placeholder="Search by name, intern no, designation, or email..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                  onFocusCapture={(e) =>
                    Object.assign(e.target.style, inputFocusStyle)
                  }
                  onBlur={(e) => {
                    // Delay to allow suggestion clicks
                    setTimeout(() => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }, 200);
                  }}
                />
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <div
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
                  style={{ marginTop: "2px" }}
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={`${suggestion.type}-${suggestion.value}`}
                      className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                        index === selectedSuggestionIndex
                          ? "bg-blue-50 border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {suggestion.type === "name" && (
                            <User className="w-4 h-4 text-gray-400" />
                          )}
                          {suggestion.type === "internNo" && (
                            <Search className="w-4 h-4 text-gray-400" />
                          )}
                          {suggestion.type === "designation" && (
                            <Calendar className="w-4 h-4 text-gray-400" />
                          )}
                          {suggestion.type === "email" && (
                            <Mail className="w-4 h-4 text-gray-400" />
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
                            suggestion.record.status === "Active"
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

              {/* Add Record Button */}
              <div className="relative inline-block">
                <button
                  onClick={() => navigate("/admin/internshipRecords")}
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all bg-[#3f6197] duration-200 hover:shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  Add Record
                </button>
              </div>

              <div className="relative inline-block">
                <button
                  onClick={handleExport}
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

          <div className=" flex items-center justify-between">
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredRecords.length} of {totalRecords} records (Page {currentPage} of {totalPages})
            </div>
            <button
              className="flex items-center text-sm text-white border hover:shadow-lg  p-2 rounded-lg bg-gray-100 hover:text-gray-800 transition-all mt-4"
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
        <div className="bg-white shadow-lg rounded-b-lg overflow-hidden">
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
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Intern No
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Designation
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Date of Joining
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr
                      key={record.id}
                      className={`border-b border-gray-200 hover:bg-gray-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {record.internNo}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {record.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {record.designation}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(record.dateOfJoining).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span className="text-xs">{record.phoneNumber}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span className="text-xs">{record.emailId}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            record.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDetails(record)}
                            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(record)}
                            className="p-1 text-yellow-600 hover:text-yellow-800 transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              setIsEdit({ isEdit: true, record: record })
                            }
                            className="p-1 text-red-600 hover:text-red-800 transition-colors"
                            title="Delete"
                          >
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div
              className="text-white p-6"
              style={{
                background: "linear-gradient(135deg, #3f6197 0%, #2f4d7a 100%)",
              }}
            >
              <h2 className="text-2xl font-bold">Intern Details</h2>
              <p className="opacity-90">{selectedRecord.internNo}</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" style={{ color: "#3f6197" }} />
                    Personal Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedRecord.name}
                    </p>
                    <p>
                      <span className="font-medium">Father's Name:</span>{" "}
                      {selectedRecord.fatherName}
                    </p>
                    <p>
                      <span className="font-medium">Blood Group:</span>{" "}
                      {selectedRecord.bloodGroup}
                    </p>
                    <p>
                      <span className="font-medium">Marital Status:</span>{" "}
                      {selectedRecord.maritalStatus}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Calendar
                      className="w-5 h-5"
                      style={{ color: "#3f6197" }}
                    />
                    Work Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Designation:</span>{" "}
                      {selectedRecord.designation}
                    </p>
                    <p>
                      <span className="font-medium">Date of Joining:</span>{" "}
                      {new Date(
                        selectedRecord.dateOfJoining
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          selectedRecord.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {selectedRecord.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Phone className="w-5 h-5" style={{ color: "#3f6197" }} />
                    Contact Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Mobile:</span>{" "}
                      {selectedRecord.phoneNumber}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {selectedRecord.emailId}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5" style={{ color: "#3f6197" }} />
                    Address
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Permanent Address:</span>{" "}
                      {selectedRecord.permanentAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 bg-gray-50">
              <button
                onClick={handleCloseDetails}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleEdit(selectedRecord);
                  handleCloseDetails();
                }}
                className="px-4 py-2 text-white rounded-lg transition-all duration-200"
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
                Edit Record
              </button>
              <button
                onClick={updateInternshipStatus}
                className={`px-4 py-2 rounded-lg text-white transition-all duration-200 ${
                  selectedRecord.status === "active"
                    ? "bg-green-400 hover:bg-green-500"
                    : "bg-blue-400 hover:bg-blue-500"
                }`}
              >
                {selectedRecord.status}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal for deleting popup */}
      <Modal
        opened={isEdit.isEdit}
        onClose={() =>
          setIsEdit({
            ...isEdit,
            isEdit: false,
          })
        }
        title="Delete Record"
        centered
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Delete Record</h2>
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete this record? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() =>
                setIsEdit({
                  ...isEdit,
                  isEdit: false,
                })
              }
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDelete();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InternshipRecordsData;
