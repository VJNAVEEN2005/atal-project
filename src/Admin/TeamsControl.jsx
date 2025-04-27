import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Linkedin, Mail, User, Edit, Trash, Upload } from 'lucide-react';
import axios from 'axios';
import api from '../Api/api';

const TeamMemberCard = ({ member, index, onEdit, onDelete }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Draggable draggableId={member._id || `member-${index}`} index={index}>
      {(provided) => (
        <div
          className="group flex flex-col items-center bg-white p-4 rounded-lg shadow-md my-4"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#3F6197]">
              {member.image && !imageError ? (
                <>
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />
                  )}
                  <img
                    src={`${api.web}api/v1/team/image/${member._id}`}
                    alt={member.name}
                    className={`w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full">
                  <User size={40} className="text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center rounded-full">
                <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                      <Linkedin size={20} className="text-white hover:text-[#0077b5] transition-colors duration-200" />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="hover:scale-110 transition-transform duration-200">
                      <Mail size={20} className="text-white hover:text-[#E4405F] transition-colors duration-200" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
            {member.role.split(",").map((item, idx) => (
              <p key={idx} className="text-sm text-gray-500">{item}</p>
            ))}
          </div>
          <div className="mt-3 flex space-x-2">
            <button 
              onClick={() => onEdit(member)} 
              className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
            >
              <Edit size={16} className="text-blue-600" />
            </button>
            <button 
              onClick={() => onDelete(member._id)}
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

const TeamMemberForm = ({ member, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    role: member?.role || '',
    email: member?.email || '',
    linkedin: member?.linkedin || '',
    team: member?.team || 'Core Team',
  });
  
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  useEffect(() => {
    // Set preview if member has an image
    if (member?.image) {
      setPreview(`${api.web}api/v1/team/image/${member._id}`);
    }
  }, [member]);

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
    
    // Append all form fields
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    // Only append image if a new one was selected
    if (image) {
      data.append('image', image);
    }
    
    // Pass the FormData object and member ID if editing
    onSubmit(data, member?._id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">{member ? 'Edit Team Member' : 'Add Team Member'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-4">
          <div 
            className="relative w-32 h-32"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div 
              className={`absolute inset-0 rounded-full overflow-hidden border-2 ${
                isDragging 
                  ? 'border-dashed border-[#3f6197] bg-blue-50' 
                  : 'border-gray-300'
              } transition-all duration-200`}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                  <User size={40} className="text-gray-400" />
                  {isDragging && (
                    <p className="text-xs text-center text-[#3f6197] mt-2">Drop image here</p>
                  )}
                  {!isDragging && (
                    <p className="text-xs text-center text-gray-500 mt-2">Drag image here</p>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            required
            placeholder="E.g. CEO, Project Manager"
          />
          <p className="text-xs text-gray-500 mt-1">Separate multiple roles with commas</p>
        </div>

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
          <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
          <select
            name="team"
            value={formData.team}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
          >
            <option value="Core Team">Core Team</option>
            <option value="Executive Team">Executive Team</option>
          </select>
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

const TeamsControl = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [activeTab, setActiveTab] = useState('Core Team');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${api.web}api/v1/team`);
      setTeamMembers(response.data.team);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching team members:', error);
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    // Filter members for current active tab
    const filteredMembers = teamMembers.filter(member => member.team === activeTab);
    
    // Create a copy of the filtered array
    const items = Array.from(filteredMembers);
    
    // Remove the dragged item from its position
    const [reorderedItem] = items.splice(source.index, 1);
    
    // Insert the item at the new position
    items.splice(destination.index, 0, reorderedItem);
    
    // Update order property for each item in the filtered list
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));
    
    // Create a new array of ALL team members with updated order for the active tab
    const newTeamMembers = teamMembers.map(member => {
      if (member.team === activeTab) {
        // Find the updated version of this member in updatedItems
        const updatedMember = updatedItems.find(item => item._id === member._id);
        return updatedMember || member;
      }
      return member;
    });
    
    // Update the state with ALL team members (including the reordered ones)
    setTeamMembers(newTeamMembers);
    
    try {
      // Send the updated order to the server
      await axios.post(`${api.web}api/v1/team/reorder`, { teamMembers: updatedItems });
      fetchTeamMembers();
    } catch (error) {
      console.error('Error updating team order:', error);
      setMessage({ text: "Failed to update team order. Please try again.", type: "error" });
      // Revert to previous state if API call fails
      fetchTeamMembers();
    }
  };

  const handleAddMember = () => {
    setCurrentMember(null);
    setShowForm(true);
  };

  const handleEditMember = (member) => {
    setCurrentMember(member);
    setShowForm(true);
  };

  const handleDeleteMember = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        setIsSubmitting(true);
        await axios.delete(`${api.web}api/v1/team/${id}`);
        fetchTeamMembers();
        setMessage({ text: "Team member deleted successfully!", type: "success" });
      } catch (error) {
        console.error('Error deleting team member:', error);
        setMessage({ text: "Failed to delete team member. Please try again.", type: "error" });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSubmitForm = async (formData, id) => {
    try {
      setIsSubmitting(true);
      
      if (id) {
        // Update existing member
        await axios.put(`${api.web}api/v1/team/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setMessage({ text: "Team member updated successfully!", type: "success" });
      } else {
        // Add new member
        await axios.post(`${api.web}api/v1/team`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setMessage({ text: "Team member added successfully!", type: "success" });
      }
      setShowForm(false);
      fetchTeamMembers();
    } catch (error) {
      console.error('Error saving team member:', error);
      setMessage({ text: error.response?.data?.message || "Failed to save team member. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredMembers = teamMembers.filter(member => member.team === activeTab);

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Team Management</h1>
            <p className="text-blue-100">Create and manage team members</p>
          </div>
          <div className="flex space-x-2">
            {['Core Team', 'Executive Team'].map((tab) => (
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
            {activeTab} Members
          </h2>
          <button
            onClick={handleAddMember}
            className="px-6 py-3 bg-[#3f6197] hover:bg-[#2c4b79] text-white rounded-lg transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Team Member
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f6197]"></div>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No team members available</h3>
            <p className="text-gray-500">There are currently no members in this team.</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId={`team-members-${activeTab}`} direction='row' type="team-member">
              {(provided) => (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredMembers.map((member, index) => (
                    <TeamMemberCard
                      key={member._id || `team-member-${index}`}
                      member={member}
                      index={index}
                      onEdit={handleEditMember}
                      onDelete={handleDeleteMember}
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
            onClick={fetchTeamMembers}
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
            <TeamMemberForm
              member={currentMember}
              onSubmit={handleSubmitForm}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsControl;