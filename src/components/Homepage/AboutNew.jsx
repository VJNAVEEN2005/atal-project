import React from "react";
import { useNavigate } from "react-router-dom";
import { Aic } from "../../assets/logos/logs";
import { FaRocket, FaLaptopCode } from "react-icons/fa";
import { GiMicroscope } from "react-icons/gi";
import { RiFundsFill } from "react-icons/ri";
import { IoTelescope } from "react-icons/io5";
import { TbDrone } from "react-icons/tb";
import { BsCpuFill } from "react-icons/bs";

const AboutNew = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    window.scrollTo(0, 0);
    navigate("/about");
  };

  return (
    <div className="bg-[#F7F7F7] py-8 sm:py-12 md:py-16 lg:py-20 min-w-screen">
      {/* about-content */}
      <div className="w-[90%] sm:w-[85%] mx-auto">
        <div className="max-w-fit mx-4 sm:mx-0 sm:ml-0 md:ml-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            ABOUT <span className="text-customBlue font-bold">AIC-PECF</span>
          </h2>
          {/* border bottom */}
          <div
            id="border-bottom-2"
            className="mt-2 w-full h-[4px] sm:h-[6px] rounded-full bg-customBlue"
          ></div>
        </div>

        {/* Mobile View */}
        <section className="mt-6 md:hidden">
          <aside className="text-base sm:text-lg text-gray-600 mb-6 space-y-4 text-justify leading-7 sm:leading-8 px-1">
            <p>
              AIC-Pondicherry Engineering College Foundation offers
              incubation facilities for early-stage startups and innovators with
              viable product ideas. The foundation aims to assist young
              entrepreneurs in launching technology-based startups by providing
              essential services.
            </p>
            <p>
              AIC-Pondicherry provides a wide range of services covering
              the entire spectrum of startup needs, from mentorship to
              infrastructure. The foundation nurtures innovation and helps
              transform ideas into successful enterprises.
            </p>
            <button
              className="bg-[#12283c] text-white px-4 py-2 mt-4 rounded-md font-semibold hover:bg-[#0f1f2c] transition-all"
              onClick={handleLearnMore}
            >
              Learn More
            </button>
          </aside>
          <aside className="grid grid-cols-4 grid-rows-4 gap-2 sm:gap-4 h-[320px] sm:h-[400px]">
            <div
              id="box-1"
              className="row-span-4 bg-customBlue flex flex-col justify-evenly items-center rounded-lg"
            >
              <IoTelescope color="white" size={28} className="sm:text-4xl" />
              <div className="w-full h-[1px] sm:h-1 bg-white"></div>
              <TbDrone color="white" size={28} className="sm:text-4xl" />
              <div className="w-full h-[1px] sm:h-1 bg-white"></div>
              <FaLaptopCode color="white" size={28} className="sm:text-4xl" />
              <div className="w-full h-[1px] sm:h-1 bg-white"></div>
              <BsCpuFill color="white" size={28} className="sm:text-4xl" />
            </div>
            <div
              id="box-2"
              className="row-span-3 col-span-3 bg-slate-100 flex justify-center items-center rounded-lg"
            >
              <img
                src={Aic}
                alt="AIC Logo"
                className="w-full max-w-[300px] sm:max-w-[350px] object-contain p-2"
              />
            </div>
            <div
              id="box-3"
              className="col-span-3 col-start-2 bg-customBlue flex justify-evenly items-center rounded-lg"
            >
              <FaRocket color="white" size={28} className="sm:text-4xl" />
              <div className="w-[1px] sm:w-1 h-full bg-white"></div>
              <GiMicroscope color="white" size={28} className="sm:text-4xl" />
              <div className="w-[1px] sm:w-1 h-full bg-white"></div>
              <RiFundsFill color="white" size={28} className="sm:text-4xl" />
            </div>
          </aside>
        </section>

        {/* Desktop View */}
        <section className="hidden md:flex flex-col lg:flex-row justify-between w-full gap-6 lg:gap-12 xl:gap-20 mt-8 lg:mt-10">
          {/* text-body */}
          <aside className="text-lg lg:text-xl w-full lg:w-[50%] text-gray-600 space-y-4 lg:space-y-5 text-justify leading-7 lg:leading-9">
            <p>
              AIC-Pondicherry Engineering College Foundation offers incubation 
              facilities for early-stage startups and innovators with viable 
              product ideas. The foundation aims to assist young entrepreneurs 
              in launching technology-based startups by providing essential services. 
              It supports the commercial exploitation of technologies developed by startups.
            </p>
            <p>
              AIC-Pondicherry provides a wide range of services covering the entire 
              spectrum of startup needs, from mentorship to infrastructure. The 
              foundation nurtures innovation and helps transform ideas into successful 
              enterprises. With a focus on technology, it empowers startups to scale and succeed.
            </p>
            <button
              className="bg-[#12283c] text-white px-6 py-3 mt-2 rounded-md font-semibold hover:bg-[#0f1f2c] transition-all"
              onClick={handleLearnMore}
            >
              Learn More
            </button>
          </aside>
          <aside className="grid grid-cols-4 grid-rows-4 w-full lg:w-[50%] gap-4 h-[400px] lg:h-[450px]">
            <div
              id="box-1"
              className="row-span-4 bg-customBlue flex flex-col justify-evenly items-center rounded-xl"
            >
              <BsCpuFill color="white" size={36} className="lg:text-5xl" />
              <div className="w-full h-1 bg-white"></div>
              <TbDrone color="white" size={36} className="lg:text-5xl" />
              <div className="w-full h-1 bg-white"></div>
              <FaLaptopCode color="white" size={36} className="lg:text-5xl" />
              <div className="w-full h-1 bg-white"></div>
              <IoTelescope color="white" size={36} className="lg:text-5xl" />
            </div>
            <div
              id="box-2"
              className="row-span-3 col-span-3 bg-slate-100 flex justify-center items-center rounded-xl"
            >
              <img
                src={Aic}
                alt="AIC Logo"
                className="w-full max-w-[300px] md:max-w-[350px] lg:max-w-[400px] p-4 object-contain"
              />
            </div>
            <div
              id="box-3"
              className="col-span-3 col-start-2 bg-customBlue flex justify-evenly items-center rounded-xl"
            >
              <FaRocket color="white" size={36} className="lg:text-5xl" />
              <div className="w-1 h-full bg-white"></div>
              <GiMicroscope color="white" size={36} className="lg:text-5xl" />
              <div className="w-1 h-full bg-white"></div>
              <RiFundsFill color="white" size={36} className="lg:text-5xl" />
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default AboutNew;