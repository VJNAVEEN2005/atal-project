import React, { useState } from "react";
import { useRef } from "react";
import {
  Building2,
  Network,
  Lightbulb,
  Handshake,
  GraduationCap,
  FileBadge,
  User,
  TrendingUp,
  Rocket,
  Brain,
  FileText,
  PlaneTakeoffIcon
} from "lucide-react";
import { useLocation } from 'react-router-dom';
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
import Puducai_Startup_Sprint from "../components/Programs/Puducai_Startup_Sprint";
import Pre_Incubation from "../components/Programs/Pre_Incubation";
import Acceleration from "../components/Programs/Acceleration";
import Skill_Pattara from "../components/Programs/Skill_Pattara";
import Dass from "../components/Programs/Dass";
import Sisfs from "../components/Programs/Sisfs";
import PropleX from "../components/Programs/PropleX";
import Startup_Sprouting from "../components/Programs/StartupSprouting";
import { GiSprint } from "react-icons/gi";
import { FaSeedling } from "react-icons/fa";
import { TbPropeller } from "react-icons/tb";
import { IoBulbOutline } from "react-icons/io5";

function Programs() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(location.state?.activeTab || "Puduvai Startup Sprint");

  const programsSections = [
    {
      name: "Puduvai Startup Sprint",
      icon: <GiSprint className="w-6 h-6" />,
      path: "Puduvai Startup Sprint",
    },
    {
      name: "Pre-Incubation",
      icon: <FaSeedling className="w-6 h-6" />,
      path: "Pre-Incubation",
    },
    {
      name: "Acceleration",
      icon: <Rocket className="w-6 h-6" />,
      path: "Acceleration",
    },
    {
      name: "Skill Pattara",
      icon: <GraduationCap className="w-6 h-6" />,
      path: "Skill Pattara",
    },
    {
      name: "Dass",
      icon: <FileText className="w-6 h-6" />,
      path: "Dass",
    },
    {
      name: "SISFS",
      icon: <IoBulbOutline className="w-6 h-6" />,
      path: "Sisfs",
    },
    {
      name: "Propel-X",
      icon: <TbPropeller className="w-6 h-6" />,
      path: "PropleX",
    },
    {
      name: "Startup Sprouting",
      icon:<PlaneTakeoffIcon className="w-6 h-6"/>,
      path:"Startup Sprouting"
    }
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
    let programs;
    switch (activeSection) {
      case "Puduvai Startup Sprint":
        programs = preIncubate;
        break;
      case "Pre-Incubation":
        programs = incubate;
        break;
      case "Acceleration":
        programs = incubation;
        break;
      case "Skill Pattara":
        programs = ipFacilities;
        break;
      case "Dass":
        programs = ipFacilities;
        break;
      case "Startup Sprouting":
        programs = ipFacilities;
      default:
        programs = [];
    }

    
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
      <div className=" flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {/* {activeSection} Programs */}
        </h2>
        <div className="w-full max-w-7xl px-6">{renderPartners()}</div>
      </div>


      <div className=" mx-1 md:mx-10">
      {activeSection === "Puduvai Startup Sprint" && (
        <div><Puducai_Startup_Sprint/></div>
      )}
      {activeSection === "Pre-Incubation" && (
        <div><Pre_Incubation/></div>
      )}
      {activeSection === "Acceleration" && (
        <div><Acceleration/></div>
      )}
      {activeSection === "Skill Pattara" && (
        <div><Skill_Pattara/></div>
      )}
      {activeSection === "Dass" && (
        <div><Dass/></div>
      )}
      {activeSection === "Sisfs" && (
        <div><Sisfs/></div>
      )}
      {activeSection === "PropleX" && (
        <div><PropleX/></div>
      )}
      {
        activeSection === "Startup Sprouting" && (
          <div><Startup_Sprouting/></div>
        )
      }
      </div>


    </div>
  );
}

export default Programs;
