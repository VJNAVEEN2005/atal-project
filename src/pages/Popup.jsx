import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Clock, X, Sparkles } from 'lucide-react';
import Api from '../Api/api';
import Axios from 'axios';

const Popup = ({ onClose, autoClose = false, closeAfter = 30000, renderEventButton }) => {
  const [visible, setVisible] = useState(true);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${Api.web}api/v1/events/upcoming`)
      .then(res => {
        console.log("Events API response:", res.data);
        const eventsArr = res.data.events || [];
        if (Array.isArray(eventsArr)) {
          const upcomingEvents = eventsArr.slice(0, 3);
          setEvents(upcomingEvents);
        } else {
          setError("No events found.");
        }
      })
      .catch(err => {
        console.error("Error fetching events:", err);
        setError("An error occurred while fetching events.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (autoClose && !loading) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, closeAfter);
      return () => clearTimeout(timer);
    }
  }, [autoClose, closeAfter, onClose, loading]);

  if (!visible) return null;

  // Don't render the popup if there are no upcoming events and it's not loading
  if (!loading && events.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-xl shadow-2xl border border-gray-100 max-w-2xl w-full overflow-hidden animate-popupIn">
        {/* Header with solid background */}
        <div className="relative bg-[#3c6494] p-6">
          <div className="absolute inset-0 bg-black/10"></div>
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:rotate-90 transition-all duration-300 ease-out z-10"
            onClick={() => { setVisible(false); if (onClose) onClose(); }}
            aria-label="Close popup"
          >
            <X size={24} strokeWidth={2} />
          </button>
          
          <div className="relative z-10 flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-xl">
              <Sparkles className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Upcoming Events</h2>
              <p className="text-white/80 text-sm">Don't miss out on these amazing opportunities</p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        </div>

        {/* Content */}
        <div className="p-8 pt-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animation-delay-150"></div>
              </div>
              <p className="text-slate-600 mt-4 text-lg">Loading amazing events...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <X className="text-red-500" size={24} />
              </div>
              <p className="text-[#12283c] text-center text-lg">{error}</p>
            </div>
          ) : events.length > 0 ? (
            <div className="space-y-6">
              {events.map((event, idx) => (
                <div key={idx} className="group relative bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#12283c] hover:-translate-y-1">
                  {/* Event card with accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#3c6494] rounded-t-lg"></div>
                  
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#315e99] transition-colors duration-300">
                      {event.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-100">
                        <Calendar size={14} className="text-[#294d7e]" />
                        <span className="font-medium text-sm">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-100">
                        <MapPin size={14} className="text-[#2f5990]" />
                        <span className="font-medium text-sm">{event.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-100">
                        <Clock size={14} className="text-[#33609b]" />
                        <span className="font-medium text-sm">{event.time}</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed">{event.description}</p>
                    
                    {renderEventButton && (
                      <div className="mt-2 flex justify-end">
                        {renderEventButton(event)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="text-slate-400" size={24} />
              </div>
              <p className="text-slate-500 text-center text-lg">No upcoming events at the moment.</p>
              <p className="text-slate-400 text-center text-sm mt-1">Check back soon for new events!</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes popupIn {
          0% { 
            transform: scale(0.85) translateY(40px); 
            opacity: 0; 
          }
          100% { 
            transform: scale(1) translateY(0); 
            opacity: 1; 
          }
        }
        
        .animate-popupIn { 
          animation: popupIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; 
        }
        
        .animate-fadeIn { 
          animation: fadeIn 0.4s ease both; 
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animation-delay-150 {
          animation-delay: 0.15s;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Popup;