import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import api from '../../Api/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Road_Map = () => {
  // State for timeline data
  const [timelineData, setTimelineData] = useState({});
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    yearsOfGrowth: 0,
    totalMilestones: 0,
    majorEvents: '0'
  });

  // Fetch roadmap data
  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        setLoading(true);
        // Get roadmap items
        const response = await axios.get(`${api.web}api/v1/roadmap`);
        
        // Organize data by years
        const organizedData = {};
        response.data.roadmapItems.forEach(item => {
          if (!organizedData[item.year]) {
            organizedData[item.year] = [];
          }
          organizedData[item.year].push({
            month: item.month,
            event: item.event
          });
        });
        
        // Get years and set default selected year
        const yearsList = Object.keys(organizedData).sort();
        setTimelineData(organizedData);
        setYears(yearsList);
        
        // Set default selected year to the oldest year
        if (yearsList.length > 0) {
          setSelectedYear(yearsList[0]);
        }
        
        // Fetch stats
        const statsResponse = await axios.get(`${api.web}api/v1/roadmap/stats`);
        setStats(statsResponse.data.stats);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load roadmap data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchRoadmapData();
  }, []);

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
  const filteredEvents = selectedYear && timelineData[selectedYear] 
    ? timelineData[selectedYear].map(event => ({ ...event, year: selectedYear }))
    : [];

  if (loading) {
    return (
      <div className="py-16 bg-gradient-to-b from-white to-blue-50 md:m-5 m-1 shadow-xl min-w-[80%] rounded-lg">
        <div className="container mx-auto px-4">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <Skeleton height={40} width={240} className="mx-auto mb-4" />
            <div className="h-1 w-24 bg-gray-200 mx-auto mb-6"></div>
            <Skeleton count={2} width="60%" className="mx-auto" />
          </div>

          {/* Year Filter Buttons Skeleton */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} width={80} height={40} className="rounded-full" />
            ))}
          </div>

          {/* Timeline Events Skeleton */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200"></div>
            
            {[1, 2, 3, 4].map((item, index) => (
              <div 
                key={item}
                className={`relative flex items-start mb-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-gray-200 z-10"></div>
                
                <div 
                  className={`ml-16 md:ml-0 bg-white rounded-lg shadow-sm p-6 ${
                    index % 2 === 0 ? 'md:mr-auto md:ml-0 md:pr-12 text-right' : 'md:ml-auto md:mr-0 md:pl-12 text-left'
                  } w-full md:w-5/12`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Skeleton width={100} height={24} className="rounded-full" />
                    <Skeleton circle width={24} height={24} />
                  </div>
                  
                  <Skeleton count={3} />
                  
                  <div className="h-1 bg-gray-200 mt-4 rounded-full w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Stats Skeleton */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <Skeleton height={32} width={240} className="mx-auto mb-6" />
            
            <div className="flex flex-wrap justify-evenly">
              {[1, 2, 3].map((item) => (
                <div key={item} className="text-center">
                  <Skeleton circle width={80} height={80} className="mx-auto mb-3" />
                  <Skeleton width={80} height={20} className="mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gradient-to-b from-white to-blue-50 md:m-5 m-1 shadow-xl min-w-[80%] rounded-lg">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-800 text-lg font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-b from-white to-blue-50 md:m-5 m-1 shadow-xl min-w-[80%] rounded-lg">
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
        {years.length > 0 && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
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
        )}

        {/* Timeline Visualization */}
        {years.length > 0 ? (
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
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No roadmap data available yet.</p>
          </div>
        )}
        
        {/* Summary Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-[#3f6197] mb-6 text-center">Journey in Numbers</h3>
          
          <div className="flex flex-wrap justify-evenly">
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.0 }}
                className="w-20 h-20 rounded-full bg-[#3f6197]/10 flex items-center justify-center mx-auto mb-3"
              >
                <span className="text-2xl font-bold text-[#3f6197]">{stats.yearsOfGrowth}</span>
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
                  {stats.totalMilestones}
                </span>
              </motion.div>
              <p className="text-gray-600 text-sm">Key Milestones</p>
            </div>
            
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1.3 }}
                className="w-20 h-20 rounded-full bg-[#3f6197]/10 flex items-center justify-center mx-auto mb-3"
              >
                <span className="text-2xl font-bold text-[#3f6197]">{stats.majorEvents}</span>
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