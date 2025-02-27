import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Picture1, Picture2, Picture3, Picture4, Picture5, Picture6,
  Picture7, Picture8, Picture9, Picture10, Picture11, Picture12,
  Picture13, Picture14, Picture15, Picture16, Picture17, Picture18, Pic1, Pic2, Pic3, Pic4, Pic5
} from '../../assets/Services/services';

const services = [
  {
    title: 'PICK AND PLACE MACHINE',
    logo: Picture1,
    details: `Model Name: SMTMATE 660 No of Feeder: 64 Element for mounting: 0201, 0402, 0603, 0805, 1206, SOT, SOD, SOP, SSOP, QFN, VCQFN, BGA. Max chip size: 40*40mm`,
    type: 'Prototype',
  },
  {
    title: '3D SCANNER',
    logo: Picture2,
    details: `Model name: EinScan Pro HD Scan Accuracy: upto 0.045mm Output Formats: OBJ, STL, ASC, PLY, P3, 3MF Supported OS: win10,(64bit)`,
    type: 'Prototype',
  },
  {
    title: '3D PRINTER',
    logo: Picture3,
    details: `Model Name: Raise3D E2 3D Printer Material Type: PLA Print Head Travel Speed: 15–150 mm/s Machine Code Type: GCODE`,
    type: 'Prototype',
  },
  {
    title: 'RESIN 3D PRINTER',
    logo: Picture4,
    details: `Model name: Phrozen Sonic Mega 8K 3D Printer size: 475x400x680mm Print volume: 330x185x400mm Max printing speed: 70mm/hr`,
    type: 'Prototype',
  },
  {
    title: 'WEGSTR PCB PROTOTYPING MACHINE',
    logo: Picture5,
    details: `Model Name: Wegstr CNC Milling  Working Material: Wood,Aluminium,PCB,Copper,Gold,Silver.`,
    type: 'Prototype',
  },
  {
    title: 'LASER CUTTING MACHINE',
    logo: Picture6,
    details: `Model Name: Flux Beam Box Pro Operating Power: 50w Max Cutting Depth: 12mm Versatile: Cutting and Engraving`,
    type: 'Prototype',
  },
  {
    title: 'SKYRC 1080 CHARGER FOR LIPO',
    logo: Picture7,
    details: `Model Name: Tattu 22000mAh (6S) Dimension: 206mm Length x 91mm Width x 61mm Height Material: Lithium Polymer`,
    type: 'Prototype',
  },
  {
    title: 'CELL IMPEDANCE TESTER',
    logo: Picture8,
    details: `Model Name: BT3563A Max voltage measurement: 300v Response time: 10ms Resistance measurement ranges: 3 mΩ/30 mΩ/300 mΩ/3 Ω/ 30 Ω/300 Ω/3 kΩ`,
    type: 'Prototype',
  },
  {
    title: 'INVERTER WELDING MACHINE',
    logo: Picture9,
    details: `MODEL NO: TIG 200 INPUT POWER SUPPLY: I phase, 230v AC RATED CURRENT: 17A EFFICIENCY: 85%`,
    type: 'Prototype',
  },
  {
    title: 'SPOT WELDING MACHINE',
    logo: Picture10,
    details: `Model No: SUNKKO 737G Operating Voltage: 220v Portable Pedal Switch Operated`,
    type: 'Prototype',
  },
  {
    title: 'AGRICULTURE DRONE',
    logo: Picture11,
    details: `Model Name: Agri Drone (10L) Dimension: 1495*1308*500mm Material: Carbon Fiber`,
    type: 'Prototype',
  },
  {
    title: 'GIMBAL',
    logo: Picture12,
    details: `Model name: Tarot FLIR Metal 3 Axis gimbal Milling workspace: (140*200*40) (X*Y*Z) mm Working Material: FLIR thermal imaging cameras Flir VUE 336, VUE640`,
    type: 'Prototype',
  },
  {
    title: 'LIDAR 360 SOFTWARE',
    logo: Picture13,
    details: `Software Name: LiDAR360 Installation: 2 systems`,
    type: 'Software',
  },
  {
    title: 'E survey software',
    logo: Picture14,
    details: `Version Name: E survey software Installation: 2 systems Usage: Earthwork volume calculations`,
    type: 'Software',
  },
  {
    title: 'Agisoft Software',
    logo: Picture15,
    details: `Version Name: Agisoft Cloud Installation: 2 systems Usage: site inspection, annotation and documentation integrated with cloud processing service`,
    type: 'Software',
  },
  {
    title: 'KEIL SOFTWARE',
    logo: Picture16,
    details: `Model Name: ARM DEVELOPMENT TOOL Toolchain: RealView MDK-ARM Version: 4.12 Nature of License: Perpetual No of users: 1`,
    type: 'Software',
  },
  {
    title: 'PROTEUS VSM SOFTWARE',
    logo: Picture17,
    details: `Version Name: PROTEUS PLATINUM EDITION No of users: 1 platinum edition + 10(lab license) Nature of License: perpetual`,
    type: 'Software',
  },
  {
    title: 'ALTAIR',
    logo: Picture18,
    details: `Model Name: ALTAIR MULTIPHYSICS/ MECHATRONICS ENGINEER SUITE No of users: 1(full package) + 30(lab license) Nature of License: Perpetual`,
    type: 'Software',
  },
  {
    title: '3DPRINTER',
    logo: Pic1,
    details: ``,
    type: 'Student innovation',
  },
  {
    title: 'CNC PLOTTER',
    logo: Pic2,
    details: ``,
    type: 'Student innovation',
  },
  {
    title: '3DSCANNER',
    logo: Pic3,
    details: ``,
    type: 'Student innovation',
  },
  {
    title: 'E-CUBE',
    logo: Pic4,
    details: ``,
    type: 'Student innovation',
  },
  {
    title: 'SOLAR DRYER',
    logo: Pic5,
    details: ``,
    type: 'Student innovation',
  },
];

