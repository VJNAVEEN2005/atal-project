import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { news2 } from "../../assets/Events/News_Letter/data";

const NewsLetter = () => {
  const themeColor = "#3f6197";
  
  // Sample data with newsletters
  const newsletters = [
    {
      year: "2024",
      title: "November 2024",
      coverImage: news2,
      pdfUrl: "/pdfs/newsletter-2024.pdf",
    },
    {
      year: "2024",
      title: "August 2024",
      coverImage: news2,
      pdfUrl: "/pdfs/newsletter-august-2024.pdf",
    },
    {
      year: "2023",
      title: "February 2023",
      coverImage: news2,
      pdfUrl: "/pdfs/newsletter-2023.pdf",
    },
    {
      year: "2022",
      title: "April 2022",
      coverImage: news2,
      pdfUrl: "/pdfs/newsletter-2022.pdf",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4" style={{ color: themeColor }}>
            Newsletters
          </h1>
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: themeColor }}></div>
        </div>

        {/* Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {newsletters.map((newsletter, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <a href={newsletter.pdfUrl} target="_blank" rel="noopener noreferrer">
                {/* Logo and Header */}
                <div className="p-3" style={{ backgroundColor: themeColor }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-white p-1 rounded-full">
                        <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-bold" style={{ color: themeColor }}>S</span>
                        </div>
                      </div>
                      <span className="text-white text-xs ml-2 font-semibold">StartupTN</span>
                    </div>
                    <div className="bg-white px-2 py-1 rounded">
                      <span className="text-xs font-bold uppercase" style={{ color: themeColor }}>Newsletter</span>
                    </div>
                  </div>
                </div>
                
                {/* Cover Image */}
                <div className="relative">
                  <img
                    src={newsletter.coverImage}
                    alt={`${newsletter.title} Newsletter Cover`}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                      e.target.onerror = null;
                    }}
                  />
                  {/* Image Overlay with Speaker */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full bg-gray-300/40 p-1">
                      <div className="h-full w-full rounded-full bg-gray-300/80"></div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Info Bars */}
                <div className="grid grid-cols-2 gap-px bg-gray-200">
                  <div className="p-3" style={{ backgroundColor: themeColor }}>
                    <div className="h-4 w-4 rounded-full bg-white mb-1"></div>
                    <div className="h-2 w-16 bg-white/70 rounded-sm"></div>
                  </div>
                  <div className="p-3 bg-yellow-500">
                    <div className="h-4 w-4 rounded-full bg-white mb-1"></div>
                    <div className="h-2 w-16 bg-white/70 rounded-sm"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-px bg-gray-200">
                  <div className="p-3 bg-yellow-500">
                    <div className="h-4 w-4 rounded-full bg-white mb-1"></div>
                    <div className="h-2 w-16 bg-white/70 rounded-sm"></div>
                  </div>
                  <div className="p-3" style={{ backgroundColor: themeColor }}>
                    <div className="h-4 w-4 rounded-full bg-white mb-1"></div>
                    <div className="h-2 w-16 bg-white/70 rounded-sm"></div>
                  </div>
                </div>
              </a>
              
              {/* Newsletter Title */}
              <div className="p-3 text-center">
                <p className="text-sm text-gray-600">StartupTN - Newsletter</p>
                <h3 className="font-semibold" style={{ color: themeColor }}>{newsletter.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center space-x-4">
          <button 
            className="p-3 rounded-full bg-white shadow hover:shadow-md transition-shadow"
          >
            <ChevronLeft size={24} style={{ color: themeColor }} />
          </button>
          <button 
            className="p-3 rounded-full bg-white shadow hover:shadow-md transition-shadow"
          >
            <ChevronRight size={24} style={{ color: themeColor }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;