import React from "react";
import { motion } from "framer-motion";
import {
  co_working_space1,
  co_working_space2,
  rapid_prototyping_lab1,
  rapid_prototyping_lab2,
} from "../../assets/Infrastucture_Services/images/infrastucture_services";

const Infrastructure_services = () => {
  const popOnView = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 100,
      y: 0,
      transition: {
        delay: 0.1,
      },
    },
  };

  return (
    <div className="mt-5 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-40">
      <div className="flex justify-center">
        <div className="px-3 py-2 sm:px-5 sm:py-3 bg-[#12283c] text-white text-xl sm:text-2xl md:text-3xl font-bold rounded-xl md:rounded-3xl text-center">
          AIC-PEC FOUNDATION INFRASTUCTURE SERVICES
        </div>
      </div>

      {/* Co-Work Space Section - First Row */}
      <div className="flex flex-col md:flex-row mt-8 md:mt-10 gap-6">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center order-2 md:order-1 mt-4 md:mt-0">
          <div className="flex flex-col items-center">
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="font-bold text-2xl md:text-3xl text-center"
            >
              PLUG & PLAY
            </motion.div>
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="font-bold text-2xl md:text-3xl text-center"
            >
              Co-Work Space
            </motion.div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
          <motion.div
            variants={popOnView}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <img
              className="rounded-xl md:rounded-3xl h-64 sm:h-72 md:h-80 lg:h-96 w-full object-cover hover:scale-105 shadow-lg shadow-gray-400 md:shadow-xl md:shadow-gray-600 transition-all"
              src={co_working_space1}
              alt="Co-working space"
            />
          </motion.div>
        </div>
      </div>

      {/* Co-Work Space Features - Second Row */}
      <div className="flex flex-col md:flex-row mt-8 gap-6">
        <div className="w-full md:w-1/2 flex justify-center">
          <motion.div
            variants={popOnView}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="md:-mt-10 lg:-mt-20"
          >
            <img
              className="rounded-xl md:rounded-3xl h-64 sm:h-72 md:h-80 lg:h-96 w-full object-cover hover:scale-105 shadow-lg shadow-gray-400 md:shadow-xl md:shadow-gray-600 transition-all"
              src={co_working_space2}
              alt="Co-working space facilities"
            />
          </motion.div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center mt-4 md:mt-0">
          <div className="flex flex-col items-start w-full">
            <div className="w-full mt-4 md:m-5">
              {[
                '24/7 High Speed Internet Connectivity.',
                'World Class Amenities',
              ].map((val, index) => (
                <div key={index} className="font-semibold text-xl md:text-2xl flex justify-start hover:text-customBlue hover:scale-105 transition-all">
                  <motion.li
                  style={{ listStyleType: 'none' }}
                    variants={popOnView}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="p-2 border shadow-md md:shadow-xl hover:shadow-gray-600 rounded-lg md:rounded-xl m-2 w-full"
                  >
                    {val}
                  </motion.li>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rapid Prototyping - Third Row */}
      <div className="flex flex-col md:flex-row mt-12 gap-6">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-end justify-center order-2 md:order-1 mt-4 md:mt-0">
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="font-bold text-2xl md:text-3xl"
            >
              AIC-PEC FOUNDATION
            </motion.div>
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="font-bold text-2xl md:text-3xl"
            >
              INFRASTRUCTURE SERVICES
            </motion.div>
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="font-bold text-xl md:text-2xl text-customBlue mt-2"
            >
              Rapid Prototype & Re-engineering
            </motion.div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
          <motion.div
            variants={popOnView}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="md:-mt-8 lg:-mt-14"
          >
            <img
              className="rounded-xl md:rounded-3xl h-64 sm:h-72 md:h-80 lg:h-96 w-full object-cover hover:scale-105 shadow-lg shadow-gray-400 md:shadow-xl md:shadow-gray-600 transition-all"
              src={rapid_prototyping_lab1}
              alt="Rapid prototyping lab"
            />
          </motion.div>
        </div>
      </div>

      {/* Rapid Prototyping Features - Fourth Row */}
      <div className="flex flex-col md:flex-row mt-8 mb-12 gap-6">
        <div className="w-full md:w-1/2 flex justify-center">
          <motion.div
            variants={popOnView}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <img
              className="rounded-xl md:rounded-3xl h-64 sm:h-72 md:h-80 lg:h-96 w-full object-cover hover:scale-105 shadow-lg shadow-gray-400 md:shadow-xl md:shadow-gray-600 transition-all"
              src={rapid_prototyping_lab2}
              alt="Rapid prototyping lab equipment"
            />
          </motion.div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center mt-4 md:mt-0">
          <motion.div
            variants={popOnView}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="font-bold text-xl md:text-2xl lg:text-3xl text-customBlue mt-2 text-center md:text-left"
          >
            State-of-the-Art Rapid Prototyping Lab
          </motion.div>
          <div className="w-full mt-4 md:m-5">
            {[
              'Additive Manufactuing Line.',
              'Internet of Things (IoT).',
              'Electronic Design Manufacturing (EMD).',
              'PCB Fabrication Line.',
              'Unmanned Aerial Vehicle (UAV) Simulation.',
            ].map((val, index) => (
              <div key={index} className="font-semibold text-lg md:text-xl lg:text-2xl flex justify-start hover:text-customBlue hover:scale-105 transition-all">
                <motion.li
                  style={{ listStyleType: "none" }}
                  variants={popOnView}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="p-2 border shadow-md md:shadow-xl hover:shadow-gray-600 rounded-lg md:rounded-xl m-2 w-full"
                >
                  {val}
                </motion.li>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure_services;