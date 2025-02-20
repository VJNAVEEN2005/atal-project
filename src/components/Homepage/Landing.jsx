import React from "react";
import { Tilt } from "react-tilt";
import { Home1, Home2, Home3 } from "../../assets/Homepage/images";
import Image_Carousel from "./Image_Carousel";
import WhoAmI from "./WhoAmI";
import MainSlider from "./MainSlider";
import {
  home1,
  home2,
  home3,
  home4,
  home5,
  home6,
  home7,
  home8,
  home9,
  home10,
  home11,
  home12,
} from "../../assets/Homepage/image_carousel/image_carousel";

const Landing = () => {
  const image = [
    home1,
    home2,
    home3,
    home4,
    home5,
    home6,
    home7,
    home8,
    home9,
    home10,
    home11,
    home12,
  ];

  return (
    <div className="md:pb-10 pb-10 ">
      {/* Landing Section */}
      <div className="fixed hidden border-4  md:absolute  border-gray-300 rounded-full min-h-screen min-w-[850px] md:min-w-[1000px] -left-[700px] top-0 -z-10"></div>
      <div className=" fixed hidden md:absolute  border-4 border-gray-300 rounded-full min-h-screen  min-w-[850px]  md:min-w-[1000px] -right-[700px] top-0 -z-10"></div>
      <div className="mt- text-gray-700 flex flex-col items-center">
        <h1 className="font-semibold text-4xl md:text-5xl text-center  title">
          Atal Incubation Centre - PEC Foundation
        </h1>
        <h4 className="mt-2 text-2xl text-center font-semibold title ">
          Puducherry Technological University
        </h4>
        <h4 className="mt-3 text-lg text-center text-blue-800 w-fit title ">
          Supported by Atal Innovation Mission (AIM), NITI Aayog, Govt. of India
        </h4>
      </div>

      <div className="mt-10 ml-4 mr-4 flex md:hidden">
        <Image_Carousel images={image} />
      </div>

      <div className=" px-5 md:block hidden">
        <MainSlider images={image} />
      </div>

      {/* <WhoAmI /> */}
    </div>
  );
};

export default Landing;
