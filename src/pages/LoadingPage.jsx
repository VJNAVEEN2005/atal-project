import React from 'react';
import AIC from '../assets/logos/AIC.png';

const LoadingPage = ({ progress = 0 }) => {
  console.log("LoadingPage: Rendering with progress", progress, "%");
  
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className="flex flex-col items-center justify-start h-screen pt-28 bg-white">
      <img src={AIC} alt="AIC Logo" className="w-32 h-32 object-contain mb-8" />
      <div
        className="w-64 h-4 rounded-full mb-8 overflow-hidden"
        style={{ backgroundColor: '#BFC2C5' }}
      >
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{ width: `${normalizedProgress}%`, backgroundColor: '#3B5A80' }}
        ></div>
      </div>
      <h1 className="text-lg mb-2" style={{ color: '#3B5A80' }}>
        Please wait while we prepare your experience ({normalizedProgress}%)
      </h1>
    </div>
  );
};

export default LoadingPage;
