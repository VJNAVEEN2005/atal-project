import React, { useEffect, Suspense } from "react";
import { Search, Filter, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import PortfolioCard from "./PortfolioCards";
import Modal from "./UI/Modal";
import StartupDetails from "./StartupDetail";
import AdvancedFilterForm from "./AdvancedFilterForm";
import api from "../../Api/api";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStartups,
  fetchStartupsPaginated,
  fetchStartupsByCategory,
  searchStartups,
  setActiveCategory,
  setSelectedStartup,
  toggleAdvancedFilter,
  setSearchTerm,
  setCurrentPage,
  clearSearch,
} from "../../Redux/slice/startupPortfolioSlice";

// Lazy loading PortfolioFilters
const PortfolioFilters = React.lazy(() => import("./PortfolioFilter"));

const PortfolioSection = () => {
  const dispatch = useDispatch();

  // Get state from Redux store
  const {
    startups,
    searchResults,
    loading,
    error,
    activeCategory,
    selectedStartup,
    isAdvancedFilterOpen,
    searchTerm,
    categories,
    pagination,
    isSearchMode,
    currentPage,
  } = useSelector((state) => state.startupPortfolio);

  // Determine which startups to display
  const displayStartups = isSearchMode ? searchResults : startups;

  // Fetch startups from API on component mount
  useEffect(() => {
    if (!startups.length) {
      dispatch(fetchStartupsPaginated({ page: 1, limit: 9 }));
    }
  }, [dispatch]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    dispatch(setCurrentPage(nextPage));
    
    if (isSearchMode) {
      dispatch(searchStartups({ 
        searchQuery: searchTerm, 
        page: nextPage, 
        limit: 9 
      }));
    } else if (activeCategory === "All") {
      dispatch(fetchStartupsPaginated({ page: nextPage, limit: 9 }));
    } else {
      dispatch(fetchStartupsByCategory({ 
        category: activeCategory, 
        page: nextPage, 
        limit: 9 
      }));
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    dispatch(setSearchTerm(value));
    
    if (value.trim()) {
      dispatch(searchStartups({ 
        searchQuery: value, 
        page: 1, 
        limit: 9 
      }));
    } else {
      dispatch(clearSearch());
      // Load the current category or all startups
      if (activeCategory === "All") {
        dispatch(fetchStartupsPaginated({ page: 1, limit: 9 }));
      } else {
        dispatch(fetchStartupsByCategory({ 
          category: activeCategory, 
          page: 1, 
          limit: 9 
        }));
      }
    }
  };

  const handleCategoryChange = (category) => {
    dispatch(setActiveCategory(category));
    dispatch(clearSearch());
    
    if (category === "All") {
      dispatch(fetchStartupsPaginated({ page: 1, limit: 9 }));
    } else {
      dispatch(fetchStartupsByCategory({ 
        category, 
        page: 1, 
        limit: 9 
      }));
    }
  };

  const handleRefresh = () => {
    if (isSearchMode) {
      dispatch(searchStartups({ 
        searchQuery: searchTerm, 
        page: currentPage, 
        limit: 9 
      }));
    } else if (activeCategory === "All") {
      dispatch(fetchStartupsPaginated({ page: currentPage, limit: 9 }));
    } else {
      dispatch(fetchStartupsByCategory({ 
        category: activeCategory, 
        page: currentPage, 
        limit: 9 
      }));
    }
  };

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
    
    if (isSearchMode) {
      dispatch(searchStartups({ 
        searchQuery: searchTerm, 
        page: newPage, 
        limit: 9 
      }));
    } else if (activeCategory === "All") {
      dispatch(fetchStartupsPaginated({ page: newPage, limit: 9 }));
    } else {
      dispatch(fetchStartupsByCategory({ 
        category: activeCategory, 
        page: newPage, 
        limit: 9 
      }));
    }
  };

  const handleStartupSelect = (startup) => {
    dispatch(setSelectedStartup(startup));
  };

  const handleCloseModal = () => {
    dispatch(setSelectedStartup(null));
  };

  const handleToggleAdvancedFilter = () => {
    dispatch(toggleAdvancedFilter());
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#eef2f7] to-white ">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <section className="relative flex flex-col items-center text-center py-1 px-6 overflow-hidden mb-5">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 animate-fadeIn">
            Welcome to <br />
            <span className="text-[#3f6197]">Our Startup Portfolio</span>
          </h1>
          <div className="bg-white shadow-xl rounded-b-2xl p-4 md:p-5">
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
              Our portfolio features startups that are not only pioneering in
              their industries but are also making significant contributions to
              solving real-world problems. From technology and sustainability to
              healthcare and consumer products, our startups are at the
              forefront of innovation.
            </p>
          </div>
        </section>

        {/* Search and Filter Controls */}
        <div className="w-full max-w-3xl mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search startups..."
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
              />
            </div>

            <div className="flex gap-2">
              {/* <button
                onClick={handleToggleAdvancedFilter}
                className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
              >
                <Filter size={16} className="mr-2" />
                Filters
              </button> */}

              <button
                onClick={handleRefresh}
                className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
                disabled={loading}
              >
                <RefreshCw
                  size={16}
                  className={`mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="w-full mb-8">
          <Suspense
            fallback={
              <div className="text-center py-4">Loading filters...</div>
            }
          >
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeCategory === category
                      ? "bg-[#3f6197] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Suspense>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f6197]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg text-center">
            {error}
            <button onClick={handleRefresh} className="ml-2 underline">
              Try Again
            </button>
          </div>
        ) : displayStartups.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center w-full max-w-md">
            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No startups found
            </h3>
            <p className="text-gray-500">
              {isSearchMode 
                ? `No results found for "${searchTerm}"`
                : "Try adjusting your filters or search terms"
              }
            </p>
          </div>
        ) : (
          // Portfolio Grid
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full ">
              {displayStartups.map((startup) => (
                <PortfolioCard
                  key={startup._id}
                  id={startup._id}
                  title={startup.title}
                  description={startup.description}
                  image={`${api.web}api/v1/startup/${startup._id}/image`}
                  category={startup.category}
                  sector={startup.sector}
                  founded={startup.founded}
                  revenue={startup.revenue}
                  jobs={startup.jobs}
                  achievements={startup.achievements}
                  onClick={() => handleStartupSelect(startup)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && !error && displayStartups.length > 0 && (
          <div className="flex flex-col items-center mt-12 space-y-4">
            {/* Pagination Navigation */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPreviousPage}
                className={`p-2 rounded-lg transition-colors ${
                  pagination.hasPreviousPage
                    ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <ChevronLeft size={20} />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {[...Array(Math.min(pagination.totalPages, 5))].map((_, index) => {
                  let pageNumber;
                  if (pagination.totalPages <= 5) {
                    pageNumber = index + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = index + 1;
                  } else if (currentPage >= pagination.totalPages - 2) {
                    pageNumber = pagination.totalPages - 4 + index;
                  } else {
                    pageNumber = currentPage - 2 + index;
                  }

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        currentPage === pageNumber
                          ? "bg-[#3f6197] text-white"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className={`p-2 rounded-lg transition-colors ${
                  pagination.hasNextPage
                    ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Pagination Info */}
            <div className="text-sm text-gray-500">
              Showing page {pagination.currentPage} of {pagination.totalPages} 
              ({pagination.totalStartups} total startups)
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={!!selectedStartup} onClose={handleCloseModal}>
        {selectedStartup && <StartupDetails startup={selectedStartup} />}
      </Modal>

      <Modal isOpen={isAdvancedFilterOpen} onClose={handleToggleAdvancedFilter}>
        Filter
        {/* <AdvancedFilterForm 
          onConfirm={handleToggleAdvancedFilter} 
          sectors={Array.from(new Set(startups.map(s => s.sector)))}
          foundedYears={Array.from(new Set(startups.map(s => s.founded)))}
        /> */}
      </Modal>
    </section>
  );
};

export default PortfolioSection;
