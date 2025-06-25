import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Linkedin, Mail, User, Edit, Trash, Upload, Building, ExternalLink } from 'lucide-react';
import axios from 'axios';
import api from '../Api/api';

// API Configuration
const API_BASE_URL = `${api.web}api/v1`;

const Api = {
  // Get all partners
  getPartners: (type) => {
    const params = type ? { type } : {};
    return axios.get(`${API_BASE_URL}/partners`, { params });
  },
  
  // Get single partner
  getPartner: (id) => {
    return axios.get(`${API_BASE_URL}/partners/${id}`);
  },
  
  // Create partner
  createPartner: (formData) => {
    return axios.post(`${API_BASE_URL}/partners`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Update partner
  updatePartner: (id, formData) => {
    return axios.put(`${API_BASE_URL}/partners/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // Delete partner
  deletePartner: (id) => {
    return axios.delete(`${API_BASE_URL}/partners/${id}`);
  },
  
  // Update partner order
  updatePartnerOrder: (partners) => {
    return axios.put(`${API_BASE_URL}/partners/order/update`, { partners });
  },
  
  // Get partner image URLs
  getLogoUrl: (id) => `${API_BASE_URL}/partners/logo/${id}`,
  getPhotoUrl: (id) => `${API_BASE_URL}/partners/photo/${id}`,
};

const PartnerCard = ({ partner, index, onEdit, onDelete, isCompany }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = isCompany 
    ? Api.getLogoUrl(partner._id)
    : Api.getPhotoUrl(partner._id);

  return (
    <Draggable draggableId={partner._id} index={index}>
      {(provided) => (
        <div
          className="group flex flex-col items-center bg-white p-4 rounded-lg shadow-md my-4 hover:shadow-lg transition-shadow duration-300"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isCompany ? (
            // Company Logo Layout
            <>
              <div className="relative w-40 h-24 mb-4">
                <div className="absolute inset-0 rounded-lg overflow-hidden border-2 border-gray-200 bg-white flex items-center justify-center">
                  {partner.logo && !imageError ? (
                    <>
                      {!imageLoaded && (
                        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
                      )}
                      <img
                        src={imageUrl}
                        alt={partner.name}
                        className={`max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105 ${
                          imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <Building size={32} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center mb-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{partner.name}</h3>
                {partner.website && (
                  <a 
                    href={partner.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-[#3f6197] hover:text-[#2c4b79] flex items-center justify-center gap-1 transition-colors"
                  >
                    <ExternalLink size={14} />
                    Visit Website
                  </a>
                )}
              </div>
            </>
          ) : (
            // Person Profile Layout
            <>
              <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#3F6197]">
                  {partner.photo && !imageError ? (
                    <>
                      {!imageLoaded && (
                        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />
                      )}
                      <img
                        src={imageUrl}
                        alt={partner.name}
                        className={`w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110 ${
                          imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full">
                      <User size={32} className="text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center rounded-full">
                    <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      {partner.linkedin && (
                        <a href={partner.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                          <Linkedin size={18} className="text-white hover:text-[#0077b5] transition-colors duration-200" />
                        </a>
                      )}
                      {partner.email && (
                        <a href={`mailto:${partner.email}`} className="hover:scale-110 transition-transform duration-200">
                          <Mail size={18} className="text-white hover:text-[#E4405F] transition-colors duration-200" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mb-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{partner.name}</h3>
                {partner.details && (
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xs">{partner.details}</p>
                )}
              </div>
            </>
          )}
          
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(partner)} 
              className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
            >
              <Edit size={16} className="text-blue-600" />
            </button>
            <button 
              onClick={() => onDelete(partner._id)}
              className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
            >
              <Trash size={16} className="text-red-600" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const PartnerForm = ({ partner, onSubmit, onCancel, partnerType }) => {
  const isCompany = ['Academic', 'Corporate', 'IP Partners'].includes(partnerType);
  
  const [formData, setFormData] = useState({
    name: partner?.name || '',
    type: partner?.type || partnerType,
    website: partner?.website || '',
    email: partner?.email || '',
    linkedin: partner?.linkedin || '',
    details: partner?.details || '',
  });
  
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  useEffect(() => {
    if (partner) {
      if (isCompany && partner.logo) {
        setPreview(Api.getLogoUrl(partner._id));
      } else if (!isCompany && partner.photo) {
        setPreview(Api.getPhotoUrl(partner._id));
      }
    }
  }, [partner, isCompany]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });
    
    if (image) {
      data.append('image', image);
    }
    
    onSubmit(data, partner?._id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto max-h-[90vh] overflow-y-auto">
      <h3 className="text-xl font-semibold mb-4">
        {partner ? `Edit ${partnerType}` : `Add ${partnerType}`}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-4">
          <div 
            className={`relative ${isCompany ? 'w-40 h-24' : 'w-32 h-32'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div 
              className={`absolute inset-0 ${isCompany ? 'rounded-lg' : 'rounded-full'} overflow-hidden border-2 ${
                isDragging 
                  ? 'border-dashed border-[#3f6197] bg-blue-50' 
                  : 'border-gray-300'
              } transition-all duration-200`}
            >
              {preview ? (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className={`w-full h-full ${isCompany ? 'object-contain bg-white' : 'object-cover'}`} 
                />
              ) : (
                <div className={`w-full h-full flex flex-col items-center justify-center bg-gray-100 ${isCompany ? '' : 'rounded-full'}`}>
                  {isCompany ? <Building size={32} className="text-gray-400" /> : <User size={32} className="text-gray-400" />}
                  {isDragging && (
                    <p className="text-xs text-center text-[#3f6197] mt-2">Drop image here</p>
                  )}
                  {!isDragging && (
                    <p className="text-xs text-center text-gray-500 mt-2">
                      {isCompany ? 'Drag logo here' : 'Drag photo here'}
                    </p>
                  )}
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-[#3f6197] p-2 rounded-full cursor-pointer hover:bg-[#2c4b79] transition-colors">
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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isCompany ? 'Company Name' : 'Full Name'}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            required
          />
        </div>

        {isCompany ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
              placeholder="https://company.com"
            />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                placeholder="email@example.com"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                placeholder="Brief description of experience, role, expertise..."
              />
            </div>
          </>
        )}

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
            className="px-4 py-2 bg-[#3f6197] text-white rounded-md hover:bg-[#2c4b79] transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const PartnersControl = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentPartner, setCurrentPartner] = useState(null);
  const [activeTab, setActiveTab] = useState('Academic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await Api.getPartners();
      setPartners(response.data.data);
    } catch (error) {
      console.error('Error fetching partners:', error);
      setMessage({ 
        text: error.response?.data?.message || 'Error fetching partners', 
        type: "error" 
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    const filteredPartners = partners.filter(partner => partner.type === activeTab);
    const items = Array.from(filteredPartners);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    
    const updatedItems = items.map((item, index) => ({
      id: item._id,
      order: index
    }));
    
    // Update local state immediately for better UX
    const newPartners = partners.map(partner => {
      if (partner.type === activeTab) {
        const updatedPartner = items.find(item => item._id === partner._id);
        return updatedPartner || partner;
      }
      return partner;
    });
    
    setPartners(newPartners);
    
    // Update order on server
    try {
      await Api.updatePartnerOrder(updatedItems);
    } catch (error) {
      console.error('Error updating partner order:', error);
      // Revert on error
      fetchPartners();
      setMessage({ 
        text: error.response?.data?.message || 'Error updating partner order', 
        type: "error" 
      });
      setTimeout(() => setMessage({ text: "", type: "" }), 5000);
    }
  };

  const handleAddPartner = () => {
    setCurrentPartner(null);
    setShowForm(true);
  };

  const handleEditPartner = (partner) => {
    setCurrentPartner(partner);
    setShowForm(true);
  };

  const handleDeletePartner = async (id) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      try {
        setIsSubmitting(true);
        await Api.deletePartner(id);
        setPartners(prev => prev.filter(p => p._id !== id));
        setMessage({ text: "Partner deleted successfully!", type: "success" });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      } catch (error) {
        console.error('Error deleting partner:', error);
        setMessage({ 
          text: error.response?.data?.message || 'Failed to delete partner', 
          type: "error" 
        });
        setTimeout(() => setMessage({ text: "", type: "" }), 5000);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSubmitForm = async (formData, id) => {
    try {
      setIsSubmitting(true);
      
      let response;
      if (id) {
        response = await Api.updatePartner(id, formData);
        setPartners(prev => prev.map(p => p._id === id ? response.data.data : p));
        setMessage({ text: "Partner updated successfully!", type: "success" });
      } else {
        response = await Api.createPartner(formData);
        setPartners(prev => [...prev, response.data.data]);
        setMessage({ text: "Partner added successfully!", type: "success" });
      }
      
      setShowForm(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    } catch (error) {
      console.error('Error saving partner:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.errors?.join(', ') || 
                          'Failed to save partner';
      setMessage({ text: errorMessage, type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPartners = partners.filter(partner => partner.type === activeTab);
  const isCompanyTab = ['Academic', 'Corporate', 'IP Partners'].includes(activeTab);

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Partners Management</h1>
            <p className="text-blue-100">Create and Manage Partners</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Academic', 'Corporate', "IP Partners", "Mentors", "External Investors"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors ${activeTab === tab 
                  ? 'bg-white text-[#3f6197] font-medium' 
                  : 'bg-[#3f6197] text-white border border-white/30 hover:bg-[#2c4b79]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

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

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#3f6197]">
            {activeTab} {filteredPartners.length > 0 && `(${filteredPartners.length})`}
          </h2>
          <button
            onClick={handleAddPartner}
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#3f6197] hover:bg-[#2c4b79] text-white rounded-lg transition-colors flex items-center disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add {activeTab.slice(0, -1)}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f6197]"></div>
          </div>
        ) : filteredPartners.length === 0 ? (
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            {isCompanyTab ? (
              <Building className="h-12 w-12 mx-auto text-blue-400 mb-4" />
            ) : (
              <User className="h-12 w-12 mx-auto text-blue-400 mb-4" />
            )}
            <h3 className="text-lg font-medium text-gray-700 mb-2">No {activeTab.toLowerCase()} available</h3>
            <p className="text-gray-500">There are currently no {activeTab.toLowerCase()} in this category.</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId={`partners-${activeTab}`} direction="horizontal" type="partner">
              {(provided) => (
                <div
                  className={`grid gap-6 ${
                    isCompanyTab 
                      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' 
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  }`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredPartners.map((partner, index) => (
                    <PartnerCard
                      key={partner._id}
                      partner={partner}
                      index={index}
                      onEdit={handleEditPartner}
                      onDelete={handleDeletePartner}
                      isCompany={isCompanyTab}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={fetchPartners}
            disabled={loading}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center transition-colors disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full">
            <PartnerForm
              partner={currentPartner}
              partnerType={activeTab}
              onSubmit={handleSubmitForm}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
      
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3f6197] mr-4"></div>
            <span>Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnersControl;