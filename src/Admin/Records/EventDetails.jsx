import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  User,
  IndianRupee,
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  Mail,
  Phone,
  X,
  Check,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import api from "../../Api/api";
import { showNotification } from "@mantine/notifications";
import { Modal, Table, Pagination } from "@mantine/core";
import * as XLSX from "xlsx";

import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
const EventDetails = () => {
  const navigate = useNavigate();
  const { eventName } = useParams();

  const [eventSummary, setEventSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchInputRef = React.useRef(null);

  useEffect(() => {
    if (!searchTerm || !eventSummary?.registrations) {
      setSuggestions([]);
      return;
    }
    const searchLower = searchTerm.toLowerCase();
    const newSuggestions = [];
    eventSummary.registrations.forEach(reg => {
      if (reg.name && reg.name.toLowerCase().includes(searchLower)) {
        newSuggestions.push({ type: 'name', value: reg.name, label: reg.name, record: reg });
      }
      if (reg.email && reg.email.toLowerCase().includes(searchLower)) {
        newSuggestions.push({ type: 'email', value: reg.email, label: reg.email, record: reg });
      }
      if (reg.phone && reg.phone.toLowerCase().includes(searchLower)) {
        newSuggestions.push({ type: 'phone', value: reg.phone, label: reg.phone, record: reg });
      }
    });
    setSuggestions(newSuggestions.slice(0, 8));
    setSelectedSuggestionIndex(-1);
  }, [searchTerm, eventSummary]);

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.value);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    searchInputRef.current?.focus();
  };

  // Update Event Date Modal
  const [updateDateModalOpen, setUpdateDateModalOpen] = useState(false);
  const [newEventDate, setNewEventDate] = useState(null);
  const [updatingEventDate, setUpdatingEventDate] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(15);

  // Fetch event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${api.web}api/v1/events/summary/${encodeURIComponent(eventName)}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setEventSummary(response.data.data.eventSummary);
      } catch (error) {
        console.error("Error fetching event details:", error);
        showNotification({
          color: "red",
          title: "Error",
          message: "Failed to load event details",
          icon: <X size={16} />,
        });
        navigate("/admin/event-records-data");
      } finally {
        setLoading(false);
      }
    };

    if (eventName) {
      fetchEventDetails();
    }
  }, [eventName, navigate]);

  // Filter and sort registrations
  const filteredAndSortedRegistrations = React.useMemo(() => {
    if (!eventSummary?.registrations) return [];

    let filtered = eventSummary.registrations.filter(
      (registration) =>
        registration.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        registration.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        registration.phone?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort registrations
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === "amountPaid") {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      } else if (sortBy === "createdAt" || sortBy === "dateOfRegistration") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = String(aValue || "").toLowerCase();
        bValue = String(bValue || "").toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [eventSummary, searchTerm, sortBy, sortOrder]);

  // Pagination calculations
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredAndSortedRegistrations.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(
    filteredAndSortedRegistrations.length / recordsPerPage
  );

  // Handle delete
  const handleDelete = async () => {
    if (!recordToDelete) return;

    try {
      await axios.delete(
        `${api.web}api/v1/events/registrations/${recordToDelete.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      // Update local state
      setEventSummary((prev) => ({
        ...prev,
        registrations: prev.registrations.filter(
          (reg) => reg.id !== recordToDelete.id
        ),
        totalMembers: prev.totalMembers - 1,
        totalAmountPaid:
          prev.totalAmountPaid - (parseFloat(recordToDelete.amountPaid) || 0),
      }));

      setDeleteModalOpen(false);

      showNotification({
        color: "teal",
        title: "Success",
        message: "Registration deleted successfully!",
        icon: <Check size={16} />,
      });
    } catch (error) {
      console.error("Error deleting registration:", error);
      showNotification({
        color: "red",
        title: "Error",
        message: "Failed to delete registration",
        icon: <X size={16} />,
      });
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    if (!eventSummary?.registrations) return;

    const dataToExport = filteredAndSortedRegistrations.map((reg) => ({
      Name: reg.name || "",
      Email: reg.email || "",
      Phone: reg.phone || "",
      "Amount Paid": reg.amountPaid || "",
      "Registration Date": formatDate(reg.dateOfRegistration) || "",
      "Created At": formatDate(reg.createdAt) || "",
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, eventSummary.eventName);

    const colWidths = [
      { wch: 25 }, // Name
      { wch: 30 }, // Email
      { wch: 15 }, // Phone
      { wch: 15 }, // Amount Paid
      { wch: 20 }, // Registration Date
      { wch: 20 }, // Created At
    ];
    ws["!cols"] = colWidths;

    XLSX.writeFile(wb, `${eventSummary.eventName}_registrations.xlsx`);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "N/A";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!eventSummary) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Event not found</p>
          <button
            onClick={() => navigate("/admin/event-records-data")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fb] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/eventRecordsData")}
              className="flex items-center px-4 py-2 text-[#3f6197] bg-white border border-[#3f6197]/30 rounded-lg shadow hover:bg-[#3f6197]/10 transition"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              <span className="font-semibold">Back to Events</span>
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-[#3f6197] tracking-tight">
                {eventSummary.eventName}
              </h1>
              <p className="text-[#3f6197] text-sm mt-1">
                Event Registration Details
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setUpdateDateModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2 bg-[#3f6197] text-white rounded-lg shadow hover:bg-[#34517b] transition"
            >
              <Calendar className="h-5 w-5" />
              <span className="font-semibold">Update Event Date</span>
            </button>
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 px-5 py-2 bg-[#3f6197] text-white rounded-lg shadow hover:bg-[#34517b] transition"
            >
              <Download className="h-5 w-5" />
              <span className="font-semibold">Export Data</span>
            </button>
          </div>
        </div>

        {/* Event Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg border-t-4 border-[#3f6197] p-6 flex items-center gap-4">
            <div className="p-3 bg-[#3f6197]/10 rounded-full">
              <Users className="h-7 w-7 text-[#3f6197]" />
            </div>
            <div>
              <p className="text-xs text-[#3f6197] font-semibold uppercase">
                Total Registrations
              </p>
              <p className="text-3xl font-bold text-[#3f6197]">
                {eventSummary.totalMembers}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border-t-4 border-green-500 p-6 flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="h-7 w-7 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-green-500 font-semibold uppercase">
                Total Revenue
              </p>
              <p className="text-3xl font-bold text-green-900">
                {formatCurrency(eventSummary.totalAmountPaid)}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border-t-4 border-purple-500 p-6 flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="h-7 w-7 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-purple-500 font-semibold uppercase">
                Avg per Member
              </p>
              <p className="text-3xl font-bold text-purple-900">
                {formatCurrency(eventSummary.avgAmountPerMember)}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border-t-4 border-orange-500 p-6 flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Clock className="h-7 w-7 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-orange-500 font-semibold uppercase">
                Event Date
              </p>
              <p className="text-lg font-bold text-orange-900">
                {formatDate(eventSummary.eventDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:items-center gap-4 border border-[#3f6197]/20">
          <div className="relative flex-1">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#3f6197]" />
  <input
    type="text"
    value={searchTerm}
    ref={searchInputRef}
    onChange={e => {
      setSearchTerm(e.target.value);
      setShowSuggestions(true);
    }}
    onKeyDown={handleKeyDown}
    onFocus={() => searchTerm && suggestions.length > 0 && setShowSuggestions(true)}
    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
    className="w-full pl-10 pr-3 py-2 border border-[#3f6197]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] bg-[#3f6197]/5 placeholder-[#3f6197]/60"
    placeholder="Search registrations by name, email, or phone..."
  />
  {showSuggestions && suggestions.length > 0 && (
    <div className="absolute z-50 w-full mt-1 bg-white border border-[#3f6197]/20 rounded-md shadow-lg max-h-64 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <div
          key={`${suggestion.type}-${suggestion.value}-${index}`}
          className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#3f6197]/10 ${selectedSuggestionIndex === index ? 'bg-[#3f6197]/10' : ''}`}
          onMouseDown={() => handleSuggestionClick(suggestion)}
        >
          <div className="font-medium">{suggestion.label}</div>
          <div className="text-xs text-[#3f6197]">{suggestion.type}</div>
        </div>
      ))}
    </div>
  )}
