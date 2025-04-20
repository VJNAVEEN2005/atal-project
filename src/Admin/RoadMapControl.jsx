import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import api from '../Api/api';
import { Calendar, Clock, Plus, Edit2, Trash2, X, CheckCircle } from 'lucide-react';

const RoadMapControl = () => {
  const [timelineData, setTimelineData] = useState({});
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeYear, setActiveYear] = useState(null);
  
  // Form states
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    event: '',
    _id: null
  });
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  
  // Fetch roadmap data
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
          event: item.event
        });
      });
      
      const sortedYears = Object.keys(organizedData).sort((a, b) => b - a); // Sort in descending order
      setTimelineData(organizedData);
      setYears(sortedYears);
      setActiveYear(sortedYears.length > 0 ? sortedYears[0] : null);
      setLoading(false);
    } catch (err) {
      setError('Failed to load roadmap data');
      setLoading(false);
      console.error(err);
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Reset form
  const resetForm = () => {
    setFormData({
      year: '',
      month: '',
      event: '',
      _id: null
    });
    setFormMode('add');
  };
  
  // Open form for adding new entry
  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
    setFormMode('add');
  };
  
  // Open form for editing
  const handleEdit = (year, item) => {
    setFormData({
      year,
      month: item.month,
      event: item.event,
      _id: item._id
    });
    setShowForm(true);
    setFormMode('edit');
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (formMode === 'add') {
        // Add new roadmap item
        await axios.post(`${api.web}api/v1/roadmap`, formData);
      } else {
        // Update existing roadmap item
        await axios.put(`${api.web}api/v1/roadmap/${formData._id}`, formData);
      }
      
      // Success notification could be added here
      
      // Refresh data
      fetchRoadmapData();
      setShowForm(false);
      resetForm();
    } catch (err) {
      setError(formMode === 'add' ? 'Failed to add item' : 'Failed to update item');
      console.error(err);
    }
  };
  
  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this roadmap item?')) {
      try {
        await axios.delete(`${api.web}api/v1/roadmap/${id}`);
        fetchRoadmapData();
      } catch (err) {
        setError('Failed to delete item');
        console.error(err);
      }
    }
  };
  
  // Available months for dropdown
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Sort months by their proper order
  const sortMonths = (a, b) => {
    return months.indexOf(a.month) - months.indexOf(b.month);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3f6197]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#3f6197]">Roadmap Management</h2>
          <p className="text-gray-500 mt-1">Plan and visualize your project milestones</p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-[#3f6197] text-white px-4 py-2 rounded-md hover:bg-[#2d4570] transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Milestone
        </button>
      </div>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 flex items-start gap-3"
        >
          <div className="text-red-500 mt-0.5">
            <X size={20} />
          </div>
          <div>
            <h3 className="font-semibold">Error</h3>
            <p>{error}</p>
          </div>
        </motion.div>
      )}
      
      {/* Add/Edit Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 p-6 rounded-lg mb-6 border border-blue-100 shadow-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#3f6197] flex items-center gap-2">
              {formMode === 'add' ? (
                <>
                  <Plus size={20} />
                  Add New Milestone
                </>
              ) : (
                <>
                  <Edit2 size={20} />
                  Edit Milestone
                </>
              )}
            </h3>
            <button 
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-gray-700 font-medium">Year</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none transition-colors"
                    placeholder="YYYY"
                    pattern="[0-9]{4}"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="block text-gray-700 font-medium">Month</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={18} className="text-gray-400" />
                  </div>
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleInputChange}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-md appearance-none focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none transition-colors"
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
            </div>
            
            <div className="mt-6">
              <label className="block text-gray-700 font-medium mb-1">Event Description</label>
              <textarea
                name="event"
                value={formData.event}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3f6197] focus:border-[#3f6197] outline-none transition-colors"
                rows="3"
                placeholder="Describe the milestone or event"
                required
              ></textarea>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <X size={18} />
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#3f6197] text-white rounded-md hover:bg-[#2d4570] flex items-center gap-2"
              >
                <CheckCircle size={18} />
                {formMode === 'add' ? 'Add Milestone' : 'Update Milestone'}
              </button>
            </div>
          </form>
        </motion.div>
      )}
      
      {/* Year Tabs */}
      {years.length > 0 && (
        <div className="mb-6 border-b">
          <div className="flex overflow-x-auto gap-2 pb-2">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                  activeYear === year 
                    ? 'bg-[#3f6197] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Timeline Data */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        {years.length > 0 ? (
          <>
            {activeYear && (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Month</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Event</th>
                      <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {timelineData[activeYear]
                      .sort(sortMonths)
                      .map((item, index) => (
                        <tr key={item._id || index} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-[#3f6197]" />
                              {item.month}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-700">{item.event}</td>
                          <td className="py-4 px-6 whitespace-nowrap text-right text-sm">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleEdit(activeYear, item)}
                                className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition-colors"
                                title="Edit"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                                title="Delete"
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
          </>
        ) : (
          <div className="text-center py-16 px-4">
            <div className="flex justify-center mb-4">
              <Calendar size={48} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No roadmap data available</h3>
            <p className="text-gray-500 mb-4">Create your first milestone to get started</p>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3f6197] hover:bg-[#2d4570] gap-2"
            >
              <Plus size={16} />
              Add First Milestone
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadMapControl;