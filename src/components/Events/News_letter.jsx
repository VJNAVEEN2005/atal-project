import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  FileText,
  Download,
} from "lucide-react";
import axios from "axios";
import api from "../../Api/api";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchNewsletters } from "../../Redux/slice/newslettersSlice";

const NewsLetter = () => {
  const themeColor = "#3f6197";
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8; // Adjust based on your design needs

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    if (state.newsletters) {
      setLoading(state.newsletters.loading);
      setError(state.newsletters.error);
      if (state.newsletters.newsletters) {
        setNewsletters(state.newsletters.newsletters.newsletters);
        setTotalPages(
          Math.ceil(
            state.newsletters.newsletters.newsletters.length / itemsPerPage
          )
        );
      } else {
        setNewsletters([]);
        setTotalPages(1);
      }
    }
  }, [state.newsletters]);
  // Fetch newsletters on component mount
  useEffect(() => {
    if (!state.newsletters.newsletters) {
      dispatch(fetchNewsletters());
    }
  }, []);

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNewsletters = newsletters.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Display at most 3 page numbers
  const getPageNumbers = () => {
    if (totalPages <= 3) {
      return pageNumbers;
    }

    if (currentPage <= 2) {
      return [1, 2, 3];
    }

    if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const visiblePageNumbers = getPageNumbers();

  return (
    <div className="min-h-screen bg-white rounded-xl shadow-2xl py-16 px-14 min-w-[80%]">
      <div className="max-w-6xl mx-auto">
        {/* Header with animated underline */}
        <div className="text-center mb-10 relative">
          <h1
            className="text-4xl font-bold mb-4 inline-block relative"
            style={{ color: themeColor }}
          >
            Our Newsletters
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Stay updated with the latest news and opportunities
          </p>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-16">
            <div
              className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2"
              style={{ borderColor: themeColor }}
            ></div>
            <p className="mt-4 text-gray-600">Loading newsletters...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <div className="mb-4 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
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
            <p className="text-gray-800 font-medium">{error}</p>
            <button
              onClick={fetchNewsletters}
              className="mt-4 px-4 py-2 rounded-md text-white hover:bg-opacity-90"
              style={{ backgroundColor: themeColor }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Newsletter Grid - Portrait Layout */}
        {!loading && !error && (
          <>
            {newsletters.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600">
                  No newsletters available at this time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                {currentNewsletters.map((newsletter, index) => (
                  <div
                    key={newsletter._id || index}
                    className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
                  >
                    <a
                      href={`data:${newsletter.pdfFile?.contentType};base64,${newsletter.pdfFile?.data}`}
                      download={`${newsletter.title}.pdf`}
                      className=" h-full flex flex-col"
                    >
                      {/* Top Banner */}
                      <div
                        className="p-2 flex items-center justify-between"
                        style={{ backgroundColor: themeColor }}
                      >
                        <div className="flex items-center">
                          <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center">
                            <span
                              className="text-xs font-bold"
                              style={{ color: themeColor }}
                            >
                              A
                            </span>
                          </div>
                          <span className="text-white text-xs ml-1 font-medium">
                            AIC_PECF
                          </span>
                        </div>
                        <span className="text-white text-xs px-2 py-1 rounded-full bg-white/20">
                          {newsletter.year}
                        </span>
                      </div>

                      {/* Cover Image */}
                      <div className="relative aspect-[3/4] overflow-hidden">
                        {newsletter.coverImage ? (
                          <img
                            src={`data:${newsletter.coverImage.contentType};base64,${newsletter.coverImage.data}`}
                            alt={`${newsletter.title} Newsletter Cover`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="p-3 flex flex-col flex-grow">
                        <h3
                          className="font-medium text-center mb-2"
                          style={{ color: themeColor }}
                        >
                          {newsletter.title}
                        </h3>

                        {/* Bottom Action */}
                        <div className="mt-auto flex items-center justify-center">
                          <div
                            className="px-3 py-1 rounded-full flex items-center space-x-1 text-xs font-medium transition-colors group-hover:bg-gray-100"
                            style={{ color: themeColor }}
                          >
                            <Download size={12} />
                            <span>Download PDF</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation Controls */}
            {newsletters.length > 0 && (
              <div className="flex justify-center items-center space-x-4">
                <button
                  className={`p-2 rounded-full bg-white shadow transition-colors ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={18} style={{ color: themeColor }} />
                </button>
                <div className="flex space-x-1">
                  {visiblePageNumbers.map((number) => (
                    <button
                      key={number}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                        number === currentPage
                          ? "text-white"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                      style={{
                        backgroundColor:
                          number === currentPage ? themeColor : "transparent",
                      }}
                      onClick={() => handlePageClick(number)}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                <button
                  className={`p-2 rounded-full bg-white shadow transition-colors ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={18} style={{ color: themeColor }} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsLetter;
