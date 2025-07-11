import React, { useState } from "react";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    mobileNo: "",
    communicationAddress: "",
    emailId: "",
    passportExpiry: "",
    maritalStatus: "single",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission logic here
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
            <h1 className="text-3xl font-bold text-center">INTERN PROFILE</h1>
            <div className="absolute top-[50%] translate-y-[-50%] left-4">
              <button
                type="button"
                onClick={() => navigate("/admin/internshipRecordsData")}
                className="flex items-center gap-2 px-4 py-2 text-white border border-white rounded-lg transition-all duration-200 hover:shadow-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Records
              </button>
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
                      value={formData.internNo}
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
                <div className="border-2 border-gray-300 rounded-lg p-4 w-32 h-40 flex flex-col items-center justify-center bg-gray-50">
                  <Camera className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500 text-center">
                    Affix one
                    <br />
                    Passport Size
                    <br />
                    Photograph
                  </p>
                </div>
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
                    name="mobileNo"
                    value={formData.mobileNo}
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
                  name="passportExpiry"
                  value={formData.passportExpiry}
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
    </div>
  );
};

export default InternshipRecords;
