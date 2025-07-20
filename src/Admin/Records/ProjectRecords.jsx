import React, { useState } from 'react';
import {
  Camera,
  Calendar,
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
  Heart,
  Home,
  ArrowLeft,
  Check,
  X,
  Plus,
  Trash2,
  Users,
  Settings
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import api from '../../Api/api';
import { showNotification, updateNotification } from '@mantine/notifications';

const PTUProjectForm = () => {
  const location = useLocation();
  const editMode = location.state && location.state.isEdit;
  const editRecord = location.state && location.state.record;

  const [isValidUserId, setIsValidUserId] = useState(null);
  let debounceTimeout;

  const [formData, setFormData] = useState(() => {
    if (editMode && editRecord) {
      return {
        ...editRecord,
        projectMembers: editRecord.projectMembers && editRecord.projectMembers.length > 0 ? editRecord.projectMembers : [{ name: '', regNo: '', department: '', yearOfStudy: '' }],
        components: editRecord.components && editRecord.components.length > 0 ? editRecord.components : ['']
      };
    }
    return {
      name: '',
      registerNumber: '',
      userId: '',
      department: '',
      yearOfStudy: '',
      instituteName: '',
      projectType: '',
      otherProjectType: '',
      projectTitle: '',
      labEquipmentUsage: '',
      projectDuration: '',
      projectGuideName: '',
      projectMembers: [
        { name: '', regNo: '', department: '', yearOfStudy: '' }
      ],
      components: ['']
    };
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === "userId") {
      setIsValidUserId(null);
      clearTimeout(debounceTimeout);
      if (value === "") {
        setIsValidUserId(null);
        return;
      }
      debounceTimeout = setTimeout(() => {
        axios
          .get(`${api.web}api/v1/validUserId/${value}`)
          .then((response) => {
            setIsValidUserId(response.data.success);
          })
          .catch(() => {
            setIsValidUserId(false);
          });
      }, 500);
    }
  };

  const addProjectMember = () => {
    setFormData(prev => ({
      ...prev,
      projectMembers: [...prev.projectMembers, { name: '', regNo: '', department: '', yearOfStudy: '' }]
    }));
  };

  const removeProjectMember = (index) => {
    setFormData(prev => ({
      ...prev,
      projectMembers: prev.projectMembers.filter((_, i) => i !== index)
    }));
  };

  const updateProjectMember = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      projectMembers: prev.projectMembers.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const addComponent = () => {
    setFormData(prev => ({
      ...prev,
      components: [...prev.components, '']
    }));
  };

  const removeComponent = (index) => {
    setFormData(prev => ({
      ...prev,
      components: prev.components.filter((_, i) => i !== index)
    }));
  };

  const updateComponent = (index, value) => {
    setFormData(prev => ({
      ...prev,
      components: prev.components.map((comp, i) => i === index ? value : comp)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidUserId === false) {
      showNotification({
        id: "form-error",
        title: "Form Error",
        message: "Please enter a valid User ID or remove it.",
        color: "red",
        icon: <X className="w-4 h-4" />, 
        autoClose: 3000,
      });
      return;
    }
    showNotification({
      id: "project-form-submission",
      title: "Form Submission",
      message: editMode ? "Updating project record..." : "Project record submitting...",
      color: "blue",
      loading: true,
      autoClose: false,
    });
    if (editMode && editRecord && (editRecord._id || editRecord.projectId)) {
      const id = editRecord._id || editRecord.projectId;
      console.log("Updating project via PUT:", id, formData);
      axios
        .put(`${api.web}api/v1/project/${id}`, formData, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          updateNotification({
            id: "project-form-submission",
            title: "Success",
            message: "Project record updated successfully!",
            color: "green",
            icon: <Check className="w-4 h-4" />, 
            loading: false,
            autoClose: 3000,
          });
          navigate("/admin/projectRecordsData");
        })
        .catch((error) => {
          updateNotification({
            id: "project-form-submission",
            title: "Error",
            message:
              error.response?.data?.message ||
              "Failed to update project record.",
            color: "red",
            icon: <X className="w-4 h-4" />, 
            loading: false,
            autoClose: 3000,
          });
        });
    } else {
      const dataToSend = { ...formData };
      delete dataToSend._id;
      delete dataToSend.__v;
      axios
        .post(`${api.web}api/v1/project/`, dataToSend, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          updateNotification({
            id: "project-form-submission",
            title: "Success",
            message: "Project record added successfully!",
            color: "green",
            icon: <Check className="w-4 h-4" />, 
            loading: false,
            autoClose: 3000,
          });
          navigate("/admin/projectRecordsData");
        })
        .catch((error) => {
          updateNotification({
            id: "project-form-submission",
            title: "Error",
            message:
              error.response?.data?.message ||
              "Failed to add project record.",
            color: "red",
            icon: <X className="w-4 h-4" />, 
            loading: false,
            autoClose: 3000,
          });
        });
    }
  };

  const inputFocusStyle = {
    borderColor: "#3f6197",
    boxShadow: `0 0 0 2px rgba(63, 97, 151, 0.2)`,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="text-white relative p-6 bg-gradient-to-r from-[#3f6197] to-[#5478b0]">
            <h1 className="text-3xl font-bold text-center">PROJECT DISCOVERY APPLICATION</h1>
            <div className="absolute top-[50%] translate-y-[-50%] left-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 text-white border border-white rounded-lg transition-all duration-200 hover:shadow-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Institution Information */}
            <div className="mb-8">
              <div className="border-2 border-gray-300 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">
                  Institution Information
                </h2>
                <p className="text-base text-gray-700 mb-1 font-medium">Puducherry Technological University</p>
                <p className="text-sm text-blue-700 mb-4 font-semibold">
                  Supported by Atal Innovation Mission (AIM), NITI Aayog, Govt. of India
                </p>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: "#3f6197" }}>
                  PERSONAL INFORMATION
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline-block w-4 h-4 mr-2" />
                    NAME *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200"
                    onFocus={(e) =>
                      Object.assign(e.target.style, inputFocusStyle)
                    }
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline-block w-4 h-4 mr-2" />
                    USER ID
                  </label>
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none transition-all duration-200 ${isValidUserId === false ? 'border-red-500' : 'border-gray-300'}`}
                    onFocus={(e) =>
                      Object.assign(e.target.style, inputFocusStyle)
                    }
                    onBlur={(e) => {
                      e.target.style.borderColor = isValidUserId === false ? '#ef4444' : '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  {isValidUserId === false && (
                    <span className="text-xs text-red-600">Invalid User ID</span>
                  )}
                  {isValidUserId === true && (
                    <span className="text-xs text-green-600">Valid User ID</span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="inline-block w-4 h-4 mr-2" />
                    REGISTER NUMBER *
                  </label>
                  <input
                    type="text"
                    name="registerNumber"
                    value={formData.registerNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200"
                    onFocus={(e) =>
                      Object.assign(e.target.style, inputFocusStyle)
                    }
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Settings className="inline-block w-4 h-4 mr-2" />
                    DEPARTMENT *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200"
                    onFocus={(e) =>
                      Object.assign(e.target.style, inputFocusStyle)
                    }
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics & Communication">Electronics & Communication</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Chemical">Chemical</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline-block w-4 h-4 mr-2" />
                    YEAR OF STUDY *
                  </label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200"
                    onFocus={(e) =>
                      Object.assign(e.target.style, inputFocusStyle)
                    }
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Final Year">Final Year</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Home className="inline-block w-4 h-4 mr-2" />
                    INSTITUTE NAME *
                  </label>
                  <input
                    type="text"
                    name="instituteName"
                    value={formData.instituteName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200"
                    onFocus={(e) =>
                      Object.assign(e.target.style, inputFocusStyle)
                    }
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Project Information Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-6" style={{ color: "#3f6197" }}>
                PROJECT INFORMATION
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Settings className="inline-block w-4 h-4 mr-2" />
                    PROJECT TYPE *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="projectType"
                        value="MINI PROJECT"
                        checked={formData.projectType === 'MINI PROJECT'}
                        onChange={handleInputChange}
                        className="mr-2"
                        style={{ accentColor: "#3f6197" }}
                      />
                      <span>Mini Project</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="projectType"
                        value="MAJOR PROJECT"
                        checked={formData.projectType === 'MAJOR PROJECT'}
                        onChange={handleInputChange}
                        className="mr-2"
                        style={{ accentColor: "#3f6197" }}
                      />
                      <span>Major Project</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="projectType"
                        value="OTHERS"
                        checked={formData.projectType === 'OTHERS'}
                        onChange={handleInputChange}
                        className="mr-2"
                        style={{ accentColor: "#3f6197" }}
                      />
                      <span>Others</span>
                    </label>
                  </div>
                  {formData.projectType === 'OTHERS' && (
                    <input
                      type="text"
                      name="otherProjectType"
                      value={formData.otherProjectType}
                      onChange={handleInputChange}
                      placeholder="Please specify..."
                      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200"
                      onFocus={(e) =>
                        Object.assign(e.target.style, inputFocusStyle)
                      }
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="inline-block w-4 h-4 mr-2" />
                    PROJECT TITLE *
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200"
                    onFocus={(e) =>
                      Object.assign(e.target.style, inputFocusStyle)
                    }
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Settings className="inline-block w-4 h-4 mr-2" />
                      LAB / EQUIPMENT USAGE
                    </label>
                    <textarea
                      name="labEquipmentUsage"
                      value={formData.labEquipmentUsage}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200 resize-none"
                      onFocus={(e) =>
                        Object.assign(e.target.style, inputFocusStyle)
                      }
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline-block w-4 h-4 mr-2" />
                      PROJECT DURATION
                    </label>
                    <input
                      type="text"
                      name="projectDuration"
                      value={formData.projectDuration}
                      onChange={handleInputChange}
                      placeholder="e.g., 6 months"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200"
                      onFocus={(e) =>
                        Object.assign(e.target.style, inputFocusStyle)
                      }
                      onBlur={(e) => {
                        e.target.style.borderColor = "#d1d5db";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline-block w-4 h-4 mr-2" />
                    PROJECT GUIDE NAME *
                  </label>
                  <input
                    type="text"
                    name="projectGuideName"
                    value={formData.projectGuideName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200"
                    onFocus={(e) =>
                      Object.assign(e.target.style, inputFocusStyle)
                    }
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Project Members Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold" style={{ color: "#3f6197" }}>
                  PROJECT MEMBERS
                </h2>
                <button
                  type="button"
                  onClick={addProjectMember}
                  className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 shadow-md transition-all font-semibold"
                >
                  <Plus size={18} className="mr-2" />
                  Add Member
                </button>
              </div>
              {formData.projectMembers.map((member, index) => (
                <div key={index} className="border-2 border-gray-300 rounded-lg p-6 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-gray-700">Member {index + 1}</span>
                    {formData.projectMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProjectMember(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="inline-block w-4 h-4 mr-2" />
                        NAME
                      </label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateProjectMember(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200"
                        onFocus={(e) =>
                          Object.assign(e.target.style, inputFocusStyle)
                        }
                        onBlur={(e) => {
                          e.target.style.borderColor = "#d1d5db";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FileText className="inline-block w-4 h-4 mr-2" />
                        REGISTER NUMBER
                      </label>
                      <input
                        type="text"
                        value={member.regNo}
                        onChange={(e) => updateProjectMember(index, 'regNo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200"
                        onFocus={(e) =>
                          Object.assign(e.target.style, inputFocusStyle)
                        }
                        onBlur={(e) => {
                          e.target.style.borderColor = "#d1d5db";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Settings className="inline-block w-4 h-4 mr-2" />
                        DEPARTMENT
                      </label>
                      <select
                        value={member.department}
                        onChange={(e) => updateProjectMember(index, 'department', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200"
                        onFocus={(e) =>
                          Object.assign(e.target.style, inputFocusStyle)
                        }
                        onBlur={(e) => {
                          e.target.style.borderColor = "#d1d5db";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        <option value="">Select Department</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics & Communication">Electronics & Communication</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Chemical">Chemical</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline-block w-4 h-4 mr-2" />
                        YEAR OF STUDY
                      </label>
                      <select
                        value={member.yearOfStudy}
                        onChange={(e) => updateProjectMember(index, 'yearOfStudy', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200"
                        onFocus={(e) =>
                          Object.assign(e.target.style, inputFocusStyle)
                        }
                        onBlur={(e) => {
                          e.target.style.borderColor = "#d1d5db";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        <option value="">Select Year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Final Year">Final Year</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Components Required Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold" style={{ color: "#3f6197" }}>
                  COMPONENTS / BOARDS REQUIRED
                </h2>
                <button
                  type="button"
                  onClick={addComponent}
                  className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 shadow-md transition-all font-semibold"
                >
                  <Plus size={18} className="mr-2" />
                  Add Component
                </button>
              </div>
              {formData.components.map((component, index) => (
                <div key={index} className="flex items-center mb-4">
                  <span className="text-sm font-medium text-gray-700 mr-4 w-8">
                    {index + 1}.
                  </span>
                  <input
                    type="text"
                    value={component}
                    onChange={(e) => updateComponent(index, e.target.value)}
                    placeholder="Enter component name..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200"
                    onFocus={(e) =>
                      Object.assign(e.target.style, inputFocusStyle)
                    }
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  {formData.components.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeComponent(index)}
                      className="ml-3 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-8 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                style={{ backgroundColor: "#3f6197" }}
              >
                {editMode ? "Update Project Application" : "Submit Project Application"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PTUProjectForm;