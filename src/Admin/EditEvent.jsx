import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../Api/api';

const EditEvent = () => {
  const [event, setEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    registrationLink: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [currentPoster, setCurrentPoster] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api.web}api/v1/event/${id}`);
      const eventData = response.data.event;
      
      // Format date for input field (YYYY-MM-DD)
      const dateObj = new Date(eventData.date);
      const formattedDate = dateObj.toISOString().split('T')[0];
      
      setEvent({
        title: eventData.title,
        date: formattedDate,
        time: eventData.time,
        location: eventData.location,
        description: eventData.description,
        registrationLink: eventData.registrationLink || ''
      });
      
      // Handle poster if exists
      if (eventData.poster && eventData.poster.data) {
        setCurrentPoster({
          contentType: eventData.poster.contentType,
          data: eventData.poster.data
        });
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch event');
      setLoading(false);
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      
      // Append event details to FormData
      Object.keys(event).forEach(key => {
        formData.append(key, event[key]);
      });
      
      // Append image file if a new one was selected
      if (selectedFile) {
        formData.append('poster', selectedFile);
      }
      
      await axios.put(`${api.web}api/v1/event/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('Event updated successfully');
      navigate('/admin/eventscontrol'); // Navigate back to events list
    } catch (err) {
      setError('Failed to update event');
      console.error(err);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Edit Event</h1>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/events')}
          className="bg-gray-500 px-4 py-2 text-white rounded-lg font-medium shadow-sm transition-colors duration-200 hover:bg-gray-600"
        >
          Cancel
        </motion.button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] p-4">
          <h2 className="text-white text-xl font-bold">Update Event</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={event.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={event.date}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Time</label>
            <input
              type="time"
              name="time"
              value={event.time}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={event.location}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={event.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Registration Link (Optional)</label>
            <input
              type="url"
              name="registrationLink"
              value={event.registrationLink}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Event Poster Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            />
            
            {/* Show Preview of New Image */}
            {previewUrl && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">New Image Preview:</p>
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="h-32 w-auto object-cover rounded-md border border-gray-300" 
                />
              </div>
            )}
            
            {/* Show Current Image if no new one selected */}
            {!previewUrl && currentPoster && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Current Image:</p>
                <img 
                  src={`data:${currentPoster.contentType};base64,${currentPoster.data}`} 
                  alt="Current poster" 
                  className="h-32 w-auto object-cover rounded-md border border-gray-300" 
                />
              </div>
            )}
          </div>
          
          <div className="md:col-span-2 flex justify-end mt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-[#3f6197] px-6 py-3 text-white rounded-lg font-medium shadow-sm transition-colors duration-200 hover:bg-[#355180]"
            >
              Update Event
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;