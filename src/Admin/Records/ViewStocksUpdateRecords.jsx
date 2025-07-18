import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, TrendingUp, TrendingDown, Package, RefreshCw, AlertCircle, ArrowLeft, BarChart3 } from 'lucide-react';
import api from '../../Api/api';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewStocksUpdateRecords = () => {
  const [records, setRecords] = useState([]);
  const [stockDetail, setStockDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [dateFilter, setDateFilter] = useState('all');

  // Get stockId from URL params or props
  const location = useLocation();
  const { stockId } = location.state || {};

  useEffect(() => {
    if (stockId) {
      fetchStockUpdateRecords(stockId);
    }
  }, [stockId]);

  const fetchStockUpdateRecords = async (stockId) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${api.web}api/v1/update-records/${stockId}`, {
        headers: {
          token: localStorage.getItem('token'),
        }
      });
      console.log('Response:', response.data);
      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = response.data;

      if (data.status === 'success') {
        setStockDetail(data.data.stockDetail);
        setRecords(data.data.updateRecords);
      } else {
        throw new Error(data.message || 'Failed to fetch records');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch stock update records');
      console.error('Error fetching records:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDateFilteredRecords = () => {
    const now = new Date();
    return records.filter(record => {
      const recordDate = new Date(record.dateUpdated || record.createdAt);
      
      switch (dateFilter) {
        case 'today':
          return recordDate.toDateString() === now.toDateString();
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return recordDate >= weekAgo;
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return recordDate >= monthAgo;
        default:
          return true;
      }
    });
  };

  const filteredRecords = getDateFilteredRecords().filter(record => {
    const userName = record.userName || '';
    const userId = record.userId || '';
    
    return (
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'createdAt':
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
      case 'countChanged':
        aValue = Math.abs(a.countChanged);
        bValue = Math.abs(b.countChanged);
        break;
      case 'priceTheyBought':
        aValue = a.priceTheyBought || 0;
        bValue = b.priceTheyBought || 0;
        break;
      case 'userName':
        aValue = (a.userName || '').toLowerCase();
        bValue = (b.userName || '').toLowerCase();
        break;
      default:
        aValue = a[sortBy] || '';
        bValue = b[sortBy] || '';
    }

    return sortOrder === 'asc' 
      ? aValue > bValue ? 1 : -1
      : aValue < bValue ? 1 : -1;
  });

  const getStockStatistics = () => {
    const totalIncreases = records
      .filter(r => (r.countChanged || 0) > 0)
      .reduce((sum, r) => sum + (r.countChanged || 0), 0);
    
    const totalDecreases = records
      .filter(r => (r.countChanged || 0) < 0)
      .reduce((sum, r) => sum + Math.abs(r.countChanged || 0), 0);
    
    const netChange = totalIncreases - totalDecreases;
    const averagePrice = records.length > 0 
      ? records.reduce((sum, r) => sum + (r.priceTheyBought || 0), 0) / records.length
      : 0;
    
    const uniqueUsers = new Set(
      records.map(r => r.userId || '').filter(id => id !== '')
    ).size;
    
    return {
      totalIncreases,
      totalDecreases,
      netChange,
      averagePrice,
      uniqueUsers,
      totalTransactions: records.length
    };
  };

  const statistics = getStockStatistics();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-6 w-6 animate-spin" style={{ color: '#3f6197' }} />
            <span className="text-lg font-medium" style={{ color: '#3f6197' }}>Loading stock records...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button className="mr-4 p-2 rounded-lg hover:bg-gray-200">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Stock Update Records</h1>
              <p className="text-gray-600">
                {stockDetail ? `${stockDetail.name} (${stockDetail.symbol})` : 'Loading...'}
              </p>
            </div>
          </div>
        </div>

        {/* Stock Overview Card */}
        {stockDetail && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4" style={{ borderLeftColor: '#3f6197' }}>
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 mr-4">
                {stockDetail.stockImage ? (
                  <img 
                    src={`data:${stockDetail.stockImage.contentType};base64,${stockDetail.stockImage.data}`}
                    alt={stockDetail.stockName}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Package className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{stockDetail.stockName}</h2>
                <p className="text-gray-600">{stockDetail.stockType}</p>
                <p className="text-sm text-gray-500">Stock ID: {stockDetail.stockId}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Package className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Current Count</h3>
                <p className="text-2xl font-bold" style={{ color: '#3f6197' }}>{stockDetail.count}</p>
              </div>
              <div className="text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Stock Type</h3>
                <p className="text-lg font-bold" style={{ color: '#3f6197' }}>{stockDetail.stockType}</p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-900">Net Change</h3>
                <p className={`text-2xl font-bold ${statistics.netChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {statistics.netChange >= 0 ? '+' : ''}{statistics.netChange}
                </p>
              </div>
              <div className="text-center">
                <User className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
                <p className="text-2xl font-bold" style={{ color: '#3f6197' }}>{statistics.uniqueUsers}</p>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Increases</p>
                <p className="text-2xl font-bold text-green-600">+{statistics.totalIncreases}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Decreases</p>
                <p className="text-2xl font-bold text-red-600">-{statistics.totalDecreases}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Average Price</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(statistics.averagePrice)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by user name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                style={{ focusRingColor: '#3f6197' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Date Filter */}
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
              style={{ focusRingColor: '#3f6197' }}
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>

            {/* Sort By */}
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
              style={{ focusRingColor: '#3f6197' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="createdAt">Date</option>
              <option value="countChanged">Count Change</option>
              <option value="priceTheyBought">Price</option>
              <option value="userName">User</option>
            </select>

            {/* Sort Order */}
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
              style={{ focusRingColor: '#3f6197' }}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Records Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200" style={{ backgroundColor: '#f8f9fa' }}>
            <h2 className="text-lg font-semibold text-gray-900">
              Update Records ({sortedRecords.length} of {records.length})
            </h2>
          </div>

          {sortedRecords.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No update records found</p>
              {searchTerm && (
                <p className="text-sm text-gray-400 mt-2">Try clearing your search filter</p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count Change</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedRecords.map((record) => (
                    <tr key={record._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3f6197' }}>
                            <span className="text-white text-sm font-medium">
                              {(record.userName || '').charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{record.userName || 'Unknown'}</div>
                            <div className="text-sm text-gray-500">{record.userId || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {(record.countChanged || 0) > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span className={`text-sm font-medium ${(record.countChanged || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {(record.countChanged || 0) > 0 ? '+' : ''}{record.countChanged || 0}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatCurrency(record.priceTheyBought)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">
                            {formatDate(record.dateUpdated || record.createdAt)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          (record.countChanged || 0) > 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {(record.countChanged || 0) > 0 ? 'Stock Added' : 'Stock Removed'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => fetchStockUpdateRecords(stockId)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
            style={{ backgroundColor: '#3f6197' }}
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Refresh Records
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStocksUpdateRecords;