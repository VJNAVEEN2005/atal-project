import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../Api/api";
import {
  Picture1,
  Picture2,
  Picture3,
  Picture4,
  Picture5,
  Picture6,
  Picture7,
  Picture8,
  Picture9,
  Picture10,
  Picture11,
  Picture12,
  Picture13,
  Picture14,
  Picture15,
  Picture16,
  Picture17,
  Picture18,
  Pic1,
  Pic2,
  Pic3,
  Pic4,
  Pic5,
  network,
  funding,
  team,
  media,
  advice,
  training,
} from "../../assets/Services/services";

const services = [
  {
    title: "NETWORKING",
    logo: network,
    details: `Invsetors , Bankers , Industry , Manufacturers , Mentors , Experts`,
    type: "Startup and MSME",
    link: { path: "/partners", state: { activeTab: "Mentors" } },
  },
  {
    title: "FUNDING",
    logo: funding,
    details: `Grants , Seed Funding , Soft loans`,
    type: "Startup and MSME",
    link: { path: "/programs", state: { activeTab: "Sisfs" } },
  },
  {
    title: "IP , TALENT",
    logo: team,
    details: `Technologies , IP management , Faculty expertise, Interns and Research Scholars`,
    type: "Startup and MSME",
    link: { path: "/partners", state: { activeTab: "IP Partners" } },
  },
  {
    title: "VISIBILITY AND OUTREACH",
    logo: media,
    details: `Demo days , Events , Media , Investors`,
    type: "Startup and MSME",
    link: "/events",
  },
  {
    title: "EXPERT ADVISE",
    logo: advice,
    details: `Legal , Accounting , IP , Regulatory , Finance`,
    type: "Startup and MSME",
    link: "/services/expert-advise",
  },
  {
    title: "SOFT SKILL DEVELOPMENT",
    logo: training,
    details: `Bootcamps , Coaching , Workshops , Training`,
    type: "Startup and MSME",
    link: { path: "/programs", state: { activeTab: "Skill Pattara" } },
  },
  {
    title: "PICK AND PLACE MACHINE",
    logo: Picture1,
    details: `Model Name: SMTMATE 660 No of Feeder: 64 Element for mounting: 0201, 0402, 0603, 0805, 1206, SOT, SOD, SOP, SSOP, QFN, VCQFN, BGA. Max chip size: 40*40mm`,
    type: "Equipments",
    link: "#",
  },
  {
    title: "3D SCANNER",
    logo: Picture2,
    details: `Model name: EinScan Pro HD Scan Accuracy: upto 0.045mm Output Formats: OBJ, STL, ASC, PLY, P3, 3MF Supported OS: win10,(64bit)`,
    type: "Equipments",
    link: "#",
  },
  {
    title: "3D PRINTER",
    logo: Picture3,
    details: `Model Name: Raise3D E2 3D Printer Material Type: PLA Print Head Travel Speed: 15–150 mm/s Machine Code Type: GCODE`,
    type: "Equipments",
    link: "#",
  },
  {
    title: "RESIN 3D PRINTER",
    logo: Picture4,
    details: `Model name: Phrozen Sonic Mega 8K 3D Printer size: 475x400x680mm Print volume: 330x185x400mm Max printing speed: 70mm/hr`,
    type: "Equipments",
    link: "#",
  },
  {
    title: "WEGSTR PCB PROTOTYPING MACHINE",
    logo: Picture5,
    details: `Model Name: Wegstr CNC Milling  Working Material: Wood,Aluminium,PCB,Copper,Gold,Silver.`,
    type: "Equipments",
    link: "#",
  },
  {
    title: "LASER CUTTING MACHINE",
    logo: Picture6,
    details: `Model Name: Flux Beam Box Pro Operating Power: 50w Max Cutting Depth: 12mm Versatile: Cutting and Engraving`,
    type: "Equipments",
    link: "#",
  },
  {
    title: "SKYRC 1080 CHARGER FOR LIPO",
    logo: Picture7,
    details: `Model Name: Tattu 22000mAh (6S) Dimension: 206mm Length x 91mm Width x 61mm Height Material: Lithium Polymer`,
    type: "Equipments",
    link: "#",
  },
  {
    title: "CELL IMPEDANCE TESTER",
    logo: Picture8,
    details: `Model Name: BT3563A Max voltage measurement: 300v Response time: 10ms Resistance measurement ranges: 3 mΩ/30 mΩ/300 mΩ/3 Ω/ 30 Ω/300 Ω/3 kΩ`,
    type: "Equipments",
    link: "#",
  },
  {
    title: "INVERTER WELDING MACHINE",
    logo: Picture9,
    details: `MODEL NO: TIG 200 INPUT POWER SUPPLY: I phase, 230v AC RATED CURRENT: 17A EFFICIENCY: 85%`,
    type: "Equipments",
    link: "#",
  },
  {
    title: "SPOT WELDING MACHINE",
    logo: Picture10,
    details: `Model No: SUNKKO 737G Operating Voltage: 220v Portable Pedal Switch Operated`,
    type: "Equipments",
    link: "#",
  },
  {
    title: "AGRICULTURE DRONE",
    logo: Picture11,
    details: `Model Name: Agri Drone (10L) Dimension: 1495*1308*500mm Material: Carbon Fiber`,
    type: "Equipments",
    link: "#",
  },
  {
    title: "GIMBAL",
    logo: Picture12,
    details: `Model name: Tarot FLIR Metal 3 Axis gimbal Milling workspace: (140*200*40) (X*Y*Z) mm Working Material: FLIR thermal imaging cameras Flir VUE 336, VUE640`,
    type: "Equipments",
    link: "#",
  },
  {
    title: "LIDAR 360 SOFTWARE",
    logo: Picture13,
    details: `Software Name: LiDAR360 Installation: 2 systems`,
    type: "Software",
    link: "#",
  },
  {
    title: "E survey software",
    logo: Picture14,
    details: `Version Name: E survey software Installation: 2 systems Usage: Earthwork volume calculations`,
    type: "Software",
    link: "#",
  },
  {
    title: "Agisoft Software",
    logo: Picture15,
    details: `Version Name: Agisoft Cloud Installation: 2 systems Usage: site inspection, annotation and documentation integrated with cloud processing service`,
    type: "Software",
    link: "#",
  },
  {
    title: "KEIL SOFTWARE",
    logo: Picture16,
    details: `Model Name: ARM DEVELOPMENT TOOL Toolchain: RealView MDK-ARM Version: 4.12 Nature of License: Perpetual No of users: 1`,
    type: "Software",
    link: "#",
  },
  {
    title: "PROTEUS VSM SOFTWARE",
    logo: Picture17,
    details: `Version Name: PROTEUS PLATINUM EDITION No of users: 1 platinum edition + 10(lab license) Nature of License: perpetual`,
    type: "Software",
    link: "#",
  },
  {
    title: "ALTAIR",
    logo: Picture18,
    details: `Model Name: ALTAIR MULTIPHYSICS/ MECHATRONICS ENGINEER SUITE No of users: 1(full package) + 30(lab license) Nature of License: Perpetual`,
    type: "Software",
    link: "#",
  },
  {
    title: "3DPRINTER",
    logo: Pic1,
    details: ``,
    type: "Student innovation",
    link: "#",
  },
  {
    title: "CNC PLOTTER",
    logo: Pic2,
    details: ``,
    type: "Student innovation",
    link: "#",
  },
  {
    title: "3DSCANNER",
    logo: Pic3,
    details: ``,
    type: "Student innovation",
    link: "#",
  },
  {
    title: "E-CUBE",
    logo: Pic4,
    details: ``,
    type: "Student innovation",
    link: "#",
  },
  {
    title: "SOLAR DRYER",
    logo: Pic5,
    details: ``,
    type: "Student innovation",
    link: "#",
  },
];

