import React, { useState, useEffect } from "react";
import {
  Package,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Zap,
  Archive,
  AlertCircle,
  RefreshCw,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { Modal, Button, Text, Group, Box } from '@mantine/core';
import axios from "axios";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StocksData = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("stockName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [stockToDelete, setStockToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  
  const navigate = useNavigate();
  const stockTypes = [
    { value: "All", label: "All Types", icon: Package },
    { value: "Electronic", label: "Electronic", icon: Zap },
    { value: "Consumables", label: "Consumables", icon: Archive },
  ];
  const state = useSelector((state) => state);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchStocks();
  }, [currentPage, recordsPerPage, debouncedSearchTerm, selectedType]);
  
  // Fetch stocks data with pagination
  const fetchStocks = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      setError(null);

      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: recordsPerPage.toString()
      });

      if (selectedType !== 'All') {
        params.append('stockType', selectedType);
      }

      if (debouncedSearchTerm.trim()) {
        params.append('search', debouncedSearchTerm.trim());
      }

      if (sortBy) {
        params.append('sortBy', sortBy);
        params.append('sortOrder', sortOrder);
      }

      const response = await axios.get(`${api.web}api/v1/stock?${params.toString()}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (response.data.status === 'success') {
        setStocks(response.data.data || []);
        setFilteredStocks(response.data.data || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalRecords(response.data.pagination?.totalStockDetails || 0);
      } else {
        setStocks([]);
        setFilteredStocks([]);
        setTotalPages(1);
        setTotalRecords(0);
      }
    } catch (err) {
      console.error("Error fetching stocks:", err);
      setError("Failed to fetch stocks data. Please try again.");
      setStocks([]);
      setFilteredStocks([]);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  // Generate search suggestions
  const generateSuggestions = (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const queryLower = query.toLowerCase();
    const stockSuggestions = [];
    
    // Get unique stock names and IDs that match the query
    const uniqueSuggestions = new Set();
    
    stocks.forEach((stock) => {
      if (stock.stockName && stock.stockName.toLowerCase().includes(queryLower)) {
        uniqueSuggestions.add(stock.stockName);
      }
      if (stock.stockId && stock.stockId.toLowerCase().includes(queryLower)) {
        uniqueSuggestions.add(stock.stockId);
      }
    });

    // Convert to array and limit to 5 suggestions
    const suggestionsArray = Array.from(uniqueSuggestions).slice(0, 5);
    setSuggestions(suggestionsArray);
  };

  // Handle export to Excel
  const handleExport = async () => {
    try {
      setIsLoading(true);
      
      // Build query parameters for export
      const params = new URLSearchParams();

      if (selectedType !== 'All') {
        params.append('stockType', selectedType);
      }

      if (debouncedSearchTerm.trim()) {
        params.append('search', debouncedSearchTerm.trim());
      }

      // Use the dedicated Excel export endpoint
      const response = await axios.get(
        `${api.web}api/v1/stock/export/excel?${params.toString()}`,
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
      let filename = 'stock_details_export.xlsx';
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

    } catch (error) {
      console.error('Export error:', error);
      if (error.response?.status === 404) {
        setError('No stock records found to export.');
      } else {
        setError('Failed to export stock records. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    generateSuggestions(value);
    setShowSuggestions(true);
    setSelectedSuggestionIndex(-1); // Reset selection when typing
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedSuggestionIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
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

  // Handle search input focus
  const handleSearchFocus = () => {
    if (searchTerm) {
      generateSuggestions(searchTerm);
      setShowSuggestions(true);
    }
  };

  // Handle search input blur
  const handleSearchBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }, 200);
  };

  // on loading move to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loading]);

  // Load data on component mount and when filters change
  useEffect(() => {
    fetchStocks();
  }, [currentPage, recordsPerPage, debouncedSearchTerm, selectedType, sortBy, sortOrder]);

  // Handle records per page change
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [recordsPerPage, debouncedSearchTerm, selectedType, sortBy, sortOrder]);

  // Get icon for stock type
  const getStockTypeIcon = (type) => {
    switch (type) {
      case 'Electronic':
        return Zap;
      case 'Consumables':
        return Archive;
      default:
        return Package;
    }
  };

  // Handle delete stock
  const handleDeleteStock = async (stockId) => {
    const stock = stocks.find(s => s._id === stockId);
    setStockToDelete(stock);
    setDeleteModalOpen(true);
  };

  // Confirm delete stock
  const confirmDeleteStock = async () => {
    if (!stockToDelete) return;

    setIsDeleting(true);
    try {
      await axios.delete(`${api.web}api/v1/stock/${stockToDelete._id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      // Refresh the stocks list
      fetchStocks();
      setDeleteModalOpen(false);
      setStockToDelete(null);
      // You can add a success notification here if needed
    } catch (err) {
      console.error("Error deleting stock:", err);
      alert("Failed to delete stock. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setStockToDelete(null);
    setIsDeleting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3f6197] mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading stocks data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#3f6197]/10 to-[#5a7fb8]/10 rounded-3xl blur-3xl"></div>
          <div className="relative">
            {/* Back Button */}
            <div className="flex justify-start mb-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl hover:border-[#3f6197] hover:text-[#3f6197] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            </div>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] rounded-full blur-lg opacity-60 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] p-4 rounded-full shadow-xl">
                  <Package className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] bg-clip-text text-transparent mb-4">
              Stocks Inventory
            </h1>
            <p className="text-gray-600 text-lg">
              Manage and view all your stock items
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-50 rounded-3xl shadow-2xl border border-gray-200 mb-8 p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-[11]" />
              <input
                type="text"
                placeholder="Try searching by stock name, ID, or type"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                onKeyDown={handleKeyDown}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-[#3f6197]/30 focus:border-[#3f6197] transition-all duration-300 relative z-10"
                autoComplete="off"
              />
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto">
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                      Suggestions
                    </div>
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`w-full px-4 py-3 text-left transition-all duration-200 flex items-center gap-3 group ${
                          index === selectedSuggestionIndex 
                            ? 'bg-[#3f6197]/10 text-[#3f6197] border-r-4 border-[#3f6197]' 
                            : 'hover:bg-[#3f6197]/5 hover:text-[#3f6197]'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          index === selectedSuggestionIndex
                            ? 'bg-gradient-to-r from-[#3f6197]/20 to-[#5a7fb8]/20'
                            : 'bg-gradient-to-r from-[#3f6197]/10 to-[#5a7fb8]/10 group-hover:from-[#3f6197]/20 group-hover:to-[#5a7fb8]/20'
                        }`}>
                          <Search className="w-4 h-4 text-[#3f6197]" />
                        </div>
                        <div className="flex-1">
                          <div className={`text-sm font-medium transition-colors duration-200 ${
                            index === selectedSuggestionIndex 
                              ? 'text-[#3f6197]' 
                              : 'text-gray-800 group-hover:text-[#3f6197]'
                          }`}>
                            {suggestion}
                          </div>
                          <div className="text-xs text-gray-500">
                            {stocks.find(s => s.stockName === suggestion || s.stockId === suggestion)?.stockType || 'Stock Item'}
                          </div>
                        </div>
                        <div className={`transition-opacity duration-200 ${
                          index === selectedSuggestionIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}>
                          <div className="w-2 h-2 bg-[#3f6197] rounded-full"></div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            
            </div>

            {/* Filter by Type */}
            <div className="flex items-center gap-3">
              <Filter className="text-gray-500 w-5 h-5" />
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setCurrentPage(1); // Reset to first page when filtering
                }}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-[#3f6197]/30 focus:border-[#3f6197] transition-all duration-300"
              >
                {stockTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1); // Reset to first page when sorting
                }}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-[#3f6197]/30 focus:border-[#3f6197] transition-all duration-300"
              >
                <option value="stockName">Name</option>
                <option value="stockId">ID</option>
                <option value="stockType">Type</option>
                <option value="count">Count</option>
              </select>
              <button
                onClick={() => {
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  setCurrentPage(1); // Reset to first page when changing sort order
                }}
                className="px-4 py-3 bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] text-white rounded-xl hover:from-[#2d4a7a] hover:to-[#4a6ea6] transition-all duration-300"
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>

            {/* Add Stock button */}
            <button
              onClick={() => navigate("/admin/createStocks")}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] text-white rounded-xl hover:from-[#2d4a7a] hover:to-[#4a6ea6] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              <span>Add Stock</span>
            </button>

            {/* Export Button */}
            <button
              onClick={handleExport}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Package className="w-5 h-5" />
              <span>{isLoading ? 'Exporting...' : 'Export Excel'}</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={fetchStocks}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] text-white rounded-xl hover:from-[#2d4a7a] hover:to-[#4a6ea6] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Loading...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex items-center gap-4">
            <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-800 mb-1">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Current Page Items</p>
                <p className="text-2xl font-bold text-[#3f6197]">
                  {filteredStocks.length}
                </p>
              </div>
              <Package className="w-8 h-8 text-[#3f6197]" />
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Items</p>
                <p className="text-2xl font-bold text-[#3f6197]">
                  {totalRecords}
                </p>
              </div>
              <Package className="w-8 h-8 text-[#3f6197]" />
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Current Page</p>
                <p className="text-2xl font-bold text-[#3f6197]">
                  {currentPage} of {totalPages}
                </p>
              </div>
              <Package className="w-8 h-8 text-[#3f6197]" />
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Items Per Page</p>
                <p className="text-2xl font-bold text-[#3f6197]">
                  {recordsPerPage}
                </p>
              </div>
              <Package className="w-8 h-8 text-[#3f6197]" />
            </div>
          </div>
        </div>

        {/* Pagination Info */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">
            Showing {filteredStocks.length > 0 ? ((currentPage - 1) * recordsPerPage) + 1 : 0} to{" "}
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

        {/* Stocks Grid */}
        {filteredStocks.length === 0 ? (
          <div className="bg-gray-50 rounded-3xl shadow-2xl border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Stocks Found
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedType !== "All"
                ? "No stocks match your current filters."
                : "No stocks have been created yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStocks.map((stock) => {
              const IconComponent = getStockTypeIcon(stock.stockType);
              return (
                <div
                  key={stock.stockId}
                  className="bg-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Stock Details */}
                  <div className="p-6">
                    {/* Stock Type and Count Info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 bg-[#3f6197] text-white px-3 py-1 rounded-full text-sm">
                        <IconComponent className="w-4 h-4" />
                        <span>{stock.stockType}</span>
                      </div>
                      <div className="bg-white text-[#3f6197] px-3 py-1 rounded-full text-sm font-semibold shadow-lg border border-gray-200">
                        Count: {stock.count || 0}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                        {stock.stockName}
                      </h3>
                      <p className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded inline-block">
                        ID: {stock.stockId}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/viewStocksUpdateRecords`, {
                            state: {
                              stockId: stock.stockId,
                              
                            },
                          })
                        }
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] text-white rounded-lg hover:from-[#2d4a7a] hover:to-[#4a6ea6] transition-all duration-300"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate(`/admin/updatestocks`, {
                            state: {
                              stockId: stock.stockId,
                              userId: state.user.user.user.userId,
                              userName: state.user.user.user.name,
                            },
                          });
                        }}
                        className="flex items-center justify-center p-2 border-2 border-gray-300 rounded-lg hover:border-[#3f6197] hover:text-[#3f6197] transition-all duration-300"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStock(stock._id)}
                        className="flex items-center justify-center p-2 border-2 border-red-300 text-red-500 rounded-lg hover:bg-red-50 hover:border-red-500 transition-all duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
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

        {/* Delete Confirmation Modal */}
        <Modal
          opened={deleteModalOpen}
          onClose={cancelDelete}
          title={
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="w-4 h-4 text-red-600" />
              </div>
              <Text size="lg" fw={600} c="red">
                Delete Stock Item
              </Text>
            </div>
          }
          centered
          size="md"
          radius="lg"
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
          styles={{
            modal: {
              padding: '1.5rem',
            },
            header: {
              paddingBottom: '1rem',
            },
            body: {
              paddingTop: 0,
            }
          }}
        >
          {stockToDelete && (
            <Box>
              <div className="mb-6">
                <Text size="md" c="dimmed" mb="xs">
                  You are about to permanently delete this stock item:
                </Text>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      {React.createElement(getStockTypeIcon(stockToDelete.stockType), {
                        className: "w-6 h-6 text-red-600"
                      })}
                    </div>
                    <div className="flex-1">
                      <Text fw={600} size="sm" c="red.8">
                        {stockToDelete.stockName}
                      </Text>
                      <div className="flex items-center gap-2">
                        <Text size="xs" c="red.6">
                          ID: {stockToDelete.stockId} • Type: {stockToDelete.stockType}
                        </Text>
                        {React.createElement(getStockTypeIcon(stockToDelete.stockType), {
                          className: "w-3 h-3 text-red-500"
                        })}
                      </div>
                      <Text size="xs" c="red.6">
                        Count: {stockToDelete.count || 0}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <Text size="sm" fw={500} c="yellow.8" mb="xs">
                      Warning: This action cannot be undone
                    </Text>
                    <Text size="xs" c="yellow.7">
                      All data associated with this stock item will be permanently removed from the system.
                    </Text>
                  </div>
                </div>
              </div>

              <Group justify="flex-end" gap="sm">
                <Button
                  variant="outline"
                  color="gray"
                  onClick={cancelDelete}
                  disabled={isDeleting}
                  radius="lg"
                  size="md"
                >
                  Cancel
                </Button>
                <Button
                  color="red"
                  onClick={confirmDeleteStock}
                  loading={isDeleting}
                  radius="lg"
                  size="md"
                  leftSection={<Trash2 size={16} />}
                >
                  {isDeleting ? 'Deleting...' : 'Delete Stock'}
                </Button>
              </Group>
            </Box>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default StocksData;