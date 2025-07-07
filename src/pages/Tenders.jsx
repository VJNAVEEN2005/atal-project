import axios from "axios";
import React, { useState, useMemo, useEffect } from "react";
import api from "../Api/api";
import { useSelector, useDispatch } from "react-redux";
import { fetchTenders } from "../Redux/slice/tendersSlice";

function Tenders() {
  const [tenderData, setTenderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState({
    id: null,
    type: null,
    progress: 0,
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.tenders);

  useEffect(() => {
    if (!state.tenders) {
      dispatch(fetchTenders());
      setIsLoading(true);
      setError(null);
    }
  }, []);

  useEffect(() => {
    if (state.tenders) {
      setTenderData(state.tenders.tenders);
      setIsLoading(false);
    } else if (state.error) {
      setError("Failed to load tenders. Please try again.");
      setIsLoading(false);
    }
  }, [state.tenders, state.error]);


  const handleApiError = (error) => {
    console.error("API Error:", error);
    setError(error.message || "An error occurred");
    setTimeout(() => setError(null), 5000);
  };

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Auto-determine tender status based on current date
  const processedTenders = useMemo(() => {
    const now = new Date();

    return tenderData.map((tender) => {
      const deadline = new Date(
        `${tender.lastDate}T${tender.lastTime || "23:59"}`
      );
      const status = now > deadline ? "closed" : "open";

      // Format the dates for display
      const formattedDate = new Date(tender.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      const formattedLastDate = new Date(tender.lastDate).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      );

      return {
        ...tender,
        status,
        displayDate: formattedDate,
        displayLastDate: formattedLastDate,
      };
    });
  }, [tenderData]);

  // Filter tenders based on status and search term
  const filteredTenders = useMemo(() => {
    return processedTenders
      .filter((tender) => filter === "all" || tender.status === filter)
      .filter(
        (tender) =>
          searchTerm === "" ||
          tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tender.reference &&
            tender.reference.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  }, [processedTenders, filter, searchTerm]);

  // Count open and closed tenders for the filter buttons
  const counts = useMemo(() => {
    return {
      open: processedTenders.filter((t) => t.status === "open").length,
      closed: processedTenders.filter((t) => t.status === "closed").length,
      all: processedTenders.length,
    };
  }, [processedTenders]);

  const viewTenderPDF = async (id) => {
    try {
      setPdfLoading({ id, type: "view", progress: 0 });

      const response = await axios.get(
        `${api.web}api/v1/downloadTender/${id}`,
        {
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setPdfLoading((prev) => ({ ...prev, progress: percentCompleted }));
          },
        }
      );

      // Create blob URL
      const blob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(blob);

      // Open in new tab
      const newWindow = window.open(pdfUrl, "_blank");

      if (newWindow) {
        newWindow.focus();
      } else {
        // Fallback to download if popup blocked
        const downloadLink = document.createElement("a");
        downloadLink.href = pdfUrl;
        downloadLink.download = `tender-${id}.pdf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }

      // Clean up after some time
      setTimeout(() => URL.revokeObjectURL(pdfUrl), 30000);
    } catch (err) {
      handleApiError(err);
    } finally {
      setTimeout(
        () => setPdfLoading({ id: null, type: null, progress: 0 }),
        500
      );
    }
  };

  const downloadTender = async (id, fileName = `tender-${id}.pdf`) => {
    try {
      setPdfLoading({ id, type: "download", progress: 0 });

      const response = await axios.get(
        `${api.web}api/v1/downloadTender/${id}`,
        {
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setPdfLoading((prev) => ({ ...prev, progress: percentCompleted }));
          },
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      // Clean up
      setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(url);
        setPdfLoading({ id: null, type: null, progress: 0 });
      }, 500);
    } catch (err) {
      handleApiError(err);
      setPdfLoading({ id: null, type: null, progress: 0 });
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}

      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Tenders & Procurement
        </h1>
        <p className="text-blue-100 text-lg">
          Browse and download our latest tender notices and procurement
          documents
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-[#3f6197] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Tenders ({counts.all})
            </button>
            <button
              onClick={() => setFilter("open")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                filter === "open"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  filter === "open" ? "bg-white" : "bg-green-500"
                } mr-2`}
              ></span>
              Open Tenders ({counts.open})
            </button>
            <button
              onClick={() => setFilter("closed")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                filter === "closed"
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  filter === "closed" ? "bg-white" : "bg-red-500"
                } mr-2`}
              ></span>
              Closed Tenders ({counts.closed})
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search tenders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#3f6197] focus:border-transparent"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
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

        <div className="text-sm text-gray-500 mb-4">
          Showing {filteredTenders.length} tender
          {filteredTenders.length !== 1 ? "s" : ""}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f6197]"></div>
        </div>
      ) : filteredTenders.length === 0 ? (
        <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-200 text-center shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-yellow-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p className="text-yellow-800 text-lg font-medium">
            No tenders available matching your criteria.
          </p>
          <p className="text-yellow-700 mt-2">
            Try adjusting your filters or search term.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredTenders.map((tender) => (
            <div
              key={tender._id}
              className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden transition-all hover:shadow-xl"
            >
              <div
                className={`px-6 py-5 border-b ${
                  tender.status === "open"
                    ? "bg-gradient-to-r from-[#3f6197]/95 to-[#5478b0]/95"
                    : "bg-gradient-to-r from-gray-700/95 to-gray-600/95"
                }`}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-100 text-sm">
                        {tender.displayDate}
                      </span>
                      <span className="text-blue-100">•</span>
                      <span className="text-blue-100 text-sm">
                        {tender.reference || "No Reference"}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      {tender.title}
                    </h2>
                  </div>
                  <div className="md:flex-shrink-0">
                    {tender.status === "open" ? (
                      <span className="bg-green-500 text-white font-medium px-4 py-1.5 rounded-full text-sm flex items-center justify-center w-24">
                        <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                        OPEN
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white font-medium px-4 py-1.5 rounded-full text-sm flex items-center justify-center w-24">
                        <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                        CLOSED
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="mb-2">
                        <span className="text-gray-500 text-sm">
                          Organization
                        </span>
                        <br />
                        <span className="font-medium text-gray-800">
                          {tender.organization}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="mb-2">
                        <span className="text-gray-500 text-sm">
                          Last Date for Submission
                        </span>
                        <br />
                        <span
                          className={`font-medium ${
                            tender.status === "open"
                              ? "text-red-600"
                              : "text-gray-800"
                          }`}
                        >
                          {tender.displayLastDate}{" "}
                          {tender.lastTime &&
                            `at ${tender.lastTime.replace(":", ".")}`}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
                    {/* View PDF Button */}
                    <button
                      onClick={() => viewTenderPDF(tender._id)}
                      disabled={
                        pdfLoading.id === tender._id &&
                        pdfLoading.type === "view"
                      }
                      className={`flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors gap-3 group flex-1 ${
                        pdfLoading.id === tender._id &&
                        pdfLoading.type === "view"
                          ? "opacity-75 cursor-wait"
                          : ""
                      }`}
                    >
                      <div className="p-2 bg-blue-500 rounded-lg text-white">
                        {pdfLoading.id === tender._id &&
                        pdfLoading.type === "view" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-blue-700 font-semibold group-hover:text-blue-900">
                          View PDF
                          {pdfLoading.id === tender._id &&
                            pdfLoading.type === "view" && (
                              <span className="ml-2 text-blue-500 text-xs">
                                {pdfLoading.progress}%
                              </span>
                            )}
                        </p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          Open in browser viewer
                        </p>
                      </div>
                      <div className="ml-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400 group-hover:text-blue-500"
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
                      </div>
                    </button>

                    {/* Download PDF Button */}
                    <button
                      onClick={() =>
                        downloadTender(tender._id, tender.fileName)
                      }
                      disabled={
                        pdfLoading.id === tender._id &&
                        pdfLoading.type === "download"
                      }
                      className={`flex items-center p-4 bg-[#3f6197]/10 rounded-lg hover:bg-[#3f6197]/20 transition-colors gap-3 group flex-1 ${
                        pdfLoading.id === tender._id &&
                        pdfLoading.type === "download"
                          ? "opacity-75 cursor-wait"
                          : ""
                      }`}
                    >
                      <div className="p-2 bg-[#3f6197] rounded-lg text-white">
                        {pdfLoading.id === tender._id &&
                        pdfLoading.type === "download" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-[#3f6197] font-semibold group-hover:text-[#2c4b79]">
                          Download PDF
                          {pdfLoading.id === tender._id &&
                            pdfLoading.type === "download" && (
                              <span className="ml-2 text-[#3f6197] text-xs">
                                {pdfLoading.progress}%
                              </span>
                            )}
                        </p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {tender.fileName || "Tender document"}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-400 group-hover:text-[#3f6197]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <button
          onClick={fetchTenders}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          Refresh Tenders
        </button>
      </div>
    </div>
  );
}

export default Tenders;
