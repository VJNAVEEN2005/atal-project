import React, { useEffect, useState } from "react";
import {
  Calendar,
  Mail,
  Phone,
  User,
  ArrowLeft,
  Check,
  X,
  DollarSign,
  CalendarDays,
  Ticket,
  FileText,
  Home,
  MapPin,
  Heart,
  Download,
  Upload,
  Eye,
  Trash2
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../Api/api";
import { showNotification, updateNotification } from "@mantine/notifications";
import * as XLSX from 'xlsx';

const EventRecords = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventName: "",
    amountPaid: "",
    dateOfRegistration: ""
  });

  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showImportModal, setShowImportModal] = useState(false);
  const [importedData, setImportedData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (location.state && location.state.isEdit) {
      const record = location.state.record;
      setFormData(prev => ({
        ...prev,
        ...record,
        dateOfRegistration: record.dateOfRegistration
          ? new Date(record.dateOfRegistration).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0]
      }));
      setIsEdit(true);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Map Excel columns to form fields
        const mappedData = jsonData.map((row, index) => ({
          id: index,
          name: row['Name'] || row['name'] || "",
          email: row['Email'] || row['email'] || "",
          phone: row['Phone'] || row['phone'] ? String(row['Phone'] || row['phone']) : "",
          eventName: row['Event Name'] || row['eventName'] || "",
          amountPaid: row['Amount Paid'] || row['amountPaid'] || "",
          dateOfRegistration: row['Date of Registration'] || row['dateOfRegistration'] || new Date().toISOString().split('T')[0],
          // Add validation flags
          hasErrors: false,
          errors: []
        }));

        // Validate data
        const validatedData = mappedData.map(record => {
          const errors = [];

          if (!record.name || record.name.trim() === '') {
            errors.push('Name is required');
          }

          if (!record.email || !/\S+@\S+\.\S+/.test(record.email)) {
            errors.push('Valid email is required');
          }

          if (!record.phone) {
            errors.push('Valid 10-digit phone number is required');
          }

          if (!record.eventName || record.eventName.trim() === '') {
            errors.push('Event name is required');
          }

          if (record.dateOfRegistration && isNaN(new Date(record.dateOfRegistration))) {
            errors.push('Invalid date format for registration date');
          }

          return {
            ...record,
            hasErrors: errors.length > 0,
            errors
          };
        });

        setImportedData(validatedData);
        setSelectedRows(validatedData.filter(record => !record.hasErrors).map((_, index) => index));
        setShowImportModal(true);

        const errorCount = validatedData.filter(record => record.hasErrors).length;

        showNotification({
          title: "File Uploaded",
          message: `Successfully parsed ${validatedData.length} records from Excel file${errorCount > 0 ? `. ${errorCount} records have validation errors.` : ''}`,
          color: errorCount > 0 ? "orange" : "green",
          icon: <Check className="w-4 h-4" />,
          autoClose: 3000,
        });
      } catch (error) {
        showNotification({
          title: "Import Error",
          message: "Failed to parse Excel file. Please check the format.",
          color: "red",
          icon: <X className="w-4 h-4" />,
          autoClose: 3000,
        });
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleRowSelection = (index) => {
    setSelectedRows(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    const validIndices = importedData
      .map((record, index) => ({ record, index }))
      .filter(({ record }) => !record.hasErrors)
      .map(({ index }) => index);

    if (selectedRows.length === validIndices.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(validIndices);
    }
  };

  const handleImportSelected = async () => {
    const selectedData = importedData.filter((_, index) => selectedRows.includes(index));

    if (selectedData.length === 0) {
      showNotification({
        title: "No Selection",
        message: "Please select at least one record to import",
        color: "orange",
        icon: <X className="w-4 h-4" />,
        autoClose: 3000,
      });
      return;
    }

    showNotification({
      id: "bulk-import",
      title: "Importing Records",
      message: `Importing ${selectedData.length} records...`,
      color: "blue",
      loading: true,
      autoClose: false,
    });

    try {
      const promises = selectedData.map(record => {
        // Clean and prepare the record data
        const cleanRecord = {
          name: record.name.trim(),
          email: record.email.trim(),
          phone: record.phone.trim(),
          eventName: record.eventName.trim(),
          amountPaid: record.amountPaid || 0,
          dateOfRegistration: record.dateOfRegistration || new Date().toISOString().split('T')[0]
        };

        return axios.post(`${api.web}api/v1/events/registrations`, cleanRecord, {
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem("token"),
          },
        });
      });

      const results = await Promise.allSettled(promises);
      const successful = results.filter(result => result.status === 'fulfilled').length;
      const failed = results.filter(result => result.status === 'rejected').length;

      // Log failed requests for debugging
      const failedResults = results.filter(result => result.status === 'rejected');
      if (failedResults.length > 0) {
        console.error('Failed import requests:', failedResults.map(result => result.reason));
      }

      updateNotification({
        id: "bulk-import",
        title: "Import Complete",
        message: `Successfully imported ${successful} records. ${failed > 0 ? `${failed} records failed.` : ''}`,
        color: failed > 0 ? "orange" : "green",
        icon: <Check className="w-4 h-4" />,
        loading: false,
        autoClose: 5000,
      });

      setShowImportModal(false);
      setImportedData([]);
      setSelectedRows([]);

    } catch (error) {
      console.error('Import error:', error);
      updateNotification({
        id: "bulk-import",
        title: "Import Failed",
        message: `Failed to import records: ${error.response?.data?.message || error.message || 'Please try again.'}`,
        color: "red",
        icon: <X className="w-4 h-4" />,
        loading: false,
        autoClose: 5000,
      });
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        "Name": "John Doe",
        "Email": "john.doe@example.com",
        "Phone": "9876543210",
        "Event Name": "Annual Tech Conference 2025",
        "Amount Paid": "1000",
        "Date of Registration": new Date().toISOString().split('T')[0]
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Event Registrations");

    // Auto-size columns
    const colWidths = [
      { wch: 25 }, // Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 30 }, // Event Name
      { wch: 15 }, // Amount Paid
      { wch: 20 }, // Date of Registration
    ];
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, "Event_Registration_Template.xlsx");

    showNotification({
      title: "Template Downloaded",
      message: "Excel template has been downloaded successfully",
      color: "green",
      icon: <Download className="w-4 h-4" />,
      autoClose: 3000,
    });
  };

  const inputFocusStyle = {
    borderColor: "#3f6197",
    boxShadow: `0 0 0 2px rgba(63, 97, 151, 0.2)`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.eventName) {
      showNotification({
        title: 'Validation Error',
        message: 'Please fill in all required fields',
        color: 'red',
        icon: <X size={16} />,
        autoClose: 3000,
      });
      return;
    }

    showNotification({
      id: 'save-event',
      loading: true,
      title: 'Saving Event Registration',
      message: 'Please wait while we save the event registration...',
      autoClose: false,
      disallowClose: true,
    });

    try {
      // Prepare the data to send
      const dataToSend = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        eventName: formData.eventName.trim(),
        amountPaid: formData.amountPaid || 0,
        dateOfRegistration: formData.dateOfRegistration || new Date().toISOString().split('T')[0]
      };

      const url = isEdit
        ? `${api.web}api/v1/events/registrations/${formData._id}`
        : `${api.web}api/v1/events/registrations`;

      const method = isEdit ? 'put' : 'post';

      const response = await axios[method](url, dataToSend, {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem("token"),
        },
      });

      updateNotification({
        id: 'save-event',
        color: 'teal',
        title: 'Success',
        message: isEdit
          ? 'Event registration updated successfully!'
          : 'Event registration created successfully!',
        icon: <Check size={16} />,
        autoClose: 2000,
      });

      navigate('/admin/eventRecordsData');
    } catch (error) {
      console.error('Error saving event registration:', error);
      updateNotification({
        id: 'save-event',
        color: 'red',
        title: 'Error',
        message: error.response?.data?.message || error.message || 'Failed to save event registration',
        icon: <X size={16} />,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="text-white relative bg-gradient-to-br from-[#3f6197] via-[#4a6fa5] to-[#5478b0] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>

            {/* Header Content */}
            <div className="relative z-10 px-6 py-8">
              {/* Top Row - Navigation and Actions */}
              <div className="flex justify-between items-center mb-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 px-4 py-2 text-white border border-white/30 rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white hover:shadow-lg hover:scale-105 backdrop-blur-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Back to Records</span>
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={downloadTemplate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/80 text-white border border-blue-400/50 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:scale-105 backdrop-blur-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span className="font-medium">Template</span>
                  </button>
                  <label className="flex items-center gap-2 px-4 py-2 bg-green-600/80 text-white border border-green-400/50 rounded-lg transition-all duration-300 hover:bg-green-600 hover:shadow-lg hover:scale-105 backdrop-blur-sm cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span className="font-medium">Import Excel</span>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Title Section */}
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
                  EVENT REGISTRATION
                </h1>
                <div className="w-24 h-1 bg-white/60 mx-auto rounded-full"></div>
                <p className="text-white/80 mt-3 text-lg font-light">
                  Event Management & Registration Portal
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={{
                        borderColor: "#3f6197",
                        boxShadow: `0 0 0 2px rgba(63, 97, 151, 0.2)`,
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={inputFocusStyle}
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={inputFocusStyle}
                      required
                    />
                  </div>
                </div>

                {/* Event Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Event Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Ticket className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="eventName"
                      value={formData.eventName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={inputFocusStyle}
                      required
                    />
                  </div>
                </div>

                {/* Amount Paid */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Amount Paid <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="amountPaid"
                      value={formData.amountPaid}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={inputFocusStyle}
                      required
                    />
                  </div>
                </div>

                {/* Date of Registration */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Registration <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CalendarDays className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="dateOfRegistration"
                      value={formData.dateOfRegistration}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={inputFocusStyle}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  {isEdit ? 'Update' : 'Save'} Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  {/* Import Modal */}
  {showImportModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] text-white p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Import Confirmation</h2>
            <button
              onClick={() => setShowImportModal(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="mt-2">Review and select records to import ({importedData.length} records found)</p>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleSelectAll}
                className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <Check className="w-4 h-4" />
                {(() => {
                  const validIndices = importedData
                    .map((record, index) => ({ record, index }))
                    .filter(({ record }) => !record.hasErrors)
                    .map(({ index }) => index);
                  return selectedRows.length === validIndices.length && validIndices.length > 0 ? 'Deselect All Valid' : 'Select All Valid';
                })()}
              </button>
              <span className="text-sm text-gray-600">
                {selectedRows.length} of {importedData.length} selected
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleImportSelected}
                disabled={selectedRows.length === 0}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Import Selected ({selectedRows.length})
              </button>
            </div>
          </div>

          <div className="overflow-auto max-h-[60vh] border rounded">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="p-2 text-left border-b w-10">
                    <input
                      type="checkbox"
                      checked={(() => {
                        const validIndices = importedData
                          .map((record, index) => ({ record, index }))
                          .filter(({ record }) => !record.hasErrors)
                          .map(({ index }) => index);
                        return selectedRows.length === validIndices.length && validIndices.length > 0;
                      })()}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </th>
                  <th className="p-2 text-left border-b">Name</th>
                  <th className="p-2 text-left border-b">Email</th>
                  <th className="p-2 text-left border-b">Phone</th>
                  <th className="p-2 text-left border-b">Event</th>
                  <th className="p-2 text-left border-b">Amount</th>
                  <th className="p-2 text-left border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {importedData.map((record, index) => (
                  <tr key={index} className={`border-b hover:bg-gray-50 ${selectedRows.includes(index) ? 'bg-blue-50' : ''} ${record.hasErrors ? 'bg-red-50' : ''}`}>
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => handleRowSelection(index)}
                        disabled={record.hasErrors}
                        className="rounded"
                      />
                    </td>
                    <td className="p-2 font-medium">{record.name || '-'}</td>
                    <td className="p-2">{record.email || '-'}</td>
                    <td className="p-2">{record.phone || '-'}</td>
                    <td className="p-2">{record.eventName || '-'}</td>
                    <td className="p-2">{record.amountPaid ? `$${record.amountPaid}` : '-'}</td>
                    <td className="p-2">
                      {record.hasErrors ? (
                        <div className="flex items-center gap-1">
                          <X className="w-4 h-4 text-red-500" />
                          <span className="text-red-600 text-xs" title={record.errors.join(', ')}>
                            {record.errors.length} error{record.errors.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-green-600 text-xs">Valid</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {importedData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No data to display
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Import Summary:</h4>
              <div className="flex gap-4 text-xs">
                <span className="text-green-600">
                  ✓ Valid: {importedData.filter(r => !r.hasErrors).length}
                </span>
                <span className="text-red-600">
                  ✗ Invalid: {importedData.filter(r => r.hasErrors).length}
                </span>
                <span className="text-blue-600">
                  📋 Selected: {selectedRows.length}
                </span>
              </div>
            </div>
            <h4 className="font-medium mb-2">Excel Column Mapping:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              <div><strong>Name:</strong> "Name" or "name" (required)</div>
              <div><strong>Email:</strong> "Email" or "email" (required, must be valid)</div>
              <div><strong>Phone:</strong> "Phone" or "phone" (required)</div>
              <div><strong>Event Name:</strong> "Event Name" or "eventName" (required)</div>
              <div><strong>Amount Paid:</strong> "Amount Paid" or "amountPaid" (optional)</div>
              <div><strong>Date of Registration:</strong> "Date of Registration" or "dateOfRegistration" (optional, defaults to today)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
  </>
  );
};

export default EventRecords;