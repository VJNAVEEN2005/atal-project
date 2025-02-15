import React from "react";
import { Tilt } from "react-tilt";

const Card_Choose_Us = ({ title, details, link, button }) => {
  return (
    <Tilt>
      <div className="border-b border-x border-customBlue shadow-xl mt-10 h-[330px] w-96 rounded-xl flex flex-col">
        <div className="bg-customBlue p-2 text-white font-bold rounded-t-xl">
          {title}
        </div>
        <div className="p-2 text-justify flex justify-center items-center px-4 mt-2 flex-1">
          <p>{details}</p>
        </div>
        <div className="p-4 px-14 mt-auto"> {/* Changed container */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full text-center bg-customBlue hover:bg-[#1f4177] 
                      px-4 py-3 rounded-xl text-white font-bold transition-all 
                      duration-200 transform hover:scale-105 focus:outline-none 
                      focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:shadow-xl"
          >
            {button}
          </a>
        </div>
      </div>
    </Tilt>
  );
};

export default Card_Choose_Us;