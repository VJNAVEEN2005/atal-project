import React, { useEffect, useState } from 'react';
import { ArrowLeft, Save, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import api from '../Api/api';
import { useNavigate } from 'react-router-dom';

// Initial state with empty form links for each equipment
const initialState = {
  PICK_AND_PLACE_MACHINE: '',
  _3D_SCANNER: '',
  _3D_PRINTER: '',
  RESIN_3D_PRINTER: '',
  WEGSTR_PCB_PROTOTYPING_MACHINE: '',
  LASER_CUTTING_MACHINE: '',
  SKYRC_1080_CHARGER_FOR_LIPO: '',
  CELL_IMPEDANCE_TESTER: '',
  INVERTER_WELDING_MACHINE: '',
  SPOT_WELDING_MACHINE: '',
  AGRICULTURE_DRONE: '',
  GIMBAL: '',
};

const EquipmentForms = () => {
  const [formLinks, setFormLinks] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${api.web}api/v1/equipmentforms`);
        if (res.data && res.data.data) {
          // Remove 'id' if present in the response
          const { id, ...formDataWithoutId } = res.data.data;
          setFormLinks({ ...initialState, ...formDataWithoutId });
        }
      } catch (err) {
        setError('Failed to fetch equipment form links');
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
    setLoading(true);
    try {
      // Remove 'id' if present in formLinks
      const { id, ...payload } = formLinks;
      await axios.post(`${api.web}api/v1/equipmentforms`, payload, {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token')
        }
      });
      setMessage('Equipment form links saved successfully!');
    } catch (err) {
      setError('Failed to save equipment form links');
      console.error('Error saving equipment form links:', err);
    } finally {
      setLoading(false);
      // Clear success message after 5 seconds
      if (!error) {
        setTimeout(() => setMessage(''), 5000);
      }
    }
  };

  const handleTestLink = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

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
            <h1 className="text-2xl font-bold text-white">Equipment Booking Management</h1>
            <div className="w-20"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
            <h2 className="text-xl font-semibold text-blue-900">Manage Equipment Booking Forms</h2>
            <p className="mt-1 text-sm text-blue-700">
              Add or update Google Forms for each equipment. These forms will be linked to the respective booking buttons.
            </p>
          </div>

          {/* Notifications */}
          <div className="px-6 pt-5">
            {message && (
              <div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" aria-hidden="true" />
                <span className="text-green-900 font-medium">{message}</span>
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" aria-hidden="true" />
                <span className="text-red-800 font-medium">{error}</span>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 pb-8 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(initialState).map((key) => (
                <div key={key} className="space-y-2">
                  <label 
                    htmlFor={key}
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    {key.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name={key}
                      id={key}
                      value={formLinks[key] || ''}
                      onChange={handleChange}
                      placeholder={`Enter Google Form link for ${key.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}`}
                      className={`w-full border-2 rounded-lg px-4 py-3 pr-10 transition-all duration-200 focus:outline-none text-gray-900 bg-blue-50 focus:bg-white
                        ${formLinks[key] && !/^https?:\/\//.test(formLinks[key]) ? 'border-red-300 focus:border-red-500 bg-red-50' :
                        formLinks[key] ? 'border-green-300 focus:border-green-500 bg-green-50' :
                        'border-gray-300 focus:border-blue-500 hover:border-gray-400'}`}
                    />
                    {formLinks[key] && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {/^(https?:\/\/)/.test(formLinks[key]) ? (
                          <ExternalLink className="text-green-500" size={16} />
                        ) : (
                          <AlertCircle className="text-red-500" size={16} />
                        )}
                      </div>
                    )}
                  </div>
                  {formLinks[key] && !/^https?:\/\//.test(formLinks[key]) && (
                    <p className="text-red-600 text-xs">Please enter a valid URL</p>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-8 border-t border-gray-200 mt-8 flex flex-col md:flex-row md:justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-white py-2 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: loading ? '#9ca3af' : '#3f6197' }}
                className="inline-flex items-center justify-center space-x-2 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">📝 Instructions</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Enter valid Google Form URLs for each equipment</li>
            <li>• Leave fields empty if no form is available for that equipment</li>
            <li>• All URLs will be validated before saving</li>
            <li>• Changes are saved immediately after clicking "Save Changes"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EquipmentForms;
