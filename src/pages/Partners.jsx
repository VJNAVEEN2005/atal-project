import React, { useState, useEffect, useRef } from "react";
import {
  Building2,
  Network,
  Lightbulb,
  Handshake,
  GraduationCap,
  User,
  X,
  Linkedin,
  Mail,
  Loader,
} from "lucide-react";
import axios from 'axios';
import api from "../Api/api";
import { fetchPartners } from "../Redux/slice/partnerSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Configure axios base URL - update this to match your backend
const API_BASE_URL = `${api.web}api/v1`;

const Api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

function App() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'Academic');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dialogRef = useRef(null);

  const partnerSections = [
    {
      name: "Academic",
      icon: <GraduationCap className="w-6 h-6" />,
      path: "Academic",
    },
    {
      name: "Corporate",
      icon: <Handshake className="w-6 h-6" />,
      path: "Corporate",
    },
    {
      name: "IP Partners",
      icon: <Lightbulb className="w-6 h-6" />,
      path: "IP Partners",
    },
    { 
      name: "Mentors", 
      icon: <Network className="w-6 h-6" />, 
      path: "Mentors" 
    },
    {
      name: "External Investors",
      icon: <Building2 className="w-6 h-6" />,
      path: "External Investors",
    },
  ];

  // Fetch partners from API
  // const fetchPartners = async (type) => {
  //   try {
  //     setLoading(true);
  //     setError(null);
      
  //     const response = await Api.get('/partners', {
  //       params: { type }
  //     });
      
  //     if (response.data.success) {
  //       setPartners(response.data.data);
  //     } else {
  //       throw new Error(response.data.message || 'Failed to fetch partners');
  //     }
  //   } catch (err) {
  //     console.error('Error fetching partners:', err);
  //     setError(err.response?.data?.message || err.message || 'Failed to fetch partners');
  //     setPartners([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Fetch partners when tab changes

  const dispatch = useDispatch();
  const state = useSelector(state => state.partners);

  useEffect(() => {
    dispatch(fetchPartners(activeTab));
  }, [dispatch, activeTab]);

  useEffect(()=>{
    setLoading(state.loading);
    setError(state.error);
    setPartners(state.partners);
  }, [state]);

  // Get image URL for partner
  const getImageUrl = (partnerId, imageType = 'logo') => {
    return `${API_BASE_URL}/partners/${imageType}/${partnerId}`;
  };

  const openModal = (partner) => {
    setSelectedPartner(partner);
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
    setSelectedPartner(null);
  };

  const renderPartners = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <Loader className="w-8 h-8 animate-spin text-[#3F6197]" />
          <span className="ml-2 text-gray-600">Loading partners...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => fetchPartners(activeTab)}
            className="px-4 py-2 bg-[#3F6197] text-white rounded-lg hover:bg-[#1e3f75] transition-colors"
          >
            Retry
          </button>
        </div>
      );
    }

    if (partners.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600">No partners found for this category.</p>
        </div>
      );
    }

    // Render individual partners (Mentors/External Investors)
    if (activeTab === "Mentors" || activeTab === "External Investors") {
      return (
        <>
          <div className="grid gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner._id}
                className="group flex flex-col items-center cursor-pointer"
                onClick={() => openModal(partner)}
              >
                <div className="relative w-20 h-20 sm:w-30 sm:h-30 md:w-48 md:h-48 lg:w-48 lg:h-48">
                  <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#3F6197] hover:border-[#1e3f75] transition-colors">
                    {partner.photo ? (
                      <img
                        src={getImageUrl(partner._id, 'photo')}
                        alt={partner.name}
                        className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-full h-full ${partner.photo ? 'hidden' : 'flex'} items-center justify-center bg-gray-100 rounded-full`}
                    >
                      <User size={48} className="text-gray-400" />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center rounded-full">
                      <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        {partner.linkedin && (
                          <a
                            href={partner.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Linkedin
                              size={24}
                              className="text-white hover:text-[#0077b5] transition-colors duration-200"
                            />
                          </a>
                        )}
                        {partner.email && (
                          <a
                            href={`mailto:${partner.email}`}
                            className="hover:scale-110 transition-transform duration-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Mail
                              size={24}
                              className="text-white hover:text-[#E4405F] transition-colors duration-200"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {partner.name}
                  </h3>
                  {partner.role && (
                    <p className="text-sm text-gray-500">{partner.role}</p>
                  )}
                  {partner.details?.role && (
                    <p className="text-sm text-gray-500">{partner.details.role}</p>
                  )}
                  {partner.companyName && (
                    <p className="text-sm text-gray-500">{partner.companyName}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <dialog
            ref={dialogRef}
            className="w-full max-w-4xl rounded-2xl p-0 backdrop:bg-black backdrop:bg-opacity-60 shadow-2xl"
            onClick={(e) => {
              if (e.target === dialogRef.current) closeModal();
            }}
          >
            {selectedPartner && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-[#3F6197] to-[#1e3f75] p-6 text-white relative">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30"
                  >
                    <X size={20} />
                  </button>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      {selectedPartner.photo ? (
                        <img
                          src={getImageUrl(selectedPartner._id, 'photo')}
                          alt={selectedPartner.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className={`w-full h-full ${selectedPartner.photo ? 'hidden' : 'flex'} items-center justify-center bg-gray-100 rounded-full`}
                      >
                        <User size={40} className="text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2">
                        {selectedPartner.name}
                      </h2>
                      {(selectedPartner.role || selectedPartner.details?.role) && (
                        <h3 className="text-xl font-medium text-blue-100 mb-1">
                          {selectedPartner.role || selectedPartner.details?.role}
                        </h3>
                      )}
                      {(selectedPartner.companyName || selectedPartner.details?.company) && (
                        <p className="text-blue-200 text-lg">
                          {selectedPartner.companyName || selectedPartner.details?.company}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 space-y-8">
                  
                  {/* Website Link */}
                  {selectedPartner.website && (
                    <div className="flex items-center justify-center">
                      <a
                        href={selectedPartner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <Building2 size={16} />
                        Visit Website
                      </a>
                    </div>
                  )}

                  {/* Description Section */}
                  {(selectedPartner.details?.description || selectedPartner.details) && (
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <User size={20} className="text-[#3F6197]" />
                        About
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-base">
                        {typeof selectedPartner.details === 'string' 
                          ? selectedPartner.details 
                          : selectedPartner.details?.description}
                      </p>
                    </div>
                  )}

                  {/* Expertise Section */}
                  {((selectedPartner.details?.expertise && selectedPartner.details.expertise.length > 0) || 
                    (selectedPartner.expertise && selectedPartner.expertise.length > 0)) && (
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Lightbulb size={20} className="text-[#3F6197]" />
                        Areas of Expertise
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {(selectedPartner.expertise || selectedPartner.details?.expertise || [])
                          .filter(skill => skill && skill.trim() !== '') // Filter out empty strings
                          .flatMap(skill => skill.split(',').map(s => s.trim())) // Split by comma and trim whitespace
                          .filter(skill => skill !== '') // Filter out empty strings after splitting
                          .map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Section */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Mail size={20} className="text-[#3F6197]" />
                      Connect
                    </h4>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {selectedPartner.linkedin && (
                        <a
                          href={selectedPartner.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          <Linkedin size={18} />
                          LinkedIn
                        </a>
                      )}
                      {selectedPartner.email && (
                        <a
                          href={`mailto:${selectedPartner.email}`}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          <Mail size={18} />
                          Email
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </dialog>
        </>
      );
    }

    // Render company partners (Academic/Corporate/IP Partners)
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {partners.map((partner) => (
          <div
            key={partner._id}
            className="relative group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="w-full h-32 flex items-center justify-center">
              {partner.logo ? (
                <img
                  src={getImageUrl(partner._id, 'logo')}
                  alt={`${partner.name} logo`}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-full h-full ${partner.logo ? 'hidden' : 'flex'} items-center justify-center bg-gray-100 rounded`}
              >
                <span className="text-gray-400 text-sm text-center px-2">
                  {partner.name}
                </span>
              </div>
            </div>
            <div className={ partner.website ? "cursor-pointer mt-4 opacity-0 group-hover:opacity-100 absolute  inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300 rounded-xl" : "mt-4 opacity-0 group-hover:opacity-100 absolute  inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300 rounded-xl"} onClick={() => partner.website && window.open(partner.website, "_blank")}>
              <h3 className="text-white text-lg font-semibold px-4 text-center">
                {partner.name}
              </h3>
            </div>
            {partner.website && (
              <div className="mt-2 text-center">
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {partnerSections.map((section) => (
          <button
            key={section.name}
            onClick={() => setActiveTab(section.path)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border ${
              activeTab === section.path
                ? "bg-[#12283c] text-white border-[#0f1e2d]"
                : "bg-white text-gray-700 border-gray-100"
            }`}
          >
            {section.icon}
            <span className="font-medium">{section.name}</span>
          </button>
        ))}
      </div>

      <div className="partners-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            {activeTab} Partners
          </h2>
          {renderPartners()}
        </div>
      </div>
    </div>
  );
}

export default App;