export default function Service() {
  const [filter, setFilter] = useState('Prototype');
  const [expandedSection, setExpandedSection] = useState(null);

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  const filterOptions = ['Prototype', 'Software', 'Student innovation'];

  const filteredServices = filter === 'All' ? services : services.filter(service => service.type === filter);

  const toggleSection = (type) => {
    setExpandedSection(expandedSection === type ? null : type);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold text-center mb-8">AIC-PECF Service & Supports</h1>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex justify-center gap-4 mb-8">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleFilter(option)}
              className={`px-6 py-2 rounded-md transition-colors ${
                filter === option
                  ? 'bg-[#12283c] text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-20 ">
          {filteredServices.map((service) => (
            <div
              key={service.title}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-[rgba(0,0,0,0.35)_0px_5px_15px] transition-all duration-300 hover:scale-105 h-[350px] flex flex-col "
            >
              <img
                src={service.logo}
                alt={service.title}
                className="w-full h-48 object-contain mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold mb-3 ">{service.title}</h3>
              <p className="text-gray-600 text-sm mbau flex-grow">{service.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {filterOptions.filter(option => option !== 'All').map((type) => (
          <div key={type} className="border-b border-gray-200">
            <button
              onClick={() => toggleSection(type)}
              className="w-full py-4 px-4 flex justify-between items-center bg-gray-50"
            >
              <span className="text-lg font-medium">{type}</span>
              {expandedSection === type ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {expandedSection === type && (
              <div className="px-4 py-2 space-y-4">
                {services
                  .filter(service => service.type === type)
                  .map((service) => (
                    <div key={service.title} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start gap-4">
                        <img
                          src={service.logo}
                          alt={service.title}
                          className="w-20 h-20 object-contain rounded"
                        />
                        <div>
                          <h3 className="font-medium text-sm mb-1">{service.title}</h3>
                          <p className="text-xs text-gray-600">{service.details}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
