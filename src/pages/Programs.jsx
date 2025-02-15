import React, { useState } from "react";
import {
  Building2,
  Network,
  Lightbulb,
  Handshake,
  GraduationCap,
} from "lucide-react";
import {
  nitLogo,
  ifetlogo,
  pip,
  river,
  rj,
  smvec,
} from "../assets/Partnerspage/Academic/AcadamicPartner";
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
  zoho,
} from "../assets/Partnerspage/Corporate/CooperatePartner";

function Programs() {
  const [activeSection, setActiveSection] = useState("Pre-Incubate");

  const programsSections = [
    {
      name: "Pre-Incubate",
      icon: <GraduationCap className="w-6 h-6" />,
      path: "Pre-Incubate",
    },
    {
      name: "Incubate",
      icon: <Handshake className="w-6 h-6" />,
      path: "Incubate",
    },
    {
      name: "Incubation",
      icon: <Lightbulb className="w-6 h-6" />,
      path: "Incubation",
    },
    {
      name: "IP Facilities",
      icon: <Network className="w-6 h-6" />,
      path: "IP Facilities",
    },
  ];

  const preIncubate = [
    { name: "NIT Karaikal", logo: nitLogo },
    { name: "IFET College of Engineering", logo: ifetlogo },
    { name: "PAJANCOA & RI Karaikal", logo: pip },
    {
      name: "Rajiv Gandhi Institute of Veterinary Education and Research (River)",
      logo: river,
    },
    { name: "Dr. B. R. Ambedkar Polytechnic College Yanam", logo: rj },
    { name: "Sri Manakula Vinayagar Engineering College", logo: smvec },
  ];

  const incubate = [
    { name: "Zoho Corporation", logo: zoho },
    { name: "Schneider Electric", logo: schneider },
    { name: "Digi Electronics", logo: digi },
    { name: "Idea Labs", logo: idea },
    { name: "Krisp Technologies", logo: kris },
    { name: "KTech Innovation Hub", logo: ktech },
    { name: "Lucas TVS", logo: lucas },
    { name: "Renewable Energy Solutions", logo: re },
    { name: "Telemedia Solutions", logo: tele },
    { name: "Touch Enterprises", logo: touch },
    { name: "Easy Tech", logo: Easy },
    { name: "DI Corporation", logo: di },
  ];

  const incubation = [
    {
      name: "Facebook Research",
      logo: "https://via.placeholder.com/150?text=FB",
    },
    { name: "Google AI", logo: "https://via.placeholder.com/150?text=Google" },
    { name: "Microsoft Labs", logo: "https://via.placeholder.com/150?text=MS" },
    { name: "OpenAI", logo: "https://via.placeholder.com/150?text=OpenAI" },
  ];

  const ipFacilities = [
    { name: "AWS", logo: "https://via.placeholder.com/150?text=AWS" },
    { name: "IBM Watson", logo: "https://via.placeholder.com/150?text=IBM" },
    { name: "NVIDIA AI", logo: "https://via.placeholder.com/150?text=NVIDIA" },
    { name: "Intel Labs", logo: "https://via.placeholder.com/150?text=Intel" },
  ];

  const renderPartners = () => {
    let partners;
    switch (activeSection) {
      case "Pre-Incubate":
        partners = preIncubate;
        break;
      case "Incubate":
        partners = incubate;
        break;
      case "Incubation":
        partners = incubation;
        break;
      case "IP Facilities":
        partners = ipFacilities;
        break;
      default:
        partners = [];
    }

    return partners.length > 0 ? (
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
    ) : (
      <p className="text-center text-gray-500">No partners available.</p>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Boxes */}
      <div className="flex flex-wrap justify-center gap-4 p-6">
        {programsSections.map((section) => (
          <button
            key={section.name}
            onClick={() => setActiveSection(section.path)}
            className={`flex items-center gap-2 px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border ${
              activeSection === section.path
                ? "border-blue-500"
                : "border-gray-100"
            }`}
          >
            {section.icon}
            <span className="font-medium text-gray-700">{section.name}</span>
          </button>
        ))}
      </div>

      {/* Partners Section */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {activeSection} Partners
        </h2>
        <div className="w-full max-w-7xl px-6">{renderPartners()}</div>
      </div>
    </div>
  );
}

export default Programs;
