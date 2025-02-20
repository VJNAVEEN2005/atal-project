import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion, AnimatePresence } from "framer-motion";
import { eventsp1, eventsp2, eventsp3, eventsp4, eventsp5 } from "../../assets/Events/data";

const Events_Calendar = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [filteredDates, setFilteredDates] = useState([]);

  const events = [
    {
      date: "2025-01-11",
      title: "Tech Conference 2024",
      time: "10:00 AM",
      poster: eventsp1,
    },
    {
      date: "2025-01-10",
      title: "Art Exhibition",
      time: "3:00 PM",
      poster: eventsp2,
    },
    {
      date: "2025-01-15",
      title: "Music Fest",
      time: "7:00 PM",
      poster: eventsp3,
    },
    {
      date: "2025-01-07",
      title: "Dance Fest",
      time: "8:00 PM",
      poster: eventsp4,
    },
    {
      date: "2025-01-20",
      title: "Tech Fest",
      time: "9:00 PM",
      poster: eventsp5,
    },
  ];

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Modified to properly handle range selection
  const handleDateChange = (date) => {
    // If it's an array (range selection), convert all dates in the range
    if (Array.isArray(date)) {
      // Create array of all dates in the range
      const allDatesInRange = [];
      const startDate = new Date(date[0]);
      const endDate = new Date(date[1]);
      
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        allDatesInRange.push(formatDate(new Date(currentDate)));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      setSelectedDates(allDatesInRange);
    } else {
      // Handle single date selection (toggle)
      const formattedDate = formatDate(date);
      setSelectedDates((prevDates) =>
        prevDates.includes(formattedDate)
          ? prevDates.filter((d) => d !== formattedDate)
          : [...prevDates, formattedDate]
      );
    }
  };

  const handleApply = () => {
    setFilteredDates(selectedDates);
  };

  const handleClear = () => {
    setSelectedDates([]);
    setFilteredDates([]);
  };

  const displayedEvents = filteredDates.length
    ? events.filter((event) => filteredDates.includes(event.date))
    : events;

  // Custom styles for the calendar
  const calendarStyles = `
    .react-calendar {
      width: 100%;
      border: none;
      font-family: ui-sans-serif, system-ui, -apple-system;
      border-radius: 0.75rem;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .react-calendar__navigation {
      background-color: #3f6197;
      color: white;
      padding: 12px 0;
    }
    .react-calendar__navigation button {
      color: white;
      font-weight: 600;
    }
    .react-calendar__month-view__weekdays {
      font-weight: 600;
      color: #3f6197;
      text-transform: uppercase;
      font-size: 0.75rem;
      padding: 8px 0;
    }
    .react-calendar__tile--active,
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus,
    .selected-date {
      background: #3f6197 !important;
      color: white;
      border-radius: 0.25rem;
      font-weight: 600;
    }
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
      background-color: rgba(63, 97, 151, 0.1);
      border-radius: 0.25rem;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
      background-color: rgba(255, 255, 255, 0.2);
    }
    .react-calendar__month-view__days__day--neighboringMonth {
      color: #d1d5db;
    }
    .react-calendar__tile {
      padding: 10px;
      font-size: 0.9rem;
    }
  `;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <style>{calendarStyles}</style>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-[#3f6197] to-[#5478b0] p-4">
              <h2 className="text-white text-xl font-bold">Select Event Dates</h2>
              <p className="text-white/80 text-sm mt-1">Click on dates to filter events</p>
            </div>
            
            <div className="p-4">
              <Calendar
                onChange={handleDateChange}
                value={selectedDates.length > 0 ? new Date(selectedDates[0]) : null}
                tileClassName={({ date }) =>
                  selectedDates.includes(formatDate(date)) ? "selected-date" : ""
                }
                selectRange={true}
              />
            </div>
            
            <div className="flex gap-4 p-4 bg-gray-50">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleApply} 
                className="flex-1 bg-[#3f6197] px-5 py-3 text-white rounded-lg font-medium shadow-sm transition-colors duration-200 hover:bg-[#355180]"
              >
                Apply Filter
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleClear} 
                className="flex-1 px-5 py-3 text-[#3f6197] border border-[#3f6197] rounded-lg font-medium transition-colors duration-200 hover:bg-[#f0f4f9]"
              >
                Clear
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        <div className="lg:col-span-2">
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {displayedEvents.map((event, index) => {
                const eventDate = new Date(event.date);
                const currentDate = new Date();
                const isExpired = eventDate < currentDate;
                
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        className="absolute top-0 left-0 h-1 bg-[#3f6197] z-10"
                      />
                      
                      <div className={`absolute top-4 left-0 w-2 h-16 ${isExpired ? "bg-red-500" : "bg-green-500"} rounded-r-md`} />
                      
                      <img 
                        src={event.poster} 
                        alt={event.title} 
                        className="w-full h-52 object-cover"
                      />
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-6 px-4">
                        <motion.div 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium"
                        >
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short', 
                            day: 'numeric'
                          })} • {event.time}
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          isExpired ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}>
                          {isExpired ? "Over" : "Available"}
                        </span>
                        {/* <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-[#3f6197] font-medium flex items-center gap-1 hover:underline"
                        >
                          View Details
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.button> */}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
          
          {displayedEvents.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 rounded-xl p-10 text-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-500">Try selecting different dates or clearing your filters</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events_Calendar;