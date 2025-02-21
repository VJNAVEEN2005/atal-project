import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Road_Map = () => {
  // Timeline data organized by year
  const timelineData = {
    '2019': [
      { month: 'March', event: 'AIC-PECF receives the 1st tranche of AIM Grant-in-Aid.' },
      { month: 'March', event: 'Official launch of AIC-PECF during Puducherry Startup Summit.' }
    ],
    '2020': [
      { month: 'January', event: 'AIC-PECF conducts its 1st outreach startup event, Startup Ignite.' },
      { month: 'February', event: 'AIC-PECF organizes its 1st innovation contest, Prototest\'20.' },
      { month: 'March', event: 'AIC-PECF collaborates with CII Puducherry for the Key Ecosystem Initiative.' }
    ],
    '2021': [
      { month: 'March', event: 'Successfully achieved AIM Tranche-1 (G&D).' },
      { month: 'August', event: 'AIC-PECF & CII Puducherry launch the Maiden CII Puducherry Innovation Contest.' },
      { month: 'October', event: 'AIC-PECF receives recognition for its work by Manatec Electronics via CSR support.' },
      { month: 'October', event: 'AIC-PECF receives the 2nd tranche of AIM Grant-in-Aid.' },
      { month: 'November', event: 'AIC-PECF selected for the SISFS Scheme in the 8th EAC Meeting by DPIIT, GoI.' }
    ],
    '2022': [
      { month: 'July', event: 'With AIC-PECF\'s support, Puducherry was awarded Aspirational Leaders among UTs by DPIIT National Startup Ecosystem Ranking 2021.' },
      { month: 'July', event: '1st edition of AIC-PECF Startup Rendezvous.' },
      { month: 'September', event: 'AIM SAMVAAD Puducherry Chapter & Puducherry Startups\' 1st Demo Day.' },
      { month: 'October', event: 'AIC-PECF & CII Puducherry conduct the 2nd edition of the Innovation Contest.' },
      { month: 'November', event: '3rd edition of CII Puducherry Startup Summit.' }
    ],
    '2023': [
      { month: 'January', event: 'Launch of Puduvai Startup Sprint.' },
      { month: 'February', event: 'Visit by Shruti Singh, Joint Secretary, DPIIT, Government of India, to AIC-PECF.' },
      { month: 'August', event: 'FICCI awards presented to three Puducherry startups (Nevatr Systems, Hopstacks, AEDA Equipments).' },
      { month: 'October', event: '2nd edition of AIC-PECF Startup Rendezvous.' }
    ],
    '2024': [
      { month: 'January', event: 'Empowering Puducherry ATLs in Puducherry initiative launched.' },
      { month: 'February', event: 'Official launch of AIC-PECF Puducherry Startup Expo 2024.' },
      { month: 'October', event: 'Two-day workshops on Nurturing Innovations in Our Classrooms.' },
      { month: 'November', event: 'NEP 2020 Policy initiative.' }
    ]
  };

  const years = Object.keys(timelineData);
  const [selectedYear, setSelectedYear] = useState('all');
  const [hoveredItem, setHoveredItem] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const yearButtonVariants = {
    inactive: { scale: 1 },
    active: { 
      scale: 1.1,
      backgroundColor: '#3f6197',
      color: '#ffffff',
      transition: { type: 'spring', stiffness: 300 }
    },
    hover: {
      scale: 1.05,
      backgroundColor: '#5478b1',
      color: '#ffffff'
    }
  };

  const timelineItemVariants = {
    hidden: { 
      x: -20, 
      opacity: 0,
    },
    visible: (i) => ({ 
      x: 0, 
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      }
    }),
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px rgba(63, 97, 151, 0.2)",
    }
  };

  // Filter events based on selected year
  const filteredEvents = selectedYear === 'all' 
    ? Object.entries(timelineData).flatMap(([year, events]) => 
        events.map(event => ({ ...event, year }))
      )
    : timelineData[selectedYear].map(event => ({ ...event, year: selectedYear }));

  return (
    <div className="py-16 bg-gradient-to-b from-white to-blue-50 md:m-5 m-1 shadow-xl rounded-lg">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#3f6197] mb-4">Our Journey</h2>
          <div className="h-1 w-24 bg-[#3f6197] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the milestones that have shaped our growth and impact in the startup ecosystem
          </p>
        </motion.div>

        {/* Year Filter Buttons */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.button
            variants={itemVariants}
            animate={selectedYear === 'all' ? 'active' : 'inactive'}
            whileHover="hover"
            onClick={() => setSelectedYear('all')}
            className="px-6 py-2 rounded-full text-[#3f6197] border-2 border-[#3f6197] font-bold transition-all"
          >
            All Years
          </motion.button>
          
          {years.map((year) => (
            <motion.button
              key={year}
              variants={yearButtonVariants}
              animate={selectedYear === year ? 'active' : 'inactive'}
              whileHover="hover"
              onClick={() => setSelectedYear(year)}
              className="px-6 py-2 rounded-full text-[#3f6197] border-2 border-[#3f6197] font-bold transition-all"
            >
              {year}
            </motion.button>
          ))}
        </motion.div>

        {/* Timeline Visualization */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-[#3f6197]"></div>
          
          {/* Timeline Events */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear}
              initial="hidden" 
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              variants={containerVariants}
              className="relative"
            >
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={`${event.year}-${event.month}-${index}`}
                  custom={index}
                  variants={timelineItemVariants}
                  whileHover="hover"
                  onHoverStart={() => setHoveredItem(`${event.year}-${event.month}-${index}`)}
                  onHoverEnd={() => setHoveredItem(null)}
                  className={`relative flex items-start mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#3f6197] z-10"></div>
                  
                  {/* Content Card */}
                  <div 
                    className={`ml-16 md:ml-0 bg-white rounded-lg shadow-md p-6 ${
                      index % 2 === 0 ? 'md:mr-auto md:ml-0 md:pr-12 text-right' : 'md:ml-auto md:mr-0 md:pl-12 text-left'
                    } w-full md:w-5/12`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-[#3f6197] bg-blue-50 px-3 py-1 rounded-full">
                        {event.month} {event.year}
                      </span>
                      
                      <motion.div 
                        animate={{ rotateY: hoveredItem === `${event.year}-${event.month}-${index}` ? 180 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-6 h-6 rounded-full bg-[#3f6197]/10 flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-[#3f6197]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </motion.div>
                    </div>
                    
                    <p className="text-gray-700">{event.event}</p>
                    
                    {/* Animated Line */}
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: hoveredItem === `${event.year}-${event.month}-${index}` ? '100%' : '30%' }}
                      transition={{ duration: 0.5 }}
                      className="h-1 bg-[#3f6197]/30 mt-4 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Summary Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-[#3f6197] mb-6 text-center">Journey in Numbers</h3>
          
          <div className=" flex flex-wrap justify-evenly">
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.0 }}
                className="w-20 h-20 rounded-full bg-[#3f6197]/10 flex items-center justify-center mx-auto mb-3"
              >
                <span className="text-2xl font-bold text-[#3f6197]">{years.length}</span>
              </motion.div>
              <p className="text-gray-600 text-sm">Years of Growth</p>
            </div>
            
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.1 }}
                className="w-20 h-20 rounded-full bg-[#3f6197]/10 flex items-center justify-center mx-auto mb-3"
              >
                <span className="text-2xl font-bold text-[#3f6197]">
                  {Object.values(timelineData).flat().length}
                </span>
              </motion.div>
              <p className="text-gray-600 text-sm">Key Milestones</p>
            </div>
            
            {/* <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.2 }}
                className="w-20 h-20 rounded-full bg-[#3f6197]/10 flex items-center justify-center mx-auto mb-3"
              >
                <span className="text-2xl font-bold text-[#3f6197]">2+</span>
              </motion.div>
              <p className="text-gray-600 text-sm">AIM Tranches</p>
            </div> */}
            
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.3 }}
                className="w-20 h-20 rounded-full bg-[#3f6197]/10 flex items-center justify-center mx-auto mb-3"
              >
                <span className="text-2xl font-bold text-[#3f6197]">10+</span>
              </motion.div>
              <p className="text-gray-600 text-sm">Major Events</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Road_Map;