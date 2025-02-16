import React from 'react';
import { motion } from 'framer-motion';
import { drone, embedded, iot } from '../../assets/Focus/image/focus';


const focusAreas = [
  {
    title: "Electronics Design and Manufacturing",
    image: embedded,
    details: [
      "PCB design and prototyping",
      "Surface Mount PCB Assembly",
      "PCB Through-Hole assembly",
      "PCB box build and final assembly",
      "PCB testing",
      "PCB conformal coating and potting",
      "Engineering support"
    ]
  },
  {
    title: "Internet of Things (IoT)",
    image: iot,
    details: [
      "Gateway management",
      "Connectivity of Devices",
      "Cloud Management",
      "Data Analytics",
      "Embedded Computing",
      "Artificial Intelligence",
      "System Implementation"
    ]
  },
  {
    title: "Unmanned Aerial Vehicle (UAV)",
    image: drone,
    details: [
      "UAV system Integration and Testing",
      "Ground station Control and Navigation support",
      "Trajectory generation and trajectory following control",
      "Vision-based navigation",
      "Flight planning in complex fields and atmospheric sensing",
      "Mapping algorithms"
    ]
  }
];

console.log(drone);

const Focus = () => {
  const handleApply = (title) => {
    alert(`Applied for ${title}`);
    // You can add your application logic here
  };

  return (
    <div>

<div className="w-full block md:hidden px-4 sm:px-6 lg:px-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-gray-900 mb-16 text-center"
      >
        Focus Areas
      </motion.h1>
      
      <div className="flex flex-col flex-nowrap gap-8 overflow-x-auto pb-8 px-4">
        {focusAreas.map((area, index) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 flex-shrink-0"
            style={{ width: '' }}
          >
            <div className="relative overflow-hidden">
              <img
                src={area.image}
                alt={area.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{area.title}</h2>
              
              {/* Hover overlay with details */}
              <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <div className="p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg font-bold mb-6 text-blue-400">{area.title}</h3>
                  <ul className="space-y-3 mb-8">
                    {area.details.map((detail, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-xs"
                      >
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* Apply Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleApply(area.title)}
                    className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Apply Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <div className=" hidden md:block w-full px-4 sm:px-6 lg:px-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-gray-900 mb-16 text-center"
      >
        Focus Areas
      </motion.h1>
      
      <div className="flex flex-nowrap gap-8 overflow-x-auto pb-8 px-4">
        {focusAreas.map((area, index) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 flex-shrink-0"
            style={{ width: 'calc(33.333% - 1.5rem)' }}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={area.image}
                alt={area.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            <div className="p-8">
              <div className=' flex justify-center items-center'>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{area.title}</h2>
              </div>
              
              {/* Hover overlay with details */}
              <div className="absolute inset-0 bg-black/95 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <div className="p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-bold mb-6 text-blue-400">{area.title}</h3>
                  <ul className="space-y-3 mb-8">
                    {area.details.map((detail, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-sm"
                      >
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* Apply Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleApply(area.title)}
                    className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Explore Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>


    </div>
  );
};

export default Focus;