import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Picture1, Picture2, Picture3, Picture4, Picture5, Picture6,
  Picture7, Picture8, Picture9, Picture10, Picture11, Picture12,
  Picture13, Picture14, Picture15, Picture16, Picture17, Picture18, Pic1, Pic2, Pic3, Pic4, Pic5,
  network,funding,team,media,advice,training
} from '../../assets/Services/services';


const services = [
  {
    title: 'NETWORKING',
    logo: network,
    details: `Invsetors , Bankers , Industry , Manufacturers , Mentors , Experts`,
    type: 'Startup and MSME',
    link: { path: '/partners', state: { activeTab: 'Mentors' } },
  },
  {
    title: 'FUNDING',
    logo: funding,
    details: `Grants , Seed Funding , Soft loans`,
    type: 'Startup and MSME',
    link: '/services/funding',
  },
  {
    title: 'IP , TALENT',
    logo: team,
    details: `Technologies , IP management , Faculty expertise, Interns and Research Scholars`,
    type: 'Startup and MSME',
    link: '/services/ip-talent',
  },
  {
    title: 'VISIBILITY AND OUTREACH',
    logo: media,
    details: `Demo days , Events , Media , Investors`,
    type: 'Startup and MSME',
    link: '/events',
  },
  {
    title: 'EXPERT ADVISE',
    logo: advice,
    details: `Legal , Accounting , IP , Regulatory , Finance`,
    type: 'Startup and MSME',
    link: '/services/expert-advise',
  },
  {
    title: 'SOFT SKILL DEVELOPMENT',
    logo: training,
    details: `Bootcamps , Coaching , Workshops , Training`,
    type: 'Startup and MSME',
    link: { path: '/programs', state: { activeTab: 'Skill Pattara' } },
  },
  {
    title: 'PICK AND PLACE MACHINE',
    logo: Picture1,
    details: `Model Name: SMTMATE 660 No of Feeder: 64 Element for mounting: 0201, 0402, 0603, 0805, 1206, SOT, SOD, SOP, SSOP, QFN, VCQFN, BGA. Max chip size: 40*40mm`,
    type: 'Prototype',
    link: '#',
  },
  {
    title: '3D SCANNER',
    logo: Picture2,
    details: `Model name: EinScan Pro HD Scan Accuracy: upto 0.045mm Output Formats: OBJ, STL, ASC, PLY, P3, 3MF Supported OS: win10,(64bit)`,
    type: 'Prototype',
    link: '#',
  },
  {
    title: '3D PRINTER',
    logo: Picture3,
    details: `Model Name: Raise3D E2 3D Printer Material Type: PLA Print Head Travel Speed: 15–150 mm/s Machine Code Type: GCODE`,
    type: 'Prototype',
    link: '#',
  },
  {
    title: 'RESIN 3D PRINTER',
    logo: Picture4,
    details: `Model name: Phrozen Sonic Mega 8K 3D Printer size: 475x400x680mm Print volume: 330x185x400mm Max printing speed: 70mm/hr`,
    type: 'Prototype',
    link: '#',
  },
  {
    title: 'WEGSTR PCB PROTOTYPING MACHINE',
    logo: Picture5,
    details: `Model Name: Wegstr CNC Milling  Working Material: Wood,Aluminium,PCB,Copper,Gold,Silver.`,
    type: 'Prototype',
    link: '#',
  },
  {
    title: 'LASER CUTTING MACHINE',
    logo: Picture6,
    details: `Model Name: Flux Beam Box Pro Operating Power: 50w Max Cutting Depth: 12mm Versatile: Cutting and Engraving`,
    type: 'Prototype',
    link: '#',
  },
  {
    title: 'SKYRC 1080 CHARGER FOR LIPO',
    logo: Picture7,
    details: `Model Name: Tattu 22000mAh (6S) Dimension: 206mm Length x 91mm Width x 61mm Height Material: Lithium Polymer`,
    type: 'Prototype',
    link: '#',
  },
  {
    title: 'CELL IMPEDANCE TESTER',
    logo: Picture8,
    details: `Model Name: BT3563A Max voltage measurement: 300v Response time: 10ms Resistance measurement ranges: 3 mΩ/30 mΩ/300 mΩ/3 Ω/ 30 Ω/300 Ω/3 kΩ`,
    type: 'Prototype',
    link: '#',
  },
  {
    title: 'INVERTER WELDING MACHINE',
    logo: Picture9,
    details: `MODEL NO: TIG 200 INPUT POWER SUPPLY: I phase, 230v AC RATED CURRENT: 17A EFFICIENCY: 85%`,
    type: 'Prototype',
    link: '#',
  },
  {
    title: 'SPOT WELDING MACHINE',
    logo: Picture10,
    details: `Model No: SUNKKO 737G Operating Voltage: 220v Portable Pedal Switch Operated`,
    type: 'Prototype',
    link: '#',
  },
  {
    title: 'AGRICULTURE DRONE',
    logo: Picture11,
    details: `Model Name: Agri Drone (10L) Dimension: 1495*1308*500mm Material: Carbon Fiber`,
    type: 'Prototype',
    link: '#',
  },
  {
    title: 'GIMBAL',
    logo: Picture12,
    details: `Model name: Tarot FLIR Metal 3 Axis gimbal Milling workspace: (140*200*40) (X*Y*Z) mm Working Material: FLIR thermal imaging cameras Flir VUE 336, VUE640`,
    type: 'Prototype',
    link: '#',
  },
  {
    title: 'LIDAR 360 SOFTWARE',
    logo: Picture13,
    details: `Software Name: LiDAR360 Installation: 2 systems`,
    type: 'Software',
    link: '#',
  },
  {
    title: 'E survey software',
    logo: Picture14,
    details: `Version Name: E survey software Installation: 2 systems Usage: Earthwork volume calculations`,
    type: 'Software',
    link: '#',
  },
  {
    title: 'Agisoft Software',
    logo: Picture15,
    details: `Version Name: Agisoft Cloud Installation: 2 systems Usage: site inspection, annotation and documentation integrated with cloud processing service`,
    type: 'Software',
    link: '#',
  },
  {
    title: 'KEIL SOFTWARE',
    logo: Picture16,
    details: `Model Name: ARM DEVELOPMENT TOOL Toolchain: RealView MDK-ARM Version: 4.12 Nature of License: Perpetual No of users: 1`,
    type: 'Software',
    link: '#',
  },
  {
    title: 'PROTEUS VSM SOFTWARE',
    logo: Picture17,
    details: `Version Name: PROTEUS PLATINUM EDITION No of users: 1 platinum edition + 10(lab license) Nature of License: perpetual`,
    type: 'Software',
    link: '#',
  },
  {
    title: 'ALTAIR',
    logo: Picture18,
    details: `Model Name: ALTAIR MULTIPHYSICS/ MECHATRONICS ENGINEER SUITE No of users: 1(full package) + 30(lab license) Nature of License: Perpetual`,
    type: 'Software',
    link: '#',
  },
  {
    title: '3DPRINTER',
    logo: Pic1,
    details: ``,
    type: 'Student innovation',
    link: '#',
  },
  {
    title: 'CNC PLOTTER',
    logo: Pic2,
    details: ``,
    type: 'Student innovation',
    link: '#',
  },
  {
    title: '3DSCANNER',
    logo: Pic3,
    details: ``,
    type: 'Student innovation',
    link: '#',
  },
  {
    title: 'E-CUBE',
    logo: Pic4,
    details: ``,
    type: 'Student innovation',
    link: '#',
  },
  {
    title: 'SOLAR DRYER',
    logo: Pic5,
    details: ``,
    type: 'Student innovation',
    link: '#',
  },
];

