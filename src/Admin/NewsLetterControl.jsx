import React, { useState, useEffect, useCallback } from 'react';
import { Upload, Download, Trash2, Check, X, Pencil, Calendar, Plus } from 'lucide-react';
import axios from 'axios';
import api from '../Api/api';

const NewsLetterControl = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [currentNewsletter, setCurrentNewsletter] = useState({
    title: '',
    year: new Date().getFullYear().toString(),
    pdfFile: null,
    coverImage: null
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
      setError(err.response?.data?.message || 'Error connecting to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const resetForm = () => {
    setCurrentNewsletter({
      title: '',
      year: new Date().getFullYear().toString(),
      pdfFile: null,
      coverImage: null
    });
    setIsEditing(false);
    setEditId(null);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentNewsletter(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setCurrentNewsletter(prev => ({ ...prev, [name]: files[0] }));
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
        setCurrentNewsletter(prev => ({ ...prev, pdfFile: file }));
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
        setCurrentNewsletter(prev => ({ ...prev, coverImage: file }));
      } else {
        showMessage("Please upload a valid image file", true);
      }
    }
  }, []);
  
  const showMessage = (message, isError = false) => {
    if (isError) {
      setError(message);
      setSuccessMessage('');
    } else {
      setSuccessMessage(message);
      setError('');
    }
    
    // Clear message after 3 seconds
    setTimeout(() => {
      if (isError) {
        setError('');
      } else {
        setSuccessMessage('');
      }
    }, 3000);
  };
  
  const handleEditNewsletter = (newsletter) => {
    setCurrentNewsletter({
      title: newsletter.title,
      year: newsletter.year,
      pdfFile: null, // Can't pre-fill files due to security restrictions
      coverImage: null
    });
    setIsEditing(true);
    setEditId(newsletter._id);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate form
    if (!currentNewsletter.title || !currentNewsletter.year) {
      showMessage('Title and year are required', true);
      setLoading(false);
      return;
    }
    
    if (!isEditing && (!currentNewsletter.pdfFile || !currentNewsletter.coverImage)) {
      showMessage('PDF file and cover image are required for new newsletters', true);
      setLoading(false);
      return;
    }
    
    // Create form data for file upload
    const formData = new FormData();
    formData.append('title', currentNewsletter.title);
    formData.append('year', currentNewsletter.year);
    
    if (currentNewsletter.pdfFile) {
      formData.append('pdfFile', currentNewsletter.pdfFile);
    }
    
    if (currentNewsletter.coverImage) {
      formData.append('coverImage', currentNewsletter.coverImage);
    }
    
    try {
      let response;
      
      if (isEditing) {
        response = await axios.put(`${api.web}api/v1/newsletter/${editId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        response = await axios.post(`${api.web}api/v1/newsletter`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      showMessage(isEditing ? 'Newsletter updated successfully' : 'Newsletter created successfully');
      fetchNewsletters();
      resetForm();
    } catch (err) {
      showMessage(err.response?.data?.message || 'Error processing request', true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteNewsletter = async (id) => {
    if (!window.confirm('Are you sure you want to delete this newsletter?')) {
      return;
    }
    
    setLoading(true);
    
    try {
      await axios.delete(`${api.web}api/v1/newsletter/${id}`);
      showMessage('Newsletter deleted successfully');
      fetchNewsletters();
    } catch (err) {
      showMessage(err.response?.data?.message || 'Delete operation failed', true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2" style={{ color: themeColor }}>
            Newsletter Management
          </h1>
          <p className="text-gray-600">Add, edit, or remove newsletters</p>
        </div>
        
        {/* Status Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-500">
              <X size={18} />
            </button>
          </div>
        )}
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center justify-between">
            <span>{successMessage}</span>
            <button onClick={() => setSuccessMessage(null)} className="text-green-500">
              <X size={18} />
            </button>
          </div>
        )}
        
        {/* Newsletter Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: themeColor }}>
            {isEditing ? 'Edit Newsletter' : 'Add New Newsletter'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Newsletter Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="November 2024"
                  value={currentNewsletter.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Year
                </label>
                <input
                  type="text"
                  name="year"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2024"
                  value={currentNewsletter.year}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* PDF File Drop Zone */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  PDF File {isEditing && <span className="text-gray-500 text-xs">(Leave empty to keep current)</span>}
                </label>
                <div 
                  className={`flex items-center justify-center w-full`}
                  onDragEnter={handlePdfDrag}
                >
                  <label 
                    className={`w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-md tracking-wide cursor-pointer hover:bg-gray-50 transition-all duration-200
                      ${pdfDragActive ? 'border-2 border-blue-400 bg-blue-50' : 'border border-dashed border-gray-300 shadow-md'}
                    `}
                    onDragEnter={handlePdfDrag}
                    onDragOver={handlePdfDrag}
                    onDragLeave={handlePdfDrag}
                    onDrop={handlePdfDrop}
                  >
                    <Upload className={pdfDragActive ? "text-blue-500" : "text-gray-500"} size={24} />
                    
                    {currentNewsletter.pdfFile ? (
                      <div className="mt-2 text-sm flex flex-col items-center">
                        <span className="text-green-600 font-medium">File selected:</span>
                        <span className="text-gray-700">{currentNewsletter.pdfFile.name}</span>
                        <span className="text-gray-500 text-xs">
                          ({(currentNewsletter.pdfFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                    ) : (
                      <div className="mt-2 text-sm text-center">
                        <span className="text-gray-500">Drag & drop PDF file here, or click to select</span>
                        <p className="text-xs text-gray-400 mt-1">Maximum file size: 10MB</p>
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
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Cover Image {isEditing && <span className="text-gray-500 text-xs">(Leave empty to keep current)</span>}
                </label>
                <div 
                  className={`flex items-center justify-center w-full`}
                  onDragEnter={handleImageDrag}
                >
                  <label 
                    className={`w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-md tracking-wide cursor-pointer hover:bg-gray-50 transition-all duration-200
                      ${imageDragActive ? 'border-2 border-blue-400 bg-blue-50' : 'border border-dashed border-gray-300 shadow-md'}
                    `}
                    onDragEnter={handleImageDrag}
                    onDragOver={handleImageDrag}
                    onDragLeave={handleImageDrag}
                    onDrop={handleImageDrop}
                  >
                    <Upload className={imageDragActive ? "text-blue-500" : "text-gray-500"} size={24} />
                    
                    {currentNewsletter.coverImage ? (
                      <div className="mt-2 flex flex-col items-center">
                        <div className="h-16 w-12 rounded overflow-hidden mb-1">
                          <img
                            src={URL.createObjectURL(currentNewsletter.coverImage)}
                            alt="Cover preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-sm text-gray-700">{currentNewsletter.coverImage.name}</span>
                        <span className="text-xs text-gray-500">
                          ({(currentNewsletter.coverImage.size / 1024).toFixed(0)} KB)
                        </span>
                      </div>
                    ) : (
                      <div className="mt-2 text-sm text-center">
                        <span className="text-gray-500">Drag & drop image here, or click to select</span>
                        <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF (Max. 5MB)</p>
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
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
              
              <button
                type="submit"
                style={{ backgroundColor: themeColor }}
                className="px-4 py-2 text-white rounded-md hover:bg-opacity-90 flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    {isEditing ? <Check size={18} className="mr-1" /> : <Plus size={18} className="mr-1" />}
                    {isEditing ? 'Update Newsletter' : 'Add Newsletter'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Newsletters List */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-xl font-semibold p-4 border-b" style={{ color: themeColor }}>
            All Newsletters
          </h2>
          
          {loading && newsletters.length === 0 ? (
            <div className="text-center p-8 text-gray-500">Loading newsletters...</div>
          ) : newsletters.length === 0 ? (
            <div className="text-center p-8 text-gray-500">No newsletters found. Add one to get started.</div>
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
                            <span className="text-xs text-gray-500">No image</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{newsletter.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{newsletter.year}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <a
                            href={`data:${newsletter.pdfFile.contentType};base64,${newsletter.pdfFile.data}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Download size={18} />
                          </a>
                          <button
                            onClick={() => handleEditNewsletter(newsletter)}
                            className="text-yellow-600 hover:text-yellow-800"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteNewsletter(newsletter._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
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
    </div>
  );
};

export default NewsLetterControl;