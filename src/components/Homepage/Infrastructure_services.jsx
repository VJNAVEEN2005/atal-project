import React from "react";
import { animate, delay, motion } from "framer-motion";
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
    <div className="mt-5 mx-40">
      <div className=" flex justify-center">
        <div className=" px-5 py-3  bg-[#12283c] text-white text-3xl font-bold rounded-3xl">
          AIC-PEC FOUNDATION INFRASTUCTURE SERVICES
        </div>
      </div>
      <div className=" flex mt-10">
        <div className=" w-[50%] flex flex-col items-center justify-center">
          <div className=" flex flex-col items-center">
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className=" font-bold text-3xl"
            >
              PLUG & PLAY
            </motion.div>
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className=" font-bold text-3xl"
            >
              Co-Work Space
            </motion.div>
          </div>
        </div>
        <div className="w-[50%] flex justify-center">
          <div className="">
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className=" "
            >
              <img
                className="rounded-3xl h-96 hover:scale-110 shadow-xl shadow-gray-600 transition-all"
                src={co_working_space1}
                alt=""
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div className=" flex mt-5">
        <div className="w-[50%] flex justify-center">
          <div className="">
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className="-mt-20"
            >
              <img
                className="rounded-3xl h-96 hover:scale-110 shadow-xl shadow-gray-600 transition-all"
                src={co_working_space2}
                alt=""
              />
            </motion.div>
          </div>
        </div>
        <div className=" w-[50%] flex flex-col items-center justify-center">
          <div className="flex flex-col items-start">
          <div className=" m-5">
              {[
                '24/7 High Speed Internet Connectivity.',
                'World Class Amenities',
              ].map((val, index) => (
                <div className=" font-semibold text-2xl flex justify-start hover:text-customBlue hover:scale-105 transition-all">
                  <motion.li
                    variants={popOnView}
                    initial="initial"
                    whileInView="animate"
                    viewport={{
                      once: true,
                    }}
                    className=" p-2 border shadow-xl hover:shadow-gray-600 rounded-xl m-2"
                  >
                    {val}
                  </motion.li>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
      <div className=" flex mt-5">
        <div className=" w-[50%] flex flex-col items-center justify-center">
          <div className=" flex flex-col items-end">
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className=" font-bold text-3xl"
            >
              AIC-PEC FOUNDATION
            </motion.div>
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className=" font-bold text-3xl"
            >
              INFRASTRUCTURE SERVICES
            </motion.div>
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className=" font-bold text-2xl text-customBlue"
            >
              Rapid Prototype & Re-engineering
            </motion.div>
          </div>
        </div>
        <div className="w-[50%] flex justify-center">
          <div className="">
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className=" -mt-14"
            >
              <img
                className="rounded-3xl h-96 hover:scale-110 shadow-xl shadow-gray-600 transition-all"
                src={rapid_prototyping_lab1}
                alt=""
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div className=" flex mt-5">
        <div className="w-[50%] flex justify-center">
          <div className="">
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className=""
            >
              <img
                className="rounded-3xl h-96 hover:scale-110 shadow-xl shadow-gray-600 transition-all"
                src={rapid_prototyping_lab2}
                alt=""
              />
            </motion.div>
          </div>
        </div>
        <div className=" w-[50%] flex flex-col items-center justify-center">
          <div className="flex flex-col items-start">
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className=" font-bold text-3xl text-customBlue mt-2"
            >
              State-of-the-Art Rapid Prototyping Lab
            </motion.div>
            <div className=" m-5">
              {[
                'Additive Manufactuing Line.',
                'Internet of Things (IoT).',
                'Electronic Design Manufacturing (EMD).',
                'PCB Fabrication Line.',
                'Unmanned Aerial Vehicle (UAV) Simulation.',
              ].map((val, index) => (
                <div className=" font-semibold text-2xl flex justify-start hover:text-customBlue hover:scale-105 transition-all">
                  <motion.li
                    variants={popOnView}
                    initial="initial"
                    whileInView="animate"
                    viewport={{
                      once: true,
                    }}
                    className=" p-2 border shadow-xl hover:shadow-gray-600 rounded-xl m-2"
                  >
                    {val}
                  </motion.li>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure_services;
