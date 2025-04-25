import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Calendar, Clock, Plus, Edit, Trash, X, CheckCircle } from 'lucide-react';
import axios from 'axios';
import api from '../Api/api';

const RoadmapItemCard = ({ item, index, year, onEdit, onDelete }) => {
  return (
    <Draggable draggableId={item._id || `roadmap-${index}`} index={index}>
      {(provided) => (
        <div
          className="group flex flex-col bg-white p-4 rounded-lg shadow-md my-4"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center mb-3">
              <div className="bg-[#3F6197] text-white p-2 rounded-full mr-3">
                <Calendar size={20} />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{item.month} {year}</div>
                <div className="text-sm text-gray-500">Milestone</div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => onEdit(year, item)} 
                className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
              >
                <Edit size={16} className="text-blue-600" />
              </button>
              <button 
                onClick={() => onDelete(item._id)}
                className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
              >
                <Trash size={16} className="text-red-600" />
              </button>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-md mt-2">
            <p className="text-gray-700">{item.event}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const RoadmapForm = ({ formData, setFormData, onSubmit, onCancel }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">{formData._id ? 'Edit Milestone' : 'Add Milestone'}</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
              placeholder="YYYY"
              pattern="[0-9]{4}"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock size={18} className="text-gray-400" />
            </div>
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197] appearance-none"
              required
            >
              <option value="">Select Month</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Description</label>
          <textarea
            name="event"
            value={formData.event}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            rows="4"
            placeholder="Describe the milestone or event"
            required
          ></textarea>
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
            className="px-4 py-2 bg-[#3f6197] text-white rounded-md hover:bg-[#2c4b79] transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const RoadMapControl = () => {
  const [timelineData, setTimelineData] = useState({});
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeYear, setActiveYear] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    event: '',
    _id: null
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    fetchRoadmapData();
  }, []);
  
  const fetchRoadmapData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api.web}api/v1/roadmap`);
      
      // Organize data by years
      const organizedData = {};
      response.data.roadmapItems.forEach(item => {
        if (!organizedData[item.year]) {
          organizedData[item.year] = [];
        }
        organizedData[item.year].push({
          _id: item._id,
          month: item.month,
          event: item.event,
          order: item.order || 0
        });
      });
      
      // Sort entries in each year by order property
      Object.keys(organizedData).forEach(year => {
        organizedData[year].sort((a, b) => a.order - b.order);
      });
      
      const sortedYears = Object.keys(organizedData).sort((a, b) => b - a); // Sort in descending order
      setTimelineData(organizedData);
      setYears(sortedYears);
      setActiveYear(sortedYears.length > 0 ? sortedYears[0] : null);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching roadmap data:', error);
      setMessage({ text: "Failed to load roadmap data. Please try again.", type: "error" });
      setLoading(false);
    }
  };
  
  const handleAddMilestone = () => {
    setFormData({
      year: activeYear || new Date().getFullYear().toString(),
      month: '',
      event: '',
      _id: null
    });
    setShowForm(true);
  };
  
  const handleEditMilestone = (year, item) => {
    setFormData({
      year,
      month: item.month,
      event: item.event,
      _id: item._id
    });
    setShowForm(true);
  };
  
  const handleDeleteMilestone = async (id) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      try {
        setIsSubmitting(true);
        await axios.delete(`${api.web}api/v1/roadmap/${id}`);
        fetchRoadmapData();
        setMessage({ text: "Milestone deleted successfully!", type: "success" });
      } catch (error) {
        console.error('Error deleting milestone:', error);
        setMessage({ text: "Failed to delete milestone. Please try again.", type: "error" });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      
      if (formData._id) {
        // Update existing milestone
        await axios.put(`${api.web}api/v1/roadmap/${formData._id}`, formData);
        setMessage({ text: "Milestone updated successfully!", type: "success" });
      } else {
        // Add new milestone
        await axios.post(`${api.web}api/v1/roadmap`, formData);
        setMessage({ text: "Milestone added successfully!", type: "success" });
      }
      setShowForm(false);
      fetchRoadmapData();
    } catch (error) {
      console.error('Error saving milestone:', error);
      setMessage({ text: error.response?.data?.message || "Failed to save milestone. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    // Filter milestones for current active year
    const yearItems = timelineData[activeYear];
    
    // Create a copy of the filtered array
    const items = Array.from(yearItems);
    
    // Remove the dragged item from its position
    const [reorderedItem] = items.splice(source.index, 1);
    
    // Insert the item at the new position
    items.splice(destination.index, 0, reorderedItem);
    
    // Update order property for each item in the list
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));
    
    // Create a new timelineData object with updated order
    const newTimelineData = {
      ...timelineData,
      [activeYear]: updatedItems
    };
    
    // Update the state
    setTimelineData(newTimelineData);
    
    try {
      // Send the updated order to the server
      await axios.post(`${api.web}api/v1/roadmap/reorder`, { roadmapItems: updatedItems });
      fetchRoadmapData();
    } catch (error) {
      console.error('Error updating roadmap order:', error);
      setMessage({ text: "Failed to update milestone order. Please try again.", type: "error" });
      // Revert to previous state if API call fails
      fetchRoadmapData();
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Roadmap Management</h1>
            <p className="text-blue-100">Plan and visualize your project milestones</p>
          </div>
          <div className="flex space-x-2">
            {years.length > 0 && years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-4 py-2 rounded-lg transition-colors ${activeYear === year 
                  ? 'bg-white text-[#3f6197] font-medium' 
                  : 'bg-[#3f6197] text-white border border-white/30 hover:bg-[#2c4b79]'
                }`}
              >
                {year}
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
            {activeYear ? `${activeYear} Milestones` : 'Roadmap Milestones'}
          </h2>
          <button
            onClick={handleAddMilestone}
            className="px-6 py-3 bg-[#3f6197] hover:bg-[#2c4b79] text-white rounded-lg transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Milestone
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f6197]"></div>
          </div>
        ) : years.length === 0 ? (
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No roadmap milestones available</h3>
            <p className="text-gray-500">Create your first milestone to start building your roadmap.</p>
          </div>
        ) : activeYear && timelineData[activeYear] && timelineData[activeYear].length === 0 ? (
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <Calendar size={48} className="mx-auto text-blue-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No milestones for {activeYear}</h3>
            <p className="text-gray-500">Add your first milestone for this year.</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId={`roadmap-${activeYear}`} type="roadmap-item">
              {(provided) => (
                <div
                  className="space-y-2"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {activeYear && timelineData[activeYear] && timelineData[activeYear].map((item, index) => (
                    <RoadmapItemCard
                      key={item._id || `roadmap-item-${index}`}
                      item={item}
                      year={activeYear}
                      index={index}
                      onEdit={handleEditMilestone}
                      onDelete={handleDeleteMilestone}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={fetchRoadmapData}
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
          <div className="max-w-md w-full">
            <RoadmapForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmitForm}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadMapControl;