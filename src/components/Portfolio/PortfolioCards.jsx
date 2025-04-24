import React from 'react';

const PortfolioCard = ({ title, image, category, onClick }) => {
  // Theme color from previous component
  const themeColor = "#3f6197";
  
  return (
    <div 
      className="bg-white rounded-xl w-80 flex flex-col cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative h-full"
      onClick={onClick}
    >
      {/* Category Badge */}
      <span 
        className="absolute top-4 right-4 py-1.5 px-4 bg-[#3f6197] text-white text-sm font-medium rounded-full"
      >
        {category}
      </span>
      
      {/* Image Container */}
      <div className="flex items-center justify-center bg-white mx-auto my-4 p-4 rounded-full max-w-60 max-h-60">
        <img 
          src={image} 
          alt={title} 
          className="max-w-full max-h-full object-contain"
        />
      </div>
      
      {/* Content */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
    </div>
  );
};

export default PortfolioCard;