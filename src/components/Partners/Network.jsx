import React, { useState } from 'react';
import { Building2, Network, Lightbulb, Handshake, GraduationCap } from 'lucide-react';
import {
  nitLogo,
  ifetlogo,
  pip,
  river,
  rj,
  smvec
} from '../../assets/Partnerspage/Academic/AcadamicPartner';
import {
  di,
  digi,
  Easy,
  idea,
  kris,
  ktech,
  lucas,
  re,
  schneider,
  tele,
  touch,
  zoho
} from '../../assets/Partnerspage/Corporate/CooperatePartner';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPartners } from "../../Redux/slice/partnerSlice";
function App() {
  const [activeSection, setActiveSection] = useState('Network');

  const partnerSections = [
    { name: 'Academic', icon: <GraduationCap className="w-6 h-6" />, path: 'Academic' },
    { name: 'Co-operative', icon: <Handshake className="w-6 h-6" />, path: 'Co-operative' },
    { name: 'IP Supporters', icon: <Lightbulb className="w-6 h-6" />, path: 'IP Supporters' },
    { name: 'Network', icon: <Network className="w-6 h-6" />, path: 'Network' },
    { name: 'Investment', icon: <Building2 className="w-6 h-6" />, path: 'Investment' }
  ];

 const dispatch = useDispatch();
       const { partners, loading, error } = useSelector((state) => state.partners);
    useEffect(() => {
       dispatch(fetchPartners(activeSection));
     }, [dispatch, activeSection]);
   
     const filteredPartners = partners.filter(
       (partner) => partner.type === activeSection
     );
  const renderPartners = () => {
    let partners;
    switch (activeSection) {
      case 'Academic':
        partners = academicPartners;
        break;
      case 'Co-operative':
        partners = corporatePartners;
        break;
      case 'IP Supporters':
        partners = ipSupporters;
        break;
      case 'Network':
        partners = networkPartners;
        break;
      case 'Investment':
        partners = investmentPartners;
        break;
      default:
        partners = [];
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
       {filteredPartners.map((partner, index) => (
          <div
              key={partner._id || index}
            className="relative group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="w-full h-32 flex items-center justify-center">
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="mt-4 opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300 rounded-xl">
              <h3 className="text-white text-lg font-semibold px-4 text-center">
                {partner.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      {/* Navigation Boxes */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {partnerSections.map((section) => (
          <button
            key={section.name}
            onClick={() => setActiveSection(section.path)}
            className={`flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border ${
              activeSection === section.path ? 'border-blue-500' : 'border-gray-100'
            }`}
          >
            {section.icon}
            <span className="font-medium text-gray-700">{section.name}</span>
          </button>
        ))}
      </div>

      {/* Partners Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          {activeSection} Partners
        </h2>
          {loading ? <div>Loading...</div> : error ? <div>{error}</div> : renderPartners()}
      </div>
    </div>
  );
}

export default App;
