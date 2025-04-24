import React, { useState } from 'react';
import { Calendar, Users, Target, Award } from 'lucide-react';

const StartupDetails = ({ startup }) => {
  // Theme color
  const themeColor = "#3f6197";
  const themeColorLight = "#5277b3";
  const themeColorDark = "#2d4974";

  return (
    <div className="flex justify-center items-center w-full min-h-full bg-gray-50">
      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header with theme color */}
        <div className="h-16 bg-gradient-to-r from-[#3f6197] to-[#5277b3] flex items-center justify-between px-6">
          <h1 className="text-xl font-bold text-white">Startup Showcase</h1>
          <span className="py-1 px-3 bg-white text-[#3f6197] rounded-full text-sm font-medium">
            {startup.category}
          </span>
        </div>

        <div className="p-6">
          {/* Image and Title Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="relative w-full md:w-48 h-48 flex-shrink-0">
              <img 
                src={startup.image} 
                alt={startup.title} 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{startup.title}</h2>
              
              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} className="text-[#3f6197]" />
                  <span>Founded: {startup.founded}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={18} className="text-[#3f6197]" />
                  <span>Revenue: {startup.revenue}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Target size={18} className="text-[#3f6197]" />
                  <span>Sector: {startup.sector}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Award size={18} className="text-[#3f6197]" />
                  <span>Jobs: {startup.jobs}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="h-px bg-gray-200 my-6"></div>
          
          {/* About Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#3f6197] mb-3">About</h3>
            <p className="text-gray-600 leading-relaxed">{startup.description}</p>
          </div>
          
          {/* Achievements Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#3f6197] mb-3">Key Achievements</h3>
            <ul className="space-y-2">
              {startup.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="mt-1 h-4 w-4 rounded-full bg-[#3f6197] flex-shrink-0"></div>
                  <span className="text-gray-600">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default StartupDetails;