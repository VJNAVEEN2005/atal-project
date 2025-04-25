import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Reusable Field component for displaying information
const Field = ({ label, value }) => (  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-3 border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200 rounded-md px-2">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="md:col-span-2 text-gray-800 font-normal">
      {value || <span className="text-gray-400 italic">Not provided</span>}
    </span>
  </div>
);

// InfoCard component with icon support
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
    <span className="text-gray-600 font-medium"><Skeleton width={100} /></span>
    <span className="md:col-span-2 text-gray-800"><Skeleton width={200} /></span>
  </div>
);

// Icons for sections
const PersonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const OrgIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const BusinessIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// Main ProfileShare component
const ProfileShare = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState({});
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');

  // Fetch user data based on ID from URL params
  useEffect(() => {
    if (!id) {
      setError("No profile ID provided");
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    // Fetch user data with the provided ID
    axios.post(`${api.web}api/v1/getUser`, { _id: id })
      .then((res) => {
        if (res.data.success) {
          setProfileData(res.data.user);
          // Set profile photo URL if user has one
          if (res.data.user._id) {
            setPhotoUrl(`${api.web}api/v1/profileImage/${res.data.user._id}?t=${new Date().getTime()}`);
          }
        } else {
          setError("Profile not found or not available for sharing");
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load shared profile");
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 800); // Add slight delay for better UX
      });
  }, [id]);

  // Profile Photo component
  const ProfilePhoto = ({ photoUrl, isLoading }) => (
    <div className="mb-6 md:mb-0 md:mr-6">
      <div className="w-40 h-40 bg-gradient-to-br from-[#3f6197] to-[#5a7fb8] rounded-full overflow-hidden flex items-center justify-center border-4 border-white shadow-lg transition-transform duration-300 hover:scale-105">
        {isLoading ? (
          <Skeleton circle width={160} height={160} />
        ) : photoUrl ? (
          <img
            src={photoUrl}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150?text=No+Image';
            }}
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
    </div>
  );

  // Tab Navigation Component
  const TabNav = () => (
    <div className="bg-white shadow-md rounded-xl mb-8 overflow-hidden">
      <div className="flex flex-wrap">
        <button 
          onClick={() => setActiveTab('personal')}
          className={`px-4 py-3 font-medium flex items-center transition-colors duration-200 ${
            activeTab === 'personal' 
              ? 'bg-[#3f6197] text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <PersonIcon /> <span className="ml-2">Personal</span>
        </button>
        <button 
          onClick={() => setActiveTab('organization')}
          className={`px-4 py-3 font-medium flex items-center transition-colors duration-200 ${
            activeTab === 'organization' 
              ? 'bg-[#3f6197] text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <OrgIcon /> <span className="ml-2">Organization</span>
        </button>
        <button 
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-3 font-medium flex items-center transition-colors duration-200 ${
            activeTab === 'contact' 
              ? 'bg-[#3f6197] text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <ContactIcon /> <span className="ml-2">Contact</span>
        </button>
        <button 
          onClick={() => setActiveTab('business')}
          className={`px-4 py-3 font-medium flex items-center transition-colors duration-200 ${
            activeTab === 'business' 
              ? 'bg-[#3f6197] text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <BusinessIcon /> <span className="ml-2">Business</span>
        </button>
      </div>
    </div>
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
              <Skeleton width={200} baseColor="#5a7fb8" highlightColor="#3f6197" />
            </h2>
            <p>
              <Skeleton width={150} baseColor="#5a7fb8" highlightColor="#3f6197" />
            </p>
            <p>
              <Skeleton width={120} baseColor="#5a7fb8" highlightColor="#3f6197" />
            </p>
            <p className="mt-2 font-semibold">
              <Skeleton width={180} baseColor="#5a7fb8" highlightColor="#3f6197" />
            </p>
          </div>
        </div>
      </div>

      {/* Skeleton Cards */}
      <InfoCard title="Personal Information" isLoading={true} icon={<PersonIcon />}>
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
      </InfoCard>

      <InfoCard title="Organization Details" isLoading={true} icon={<OrgIcon />}>
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
      </InfoCard>
    </>
  );
  
  // Error State UI
  if (error) return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-xl p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-red-500 text-xl font-medium py-4">{error}</div>
          <button
            onClick={() => window.history.back()}
            className="bg-[#3f6197] text-white px-6 py-3 rounded-lg hover:bg-[#2e4b78] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );

  const shareProfile = () => {
    const shareUrl = `${window.location.origin}/profile/${id}`;
    const shareData = {
      title: 'Check out this profile',
      text: 'Have a look at this awesome profile!',
      url: shareUrl
    };
  
    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Profile shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
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
        {/* Header with shared profile banner */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#3f6197] mb-4 sm:mb-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            Shared Profile
          </h1>
          <div onClick={shareProfile} className="px-4 py-2 cursor-pointer bg-blue-100 text-[#3f6197] rounded-full inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Public View
          </div>
        </div>

        {isLoading ? (
          // SKELETON LOADING UI
          renderSkeletonView()
        ) : (
          // PROFILE VIEW
          <>
            {/* Profile Header with Photo */}
            <div className="bg-gradient-to-r from-[#3f6197] to-[#5a7fb8] shadow-lg rounded-xl p-8 mb-8 text-white transform transition-all duration-300 hover:shadow-xl">
              <div className="flex flex-col md:flex-row items-center">
                <ProfilePhoto photoUrl={photoUrl} isLoading={false} />
                <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                  <h2 className="text-3xl font-bold">
                    {profileData.name || "Name Not Available"}
                  </h2>
                  <p className="text-blue-100">{profileData.email}</p>
                  <p className="text-blue-100">{profileData.phoneNumber}</p>
                  <p className="mt-2 text-white font-semibold text-xl">
                    {profileData.organizationName || "Organization Not Available"}
                  </p>
                  <div className="mt-3 inline-flex bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    {profileData.sector || "Sector Not Available"}
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <TabNav />

            {/* Content Based on Active Tab */}
            {activeTab === 'personal' && (
              <InfoCard title="Personal Information" icon={<PersonIcon />}>
                <Field label="Full Name" value={profileData.name} />
                <Field label="Email" value={profileData.email} />
                <Field label="Phone Number" value={profileData.phoneNumber} />
              </InfoCard>
            )}

            {activeTab === 'organization' && (
              <InfoCard title="Organization Details" icon={<OrgIcon />}>
                <Field label="Organization Name" value={profileData.organizationName} />
                <Field label="Entity Type" value={profileData.organizationSize} />
                <Field label="Sector" value={profileData.sector} />
                <Field label="Business Type" value={profileData.businessType} />
                <Field label="DPIIT Number" value={profileData.dpiitNumber} />
                <Field label="Women Led" value={profileData.womenLed} />
                <Field label="Display Product" value={profileData.displayProduct} />
              </InfoCard>
            )}

            {activeTab === 'contact' && (
              <InfoCard title="Contact Information" icon={<ContactIcon />}>
                <Field label="Founder Name" value={profileData.founderName} />
                <Field label="Founder WhatsApp" value={profileData.founderWhatsApp} />
                <Field label="Representative Name" value={profileData.representativeName} />
                <Field label="Representative Designation" value={profileData.representativeDesignation} />
                <Field label="Representative WhatsApp" value={profileData.representativeWhatsApp} />
              </InfoCard>
            )}

            {activeTab === 'business' && (
              <InfoCard title="Business Information" icon={<BusinessIcon />}>
                <Field label="PAN Number" value={profileData.panNumber} />
                <Field label="GST Number" value={profileData.gstNumber} />
                <Field label="Address" value={profileData.address} />
                <Field label="City, State, Postal" value={profileData.cityStatePostal} />
                <Field label="Website URL" value={profileData.websiteUrl} />
                <div className="py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Product Description:</span>
                  <div className="mt-2 text-gray-800 bg-gray-50 p-4 rounded-lg">
                    {profileData.productDescription || <span className="text-gray-400 italic">Not provided</span>}
                  </div>
                </div>
              </InfoCard>
            )}

            {/* Back to Home button */}
            <div className="flex justify-center mt-8 mb-12">
              <a 
                href="/" 
                className="bg-[#3f6197] text-white px-6 py-3 rounded-lg hover:bg-[#2e4b78] transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
                </svg>
                Back to Home
              </a>
            </div>

            {/* Contact button fixed to bottom */}
            <div className="fixed bottom-6 right-6">
              {profileData.email && (
                <a
                  href={`mailto:${profileData.email}`}
                  className="bg-[#3f6197] text-white p-4 rounded-full shadow-lg hover:bg-[#2e4b78] transition-all duration-300 hover:scale-110 flex items-center justify-center"
                  title="Contact via Email"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              )}
            </div>
          </>
        )}
        
        {/* Footer */}
        <div className="text-center text-gray-500 mt-12 mb-8">
          <p>This is a shared profile view. Some information may be limited.</p>
          <p className="text-sm mt-2">© {new Date().getFullYear()} AIC-PECF. All rights reserved.</p>
        </div>
      </div>
      
      {/* Add custom CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default ProfileShare;