</div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-[#3f6197]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] bg-[#3f6197]/5 text-[#3f6197]"
            >
              <option value="createdAt">Sort by Registration Time</option>
              <option value="name">Sort by Name</option>
              <option value="amountPaid">Sort by Amount</option>
              <option value="dateOfRegistration">Sort by Event Date</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-3 py-2 border border-[#3f6197]/30 rounded-lg bg-[#3f6197]/10 hover:bg-[#3f6197]/20 focus:outline-none focus:ring-2 focus:ring-[#3f6197] text-[#3f6197]"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
          <div className="px-6 py-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 sticky top-0 z-10">
            <h3 className="text-xl font-bold text-blue-900 tracking-wide">
              Registrations{" "}
              <span className="text-blue-500">
                ({filteredAndSortedRegistrations.length})
              </span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <Table striped highlightOnHover className="min-w-full">
              <thead className="bg-blue-50 sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    Amount Paid
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.length > 0 ? (
                  currentRecords.map((registration, index) => (
                    <tr
                      key={registration.id || index}
                      className="hover:bg-blue-50 transition"
                    >
                      <td className="flex items-center gap-3 py-3 px-4">
                        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-semibold text-blue-900">
                          {registration.name}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-400" />
                          <span className="text-blue-800">
                            {registration.email}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-blue-400" />
                          <span className="text-blue-800">
                            {registration.phone}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-green-700">
                        {formatCurrency(registration.amountPaid)}
                      </td>
                      <td className="py-3 px-4">
                        {formatDate(registration.dateOfRegistration)}
                      </td>
                      <td className="py-3 px-4">
                        {formatDate(registration.createdAt)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedRecord(registration);
                              setShowDetails(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-100 transition"
                            title="View Details"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              navigate("/admin/event-records", {
                                state: { isEdit: true, record: registration },
                              });
                              console.log("Edit record:", registration);
                            }}
                            className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 transition"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => {
                              setRecordToDelete(registration);
                              setDeleteModalOpen(true);
                            }}
                            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition"
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
                    <td colSpan="7" className="text-center py-8 text-blue-400">
                      {searchTerm
                        ? "No matching registrations found"
                        : "No registrations found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 border-t border-blue-100 bg-blue-50">
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

        {/* View Details Modal */}
        <Modal
          opened={showDetails}
          onClose={() => setShowDetails(false)}
          title={
            <span className="text-blue-900 font-bold text-lg">
              Registration Details
            </span>
          }
          size="lg"
          overlayProps={{ color: "#3f6197", opacity: 0.15, blur: 2 }}
          centered
        >
          {selectedRecord && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-800 text-lg">
                    Personal Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-blue-400">Full Name</p>
                      <p className="font-semibold text-blue-900 text-lg">
                        {selectedRecord.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-400">Email</p>
                      <p className="text-blue-800">{selectedRecord.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-400">Phone</p>
                      <p className="text-blue-800">{selectedRecord.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-800 text-lg">
                    Registration Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-blue-400">Amount Paid</p>
                      <p className="font-semibold text-green-700 text-lg">
                        {formatCurrency(selectedRecord.amountPaid)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-400">Registration Date</p>
                      <p className="text-blue-800">
                        {formatDate(selectedRecord.dateOfRegistration)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-400">Created At</p>
                      <p className="text-blue-800">
                        {formatDate(selectedRecord.createdAt)}
                      </p>
                    </div>
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
          title={
            <span className="text-red-700 font-bold text-lg">
              Delete Registration
            </span>
          }
          size="md"
          overlayProps={{ color: "#e53e3e", opacity: 0.12, blur: 2 }}
          centered
        >
          <div className="space-y-6">
            <p className="text-blue-900 text-base">
              Are you sure you want to delete the registration for{" "}
              <span className="font-bold text-red-700">
                {recordToDelete?.name}
              </span>
              ?<br />
              <span className="text-xs text-blue-400">
                This action cannot be undone.
              </span>
            </p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-5 py-2 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>

        {/* Update Event Date Modal */}
        <Modal
          opened={updateDateModalOpen}
          onClose={() => setUpdateDateModalOpen(false)}
          title={<span className="text-[#3f6197] font-bold text-lg">Update Event Date</span>}
          size="md"
          overlayProps={{ color: "#3f6197", opacity: 0.15, blur: 2 }}
          centered
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!newEventDate) {
                showNotification({
                  color: "red",
                  title: "Error",
                  message: "Please select a new event date.",
                  icon: <X size={16} />,
                });
                return;
              }
              setUpdatingEventDate(true);
              try {
                const res = await axios.put(
                  `${api.web}api/v1/events/records/update-by-eventname/${encodeURIComponent(eventSummary.eventName)}`,
                  { eventDate: newEventDate },
                  { headers: { token: localStorage.getItem("token") } }
                );
                showNotification({
                  color: "teal",
                  title: "Success",
                  message: res.data.message || "Event date updated!",
                  icon: <Check size={16} />,
                });
                setEventSummary((prev) => ({ ...prev, eventDate: newEventDate }));
                setUpdateDateModalOpen(false);
                setNewEventDate(null);
              } catch (err) {
                showNotification({
                  color: "red",
                  title: "Error",
                  message: err?.response?.data?.message || "Failed to update event date.",
                  icon: <X size={16} />,
                });
              } finally {
                setUpdatingEventDate(false);
              }
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-[#3f6197] font-semibold mb-2">New Event Date</label>
              <DateInput
                value={newEventDate}
                onChange={setNewEventDate}
                placeholder="Pick new event date"
                required
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setUpdateDateModalOpen(false)}
                className="px-5 py-2 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 transition"
                disabled={updatingEventDate}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#3f6197] hover:bg-[#34517b] transition"
                disabled={updatingEventDate}
              >
                {updatingEventDate ? "Updating..." : "Update Date"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default EventDetails;
