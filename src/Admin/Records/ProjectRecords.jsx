import React, { useState, useEffect } from 'react';
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
  Settings,
  Download,
  Upload,
  Eye
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import api from '../../Api/api';
import { showNotification, updateNotification } from '@mantine/notifications';
import * as XLSX from 'xlsx';

const PTUProjectForm = () => {
  const location = useLocation();
  const editMode = location.state && location.state.isEdit;
  const editRecord = location.state && location.state.record;

  const [showImportModal, setShowImportModal] = useState(false);
  const [importedData, setImportedData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
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
      emailId: '',
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Map Excel columns to form fields
        const mappedData = jsonData.map((row, index) => ({
          id: index,
          name: row['Name'] || row['name'] || "",
          registerNumber: row['Register Number'] || row['registerNumber'] || row['Registration Number'] || "",
          emailId: row['Email ID'] || row['emailId'] || row['Email'] || "",
          department: row['Department'] || row['department'] || "",
          yearOfStudy: row['Year of Study'] || row['yearOfStudy'] || row['Year'] || "",
          instituteName: row['Institute Name'] || row['instituteName'] || row['Institute'] || "",
          projectType: row['Project Type'] || row['projectType'] || "",
          otherProjectType: row['Other Project Type'] || row['otherProjectType'] || "",
          projectTitle: row['Project Title'] || row['projectTitle'] || "",
          labEquipmentUsage: row['Lab Equipment Usage'] || row['labEquipmentUsage'] || row['Equipment'] || "",
          projectDuration: row['Project Duration'] || row['projectDuration'] || row['Duration'] || "",
          projectGuideName: row['Project Guide Name'] || row['projectGuideName'] || row['Guide'] || "",
          projectMembers: row['Project Members'] ? (typeof row['Project Members'] === 'string' ? 
            row['Project Members'].split(';').map(member => {
              const parts = member.split(',');
              return {
                name: parts[0] || '',
                regNo: parts[1] || '',
                department: parts[2] || '',
                yearOfStudy: parts[3] || ''
              };
            }) : [{ name: '', regNo: '', department: '', yearOfStudy: '' }]) : 
            [{ name: '', regNo: '', department: '', yearOfStudy: '' }],
          components: row['Components'] ? (typeof row['Components'] === 'string' ? 
            row['Components'].split(',').map(comp => comp.trim()) : ['']) : [''],
          // Add validation flags
          hasErrors: false,
          errors: []
        }));

        // Validate data
        const validatedData = mappedData.map(record => {
          const errors = [];
          
          if (!record.name || record.name.trim() === '') {
            errors.push('Name is required');
          }
          
          if (!record.registerNumber || record.registerNumber.trim() === '') {
            errors.push('Register Number is required');
          }
          
          if (record.emailId && !/\S+@\S+\.\S+/.test(record.emailId)) {
            errors.push('Invalid email format');
          }
          
          if (!record.department || record.department.trim() === '') {
            errors.push('Department is required');
          }
          
          if (!record.yearOfStudy || record.yearOfStudy.trim() === '') {
            errors.push('Year of Study is required');
          }
          
          if (!record.instituteName || record.instituteName.trim() === '') {
            errors.push('Institute Name is required');
          }
          
          if (!record.projectTitle || record.projectTitle.trim() === '') {
            errors.push('Project Title is required');
          }
          
          if (!record.projectGuideName || record.projectGuideName.trim() === '') {
            errors.push('Project Guide Name is required');
          }

          return {
            ...record,
            hasErrors: errors.length > 0,
            errors
          };
        });

        setImportedData(validatedData);
        setSelectedRows(validatedData.filter(record => !record.hasErrors).map((_, index) => index));
        setShowImportModal(true);
        
        const errorCount = validatedData.filter(record => record.hasErrors).length;
        
        showNotification({
          title: "File Uploaded",
          message: `Successfully parsed ${validatedData.length} records from Excel file${errorCount > 0 ? `. ${errorCount} records have validation errors.` : ''}`,
          color: errorCount > 0 ? "orange" : "green",
          icon: <Check className="w-4 h-4" />,
          autoClose: 3000,
        });
      } catch (error) {
        showNotification({
          title: "Import Error",
          message: "Failed to parse Excel file. Please check the format.",
          color: "red",
          icon: <X className="w-4 h-4" />,
          autoClose: 3000,
        });
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleRowSelection = (index) => {
    setSelectedRows(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    const validIndices = importedData
      .map((record, index) => ({ record, index }))
      .filter(({ record }) => !record.hasErrors)
      .map(({ index }) => index);
      
    if (selectedRows.length === validIndices.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(validIndices);
    }
  };

  const handleImportSelected = async () => {
    const selectedData = importedData.filter((_, index) => selectedRows.includes(index));
    
    if (selectedData.length === 0) {
      showNotification({
        title: "No Selection",
        message: "Please select at least one record to import",
        color: "orange",
        icon: <X className="w-4 h-4" />,
        autoClose: 3000,
      });
      return;
    }

    showNotification({
      id: "bulk-import",
      title: "Importing Records",
      message: `Importing ${selectedData.length} records...`,
      color: "blue",
      loading: true,
      autoClose: false,
    });

    try {
      const promises = selectedData.map(record => {
        const cleanedRecord = { ...record };
        delete cleanedRecord.id;
        delete cleanedRecord.hasErrors;
        delete cleanedRecord.errors;
        
        return axios.post(`${api.web}api/v1/project/`, cleanedRecord, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
      });

      const results = await Promise.allSettled(promises);
      const successful = results.filter(result => result.status === 'fulfilled').length;
      const failed = results.filter(result => result.status === 'rejected').length;

      updateNotification({
        id: "bulk-import",
        title: "Import Complete",
        message: `Successfully imported ${successful} records. ${failed > 0 ? `${failed} records failed.` : ''}`,
        color: failed > 0 ? "orange" : "green",
        icon: <Check className="w-4 h-4" />,
        loading: false,
        autoClose: 3000,
      });

      setShowImportModal(false);
      setImportedData([]);
      setSelectedRows([]);
      
    } catch (error) {
      updateNotification({
        id: "bulk-import",
        title: "Import Failed",
        message: "Failed to import records. Please try again.",
        color: "red",
        icon: <X className="w-4 h-4" />,
        loading: false,
        autoClose: 3000,
      });
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        "Name": "John Doe",
        "Register Number": "REG001",
        "Email ID": "john.doe@example.com",
        "Department": "Computer Science",
        "Year of Study": "3rd Year",
        "Institute Name": "Puducherry Technological University",
        "Project Type": "MAJOR PROJECT",
        "Other Project Type": "",
        "Project Title": "AI-Based Traffic Management System",
        "Lab Equipment Usage": "Cameras, Sensors, Computing devices",
        "Project Duration": "6 months",
        "Project Guide Name": "Dr. Smith",
        "Project Members": "Jane Doe,REG002,Computer Science,3rd Year;Bob Smith,REG003,Computer Science,3rd Year",
        "Components": "Arduino Uno, Raspberry Pi, Camera Module"
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Project Template");
    
    // Auto-size columns
    const colWidths = Object.keys(templateData[0]).map(key => ({
      wch: Math.max(key.length, String(templateData[0][key]).length) + 2
    }));
    worksheet['!cols'] = colWidths;
    
    XLSX.writeFile(workbook, "Project_Import_Template.xlsx");
    
    showNotification({
      title: "Template Downloaded",
      message: "Excel template has been downloaded successfully",
      color: "green",
      icon: <Download className="w-4 h-4" />,
      autoClose: 3000,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          <div className="text-white relative bg-gradient-to-br from-[#3f6197] via-[#4a6fa5] to-[#5478b0] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>

            {/* Header Content */}
            <div className="relative z-10 px-6 py-8">
              {/* Top Row - Navigation and Actions */}
              <div className="flex justify-between items-center mb-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 px-4 py-2 text-white border border-white/30 rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white hover:shadow-lg hover:scale-105 backdrop-blur-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Back</span>
                </button>
                
                <div className="flex gap-3">
                  <button
                    onClick={downloadTemplate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/80 text-white border border-blue-400/50 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:scale-105 backdrop-blur-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span className="font-medium">Template</span>
                  </button>
                  <label className="flex items-center gap-2 px-4 py-2 bg-green-600/80 text-white border border-green-400/50 rounded-lg transition-all duration-300 hover:bg-green-600 hover:shadow-lg hover:scale-105 backdrop-blur-sm cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span className="font-medium">Import Excel</span>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Title Section */}
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
                  PROJECT DISCOVERY
                </h1>
                <div className="w-24 h-1 bg-white/60 mx-auto rounded-full"></div>
                <p className="text-white/80 mt-3 text-lg font-light">
                  Innovation & Research Management Portal
                </p>
              </div>
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
                    <Mail className="inline-block w-4 h-4 mr-2" />
                    EMAIL ID *
                  </label>
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
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
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter department name"
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
                      <input
                        type="text"
                        value={member.department}
                        onChange={(e) => updateProjectMember(index, 'department', e.target.value)}
                        placeholder="Enter department name"
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

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] text-white p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Import Confirmation</h2>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="mt-2">Review and select records to import ({importedData.length} records found)</p>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleSelectAll}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    <Check className="w-4 h-4" />
                    {(() => {
                      const validIndices = importedData
                        .map((record, index) => ({ record, index }))
                        .filter(({ record }) => !record.hasErrors)
                        .map(({ index }) => index);
                      return selectedRows.length === validIndices.length && validIndices.length > 0 ? 'Deselect All Valid' : 'Select All Valid';
                    })()}
                  </button>
                  <span className="text-sm text-gray-600">
                    {selectedRows.length} of {importedData.length} selected
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImportSelected}
                    disabled={selectedRows.length === 0}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Import Selected ({selectedRows.length})
                  </button>
                </div>
              </div>

              <div className="overflow-auto max-h-[60vh] border rounded">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="p-2 text-left border-b">
                        <input
                          type="checkbox"
                          checked={(() => {
                            const validIndices = importedData
                              .map((record, index) => ({ record, index }))
                              .filter(({ record }) => !record.hasErrors)
                              .map(({ index }) => index);
                            return selectedRows.length === validIndices.length && validIndices.length > 0;
                          })()}
                          onChange={handleSelectAll}
                          className="rounded"
                        />
                      </th>
                      <th className="p-2 text-left border-b">Name</th>
                      <th className="p-2 text-left border-b">Reg No</th>
                      <th className="p-2 text-left border-b">Email</th>
                      <th className="p-2 text-left border-b">Department</th>
                      <th className="p-2 text-left border-b">Year</th>
                      <th className="p-2 text-left border-b">Project Title</th>
                      <th className="p-2 text-left border-b">Project Type</th>
                      <th className="p-2 text-left border-b">Status</th>
                      <th className="p-2 text-left border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importedData.map((record, index) => (
                      <tr key={index} className={`border-b hover:bg-gray-50 ${selectedRows.includes(index) ? 'bg-blue-50' : ''} ${record.hasErrors ? 'bg-red-50' : ''}`}>
                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(index)}
                            onChange={() => handleRowSelection(index)}
                            disabled={record.hasErrors}
                            className="rounded"
                          />
                        </td>
                        <td className="p-2 font-medium">{record.name || '-'}</td>
                        <td className="p-2">{record.registerNumber || '-'}</td>
                        <td className="p-2">{record.emailId || '-'}</td>
                        <td className="p-2">{record.department || '-'}</td>
                        <td className="p-2">{record.yearOfStudy || '-'}</td>
                        <td className="p-2 max-w-xs truncate" title={record.projectTitle}>{record.projectTitle || '-'}</td>
                        <td className="p-2">{record.projectType || '-'}</td>
                        <td className="p-2">
                          {record.hasErrors ? (
                            <div className="flex items-center gap-1">
                              <X className="w-4 h-4 text-red-500" />
                              <span className="text-red-600 text-xs" title={record.errors.join(', ')}>
                                {record.errors.length} error{record.errors.length > 1 ? 's' : ''}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-green-600 text-xs">Valid</span>
                            </div>
                          )}
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => {
                              // Set form data for preview
                              setFormData(record);
                              setShowImportModal(false);
                            }}
                            className="text-blue-500 hover:text-blue-700 mr-2"
                            title="Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setImportedData(prev => prev.filter((_, i) => i !== index));
                              setSelectedRows(prev => prev.filter(i => i !== index).map(i => i > index ? i - 1 : i));
                            }}
                            className="text-red-500 hover:text-red-700"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {importedData.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No data to display
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Import Summary:</h4>
                  <div className="flex gap-4 text-xs">
                    <span className="text-green-600">
                      ✓ Valid: {importedData.filter(r => !r.hasErrors).length}
                    </span>
                    <span className="text-red-600">
                      ✗ Invalid: {importedData.filter(r => r.hasErrors).length}
                    </span>
                    <span className="text-blue-600">
                      📋 Selected: {selectedRows.length}
                    </span>
                  </div>
                </div>
                <h4 className="font-medium mb-2">Excel Column Mapping:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  <div><strong>Name:</strong> "Name" or "name"</div>
                  <div><strong>Register Number:</strong> "Register Number" or "registerNumber"</div>
                  <div><strong>Email ID:</strong> "Email ID" or "emailId"</div>
                  <div><strong>Department:</strong> "Department" or "department"</div>
                  <div><strong>Year of Study:</strong> "Year of Study" or "yearOfStudy"</div>
                  <div><strong>Project Title:</strong> "Project Title" or "projectTitle"</div>
                  <div><strong>Project Type:</strong> "Project Type" or "projectType"</div>
                  <div><strong>Guide:</strong> "Project Guide Name" or "projectGuideName"</div>
                  <div><strong>Members:</strong> "Project Members" (format: Name,RegNo,Dept,Year;...)</div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  <p><strong>Note:</strong> Project Members should be formatted as: "Name1,RegNo1,Dept1,Year1;Name2,RegNo2,Dept2,Year2"</p>
                  <p><strong>Components:</strong> Separate multiple components with commas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PTUProjectForm;