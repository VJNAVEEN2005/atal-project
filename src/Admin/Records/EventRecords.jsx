import React, { useEffect, useState } from "react";
import {
  Calendar,
  Mail,
  Phone,
  User,
  ArrowLeft,
  Check,
  X,
  DollarSign,
  CalendarDays,
  Ticket
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../Api/api";
import { showNotification, updateNotification } from "@mantine/notifications";

const EventRecords = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventName: "",
    amountPaid: "",
    dateOfRegistration: ""
  });

  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(() => {
    if (location.state && location.state.isEdit) {
      setFormData(location.state.record);
      setIsEdit(true);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    showNotification({
      id: 'save-event',
      loading: true,
      title: 'Saving Event Registration',
      message: 'Please wait while we save the event registration...',
      autoClose: false,
      disallowClose: true,
    });

    try {
      const url = isEdit 
        ? `${api.web}api/v1/events/registrations/${formData._id}`
        : `${api.web}api/v1/events/registrations`;
      
      const method = isEdit ? 'put' : 'post';
      
      const response = await axios[method](url, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      
      updateNotification({
        id: 'save-event',
        color: 'teal',
        title: 'Success',
        message: isEdit 
          ? 'Event registration updated successfully!'
          : 'Event registration created successfully!',
        icon: <Check size={16} />,
        autoClose: 2000,
      });
      
      navigate('/admin/event-records-data');
    } catch (error) {
      console.error('Error saving event registration:', error);
      updateNotification({
        id: 'save-event',
        color: 'red',
        title: 'Error',
        message: error.response?.data?.message || 'Failed to save event registration',
        icon: <X size={16} />,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {isEdit ? 'Edit' : 'Add New'} Event Registration
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to List
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Event Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Event Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Ticket className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Amount Paid */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Amount Paid (₹) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="amountPaid"
                    value={formData.amountPaid}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Date of Registration */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Registration <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarDays className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="dateOfRegistration"
                    value={formData.dateOfRegistration}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

             
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isEdit ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventRecords;