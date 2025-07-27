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
} from "lucide-react";
import api from "../Api/api";
import { useNavigate } from "react-router-dom";

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
  const [notification, setNotification] = useState(null);
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
      showNotification("Failed to load startups. Please try again.", "error");
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
        showNotification("Failed to load startups. Please try again.", "error");
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
        showNotification("Failed to search startups. Please try again.", "error");
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
        await axios.delete(`${api.web}api/v1/startup/${id}`);
        fetchStartups();
        showNotification("Startup deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting startup:", error);
        showNotification(
          "Failed to delete startup. Please try again.",
          "error"
        );
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
          },
        });
        showNotification("Startup updated successfully!", "success");
      } else {
        // Add new startup
        await axios.post(`${api.web}api/v1/startup`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        showNotification("Startup added successfully!", "success");
      }
      setShowForm(false);
      fetchStartups();
    } catch (error) {
      console.error("Error saving startup:", error);
      showNotification(
        error.response?.data?.message ||
          "Failed to save startup. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotification(null);
    }, 5000);
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

      {notification && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center justify-between ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <div className="flex items-center">
            {notification.type === "success" ? (
              <CheckCircle size={20} className="mr-2" />
            ) : (
              <AlertCircle size={20} className="mr-2" />
            )}
            {notification.message}
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        {/* Filters and search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeCategory === category
                    ? "bg-[#3F6197] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="w-full md:w-80 flex gap-2 relative">
            <div className="flex-1 relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onKeyDown={handleKeyDown}
                placeholder={isSearchMode ? "Search across all startups..." : "Search startups..."}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5478B0]"
                disabled={loading}
              />
              
              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto mt-2"
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={`${suggestion.type}-${suggestion.value}-${index}`}
                      className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors ${
                        index === selectedSuggestionIndex
                          ? "bg-blue-50 border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {suggestion.type === "title" && (
                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          )}
                          {suggestion.type === "description" && (
                            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                              </svg>
                            </div>
                          )}
                          {suggestion.type === "sector" && (
                            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                          )}
                          {suggestion.type === "category" && (
                            <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                            </div>
                          )}
                          {(suggestion.type === "founded" || suggestion.type === "revenue") && (
                            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </div>
                          )}
                          {suggestion.type === "achievement" && (
                            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {suggestion.value}
                            </div>
                            <div className="text-xs text-gray-500">
                              {suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)} • {suggestion.record.title}
                            </div>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          suggestion.record.category === "Ongoing"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {suggestion.record.category}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => handleSearch(searchTerm, 1)}
              disabled={loading}
              className="px-4 py-2 bg-[#3F6197] text-white rounded-lg hover:bg-[#5478B0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Search
            </button>
          </div>
        </div>

        {/* Search Mode Indicator */}
        {isSearchMode && (
          <div className="mb-4 flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2 border border-blue-100">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="text-sm font-medium text-blue-700">
                Global search active • Results for "{searchTerm}"
              </span>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                handleSearch('');
              }}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium underline"
            >
              Clear search
            </button>
          </div>
        )}

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
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="max-w-2xl w-full">
            <StartupForm
              startup={currentStartup}
              onSubmit={handleSubmitForm}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupDetailsControl;
