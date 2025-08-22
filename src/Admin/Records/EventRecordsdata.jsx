import React, { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../Api/api";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Modal, Table, Pagination, Button, Group } from "@mantine/core";
import * as XLSX from "xlsx";

const EventRecordsData = () => {
  const [records, setRecords] = useState([]);
  const [eventSummary, setEventSummary] = useState([]);
  const [eventsOverview, setEventsOverview] = useState(null);
  const [isEdit, setIsEdit] = useState({
    isEdit: false,
    record: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const fileInputRef = useRef(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch event records with pagination
  const fetchEventRecords = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: recordsPerPage.toString()
      });

      if (debouncedSearchTerm.trim()) {
        params.append('search', debouncedSearchTerm.trim());
      }

      const response = await axios.get(`${api.web}api/v1/events/registrations?${params.toString()}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (response.data.status === 'success') {
        setRecords(response.data.data.eventRecords || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalRecords(response.data.pagination?.totalEventRecords || 0);
      } else {
        setIsLoading(true);
        setTotalPages(1);
        setTotalRecords(0);
      }
    } catch (error) {
      console.error("Error fetching event records:", error);
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Failed to load event records',
        icon: <X size={16} />,
      });
      setRecords([]);
      setTotalPages(1);
      setTotalRecords(0);
    } finally {
      setIsLoading(false);
    }
  };

// ...existing code...
  // Handle Excel export
  const handleExport = async () => {
    try {
      setIsLoading(true);
      showNotification({
        id: 'excel-export',
        loading: true,
        title: 'Exporting Data',
  message: 'Please wait while we prepare your Excel file...',
  autoClose: false,
  disallowClose: true,
      });

      const response = await axios.get(`${api.web}api/v1/events/registrations/export-excel`, {
        headers: {
          token: localStorage.getItem("token"),
        },
        responseType: 'blob', // Important for file download
      });

      // Create blob and download
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `event_records_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      updateNotification({
        id: 'excel-export',
        color: 'teal',
        title: 'Export Successful',
        message: 'Event records have been exported to Excel successfully!',
        icon: <Check size={16} />,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      updateNotification({
        id: 'excel-export',
        color: 'red',
        title: 'Export Failed',
        message: error.response?.data?.message || 'Failed to export event records',
        icon: <X size={16} />,
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch event summary and overview with loading
  // Commented out as not used in EventRecords
/*
  const fetchData = async () => {
    setLoading(true);
    try {
      const [summaryRes, overviewRes] = await Promise.all([
        axios.get(`${api.web}api/v1/events/summary`, {
          headers: { token: localStorage.getItem("token") },
        }),
        axios.get(`${api.web}api/v1/events/overview`, {
          headers: { token: localStorage.getItem("token") },
        })
      ]);
      setEventSummary(summaryRes.data.data.eventSummary || []);
      setEventsOverview(overviewRes.data.data.overview || null);
    } catch (error) {
      // Notification for error intentionally commented out
      // showNotification({
      //   color: 'red',
      //   title: 'Error',
      //   message: 'Failed to load event data',
      //   icon: <X size={16} />,
      // });
    } finally {
      setLoading(false);
    }
  };
*/

  // Initial load
/*
  useEffect(() => {
    fetchData();
  }, []);
*/

  // Load event records when pagination or search changes
  useEffect(() => {
    fetchEventRecords();
  }, [currentPage, recordsPerPage, debouncedSearchTerm]);

  // Handle records per page change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [recordsPerPage, debouncedSearchTerm]);

  // Generate suggestions based on search term
  useEffect(() => {
    if (searchTerm.length > 0) {
      const searchLower = searchTerm.toLowerCase();
      const newSuggestions = [];

      // Search through records
      if (Array.isArray(records)) {
        records.forEach((record) => {
          // Check name
          if (record.name?.toLowerCase().includes(searchLower)) {
            newSuggestions.push({
              type: "name",
              value: record.name,
              record: record,
              label: `${record.name} (Name)`,
              source: "record"
            });
          }

          // Check email
          if (record.email?.toLowerCase().includes(searchLower)) {
            newSuggestions.push({
              type: "email",
              value: record.email,
              record: record,
              label: `${record.email} (Email)`,
              source: "record"
            });
          }

          // Check phone
          if (record.phone?.toLowerCase().includes(searchLower)) {
            newSuggestions.push({
              type: "phone",
              value: record.phone,
              record: record,
              label: `${record.phone} (Phone)`,
              source: "record"
            });
          }

          // Check event name
          if (record.eventName?.toLowerCase().includes(searchLower)) {
            newSuggestions.push({
              type: "event",
              value: record.eventName,
              record: record,
              label: `${record.eventName} (Event)`,
              source: "record"
            });
          }
        });
      }

      // Search through event summary data
      if (Array.isArray(eventSummary)) {
        eventSummary.forEach((event) => {
          // Check event name
          if (event.eventName?.toLowerCase().includes(searchLower)) {
            newSuggestions.push({
              type: "eventSummary",
              value: event.eventName,
              event: event,
              label: `${event.eventName} (${event.totalMembers} members, ${formatCurrency(event.totalAmountPaid)})`,
              source: "eventSummary"
            });
          }

          // Check by total members count
          if (event.totalMembers && event.totalMembers.toString().includes(searchTerm)) {
            newSuggestions.push({
              type: "memberCount",
              value: `${event.totalMembers} members`,
              event: event,
              label: `${event.eventName} - ${event.totalMembers} members`,
              source: "eventSummary"
            });
          }

          // Check by revenue amount
          if (event.totalAmountPaid && event.totalAmountPaid.toString().includes(searchTerm)) {
            newSuggestions.push({
              type: "revenue",
              value: formatCurrency(event.totalAmountPaid),
              event: event,
              label: `${event.eventName} - Revenue: ${formatCurrency(event.totalAmountPaid)}`,
              source: "eventSummary"
            });
          }
        });
      }

      // Remove duplicates and limit to 10 suggestions
      const uniqueSuggestions = newSuggestions
        .filter(
          (suggestion, index, self) =>
            index ===
            self.findIndex(
              (s) => s.value === suggestion.value && s.type === suggestion.type && s.source === suggestion.source
            )
        )
        .slice(0, 10);

      setSuggestions(uniqueSuggestions);
      setShowSuggestions(uniqueSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedSuggestionIndex(-1);
  }, [searchTerm, records, eventSummary]);

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

  // Handle keyboard navigation for suggestions
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
    if (suggestion.source === 'eventSummary') {
      // For event summary suggestions, set search term to the event name
      // so users can see all registrations for that event
      setSearchTerm(suggestion.event.eventName);
    } else {
      // For record suggestions, use the suggested value
      setSearchTerm(suggestion.value);
    }
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    
    // Reset pagination to first page when search changes
    setCurrentPage(1);
  };

  // Import from Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        // Show loading notification
        showNotification({
          id: 'import-excel',
          loading: true,
          title: 'Importing Data',
          message: 'Please wait while we import the data...',
          autoClose: false,
          disallowClose: true,
        });

        // Process and validate the data
        const recordsToImport = [];
        const errors = [];

        jsonData.forEach((row, index) => {
          // Skip empty rows
          if (!row['Name'] && !row['Email'] && !row['Phone'] && !row['Event Name']) {
            return;
          }

          const record = {
            name: row['Name'] || '',
            email: row['Email'] || '',
            phone: row['Phone'] ? String(row['Phone']) : '',
            eventName: row['Event Name'] || '',
            amountPaid: row['Amount Paid'] || '',
            dateOfRegistration: row['Date of Registration'] || new Date().toISOString().split('T')[0],
          };

          // Basic validation
          if (!record.name) {
            errors.push(`Row ${index + 2}: Name is required`);
            return;
          }
          if (!record.email) {
            errors.push(`Row ${index + 2}: Email is required`);
            return;
          }
          if (!record.phone) {
            errors.push(`Row ${index + 2}: Phone is required`);
            return;
          }
          if (!record.eventName) {
            errors.push(`Row ${index + 2}: Event Name is required`);
            return;
          }

          recordsToImport.push(record);
        });

        if (errors.length > 0) {
          throw new Error(`Validation failed:\n${errors.join('\n')}`);
        }

        // Import records
        const response = await axios.post(
          `${api.web}api/v1/events/registrations/bulk`,
          { records: recordsToImport },
          {
            headers: {
              'Content-Type': 'application/json',
              token: localStorage.getItem('token'),
            },
          }
        );

        // Update UI with new data
        fetchEventRecords();
        // fetchData(); // Also refresh summary data (commented out)
        
        updateNotification({
          id: 'import-excel',
          color: 'teal',
          title: 'Import Successful',
          message: `Successfully imported ${recordsToImport.length} records`,
          icon: <Check size={16} />,
          autoClose: 3000,
        });

      } catch (error) {
        console.error('Error importing Excel file:', error);
        
        updateNotification({
          id: 'import-excel',
          color: 'red',
          title: 'Import Failed',
          message: error.response?.data?.message || error.message || 'Failed to import data',
          icon: <X size={16} />,
          autoClose: 5000,
        });
      } finally {
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // Trigger file input click
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!recordToDelete) return;

    try {
      await axios.delete(`${api.web}api/v1/events/registrations/${recordToDelete._id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      
      // Refresh the event records
      fetchEventRecords();
      // fetchData(); // Also refresh summary data (commented out)
      setDeleteModalOpen(false);
      
      showNotification({
        color: 'teal',
        title: 'Success',
        message: 'Event registration deleted successfully!',
        icon: <Check size={16} />,
      });
    } catch (error) {
      console.error('Error deleting event registration:', error);
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Failed to delete event registration',
        icon: <X size={16} />,
      });
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
  <div className="min-h-screen bg-[#f6f8fb] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center px-4 py-2 text-[#3f6197] bg-white border border-[#3f6197]/30 rounded-lg shadow hover:bg-[#3f6197]/10 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="font-semibold">Back</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#3f6197] mb-4 md:mb-0">
            Event Registrations
          </h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/admin/event-records')}
              className="flex items-center justify-center px-4 py-2 text-sm text-white bg-[#3f6197] border border-transparent rounded-md shadow-sm hover:bg-[#34517b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3f6197]"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </button>
            <button
              onClick={handleExport}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 text-sm text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="mr-2 h-4 w-4" />
              {isLoading ? 'Exporting...' : 'Export Excel'}
            </button>
            {/* <button
              onClick={handleImportClick}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 text-sm text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v-4.992A2.25 2.25 0 005.25 9h13.5A2.25 2.25 0 0021 11.508V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Import Excel
            </button> */}
            <button
              onClick={fetchEventRecords}
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 text-sm text-[#3f6197] bg-white border border-[#3f6197]/30 rounded-md shadow-sm hover:bg-[#3f6197]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3f6197] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              {isLoading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1" ref={searchInputRef}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#3f6197]" />
              </div>
              <input
                type="text"
                ref={searchInputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => searchTerm && setShowSuggestions(true)}
                className="block w-full pl-10 pr-3 py-2 border border-[#3f6197]/30 rounded-md leading-5 bg-white placeholder-[#3f6197]/60 focus:outline-none focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] sm:text-sm"
                placeholder="Search by name, email, phone, event, revenue, or member count..."
              />
              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div 
                  ref={suggestionsRef}
                  className="absolute z-10 w-full mt-1 bg-white border border-[#3f6197]/20 rounded-md shadow-lg max-h-64 overflow-y-auto"
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={`${suggestion.type}-${suggestion.value}-${suggestion.source}`}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#3f6197]/10 ${
                        selectedSuggestionIndex === index ? 'bg-[#3f6197]/10' : ''
                      } ${suggestion.source === 'eventSummary' ? 'border-l-4 border-l-[#3f6197]' : ''}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="font-medium">{suggestion.label}</div>
                      <div className="text-xs text-[#3f6197]">
                        {suggestion.source === 'eventSummary' ? (
                          <>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#3f6197]/10 text-[#3f6197] mr-2">
                              Event Summary
                            </span>
                            {suggestion.event?.eventDate && `Date: ${formatDate(suggestion.event.eventDate)}`}
                          </>
                        ) : (
                          <>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#3f6197]/10 text-[#3f6197] mr-2">
                              Registration
                            </span>
                            {suggestion.record?.email || 'Individual record'}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* <div className="flex items-center">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-[#3f6197]/30 focus:outline-none focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] sm:text-sm rounded-md bg-white text-[#3f6197]"
              >
                <option value="all">All Registrations</option>
                <option value="recent">Recent (Last 7 days)</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div> */}
            {/* <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
              }}
              className="flex items-center justify-center px-4 py-2 text-sm text-[#3f6197] bg-white border border-[#3f6197]/30 rounded-md shadow-sm hover:bg-[#3f6197]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3f6197]"
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </button> */}
          </div>
        </div>

        {/* Pagination Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {records.length > 0 ? ((currentPage - 1) * recordsPerPage) + 1 : 0} to{" "}
            {Math.min(currentPage * recordsPerPage, totalRecords)} of {totalRecords} entries
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Records per page:</span>
            <select
              value={recordsPerPage}
              onChange={(e) => {
                setRecordsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing records per page
              }}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-6">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1 || isLoading}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1 || isLoading}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages || isLoading}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || isLoading}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        )}

        {/* Events Overview Dashboard */}
        {eventsOverview && (
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Events</p>
                    <p className="text-2xl font-bold text-gray-900">{eventsOverview.totalEvents}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Registrations</p>
                    <p className="text-2xl font-bold text-gray-900">{eventsOverview.totalRegistrations}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Download className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(eventsOverview.totalRevenue)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Filter className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Avg. per Event</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(eventsOverview.avgRevenuePerEvent)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Summary Cards */}
            {eventSummary.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Events Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {eventSummary
                    .filter(event => {
                      const searchLower = searchTerm.toLowerCase();
                      return (
                        searchTerm === "" ||
                        (event.eventName && event.eventName.toLowerCase().includes(searchLower)) ||
                        (event.totalMembers && event.totalMembers.toString().includes(searchTerm)) ||
                        (event.totalAmountPaid && formatCurrency(event.totalAmountPaid).toLowerCase().includes(searchLower)) ||
                        (event.avgAmountPerMember && formatCurrency(event.avgAmountPerMember).toLowerCase().includes(searchLower))
                      );
                    })
                    .map((event, index) => (
                      <div 
                        key={index} 
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => navigate(`/admin/event-details/${encodeURIComponent(event.eventName)}`)}
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">{event.eventName}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Members:</span>
                            <span className="font-medium">{event.totalMembers}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Revenue:</span>
                            <span className="font-medium text-green-600">{formatCurrency(event.totalAmountPaid)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Avg/Member:</span>
                            <span className="font-medium">{formatCurrency(event.avgAmountPerMember)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Date:</span>
                            <span className="font-medium">{formatDate(event.eventDate)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Event Records Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Event Registration Records</h3>
            <p className="text-sm text-gray-500 mt-1">
              {totalRecords} total registrations found
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-8 w-8 text-[#3f6197] mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span className="text-[#3f6197] font-semibold">Loading records...</span>
              </div>
            </div>
          ) : records.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Records Found</h3>
                <p className="text-gray-500">
                  {debouncedSearchTerm ? 'No records match your search criteria.' : 'No event registrations have been recorded yet.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registration Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {records.map((record, index) => (
                    <tr key={record._id || index} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/admin/event-details/${record.eventName}`)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-[#3f6197]/10 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-[#3f6197]" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{record.name}</div>
                            <div className="text-sm text-gray-500">ID: {record.userId || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Mail className="w-4 h-4 text-gray-400 mr-2" />
                          {record.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Phone className="w-4 h-4 text-gray-400 mr-2" />
                          {record.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{record.eventName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {formatCurrency(record.amountPaid)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(record.dateOfRegistration)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedRecord(record);
                              setShowDetails(true);
                            }}
                            className="text-[#3f6197] hover:text-[#2d4a7a] p-1 rounded"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setRecordToDelete(record);
                              setDeleteModalOpen(true);
                            }}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
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
        </div>

        {/* Bottom Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1 || isLoading}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1 || isLoading}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages || isLoading}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || isLoading}
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        )}
      </div>

      {/* Hidden file input for Excel import */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
      />

      {/* View Details Modal */}
      <Modal
        opened={showDetails}
        onClose={() => setShowDetails(false)}
        title="Event Registration Details"
        size="lg"
      >
        {selectedRecord && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{selectedRecord.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">User ID</p>
                  <p>{selectedRecord.userId || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{selectedRecord.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{selectedRecord.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Event Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Event Name</p>
                  <p>{selectedRecord.eventName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount Paid</p>
                  <p className="font-medium text-green-600">
                    {formatCurrency(selectedRecord.amountPaid)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registration Date</p>
                  <p>{formatDate(selectedRecord.dateOfRegistration)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Event Registration"
        size="md"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete the registration for <span className="font-semibold">{recordToDelete?.name}</span>?
            This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EventRecordsData;