// Generate a unique ID for each equipment based on its title
const getEquipmentId = (title) => {
  return title
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '_') // Replace special chars with underscore
    .replace(/_{2,}/g, '_')     // Replace multiple underscores with single
    .replace(/^_+|_+$/g, '');   // Remove leading/trailing underscores
};

export default function Service() {
  const [filter, setFilter] = useState("Startup and MSME");
  const [expandedSection, setExpandedSection] = useState(null);
  const [equipmentForms, setEquipmentForms] = useState({});
  const [loading, setLoading] = useState(true);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const navigate = useNavigate();

  // Fetch equipment form links
  useEffect(() => {
    const fetchEquipmentForms = async () => {
      try {
        const response = await axios.get(`${api.web}api/v1/equipmentforms`);
        if (response.data && response.data.data) {
          setEquipmentForms(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching equipment forms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentForms();
  }, []);

  // Handle equipment booking
  const handleBookEquipment = (equipmentTitle, e) => {
    e.stopPropagation(); // Prevent card click event
    const equipmentId = getEquipmentId(equipmentTitle);
    const formUrl = equipmentForms[equipmentId];
    
    if (formUrl) {
      window.open(formUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback to inquiry if no form URL is available
      handleInquiry(equipmentTitle, e);
    }
  };

  // Handle equipment inquiry
  const handleInquiry = (equipmentTitle, e) => {
    e.stopPropagation(); // Prevent card click event
    const subject = `Inquiry about ${equipmentTitle}`;
    const body = `I would like to inquire about the availability and booking process for: ${equipmentTitle}.%0D%0A%0D%0APlease provide the following details:%0D%0A1. Preferred date and time for booking%0D%0A2. Duration of use%0D%0A3. Any specific requirements`;
    window.location.href = `mailto:contact@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  const filterOptions = [
    "Startup and MSME",
    "Equipments",
    "Software",
    "Student innovation",
  ];

  const filteredServices =
    filter === "All"
      ? services
      : services.filter((service) => service.type === filter);

  const toggleSection = (type) => {
    setExpandedSection(expandedSection === type ? null : type);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Expert Advise WhatsApp Modal */}
      {showExpertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              onClick={() => setShowExpertModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Contact for Expert Advise</h2>
            <p className="mb-6 text-gray-700 text-center">For legal, accounting, IP, regulatory, or finance advice, connect directly with our expert support on WhatsApp.</p>
            <div className="flex justify-center">
              <a
                href="https://wa.me/7397630093" // Replace with actual WhatsApp number
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2 text-lg font-medium shadow-md transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 14.487c-.263-.131-1.558-.77-1.799-.858-.241-.088-.417-.131-.593.131-.175.263-.678.858-.831 1.033-.153.175-.306.197-.569.066-.263-.131-1.111-.409-2.117-1.304-.783-.698-1.312-1.561-1.466-1.824-.153-.263-.016-.405.115-.536.118-.117.263-.306.395-.459.132-.153.175-.263.263-.438.087-.175.044-.328-.022-.459-.066-.131-.593-1.434-.813-1.963-.214-.514-.432-.444-.593-.453-.153-.009-.328-.011-.502-.011-.175 0-.459.066-.7.328-.241.263-.922.902-.922 2.197s.945 2.549 1.076 2.724c.131.175 1.86 2.84 4.506 3.87.63.217 1.12.346 1.502.443.63.16 1.204.137 1.658.083.506-.06 1.558-.636 1.778-1.252.219-.616.219-1.144.153-1.252-.065-.109-.241-.175-.504-.306z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12c0 1.992.584 3.845 1.594 5.4L2.25 21.75l4.477-1.528A9.708 9.708 0 0012 21.75c5.385 0 9.75-4.365 9.75-9.75z" />
                </svg>
                Contact in WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold text-center mb-8">
        AIC-PECF Service & Supports
      </h1>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleFilter(option)}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                filter === option
                  ? "bg-[#12283c] text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => {
            const isClickable =
              service.link &&
              (typeof service.link === "string"
                ? service.link !== "#"
                : !!service.link.path);

            const handleClick = () => {
              if (service.title === "EXPERT ADVISE") {
                setShowExpertModal(true);
                return;
              }
              if (!isClickable) return;
              if (typeof service.link === "object") {
                navigate(service.link.path, { state: service.link.state });
              } else if (typeof service.link === "string") {
                navigate(service.link);
              }
            };

            return (
              <div
                key={service.title}
                className={`group bg-white rounded-xl relative shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100 hover:border-gray-200 ${
                  isClickable ? "cursor-pointer" : ""
                }`}
                onClick={handleClick}
              >
                <div className="p-6">
                  <div className="h-48 flex items-center justify-center mb-6  rounded-lg p-4 group-hover: transition-colors duration-300">
                    <img
                      src={service.logo}
                      alt={service.title}
                      className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-grow max-w-full">
                    <h3 className={ filter === "Student innovation" ? "text-xl font-semibold text-center text-gray-900 group-hover:text-[#12283c] transition-colors duration-300" : "text-xl font-semibold text-gray-900 group-hover:text-[#12283c] transition-colors duration-300"}>
                  
                      {service.title}
                    </h3>
                    {service.details && (
                      <p className="text-gray-600 text-sm leading-relaxed break-words">
                        {service.details}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100  h-10">
                    {(filter !== "Equipments" && filter !== "Student Inovation")  && (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#12283c]/10 text-[#12283c]">
                        {service.type}
                      </span>
                    )}
                    {filter === "Equipments" && (
                      <div className="flex items-center justify-between absolute w-[85%] bottom-4 mt-2">
                        <button 
                          onClick={(e) => handleBookEquipment(service.title, e)}
                          className="p-2 rounded-lg bg-[#3f6197] text-white hover:bg-[#2c4a7a] transition-colors flex items-center gap-1"
                        >
                          <ExternalLink size={14} />
                          {equipmentForms[getEquipmentId(service.title)] ? 'Book Now' : 'Check Availability'}
                        </button>
                        <button 
                          onClick={(e) => handleInquiry(service.title, e)}
                          className="p-2 rounded-lg bg-[#3f6197] text-white hover:bg-[#2c4a7a] transition-colors"
                        >
                          Enquire
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {filterOptions
          .filter((option) => option !== "All")
          .map((type) => (
            <div
              key={type}
              className="mb-4 rounded-lg overflow-hidden shadow-sm border border-gray-200"
            >
              <button
                onClick={() => toggleSection(type)}
                className="w-full py-4 px-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-medium text-gray-800">
                  {type}
                </span>
                {expandedSection === type ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {expandedSection === type && (
                <div className="px-4 py-2 space-y-4 bg-gray-50">
                  {services
                    .filter((service) => service.type === type)
                    .map((service) => {
                      const isClickable =
                        service.link &&
                        (typeof service.link === "string"
                          ? service.link !== "#"
                          : !!service.link.path);

                      const handleClick = () => {
                        if (!isClickable) return;
                        if (typeof service.link === "object") {
                          navigate(service.link.path, {
                            state: service.link.state,
                          });
                        } else if (typeof service.link === "string") {
                          navigate(service.link);
                        }
                      };

                      return (
                        <div
                          key={service.title}
                          className={` rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 ${
                            isClickable ? "cursor-pointer" : ""
                          }`}
                          onClick={handleClick}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                              <img
                                src={service.logo}
                                alt={service.title}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                            <div className="flex-grow">
                              <h3 className="font-medium text-gray-900 mb-1">
                                {service.title}
                              </h3>
                              {service.details && (
                                <p className="text-xs text-gray-600 break-words leading-relaxed w-full">
                                  {service.details}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
