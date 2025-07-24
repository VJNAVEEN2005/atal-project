import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Map,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Globe,
  MessageCircle,
  UserCheck
} from 'lucide-react';
import axios from 'axios';
import api from '../Api/api';
import { useNavigate } from 'react-router-dom';
import { showNotification, updateNotification } from '@mantine/notifications';

const ContactControl = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    map: '',
    whatsapp: '',
    role: ''
  });
  const [errors, setErrors] = useState({});

  // Fetch contact data on component mount
  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.get(`${api.web}api/v1/contact/getContactData`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });

      if (response.data.success) {
        setContactData(response.data.contact);
      }
    } catch (err) {
      console.error('Error fetching contact data:', err);
      if (err.response?.status === 404) {
        // No contact data exists yet, keep default empty state
        setError('No contact data found. You can create new contact information.');
      } else {
        setError('Failed to fetch contact data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!contactData.name.trim()) {
      newErrors.name = 'Organization name is required';
    }

    if (contactData.email && !/\S+@\S+\.\S+/.test(contactData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (contactData.phone && !/^[\d\s\-\+\(\)]+$/.test(contactData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);

    showNotification({
      id: 'contact-update',
      loading: true,
      title: 'Updating Contact Information',
      message: 'Please wait while we save the contact details...',
      autoClose: false,
    });

    try {
      const response = await axios.put(
        `${api.web}api/v1/contact/update`,
        contactData,
        {
          headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token'),
          },
        }
      );

      if (response.data.success) {
        updateNotification({
          id: 'contact-update',
          title: 'Success!',
          message: 'Contact information updated successfully.',
          color: 'green',
          icon: <CheckCircle className="w-5 h-5" />,
          autoClose: 5000,
          loading: false,
        });
        
        // Refresh data
        await fetchContactData();
      }
    } catch (err) {
      console.error('Error updating contact data:', err);
      updateNotification({
        id: 'contact-update',
        title: 'Update Failed',
        message: err.response?.data?.message || 'Failed to update contact information.',
        color: 'red',
        icon: <AlertCircle className="w-5 h-5" />,
        autoClose: 5000,
        loading: false,
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3f6197] mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading contact information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#3f6197]/10 to-[#5a7fb8]/10 rounded-3xl blur-3xl"></div>
          <div className="relative">
            {/* Back Button */}
            <div className="flex justify-start mb-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl hover:border-[#3f6197] hover:text-[#3f6197] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] rounded-full blur-lg opacity-60 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] p-4 rounded-full shadow-xl">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] bg-clip-text text-transparent mb-4">
              Contact Management
            </h1>
            <p className="text-gray-600 text-lg">
              Manage organization contact information and social media links
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8 flex items-center gap-4">
            <AlertCircle className="w-8 h-8 text-yellow-500 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">Notice</h3>
              <p className="text-yellow-700">{error}</p>
            </div>
          </div>
        )}

        {/* Main Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-[#3f6197]/5 to-[#5a7fb8]/5 p-8 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-semibold text-gray-800">
                Contact Information
              </h2>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column - Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#3f6197]" />
                  Basic Information
                </h3>

                {/* Organization Name */}
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                    Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3f6197]" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-opacity-30 transition-all duration-300 text-gray-800 placeholder-gray-400 ${
                        errors.name
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-200 focus:ring-[#3f6197] focus:border-[#3f6197] hover:border-gray-300'
                      }`}
                      placeholder="Enter organization name"
                      disabled={saving}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3f6197]" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-opacity-30 transition-all duration-300 text-gray-800 placeholder-gray-400 ${
                        errors.email
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-200 focus:ring-[#3f6197] focus:border-[#3f6197] hover:border-gray-300'
                      }`}
                      placeholder="Enter email address"
                      disabled={saving}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="group">
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3f6197]" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={contactData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-opacity-30 transition-all duration-300 text-gray-800 placeholder-gray-400 ${
                        errors.phone
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-200 focus:ring-[#3f6197] focus:border-[#3f6197] hover:border-gray-300'
                      }`}
                      placeholder="Enter phone number"
                      disabled={saving}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.phone}</p>
                  )}
                </div>

                {/* Location */}
                <div className="group">
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-3">
                    Location/Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-[#3f6197]" />
                    <textarea
                      id="location"
                      name="location"
                      value={contactData.location}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-[#3f6197]/30 focus:border-[#3f6197] hover:border-gray-300 transition-all duration-300 text-gray-800 placeholder-gray-400 border-gray-200"
                      placeholder="Enter full address or location"
                      disabled={saving}
                    />
                  </div>
                </div>

                {/* Map Embed */}
                <div className="group">
                  <label htmlFor="map" className="block text-sm font-semibold text-gray-700 mb-3">
                    Map Embed Code
                  </label>
                  <div className="relative">
                    <Map className="absolute left-4 top-4 w-5 h-5 text-[#3f6197]" />
                    <textarea
                      id="map"
                      name="map"
                      value={contactData.map}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-[#3f6197]/30 focus:border-[#3f6197] hover:border-gray-300 transition-all duration-300 text-gray-800 placeholder-gray-400 border-gray-200"
                      placeholder="Paste Google Maps embed code here"
                      disabled={saving}
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Copy the embed code from Google Maps to display an interactive map
                  </p>
                </div>

                {/* Role */}
                <div className="group">
                  <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-3">
                    Organization Role/Type
                  </label>
                  <div className="relative">
                    <UserCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3f6197]" />
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={contactData.role}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-[#3f6197]/30 focus:border-[#3f6197] hover:border-gray-300 transition-all duration-300 text-gray-800 placeholder-gray-400 border-gray-200"
                      placeholder="e.g., Educational Institution, NGO, Corporate"
                      disabled={saving}
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Specify the type or role of your organization
                  </p>
                </div>
              </div>

              {/* Right Column - Social Media */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#3f6197]" />
                  Social Media Links
                </h3>

                {/* WhatsApp */}
                <div className="group">
                  <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-700 mb-3">
                    WhatsApp
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3f6197]" />
                    <input
                      type="url"
                      id="whatsapp"
                      name="whatsapp"
                      value={contactData.whatsapp}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-[#3f6197]/30 focus:border-[#3f6197] hover:border-gray-300 transition-all duration-300 text-gray-800 placeholder-gray-400 border-gray-200"
                      placeholder="https://wa.me/1234567890 or WhatsApp number"
                      disabled={saving}
                    />
                  </div>
                </div>

                {/* Instagram */}
                <div className="group">
                  <label htmlFor="instagram" className="block text-sm font-semibold text-gray-700 mb-3">
                    Instagram
                  </label>
                  <div className="relative">
                    <Instagram className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3f6197]" />
                    <input
                      type="url"
                      id="instagram"
                      name="instagram"
                      value={contactData.instagram}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-[#3f6197]/30 focus:border-[#3f6197] hover:border-gray-300 transition-all duration-300 text-gray-800 placeholder-gray-400 border-gray-200"
                      placeholder="https://instagram.com/username"
                      disabled={saving}
                    />
                  </div>
                </div>

                {/* Twitter */}
                <div className="group">
                  <label htmlFor="twitter" className="block text-sm font-semibold text-gray-700 mb-3">
                    Twitter/X
                  </label>
                  <div className="relative">
                    <Twitter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3f6197]" />
                    <input
                      type="url"
                      id="twitter"
                      name="twitter"
                      value={contactData.twitter}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-[#3f6197]/30 focus:border-[#3f6197] hover:border-gray-300 transition-all duration-300 text-gray-800 placeholder-gray-400 border-gray-200"
                      placeholder="https://twitter.com/username"
                      disabled={saving}
                    />
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="group">
                  <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-700 mb-3">
                    LinkedIn
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3f6197]" />
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      value={contactData.linkedin}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-[#3f6197]/30 focus:border-[#3f6197] hover:border-gray-300 transition-all duration-300 text-gray-800 placeholder-gray-400 border-gray-200"
                      placeholder="https://linkedin.com/company/name"
                      disabled={saving}
                    />
                  </div>
                </div>

                {/* YouTube */}
                <div className="group">
                  <label htmlFor="youtube" className="block text-sm font-semibold text-gray-700 mb-3">
                    YouTube
                  </label>
                  <div className="relative">
                    <Youtube className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#3f6197]" />
                    <input
                      type="url"
                      id="youtube"
                      name="youtube"
                      value={contactData.youtube}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:ring-4 focus:ring-[#3f6197]/30 focus:border-[#3f6197] hover:border-gray-300 transition-all duration-300 text-gray-800 placeholder-gray-400 border-gray-200"
                      placeholder="https://youtube.com/channel/name"
                      disabled={saving}
                    />
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3f6197]/10 to-[#5a7fb8]/10 rounded-full blur-2xl"></div>
                  <div className="relative flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className="bg-[#3f6197] p-3 rounded-xl">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#3f6197] mb-2">
                        Social Media Guidelines
                      </h3>
                      <p className="text-sm text-blue-800 leading-relaxed">
                        Enter complete URLs for all social media platforms. These links will be displayed on your contact page and used for social media integration. For WhatsApp, you can use either a wa.me link or just the phone number.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-12 mt-8 border-t border-gray-100">
              <button
                type="button"
                onClick={fetchContactData}
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 disabled:opacity-50"
                disabled={saving}
              >
                <RefreshCw className={`w-5 h-5 ${saving ? 'animate-spin' : ''}`} />
                <span>Refresh Data</span>
              </button>
              
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-4 bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] text-white font-semibold rounded-xl hover:from-[#2d4a7a] hover:to-[#4a6ea6] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Update Contact Info</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactControl;
