import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import api from '../../Api/api';

const Press_Media_Coverage = () => {
  // Media coverage data state
  const [mediaCoverage, setMediaCoverage] = useState([]);
  const [sources, setSources] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and sort states
  const [filters, setFilters] = useState({
    source: 'All',
    sortOrder: 'newest',
    searchTerm: '',
    currentPage: 1
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalItems: 0
  });
  const ITEMS_PER_PAGE = 10;

  // Memoized fetchMediaCoverage to prevent unnecessary re-renders
  const fetchMediaCoverage = useCallback(async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (filters.source !== 'All') params.append('source', filters.source);
      if (filters.searchTerm) params.append('search', filters.searchTerm);
      params.append('sort', filters.sortOrder);
      params.append('page', filters.currentPage);
      params.append('limit', ITEMS_PER_PAGE);

      const response = await axios.get(`${api.web}api/v1/media/?${params.toString()}`);
      setMediaCoverage(response.data.mediaItems);
      setPagination({
        totalPages: response.data.pagination.pages,
        totalItems: response.data.pagination.total
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch media coverage. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch sources once on component mount
  const fetchSources = useCallback(async () => {
    try {
      const response = await axios.get(`${api.web}api/v1/media/sources`);
      setSources(['All', ...response.data.sources.filter(source => source !== 'All')]);
    } catch (err) {
      console.error("Failed to fetch sources:", err);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    fetchSources();
  }, [fetchSources]);

  // Fetch media when filters change
  useEffect(() => {
    fetchMediaCoverage();
  }, [fetchMediaCoverage]);

  // Update a single filter
  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      // Reset to first page when changing filters except when changing page
      currentPage: key === 'currentPage' ? value : 1
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      source: 'All',
      sortOrder: 'newest',
      searchTerm: '',
      currentPage: 1
    });
  };

  // Handle page change with smooth scroll
  const handlePageChange = (page) => {
    updateFilter('currentPage', page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Share functionality
  const handleShare = (item) => {
    // Create share data object
    const shareData = {
      title: item.title,
      text: `${item.summary} - ${item.source}`,
      url: item.sourceLink
    };

    // Use Web Share API if available
    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData)
        .catch(err => console.error('Share failed:', err));
    } else {
      // Fallback for browsers that don't support Web Share API
      const tempInput = document.createElement('input');
      document.body.appendChild(tempInput);
      tempInput.value = item.sourceLink;
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      
      // Add temporary tooltip to show feedback (you would want to implement this properly)
      alert('Link copied to clipboard!');
    }
  };

  // Media item card component for cleaner JSX
  const MediaCard = ({ item }) => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="md:flex">
        {/* Image section */}
        <div className="md:w-1/3 h-64 md:h-auto">
          <div className="h-full w-full bg-gray-200 relative">
            {item.image && item.image.data ? (
              <img 
                src={`data:${item.image.contentType};base64,${item.image.data}`}
                alt={item.title} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className="bg-[#3f6197] text-white text-xs font-medium px-3 py-1 rounded-full">
                {item.category}
              </span>
            </div>
          </div>
        </div>
        
        {/* Content section */}
        <div className="md:w-2/3 p-6">
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
            <time dateTime={item.date}>
              {new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <a 
              href={item.sourceLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#3f6197] hover:underline font-medium"
            >
              {item.source}
            </a>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h2>
          <p className="text-gray-600 mb-4">{item.summary}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4">
            <p className="text-gray-700 whitespace-pre-line">{item.content}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Source:</span>
              <a 
                href={item.sourceLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#3f6197] hover:underline flex items-center gap-1"
              >
                <span>{item.source}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            
            <button 
              onClick={() => handleShare(item)}
              className="text-[#3f6197] hover:text-[#2c4b79] flex items-center gap-1"
            >
              <span>Share</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Press & Media Coverage</h1>
        <p className="text-blue-100 text-lg">News, articles, and media mentions featuring our incubation center and startups</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by keywords..."
                value={filters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Source Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Source</label>
            <select
              value={filters.source}
              onChange={(e) => updateFilter('source', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none"
            >
              {sources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by Date</label>
            <div className="flex">
              <button
                onClick={() => updateFilter('sortOrder', 'newest')}
                className={`flex-1 px-4 py-2 rounded-l-lg font-medium transition-all ${
                  filters.sortOrder === 'newest'
                    ? "bg-[#3f6197] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Newest First
              </button>
              <button
                onClick={() => updateFilter('sortOrder', 'oldest')}
                className={`flex-1 px-4 py-2 rounded-r-lg font-medium transition-all ${
                  filters.sortOrder === 'oldest'
                    ? "bg-[#3f6197] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Oldest First
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.source !== 'All' && (
          <div className="bg-blue-50 text-[#3f6197] px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <span>Source: {filters.source}</span>
            <button 
              onClick={() => updateFilter('source', 'All')} 
              className="ml-2 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {filters.searchTerm && (
          <div className="bg-blue-50 text-[#3f6197] px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <span>Search: "{filters.searchTerm}"</span>
            <button 
              onClick={() => updateFilter('searchTerm', '')} 
              className="ml-2 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {(filters.source !== 'All' || filters.searchTerm) && (
          <button 
            onClick={resetFilters}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3f6197]"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center shadow-md mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-800 text-lg font-medium">{error}</p>
          <button 
            onClick={fetchMediaCoverage}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Media Coverage Cards */}
      {!loading && !error && (
        <div className="space-y-8">
          {mediaCoverage.map(item => (
            <MediaCard key={item._id} item={item} />
          ))}
        </div>
      )}
      
      {/* Empty state if no media items match the filter */}
      {!loading && !error && mediaCoverage.length === 0 && (
        <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-200 text-center shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-yellow-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-yellow-800 text-lg font-medium">No media coverage found matching your criteria.</p>
          <p className="text-yellow-700 mt-2">Try adjusting your filters or search term.</p>
          <button 
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
          >
            Reset All Filters
          </button>
        </div>
      )}
      
      {/* Pagination */}
      {!loading && !error && mediaCoverage.length > 0 && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => handlePageChange(Math.max(1, filters.currentPage - 1))}
              disabled={filters.currentPage === 1}
              className={`px-4 py-2 rounded-l-md border border-gray-300 ${
                filters.currentPage === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            {/* Page numbers */}
            {Array.from({ length: pagination.totalPages }, (_, index) => {
              const pageNumber = index + 1;
              // Show current page, first, last, and pages around current
              if (
                pageNumber === 1 ||
                pageNumber === pagination.totalPages ||
                (pageNumber >= filters.currentPage - 1 && pageNumber <= filters.currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 border-t border-b border-gray-300 ${
                      filters.currentPage === pageNumber
                        ? 'bg-[#3f6197] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                (pageNumber === 2 && filters.currentPage > 3) ||
                (pageNumber === pagination.totalPages - 1 && filters.currentPage < pagination.totalPages - 2)
              ) {
                // Show ellipsis
                return (
                  <span
                    key={pageNumber}
                    className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700"
                  >
                    ...
                  </span>
                );
              }
              return null;
            })}
            
            <button
              onClick={() => handlePageChange(Math.min(pagination.totalPages, filters.currentPage + 1))}
              disabled={filters.currentPage === pagination.totalPages}
              className={`px-4 py-2 rounded-r-md border border-gray-300 ${
                filters.currentPage === pagination.totalPages 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
      
      {/* Results count */}
      {!loading && !error && mediaCoverage.length > 0 && (
        <div className="mt-6 text-center text-gray-500">
          Showing {mediaCoverage.length} of {pagination.totalItems} articles
        </div>
      )}
    </div>
  );
};

export default Press_Media_Coverage;