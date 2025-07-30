import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import {
  PlusCircle,
  Edit,
  Trash,
  RefreshCw,
  ArrowLeft,
  Upload,
  CheckCircle,
  AlertCircle,
  Check,
  X,
  Download,
} from "lucide-react";
import api from "../Api/api";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { showNotification, updateNotification } from "@mantine/notifications";

const StartupCard = ({ startup, onEdit, onDelete }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100">
      <div className="relative h-48 bg-gray-100">
        {startup.image && !imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            )}
            <img
              src={`${api.web}api/v1/startup/${startup._id}/image`}
              alt={startup.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-lg">No Image</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
          {startup.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {startup.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {startup.description}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-xs">
            <span className="text-gray-500">Founded:</span>
            <span className="ml-1 font-medium">{startup.founded}</span>
          </div>
          <div className="text-xs">
            <span className="text-gray-500">Revenue:</span>
            <span className="ml-1 font-medium">{startup.revenue}</span>
          </div>
          <div className="text-xs">
            <span className="text-gray-500">Sector:</span>
            <span className="ml-1 font-medium">{startup.sector}</span>
          </div>
          <div className="text-xs">
            <span className="text-gray-500">Jobs:</span>
            <span className="ml-1 font-medium">{startup.jobs}</span>
          </div>
        </div>

        {startup.achievements && startup.achievements.length > 0 && (
          <div className="mb-3">
            <h4 className="text-xs font-semibold text-gray-700 mb-1">
              Achievements
            </h4>
            <ul className="text-xs text-gray-600 ml-4">
              {startup.achievements.slice(0, 2).map((achievement, index) => (
                <li key={index} className="list-disc">
                  {achievement}
                </li>
              ))}
              {startup.achievements.length > 2 && (
                <li className="text-[#3F6197] list-none mt-1">
                  +{startup.achievements.length - 2} more
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => onEdit(startup)}
            className="p-1 text-[#3F6197] hover:bg-blue-50 rounded-full transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(startup._id)}
            className="p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const StartupForm = ({ startup, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: startup?.title || "",
    description: startup?.description || "",
    category: startup?.category || "Ongoing",
    founded: startup?.founded || "",
    revenue: startup?.revenue || "",
    sector: startup?.sector || "",
    jobs: startup?.jobs || "",
    achievements: startup?.achievements || [],
  });

  const [newAchievement, setNewAchievement] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Set preview if startup has an image
    if (startup?._id) {
      setPreview(`${api.web}api/v1/startup/${startup._id}/image`);
    }
  }, [startup]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.founded.trim())
      newErrors.founded = "Founded year is required";
    if (!formData.revenue.trim())
      newErrors.revenue = "Revenue stage is required";
    if (!formData.sector.trim()) newErrors.sector = "Sector is required";
    if (!formData.jobs.trim()) newErrors.jobs = "Number of jobs is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field when the user makes changes
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        processFile(file);
      }
    }
  }, []);

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setFormData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()],
      }));
      setNewAchievement("");
    }
  };

  const handleRemoveAchievement = (index) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      if (key === "achievements") {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });

    // Only append image if a new one was selected
    if (image) {
      data.append("image", image);
    }

    // Pass the FormData object and startup ID if editing
    onSubmit(data, startup?._id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {startup ? "Edit Startup" : "Add New Startup"}
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="md:col-span-2">
            <div className="flex justify-center mb-4">
              <div
                className="relative w-full h-48"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div
                  className={`absolute inset-0 rounded-lg overflow-hidden border-2 ${
                    isDragging
                      ? "border-dashed border-[#3F6197] bg-blue-50"
                      : errors.image
                      ? "border-red-300"
                      : "border-gray-300"
                  } transition-all duration-200`}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                      <Upload size={40} className="text-gray-400 mb-2" />
                      {isDragging ? (
                        <p className="text-sm text-[#3F6197]">
                          Drop image here
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          Drag image here or click to upload
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        Max size: 5MB
                      </p>
                    </div>
                  )}
                </div>
                <label className="absolute bottom-4 right-4 bg-[#3F6197] p-2 rounded-full cursor-pointer hover:bg-[#3F6197] transition-colors">
                  <Upload size={16} className="text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.title ? "border-red-300" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#5478B0]`}
              placeholder="Startup name"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={`w-full px-3 py-2 border ${
                errors.description ? "border-red-300" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#5478B0]`}
              placeholder="Brief description of the startup"
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5478B0]"
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Founded Year *
            </label>
            <input
              type="text"
              name="founded"
              value={formData.founded}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.founded ? "border-red-300" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-[#5478B0]`}
              placeholder="e.g., 2023"
            />
            {errors.founded && (
              <p className="mt-1 text-xs text-red-500">{errors.founded}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Revenue Stage *
            </label>
            <input
              type="text"
              name="revenue"
              value={formData.revenue}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.revenue ? "border-red-300" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., Pre-revenue, $1M-$5M"
            />
            {errors.revenue && (
              <p className="mt-1 text-xs text-red-500">{errors.revenue}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sector *
            </label>
            <input
              type="text"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.sector ? "border-red-300" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., FinTech, Healthcare"
            />
            {errors.sector && (
              <p className="mt-1 text-xs text-red-500">{errors.sector}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jobs Created *
            </label>
            <input
              type="text"
              name="jobs"
              value={formData.jobs}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.jobs ? "border-red-300" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., 5-10, 50+"
            />
            {errors.jobs && (
              <p className="mt-1 text-xs text-red-500">{errors.jobs}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Achievements
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add an achievement"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddAchievement();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddAchievement}
                className="px-3 py-2 bg-[#3F6197] text-white rounded-md hover:bg-[#5478B0] transition-colors"
              >
                Add
              </button>
            </div>
            {formData.achievements.length > 0 && (
              <ul className="mt-2 space-y-1 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-2">
                {formData.achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm text-gray-800 p-1 hover:bg-gray-50 rounded"
                  >
                    <span>{achievement}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAchievement(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#3F6197] text-white rounded-md hover:bg-[#5478B0] transition-colors"
          >
            {startup ? "Update Startup" : "Create Startup"}
          </button>
        </div>
      </form>
    </div>
  );
};

const StartupDetailsControl = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentStartup, setCurrentStartup] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalStartups: 0,
    startupsPerPage: 12,
    hasNextPage: false,
    hasPreviousPage: false
  });
  
  // Search mode state
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  // Suggestions state
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  
  const navigate = useNavigate();

  const [showImportModal, setShowImportModal] = useState(false);
  const [importedData, setImportedData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (!isSearchMode) {
      if (activeCategory === "All") {
        fetchStartupsPaginated(1);
      } else {
        fetchStartupsByCategory(activeCategory, 1);
      }
    }
  }, [activeCategory, isSearchMode]);

  const fetchStartupsPaginated = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${api.web}api/v1/startup/paginated?page=${page}&limit=12`);
      
      if (response.data.status === 'success') {
        setStartups(response.data.data.startups);
        setPagination(response.data.pagination);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching startups:", error);
      showNotification({ title: "Error", message: "Failed to load startups. Please try again.", color: "red", icon: <X className="w-4 h-4" />, autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const fetchStartupsByCategory = async (category, page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`${api.web}api/v1/startup/category/${category}?page=${page}&limit=12`);
      
      if (response.data.status === 'success') {
        setStartups(response.data.data.startups);
        setPagination(response.data.pagination);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching startups by category:", error);
      if (error.response?.status === 404) {
        setStartups([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalStartups: 0,
          startupsPerPage: 12,
          hasNextPage: false,
          hasPreviousPage: false
        });
      } else {
        showNotification({ title: "Error", message: "Failed to load startups. Please try again.", color: "red", icon: <X className="w-4 h-4" />, autoClose: 3000 });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchQuery, page = 1) => {
    if (!searchQuery.trim()) {
      // If search is empty, exit search mode and return to category view
      setIsSearchMode(false);
      setSearchResults([]);
      setSearchTerm("");
      setCurrentPage(1);
      if (activeCategory === "All") {
        fetchStartupsPaginated(1);
      } else {
        fetchStartupsByCategory(activeCategory, 1);
      }
      return;
    }

    try {
      setIsSearchMode(true);
      setLoading(true);
      setCurrentPage(page);
      
      const response = await axios.get(`${api.web}api/v1/startup/search?search=${encodeURIComponent(searchQuery.trim())}&page=${page}&limit=12`);
      
      if (response.data.status === 'success') {
        setSearchResults(response.data.data.startups);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error searching startups:", error);
      if (error.response?.status === 404) {
        setSearchResults([]);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalStartups: 0,
          startupsPerPage: 12,
          hasNextPage: false,
          hasPreviousPage: false
        });
      } else {
        showNotification({ title: "Error", message: "Failed to search startups. Please try again.", color: "red", icon: <X className="w-4 h-4" />, autoClose: 3000 });
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    
    if (isSearchMode) {
      handleSearch(searchTerm, newPage);
    } else if (activeCategory === "All") {
      fetchStartupsPaginated(newPage);
    } else {
      fetchStartupsByCategory(activeCategory, newPage);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setIsSearchMode(false);
    setSearchResults([]);
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Use the old fetchStartups for form submissions to refresh data
  const fetchStartups = async () => {
    if (isSearchMode) {
      handleSearch(searchTerm, currentPage);
    } else if (activeCategory === "All") {
      fetchStartupsPaginated(currentPage);
    } else {
      fetchStartupsByCategory(activeCategory, currentPage);
    }
  };

  const handleAddStartup = () => {
    setCurrentStartup(null);
    setShowForm(true);
  };

  const handleEditStartup = (startup) => {
    setCurrentStartup(startup);
    setShowForm(true);
  };

  const handleDeleteStartup = async (id) => {
    if (window.confirm("Are you sure you want to delete this startup?")) {
      try {
        setIsSubmitting(true);
        await axios.delete(`${api.web}api/v1/startup/${id}`,{
           headers:{
            token : localStorage.getItem("token")
          }
        });
        fetchStartups();
        showNotification({ title: "Success", message: "Startup deleted successfully!", color: "green", icon: <Check className="w-4 h-4" />, autoClose: 3000 });
      } catch (error) {
        console.error("Error deleting startup:", error);
        showNotification({ title: "Error", message: "Failed to delete startup. Please try again.", color: "red", icon: <X className="w-4 h-4" />, autoClose: 3000 });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSubmitForm = async (formData, id) => {
    try {
      setIsSubmitting(true);

      if (id) {
        // Update existing startup
        await axios.patch(`${api.web}api/v1/startup/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        });
        showNotification({ title: "Success", message: "Startup updated successfully!", color: "green", icon: <Check className="w-4 h-4" />, autoClose: 3000 });
      } else {
        // Add new startup
        await axios.post(`${api.web}api/v1/startup`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        });
        showNotification({ title: "Success", message: "Startup added successfully!", color: "green", icon: <Check className="w-4 h-4" />, autoClose: 3000 });
      }
      setShowForm(false);
      fetchStartups();
    } catch (error) {
      console.error("Error saving startup:", error);
      showNotification({ title: "Error", message: error.response?.data?.message || "Failed to save startup. Please try again.", color: "red", icon: <X className="w-4 h-4" />, autoClose: 3000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter by category and search term
  const currentStartups = isSearchMode ? searchResults : startups;
  
  // Get all available categories from API (you might want to create a separate endpoint for this)
  const [availableCategories, setAvailableCategories] = useState([]);
  
  useEffect(() => {
    // Fetch available categories when component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${api.web}api/v1/startup`);
        const allStartups = response.data.data.startups;
        const categories = ["All", ...Array.from(new Set(allStartups.map((startup) => startup.category)))];
        setAvailableCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setAvailableCategories(["All", "Ongoing", "Graduated"]); // Fallback categories
      }
    };
    fetchCategories();
  }, []);

  // Generate suggestions based on search term
  useEffect(() => {
    if (searchTerm.length > 0) {
      const searchLower = searchTerm.toLowerCase();
      const newSuggestions = [];

      currentStartups.forEach((startup) => {
        // Check title
        if (startup.title?.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "title",
            value: startup.title,
            record: startup,
            label: `${startup.title} (Title)`
          });
        }

        // Check description
        if (startup.description?.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "description",
            value: startup.description.substring(0, 50) + "...",
            record: startup,
            label: `${startup.description.substring(0, 50)}... (Description)`
          });
        }

        // Check sector
        if (startup.sector?.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "sector",
            value: startup.sector,
            record: startup,
            label: `${startup.sector} (Sector)`
          });
        }

        // Check category
        if (startup.category?.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "category",
            value: startup.category,
            record: startup,
            label: `${startup.category} (Category)`
          });
        }

        // Check founded year
        if (startup.founded?.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "founded",
            value: startup.founded,
            record: startup,
            label: `${startup.founded} (Founded)`
          });
        }

        // Check revenue
        if (startup.revenue?.toLowerCase().includes(searchLower)) {
          newSuggestions.push({
            type: "revenue",
            value: startup.revenue,
            record: startup,
            label: `${startup.revenue} (Revenue)`
          });
        }

        // Check achievements
        if (startup.achievements && startup.achievements.length > 0) {
          startup.achievements.forEach((achievement) => {
            if (achievement.toLowerCase().includes(searchLower)) {
              newSuggestions.push({
                type: "achievement",
                value: achievement,
                record: startup,
                label: `${achievement} (Achievement)`
              });
            }
          });
        }
      });

      // Remove duplicates and limit to 8 suggestions
      const uniqueSuggestions = newSuggestions
        .filter((suggestion, index, self) =>
          index === self.findIndex((s) => s.value === suggestion.value && s.type === suggestion.type)
        )
        .slice(0, 8);

      setSuggestions(uniqueSuggestions);
      setShowSuggestions(uniqueSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedSuggestionIndex(-1);
  }, [searchTerm, currentStartups]);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch(searchTerm, 1);
        setShowSuggestions(false);
        return;
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else {
          handleSearch(searchTerm, 1);
          setShowSuggestions(false);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.value);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    handleSearch(suggestion.value, 1);
    searchInputRef.current?.focus();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Excel Import Handlers
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        // Map Excel columns to startup fields
        const mappedData = jsonData.map((row, index) => ({
          id: index,
          title: row["Title"] || row["title"] || "",
          description: row["Description"] || row["description"] || "",
          category: row["Category"] || row["category"] || "Ongoing",
          founded: row["Founded"] || row["founded"] || "",
          revenue: row["Revenue"] || row["revenue"] || "",
          sector: row["Sector"] || row["sector"] || "",
          jobs: row["Jobs"] || row["jobs"] || "",
          achievements: row["Achievements"] ? (Array.isArray(row["Achievements"]) ? row["Achievements"] : String(row["Achievements"]).split(",").map(a => a.trim()).filter(Boolean)) : [],
          hasErrors: false,
          errors: []
        }));
        // Validate data
        const validatedData = mappedData.map(record => {
          const errors = [];
          if (!record.title || record.title.trim() === "") errors.push("Title is required");
          if (!record.description || record.description.trim() === "") errors.push("Description is required");
          if (!record.founded || record.founded.trim() === "") errors.push("Founded year is required");
          if (!record.revenue || record.revenue.trim() === "") errors.push("Revenue is required");
          if (!record.sector || record.sector.trim() === "") errors.push("Sector is required");
          if (!record.jobs || record.jobs.trim() === "") errors.push("Jobs is required");
          return { ...record, hasErrors: errors.length > 0, errors };
        });
        setImportedData(validatedData);
        setSelectedRows(validatedData.filter(record => !record.hasErrors).map((_, index) => index));
        setShowImportModal(true);
        const errorCount = validatedData.filter(record => record.hasErrors).length;
        showNotification({
          title: "File Uploaded",
          message: `Parsed ${validatedData.length} records${errorCount > 0 ? `. ${errorCount} records have errors.` : ''}`,
          color: errorCount > 0 ? "orange" : "green",
          icon: <Check className="w-4 h-4" />, autoClose: 3000,
        });
      } catch (error) {
        showNotification({
          title: "Import Error",
          message: "Failed to parse Excel file. Please check the format.",
          color: "red",
          icon: <X className="w-4 h-4" />, autoClose: 3000,
        });
      }
    };
    reader.readAsBinaryString(file);
  };
  const handleRowSelection = (index) => {
    setSelectedRows(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };
  const handleSelectAll = () => {
    const validIndices = importedData.map((record, index) => ({ record, index })).filter(({ record }) => !record.hasErrors).map(({ index }) => index);
    if (selectedRows.length === validIndices.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(validIndices);
    }
  };
  const handleImportSelected = async () => {
    const selectedData = importedData.filter((_, index) => selectedRows.includes(index));
    if (selectedData.length === 0) {
      showNotification({ title: "No Selection", message: "Select at least one record to import", color: "orange", icon: <X className="w-4 h-4" />, autoClose: 3000 });
      return;
    }
    showNotification({ id: "bulk-import", title: "Importing Startups", message: `Importing ${selectedData.length} records...`, color: "blue", loading: true, autoClose: false });
    try {
      const promises = selectedData.map(record => {
        const cleanRecord = { ...record };
        delete cleanRecord.hasErrors; delete cleanRecord.errors; delete cleanRecord.id;
        return axios.post(`${api.web}api/v1/startup`, cleanRecord, { headers: { "Content-Type": "application/json", token: localStorage.getItem("token") } });
      });
      const results = await Promise.allSettled(promises);
      const successful = results.filter(r => r.status === 'fulfilled').length;
      const failed = results.filter(r => r.status === 'rejected').length;
      updateNotification({ id: "bulk-import", title: "Import Complete", message: `Imported ${successful} records.${failed > 0 ? ` ${failed} failed.` : ''}`, color: failed > 0 ? "orange" : "green", icon: <Check className="w-4 h-4" />, loading: false, autoClose: 3000 });
      setShowImportModal(false); setImportedData([]); setSelectedRows([]); fetchStartups();
    } catch (error) {
      updateNotification({ id: "bulk-import", title: "Import Failed", message: error.message || 'Please try again.', color: "red", icon: <X className="w-4 h-4" />, loading: false, autoClose: 3000 });
    }
  };
  const downloadTemplate = () => {
    const templateData = [{ Title: "Sample Startup", Description: "Description here", Category: "Ongoing", Founded: "2023", Revenue: "$1M-$5M", Sector: "FinTech", Jobs: "5-10", Achievements: "Award1, Award2" }];
    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Startup Template");
    const colWidths = Object.keys(templateData[0]).map(key => ({ wch: Math.max(key.length, String(templateData[0][key]).length) + 2 }));
    worksheet['!cols'] = colWidths;
    XLSX.writeFile(workbook, "Startup_Import_Template.xlsx");
    showNotification({ title: "Template Downloaded", message: "Excel template downloaded", color: "green", icon: <Download className="w-4 h-4" />, autoClose: 3000 });
  };

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3F6197] to-[#5478B0] rounded-xl shadow-xl p-6 mb-8 relative">
        {/* Back Button */}
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
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
              <h1 className="text-3xl font-bold text-white mb-2">
                Startup Portfolio
              </h1>
              <p className="text-blue-100">
                Manage your startup portfolio and showcase achievements
              </p>
            </div>
          </div>
          <div className="flex gap-3">
  <button onClick={downloadTemplate} className="flex items-center gap-2 px-4 py-2 bg-blue-600/80 text-white border border-blue-400/50 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:scale-105 backdrop-blur-sm">
    <Upload size={18} />
    <span className="font-medium">Template</span>
  </button>
  <label className="flex items-center gap-2 px-4 py-2 bg-green-600/80 text-white border border-green-400/50 rounded-lg transition-all duration-300 hover:bg-green-600 hover:shadow-lg hover:scale-105 backdrop-blur-sm cursor-pointer">
    <Upload size={18} />
    <span className="font-medium">Import Excel</span>
    <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} className="hidden" />
  </label>
