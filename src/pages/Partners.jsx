import React, { useState } from 'react';
import { Building2, Network, Lightbulb, Handshake, GraduationCap } from 'lucide-react';
import {
  nitLogo,
  ifetlogo,
  pip,
  river,
  rj,
  smvec
} from '../assets/Partnerspage/Academic/AcadamicPartner';
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
} from '../assets/Partnerspage/Corporate/CooperatePartner';

function App() {
  const [activeSection, setActiveSection] = useState('Academic');

  const partnerSections = [
    { name: 'Academic', icon: <GraduationCap className="w-6 h-6" />, path: 'Academic' },
    { name: 'Corporative', icon: <Handshake className="w-6 h-6" />, path: 'Co-operative' },
    { name: 'IP Partners', icon: <Lightbulb className="w-6 h-6" />, path: 'IP Supporters' },
    { name: 'Mentors', icon: <Network className="w-6 h-6" />, path: 'Network' },
    { name: 'Investment', icon: <Building2 className="w-6 h-6" />, path: 'Investment' }
  ];

  const academicPartners = [
    { name: 'NIT Karaikal', logo: nitLogo },
    { name: 'IFET College of Engineering', logo: ifetlogo },
    { name: 'PAJANCOA & RI Karaikal', logo: pip },
    { name: 'Rajiv Gandhi Institute of Veterinary Education and Research (River)', logo: river },
    { name: 'Dr. B. R. Ambedkar Polytechnic College Yanam', logo: rj },
    { name: 'Sri Manakula Vinayagar Engineering College', logo: smvec }
  ];

  const corporatePartners = [
    { name: 'Zoho Corporation', logo: zoho },
    { name: 'Schneider Electric', logo: schneider },
    { name: 'Digi Electronics', logo: digi },
    { name: 'Idea Labs', logo: idea },
    { name: 'Krisp Technologies', logo: kris },
    { name: 'KTech Innovation Hub', logo: ktech },
    { name: 'Lucas TVS', logo: lucas },
    { name: 'Renewable Energy Solutions', logo: re },
    { name: 'Telemedia Solutions', logo: tele },
    { name: 'Touch Enterprises', logo: touch },
    { name: 'Easy Tech', logo: Easy },
    { name: 'DI Corporation', logo: di }
  ];

  const ipPartners = [
    { name: 'Facebook Research', logo: 'https://via.placeholder.com/150?text=FB' },
    { name: 'Google AI', logo: 'https://via.placeholder.com/150?text=Google' },
    { name: 'Microsoft Labs', logo: 'https://via.placeholder.com/150?text=MS' },
    { name: 'OpenAI', logo: 'https://via.placeholder.com/150?text=OpenAI' }
  ];

  const mentorPartners = [
    { name: 'AWS', logo: 'https://via.placeholder.com/150?text=AWS' },
    { name: 'IBM Watson', logo: 'https://via.placeholder.com/150?text=IBM' },
    { name: 'NVIDIA AI', logo: 'https://via.placeholder.com/150?text=NVIDIA' },
    { name: 'Intel Labs', logo: 'https://via.placeholder.com/150?text=Intel' }
  ];

  const investmentPartners = [
    { name: 'Sequoia Capital', logo: 'https://via.placeholder.com/150?text=Sequoia' },
    { name: 'Andreessen Horowitz', logo: 'https://via.placeholder.com/150?text=A16Z' },
    { name: 'SoftBank Vision Fund', logo: 'https://via.placeholder.com/150?text=SoftBank' },
    { name: 'Accel Partners', logo: 'https://via.placeholder.com/150?text=Accel' }
  ];

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
        partners = ipPartners;
        break;
      case 'Network':
        partners = mentorPartners;
        break;
      case 'Investment':
        partners = investmentPartners;
        break;
      default:
        partners = [];
    }

    if (activeSection === "Network" || activeSection === "Investment") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-tr from-[#4E7FAB] to-[#1E2C3D] rounded-xl overflow-hidden transition-all duration-300 hover:from-[#426A90 ] hover:to-[#2A405A] hover:shadow-2xl hover:scale-105 transition-transform duration-300 text-[#12283c]"
            >
              <div className="p-6 h-[300px] flex flex-col items-center justify-center">
                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden bg-gray-100 group-hover:border-2 border-gray-400">
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={`${partner.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-gray-100  transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-blue-100 group-hover:text-blue-100 transition-colors">
                    {activeSection === "Network" ? "Mentor" : "Investor"}
                  </p>
                  <p className="mt-2 text-sm text-blue-100 group-hover:text-blue-100 transition-colors">
                    Expertise: {activeSection} Development
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {partners.map((partner, index) => (
          <div
            key={index}
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
            className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border ${
              activeSection === section.path
                ? 'bg-[#12283c] text-white border-[#0f1e2d]'
                : 'bg-white text-gray-700 border-gray-100'
            }`}
          >
            {section.icon}
            <span className="font-medium">{section.name}</span>
          </button>
        ))}
      </div>

      {/* Partners Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          {activeSection} Partners
        </h2>
        {renderPartners()}
      </div>
    </div>
  );
}

export default App;
