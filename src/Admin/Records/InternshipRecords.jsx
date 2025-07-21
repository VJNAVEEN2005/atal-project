import React, { useEffect, useState } from "react";
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
  Download,
  Upload,
  Eye,
  Trash2,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../Api/api";
import { showNotification, updateNotification } from "@mantine/notifications";
import * as XLSX from 'xlsx';

const InternshipRecords = () => {
  const [formData, setFormData] = useState({
    internNo: "",
    dateOfJoining: "",
    designation: "",
    name: "",
    userId: "",
    dateOfBirth: "",
    fatherName: "",
    bloodGroup: "",
    permanentAddress: "",
    phoneNumber: "",
    communicationAddress: "",
    emailId: "",
    dateOfExpiry: "",
    maritalStatus: "single",
  });
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isValidUserId, setIsValidUserId] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importedData, setImportedData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  useEffect(() => {
    if (location.state && location.state.isEdit) {
      setFormData(location.state.record);
      setIsEdit(true);
    }
  }, []);

  let debounceTimeout;

  useEffect(() => {
    // Clear previous timer if user types quickly
    clearTimeout(debounceTimeout);

    // Set null when input is empty
    if (formData.userId === "") {
      setIsValidUserId(null);
      return;
    }

    // Debounce API call
    debounceTimeout = setTimeout(() => {
      console.log("Checking user ID:", formData.userId);
      axios
        .get(`${api.web}api/v1/validUserId/${formData.userId}`)
        .then((response) => {
          setIsValidUserId(response.data.success);
        })
        .catch(() => {
          setIsValidUserId(false);
        });
    }, 500); // adjust delay as needed (500ms is common)

    return () => clearTimeout(debounceTimeout);
  }, [formData.userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
          internNo: row['Intern No'] || row['internNo'] || "",
          dateOfJoining: row['Date of Joining'] || row['dateOfJoining'] || "",
          designation: row['Designation'] || row['designation'] || "",
          name: row['Name'] || row['name'] || "",
          userId: row['User ID'] || row['userId'] || "",
          dateOfBirth: row['Date of Birth'] || row['dateOfBirth'] || "",
          fatherName: row["Father's Name"] || row['fatherName'] || "",
          bloodGroup: row['Blood Group'] || row['bloodGroup'] || "",
          permanentAddress: row['Permanent Address'] || row['permanentAddress'] || "",
          phoneNumber: row['Phone Number'] || row['phoneNumber'] || row['Mobile No'] || "",
          communicationAddress: row['Communication Address'] || row['communicationAddress'] || "",
          emailId: row['Email ID'] || row['emailId'] || "",
          dateOfExpiry: row['Date of Expiry'] || row['dateOfExpiry'] || "",
          maritalStatus: row['Marital Status'] || row['maritalStatus'] || "single",
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
          
          if (record.emailId && !/\S+@\S+\.\S+/.test(record.emailId)) {
            errors.push('Invalid email format');
          }
          
          if (record.phoneNumber && !/^\d{10}$/.test(record.phoneNumber.replace(/\D/g, ''))) {
            errors.push('Invalid phone number (should be 10 digits)');
          }
          
          if (record.dateOfJoining && isNaN(new Date(record.dateOfJoining))) {
            errors.push('Invalid date of joining format');
          }
          
          if (record.dateOfBirth && isNaN(new Date(record.dateOfBirth))) {
            errors.push('Invalid date of birth format');
          }
          
          if (record.dateOfExpiry && isNaN(new Date(record.dateOfExpiry))) {
            errors.push('Invalid date of expiry format');
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
      const promises = selectedData.map(record => 
        axios.post(`${api.web}api/v1/internship`, record, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
      );

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
        "Intern No": "AIC-PECF/INT-001",
        "Date of Joining": "2025-01-15",
        "Designation": "Software Intern",
        "Name": "John Doe",
        "User ID": "JD001",
        "Date of Birth": "2000-05-10",
        "Father's Name": "Robert Doe",
        "Blood Group": "O+",
        "Permanent Address": "123 Main Street, City, State, 12345",
        "Phone Number": "9876543210",
        "Communication Address": "456 College St, City, State, 12345",
        "Email ID": "john.doe@example.com",
        "Date of Expiry": "2025-07-15",
        "Marital Status": "single"
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Internship Template");
    
    // Auto-size columns
    const colWidths = Object.keys(templateData[0]).map(key => ({
      wch: Math.max(key.length, String(templateData[0][key]).length) + 2
    }));
    worksheet['!cols'] = colWidths;
    
    XLSX.writeFile(workbook, "Internship_Import_Template.xlsx");
    
    showNotification({
      title: "Template Downloaded",
      message: "Excel template has been downloaded successfully",
      color: "green",
      icon: <Download className="w-4 h-4" />,
      autoClose: 3000,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
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
      id: "form-submission",
      title: "Form Submission",
      message: "Intern profile submitting...",
      color: "blue",
      loading: true,
      autoClose: false,
    });

    if (isEdit) {
      console.log("Editing existing record");
      axios
        .put(`${api.web}api/v1/internship/${formData._id}`, formData, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          updateNotification({
            id: "form-submission",
            title: "Form Submission",
            message: "Intern profile updated successfully!",
            color: "green",
            icon: <Check className="w-4 h-4" />,
            loading: false,
            autoClose: 3000,
          });
          navigate("/admin/internshipRecordsData");
        })
        .catch((error) => {
          console.error("There was an error submitting the form!", error);
          updateNotification({
            id: "form-submission",
            title: "Form Submission",
            message:
              error.response?.data?.message ||
              "Failed to update intern profile.",
            color: "red",
            icon: <X className="w-4 h-4" />,
            loading: false,
            autoClose: 3000,
          });
        });
      return;
    } else {
      axios
        .post(`${api.web}api/v1/internship`, formData, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          updateNotification({
            id: "form-submission",
            title: "Form Submission",
            message: "Intern profile submitted successfully!",
            color: "green",
            icon: <Check className="w-4 h-4" />,
            loading: false,
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.error("There was an error submitting the form!", error);
          updateNotification({
            id: "form-submission",
            title: "Form Submission",
            message:
              error.response?.data?.message ||
              "Failed to submit intern profile.",

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
                  onClick={() => navigate("/admin/internshipRecordsData")}
                  className="flex items-center gap-2 px-4 py-2 text-white border border-white/30 rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white hover:shadow-lg hover:scale-105 backdrop-blur-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-medium">Back to Records</span>
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
                  INTERN PROFILE
                </h1>
                <div className="w-24 h-1 bg-white/60 mx-auto rounded-full"></div>
                <p className="text-white/80 mt-3 text-lg font-light">
                  Internship Management & Records Portal
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Office Information Section */}
            <div className="mb-8">
              <div className="border-2 border-gray-300 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">
                  To Be Filled In By Office
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileText className="inline-block w-4 h-4 mr-2" />
                      INTERN NO
                    </label>
                    <input
                      type="text"
                      name="internNo"
                      value={formData.internNo || "AIC-PECF/INT-"}
                      onChange={handleInputChange}
                      placeholder="AIC-PECF/INT-"
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
                      DATE OF JOINING
                    </label>
                    <input
                      type="date"
                      name="dateOfJoining"
                      value={formData.dateOfJoining}
                      onChange={handleInputChange}
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
                      DESIGNATION
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
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
            </div>

            {/* Personal Information Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: "#3f6197" }}>
                  PERSONAL INFORMATION
                </h2>
                {/* <div className="border-2 border-gray-300 rounded-lg p-4 w-32 h-40 flex flex-col items-center justify-center bg-gray-50">
                  <Camera className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500 text-center">
                    Affix one
                    <br />
                    Passport Size
                    <br />
                    Photograph
                  </p>
                </div> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline-block w-4 h-4 mr-2" />
                    NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
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
                    DATE OF BIRTH
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
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
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline-block w-4 h-4 mr-2" />
                    USER ID
                  </label>
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200"
                    onFocus={(e) =>
                      Object.assign(e.target.style, inputFocusStyle)
                    }
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    {isValidUserId === false && (
                      <p className="text-red-500 text-xs mt-1">
                        Invalid User ID
                      </p>
                    )}
                    {isValidUserId === true && (
                      <p className="text-green-500 text-xs mt-1">
                        Valid User ID
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline-block w-4 h-4 mr-2" />
                    FATHER'S NAME
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
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
                    <Heart className="inline-block w-4 h-4 mr-2" />
                    BLOOD GROUP
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none transition-all duration-200 "
                    onFocus={(e) =>
                      Object.assign(e.target.style, inputFocusStyle)
                    }
                    onBlur={(e) => {
                      e.target.style.borderColor = "#d1d5db";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="" disabled selected>
                      Select Blood Group
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Home className="inline-block w-4 h-4 mr-2" />
                    PERMANENT ADDRESS
                  </label>
                  <textarea
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleInputChange}
                    rows="3"
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
                    <Phone className="inline-block w-4 h-4 mr-2" />
                    MOBILE NO
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
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
                    <MapPin className="inline-block w-4 h-4 mr-2" />
                    ADDRESS OF COMMUNICATION
                  </label>
                  <textarea
                    name="communicationAddress"
                    value={formData.communicationAddress}
                    onChange={handleInputChange}
                    rows="3"
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
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline-block w-4 h-4 mr-2" />
                  E-MAIL ID
                </label>
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleInputChange}
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
                  DATE OF EXPIRY
                </label>
                <input
                  type="date"
                  name="dateOfExpiry"
                  value={formData.dateOfExpiry}
                  onChange={handleInputChange}
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MARITAL STATUS
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="married"
                      checked={formData.maritalStatus === "married"}
                      onChange={handleInputChange}
                      className="mr-2"
                      style={{ accentColor: "#3f6197" }}
                    />
                    Married
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="maritalStatus"
                      value="single"
                      checked={formData.maritalStatus === "single"}
                      onChange={handleInputChange}
                      className="mr-2"
                      style={{ accentColor: "#3f6197" }}
                    />
                    Single
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                style={{
                  backgroundColor: "#3f6197",
                }}
              >
                Submit Intern Profile
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
                      <th className="p-2 text-left border-b">User ID</th>
                      <th className="p-2 text-left border-b">Designation</th>
                      <th className="p-2 text-left border-b">Email</th>
                      <th className="p-2 text-left border-b">Phone</th>
                      <th className="p-2 text-left border-b">Date of Joining</th>
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
                        <td className="p-2">{record.userId || '-'}</td>
                        <td className="p-2">{record.designation || '-'}</td>
                        <td className="p-2">{record.emailId || '-'}</td>
                        <td className="p-2">{record.phoneNumber || '-'}</td>
                        <td className="p-2">{record.dateOfJoining || '-'}</td>
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
                  <div><strong>Intern No:</strong> "Intern No" or "internNo"</div>
                  <div><strong>Name:</strong> "Name" or "name"</div>
                  <div><strong>User ID:</strong> "User ID" or "userId"</div>
                  <div><strong>Designation:</strong> "Designation" or "designation"</div>
                  <div><strong>Email:</strong> "Email ID" or "emailId"</div>
                  <div><strong>Phone:</strong> "Phone Number", "phoneNumber", or "Mobile No"</div>
                  <div><strong>Date of Joining:</strong> "Date of Joining" or "dateOfJoining"</div>
                  <div><strong>Date of Birth:</strong> "Date of Birth" or "dateOfBirth"</div>
                  <div><strong>Father's Name:</strong> "Father's Name" or "fatherName"</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipRecords;
