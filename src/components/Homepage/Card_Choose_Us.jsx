import React from "react";
import { Tilt } from "react-tilt";

const Card_Choose_Us = ({ title, details, link, button }) => {
  return (
    <Tilt options={{ max: 10, scale: 1.02 }}>
      <div className="border-b border-x border-customBlue shadow-xl mt-4 sm:mt-6 lg:mt-10 
                      h-auto min-h-[330px] w-full max-w-[380px] rounded-xl flex flex-col">
        <div className="bg-customBlue p-2 sm:p-3 text-white font-bold rounded-t-xl 
                      text-sm sm:text-base text-center">
          {title}
        </div>
        
        <div className="p-3 sm:p-4 text-justify flex justify-center items-center 
                      px-3 sm:px-4 mt-2 flex-1 text-sm sm:text-base">
          <p>{details}</p>
        </div>
        
        <div className="p-3 sm:p-4 px-4 sm:px-8 lg:px-14 mt-auto">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center bg-customBlue hover:bg-[#1f4177] 
                      px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-white font-bold 
                      text-sm sm:text-base transition-all duration-200 
                      transform hover:scale-105 focus:outline-none 
                      focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                      hover:shadow-xl"
          >
            {button}
          </a>
        </div>
      </div>
    </Tilt>
  );
};

export default Card_Choose_Us;