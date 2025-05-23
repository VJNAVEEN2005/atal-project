import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock, MapPin, Link, Edit, Trash, Image, Plus, Filter } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../Api/api';

const EventCard = ({ event, onDelete }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="group flex flex-col bg-white p-4 rounded-lg shadow-md my-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center mb-3">
          <div className="h-12 w-12 mr-3 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {event.poster ? (
              <img 
                className="h-full w-full object-cover" 
                src={`data:${event.poster.contentType};base64,${event.poster.data}`} 
                alt={event.title} 
              />
            ) : (
              <Calendar size={24} className="text-gray-400" />
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{event.title}</div>
            <div className="text-sm text-gray-500 flex items-center">
              <Calendar size={14} className="mr-1" /> {formatDate(event.date)} • {event.time}
            </div>
            <div className="text-sm text-gray-500 flex items-center mt-1">
              <MapPin size={14} className="mr-1" /> {event.location}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => navigate(`/events/edit/${event._id}`)} 
            className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
          >
            <Edit size={16} className="text-blue-600" />
          </button>
          <button 
            onClick={() => onDelete(event._id)}
            className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
          >
            <Trash size={16} className="text-red-600" />
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 rounded-md mt-2">
        <p className="text-gray-700">{event.description}</p>
      </div>
      
      {event.registrationLink && (
        <div className="mt-3 flex justify-end">
          <a 
            href={event.registrationLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 hover:bg-green-200"
          >
            Register
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

const EventForm = ({ formData, setFormData, onSubmit, onCancel }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, selectedFile: file }));
      
      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFormData(prev => ({ ...prev, previewUrl: fileReader.result }));
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">{formData._id ? 'Edit Event' : 'Add New Event'}</h3>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
              placeholder="Event title"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={18} className="text-gray-400" />
            </div>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock size={18} className="text-gray-400" />
            </div>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
              placeholder="Event location"
              required
            />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            placeholder="Describe the event"
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Registration Link (Optional)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Link size={18} className="text-gray-400" />
            </div>
            <input
              type="url"
              name="registrationLink"
              value={formData.registrationLink}
              onChange={handleInputChange}
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
              placeholder="https://example.com/register"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Poster Image</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Image size={18} className="text-gray-400" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            />
          </div>
          {formData.previewUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Preview:</p>
              <img 
                src={formData.previewUrl} 
                alt="Preview" 
                className="h-32 w-auto object-cover rounded-md border border-gray-300" 
              />
            </div>
          )}
        </div>
        
        <div className="md:col-span-2 flex justify-end space-x-2 mt-4">
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
            {formData._id ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

const EventsControl = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    registrationLink: '',
    selectedFile: null,
    previewUrl: '',
    _id: null
  });
  
  // Sequential filtering states
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [availableYears, setAvailableYears] = useState(['all']);
  
  const navigate = useNavigate();

  // Month names array for filtering
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    fetchEvents();
  }, []);
  
  // Extract unique years from events data
  useEffect(() => {
    if (events.length > 0) {
      const years = [...new Set(events.map(event => new Date(event.date).getFullYear()))].sort((a, b) => b - a);
      setAvailableYears(['all', ...years.map(year => year.toString())]);
    }
  }, [events]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api.web}api/v1/events/`);
      setEvents(response.data.events);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch events');
      setLoading(false);
      console.error(err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      
      // Append event details to FormData
      Object.keys(formData).forEach(key => {
        if (key !== 'selectedFile' && key !== 'previewUrl' && key !== '_id') {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Append image file if selected
      if (formData.selectedFile) {
        formDataToSend.append('poster', formData.selectedFile);
      }
      
      let response;
      
      if (formData._id) {
        // Update existing event
        response = await axios.put(`${api.web}api/v1/event/${formData._id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage({ text: "Event updated successfully!", type: "success" });
      } else {
        // Create new event
        response = await axios.post(`${api.web}api/v1/event/`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setMessage({ text: "Event created successfully!", type: "success" });
      }
      
      setShowForm(false);
      fetchEvents();
      
      // Reset form
      resetForm();
      
    } catch (err) {
      setError('Failed to save event');
      setMessage({ text: err.response?.data?.message || "Failed to save event. Please try again.", type: "error" });
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      registrationLink: '',
      selectedFile: null,
      previewUrl: '',
      _id: null
    });
  };

  const deleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${api.web}api/v1/event/${id}`);
        setEvents(events.filter(event => event._id !== id));
        setMessage({ text: "Event deleted successfully!", type: "success" });
      } catch (err) {
        setError('Failed to delete event');
        setMessage({ text: "Failed to delete event. Please try again.", type: "error" });
        console.error(err);
      }
    }
  };
  
  // Handle year selection
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedMonth('all'); // Reset month selection when year changes
  };
  
  // Gets the display title based on current filters
  const getFilterDisplayTitle = () => {
    if (selectedYear === 'all' && selectedMonth === 'all') {
      return 'All Events';
    } else if (selectedYear !== 'all' && selectedMonth === 'all') {
      return `Events in ${selectedYear}`;
    } else {
      return `Events in ${selectedMonth} ${selectedYear}`;
    }
  };
  
  // Filter events based on selectedYear and selectedMonth
  const filteredEvents = useMemo(() => {
    let filtered = events;
    
    // Filter by year if not 'all'
    if (selectedYear !== 'all') {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear().toString() === selectedYear;
      });
    }
    
    // Filter by month if not 'all'
    if (selectedMonth !== 'all') {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return monthNames[eventDate.getMonth()] === selectedMonth;
      });
    }
    
    return filtered;
  }, [events, selectedYear, selectedMonth]);

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Events Management</h1>
            <p className="text-blue-100">Create and manage your organization's events</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setShowForm(!showForm);
              resetForm();
            }}
            className="px-6 py-3 bg-white text-[#3f6197] rounded-lg font-medium shadow-sm transition-colors duration-200 hover:bg-blue-50 flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Add New Event
          </motion.button>
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

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-xl font-semibold text-[#3f6197] mb-3 md:mb-0">
            {getFilterDisplayTitle()}
          </h2>
          
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
            <div className="flex items-center mr-2">
              <Filter size={16} className="text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">Filter:</span>
            </div>
            
            {/* Two-stage filter UI */}
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
              {/* Year filter */}
              <div className="bg-gray-100 rounded-lg p-1 overflow-x-auto whitespace-nowrap">
                {availableYears.map(year => (
                  <button
                    key={`year-${year}`}
                    onClick={() => handleYearChange(year)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      selectedYear === year 
                        ? 'bg-[#3f6197] text-white' 
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {year === 'all' ? 'All Years' : year}
                  </button>
                ))}
              </div>
              
              {/* Month filter - only show if a specific year is selected */}
              {selectedYear !== 'all' && (
                <div className="bg-gray-100 rounded-lg p-1 overflow-x-auto whitespace-nowrap">
                  <button
                    onClick={() => setSelectedMonth('all')}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      selectedMonth === 'all' 
                        ? 'bg-[#3f6197] text-white' 
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All Months
                  </button>
                  {monthNames.map(month => (
                    <button
                      key={`month-${month}`}
                      onClick={() => setSelectedMonth(month)}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        selectedMonth === month 
                          ? 'bg-[#3f6197] text-white' 
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {month.substring(0, 3)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f6197]"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <Calendar size={48} className="mx-auto text-blue-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {events.length === 0 
                ? "No events available" 
                : `No events found for ${getFilterDisplayTitle()}`}
            </h3>
            <p className="text-gray-500">
              {events.length === 0 
                ? "Create your first event by clicking \"Add New Event\"" 
                : "Try a different filter or add new events"}
            </p>
          </div>
        ) : (
          <div>
            {filteredEvents.map((event) => (
              <EventCard 
                key={event._id} 
                event={event} 
                onDelete={deleteEvent} 
              />
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={fetchEvents}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
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
          <div className="max-w-2xl w-full">
            <EventForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleFormSubmit}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsControl;