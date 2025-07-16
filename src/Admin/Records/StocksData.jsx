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
  Utensils,
  AlertCircle,
  RefreshCw,
  Plus,
} from "lucide-react";
import axios from "axios";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

const StocksData = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("stockName");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();
  const stockTypes = [
    { value: "All", label: "All Types", icon: Package },
    { value: "Electronic", label: "Electronic", icon: Zap },
    { value: "Stationry Items", label: "Stationry Items", icon: Archive },
    { value: "Food Inventory", label: "Food Inventory", icon: Utensils },
  ];

  // Fetch stocks data
  const fetchStocks = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${api.web}api/v1/stock`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStocks(response.data.data || []);
      setFilteredStocks(response.data.data || []);
    } catch (err) {
      console.error("Error fetching stocks:", err);
      setError("Failed to fetch stocks data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort stocks
  useEffect(() => {
    let filtered = stocks;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (stock) =>
          stock.stockName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stock.stockId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType !== "All") {
      filtered = filtered.filter((stock) => stock.stockType === selectedType);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredStocks(filtered);
  }, [stocks, searchTerm, selectedType, sortBy, sortOrder]);

  // Load data on component mount
  useEffect(() => {
    fetchStocks();
  }, []);

  // Get icon for stock type
  const getStockTypeIcon = (type) => {
    const stockType = stockTypes.find((t) => t.value === type);
    return stockType ? stockType.icon : Package;
  };

  // Handle delete stock
  const handleDeleteStock = async (stockId) => {
    if (window.confirm("Are you sure you want to delete this stock?")) {
      try {
        await axios.delete(`${api.web}api/v1/stock/${stockId}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        // Refresh the stocks list
        fetchStocks();
        alert("Stock deleted successfully!");
      } catch (err) {
        console.error("Error deleting stock:", err);
        alert("Failed to delete stock. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#3f6197]/10 to-[#5a7fb8]/10 rounded-3xl blur-3xl"></div>
          <div className="relative">
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
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 mb-8 p-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-[#3f6197]/30 focus:border-[#3f6197] transition-all duration-300"
              />
            </div>

            {/* Filter by Type */}
            <div className="flex items-center gap-3">
              <Filter className="text-gray-500 w-5 h-5" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-[#3f6197]/30 focus:border-[#3f6197] transition-all duration-300"
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
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-[#3f6197]/30 focus:border-[#3f6197] transition-all duration-300"
              >
                <option value="stockName">Name</option>
                <option value="stockId">ID</option>
                <option value="stockType">Type</option>
                <option value="count">Count</option>
              </select>
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
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

            {/* Refresh Button */}
            <button
              onClick={fetchStocks}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] text-white rounded-xl hover:from-[#2d4a7a] hover:to-[#4a6ea6] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Refresh</span>
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
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Items</p>
                <p className="text-2xl font-bold text-[#3f6197]">
                  {filteredStocks.length}
                </p>
              </div>
              <Package className="w-8 h-8 text-[#3f6197]" />
            </div>
          </div>

          {stockTypes.slice(1).map((type) => {
            const count = filteredStocks.filter(
              (stock) => stock.stockType === type.value
            ).length;
            const IconComponent = type.icon;
            return (
              <div
                key={type.value}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{type.label}</p>
                    <p className="text-2xl font-bold text-[#3f6197]">{count}</p>
                  </div>
                  <IconComponent className="w-8 h-8 text-[#3f6197]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stocks Grid */}
        {filteredStocks.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-12 text-center">
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
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Stock Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                    {stock.stockImage ? (
                      <img
                        src={`${api.web}api/v1/stock/${stock._id}/image`}
                        alt={stock.stockName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <IconComponent className="w-16 h-16 text-gray-400" />
                      </div>
                    )}

                    {/* Stock Type Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 bg-[#3f6197] text-white px-3 py-1 rounded-full text-sm">
                        <IconComponent className="w-4 h-4" />
                        <span>{stock.stockType}</span>
                      </div>
                    </div>

                    {/* Count Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-white text-[#3f6197] px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Count: {stock.count || 0}
                      </div>
                    </div>
                  </div>

                  {/* Stock Details */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                        {stock.stockName}
                      </h3>
                      <p className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded inline-block">
                        ID: {stock.stockId}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] text-white rounded-lg hover:from-[#2d4a7a] hover:to-[#4a6ea6] transition-all duration-300">
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      <button className="flex items-center justify-center p-2 border-2 border-gray-300 rounded-lg hover:border-[#3f6197] hover:text-[#3f6197] transition-all duration-300">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStock(stock.stockId)}
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
      </div>
    </div>
  );
};

export default StocksData;
