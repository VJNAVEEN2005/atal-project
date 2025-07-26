import React, { useState, useEffect, useCallback } from "react";
import {
  Upload,
  Download,
  Trash2,
  Check,
  X,
  Pencil,
  Calendar,
  Plus,
} from "lucide-react";
import axios from "axios";
import api from "../Api/api";
import { useNavigate } from "react-router-dom";

const NewsLetterControl = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [currentNewsletter, setCurrentNewsletter] = useState({
    title: "",
    year: new Date().getFullYear().toString(),
    pdfFile: null,
    coverImage: null,
  });
  const [editId, setEditId] = useState(null);

  // Drag and drop states
  const [pdfDragActive, setPdfDragActive] = useState(false);
  const [imageDragActive, setImageDragActive] = useState(false);

  const themeColor = "#3f6197";

  // Fetch newsletters on component mount
  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${api.web}api/v1/newsletter`);
      setNewsletters(response.data.newsletters);
    } catch (err) {
      setError(err.response?.data?.message || "Error connecting to server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentNewsletter({
      title: "",
      year: new Date().getFullYear().toString(),
      pdfFile: null,
      coverImage: null,
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentNewsletter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setCurrentNewsletter((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  // PDF drag handlers
  const handlePdfDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setPdfDragActive(true);
    } else if (e.type === "dragleave") {
      setPdfDragActive(false);
    }
  }, []);

  const handlePdfDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setPdfDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setCurrentNewsletter((prev) => ({ ...prev, pdfFile: file }));
      } else {
        showMessage("Please upload a valid PDF file", true);
      }
    }
  }, []);

  // Image drag handlers
  const handleImageDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setImageDragActive(true);
    } else if (e.type === "dragleave") {
      setImageDragActive(false);
    }
  }, []);

  const handleImageDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setCurrentNewsletter((prev) => ({ ...prev, coverImage: file }));
      } else {
        showMessage("Please upload a valid image file", true);
      }
    }
  }, []);

  const showMessage = (message, isError = false) => {
    if (isError) {
      setError(message);
      setSuccessMessage("");
    } else {
      setSuccessMessage(message);
      setError("");
    }

    // Clear message after 3 seconds
    setTimeout(() => {
      if (isError) {
        setError("");
      } else {
        setSuccessMessage("");
      }
    }, 3000);
  };

  const handleEditNewsletter = (newsletter) => {
    setCurrentNewsletter({
      title: newsletter.title,
      year: newsletter.year,
      pdfFile: null, // Can't pre-fill files due to security restrictions
      coverImage: null,
    });
    setIsEditing(true);
    setEditId(newsletter._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!currentNewsletter.title || !currentNewsletter.year) {
      showMessage("Title and year are required", true);
      setLoading(false);
      return;
    }

    if (
      !isEditing &&
      (!currentNewsletter.pdfFile || !currentNewsletter.coverImage)
    ) {
      showMessage(
        "PDF file and cover image are required for new newsletters",
        true
      );
      setLoading(false);
      return;
    }

    // Create form data for file upload
    const formData = new FormData();
    formData.append("title", currentNewsletter.title);
    formData.append("year", currentNewsletter.year);

    if (currentNewsletter.pdfFile) {
      formData.append("pdfFile", currentNewsletter.pdfFile);
    }

    if (currentNewsletter.coverImage) {
      formData.append("coverImage", currentNewsletter.coverImage);
    }

    try {
      let response;

      if (isEditing) {
        response = await axios.put(
          `${api.web}api/v1/newsletter/${editId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(`${api.web}api/v1/newsletter`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      showMessage(
        isEditing
          ? "Newsletter updated successfully"
          : "Newsletter created successfully"
      );
      fetchNewsletters();
      resetForm();
    } catch (err) {
      showMessage(
        err.response?.data?.message || "Error processing request",
        true
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNewsletter = async (id) => {
    if (!window.confirm("Are you sure you want to delete this newsletter?")) {
      return;
    }

    setLoading(true);

    try {
      await axios.delete(`${api.web}api/v1/newsletter/${id}`);
      showMessage("Newsletter deleted successfully");
      fetchNewsletters();
    } catch (err) {
      showMessage(
        err.response?.data?.message || "Delete operation failed",
        true
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate("/admin")}
            className=" left-6 top-6 flex items-center gap-2 px-3 py-2 text-white bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30 z-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Newsletter Management
              </h1>
              <p className="text-blue-100">
                Organize and publish your newsletters
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 rounded-lg flex items-center bg-red-100 text-red-800">
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

        {successMessage && (
          <div className="mb-6 p-4 rounded-lg flex items-center bg-green-100 text-green-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {successMessage}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#3f6197]">
            {isEditing ? "Edit Newsletter" : "Add New Newsletter"}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Newsletter Title
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="title"
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                  placeholder="November 2024"
                  value={currentNewsletter.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="year"
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                  placeholder="2024"
                  value={currentNewsletter.year}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* PDF File Drop Zone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PDF File{" "}
                {isEditing && (
                  <span className="text-gray-500 text-xs">
                    (Leave empty to keep current)
                  </span>
                )}
              </label>
              <div
                className={`flex items-center justify-center w-full`}
                onDragEnter={handlePdfDrag}
              >
                <label
                  className={`w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-md tracking-wide cursor-pointer hover:bg-gray-50 transition-all duration-200
                    ${
                      pdfDragActive
                        ? "border-2 border-[#3f6197] bg-blue-50"
                        : "border border-dashed border-gray-300 shadow-md"
                    }
                  `}
                  onDragEnter={handlePdfDrag}
                  onDragOver={handlePdfDrag}
                  onDragLeave={handlePdfDrag}
                  onDrop={handlePdfDrop}
                >
                  <Upload
                    className={
                      pdfDragActive ? "text-[#3f6197]" : "text-gray-500"
                    }
                    size={24}
                  />

                  {currentNewsletter.pdfFile ? (
                    <div className="mt-2 text-sm flex flex-col items-center">
                      <span className="text-green-600 font-medium">
                        File selected:
                      </span>
                      <span className="text-gray-700">
                        {currentNewsletter.pdfFile.name}
                      </span>
                      <span className="text-gray-500 text-xs">
                        (
                        {(currentNewsletter.pdfFile.size / 1024 / 1024).toFixed(
                          2
                        )}{" "}
                        MB)
                      </span>
                    </div>
                  ) : (
                    <div className="mt-2 text-sm text-center">
                      <span className="text-gray-500">
                        Drag & drop PDF file here, or click to select
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        Maximum file size: 10MB
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    name="pdfFile"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            {/* Cover Image Drop Zone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image{" "}
                {isEditing && (
                  <span className="text-gray-500 text-xs">
                    (Leave empty to keep current)
                  </span>
                )}
              </label>
              <div
                className={`flex items-center justify-center w-full`}
                onDragEnter={handleImageDrag}
              >
                <label
                  className={`w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-md tracking-wide cursor-pointer hover:bg-gray-50 transition-all duration-200
                    ${
                      imageDragActive
                        ? "border-2 border-[#3f6197] bg-blue-50"
                        : "border border-dashed border-gray-300 shadow-md"
                    }
                  `}
                  onDragEnter={handleImageDrag}
                  onDragOver={handleImageDrag}
                  onDragLeave={handleImageDrag}
                  onDrop={handleImageDrop}
                >
                  <Upload
                    className={
                      imageDragActive ? "text-[#3f6197]" : "text-gray-500"
                    }
                    size={24}
                  />

                  {currentNewsletter.coverImage ? (
                    <div className="mt-2 flex flex-col items-center">
                      <div className="h-16 w-12 rounded overflow-hidden mb-1">
                        <img
                          src={URL.createObjectURL(
                            currentNewsletter.coverImage
                          )}
                          alt="Cover preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-700">
                        {currentNewsletter.coverImage.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({(currentNewsletter.coverImage.size / 1024).toFixed(0)}{" "}
                        KB)
                      </span>
                    </div>
                  ) : (
                    <div className="mt-2 text-sm text-center">
                      <span className="text-gray-500">
                        Drag & drop image here, or click to select
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        JPG, PNG or GIF (Max. 5MB)
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="px-4 py-2 bg-[#3f6197] text-white rounded-md hover:bg-[#2c4b79] transition-colors flex items-center"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  {isEditing ? (
                    <Check size={18} className="mr-1" />
                  ) : (
                    <Plus size={18} className="mr-1" />
                  )}
                  {isEditing ? "Update Newsletter" : "Add Newsletter"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Newsletters List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-[#3f6197]">
            All Newsletters
          </h2>
          <button
            onClick={fetchNewsletters}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Refresh
          </button>
        </div>

        {loading && newsletters.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f6197]"></div>
          </div>
        ) : newsletters.length === 0 ? (
          <div className="bg-blue-50 rounded-lg p-8 text-center m-4">
            <Calendar size={48} className="mx-auto text-blue-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No newsletters available
            </h3>
            <p className="text-gray-500">
              Add your first newsletter to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cover
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {newsletters.map((newsletter) => (
                  <tr key={newsletter._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {newsletter.coverImage ? (
                        <div className="h-16 w-12 rounded overflow-hidden">
                          <img
                            src={`data:${newsletter.coverImage.contentType};base64,${newsletter.coverImage.data}`}
                            alt={newsletter.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-16 w-12 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">
                            No image
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {newsletter.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {newsletter.year}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <a
                          href={`data:${newsletter.pdfFile.contentType};base64,${newsletter.pdfFile.data}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          <Download size={16} className="text-blue-600" />
                        </a>
                        <button
                          onClick={() => handleEditNewsletter(newsletter)}
                          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          <Pencil size={16} className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteNewsletter(newsletter._id)}
                          className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsLetterControl;
