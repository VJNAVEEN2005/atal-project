import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../Api/api";

const TendersControl = () => {
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const [tenderData, setTenderData] = useState([]);
  const [viewMode, setViewMode] = useState("add"); // "add" or "view" mode
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = () => {
    setIsLoading(true);
    axios.get(`${api.web}api/v1/getTenders`).then((res) => {
      if (res.data.success) {
        setTenderData(res.data.tenders);
      } else {
        console.log("Error fetching tenders");
      }
      setIsLoading(false);
    }).catch(err => {
      console.error("Failed to fetch tenders:", err);
      setIsLoading(false);
    });
  };

  const [formData, setFormData] = useState({
    title: "",
    date: getTodayDate(),
    organization: "",
    reference: "",
    lastDate: "",
    lastTime: "",
    fileLink: "",
    fileName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    // Validate fileLink
    if (!isValidURL(formData.fileLink)) {
      setMessage({ text: "Please enter a valid file URL.", type: "error" });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axios.post(`${api.web}api/v1/createTender`, formData);
      if (res.data.success) {
        setMessage({ text: "Tender created successfully!", type: "success" });
        fetchTenders(); // Refresh tenders list

        // Reset form after success
        setFormData({
          title: "",
          date: getTodayDate(),
          organization: "",
          reference: "",
          lastDate: "",
          lastTime: "",
          fileLink: "",
          fileName: "",
        });
      } else {
        setMessage({ text: res.data.message, type: "error" });
      }
    } catch (err) {
      console.error("Error submitting form:", err.message);
      setMessage({
        text: "Failed to create tender. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate days remaining
  const getDaysRemaining = (endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastDate = new Date(endDate);
    lastDate.setHours(0, 0, 0, 0);
    
    const diffTime = lastDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Tender Management</h1>
            <p className="text-blue-100">Create and manage tender notices</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setViewMode("view")}
              className={`px-4 py-2 rounded-lg transition-colors ${viewMode === 'view' 
                ? 'bg-white text-[#3f6197] font-medium' 
                : 'bg-[#3f6197] text-white border border-white/30 hover:bg-[#2c4b79]'
              }`}
            >
              View Tenders
            </button>
            <button 
              onClick={() => setViewMode("add")}
              className={`px-4 py-2 rounded-lg transition-colors ${viewMode === 'add' 
                ? 'bg-white text-[#3f6197] font-medium' 
                : 'bg-[#3f6197] text-white border border-white/30 hover:bg-[#2c4b79]'
              }`}
            >
              Add Tender
            </button>
          </div>
        </div>
      </div>

      {viewMode === "add" ? (
        <div className="bg-white rounded-xl shadow-lg p-6">
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-center ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <span className="mr-2">
                {message.type === "success" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-[#f5f8fc] p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-[#3f6197] mb-2">Tender Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                    Tender Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                    placeholder="Enter tender title"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-gray-700 font-medium mb-2">
                    Organization*
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                    placeholder="Enter organization name"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#f5f8fc] p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-[#3f6197] mb-2">Reference Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="reference" className="block text-gray-700 font-medium mb-2">
                    Reference Number
                  </label>
                  <input
                    type="text"
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                    placeholder="E.g. Proc/AIC-PECF/2024/092"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate</p>
                </div>

                <div>
                  <label htmlFor="fileName" className="block text-gray-700 font-medium mb-2">
                    Document Filename
                  </label>
                  <input
                    type="text"
                    id="fileName"
                    name="fileName"
                    value={formData.fileName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                    placeholder="E.g. proc-aicpecf-2024-092.pdf"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate</p>
                </div>
              </div>
            </div>

            <div className="bg-[#f5f8fc] p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-[#3f6197] mb-2">Submission Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="lastDate" className="block text-gray-700 font-medium mb-2">
                    Last Date for Submission*
                  </label>
                  <input
                    type="date"
                    id="lastDate"
                    name="lastDate"
                    value={formData.lastDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                  />
                </div>

                <div>
                  <label htmlFor="lastTime" className="block text-gray-700 font-medium mb-2">
                    Last Time for Submission*
                  </label>
                  <input
                    type="time"
                    id="lastTime"
                    name="lastTime"
                    value={formData.lastTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                  />
                </div>

                <div>
                  <label htmlFor="fileLink" className="block text-gray-700 font-medium mb-2">
                    File Link*
                  </label>
                  <input
                    type="text"
                    id="fileLink"
                    name="fileLink"
                    value={formData.fileLink}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                    placeholder="https://example.com/tender.pdf"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-medium text-white flex items-center ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#3f6197] hover:bg-[#2c4b79] transition-colors"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create Tender
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-[#3f6197] mb-4">Available Tenders</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f6197]"></div>
            </div>
          ) : tenderData.length === 0 ? (
            <div className="bg-blue-50 rounded-lg p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No tenders available</h3>
              <p className="text-gray-500">There are currently no tenders in the system.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tenderData.map((tender, index) => {
                    const daysRemaining = getDaysRemaining(tender.lastDate);
                    let statusColor = "green";
                    if (daysRemaining < 0) {
                      statusColor = "red";
                    } else if (daysRemaining < 3) {
                      statusColor = "yellow";
                    }
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{tender.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{tender.reference || "-"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{tender.organization}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {formatDate(tender.lastDate)}
                            {tender.lastTime && <span className="text-xs ml-1">{tender.lastTime}</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${statusColor}-100 text-${statusColor}-800`}>
                            {daysRemaining < 0 
                              ? 'Expired' 
                              : daysRemaining === 0 
                                ? 'Today' 
                                : `${daysRemaining} days left`
                            }
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a 
                            href={tender.fileLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#3f6197] hover:text-[#2c4b79] flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                            </svg>
                            {tender.fileName || 'Download'}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={fetchTenders}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TendersControl;