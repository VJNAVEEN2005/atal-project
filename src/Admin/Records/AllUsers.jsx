import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import api from '../../Api/api';
import { X, Trash2 } from 'lucide-react';
import { Share2 } from 'lucide-react';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';


const DOMAIN_TABS = [
  { label: 'Students', value: 'Students', icon: '🎓' },
  { label: 'Startups', value: 'Startups', icon: '🚀' },
  { label: 'Team Member', value: 'Team Member', icon: '👥' },
];

const MIN_USERS_TO_DISPLAY = 1; // Minimum number of users required to show the table
const USERS_PER_PAGE = 10; // Number of users per page

const DOMAIN_FIELDS = {
  Students: [
    { label: 'Name', key: 'name', type: 'name' },
    { label: 'Email', key: 'email', type: 'email' },
    { label: 'User ID', key: 'userId', type: 'text' },
    { label: 'Phone', key: 'phoneNumber', type: 'phone' },
    { label: 'School/College', key: (u) => u.schoolName || u.collegeName || '-', type: 'text' },
    { label: 'Standard/Department', key: (u) => u.standard || u.department || '-', type: 'text' },
    { label: 'Address', key: 'address', type: 'text' },
    { label: 'Date of Birth', key: 'dateOfBirth', type: 'date' },
  ],
  Startups: [
    { label: 'Name', key: 'name', type: 'name' },
    { label: 'Email', key: 'email', type: 'email' },
    { label: 'User ID', key: 'userId', type: 'text' },
    { label: 'Phone', key: 'phoneNumber', type: 'phone' },
    { label: 'Organization Name', key: 'organizationName', type: 'text' },
    { label: 'Sector', key: 'sector', type: 'text' },
    { label: 'Business Type', key: 'businessType', type: 'text' },
    { label: 'City/State', key: 'cityStatePostal', type: 'text' },
    { label: 'Website', key: 'websiteUrl', type: 'url' },
  ],
  'Team Member': [
    { label: 'Name', key: 'name', type: 'name' },
    { label: 'Email', key: 'email', type: 'email' },
    { label: 'User ID', key: 'userId', type: 'text' },
    { label: 'Phone', key: 'phoneNumber', type: 'phone' },
    { label: 'Role', key: 'role', type: 'text' },
    { label: 'LinkedIn', key: 'linkedin', type: 'url' },
  ],
};


const getFieldValue = (user, field) => {
  if (typeof field.key === 'function') return field.key(user) || '-';
  return user[field.key] || '-';
};

const getInitial = (name) => {
  if (!name || typeof name !== 'string') return '?';
  return name.trim().charAt(0).toUpperCase();
};

const getRandomColor = (name) => {
  const colors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-red-500 to-red-600',
    'from-yellow-500 to-yellow-600',
    'from-indigo-500 to-indigo-600',
    'from-pink-500 to-pink-600',
    'from-teal-500 to-teal-600',
  ];
  
  const hash = name?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
  return colors[hash % colors.length];
};