export default function Service() {
  const [filter, setFilter] = useState('Prototype');
  const [expandedSection, setExpandedSection] = useState(null);
  const navigate = useNavigate();

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  const filterOptions = ['Startup and MSME', 'Prototype', 'Software', 'Student innovation'];

  const filteredServices = filter === 'All' ? services : services.filter(service => service.type === filter);

  const toggleSection = (type) => {
    setExpandedSection(expandedSection === type ? null : type);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">AIC-PECF Service & Supports</h1>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleFilter(option)}
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                filter === option
                  ? 'bg-[#12283c] text-white shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => {
            const isClickable = service.link && (typeof service.link === 'string' ? service.link !== '#' : !!service.link.path);
            
            const handleClick = () => {
              if (!isClickable) return;
              if (typeof service.link === 'object') {
                navigate(service.link.path, { state: service.link.state });
              } else if (typeof service.link === 'string') {
                navigate(service.link);
              }
            };

            return (
              <div
                key={service.title}
                className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100 hover:border-gray-200 ${
                  isClickable ? 'cursor-pointer' : ''
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
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#12283c] transition-colors duration-300">
                      {service.title}
                    </h3>
                    {service.details && (
                      <p className="text-gray-600 text-sm leading-relaxed break-words">
                        {service.details}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#12283c]/10 text-[#12283c]">
                      {service.type}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {filterOptions.filter(option => option !== 'All').map((type) => (
          <div key={type} className="mb-4 rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <button
              onClick={() => toggleSection(type)}
              className="w-full py-4 px-4 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-medium text-gray-800">{type}</span>
              {expandedSection === type ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {expandedSection === type && (
              <div className="px-4 py-2 space-y-4 bg-gray-50">
                {services
                  .filter(service => service.type === type)
                  .map((service) => {
                    const isClickable = service.link && (typeof service.link === 'string' ? service.link !== '#' : !!service.link.path);
                    
                    const handleClick = () => {
                      if (!isClickable) return;
                      if (typeof service.link === 'object') {
                        navigate(service.link.path, { state: service.link.state });
                      } else if (typeof service.link === 'string') {
                        navigate(service.link);
                      }
                    };

                    return (
                      <div
                        key={service.title}
                        className={` rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 ${
                          isClickable ? 'cursor-pointer' : ''
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
                          <h3 className="font-medium text-gray-900 mb-1">{service.title}</h3>
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