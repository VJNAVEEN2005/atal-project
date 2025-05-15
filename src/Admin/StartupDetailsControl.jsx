import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { PlusCircle, Edit, Trash, RefreshCw, ArrowLeft, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../Api/api';

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
                imageLoaded ? 'opacity-100' : 'opacity-0'
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
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{startup.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{startup.description}</p>
        
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
            <h4 className="text-xs font-semibold text-gray-700 mb-1">Achievements</h4>
            <ul className="text-xs text-gray-600 ml-4">
              {startup.achievements.slice(0, 2).map((achievement, index) => (
                <li key={index} className="list-disc">{achievement}</li>
              ))}
              {startup.achievements.length > 2 && (
                <li className="text-blue-500 list-none mt-1">
                  +{startup.achievements.length - 2} more
                </li>
              )}
            </ul>
          </div>
        )}
        
        <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => onEdit(startup)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
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
    title: startup?.title || '',
    description: startup?.description || '',
    category: startup?.category || 'Ongoing',
    founded: startup?.founded || '',
    revenue: startup?.revenue || '',
    sector: startup?.sector || '',
    jobs: startup?.jobs || '',
    achievements: startup?.achievements || []
  });
  
  const [newAchievement, setNewAchievement] = useState('');
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
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.founded.trim()) newErrors.founded = 'Founded year is required';
    if (!formData.revenue.trim()) newErrors.revenue = 'Revenue stage is required';
    if (!formData.sector.trim()) newErrors.sector = 'Sector is required';
    if (!formData.jobs.trim()) newErrors.jobs = 'Number of jobs is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear the error for this field when the user makes changes
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
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
      if (file.type.startsWith('image/')) {
        processFile(file);
      }
    }
  }, []);

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()]
      }));
      setNewAchievement('');
    }
  };

  const handleRemoveAchievement = (index) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const data = new FormData();
    
    // Append all form fields
    Object.keys(formData).forEach(key => {
      if (key === 'achievements') {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });
    
    // Only append image if a new one was selected
    if (image) {
      data.append('image', image);
    }
    
    // Pass the FormData object and startup ID if editing
    onSubmit(data, startup?._id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {startup ? 'Edit Startup' : 'Add New Startup'}
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
                      ? 'border-dashed border-blue-500 bg-blue-50' 
                      : errors.image ? 'border-red-300' : 'border-gray-300'
                  } transition-all duration-200`}
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                      <Upload size={40} className="text-gray-400 mb-2" />
                      {isDragging ? (
                        <p className="text-sm text-blue-500">Drop image here</p>
                      ) : (
                        <p className="text-sm text-gray-500">Drag image here or click to upload</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">Max size: 5MB</p>
                    </div>
                  )}
                </div>
                <label className="absolute bottom-4 right-4 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.title ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Startup name"
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={`w-full px-3 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Brief description of the startup"
            ></textarea>
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Founded Year *</label>
            <input
              type="text"
              name="founded"
              value={formData.founded}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.founded ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., 2023"
            />
            {errors.founded && <p className="mt-1 text-xs text-red-500">{errors.founded}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Revenue Stage *</label>
            <input
              type="text"
              name="revenue"
              value={formData.revenue}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.revenue ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., Pre-revenue, $1M-$5M"
            />
            {errors.revenue && <p className="mt-1 text-xs text-red-500">{errors.revenue}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sector *</label>
            <input
              type="text"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.sector ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., FinTech, Healthcare"
            />
            {errors.sector && <p className="mt-1 text-xs text-red-500">{errors.sector}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jobs Created *</label>
            <input
              type="text"
              name="jobs"
              value={formData.jobs}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.jobs ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., 5-10, 50+"
            />
            {errors.jobs && <p className="mt-1 text-xs text-red-500">{errors.jobs}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Achievements</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add an achievement"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAchievement();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddAchievement}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            {formData.achievements.length > 0 && (
              <ul className="mt-2 space-y-1 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-2">
                {formData.achievements.map((achievement, index) => (
                  <li key={index} className="flex justify-between items-center text-sm text-gray-800 p-1 hover:bg-gray-50 rounded">
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
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {startup ? 'Update Startup' : 'Create Startup'}
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
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api.web}api/v1/startup`);
      setStartups(response.data.data.startups);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching startups:', error);
      showNotification('Failed to load startups. Please try again.', 'error');
      setLoading(false);
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
    if (window.confirm('Are you sure you want to delete this startup?')) {
      try {
        setIsSubmitting(true);
        await axios.delete(`${api.web}api/v1/startup/${id}`);
        fetchStartups();
        showNotification('Startup deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting startup:', error);
        showNotification('Failed to delete startup. Please try again.', 'error');
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
            'Content-Type': 'multipart/form-data'
          }
        });
        showNotification('Startup updated successfully!', 'success');
      } else {
        // Add new startup
        await axios.post(`${api.web}api/v1/startup`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        showNotification('Startup added successfully!', 'success');
      }
      setShowForm(false);
      fetchStartups();
    } catch (error) {
      console.error('Error saving startup:', error);
      showNotification(error.response?.data?.message || "Failed to save startup. Please try again.", 'error');
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
  const filteredStartups = startups.filter(startup => {
    const matchesCategory = activeCategory === 'All' || startup.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      startup.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.sector.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Get all available categories from startups
  const categories = ['All', ...Array.from(new Set(startups.map(startup => startup.category)))];

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Startup Portfolio</h1>
            <p className="text-blue-100">Manage your startup portfolio and showcase achievements</p>
          </div>
          <button
            onClick={handleAddStartup}
            className="px-6 py-3 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-colors flex items-center font-medium"
            disabled={isSubmitting}
          >
            <PlusCircle size={18} className="mr-2" />
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
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="w-full md:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search startups..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Startup listing */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredStartups.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <AlertCircle size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No startups found</h3>
            {searchTerm || activeCategory !== 'All' ? (
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            ) : (
              <p className="text-gray-500">Get started by adding your first startup</p>
            )}
            <button
              onClick={handleAddStartup}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <PlusCircle size={16} className="mr-2" />
              Add Startup
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map((startup) => (
              <StartupCard
                key={startup._id}
                startup={startup}
                onEdit={handleEditStartup}
                onDelete={handleDeleteStartup}
              />
            ))}
          </div>
        )}
        
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {filteredStartups.length} of {startups.length} startups
          </p>
          <button
            onClick={fetchStartups}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
            disabled={loading}
          >
            <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
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