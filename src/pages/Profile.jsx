import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/slice/user.js";

// Component for displaying information in view mode with improved styling
const Field = ({ label, value }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-3 border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200 rounded-md px-2">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="md:col-span-2 text-gray-800 font-normal">
      {value || <span className="text-gray-400 italic">Not provided</span>}
    </span>
  </div>
);

// Enhanced Information card component with subtle hover effects
const InfoCard = ({ title, children, isLoading, icon }) => (
  <div className="bg-white shadow-lg rounded-xl p-6 mb-8 hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#3f6197]">
    <div className="flex items-center mb-5">
      {icon && <div className="text-[#3f6197] mr-3">{icon}</div>}
      <h3 className="text-xl font-semibold text-[#3f6197]">
        {isLoading ? <Skeleton width={150} /> : title}
      </h3>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

// Skeleton version of Field component
const SkeletonField = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-3 border-b border-gray-100">
    <span className="text-gray-600 font-medium">
      <Skeleton width={100} />
    </span>
    <span className="md:col-span-2 text-gray-800">
      <Skeleton width={200} />
    </span>
  </div>
);

// Enhanced Input field component for edit mode
const InputField = ({
  label,
  name,
  value,
  type = "text",
  required = false,
  onChange,
}) => (
  <div className="mb-5">
    <label className="block text-gray-700 font-medium mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] transition-colors duration-200"
      required={required}
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

// Enhanced ProfilePhoto component with animation effects
const ProfilePhoto = ({
  photoUrl,
  photoPreview,
  handlePhotoChange,
  handlePhotoDelete,
  isEditing,
  isLoading,
}) => (
  <div className="mb-6 md:mb-0 md:mr-6">
    <div className="w-40 h-40 bg-gradient-to-br from-[#3f6197] to-[#5a7fb8] rounded-full overflow-hidden flex items-center justify-center border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105">
      {isLoading ? (
        <Skeleton circle width={160} height={160} />
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
          className="h-20 w-20 text-white"
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
        <label className="bg-[#6b92d2] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#2e4b78] transition-all duration-300 block text-center">
          Choose Photo
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </label>
        <p className="text-white text-sm mt-2 text-center">
          Upload a square image for best results
        </p>
        {(photoUrl || photoPreview) && (
          <button
            onClick={handlePhotoDelete}
            type="button"
            className="mt-3 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Remove Photo
          </button>
        )}
      </div>
    )}
  </div>
);

// Stats component to display user profile completion
const ProfileStats = ({ profileData }) => {
  // Calculate profile completion percentage
  const calculateCompletion = () => {
    const totalFields = Object.keys(profileData).length;
    const filledFields = Object.values(profileData).filter((value) => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string") return value.trim() !== "";
      return true;
    }).length;
    return Math.round((filledFields / totalFields) * 100);
  };

  const completion = calculateCompletion();

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-8 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-[#3f6197] mb-4">
        Profile Completion
      </h3>
      <div className="relative pt-1">
        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-gray-200">
          <div
            style={{ width: `${completion}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center 
              ${
                completion < 30
                  ? "bg-red-500"
                  : completion < 70
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
          ></div>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-medium text-gray-600">
            {completion}% Complete
          </span>
          {completion < 100 && (
            <span className="text-[#3f6197]">
              Complete your profile for better visibility!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

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
  const [activeTab, setActiveTab] = useState("personal");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {

    if (state.user.user) {
      setProfileData(state.user.user.user);
      setPhotoUrl(`${api.web}api/v1/profileImage/${state.user.user.user._id}`);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [state]);

  useEffect((e) => {
    dispatch(fetchUser());
  }, []);

  // Load user authentication data from localStorage
  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAuthenticated") || 0);
    setUserId(localStorage.getItem("user_id"));
  }, []);

  // Fetch user data

  // Handle logout with animation
  const handleLogout = useCallback(() => {
    // Add visual feedback before logout
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
      logoutButton.innerText = "Logging out...";
      logoutButton.disabled = true;
    }

    setTimeout(() => {
      localStorage.removeItem("user_isLogin");
      localStorage.removeItem("isAuthenticated");
      window.location.href = "/";
    }, 500);
  }, []);

  // Handle admin panel navigation
  const handleAdminAccess = useCallback(() => {
    navigate("/admin");
  }, [navigate]);

  // Handle photo upload with enhanced validation
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

  // Handle photo delete with confirmation
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
    setProfileData((prev) => ({
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
        setPhotoUrl(
          `${api.web}api/v1/profileImage/${userId}?t=${new Date().getTime()}`
        );
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

  // Handle form submission with loading state
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Show loading state
      const submitButton = document.getElementById("submit-button");
      if (submitButton) {
        submitButton.innerText = "Saving...";
        submitButton.disabled = true;
      }

      // First handle profile photo upload if there is a new photo
      if (photoFile) {
        const photoUploaded = await uploadProfilePhoto();
        if (!photoUploaded) {
          // If photo upload failed, don't proceed with profile update
          if (submitButton) {
            submitButton.innerText = "Save Changes";
            submitButton.disabled = false;
          }
          return;
        }
      }

      // Then update other profile data
      axios
        .post(`${api.web}api/v1/updateUser`, profileData)
        .then((response) => {
          if (response.data.success) {
            setIsEditing(false);
            // Show success message
            const successElement = document.createElement("div");
            successElement.className =
              "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
            successElement.innerText = "Profile updated successfully!";
            document.body.appendChild(successElement);

            // Remove success message after a few seconds
            setTimeout(() => {
              document.body.removeChild(successElement);
            }, 3000);
          } else {
            alert("Error updating profile: " + response.data.message);
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
          alert("Error updating profile: " + error.message);
        })
        .finally(() => {
          if (submitButton) {
            submitButton.innerText = "Save Changes";
            submitButton.disabled = false;
          }
        });
    },
    [profileData, photoFile, uploadProfilePhoto]
  );

  // Toggle edit mode with animation
  const toggleEditMode = useCallback(() => {
    setIsEditing((prev) => !prev);
    // Reset photo preview when canceling edit
    if (isEditing) {
      setPhotoPreview(null);
      setPhotoFile(null);
    }

    // Scroll to top for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isEditing]);

  // Icons for each section
  const PersonIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
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
  );

  const OrgIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );

  const ContactIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );

  const BusinessIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );

  // Skeleton Loading UI
  const renderSkeletonView = () => (
    <>
      {/* Profile Header with Photo */}
      <div className="bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] shadow-md rounded-xl p-8 mb-8 text-white animate-pulse">
        <div className="flex flex-col md:flex-row items-center">
          <ProfilePhoto isLoading={true} />
          <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
            <h2 className="text-2xl font-bold">
              <Skeleton
                width={200}
                baseColor="#5a7fb8"
                highlightColor="#3f6197"
              />
            </h2>
            <p>
              <Skeleton
                width={150}
                baseColor="#5a7fb8"
                highlightColor="#3f6197"
              />
            </p>
            <p>
              <Skeleton
                width={120}
                baseColor="#5a7fb8"
                highlightColor="#3f6197"
              />
            </p>
            <p className="mt-2 font-semibold">
              <Skeleton
                width={180}
                baseColor="#5a7fb8"
                highlightColor="#3f6197"
              />
            </p>
          </div>
        </div>
      </div>

      {/* Skeleton Stats */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-[#3f6197] mb-4">
          <Skeleton width={150} />
        </h3>
        <div className="relative pt-1">
          <Skeleton height={12} borderRadius={10} />
          <div className="flex justify-between mt-2">
            <Skeleton width={100} />
            <Skeleton width={200} />
          </div>
        </div>
      </div>

      {/* Skeleton Cards */}
      <InfoCard
        title="Personal Information"
        isLoading={true}
        icon={<PersonIcon />}
      >
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
      </InfoCard>

      <InfoCard
        title="Organization Details"
        isLoading={true}
        icon={<OrgIcon />}
      >
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
      </InfoCard>
    </>
  );

  // Error State UI
  if (error)
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-xl p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-red-500 text-xl font-medium py-4">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#3f6197] text-white px-6 py-3 rounded-lg hover:bg-[#2e4b78] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );

  // Tab Navigation Component
  const TabNav = ({ isEditing }) => {
    return !isEditing ? (
      <div className="bg-white shadow-md rounded-xl mb-8 overflow-hidden">
        <div className="flex flex-wrap">
          <button
            onClick={() => setActiveTab("personal")}
            className={`px-4 py-3 font-medium flex items-center transition-colors duration-200 ${
              activeTab === "personal"
                ? "bg-[#3f6197] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <PersonIcon /> <span className="ml-2">Personal</span>
          </button>
          <button
            onClick={() => setActiveTab("organization")}
            className={`px-4 py-3 font-medium flex items-center transition-colors duration-200 ${
              activeTab === "organization"
                ? "bg-[#3f6197] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <OrgIcon /> <span className="ml-2">Organization</span>
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-4 py-3 font-medium flex items-center transition-colors duration-200 ${
              activeTab === "contact"
                ? "bg-[#3f6197] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ContactIcon /> <span className="ml-2">Contact</span>
          </button>
          <button
            onClick={() => setActiveTab("business")}
            className={`px-4 py-3 font-medium flex items-center transition-colors duration-200 ${
              activeTab === "business"
                ? "bg-[#3f6197] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <BusinessIcon /> <span className="ml-2">Business</span>
          </button>
        </div>
      </div>
    ) : null;
  };

  const shareProfile = () => {
    const shareUrl = `${window.location.origin}/profile/${userId}`;
    const shareData = {
      title: "Check out this profile",
      text: "Have a look at this awesome profile!",
      url: shareUrl,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Profile shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Profile link copied to clipboard!");
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with nav buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 className="text-3xl font-bold text-[#3f6197] mb-4 sm:mb-0 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Your Profile
          </h1>
          <div className="flex flex-wrap gap-3">
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
                    className="bg-[#5a7fb8] text-white px-5 py-2 rounded-lg hover:bg-[#3f6197] transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                    Admin Panel
                  </button>
                )}

                <button
                  id="logout-button"
                  onClick={handleLogout}
                  className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Log Out
                </button>
                <button
                  onClick={toggleEditMode}
                  className={`px-5 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center ${
                    !isEditing
                      ? "bg-[#3f6197] text-white hover:bg-[#2e4b78]"
                      : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  {!isEditing ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit Profile
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cancel
                    </>
                  )}
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
            {/* Profile Header with Photo - Enhanced with gradient background */}
            {/* Profile Header with Photo - Enhanced with gradient background */}
            <div className="bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] shadow-lg rounded-xl p-8 mb-8 text-white transform transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col md:flex-row items-center">
                <ProfilePhoto photoUrl={photoUrl} isEditing={false} />
                <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                  <h2 className="text-3xl font-bold">
                    {profileData.name || "Your Name"}
                  </h2>
                  <p className="text-blue-100">{profileData.email}</p>
                  <p className="text-blue-100">{profileData.phoneNumber}</p>
                  <p className="mt-2 text-white font-semibold text-xl">
                    {profileData.organizationName || "Your Organization"}
                  </p>
                  <div className="mt-3 inline-flex bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    {profileData.sector || "Your Sector"}
                  </div>
                  <div
                    onClick={shareProfile}
                    className="px-4 ml-5 text-sm py-2 cursor-pointer bg-blue-100 text-[#3f6197] rounded-full inline-flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Public View
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Completion Stats */}
            <ProfileStats profileData={profileData} />

            {/* Tab Navigation */}
            <TabNav isEditing={isEditing} />

            {/* Content Based on Active Tab */}
            {activeTab === "personal" && (
              <InfoCard title="Personal Information" icon={<PersonIcon />}>
                <Field label="Full Name" value={profileData.name} />
                <Field label="Email" value={profileData.email} />
                <Field label="Phone Number" value={profileData.phoneNumber} />
              </InfoCard>
            )}

            {activeTab === "organization" && (
              <InfoCard title="Organization Details" icon={<OrgIcon />}>
                <Field
                  label="Organization Name"
                  value={profileData.organizationName}
                />
                <Field
                  label="Entity Type"
                  value={profileData.organizationSize}
                />
                <Field label="Sector" value={profileData.sector} />
                <Field label="Business Type" value={profileData.businessType} />
                <Field label="DPIIT Number" value={profileData.dpiitNumber} />
                <Field label="Women Led" value={profileData.womenLed} />
                <Field
                  label="Display Product"
                  value={profileData.displayProduct}
                />
              </InfoCard>
            )}

            {activeTab === "contact" && (
              <InfoCard title="Contact Information" icon={<ContactIcon />}>
                <Field label="Founder Name" value={profileData.founderName} />
                <Field
                  label="Founder WhatsApp"
                  value={profileData.founderWhatsApp}
                />
                <Field
                  label="Representative Name"
                  value={profileData.representativeName}
                />
                <Field
                  label="Representative Designation"
                  value={profileData.representativeDesignation}
                />
                <Field
                  label="Representative WhatsApp"
                  value={profileData.representativeWhatsApp}
                />
              </InfoCard>
            )}

            {activeTab === "business" && (
              <InfoCard title="Business Information" icon={<BusinessIcon />}>
                <Field label="PAN Number" value={profileData.panNumber} />
                <Field label="GST Number" value={profileData.gstNumber} />
                <Field label="Address" value={profileData.address} />
                <Field
                  label="City, State, Postal"
                  value={profileData.cityStatePostal}
                />
                <Field label="Website URL" value={profileData.websiteUrl} />
                <div className="py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">
                    Product Description:
                  </span>
                  <div className="mt-2 text-gray-800 bg-gray-50 p-4 rounded-lg">
                    {profileData.productDescription || (
                      <span className="text-gray-400 italic">Not provided</span>
                    )}
                  </div>
                </div>
              </InfoCard>
            )}

            {/* Quick Action Buttons */}
            <div className="fixed bottom-6 right-6">
              <button
                onClick={toggleEditMode}
                className="bg-[#3f6197] text-white p-4 rounded-full shadow-lg hover:bg-[#2e4b78] transition-all duration-300 hover:scale-110"
                title="Edit Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          // EDIT MODE
          <form onSubmit={handleSubmit} className="animate-fadeIn">
            {/* Profile Photo Upload - Enhanced */}
            <div className="bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] shadow-lg rounded-xl p-8 mb-8 text-white">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
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
                <div className="md:ml-6 text-center md:text-left mt-4 md:mt-0">
                  <p className="mb-2">
                    A professional profile photo helps build trust with your
                    network.
                  </p>
                  <p className="text-blue-100 text-sm">
                    Recommended: A clear headshot with good lighting.
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Sections with Tabbed Interface */}
            <div className="bg-white shadow-lg rounded-xl mb-8 overflow-hidden">
              <div className="flex flex-wrap border-b">
                <button
                  type="button"
                  onClick={() => setActiveTab("personal")}
                  className={`px-4 py-3 font-medium flex items-center transition-colors duration-200 ${
                    activeTab === "personal"
                      ? "bg-[#3f6197] text-white border-b-2 border-[#3f6197]"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <PersonIcon /> <span className="ml-2">Personal</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("organization")}
                  className={`px-4 py-3 font-medium flex items-center transition-colors duration-200 ${
                    activeTab === "organization"
                      ? "bg-[#3f6197] text-white border-b-2 border-[#3f6197]"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <OrgIcon /> <span className="ml-2">Organization</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("contact")}
                  className={`px-4 py-3 font-medium flex items-center transition-colors duration-200 ${
                    activeTab === "contact"
                      ? "bg-[#3f6197] text-white border-b-2 border-[#3f6197]"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ContactIcon /> <span className="ml-2">Contact</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("business")}
                  className={`px-4 py-3 font-medium flex items-center transition-colors duration-200 ${
                    activeTab === "business"
                      ? "bg-[#3f6197] text-white border-b-2 border-[#3f6197]"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <BusinessIcon /> <span className="ml-2">Business</span>
                </button>
              </div>

              <div className="p-6">
                {/* Personal Information Tab */}
                {activeTab === "personal" && (
                  <div className="animate-fadeIn">
                    <h3 className="text-xl font-semibold text-[#3f6197] mb-6 flex items-center">
                      <PersonIcon />{" "}
                      <span className="ml-2">Personal Information</span>
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
                )}

                {/* Organization Details Tab */}
                {activeTab === "organization" && (
                  <div className="animate-fadeIn">
                    <h3 className="text-xl font-semibold text-[#3f6197] mb-6 flex items-center">
                      <OrgIcon />{" "}
                      <span className="ml-2">Organization Details</span>
                    </h3>
                    <InputField
                      label="Organization Name"
                      name="organizationName"
                      value={profileData.organizationName}
                      required
                      onChange={handleChange}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
                )}

                {/* Contact Information Tab */}
                {activeTab === "contact" && (
                  <div className="animate-fadeIn">
                    <h3 className="text-xl font-semibold text-[#3f6197] mb-6 flex items-center">
                      <ContactIcon />{" "}
                      <span className="ml-2">Contact Information</span>
                    </h3>
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-[#3f6197]">
                      <h4 className="font-medium text-lg text-[#3f6197] mb-2">
                        Founder Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      </div>
                    </div>

                    <div className="mb-5 p-4 bg-blue-50 rounded-lg border-l-4 border-[#3f6197]">
                      <h4 className="font-medium text-lg text-[#3f6197] mb-2">
                        Representative Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      </div>
                      <InputField
                        label="Representative WhatsApp"
                        name="representativeWhatsApp"
                        value={profileData.representativeWhatsApp}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}

                {/* Business Information Tab */}
                {activeTab === "business" && (
                  <div className="animate-fadeIn">
                    <h3 className="text-xl font-semibold text-[#3f6197] mb-6 flex items-center">
                      <BusinessIcon />{" "}
                      <span className="ml-2">Business Information</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </div>
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
                    <div className="mb-5">
                      <label className="block text-gray-700 font-medium mb-2">
                        Product Description
                      </label>
                      <textarea
                        name="productDescription"
                        value={profileData.productDescription || ""}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197] transition-colors duration-200"
                        placeholder="Describe your product or service..."
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4 mb-12">
              <button
                type="button"
                onClick={toggleEditMode}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </button>
              <button
                id="submit-button"
                type="submit"
                className="bg-[#3f6197] text-white px-6 py-3 rounded-lg hover:bg-[#2e4b78] transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Save Changes
              </button>
            </div>
          </form>
        )}

        {/* Footer with motivational message */}
        {!isEditing && !isLoading && (
          <div className="text-center text-gray-500 mt-12 mb-8 animate-fadeIn">
            <p>
              Keeping your profile up-to-date increases your visibility and
              networking opportunities.
            </p>
            <p className="text-sm mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      {/* Add custom CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Profile;
