import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../Api/api";

const AdminControl = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  
  // Search functionality
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    usersPerPage: 10,
    hasNextPage: false,
    hasPreviousPage: false
  });
  
  // Refs for search functionality
  const searchInputRef = React.useRef(null);
  const suggestionsRef = React.useRef(null);

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const fetchUsers = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${api.web}api/v1/getAllUsersPaginated?page=${page}&limit=${usersPerPage}`, {
        headers: { token: localStorage.getItem('token') },
      });
      if (res.data.success) {
        setUsers(res.data.users);
        setPagination(res.data.pagination);
        setCurrentPage(page);
        setIsSearchMode(false);
        setSearchResults([]);
      } else {
        setMessage({ text: "Failed to fetch users", type: "error" });
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setMessage({ text: "Error fetching users", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const updateAdminStatus = async (userId, adminLevel) => {
    try {
      const res = await axios.post(`${api.web}api/v1/updateAdminStatus`, {
        _id: userId,
        admin: adminLevel
      }, {
        headers: { token: localStorage.getItem('token') }
      });
      
      if (res.data.success) {
        // Update users in current view
        if (isSearchMode) {
          setSearchResults(searchResults.map(user => 
            user._id === userId ? { ...user, admin: adminLevel } : user
          ));
        } else {
          setUsers(users.map(user => 
            user._id === userId ? { ...user, admin: adminLevel } : user
          ));
        }
        setMessage({ 
          text: `Admin status updated to ${adminLevel === 1 ? 'Admin1' : adminLevel === 2 ? 'Admin2' : 'User'}`, 
          type: "success" 
        });
      } else {
        setMessage({ text: res.data.message || "Update failed", type: "error" });
      }
    } catch (err) {
      console.error("Error updating admin status:", err);
      setMessage({ text: "Error updating admin status", type: "error" });
    }
  };

  // Helper functions for search suggestions
  const getInitial = (name) => {
    if (!name || typeof name !== 'string') return '?';
    return name.trim().charAt(0).toUpperCase();
  };

  const getAllStringFields = (user) => {
    const fields = [];
    for (const key in user) {
      if (
        typeof user[key] === 'string' &&
        user[key] &&
        key !== '_id' &&
        key !== '__v' &&
        key !== 'password' &&
        key !== 'confirmPassword' &&
        key !== 'profilePhoto' &&
        key !== 'profilePhotoId' &&
        key !== 'profilePhotoUrl'
      ) {
        fields.push({
          type: key,
          value: user[key],
          user,
          label: `${user[key]} (${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())})`
        });
      }
    }
    return fields;
  };

  // Suggestions effect
  React.useEffect(() => {
    if (searchTerm.length > 1) {
      const searchLower = searchTerm.toLowerCase();
      let newSuggestions = [];
      
      const usersToSearch = isSearchMode ? searchResults : users;
      
      usersToSearch.forEach((user) => {
        getAllStringFields(user).forEach((field) => {
          if (field.value.toLowerCase().includes(searchLower)) {
            newSuggestions.push({
              ...field,
              priority: field.value.toLowerCase().startsWith(searchLower) ? 1 : 2
            });
          }
        });
      });
      
      newSuggestions.sort((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority;
        return a.value.localeCompare(b.value);
      });
      
      const uniqueSuggestions = newSuggestions
        .filter((suggestion, index, self) =>
          index === self.findIndex((s) => s.value.toLowerCase() === suggestion.value.toLowerCase() && s.type === suggestion.type)
        )
        .slice(0, 8);
      
      setSuggestions(uniqueSuggestions);
      setShowSuggestions(uniqueSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedSuggestionIndex(-1);
  }, [searchTerm, users, searchResults, isSearchMode]);

  // Handle search functionality
  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setIsSearchMode(false);
      setSearchResults([]);
      setCurrentPage(1);
      fetchUsers(1);
      return;
    }

    setIsSearchMode(true);
    setIsLoading(true);
    setCurrentPage(1);
    setMessage({ text: "", type: "" });

    try {
      const res = await axios.get(`${api.web}api/v1/searchUsers?search=${encodeURIComponent(searchQuery.trim())}&page=1&limit=${usersPerPage}`, {
        headers: { token: localStorage.getItem('token') },
      });
      
      if (res.data.success) {
        setSearchResults(res.data.users);
        setPagination(res.data.pagination);
      } else {
        setMessage({ text: res.data.message || 'No users found', type: "error" });
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Error searching users:", err);
      setMessage({ text: "Error searching users", type: "error" });
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = async (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    
    setIsLoading(true);
    setCurrentPage(newPage);
    
    try {
      const apiUrl = isSearchMode && searchTerm.trim()
        ? `${api.web}api/v1/searchUsers?search=${encodeURIComponent(searchTerm.trim())}&page=${newPage}&limit=${usersPerPage}`
        : `${api.web}api/v1/getAllUsersPaginated?page=${newPage}&limit=${usersPerPage}`;
      
      const res = await axios.get(apiUrl, {
        headers: { token: localStorage.getItem('token') },
      });
      
      if (res.data.success) {
        if (isSearchMode) {
          setSearchResults(res.data.users);
        } else {
          setUsers(res.data.users);
        }
        setPagination(res.data.pagination);
      } else {
        setMessage({ text: res.data.message || 'No users found', type: "error" });
      }
    } catch (err) {
      console.error("Error fetching page:", err);
      setMessage({ text: "Error fetching users", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.value);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    
    setTimeout(() => {
      handleSearch(suggestion.value);
    }, 100);
    
    searchInputRef.current?.focus();
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch(searchTerm);
        setShowSuggestions(false);
        return;
      }
      return;
    }
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else {
          handleSearch(searchTerm);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  // Handle clicking outside to close suggestions
  React.useEffect(() => {
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get current users to display
  const displayUsers = isSearchMode ? searchResults : users;

  return (
    <>
      <div className="max-w-6xl mx-auto my-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Control</h1>
              <p className="text-blue-100">Manage user admin access levels</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
  {/* Admin Dashboard Quick Links */}
  {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
    <a href="/admin/internshipRecords" className="bg-blue-50 hover:bg-blue-100 transition p-6 rounded-lg shadow flex items-center gap-4">
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422A12.083 12.083 0 0121 13.5c0 4.694-3.806 8.5-8.5 8.5S4 18.194 4 13.5a12.083 12.083 0 012.84-2.922L12 14z"/></svg>
      <div>
        <div className="font-bold text-blue-900">Internship Records</div>
        <div className="text-xs text-blue-700">Manage Intern profiles</div>
      </div>
    </a>
    <a href="/admin/projectRecordsData" className="bg-green-50 hover:bg-green-100 transition p-6 rounded-lg shadow flex items-center gap-4">
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6v6l4 2" /><circle cx="12" cy="12" r="10" /></svg>
      <div>
        <div className="font-bold text-green-900">Project Records</div>
        <div className="text-xs text-green-700">Manage Project Discovery applications</div>
      </div>
    </a>
  </div> */}
        {/* Message */}
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </span>
            {message.text}
          </div>
        )}

        {/* Search and Refresh */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="relative w-full md:w-96 mb-4 md:mb-0">
            <input
              ref={searchInputRef}
              type="text"
              placeholder={isSearchMode ? "Search across all users..." : "Search users..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (searchTerm.length > 1 && suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              className="w-full pl-10 pr-16 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] transition-all duration-200"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            
            {/* Search Button */}
            <button
              onClick={() => handleSearch(searchTerm)}
              disabled={isLoading}
              className="absolute right-2 top-2 px-3 py-2 bg-gradient-to-r from-[#3f6197] to-[#5478b0] text-white rounded-lg hover:shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3f6197] focus:ring-offset-2"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute left-0 right-0 top-full z-30 bg-white border border-gray-200 rounded-xl shadow-xl mt-2 max-h-72 overflow-y-auto"
                style={{ boxShadow: '0 10px 40px rgba(63, 97, 151, 0.1)' }}
              >
                <div className="px-3 py-2 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Search Suggestions
                </div>
                {suggestions.map((suggestion, idx) => (
                  <div
                    key={`${suggestion.type}-${suggestion.value}-${idx}`}
                    className={`px-4 py-3 cursor-pointer border-b border-gray-50 last:border-b-0 transition-all duration-150 flex items-center gap-3 ${
                      idx === selectedSuggestionIndex
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
                        : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50'
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    onMouseEnter={() => setSelectedSuggestionIndex(idx)}
                  >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#3f6197] to-[#5478b0] text-white font-bold text-sm">
                      {getInitial(suggestion.user.name)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {suggestion.value}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {suggestion.user.name} • {suggestion.type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                      Admin {suggestion.user.admin || 'User'}
                    </div>
                  </div>
                ))}
                {searchTerm.length > 1 && (
                  <div className="px-4 py-2 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100 text-center">
                    <span className="text-xs text-gray-500">Press Enter to search for "</span>
                    <span className="text-xs font-medium text-[#3f6197]">{searchTerm}</span>
                    <span className="text-xs text-gray-500">"</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Search Mode Indicator */}
            {isSearchMode && (
              <div className="mt-3 flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2 border border-blue-100">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-sm font-medium text-blue-700">
                    Global search active • Results from all users
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    handleSearch('');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={() => fetchUsers(1)}
            className="px-4 py-2 bg-[#3f6197] text-white rounded-lg hover:bg-[#2c4b79] flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Users Table */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f6197]"></div>
          </div>
        ) : displayUsers.length === 0 ? (
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {isSearchMode ? `No results found for "${searchTerm}"` : 'No users found'}
            </h3>
            <p className="text-gray-500">
              {isSearchMode ? 'Try adjusting your search terms.' : 'There are currently no users in the system.'}
            </p>
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="mb-4 text-gray-600">
              <p>
                {isSearchMode ? (
                  <>
                    Showing {((pagination.currentPage - 1) * pagination.usersPerPage) + 1} to {Math.min(pagination.currentPage * pagination.usersPerPage, pagination.totalUsers)} of {pagination.totalUsers} search results
                    <span className="text-[#3f6197] font-medium"> for "{searchTerm}"</span>
                  </>
                ) : (
                  <>
                    Showing {((pagination.currentPage - 1) * pagination.usersPerPage) + 1} to {Math.min(pagination.currentPage * pagination.usersPerPage, pagination.totalUsers)} of {pagination.totalUsers} users
                  </>
                )}
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Role</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {user.profilePhoto?.data ? (
                            <img 
                              className="h-10 w-10 rounded-full mr-3 object-cover" 
                              src={`${api.web}api/v1/profileImage/${user._id}`} 
                              alt="Profile"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/40?text=User';
                              }}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                              <span className="text-xl text-gray-500">{user.name?.charAt(0)}</span>
                            </div>
                          )}
                          <div className="text-sm font-medium text-gray-900">{user.name || "N/A"}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.organizationName || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.admin === 2 ? "bg-purple-100 text-purple-800" : 
                          user.admin === 1 ? "bg-blue-100 text-blue-800" : 
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {user.admin === 2 ? "Admin2" : user.admin === 1 ? "Admin1" : "User"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateAdminStatus(user._id, 0)}
                            className={`px-2 py-1 rounded ${
                              user.admin === 0 
                                ? "bg-gray-200 text-gray-600 cursor-not-allowed" 
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                            disabled={user.admin === 0}
                          >
                            User
                          </button>
                          <button
                            onClick={() => updateAdminStatus(user._id, 1)}
                            className={`px-2 py-1 rounded ${
                              user.admin === 1 
                                ? "bg-blue-200 text-blue-600 cursor-not-allowed" 
                                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                            }`}
                            disabled={user.admin === 1}
                          >
                            Admin1
                          </button>
                          <button
                            onClick={() => updateAdminStatus(user._id, 2)}
                            className={`px-2 py-1 rounded ${
                              user.admin === 2 
                                ? "bg-purple-200 text-purple-600 cursor-not-allowed" 
                                : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                            }`}
                            disabled={user.admin === 2}
                          >
                            Admin2
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  {/* Previous button */}
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPreviousPage || isLoading}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      pagination.hasPreviousPage && !isLoading
                        ? 'bg-white text-[#3f6197] border border-[#3f6197] hover:bg-[#3f6197] hover:text-white shadow-md hover:shadow-lg'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>

                  {/* Next button */}
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage || isLoading}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      pagination.hasNextPage && !isLoading
                        ? 'bg-white text-[#3f6197] border border-[#3f6197] hover:bg-[#3f6197] hover:text-white shadow-md hover:shadow-lg'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Page info */}
                <div className="mt-3 text-center">
                  <p className="text-sm text-gray-600">
                    Page {pagination.currentPage} of {pagination.totalPages} • {pagination.totalUsers} total {isSearchMode ? 'results' : 'users'}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    
    <style jsx>{`
      .animate-fadeIn {
        animation: fadeIn 0.2s ease-out;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-4px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
    </>
  );
};

export default AdminControl;