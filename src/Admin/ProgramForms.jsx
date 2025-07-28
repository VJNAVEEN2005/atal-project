
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Save, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import api from '../Api/api';
import { useNavigate } from 'react-router-dom';

const initialState = {
  puduvaiStartupSprint: '',
  preIncubation: '',
  acceleration: '',
  droneTechnology: '',
  arduinoProgramming: '',
  threeDModeling: '',
  raspberryPiDevelopment: '',
  Dass: '',
  sisfs: '',
  propelX: '',
  startupSprouting: ''
};

const ProgramForms = () => {
  const [formLinks, setFormLinks] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
    const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${api.web}api/v1/programsform`);
        if (res.data && res.data.data) {
          setFormLinks({ ...initialState, ...res.data.data });
        }
      } catch (err) {
        setError('Failed to fetch form links');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormLinks({ ...formLinks, [e.target.name]: e.target.value });
    // Clear messages when user starts typing
    if (message || error) {
      setMessage('');
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      await axios.put(`${api.web}api/v1/programsform`, formLinks, {
        headers: { token: localStorage.getItem('token') },
      });
      setMessage('Programs form updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update form links');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    // Mock navigation - in real app this would use router
    console.log('Navigate back');
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const isValidUrl = (url) => {
    if (!url) return true; // Empty is valid
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  if (loading && !formLinks.puduvaiStartupSprint) {
    return (
      <div style={{ backgroundColor: '#f8fafc' }} className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-4 rounded-full animate-spin mx-auto mb-4" style={{ borderTopColor: '#3f6197' }}></div>
          <p className="text-gray-600 text-lg">Loading program forms...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8fafc' }} className="min-h-screen">
      {/* Header */}
      <div style={{ backgroundColor: '#3f6197' }} className="shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={()=> navigate('/admin')}
                className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">Back</span>
              </button>
            </div>
            <h1 className="text-2xl font-bold text-white">Program Management</h1>
            <div className="w-20"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Card Header */}
          <div style={{ backgroundColor: '#3f6197' }} className="px-8 py-6">
            <h2 className="text-2xl font-bold text-white mb-2">Update Program Google Form Links</h2>
            <p className="text-blue-100">Manage and update Google Form links for all programs</p>
          </div>

          {/* Card Body */}
          <div className="p-8">
            {/* Status Messages */}
            {message && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                <CheckCircle className="text-green-600" size={20} />
                <span className="text-green-800 font-medium">{message}</span>
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                <AlertCircle className="text-red-600" size={20} />
                <span className="text-red-800 font-medium">{error}</span>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(initialState).map((key) => (
                  <div key={key} className="space-y-2">
                    <label 
                      className="block text-sm font-semibold text-gray-700 mb-2" 
                      htmlFor={key}
                    >
                      {formatLabel(key)}
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        id={key}
                        name={key}
                        value={formLinks[key]}
                        onChange={handleChange}
                        className={`w-full border-2 rounded-lg px-4 py-3 pr-10 transition-all duration-200 focus:outline-none ${
                          formLinks[key] && !isValidUrl(formLinks[key])
                            ? 'border-red-300 focus:border-red-500 bg-red-50'
                            : formLinks[key]
                            ? 'border-green-300 focus:border-green-500 bg-green-50'
                            : 'border-gray-300 focus:border-blue-500 hover:border-gray-400'
                        }`}
                        placeholder={`Enter Google Form link for ${formatLabel(key)}`}
                      />
                      {formLinks[key] && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          {isValidUrl(formLinks[key]) ? (
                            <ExternalLink className="text-green-500" size={16} />
                          ) : (
                            <AlertCircle className="text-red-500" size={16} />
                          )}
                        </div>
                      )}
                    </div>
                    {formLinks[key] && !isValidUrl(formLinks[key]) && (
                      <p className="text-red-600 text-sm">Please enter a valid URL</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading }
                  style={{ backgroundColor: loading ? '#9ca3af' : '#3f6197' }}
                  className="w-full md:w-auto flex items-center justify-center space-x-2 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>Update Forms</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">📝 Instructions</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Enter valid Google Form URLs for each program</li>
            <li>• Leave fields empty if no form is available for that program</li>
            <li>• All URLs will be validated before saving</li>
            <li>• Changes are saved immediately after clicking "Update Forms"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProgramForms;