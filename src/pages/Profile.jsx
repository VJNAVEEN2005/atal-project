import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/api";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Component for displaying information in view mode
const Field = ({ label, value }) => (  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 border-b border-gray-100">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="md:col-span-2 text-gray-800">
      {value || "Not provided"}
    </span>
  </div>
);

// Information card component
const InfoCard = ({ title, children, isLoading }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6">
    <h3 className="text-xl font-semibold text-[#3f6197] mb-4">
      {isLoading ? <Skeleton width={150} /> : title}
    </h3>
    <div className="space-y-4">{children}</div>
  </div>
);

// Skeleton version of Field component
const SkeletonField = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 border-b border-gray-100">
    <span className="text-gray-600 font-medium"><Skeleton width={100} /></span>
    <span className="md:col-span-2 text-gray-800"><Skeleton width={200} /></span>
  </div>
);

// Input field component for edit mode
const InputField = ({ label, name, value, type = "text", required = false, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
      required={required}
    />
  </div>
);

// ProfilePhoto component
const ProfilePhoto = ({ photoUrl, photoPreview, handlePhotoChange, handlePhotoDelete, isEditing, isLoading }) => (
  <div className="mb-4 md:mb-0 md:mr-6">
    <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center border-4 border-[#3f6197]">
      {isLoading ? (
        <Skeleton circle width={128} height={128} />
      ) : photoPreview ? (
        <img
          src={photoPreview}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : photoUrl ? (
        <img
          src={photoUrl}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      )}
    </div>
    {isEditing && !isLoading && (
      <div className="mt-4">
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
        />
        <p className="text-gray-500 text-sm mt-1">
          Upload a square image for best results
        </p>
        {(photoUrl || photoPreview) && (
          <button
            onClick={handlePhotoDelete}
            type="button"
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Remove Photo
          </button>
        )}
      </div>
    )}
  </div>
);

// Main Profile component
const Profile = () => {
  const initialProfileData = {
    name: "",
    email: "",
    phoneNumber: "",
    organizationName: "",
    organizationSize: "",
    sector: "",
    founderName: "",
    founderWhatsApp: "",
    representativeName: "",
    representativeDesignation: "",
    representativeWhatsApp: "",
    dpiitNumber: "",
    womenLed: "",
    panNumber: "",
    gstNumber: "",
    address: "",
    cityStatePostal: "",
    productDescription: "",
    businessType: "",
    websiteUrl: "",
    displayProduct: "",
  };

  const [profileData, setProfileData] = useState(initialProfileData);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(0);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Load user authentication data from localStorage
  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAuthenticated") || 0);
    setUserId(localStorage.getItem("user_id"));
  }, []);

  // Fetch user data
  useEffect(() => {
    if (!userId) return;
    
    setIsLoading(true);
    
    // Fetch user data from API
    axios
      .post(`${api.web}api/v1/getUser`, { _id: userId })
      .then((res) => {
        if (res.data.success) {
          setProfileData(res.data.user);
          // Check if user has a profile photo
          if (res.data.user._id) {
            // Set photo URL with a timestamp to prevent caching
            setPhotoUrl(`${api.web}api/v1/profileImage/${res.data.user._id}?t=${new Date().getTime()}`);
          }
        } else {
          setError("Error fetching user data");
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load profile data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  // Handle logout
  const handleLogout = useCallback(() => {
    localStorage.removeItem("user_isLogin");
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  }, []);

  // Handle admin panel navigation
  const handleAdminAccess = useCallback(() => {
    navigate("/admin");
  }, [navigate]);

  // Handle photo upload
  const handlePhotoChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Size validation
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }
    
    // Type validation
    if (!file.type.match(/image\/(jpeg|jpg|png|gif)/i)) {
      alert("Only image files (JPG, PNG, GIF) are allowed.");
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
      setPhotoFile(file);
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle photo delete
  const handlePhotoDelete = useCallback(() => {
    if (window.confirm("Are you sure you want to remove your profile photo?")) {
      axios
        .post(`${api.web}api/v1/deleteProfileImage`, { _id: userId })
        .then((res) => {
          if (res.data.success) {
            setPhotoPreview(null);
            setPhotoFile(null);
            setPhotoUrl(null);
            alert("Profile photo deleted successfully!");
          } else {
            alert("Error deleting profile photo: " + res.data.message);
          }
        })
        .catch((err) => {
          console.error("API Error:", err);
          alert("Failed to delete profile photo");
        });
    }
  }, [userId]);

  // Handle form input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Upload profile photo
  const uploadProfilePhoto = useCallback(async () => {
    if (!photoFile) return null;
    
    const formData = new FormData();
    formData.append("profilePhoto", photoFile);
    formData.append("_id", userId);
    
    try {
      const response = await axios.post(
        `${api.web}api/v1/uploadProfileImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (response.data.success) {
        // Update the photo URL with a timestamp to prevent caching
        setPhotoUrl(`${api.web}api/v1/profileImage/${userId}?t=${new Date().getTime()}`);
        setPhotoPreview(null);
        return true;
      } else {
        alert("Error uploading profile photo: " + response.data.message);
        return false;
      }
    } catch (err) {
      console.error("API Error:", err.message);
      alert("Failed to upload profile photo");
      return false;
    }
  }, [photoFile, userId]);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // First handle profile photo upload if there is a new photo
    if (photoFile) {
      const photoUploaded = await uploadProfilePhoto();
      if (!photoUploaded) {
        // If photo upload failed, don't proceed with profile update
        return;
      }
    }
    
    // Then update other profile data
    axios.post(`${api.web}api/v1/updateUser`, profileData)
      .then(response => {
        if (response.data.success) {
          setIsEditing(false);
          alert("Profile updated successfully!");
        } else {
          alert("Error updating profile: " + response.data.message);
        }
      })
      .catch(error => {
        console.error("API Error:", error);
        alert("Error updating profile: " + error.message);
      });
  }, [profileData, photoFile, uploadProfilePhoto]);

  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    setIsEditing(prev => !prev);
    // Reset photo preview when canceling edit
    if (isEditing) {
      setPhotoPreview(null);
      setPhotoFile(null);
    }
  }, [isEditing]);

  // Skeleton Loading UI
  const renderSkeletonView = () => (
    <>
      {/* Profile Header with Photo */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center">
        <ProfilePhoto isLoading={true} />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            <Skeleton width={200} />
          </h2>
          <p className="text-gray-600"><Skeleton width={150} /></p>
          <p className="text-gray-600"><Skeleton width={120} /></p>
          <p className="mt-2 text-[#3f6197] font-semibold">
            <Skeleton width={180} />
          </p>
        </div>
      </div>

      {/* Skeleton Cards */}
      <InfoCard title="Personal Information" isLoading={true}>
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
      </InfoCard>

      <InfoCard title="Organization Details" isLoading={true}>
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
      </InfoCard>

      <InfoCard title="Contact Information" isLoading={true}>
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
      </InfoCard>

      <InfoCard title="Business Information" isLoading={true}>
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
      </InfoCard>
    </>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <div className="text-red-500 text-xl py-8">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#3f6197] text-white px-4 py-2 rounded-lg hover:bg-[#2e4b78] transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with nav buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 className="text-3xl font-bold text-[#3f6197] mb-4 sm:mb-0">
            Your Profile
          </h1>
          <div className="flex flex-wrap gap-2">
            {isLoading ? (
              <>
                <Skeleton width={100} height={40} borderRadius={8} />
                <Skeleton width={80} height={40} borderRadius={8} />
              </>
            ) : (
              <>
                {(isAdmin == 1 || isAdmin == 2) && (
                  <button
                    onClick={handleAdminAccess}
                    className="bg-[#5a7fb8] text-white px-4 py-2 rounded-lg hover:bg-[#3f6197] transition-all duration-300"
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  Log Out
                </button>
                <button
                  onClick={toggleEditMode}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    !isEditing 
                      ? "bg-[#3f6197] text-white hover:bg-[#2e4b78]" 
                      : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  {!isEditing ? "Edit Profile" : "Cancel"}
                </button>
              </>
            )}
          </div>
        </div>

        {isLoading ? (
          // SKELETON LOADING UI
          renderSkeletonView()
        ) : !isEditing ? (
          // VIEW MODE
          <>
            {/* Profile Header with Photo */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center">
              <ProfilePhoto photoUrl={photoUrl} isEditing={false} />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {profileData.name}
                </h2>
                <p className="text-gray-600">{profileData.email}</p>
                <p className="text-gray-600">{profileData.phoneNumber}</p>
                <p className="mt-2 text-[#3f6197] font-semibold">
                  {profileData.organizationName}
                </p>
              </div>
            </div>

            {/* Personal Information */}
            <InfoCard title="Personal Information">
              <Field label="Full Name" value={profileData.name} />
              <Field label="Email" value={profileData.email} />
              <Field label="Phone Number" value={profileData.phoneNumber} />
            </InfoCard>

            {/* Organization Details */}
            <InfoCard title="Organization Details">
              <Field label="Organization Name" value={profileData.organizationName} />
              <Field label="Entity Type" value={profileData.organizationSize} />
              <Field label="Sector" value={profileData.sector} />
              <Field label="Business Type" value={profileData.businessType} />
              <Field label="DPIIT Number" value={profileData.dpiitNumber} />
              <Field label="Women Led" value={profileData.womenLed} />
              <Field label="Display Product" value={profileData.displayProduct} />
            </InfoCard>

            {/* Contact Information */}
            <InfoCard title="Contact Information">
              <Field label="Founder Name" value={profileData.founderName} />
              <Field label="Founder WhatsApp" value={profileData.founderWhatsApp} />
              <Field label="Representative Name" value={profileData.representativeName} />
              <Field label="Representative Designation" value={profileData.representativeDesignation} />
              <Field label="Representative WhatsApp" value={profileData.representativeWhatsApp} />
            </InfoCard>

            {/* Business Information */}
            <InfoCard title="Business Information">
              <Field label="PAN Number" value={profileData.panNumber} />
              <Field label="GST Number" value={profileData.gstNumber} />
              <Field label="Address" value={profileData.address} />
              <Field label="City, State, Postal" value={profileData.cityStatePostal} />
              <Field label="Website URL" value={profileData.websiteUrl} />
              <Field label="Product Description" value={profileData.productDescription} />
            </InfoCard>
          </>
        ) : (
          // EDIT MODE
          <form onSubmit={handleSubmit}>
            {/* Profile Photo Upload */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-[#3f6197] mb-4">
                Profile Photo
              </h3>
              <div className="flex flex-col md:flex-row items-center">
                <ProfilePhoto 
                  photoUrl={photoUrl}
                  photoPreview={photoPreview} 
                  handlePhotoChange={handlePhotoChange}
                  handlePhotoDelete={handlePhotoDelete}
                  isEditing={true} 
                />
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-[#3f6197] mb-4">
                Personal Information
              </h3>
              <InputField
                label="Full Name"
                name="name"
                value={profileData.name}
                required
                onChange={handleChange}
              />
              <InputField
                label="Email Address"
                name="email"
                value={profileData.email}
                type="email"
                required
                onChange={handleChange}
              />
              <InputField
                label="Phone Number"
                name="phoneNumber"
                value={profileData.phoneNumber}
                required
                onChange={handleChange}
              />
            </div>

            {/* Organization Details */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-[#3f6197] mb-4">
                Organization Details
              </h3>
              <InputField
                label="Organization Name"
                name="organizationName"
                value={profileData.organizationName}
                required
                onChange={handleChange}
              />
              <InputField
                label="Entity Type"
                name="organizationSize"
                value={profileData.organizationSize}
                onChange={handleChange}
              />
              <InputField
                label="Sector"
                name="sector"
                value={profileData.sector}
                required
                onChange={handleChange}
              />
              <InputField
                label="Business Type"
                name="businessType"
                value={profileData.businessType}
                required
                onChange={handleChange}
              />
              <InputField
                label="DPIIT Number"
                name="dpiitNumber"
                value={profileData.dpiitNumber}
                onChange={handleChange}
              />
              <InputField
                label="Women Led"
                name="womenLed"
                value={profileData.womenLed}
                onChange={handleChange}
              />
              <InputField
                label="Display Product"
                name="displayProduct"
                value={profileData.displayProduct}
                onChange={handleChange}
              />
            </div>

            {/* Contact Information */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-[#3f6197] mb-4">
                Contact Information
              </h3>
              <InputField
                label="Founder Name"
                name="founderName"
                value={profileData.founderName}
                onChange={handleChange}
              />
              <InputField
                label="Founder WhatsApp"
                name="founderWhatsApp"
                value={profileData.founderWhatsApp}
                onChange={handleChange}
              />
              <InputField
                label="Representative Name"
                name="representativeName"
                value={profileData.representativeName}
                onChange={handleChange}
              />
              <InputField
                label="Representative Designation"
                name="representativeDesignation"
                value={profileData.representativeDesignation}
                onChange={handleChange}
              />
              <InputField
                label="Representative WhatsApp"
                name="representativeWhatsApp"
                value={profileData.representativeWhatsApp}
                onChange={handleChange}
              />
            </div>

            {/* Business Information */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-[#3f6197] mb-4">
                Business Information
              </h3>
              <InputField
                label="PAN Number"
                name="panNumber"
                value={profileData.panNumber}
                onChange={handleChange}
              />
              <InputField
                label="GST Number"
                name="gstNumber"
                value={profileData.gstNumber}
                onChange={handleChange}
              />
              <InputField
                label="Address"
                name="address"
                value={profileData.address}
                onChange={handleChange}
              />
              <InputField
                label="City, State, Postal"
                name="cityStatePostal"
                value={profileData.cityStatePostal}
                onChange={handleChange}
              />
              <InputField
                label="Website URL"
                name="websiteUrl"
                value={profileData.websiteUrl}
                onChange={handleChange}
              />
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Product Description
                </label>
                <textarea
                  name="productDescription"
                  value={profileData.productDescription || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#3f6197] text-white px-6 py-3 rounded-lg hover:bg-[#2e4b78] transition-all duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;