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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const fileInputRef = useRef(null);

  // Fetch event registrations
  useEffect(() => {
    if (!isReload) return;

    const fetchEventRegistrations = async () => {
      try {
        const response = await axios.get(`${api.web}api/v1/events/registrations`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching event registrations:', error);
        showNotification({
          color: 'red',
          title: 'Error',
          message: 'Failed to load event registrations',
          icon: <X size={16} />,
        });
      } finally {
        setIsReload(false);
      }
    };
    
    fetchEventRegistrations();
  }, [isReload]);

  // Initial load
  useEffect(() => {
    setIsReload(true);
  }, []);

  // Generate suggestions based on search term
  useEffect(() => {
    if (searchTerm.length > 0) {
      const searchLower = searchTerm.toLowerCase();
      const newSuggestions = [];

      records.forEach((record) => {
        // Check name
        if (record.name?.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "name",
            value: record.name,
            record: record,
            label: `${record.name} (Name)`,
          });
        }

        // Check email
        if (record.email?.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "email",
            value: record.email,
            record: record,
            label: `${record.email} (Email)`,
          });
        }

        // Check phone
        if (record.phone?.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "phone",
            value: record.phone,
            record: record,
            label: `${record.phone} (Phone)`,
          });
        }

        // Check event name
        if (record.eventName?.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "event",
            value: record.eventName,
            record: record,
            label: `${record.eventName} (Event)`,
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
    setSearchTerm(suggestion.value);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  // Filter records based on search term and status
  const filteredRecords = records.filter(record => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      record.name?.toLowerCase().includes(searchLower) ||
      record.email?.toLowerCase().includes(searchLower) ||
      record.phone?.toLowerCase().includes(searchLower) ||
      record.eventName?.toLowerCase().includes(searchLower);
    
    return matchesSearch;
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  // Export to Excel
  const exportToExcel = () => {
    const dataToExport = filteredRecords.map(record => ({
      'Name': record.name || '',
      'Email': record.email || '',
      'Phone': record.phone || '',
      'Event Name': record.eventName || '',
      'Amount Paid': record.amountPaid || '',
      'Date of Registration': formatDate(record.dateOfRegistration) || '',
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Event Registrations');
    
    // Auto-size columns
    const colWidths = [
      { wch: 25 }, // Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 30 }, // Event Name
      { wch: 15 }, // Amount Paid
      { wch: 20 }, // Date of Registration
    ];
    ws['!cols'] = colWidths;
    
    XLSX.writeFile(wb, 'event_registrations.xlsx');
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
          `${api.web}api/v1/events/registrations/import`,
          { records: recordsToImport },
          {
            headers: {
              'Content-Type': 'application/json',
              token: localStorage.getItem('token'),
            },
          }
        );

        // Update UI with new data
        setIsReload(true);
        
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
      setRecords(records.filter(record => record._id !== recordToDelete._id));
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            Event Registrations
          </h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-2">
              <button
                onClick={exportToExcel}
                className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </button>
              <button
                onClick={handleImportClick}
                className="flex items-center px-4 py-2 text-sm text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Download className="mr-2 h-4 w-4" />
                Import
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".xlsx, .xls, .csv"
                className="hidden"
              />
            </div>
            <button
              onClick={() => navigate('/admin/event-records')}
              className="flex items-center justify-center px-4 py-2 text-sm text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1" ref={searchInputRef}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                ref={searchInputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => searchTerm && setShowSuggestions(true)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search by name, email, phone, or event..."
              />
              
              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div 
                  ref={suggestionsRef}
                  className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={`${suggestion.type}-${suggestion.value}`}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        selectedSuggestionIndex === index ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="font-medium">{suggestion.label}</div>
                      <div className="text-xs text-gray-500">
                        {suggestion.record.email}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Registrations</option>
                <option value="recent">Recent (Last 7 days)</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
            
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterStatus('all');
                setIsReload(true);
              }}
              className="flex items-center justify-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Event</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.length > 0 ? (
                  currentRecords.map((record) => (
                    <tr key={record._id}>
                      <td className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{record.name}</div>
                          <div className="text-xs text-gray-500">{record.userId || 'N/A'}</div>
                        </div>
                      </td>
                      <td>{record.eventName}</td>
                      <td>{record.email}</td>
                      <td>{record.phone}</td>
                      <td className="font-medium text-green-600">
                        {formatCurrency(record.amountPaid)}
                      </td>
                      <td>{formatDate(record.dateOfRegistration)}</td>
                      <td className="text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => {
                              setSelectedRecord(record);
                              setShowDetails(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => navigate('/admin/event-records', { state: { isEdit: true, record } })}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              setRecordToDelete(record);
                              setDeleteModalOpen(true);
                            }}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      {searchTerm ? 'No matching records found' : 'No event registrations found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 border-t border-gray-200">
              <Pagination
                total={totalPages}
                value={currentPage}
                onChange={setCurrentPage}
                position="center"
                withEdges
                className="mt-4"
              />
            </div>
          )}
        </div>
      </div>

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