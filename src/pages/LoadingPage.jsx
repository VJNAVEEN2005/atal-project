import React from 'react';
import AIC from '../assets/logos/AIC.png';

const LoadingPage = ({ progress = 0 }) => {
  
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className="flex flex-col items-center justify-start h-screen pt-20 sm:pt-28 bg-white px-4">
      <img src={AIC} alt="AIC Logo" className="w-24 h-24 sm:w-32 sm:h-32 object-contain mb-8" />
      <div
        className="w-full max-w-xs sm:max-w-md h-4 rounded-full mb-8 overflow-hidden"
        style={{ backgroundColor: '#BFC2C5' }}
      >
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{ width: `${normalizedProgress}%`, backgroundColor: '#3B5A80' }}
        ></div>
      </div>
      <h1 className="text-base sm:text-lg mb-2 text-center" style={{ color: '#3B5A80' }}>
        Please wait while we prepare your experience ({normalizedProgress}%)
      </h1>
    </div>
  );
};

export default LoadingPage;
