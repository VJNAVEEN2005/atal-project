import React from 'react';
import { motion } from 'framer-motion';
import { daas } from '../../assets/Programs/Dass/data';

const Dass = () => {
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };
  
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const cardHover = {
    rest: { scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  const supportCategories = [
    {
      title: "Data Processing Support",
      color: "#34b3a6",
      items: [
        { name: "Agrisoft Metashape", detail: "100 Sq.km of 2D data per day" },
        { name: "Bentley Content Capture", detail: "20 sq. km of 3D data per day" }
      ]
    },
    {
      title: "Prototyping Support",
      color: "#d81b60",
      items: [
        { name: "FDM 3D Printers", detail: "" },
        { name: "Laser Cutting", detail: "" },
        { name: "3D Scanner", detail: "" },
        { name: "CNC Routing/Miling", detail: "" },
        { name: "C.A.D Support", detail: "" }
      ]
    },
    {
      title: "Drone / Payload Support",
      color: "#f5a623",
      items: [
        { name: "Thermal Camera", detail: "Flir Vue pro 13mm 640x512" },
        { name: "Mapping Camera", detail: "Sony 24.1 mp" },
        { name: "Surveillance Camera", detail: "10xZoom Camera 24.1" }
      ]
    }
  ];

  return (
    <motion.div 
      initial="initial" 
      animate="animate" 
      className="bg-white py-14 px-4 shadow-xl rounded-lg mb-10"
    >
      {/* Header Section */}
      <motion.div 
        variants={fadeIn}
        className="max-w-6xl mx-auto mb-16 text-center "
      >
        <motion.div className="flex justify-center mb-8 ">
          <img className="w-full max-w-2xl shadow-xl rounded-lg" src={daas} alt="DaaS Logo" />
        </motion.div>
        <motion.p 
          variants={fadeIn}
          className="text-lg text-gray-700 max-w-4xl mx-auto"
        >
          DaaS offers comprehensive incubation and technology development programs specifically designed for drone startups and GIS mapping companies. Our suite of support services spans data processing, prototyping, and specialized drone/payload options.
        </motion.p>
      </motion.div>

      {/* Support Categories */}
      <motion.div 
        variants={staggerContainer}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {supportCategories.map((category, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            initial="rest"
            whileHover="hover"
            className="relative bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Top curved shape */}
            <div className="h-4 w-full" style={{ backgroundColor: category.color }}></div>
            
            <motion.div variants={cardHover} className="p-6 pb-16">
              {/* Title with circle icon */}
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center border-4" style={{ borderColor: category.color }}>
                  <motion.div 
                    className="w-12 h-12 rounded-full"
                    style={{ backgroundColor: category.color }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <h2 className="ml-4 text-2xl font-bold" style={{ color: category.color }}>
                  {category.title}
                </h2>
              </div>
              
              {/* Items list */}
              <ul className="space-y-4">
                {category.items.map((item, idx) => (
                  <motion.li 
                    key={idx}
                    className="flex items-start"
                    whileHover={{ x: 5 }}
                  >
                    <span className="inline-block mr-2 mt-1 text-sm" style={{ color: category.color }}>✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      {item.detail && (
                        <p className="text-sm text-gray-600">{item.detail}</p>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Bottom curved shape */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-12"
              style={{ 
                backgroundColor: category.color,
                borderTopLeftRadius: '50%',
                borderTopRightRadius: '50%',
                transform: 'scaleX(1.5) translateY(40%)'
              }}
            ></div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* CTA Section */}
      <motion.div 
        variants={fadeIn}
        className="text-center mt-16 max-w-2xl mx-auto"
      >
        <motion.h3 
          className="text-2xl font-bold text-gray-800 mb-6"
          animate={{ color: ['#f15a29', '#0069b4', '#f15a29'] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Join Our Incubation Program
        </motion.h3>
        <p className="text-gray-700 mb-8">
          Get access to cutting-edge technology, expert guidance, and comprehensive support for your drone or GIS mapping startup.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#3f6197] text-white px-8 py-3 rounded-md font-medium shadow-lg"
        >
          Apply Now
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Dass;