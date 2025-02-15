import React from "react";
import { Tilt } from "react-tilt";

const Card_Choose_Us = ({ title, details, link, button }) => {
  return (
    <Tilt>
      <div className=" border-b border-x border-customBlue shadow-xl mt-10 h-80 w-96 rounded-xl">
        <div className="bg-customBlue p-2 text-white font-bold rounded-t-xl">
          {title}
        </div>
        <div className=" p-2 text-justify px-4 mt-2">
          <p>{details}</p>
        </div>
        <div className=" flex justify-center">
          <div className=" flex justify-center items-center  absolute bottom-6">
            <a
              href={link}
              target="_blank"
              className=" bg-customBlue px-3 py-2 rounded-xl text-white font-bold"
            >
              {button}
            </a>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default Card_Choose_Us;
