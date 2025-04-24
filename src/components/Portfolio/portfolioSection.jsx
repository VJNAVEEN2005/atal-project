import React, { useState, Suspense } from "react";
import { portfolioData } from "./data/portfolioData";
import PortfolioCard from "./PortfolioCards";
import Modal from "./UI/Modal";
import StartupDetails from "./StartupDetail";
import AdvancedFilterForm from "./AdvancedFilterForm";

// Lazy loading PortfolioFilters
const PortfolioFilters = React.lazy(() => import("./PortfolioFilter"));

const ITEMS_PER_PAGE = 9;

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("Ongoing");
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  const filteredData =
    activeCategory === "All"
      ? portfolioData
      : portfolioData.filter((item) => item.category === activeCategory);

  const visibleData = filteredData.slice(0, visibleCount);

  const handleKnowMore = () => setVisibleCount((prev) => prev + ITEMS_PER_PAGE);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#eef2f7] to-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#3f6197]">
            Welcome to Our Startup Portfolio
          </h2>
        </div>

        <div className="w-full flex justify-center items-center">
          <p className="shadow-lg p-6 text-lg text-center bg-white mb-10 rounded-xl "> 
            Our portfolio features startups that are not only pioneering in
            their industries but are also making significant contributions to
            solving real-world problems. From technology and sustainability to
            healthcare and consumer products, our startups are at the forefront
            of innovation.
          </p>
        </div>

        {/* Uncomment if you want to use the filters
        <Suspense fallback={<div className="text-center py-4">Loading filters...</div>}>
          <PortfolioFilters
            categories={['Ongoing', 'Graduated']}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </Suspense>
        */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleData.map((item) => (
            <PortfolioCard
              key={item.id}
              {...item}
              onClick={() => setSelectedStartup(item)}
            />
          ))}
        </div>

        {visibleCount < filteredData.length && (
          <div className="text-center mt-12">
            <button 
              onClick={handleKnowMore}
              className="py-3 px-6 bg-[#3f6197] text-white rounded-lg hover:bg-[#2d4974] transition-colors font-medium"
            >
              Know More
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedStartup}
        onClose={() => setSelectedStartup(null)}
      >
        {selectedStartup && <StartupDetails startup={selectedStartup} />}
      </Modal>

      <Modal
        isOpen={isAdvancedFilterOpen}
        onClose={() => setIsAdvancedFilterOpen(false)}
      >
        <AdvancedFilterForm onConfirm={() => setIsAdvancedFilterOpen(false)} />
      </Modal>
    </section>
  );
};

export default PortfolioSection;