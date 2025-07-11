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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const InternshipRecordsData = () => {
  // Sample data - replace with your actual data source
  const [records] = useState([
    {
      id: 1,
      internNo: "AIC-PECF/INT-001",
      name: "John Doe",
      dateOfJoining: "2024-01-15",
      designation: "Software Developer Intern",
      fatherName: "Robert Doe",
      bloodGroup: "A+",
      mobileNo: "+91 9876543210",
      emailId: "john.doe@email.com",
      permanentAddress: "123 Main St, City, State",
      maritalStatus: "single",
      status: "Active",
    },
    {
      id: 2,
      internNo: "AIC-PECF/INT-002",
      name: "Jane Smith",
      dateOfJoining: "2024-02-01",
      designation: "Marketing Intern",
      fatherName: "Michael Smith",
      bloodGroup: "B+",
      mobileNo: "+91 9876543211",
      emailId: "jane.smith@email.com",
      permanentAddress: "456 Oak Ave, City, State",
      maritalStatus: "single",
      status: "Active",
    },
    {
      id: 3,
      internNo: "AIC-PECF/INT-003",
      name: "Alice Johnson",
      dateOfJoining: "2024-01-20",
      designation: "Data Analyst Intern",
      fatherName: "David Johnson",
      bloodGroup: "O+",
      mobileNo: "+91 9876543212",
      emailId: "alice.johnson@email.com",
      permanentAddress: "789 Pine Rd, City, State",
      maritalStatus: "married",
      status: "Completed",
    },
    {
      id: 4,
      internNo: "AIC-PECF/INT-004",
      name: "Bob Wilson",
      dateOfJoining: "2024-02-15",
      designation: "UI/UX Design Intern",
      fatherName: "James Wilson",
      bloodGroup: "AB+",
      mobileNo: "+91 9876543213",
      emailId: "bob.wilson@email.com",
      permanentAddress: "321 Elm St, City, State",
      maritalStatus: "single",
      status: "Active",
    },
    {
      id: 5,
      internNo: "AIC-PECF/INT-005",
      name: "Carol Brown",
      dateOfJoining: "2024-01-10",
      designation: "HR Intern",
      fatherName: "William Brown",
      bloodGroup: "A-",
      mobileNo: "+91 9876543214",
      emailId: "carol.brown@email.com",
      permanentAddress: "654 Maple Dr, City, State",
      maritalStatus: "single",
      status: "Active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const navigate = useNavigate();

  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Generate suggestions based on search term
  useEffect(() => {
    if (searchTerm.length > 0) {
      const searchLower = searchTerm.toLowerCase();
      const newSuggestions = [];

      records.forEach((record) => {
        // Check name
        if (record.name.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "name",
            value: record.name,
            record: record,
            label: `${record.name} (Name)`,
          });
        }

        // Check intern number
        if (record.internNo.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "internNo",
            value: record.internNo,
            record: record,
            label: `${record.internNo} (Intern No)`,
          });
        }

        // Check designation
        if (record.designation.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "designation",
            value: record.designation,
            record: record,
            label: `${record.designation} (Designation)`,
          });
        }

        // Check email
        if (record.emailId.toLowerCase().includes(searchLower)) {
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
  };

  const handleSearchFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Filter records based on search term and status
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.internNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.emailId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      record.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

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
    // Add edit functionality here
  };

  const handleDelete = (record) => {
    console.log("Delete record:", record);
    // Add delete functionality here
  };

  const handleExport = () => {
    // Simple CSV export without external libraries
    const headers = [
      "Intern No",
      "Name",
      "Designation",
      "Date of Joining",
      "Father Name",
      "Blood Group",
      "Mobile No",
      "Email",
      "Address",
      "Marital Status",
      "Status",
    ].join(",");

    const rows = filteredRecords
      .map((record) =>
        [
          `"${record.internNo}"`,
          `"${record.name}"`,
          `"${record.designation}"`,
          `"${record.dateOfJoining}"`,
          `"${record.fatherName}"`,
          `"${record.bloodGroup}"`,
          `"${record.mobileNo}"`,
          `"${record.emailId}"`,
          `"${record.permanentAddress}"`,
          `"${record.maritalStatus}"`,
          `"${record.status}"`,
        ].join(",")
      )
      .join("\n");

    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Internship_Records_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const inputFocusStyle = {
    borderColor: "#3f6197",
    boxShadow: `0 0 0 2px rgba(63, 97, 151, 0.2)`,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-white p-6 rounded-t-lg bg-gradient-to-r from-[#3f6197] to-[#5478b0]">
          <h1 className="text-3xl font-bold text-center">INTERNSHIP RECORDS</h1>
          <p className="text-center mt-2 opacity-90">
            Manage and view all internship records
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
                  onChange={(e) => setFilterStatus(e.target.value)}
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

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredRecords.length} of {records.length} records
          </div>
        </div>

        {/* Records Table */}
        <div className="bg-white shadow-lg rounded-b-lg overflow-hidden">
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
                          <span className="text-xs">{record.mobileNo}</span>
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
                          record.status === "Active"
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
                          onClick={() => handleDelete(record)}
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

          {filteredRecords.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No records found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
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
                      {selectedRecord.mobileNo}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipRecordsData;
