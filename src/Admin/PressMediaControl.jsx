import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../Api/api";
import { useNavigate } from "react-router-dom";

const PressMediaControl = () => {
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    source: "",
    sourceLink: "",
    category: "News",
    date: new Date().toISOString().split("T")[0],
  });
  const navigate = useNavigate();
  // Image state
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // List of media coverage
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- Search/filter state ---
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = React.useRef(null);

  // Compute filtered media list
  const filteredMediaList = React.useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return mediaList.filter(item =>
      searchTerm === "" ||
      (item.title && item.title.toLowerCase().includes(searchLower)) ||
      (item.summary && item.summary.toLowerCase().includes(searchLower)) ||
      (item.source && item.source.toLowerCase().includes(searchLower)) ||
      (item.category && item.category.toLowerCase().includes(searchLower)) ||
      (item.date && new Date(item.date).toLocaleDateString().toLowerCase().includes(searchLower))
    );
  }, [mediaList, searchTerm]);

  // Suggestions logic
  React.useEffect(() => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }
    const searchLower = searchTerm.toLowerCase();
    const newSuggestions = [];
    mediaList.forEach(item => {
      if (item.title && item.title.toLowerCase().includes(searchLower)) {
        newSuggestions.push({ type: "Title", value: item.title, label: item.title });
      }
      if (item.summary && item.summary.toLowerCase().includes(searchLower)) {
        newSuggestions.push({ type: "Summary", value: item.summary, label: item.summary });
      }
      if (item.source && item.source.toLowerCase().includes(searchLower)) {
        newSuggestions.push({ type: "Source", value: item.source, label: item.source });
      }
      if (item.category && item.category.toLowerCase().includes(searchLower)) {
        newSuggestions.push({ type: "Category", value: item.category, label: item.category });
      }
      if (item.date && new Date(item.date).toLocaleDateString().toLowerCase().includes(searchLower)) {
        newSuggestions.push({ type: "Date", value: item.date, label: new Date(item.date).toLocaleDateString() });
      }
    });
    setSuggestions(newSuggestions.slice(0, 10));
  }, [searchTerm, mediaList]);

  // Suggestion keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev < suggestions.length - 1 ? prev + 1 : prev);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
      default:
        break;
    }
  };

  // Suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.value);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Categories options
  const categories = [
    "News",
    "Programs",
    "Events",
    "Partnerships",
    "Success Stories",
    "Impact",
  ];

  // Fetch all media coverage on component mount
  useEffect(() => {
    fetchMediaCoverage();
  }, []);

  // Fetch media coverage from the API
  const fetchMediaCoverage = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api.web}api/v1/media/`);
      setMediaList(response.data.mediaItems);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch media coverage");
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset form and states
  const resetForm = () => {
    setFormData({
      title: "",
      summary: "",
      content: "",
      source: "",
      sourceLink: "",
      category: "News",
      date: new Date().toISOString().split("T")[0],
    });
    setImage(null);
    setImagePreview("");
    setEditMode(false);
    setCurrentId(null);
    setError("");
    setSuccess("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create FormData object for multipart/form-data
    const mediaData = new FormData();

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      mediaData.append(key, formData[key]);
    });

    // Append image if exists
    if (image) {
      mediaData.append("image", image);
    }

    try {
      if (editMode) {
        // Update existing media coverage
        await axios.put(`${api.web}api/v1/media/${currentId}`, mediaData, {
          headers: {
            token: localStorage.getItem("token"), // Include token for authentication
          },
        });
        setSuccess("Media coverage updated successfully!");
      } else {
        // Create new media coverage
        await axios.post(`${api.web}api/v1/media`, mediaData, {
          headers: {
            token: localStorage.getItem("token"), // Include token for authentication
          },
        });
        setSuccess("Media coverage added successfully!");
      }

      // Refresh the media list
      fetchMediaCoverage();
      // Reset form after successful submission
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit media item
  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      summary: item.summary,
      content: item.content,
      source: item.source,
      sourceLink: item.sourceLink,
      category: item.category,
      date: new Date(item.date).toISOString().split("T")[0],
    });

    if (item.image && item.image.data) {
      setImagePreview(
        `data:${item.image.contentType};base64,${item.image.data}`
      );
    }

    setEditMode(true);
    setCurrentId(item._id);

    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete media item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media coverage?"))
      return;

    setLoading(true);
    try {
      await axios.delete(`${api.web}api/v1/media/${id}`, {
        headers: {
          token: localStorage.getItem("token"), // Include token for authentication
        },
      });
      setSuccess("Media coverage deleted successfully!");
      fetchMediaCoverage();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete media coverage"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      {/* Header */}

      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <div className=" flex items-center space-x-4">
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
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Press & Media Control Panel
            </h1>
            <p className="text-blue-100 text-lg">
              Manage media coverage, news articles, and press mentions
            </p>
          </div>
        </div>
      </div>

      {/* Form for adding/editing media coverage */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {editMode ? "Edit Media Coverage" : "Add New Media Coverage"}
        </h2>

        {/* Success and Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title*
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none"
              />
            </div>

            {/* Summary */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Summary*
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none"
              ></textarea>
            </div>

            {/* Content */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content*
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none"
              ></textarea>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source*
              </label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                required
                placeholder="e.g. The Economic Times"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none"
              />
            </div>

            {/* Source Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source Link
              </label>
              <input
                type="url"
                name="sourceLink"
                value={formData.sourceLink}
                onChange={handleInputChange}
                placeholder="https://example.com/article"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category*
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date*
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none"
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none"
                />
                {imagePreview && (
                  <div className="relative w-24 h-24 border border-gray-300 rounded-md overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setImagePreview("");
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-md"
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
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {editMode ? "Cancel" : "Clear"}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#3f6197] text-white rounded-lg hover:bg-[#2c4b79] focus:outline-none focus:ring-2 focus:ring-[#3f6197] disabled:opacity-50"
            >
              {loading ? "Processing..." : editMode ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* Media Coverage List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Media Coverage List
        </h2>

        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {!loading && mediaList.length === 0 && (
          <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-600">No media coverage added yet.</p>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
  <input
    type="text"
    value={searchTerm}
    ref={searchInputRef}
    onChange={e => {
      setSearchTerm(e.target.value);
      setShowSuggestions(true);
    }}
    onKeyDown={handleKeyDown}
    onFocus={() => searchTerm && suggestions.length > 0 && setShowSuggestions(true)}
    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
    className="block w-full pl-10 pr-3 py-2 border border-[#3f6197]/30 rounded-md leading-5 bg-white placeholder-[#3f6197]/60 focus:outline-none focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] sm:text-sm"
    placeholder="Search by title, summary, source, category, or date..."
  />
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <svg className="h-5 w-5 text-[#3f6197]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>
  </div>
  {showSuggestions && suggestions.length > 0 && (
    <div className="absolute z-10 w-full mt-1 bg-white border border-[#3f6197]/20 rounded-md shadow-lg max-h-64 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <div
          key={`${suggestion.type}-${suggestion.value}`}
          className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#3f6197]/10 ${selectedSuggestionIndex === index ? 'bg-[#3f6197]/10' : ''}`}
          onMouseDown={() => handleSuggestionClick(suggestion)}
        >
          <div className="font-medium">{suggestion.label}</div>
          <div className="text-xs text-[#3f6197]">{suggestion.type}</div>
        </div>
      ))}
    </div>
  )}
</div>
        </div>
        {/* Filtered Media Table */}
        {!loading && filteredMediaList.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-500">
                    Image
                  </th>
                  <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-500">
                    Title
                  </th>
                  <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-500">
                    Source
                  </th>
                  <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-500">
                    Category
                  </th>
                  <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="py-3 px-4 border-b text-left text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMediaList.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b">
                      {item.image && item.image.data ? (
                        <div className="w-14 h-14 relative rounded overflow-hidden">
                          <img
                            src={`data:${item.image.contentType};base64,${item.image.data}`}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 bg-gray-200 flex items-center justify-center rounded">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-400"
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
                    </td>
                    <td className="py-3 px-4 border-b">
                      <div className="font-medium">{item.title}</div>
                    </td>
                    <td className="py-3 px-4 border-b">{item.source}</td>
                    <td className="py-3 px-4 border-b">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1.5 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 focus:outline-none"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-1.5 bg-red-50 text-red-700 rounded hover:bg-red-100 focus:outline-none"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
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

export default PressMediaControl;