const formatFieldValue = (value, type) => {
  if (!value || value === '-') return value;
  
  switch (type) {
    case 'email':
      return (
        <a href={`mailto:${value}`} className="text-[#3f6197] hover:text-[#2a4373] transition-colors duration-200 hover:underline">
          {value}
        </a>
      );
    case 'phone':
      return (
        <a href={`tel:${value}`} className="text-[#3f6197] hover:text-[#2a4373] transition-colors duration-200 hover:underline">
          {value}
        </a>
      );
    case 'url':
      return (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-[#3f6197] hover:text-[#2a4373] transition-colors duration-200 hover:underline inline-flex items-center gap-1">
          {value.length > 30 ? `${value.substring(0, 30)}...` : value}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      );
    case 'date':
      if (value && value !== '-') {
        const date = new Date(value);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      }
      return value;
    default:
      return value;
  }
};

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-[#e3eaf5] border-t-[#3f6197] rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-[#5478b0] rounded-full animate-ping opacity-20"></div>
    </div>
    <p className="mt-4 text-gray-600 text-lg font-medium animate-pulse">Loading users...</p>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <p className="text-red-600 text-lg font-medium">{message}</p>
  </div>
);

const EmptyState = ({ domain }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-600 mb-2">No {domain} Found</h3>
    <p className="text-gray-500 text-center max-w-md">There are currently no users in the {domain.toLowerCase()} domain. New users will appear here once they register.</p>
  </div>
);

const AllUsers = () => {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState(DOMAIN_TABS[0].value);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Search mode state
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    usersPerPage: USERS_PER_PAGE,
    hasNextPage: false,
    hasPreviousPage: false,
    domain: ''
  });

  // Delete modal state
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteUserName, setDeleteUserName] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');

  useEffect(() => {
    handleDomainChange(selectedDomain);
  }, []);

  const fields = DOMAIN_FIELDS[selectedDomain];

  // Get current users to display (search results or domain users)
  const currentUsers = isSearchMode ? searchResults : users;
  const filteredUsers = currentUsers.filter(user =>
    Object.values(user).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Dynamic fields based on search mode
  const getDisplayFields = () => {
    if (isSearchMode) {
      // For search mode, show common fields that work across all domains
      return [
        { label: 'Name', key: 'name', type: 'name' },
        { label: 'Email', key: 'email', type: 'email' },
        { label: 'Domain', key: 'domain', type: 'text' },
        { label: 'User ID', key: 'userId', type: 'text' },
        { label: 'Phone', key: 'phoneNumber', type: 'phone' },
      ];
    }
    return fields;
  };

  const displayFields = getDisplayFields();

  // Helper: get all string fields for suggestions
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
  useEffect(() => {
    if (searchTerm.length > 0) {
      const searchLower = searchTerm.toLowerCase();
      let newSuggestions = [];
      currentUsers.forEach((user) => {
        getAllStringFields(user).forEach((field) => {
          if (field.value.toLowerCase().includes(searchLower)) {
            newSuggestions.push(field);
          }
        });
      });
      // Remove duplicates and limit to 8
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
  }, [searchTerm, currentUsers]);

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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) {
      // Handle Enter key for search
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

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.value);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    // Optionally scroll to or highlight the user in the table
    // Could add logic here if needed
    searchInputRef.current?.focus();
  };

  // Delete user handler
  const handleDeleteUser = (userId) => {
    setDeleting(true);
    setDeleteError('');
    setDeleteSuccess('');
    axios
      .delete(`${api.web}api/v1/deleteUser/${userId}`, {
        headers: { token: localStorage.getItem('token') },
      })
      .then((res) => {
        if (res.data.success) {
          setUsers((prev) => prev.filter((u) => u._id !== userId));
          setDeleteSuccess('User deleted successfully.');
          setTimeout(() => {
            setDeleteUserId(null);
            setDeleteUserName('');
            setDeleteSuccess('');
          }, 1200);
        } else {
          setDeleteError(res.data.message || 'Failed to delete user.');
        }
      })
      .catch((err) => {
        setDeleteError(
          err.response?.data?.message || 'Failed to delete user.'
        );
      })
      .finally(() => setDeleting(false));
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    
    setLoading(true);
    setCurrentPage(newPage);
    
    const apiUrl = isSearchMode && searchTerm.trim()
      ? `${api.web}api/v1/searchUsers?search=${encodeURIComponent(searchTerm.trim())}&page=${newPage}&limit=${USERS_PER_PAGE}`
      : `${api.web}api/v1/users/domain/${selectedDomain}/paginated?page=${newPage}&limit=${USERS_PER_PAGE}`;
    
    axios
      .get(apiUrl, {
        headers: { token: localStorage.getItem('token') },
      })
      .then((res) => {
        if (res.data.success) {
          if (isSearchMode) {
            setSearchResults(res.data.users);
          } else {
            setUsers(res.data.users);
          }
          setPagination(res.data.pagination);
        } else {
          setError(res.data.message || 'No users found');
        }
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || 'Failed to fetch users.'
        );
      })
      .finally(() => setLoading(false));
  };

  // Handle search functionality
  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) {
      // If search is empty, exit search mode and return to domain view
      setIsSearchMode(false);
      setSearchResults([]);
      setCurrentPage(1);
      // Reload domain data
      handleDomainChange(selectedDomain);
      return;
    }

    setIsSearchMode(true);
    setLoading(true);
    setCurrentPage(1);
    setError('');

    axios
      .get(`${api.web}api/v1/searchUsers?search=${encodeURIComponent(searchQuery.trim())}&page=1&limit=${USERS_PER_PAGE}`, {
        headers: { token: localStorage.getItem('token') },
      })
      .then((res) => {
        if (res.data.success) {
          setSearchResults(res.data.users);
          setPagination(res.data.pagination);
        } else {
          setError(res.data.message || 'No users found');
          setSearchResults([]);
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalUsers: 0,
            usersPerPage: USERS_PER_PAGE,
            hasNextPage: false,
            hasPreviousPage: false,
            domain: ''
          });
        }
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || 'Failed to search users.'
        );
        setSearchResults([]);
      })
      .finally(() => setLoading(false));
  };

  // Handle domain change
  const handleDomainChange = (domain) => {
    setSelectedDomain(domain);
    setIsSearchMode(false);
    setSearchResults([]);
    setSearchTerm('');
    setCurrentPage(1);
    setLoading(true);
    setError('');
    
    axios
      .get(`${api.web}api/v1/users/domain/${domain}/paginated?page=1&limit=${USERS_PER_PAGE}`, {
        headers: { token: localStorage.getItem('token') },
      })
      .then((res) => {
        if (res.data.success) {
          setUsers(res.data.users);
          setPagination(res.data.pagination);
        } else {
          setError(res.data.message || 'No users found');
        }
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || 'Failed to fetch users for this domain.'
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e9f0fa] via-[#f0f7ff] to-[#f7fafc] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#e3eaf5]/50 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] px-8 py-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3f6197]/20 to-[#5478b0]/20"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-extrabold mb-2 tracking-tight">
                User Management
              </h1>
              <p className="text-[#b8d0f0] text-lg">
                Manage and view users across different domains
              </p>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 -translate-x-10"></div>
          </div>

          <div className="p-8">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {DOMAIN_TABS.map((tab) => (
                <button
                  key={tab.value}
                  className={`group relative px-8 py-3.5 rounded-2xl font-semibold transition-all duration-300 border-2 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#3f6197]/20 ${
                    selectedDomain === tab.value
                      ? 'bg-gradient-to-r from-[#3f6197] to-[#5478b0] text-white border-transparent shadow-[#3f6197]/25'
                      : 'bg-white text-[#3f6197] border-[#3f6197]/30 hover:bg-[#3f6197]/5 hover:border-[#3f6197]'
                  }`}
                  onClick={() => handleDomainChange(tab.value)}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xl">{tab.icon}</span>
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={isSearchMode ? "Search across all users..." : `Search ${selectedDomain.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-3 pl-12 pr-20 rounded-2xl border-2 border-[#e3eaf5] focus:border-[#3f6197] focus:ring-4 focus:ring-[#3f6197]/20 focus:outline-none transition-all duration-200 text-gray-700 bg-white/80"
                />
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                
                {/* Search Button */}
                <button
                  onClick={() => handleSearch(searchTerm)}
                  disabled={loading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-[#3f6197] to-[#5478b0] text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div
                    ref={suggestionsRef}
                    className="absolute left-0 right-0 top-full z-30 bg-white border border-[#e3eaf5] rounded-xl shadow-lg mt-2 max-h-72 overflow-y-auto animate-fadeIn"
                  >
                    {suggestions.map((suggestion, idx) => (
                      <div
                        key={idx}
                        className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors flex items-center gap-3 ${
                          idx === selectedSuggestionIndex
                            ? 'bg-blue-50 border-blue-200'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#3f6197] to-[#5478b0] text-white font-bold text-base">
                          {getInitial(suggestion.user.name)}
                        </span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{suggestion.value}</div>
                          <div className="text-xs text-gray-500">{suggestion.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Search Mode Indicator */}
              {isSearchMode && (
                <div className="mt-3 flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2 border border-blue-100">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-sm font-medium text-blue-700">
                      Global search active • Results from all domains
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
              
              {searchTerm && !isSearchMode && (
                <div className="mt-2 text-sm text-blue-700 bg-blue-50 rounded-lg px-3 py-2 border border-blue-100 shadow-sm animate-fadeIn">
                  <span className="font-medium">Tip:</span> Press Enter or click Search to search across all domains, or use the suggestions below.
                </div>
              )}
            </div>

            {/* Content */}
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorState message={error} />
            ) : (!isSearchMode && pagination.totalUsers < MIN_USERS_TO_DISPLAY) ? (
              <EmptyState domain={selectedDomain} />
            ) : (isSearchMode && searchResults.length === 0) ? (
              <EmptyState domain={`Search results for "${searchTerm}"`} />
            ) : filteredUsers.length === 0 ? (
              searchTerm ? (
                <EmptyState domain={`Results for "${searchTerm}"`} />
              ) : (
                <EmptyState domain={selectedDomain} />
              )
            ) : (
              <div className="bg-white rounded-2xl border border-[#e3eaf5] shadow-xl overflow-hidden">
                {/* Results count */}
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-[#e3eaf5]">
                  <p className="text-gray-600 font-medium">
                    {isSearchMode ? (
                      <>
                        Showing {((pagination.currentPage - 1) * pagination.usersPerPage) + 1} to {Math.min(pagination.currentPage * pagination.usersPerPage, pagination.totalUsers)} of {pagination.totalUsers} search results
                        <span className="text-[#3f6197]"> for "{searchTerm}"</span>
                      </>
                    ) : (
                      <>
                        Showing {((pagination.currentPage - 1) * pagination.usersPerPage) + 1} to {Math.min(pagination.currentPage * pagination.usersPerPage, pagination.totalUsers)} of {pagination.totalUsers} {selectedDomain.toLowerCase()}
                        {searchTerm && <span className="text-[#3f6197]"> (filtered)</span>}
                      </>
                    )}
                  </p>
                </div>

                <div className="overflow-x-auto" style={{ maxHeight: '600px' }}>
                  <table className="w-full min-w-[800px]">
                    <thead className="sticky top-0 z-20 bg-gradient-to-r from-[#3f6197] to-[#5478b0] text-white shadow-lg">
                      <tr>
                        {displayFields.map((field) => (
                          <th key={field.label} className="px-6 py-5 text-left font-bold text-base tracking-wide border-b border-[#2a4373]">
                            {field.label}
                          </th>
                        ))}
                       <th className="px-6 py-5 text-center font-bold text-base tracking-wide border-b border-[#2a4373]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e3eaf5] bg-white">
                      {filteredUsers.map((user, idx) => (
                        <tr
                          key={user._id || idx}
                          className={`transition-all duration-200 hover:bg-gradient-to-r hover:from-[#f0f6ff] hover:to-[#f7faff] group ${
                            idx % 2 === 0 ? 'bg-white' : 'bg-[#f7fafd]/30'
                          }`}
                        >
                          {displayFields.map((field, i) => (
                            <td key={field.label} className="px-6 py-5 text-gray-700 text-[15px] align-middle">
                              {i === 0 ? (
                                <div className="flex items-center gap-4">
                                  <div 
                                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${getRandomColor(user.name)} text-white font-extrabold text-lg shadow-lg border-3 border-white group-hover:scale-110 transition-transform duration-200 cursor-pointer hover:shadow-xl`}
                                    onClick={() => navigate(`/profile/${user._id}`)}
                                    title="View Profile"
                                  >
                                    {getInitial(user.name)}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-gray-900 text-base group-hover:text-[#3f6197] transition-colors duration-200">
                                      {getFieldValue(user, field)}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      ID: {user.userId}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="max-w-[250px]">
                                  {formatFieldValue(getFieldValue(user, field), field.type)}
                                </div>
                              )}
                            </td>
                          ))}
                         {/* Delete Action */}
                         <td className="px-6 py-5 text-center align-middle">
                           <div className="flex items-center justify-center gap-2">
                             {/* Share Button */}
                             <button
                               title="Share Profile"
                               className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 border border-blue-100 shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
                               onClick={() => {
                                 const userId = user._id;
                                 const shareUrl = `${window.location.origin}/profile/${userId}`;
                                 const shareData = {
                                   title: "Check out this profile",
                                   text: "Have a look at this awesome profile!",
                                   url: shareUrl,
                                 };
                                 if (navigator.share) {
                                   navigator
                                     .share(shareData)
                                     .then(() => console.log("Profile shared successfully"))
                                     .catch((error) => console.error("Error sharing:", error));
                                 } else {
                                   navigator.clipboard.writeText(shareUrl).then(() => {
                                     showNotification({
                                       id: "profile-copied",
                                       title: "Profile Link Copied",
                                       message: "Profile link copied to clipboard!",
                                       color: "green",
                                       autoClose: 3000,
                                     });
                                   });
                                 }
                               }}
                             >
                               <Share2 className="w-5 h-5" />
                             </button>
                             {/* Delete Button */}
                             <button
                               title="Delete User"
                               className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-100 shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-300"
                               onClick={() => {
                                 setDeleteUserId(user._id);
                                 setDeleteUserName(user.name);
                                 setDeleteError('');
                                 setDeleteSuccess('');
                               }}
                               disabled={deleting && deleteUserId === user._id}
                             >
                               <Trash2 className="w-5 h-5" />
                             </button>
                           </div>
                         </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {pagination.totalPages > 1 && (
                  <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-[#e3eaf5]">
                    <div className="flex items-center justify-between">
                      {/* Previous button */}
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={!pagination.hasPreviousPage || loading}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                          pagination.hasPreviousPage && !loading
                            ? 'bg-white text-[#3f6197] border border-[#3f6197] hover:bg-[#3f6197] hover:text-white shadow-md hover:shadow-lg'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </button>

                      {/* Page numbers */}
                      {/* <div className="flex items-center gap-2">
                        {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                          const pageNumber = Math.max(1, Math.min(
                            pagination.currentPage - 2 + i,
                            pagination.totalPages - 4 + i
                          ));
                          
                          if (pageNumber > pagination.totalPages) return null;
                          
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageChange(pageNumber)}
                              disabled={loading}
                              className={`w-10 h-10 rounded-lg transition-all duration-200 font-semibold ${
                                pageNumber === pagination.currentPage
                                  ? 'bg-gradient-to-r from-[#3f6197] to-[#5478b0] text-white shadow-lg'
                                  : 'bg-white text-[#3f6197] border border-[#3f6197]/30 hover:bg-[#3f6197] hover:text-white shadow-md hover:shadow-lg'
                              } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}
                      </div> */}

                      {/* Next button */}
                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={!pagination.hasNextPage || loading}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                          pagination.hasNextPage && !loading
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
                        Page {pagination.currentPage} of {pagination.totalPages} • {pagination.totalUsers} total {isSearchMode ? 'results' : selectedDomain.toLowerCase()}
                      </p>
                    </div>
                  </div>
                )}
               {/* Delete Confirmation Modal */}
               {deleteUserId && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                   <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-[#e3eaf5] relative animate-fadeIn">
                     <button
                       className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                       onClick={() => { setDeleteUserId(null); setDeleteUserName(''); }}
                       disabled={deleting}
                     >
                       <X className="w-6 h-6" />
                     </button>
                     <div className="flex flex-col items-center gap-3">
                       <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
                         <Trash2 className="w-8 h-8 text-red-500" />
                       </div>
                       <h2 className="text-xl font-bold text-gray-800 mb-2">Delete User</h2>
                       <p className="text-gray-600 text-center mb-4">Are you sure you want to delete <span className="font-semibold text-red-600">{deleteUserName}</span>? This action cannot be undone.</p>
                       {deleteError && <div className="text-red-500 text-sm mb-2">{deleteError}</div>}
                       {deleteSuccess && <div className="text-green-600 text-sm mb-2">{deleteSuccess}</div>}
                       <div className="flex gap-4 mt-2">
                         <button
                           className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                           onClick={() => { setDeleteUserId(null); setDeleteUserName(''); }}
                           disabled={deleting}
                         >
                           Cancel
                         </button>
                         <button
                           className={`px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-semibold flex items-center gap-2 ${deleting ? 'opacity-60 cursor-not-allowed' : ''}`}
                           onClick={() => handleDeleteUser(deleteUserId)}
                           disabled={deleting}
                         >
                           {deleting ? (
                             <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                             </svg>
                           ) : (
                             <Trash2 className="w-5 h-5" />
                           )}
                           Delete
                         </button>
                       </div>
                     </div>
                   </div>
                 </div>
               )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #c3d0e8, #a8bdd6);
          border-radius: 10px;
          border: 2px solid #f7fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a8bdd6, #8fa8c4);
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f7fafc;
          border-radius: 10px;
        }
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default AllUsers;