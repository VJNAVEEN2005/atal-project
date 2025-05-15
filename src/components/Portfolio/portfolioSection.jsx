import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { Search, Filter, RefreshCw } from "lucide-react";
import PortfolioCard from "./PortfolioCards";
import Modal from "./UI/Modal";
import StartupDetails from "./StartupDetail";
import AdvancedFilterForm from "./AdvancedFilterForm";
import api from "../../Api/api";

// Lazy loading PortfolioFilters
const PortfolioFilters = React.lazy(() => import("./PortfolioFilter"));

const ITEMS_PER_PAGE = 9;

const PortfolioSection = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(["All"]);
  
  // Fetch startups from API
  useEffect(() => {
    fetchStartups();
  }, []);
  
  const fetchStartups = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api.web}api/v1/startup`);
      const startupsData = response.data.data.startups;
      setStartups(startupsData);
      
      // Extract unique categories from the fetched data
      const uniqueCategories = ["All", ...Array.from(new Set(startupsData.map(startup => startup.category)))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching startups:", err);
      setError("Failed to load startups. Please try again.");
      setLoading(false);
    }
  };

  // Filter startups by category and search term
  const filteredStartups = startups.filter(startup => {
    const matchesCategory = activeCategory === "All" || startup.category === activeCategory;
    
    const matchesSearch = searchTerm === "" || 
      startup.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.sector.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const visibleStartups = filteredStartups.slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setVisibleCount(ITEMS_PER_PAGE); // Reset visible count when searching
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#eef2f7] to-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <section className="relative flex flex-col items-center text-center py-1 px-6 overflow-hidden mb-5">
  
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 animate-fadeIn">
            Welcome to <br />
            <span className="text-[#3f6197]">Our Startup Portfolio</span>
          </h1>
          <div className="bg-white shadow-xl rounded-b-2xl p-4 md:p-5">
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
            Our portfolio features startups that are not only pioneering in their industries but are also making significant contributions to solving real-world problems. From technology and sustainability to healthcare and consumer products, our startups are at the forefront of innovation.
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
              <button
                onClick={() => setIsAdvancedFilterOpen(true)}
                className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
              >
                <Filter size={16} className="mr-2" />
                Filters
              </button>
              
              <button
                onClick={fetchStartups}
                className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
                disabled={loading}
              >
                <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
        
        {/* Category filters */}
        <div className="w-full mb-8">
          <Suspense fallback={<div className="text-center py-4">Loading filters...</div>}>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeCategory === category
                      ? 'bg-[#3f6197] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
            <button 
              onClick={fetchStartups}
              className="ml-2 underline"
            >
              Try Again
            </button>
          </div>
        ) : visibleStartups.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center w-full max-w-md">
            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No startups found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          // Portfolio Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {visibleStartups.map((startup) => (
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
                onClick={() => setSelectedStartup(startup)}
              />
            ))}
          </div>
        )}

        {!loading && !error && visibleCount < filteredStartups.length && (
          <div className="text-center mt-12">
            <button 
              onClick={handleLoadMore}
              className="py-3 px-6 bg-[#3f6197] text-white rounded-lg hover:bg-[#2d4974] transition-colors font-medium"
            >
              Know More
            </button>
          </div>
        )}
        
        {!loading && !error && filteredStartups.length > 0 && (
          <div className="mt-6 text-sm text-gray-500">
            Showing {Math.min(visibleCount, filteredStartups.length)} of {filteredStartups.length} startups
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedStartup}
        onClose={() => setSelectedStartup(null)}
      >
        {selectedStartup && <StartupDetails startup={selectedStartup}   />}
      </Modal>

      <Modal
        isOpen={isAdvancedFilterOpen}
        onClose={() => setIsAdvancedFilterOpen(false)}
      >
        <AdvancedFilterForm 
          onConfirm={() => setIsAdvancedFilterOpen(false)} 
          sectors={Array.from(new Set(startups.map(s => s.sector)))}
          foundedYears={Array.from(new Set(startups.map(s => s.founded)))}
        />
      </Modal>
    </section>
  );
};

export default PortfolioSection;