</div>
          <button
            onClick={handleAddStartup}
            className="px-6 py-3 bg-white text-[#5478B0] rounded-lg hover:bg-blue-50 transition-colors flex items-center font-medium"
            disabled={isSubmitting}
          >
            <PlusCircle size={18} className="mr-2" color="#5478B0" />
            Add Startup
          </button>
        </div>
      </div>

      {/* Search Input Bar - Improved Design */}
      <div className="w-full md:w-96 flex gap-2 relative mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          </span>
          <input
            type="text"
            placeholder="Search startups..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onKeyDown={handleKeyDown}
            ref={searchInputRef}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#5478B0] focus:border-[#5478B0] transition-all duration-200 placeholder-gray-400 text-gray-800"
            style={{ boxShadow: '0 2px 8px 0 rgba(60,90,130,0.06)' }}
          />
          {showSuggestions && (
            <div
              ref={suggestionsRef}
              className="absolute left-0 right-0 mt-1 z-20 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto animate-fade-in"
              style={{ boxShadow: '0 8px 24px 0 rgba(60,90,130,0.10)' }}
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 cursor-pointer flex items-center gap-2 transition-colors duration-100 text-sm ${
                    index === selectedSuggestionIndex ? "bg-[#eaf1fb] text-[#3F6197]" : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#5478B0] mr-2"></span>
                  {suggestion.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        {isSearchMode ? (
          <>
            Showing {((pagination.currentPage - 1) * pagination.startupsPerPage) + 1} to {Math.min(pagination.currentPage * pagination.startupsPerPage, pagination.totalStartups)} of {pagination.totalStartups} search results
          </>
        ) : (
          <>
            Showing {((pagination.currentPage - 1) * pagination.startupsPerPage) + 1} to {Math.min(pagination.currentPage * pagination.startupsPerPage, pagination.totalStartups)} of {pagination.totalStartups} startups
            {activeCategory !== "All" && <span className="text-[#3F6197]"> in {activeCategory}</span>}
          </>
        )}
      </div>

      {/* Startup listing */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3F6197]"></div>
        </div>
      ) : currentStartups.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No startups found
          </h3>
          {isSearchMode ? (
            <p className="text-gray-500">
              No startups found for "{searchTerm}". Try different search terms.
            </p>
          ) : activeCategory !== "All" ? (
            <p className="text-gray-500">
              No startups found in {activeCategory} category
            </p>
          ) : (
            <p className="text-gray-500">
              Get started by adding your first startup
            </p>
          )}
          {!isSearchMode && (
            <button
              onClick={handleAddStartup}
              className="mt-4 px-4 py-2 bg-[#3F6197] text-white rounded-lg hover:bg-[#5478B0] transition-colors inline-flex items-center"
            >
              <PlusCircle size={16} className="mr-2" />
              Add Startup
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentStartups.map((startup) => (
              <StartupCard
                key={startup._id}
                startup={startup}
                onEdit={handleEditStartup}
                onDelete={handleDeleteStartup}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-between">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPreviousPage || loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  pagination.hasPreviousPage && !loading
                    ? 'bg-white text-[#3F6197] border border-[#3F6197] hover:bg-[#3F6197] hover:text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              {/* Page info */}
              <span className="text-gray-600">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              {/* Next button */}
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage || loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  pagination.hasNextPage && !loading
                    ? 'bg-white text-[#3F6197] border border-[#3F6197] hover:bg-[#3F6197] hover:text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}

      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Total: {pagination.totalStartups} startups
        </p>
        <button
          onClick={fetchStartups}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
          disabled={loading}
        >
          <RefreshCw
            size={16}
            className={`mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-lg flex flex-col overflow-y-auto">
            <div className="overflow-y-auto p-0" style={{ maxHeight: '90vh' }}>
              <StartupForm
                startup={currentStartup}
                onSubmit={handleSubmitForm}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {showImportModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
      <div className="bg-gradient-to-r from-[#3F6197] to-[#5478B0] text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Import Startups</h2>
        <button onClick={() => setShowImportModal(false)} className="text-white hover:text-gray-200 text-2xl">&times;</button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handleSelectAll} className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            <CheckCircle size={16} />
            {(() => { const validIndices = importedData.map((record, index) => ({ record, index })).filter(({ record }) => !record.hasErrors).map(({ index }) => index); return selectedRows.length === validIndices.length && validIndices.length > 0 ? 'Deselect All Valid' : 'Select All Valid'; })()}
          </button>
          <div className="flex gap-2">
            <button onClick={() => setShowImportModal(false)} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Cancel</button>
            <button onClick={handleImportSelected} disabled={selectedRows.length === 0} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed">Import Selected ({selectedRows.length})</button>
          </div>
        </div>
        <div className="overflow-auto max-h-[60vh] border rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="p-2 text-left border-b"><input type="checkbox" checked={(() => { const validIndices = importedData.map((record, index) => ({ record, index })).filter(({ record }) => !record.hasErrors).map(({ index }) => index); return selectedRows.length === validIndices.length && validIndices.length > 0; })()} onChange={handleSelectAll} className="rounded" /></th>
                <th className="p-2 text-left border-b">Title</th>
                <th className="p-2 text-left border-b">Description</th>
                <th className="p-2 text-left border-b">Category</th>
                <th className="p-2 text-left border-b">Founded</th>
                <th className="p-2 text-left border-b">Revenue</th>
                <th className="p-2 text-left border-b">Sector</th>
                <th className="p-2 text-left border-b">Jobs</th>
                <th className="p-2 text-left border-b">Achievements</th>
                <th className="p-2 text-left border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {importedData.map((record, index) => (
                <tr key={index} className={`border-b hover:bg-gray-50 ${selectedRows.includes(index) ? 'bg-blue-50' : ''} ${record.hasErrors ? 'bg-red-50' : ''}`}>
                  <td className="p-2"><input type="checkbox" checked={selectedRows.includes(index)} onChange={() => handleRowSelection(index)} disabled={record.hasErrors} className="rounded" /></td>
                  <td className="p-2 font-medium">{record.title || '-'}</td>
                  <td className="p-2">{record.description || '-'}</td>
                  <td className="p-2">{record.category || '-'}</td>
                  <td className="p-2">{record.founded || '-'}</td>
                  <td className="p-2">{record.revenue || '-'}</td>
                  <td className="p-2">{record.sector || '-'}</td>
                  <td className="p-2">{record.jobs || '-'}</td>
                  <td className="p-2">{Array.isArray(record.achievements) ? record.achievements.join(", ") : '-'}</td>
                  <td className="p-2">{record.hasErrors ? (<span className="text-red-600 text-xs" title={record.errors.join(', ')}>{record.errors.length} error{record.errors.length > 1 ? 's' : ''}</span>) : (<span className="text-green-600 text-xs">Valid</span>)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {importedData.length === 0 && (<div className="text-center py-8 text-gray-500">No data to display</div>)}
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Import Summary:</h4>
            <div className="flex gap-4 text-xs">
              <span className="text-green-600">✓ Valid: {importedData.filter(r => !r.hasErrors).length}</span>
              <span className="text-red-600">✗ Invalid: {importedData.filter(r => r.hasErrors).length}</span>
              <span className="text-blue-600">📋 Selected: {selectedRows.length}</span>
            </div>
          </div>
          <h4 className="font-medium mb-2">Excel Column Mapping:</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            <div><strong>Title:</strong> "Title" or "title"</div>
            <div><strong>Description:</strong> "Description" or "description"</div>
            <div><strong>Category:</strong> "Category" or "category"</div>
            <div><strong>Founded:</strong> "Founded" or "founded"</div>
            <div><strong>Revenue:</strong> "Revenue" or "revenue"</div>
            <div><strong>Sector:</strong> "Sector" or "sector"</div>
            <div><strong>Jobs:</strong> "Jobs" or "jobs"</div>
            <div><strong>Achievements:</strong> "Achievements" (comma separated)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default StartupDetailsControl;
