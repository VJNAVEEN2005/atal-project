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
  Lock,
  Users,
  MoreVertical,
  ArrowUpDown,
  Grid3X3,
  List,
} from "lucide-react";
import { Modal } from "@mantine/core";
import axios from "axios";
import api from "../Api/api";
import { useNavigate } from "react-router-dom";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IoReload } from "react-icons/io5";

const TeamsSignUpControl = () => {
  const [teams, setTeams] = useState([
    {
      _id: "1",
      userId: "TM001",
      name: "John Doe",
      email: "john.doe@company.com",
      role: "Frontend Developer",
      phoneNumber: "+1 234 567 8900",
      address: "123 Main St, City, State 12345",
      dateOfBirth: "1990-01-15",
      linkedin: "linkedin.com/in/johndoe",
      domain: "Team Member",
    },
    {
      _id: "2",
      userId: "TM002",
      name: "Jane Smith",
      email: "jane.smith@company.com",
      role: "Backend Developer",
      phoneNumber: "+1 234 567 8901",
      address: "456 Oak Ave, City, State 12345",
      dateOfBirth: "1988-03-22",
      linkedin: "linkedin.com/in/janesmith",
      domain: "Team Member",
    },
    {
      _id: "3",
      userId: "TM003",
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      role: "UI/UX Designer",
      phoneNumber: "+1 234 567 8902",
      address: "789 Pine Rd, City, State 12345",
      dateOfBirth: "1992-07-10",
      linkedin: "linkedin.com/in/mikejohnson",
      domain: "Team Member",
    },
  ]);

  const [isEdit, setIsEdit] = useState({
    isEdit: false,
    record: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [viewMode, setViewMode] = useState("table"); // table or card
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isReload, setIsReload] = useState(true);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();
  // Generate suggestions based on search term
  useEffect(() => {
    if (searchTerm.length > 0) {
      const searchLower = searchTerm.toLowerCase();
      const newSuggestions = [];

      teams.forEach((team) => {
        // Check name
        if (team.name.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "name",
            value: team.name,
            record: team,
            label: `${team.name} (Name)`,
          });
        }

        // Check user ID
        if (team.userId.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "userId",
            value: team.userId,
            record: team,
            label: `${team.userId} (User ID)`,
          });
        }

        // Check role
        if (team.role.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "role",
            value: team.role,
            record: team,
            label: `${team.role} (Role)`,
          });
        }

        // Check email
        if (team.email.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "email",
            value: team.email,
            record: team,
            label: `${team.email} (Email)`,
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
  }, [searchTerm, teams]);

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

  useEffect(() => {
    if (!isReload) return;
    axios
      .get(`${api.web}api/v1/teamMembers`)
      .then((res) => {
        console.log("Fetched team members:", res.data.teamMembers);
        setTeams(res.data.teamMembers);
      })
      .catch((err) => {
        console.error("Error fetching team members:", err);
      })
      .finally(() => {
        setIsReload(false);
      });

    console.log("Reloading records:", isReload);
  }, [isReload]);

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

  // Sort teams
  const sortedTeams = [...teams].sort((a, b) => {
    const aValue = a[sortBy]?.toLowerCase() || "";
    const bValue = b[sortBy]?.toLowerCase() || "";

    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  // Filter teams based on search term and role
  const filteredTeams = sortedTeams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole =
      filterRole === "all" ||
      team.role.toLowerCase() === filterRole.toLowerCase();

    return matchesSearch && matchesRole;
  });

  const handleViewDetails = (team) => {
    setSelectedTeam(team);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedTeam(null);
  };

  const handleEdit = (team) => {
    console.log("Edit team:", team);
    navigate("/admin/teamsSignUp", {
      state: { record: team, isEdit: true },
    });
  };

  const handleDelete = (record) => {
    try {
      showNotification({
        id: "delete-confirmation",
        title: "Delete Team Member",
        message: "Are you sure you want to delete this team member?",
        color: "red",
        loading: true,
        autoClose: false,
      });
      console.log("Deleting team member:", record._id);
      console.log("API URL:", `${api.web}api/v1/deleteUser/${record._id}`);
      axios
        .delete(`${api.web}api/v1/deleteUser/${record._id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log("Deleted team member:", res.data);
          updateNotification({
            id: "delete-confirmation",
            color: "green",
            title: "Team Member Deleted",
            message: `${record.name} has been successfully deleted.`,
            loading: false,
            autoClose: 3000,
            icon: <Check className="w-4 h-4" />,
          });
          setIsEdit({ isEdit: false, record: null });
         
          setIsReload(true);
        });
    } catch (error) {
      updateNotification({
        id: "delete-confirmation",
        color: "red",
        title: "Error Deleting Team Member",
        message:
          "There was an error deleting the team member. Please try again.",
          loading: false,
        autoClose: 3000,
        icon: <X className="w-4 h-4" />,
      });
      console.error("Error deleting team member:", error);
    }
  };

  const handleExport = () => {
    const headers = [
      "User ID",
      "Name",
      "Email",
      "Role",
      "Phone Number",
      "Address",
      "Date of Birth",
      "LinkedIn",
    ].join(",");

    const rows = filteredTeams
      .map((team) =>
        [
          `"${team.userId}"`,
          `"${team.name}"`,
          `"${team.email}"`,
          `"${team.role}"`,
          `"${team.phoneNumber}"`,
          `"${team.address}"`,
          `"${team.dateOfBirth}"`,
          `"${team.linkedin}"`,
        ].join(",")
      )
      .join("\n");

    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Team_Members_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const TeamCard = ({ team }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl flex items-center justify-center text-white font-semibold text-lg">
              {team.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">
                {team.name}
              </h3>
              <p className="text-sm text-gray-500">{team.userId}</p>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-[#3f6197]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{team.role}</p>
              <p className="text-xs text-gray-500">{team.domain}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900">{team.email}</p>
              <p className="text-xs text-gray-500">Email</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-900">{team.phoneNumber}</p>
              <p className="text-xs text-gray-500">Phone</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <span className="px-3 py-1 bg-blue-50 text-[#3f6197] text-xs font-medium rounded-full">
            {team.domain}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => handleViewDetails(team)}
              className="p-2 text-[#5272a6] hover:text-[#3f6197] rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsEdit({ isEdit: true, record: team })}
              className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">
                      Team Members
                    </h1>
                    <p className="text-blue-100 mt-1">
                      Manage your team with ease
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">
                    {teams.length}
                  </div>
                  <div className="text-blue-100 text-sm">Total Members</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col justify-between lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f6197] focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <div
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto mt-2"
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
                          {suggestion.type === "userId" && (
                            <User className="w-4 h-4 text-gray-400" />
                          )}
                          {suggestion.type === "role" && (
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
                              • {suggestion.record.role}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f6197] focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Roles</option>
                  {Array.from(new Set(teams.map((team) => team.role))).map(
                    (role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white text-[#3f6197] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("card")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "card"
                      ? "bg-white text-[#3f6197] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>

              {/* Add Member Button */}
              <button
                onClick={() => navigate("/admin/teamsSignUp")}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#3f6197] to-[#5478b0] text-white rounded-xl hover:shadow-lg transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Add Member
              </button>

              {/* Export Button */}
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Showing {filteredTeams.length} of {teams.length} members
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsReload(true)}
                  className="flex items-center gap-1 p-2 rounded-lg bg-gray-400 text-white hover:shadow-md transition-colors"
                >
                  <IoReload className="w-4 h-4 text-white" />
                  Reload
                </button>
                <div className="w-3 h-3 bg-[#3f6197] rounded-full"></div>
                <span className="text-sm text-gray-600">Team Members</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === "table" ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort("userId")}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#3f6197] transition-colors"
                      >
                        User ID
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort("name")}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#3f6197] transition-colors"
                      >
                        Name
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <button
                        onClick={() => handleSort("role")}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#3f6197] transition-colors"
                      >
                        Role
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Contact
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTeams.map((team) => (
                    <tr
                      key={team._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                            {team.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {team.userId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {team.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {team.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {team.role}
                          </div>
                          <div className="text-sm text-gray-500">
                            {team.domain}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-3 h-3" />
                            {team.phoneNumber}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-3 h-3" />
                            {team.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(team)}
                            className="p-2 text-[#5272a6] hover:text-[#3f6197] rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() =>
                              setIsEdit({ isEdit: true, record: team })
                            }
                            className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
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

            {filteredTeams.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg text-gray-500">No team members found</p>
                <p className="text-sm text-gray-400">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team) => (
              <TeamCard key={team._id} team={team} />
            ))}
            {filteredTeams.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg text-gray-500">No team members found</p>
                <p className="text-sm text-gray-400">
                  Try adjusting your search criteria
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetails && selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                    {selectedTeam.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedTeam.name}
                    </h2>
                    <p className="text-blue-100">{selectedTeam.userId}</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseDetails}
                  className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#3f6197]" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-gray-900 font-medium">
                        {selectedTeam.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="text-gray-900 font-medium">
                        {selectedTeam.dateOfBirth || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">LinkedIn</p>
                      <p className="text-gray-900 font-medium">
                        {selectedTeam.linkedin ? (
                          <a
                            href={
                              selectedTeam.linkedin.startsWith("http")
                                ? selectedTeam.linkedin
                                : `https://${selectedTeam.linkedin}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#3f6197] hover:underline"
                          >
                            {selectedTeam.linkedin}
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#3f6197]" />
                    Work Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="text-gray-900 font-medium">
                        {selectedTeam.role}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Domain</p>
                      <p className="text-gray-900 font-medium">
                        {selectedTeam.domain}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[#3f6197]" />
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-900 font-medium">
                        {selectedTeam.phoneNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900 font-medium">
                        {selectedTeam.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#3f6197]" />
                    Address
                  </h3>
                  <div>
                    <p className="text-sm text-gray-500">Full Address</p>
                    <p className="text-gray-900 font-medium">
                      {selectedTeam.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
              <button
                onClick={handleCloseDetails}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        opened={isEdit.isEdit}
        onClose={() => setIsEdit({ isEdit: false, record: null })}
        title="Delete Team Member"
        centered
        overlayProps={{ blur: 3 }}
      >
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Are you sure you want to delete this team member?
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              This action cannot be undone. All data associated with{" "}
              {isEdit.record?.name} will be permanently removed.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsEdit({ isEdit: false, record: null })}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(isEdit.record)}
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

export default TeamsSignUpControl;
