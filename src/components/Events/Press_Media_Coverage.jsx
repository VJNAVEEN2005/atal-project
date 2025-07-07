import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import api from "../../Api/api";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchPressmedia } from "../../Redux/slice/pressmediaSlice";

const Press_Media_Coverage = () => {
  // Media coverage data state
  const [mediaCoverage, setMediaCoverage] = useState([]);
  const [sources, setSources] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and sort states
  const [filters, setFilters] = useState({
    source: "All",
    sortOrder: "newest",
    searchTerm: "",
    currentPage: 1,
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalItems: 0,
  });
  const ITEMS_PER_PAGE = 10;

  // Memoized fetchMediaCoverage to prevent unnecessary re-renders
  const fetchMediaCoverage = useCallback(async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (filters.source !== "All") params.append("source", filters.source);
      if (filters.searchTerm) params.append("search", filters.searchTerm);
      params.append("sort", filters.sortOrder);
      params.append("page", filters.currentPage);
      params.append("limit", ITEMS_PER_PAGE);

      const response = await axios.get(
        `${api.web}api/v1/media/?${params.toString()}`
      );
      setMediaCoverage(response.data.mediaItems);
      setPagination({
        totalPages: response.data.pagination.pages,
        totalItems: response.data.pagination.total,
      });
      setError(null);
    } catch (err) {
      setError("Failed to fetch media coverage. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (!state.pressmedia.pressmedia) {
      dispatch(fetchPressmedia());
    }
  }, []);

  useEffect(() => {
    if (state.pressmedia.pressmedia) {
      setSources([
        "All",
        ...state.pressmedia.pressmedia.sources.filter(
          (source) => source !== "All"
        ),
      ]);
    }
  }, [state]);

  // Fetch media when filters change
  useEffect(() => {
    fetchMediaCoverage();
  }, [fetchMediaCoverage]);

  // Update a single filter
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      // Reset to first page when changing filters except when changing page
      currentPage: key === "currentPage" ? value : 1,
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      source: "All",
      sortOrder: "newest",
      searchTerm: "",
      currentPage: 1,
    });
  };

  // Handle page change with smooth scroll
  const handlePageChange = (page) => {
    updateFilter("currentPage", page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Share functionality
  const handleShare = (item) => {
    // Create share data object
    const shareData = {
      title: item.title,
      text: `${item.summary} - ${item.source}`,
      url: item.sourceLink,
    };

    // Use Web Share API if available
    if (navigator.share && navigator.canShare(shareData)) {
      navigator
        .share(shareData)
        .catch((err) => console.error("Share failed:", err));
    } else {
      // Fallback for browsers that don't support Web Share API
      const tempInput = document.createElement("input");
      document.body.appendChild(tempInput);
      tempInput.value = item.sourceLink;
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      // Add temporary tooltip to show feedback
      alert("Link copied to clipboard!");
    }
  };

  // Media item card component for cleaner JSX
  const MediaCard = ({ item }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden transition-all duration-200 hover:shadow-xl hover:translate-y-px transform">
      <div className="md:flex">
        {/* Image section with improved styling */}
        <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#3f6197]/30 to-transparent z-10"></div>
          {item.image && item.image.data ? (
            <img
              src={`data:${item.image.contentType};base64,${item.image.data}`}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-[#3f6197] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm bg-opacity-90">
              {item.category}
            </span>
          </div>
        </div>

        {/* Content section with improved typography and spacing */}
        <div className="md:w-3/5 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
            <time dateTime={item.date} className="font-medium">
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <a
              href={item.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3f6197] hover:text-[#5478b0] hover:underline font-semibold transition-colors"
            >
              {item.source}
            </a>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight hover:text-[#3f6197] transition-colors">
            <a href={item.sourceLink} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </h2>

          <p className="text-gray-600 mb-5 line-clamp-2">{item.summary}</p>

          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-5 rounded-xl border-l-4 border-[#3f6197] mb-5">
            <p className="text-gray-700 whitespace-pre-line line-clamp-3">
              {item.content}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <a
              href={item.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#3f6197] text-white rounded-lg hover:bg-[#5478b0] transition-colors flex items-center gap-2 font-medium text-sm"
            >
              <span>Read Full Article</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>

            <button
              onClick={() => handleShare(item)}
              className="px-4 py-2 bg-gray-100 text-[#3f6197] rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 font-medium text-sm"
            >
              <span>Share</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto my-16 px-4">
      {/* Modern Header with Subtle Animation */}
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-3xl shadow-2xl p-8 mb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32 opacity-20"></div>
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48 opacity-20"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
            Press & Media Coverage
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl">
            Stay updated with news, articles, and media mentions featuring our
            incubation center and portfolio startups
          </p>
        </div>
      </div>

      {/* Search and Filter Controls with improved styling */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-10 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search with improved UX */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Articles
            </label>
            <div className="relative group">
              <input
                type="text"
                placeholder="Search by keywords..."
                value={filters.searchTerm}
                onChange={(e) => updateFilter("searchTerm", e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none transition-all group-hover:border-[#3f6197]/50"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute left-3 top-3.5 group-hover:text-[#3f6197] transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Source Filter with improved styling */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Source
            </label>
            <div className="relative">
              <select
                value={filters.source}
                onChange={(e) => updateFilter("source", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none appearance-none bg-white transition-all hover:border-[#3f6197]/50"
              >
                {sources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Sort Order with improved styling */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sort by Date
            </label>
            <div className="flex">
              <button
                onClick={() => updateFilter("sortOrder", "newest")}
                className={`flex-1 px-4 py-3 rounded-l-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  filters.sortOrder === "newest"
                    ? "bg-[#3f6197] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
                <span>Newest</span>
              </button>
              <button
                onClick={() => updateFilter("sortOrder", "oldest")}
                className={`flex-1 px-4 py-3 rounded-r-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  filters.sortOrder === "oldest"
                    ? "bg-[#3f6197] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                  />
                </svg>
                <span>Oldest</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters with improved visual appearance */}
      {(filters.source !== "All" || filters.searchTerm) && (
        <div className="flex flex-wrap gap-2 mb-8">
          <div className="bg-blue-50 rounded-xl p-3 shadow-sm border border-blue-100 flex items-center gap-3">
            <span className="text-sm font-medium text-[#3f6197]">
              Active filters:
            </span>

            {filters.source !== "All" && (
              <div className="bg-white text-[#3f6197] px-3 py-1.5 rounded-lg text-sm font-medium flex items-center shadow-sm border border-blue-100">
                <span>Source: {filters.source}</span>
                <button
                  onClick={() => updateFilter("source", "All")}
                  className="ml-2 focus:outline-none text-[#3f6197] hover:text-red-500 transition-colors"
                  aria-label="Remove source filter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            {filters.searchTerm && (
              <div className="bg-white text-[#3f6197] px-3 py-1.5 rounded-lg text-sm font-medium flex items-center shadow-sm border border-blue-100">
                <span>Search: "{filters.searchTerm}"</span>
                <button
                  onClick={() => updateFilter("searchTerm", "")}
                  className="ml-2 focus:outline-none text-[#3f6197] hover:text-red-500 transition-colors"
                  aria-label="Remove search filter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            <button
              onClick={resetFilters}
              className="bg-[#3f6197] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#5478b0] transition-colors flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Reset All</span>
            </button>
          </div>
        </div>
      )}

      {/* Loading State with improved animation */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-t-2 border-r-2 border-[#5478b0] animate-spin"></div>
          </div>
        </div>
      )}

      {/* Error State with improved visuals */}
      {error && !loading && (
        <div className="bg-red-50 p-8 rounded-2xl border border-red-100 text-center shadow-lg mb-8">
          <div className="rounded-full bg-red-100 w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-red-800 text-xl font-bold mb-2">
            Unable to Load Media
          </h3>
          <p className="text-red-700 mb-6">{error}</p>
          <button
            onClick={fetchMediaCoverage}
            className="px-6 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors font-medium flex items-center gap-2 mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Try Again</span>
          </button>
        </div>
      )}

      {/* Media Coverage Cards */}
      {!loading && !error && (
        <div className="space-y-10">
          {mediaCoverage.map((item) => (
            <MediaCard key={item._id} item={item} />
          ))}
        </div>
      )}

      {/* Empty state with improved visuals */}
      {!loading && !error && mediaCoverage.length === 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-10 rounded-2xl border border-blue-100 text-center shadow-lg">
          <div className="bg-white/70 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-[#3f6197]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h3 className="text-[#3f6197] text-2xl font-bold mb-3">
            No Media Coverage Found
          </h3>
          <p className="text-gray-700 mb-6 max-w-lg mx-auto">
            We couldn't find any articles matching your current filters. Try
            adjusting your search criteria or check back later for new updates.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-3 bg-[#3f6197] text-white rounded-xl hover:bg-[#5478b0] transition-colors font-medium flex items-center gap-2 mx-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Reset Filters</span>
          </button>
        </div>
      )}

      {/* Pagination with improved visual design */}
      {!loading &&
        !error &&
        mediaCoverage.length > 0 &&
        pagination.totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="inline-flex rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <button
                onClick={() =>
                  handlePageChange(Math.max(1, filters.currentPage - 1))
                }
                disabled={filters.currentPage === 1}
                className={`px-5 py-3 border-r border-gray-200 font-medium flex items-center gap-2 ${
                  filters.currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Previous</span>
              </button>

              {/* Page numbers */}
              {Array.from({ length: pagination.totalPages }, (_, index) => {
                const pageNumber = index + 1;
                // Show current page, first, last, and pages around current
                if (
                  pageNumber === 1 ||
                  pageNumber === pagination.totalPages ||
                  (pageNumber >= filters.currentPage - 1 &&
                    pageNumber <= filters.currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-12 py-3 border-r border-gray-200 font-medium ${
                        filters.currentPage === pageNumber
                          ? "bg-[#3f6197] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  (pageNumber === 2 && filters.currentPage > 3) ||
                  (pageNumber === pagination.totalPages - 1 &&
                    filters.currentPage < pagination.totalPages - 2)
                ) {
                  // Show ellipsis
                  return (
                    <span
                      key={pageNumber}
                      className="w-12 py-3 border-r border-gray-200 bg-white text-gray-700 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        />
                      </svg>
                    </span>
                  );
                }
                return null;
              })}

              <button
                onClick={() =>
                  handlePageChange(
                    Math.min(pagination.totalPages, filters.currentPage + 1)
                  )
                }
                disabled={filters.currentPage === pagination.totalPages}
                className={`px-5 py-3 font-medium flex items-center gap-2 ${
                  filters.currentPage === pagination.totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </nav>
          </div>
        )}

      {/* Results count with improved styling */}
      {!loading && !error && mediaCoverage.length > 0 && (
        <div className="mt-8 text-center">
          <span className="bg-blue-50 px-4 py-2 rounded-lg text-[#3f6197] font-medium inline-block">
            Showing {mediaCoverage.length} of {pagination.totalItems} articles
          </span>
        </div>
      )}

      {/* Newsletter signup section - Added feature */}
      <div className="mt-16 bg-gradient-to-br from-[#3f6197] to-[#2c4b79] rounded-2xl p-8 shadow-xl">
        <div className="md:flex items-center justify-between">
          <div className="md:w-3/5 mb-6 md:mb-0">
            <h3 className="text-white text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-blue-100">
              Subscribe to our newsletter to receive the latest press coverage
              and announcements directly in your inbox.
            </p>
          </div>
          <div className="md:w-2/5">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-white text-[#3f6197] px-5 py-3 rounded-r-lg font-medium hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer card with stats - Added feature */}
      <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-blue-100 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#3f6197]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              {pagination.totalItems}+
            </h3>
            <p className="text-gray-600">Media Articles</p>
          </div>

          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#3f6197]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              {sources.length - 1}
            </h3>
            <p className="text-gray-600">Media Sources</p>
          </div>

          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#3f6197]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">5+</h3>
            <p className="text-gray-600">Years of Coverage</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press_Media_Coverage;
