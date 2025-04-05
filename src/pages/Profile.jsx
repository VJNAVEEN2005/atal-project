import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState({
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
    profilePhoto: null
  });
  
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const LogOut = () => {
    window.localStorage.removeItem("isAuthenticated");
    window.location.href = "/";
  };
  
  // Simulate fetching profile data from an API
  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const mockData = {
      name: "AIC",
      email: "aic@gmail.com",
      phoneNumber: "9876543210",
      organizationName: "Tech Innovators",
      organizationSize: "Private Limited",
      sector: "AI, Deeptech & Cybersecurity",
      founderName: "Aic",
      founderWhatsApp: "9876543210",
      representativeName: "AIC Team",
      representativeDesignation: "CTO",
      representativeWhatsApp: "9876543211",
      dpiitNumber: "DIPP12345",
      womenLed: "No",
      panNumber: "ABCDE1234F",
      gstNumber: "22AAAAA0000A1Z5",
      address: "123 Tech Park, Innovation Street",
      cityStatePostal: "Bangalore, Karnataka, 560001",
      productDescription: "AI-powered automation solutions for enterprises",
      businessType: "Product",
      websiteUrl: "https://aic.com",
      displayProduct: "Yes",
      profilePhoto: null
    };
    
    setProfileData(mockData);
  }, []);
  
  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setProfileData({
          ...profileData,
          profilePhoto: file
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
    // Show success message or handle response
    alert("Profile updated successfully!");
  };
  
  // Handle logout
  const handleLogout = () => {
    // In a real app, you would clear authentication tokens, cookies, etc.
    console.log("Logging out...");
    alert("You have been logged out successfully!");
    // Redirect to login page or home page
    // window.location.href = "/login";
  };
  
  // Handle admin panel navigation
  const handleAdminAccess = () => {
    console.log("Navigating to admin panel...");
    // Redirect to admin panel
    // window.location.href = "/admin";
    alert("Redirecting to admin panel...");
  };
  
  // Profile information card component
  const InfoCard = ({ title, children }) => (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-[#3f6197] mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
  
  // Field display component
  const Field = ({ label, value }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 border-b border-gray-100">
      <span className="text-gray-600 font-medium">{label}:</span>
      <span className="md:col-span-2 text-gray-800">{value || "Not provided"}</span>
    </div>
  );
  
  // Input field component for edit mode
  const InputField = ({ label, name, value, type = "text", required = false }) => (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
        required={required}
      />
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with nav buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 className="text-3xl font-bold text-[#3f6197] mb-4 sm:mb-0">Your Profile</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleAdminAccess}
              className="bg-[#5a7fb8] text-white px-4 py-2 rounded-lg hover:bg-[#3f6197] transition-all duration-300"
            >
              Admin Panel
            </button>
            <button
              onClick={LogOut}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all duration-300"
            >
              Log Out
            </button>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#3f6197] text-white px-4 py-2 rounded-lg hover:bg-[#2e4b78] transition-all duration-300"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        
        {/* View Mode */}
        {!isEditing ? (
          <>
            {/* Profile Header with Photo */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center">
              <div className="mb-4 md:mb-0 md:mr-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center border-4 border-[#3f6197]">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
                <p className="text-gray-600">{profileData.email}</p>
                <p className="text-gray-600">{profileData.phoneNumber}</p>
                <p className="mt-2 text-[#3f6197] font-semibold">{profileData.organizationName}</p>
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
          /* Edit Mode */
          <form onSubmit={handleSubmit}>
            {/* Profile Photo Upload */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-[#3f6197] mb-4">Profile Photo</h3>
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-4 md:mb-0 md:mr-6">
                  <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center border-4 border-[#3f6197]">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Change Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3f6197]"
                  />
                  <p className="text-gray-500 text-sm mt-1">Upload a square image for best results</p>
                </div>
              </div>
            </div>
            
            {/* Personal Information */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-[#3f6197] mb-4">Personal Information</h3>
              <InputField label="Full Name" name="name" value={profileData.name} required />
              <InputField label="Email Address" name="email" value={profileData.email} type="email" required />
              <InputField label="Phone Number" name="phoneNumber" value={profileData.phoneNumber} required />
            </div>
            
            {/* Organization Details */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-[#3f6197] mb-4">Organization Details</h3>
              <InputField label="Organization Name" name="organizationName" value={profileData.organizationName} required />
              <InputField label="Entity Type" name="organizationSize" value={profileData.organizationSize} />
              <InputField label="Sector" name="sector" value={profileData.sector} required />
              <InputField label="Business Type" name="businessType" value={profileData.businessType} required />
              <InputField label="DPIIT Number" name="dpiitNumber" value={profileData.dpiitNumber} />
              <InputField label="Women Led" name="womenLed" value={profileData.womenLed} />
              <InputField label="Display Product" name="displayProduct" value={profileData.displayProduct} />
            </div>
            
            {/* Contact Information */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-[#3f6197] mb-4">Contact Information</h3>
              <InputField label="Founder Name" name="founderName" value={profileData.founderName} />
              <InputField label="Founder WhatsApp" name="founderWhatsApp" value={profileData.founderWhatsApp} />
              <InputField label="Representative Name" name="representativeName" value={profileData.representativeName} />
              <InputField label="Representative Designation" name="representativeDesignation" value={profileData.representativeDesignation} />
              <InputField label="Representative WhatsApp" name="representativeWhatsApp" value={profileData.representativeWhatsApp} />
            </div>
            
            {/* Business Information */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-[#3f6197] mb-4">Business Information</h3>
              <InputField label="PAN Number" name="panNumber" value={profileData.panNumber} />
              <InputField label="GST Number" name="gstNumber" value={profileData.gstNumber} />
              <InputField label="Address" name="address" value={profileData.address} />
              <InputField label="City, State, Postal" name="cityStatePostal" value={profileData.cityStatePostal} />
              <InputField label="Website URL" name="websiteUrl" value={profileData.websiteUrl} />
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