import React, { useState, useEffect } from "react";
import {
  Users,
  Rocket,
  MessageSquare,
  Building,
  School,
  FileText,
  Briefcase,
  Globe,
  GraduationCap,
  DollarSign,
  Handshake,
  Edit,
  Save,
  RefreshCw,
  TrendingUp,
  Plus,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import api from "../Api/api";
import { useNavigate } from "react-router-dom";

const EcosystemCard = ({ field, value, isEditing, onValueChange }) => {
  const IconComponent = field.icon;

  return (
    <div className="group flex flex-col bg-white p-4 rounded-lg shadow-md my-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center mb-3">
          <div
            className={`h-12 w-12 mr-3 rounded-full overflow-hidden flex items-center justify-center ${field.color}`}
          >
            <IconComponent size={24} />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{field.label}</div>
            <div className="text-sm text-gray-500">{field.description}</div>
          </div>
        </div>
        {isEditing && (
          <div className="flex space-x-2">
            <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
              <Edit size={16} className="text-blue-600" />
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-3 rounded-md mt-2">
        {isEditing ? (
          <input
            type="number"
            value={value}
            onChange={(e) => onValueChange(field.key, e.target.value)}
            className="w-full text-2xl font-bold text-gray-900 bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
            min="0"
            placeholder="Enter value"
          />
        ) : (
          <p className="text-2xl font-bold text-gray-900">
            {value.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

const EcosystemForm = ({ formData, setFormData, onSubmit, onCancel }) => {
  const ecosystemFields = [
    {
      key: "registeredMembers",
      label: "Registered Members",
      icon: Users,
      description: "Total number of registered members",
    },
    {
      key: "startupsSupported",
      label: "Start-ups Supported",
      icon: Rocket,
      description: "Number of startups supported",
    },
    {
      key: "mentorsOnBoard",
      label: "Mentors On-board",
      icon: MessageSquare,
      description: "Number of mentors available",
    },
    {
      key: "industrialPartnerships",
      label: "Industrial Partnerships",
      icon: Building,
      description: "Number of industrial partnerships",
    },
    {
      key: "academicPartnerships",
      label: "Academic Partnerships",
      icon: School,
      description: "Number of academic partnerships",
    },
    {
      key: "industryConsultingProjects",
      label: "Industry Consulting Projects",
      icon: FileText,
      description: "Number of consulting projects",
    },
    {
      key: "msmeSupport",
      label: "MSMEs Supported",
      icon: Briefcase,
      description: "Number of MSMEs supported",
    },
    {
      key: "outreachInitiativesEvents",
      label: "Outreach Initiatives Events",
      icon: Globe,
      description: "Number of outreach events",
    },
    {
      key: "numberOfStartups",
      label: "No. of Startups",
      icon: Rocket,
      description: "Total number of startups",
    },
    {
      key: "startupsGraduated",
      label: "Startups Graduated",
      icon: GraduationCap,
      description: "Number of graduated startups",
    },
    {
      key: "employmentGenerated",
      label: "Employment Generated",
      icon: Users,
      description: "Number of jobs created",
    },
    {
      key: "corpsFund",
      label: "Corps Fund",
      icon: DollarSign,
      description: "Corps fund amount",
    },
    {
      key: "csrSecured",
      label: "CSR Secured",
      icon: Handshake,
      description: "CSR secured amount",
    },
  ];

  const handleInputChange = (key, value) => {
    const numValue = parseInt(value) || 0;
    setFormData((prev) => ({
      ...prev,
      [key]: numValue,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Update Ecosystem Data</h3>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {ecosystemFields.map((field) => {
          const IconComponent = field.icon;
          return (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconComponent size={18} className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name={field.key}
                  value={formData[field.key] || 0}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                  placeholder={field.description}
                  min="0"
                  required
                />
              </div>
            </div>
          );
        })}

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
            Update Ecosystem Data
          </button>
        </div>
      </form>
    </div>
  );
};

const EcosystemControl = () => {
  const [ecosystemData, setEcosystemData] = useState({
    registeredMembers: 0,
    startupsSupported: 0,
    mentorsOnBoard: 0,
    industrialPartnerships: 0,
    academicPartnerships: 0,
    industryConsultingProjects: 0,
    msmeSupport: 0,
    outreachInitiativesEvents: 0,
    numberOfStartups: 0,
    startupsGraduated: 0,
    employmentGenerated: 0,
    corpsFund: 0,
    csrSecured: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  
  const ecosystemFields = [
    {
      key: "registeredMembers",
      label: "Registered Members",
      icon: Users,
      description: "Total number of registered members",
      color: "bg-blue-100",
    },
    {
      key: "startupsSupported",
      label: "Start-ups Supported",
      icon: Rocket,
      description: "Number of startups supported",
      color: "bg-green-100",
    },
    {
      key: "mentorsOnBoard",
      label: "Mentors On-board",
      icon: MessageSquare,
      description: "Number of mentors available",
      color: "bg-purple-100",
    },
    {
      key: "industrialPartnerships",
      label: "Industrial Partnerships",
      icon: Building,
      description: "Number of industrial partnerships",
      color: "bg-orange-100",
    },
    {
      key: "academicPartnerships",
      label: "Academic Partnerships",
      icon: School,
      description: "Number of academic partnerships",
      color: "bg-indigo-100",
    },
    {
      key: "industryConsultingProjects",
      label: "Industry Consulting Projects",
      icon: FileText,
      description: "Number of consulting projects",
      color: "bg-teal-100",
    },
    {
      key: "msmeSupport",
      label: "MSMEs Supported",
      icon: Briefcase,
      description: "Number of MSMEs supported",
      color: "bg-pink-100",
    },
    {
      key: "outreachInitiativesEvents",
      label: "Outreach Initiatives Events",
      icon: Globe,
      description: "Number of outreach events",
      color: "bg-cyan-100",
    },
    {
      key: "numberOfStartups",
      label: "No. of Startups",
      icon: Rocket,
      description: "Total number of startups",
      color: "bg-green-100",
    },
    {
      key: "startupsGraduated",
      label: "Startups Graduated",
      icon: GraduationCap,
      description: "Number of graduated startups",
      color: "bg-yellow-100",
    },
    {
      key: "employmentGenerated",
      label: "Employment Generated",
      icon: Users,
      description: "Number of jobs created",
      color: "bg-blue-100",
    },
    {
      key: "corpsFund",
      label: "Corps Fund",
      icon: DollarSign,
      description: "Corps fund amount",
      color: "bg-green-100",
    },
    {
      key: "csrSecured",
      label: "CSR Secured",
      icon: Handshake,
      description: "CSR secured amount",
      color: "bg-purple-100",
    },
  ];

  useEffect(() => {
    fetchEcosystemData();
  }, []);

  const fetchEcosystemData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${api.web}api/v1/ecosystems/getEcosystemData`
      );
      if (response.data.success) {
        setEcosystemData(response.data.ecosystem);
      }
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch ecosystem data");
      setLoading(false);
      console.error(err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${api.web}api/v1/ecosystems/updateEcosystemData`,
        formData,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      if (response.data.success) {
        setMessage({
          text: "Ecosystem data updated successfully!",
          type: "success",
        });
        setShowForm(false);
        fetchEcosystemData();
        resetForm();
      }
    } catch (err) {
      setError("Failed to update ecosystem data");
      setMessage({
        text:
          err.response?.data?.message ||
          "Failed to update ecosystem data. Please try again.",
        type: "error",
      });
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({});
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] rounded-xl shadow-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/admin")}
              className=" left-6 top-6 flex items-center gap-2 px-3 py-2 text-white bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30 z-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Ecosystem Impact Management
              </h1>
              <p className="text-blue-100">
                Monitor and update your ecosystem statistics
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setShowForm(!showForm);
              setFormData(ecosystemData);
            }}
            className="px-6 py-3 bg-white text-[#3f6197] rounded-lg font-medium shadow-sm transition-colors duration-200 hover:bg-blue-50 flex items-center"
          >
            <Edit size={20} className="mr-2" />
            Update Data
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
            {message.text}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#3f6197]">
            Ecosystem Statistics
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3f6197]"></div>
          </div>
        ) : ecosystemFields.length === 0 ? (
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <TrendingUp size={48} className="mx-auto text-blue-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No ecosystem data available
            </h3>
            <p className="text-gray-500">
              Update your ecosystem statistics by clicking "Update Data"
            </p>
          </div>
        ) : (
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecosystemFields.map((field) => (
              <EcosystemCard
                key={field.key}
                field={field}
                value={ecosystemData[field.key] || 0}
                isEditing={false}
                onValueChange={() => {}}
              />
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={fetchEcosystemData}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full">
            <EcosystemForm
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

export default EcosystemControl;
