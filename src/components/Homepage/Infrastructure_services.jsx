import React from "react";
import { animate, delay, motion } from "framer-motion";

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
    <div className="mt-5 mx-8">
      <div className=" flex justify-center">
        <div className=" px-5 py-3  bg-[#12283c] text-white text-3xl font-bold rounded-3xl">
          AIC-PEC FOUNDATION INFRASTUCTURE SERVICES
        </div>
      </div>
      <div className=" flex mt-10">
        <div className=" w-[50%] flex flex-col items-center justify-center">
          <div className=" flex flex-col items-end">
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className=" font-bold text-2xl"
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
              className=" font-bold text-2xl"
            >
              Co-Work Space
            </motion.div>
          </div>
        </div>
        <div className="w-[50%] flex justify-end">
          <div className="pr-44">
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className=" w-80 h-52 bg-customBlue rounded-r-full"
            ></motion.div>
          </div>
        </div>
      </div>
      <div className=" flex mt-5">
        <div className="w-[50%] flex justify-start">
          <div className="pl-44">
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className=" w-80 h-52 bg-customBlue rounded-l-full"
            ></motion.div>
          </div>
        </div>
        <div className=" w-[50%] flex flex-col items-center justify-center">
          <div className="flex flex-col items-start">
            <div className=" font-semibold text-2xl">
              <motion.li
                variants={popOnView}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
              >
                24/7 High Speed Internet Connectivity.
              </motion.li>
            </div>
            <div className=" font-semibold text-2xl">
              <motion.li
                variants={popOnView}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
              >
                World Class Amenities
              </motion.li>
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
              className=" font-bold text-2xl"
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
              className=" font-bold text-2xl"
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
              className=" font-bold text-xl text-customBlue"
            >
              Rapid Prototype & Re-engineering
            </motion.div>
          </div>
        </div>
        <div className="w-[50%] flex justify-end">
          <div className="pr-44">
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className=" w-80 h-52 bg-customBlue rounded-r-full"
            ></motion.div>
          </div>
        </div>
      </div>
      <div className=" flex mt-5">
        <div className="w-[50%] flex justify-start">
          <div className="pl-44">
            <motion.div
              variants={popOnView}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              className=" w-80 h-52 bg-customBlue rounded-l-full"
            ></motion.div>
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
              className=" font-bold text-2xl"
            >
              State-of-the-Art Rapid Prototyping Lab
            </motion.div>
            <div className=" font-semibold text-2xl">
              <motion.li
                variants={popOnView}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
              >
                Additive Manufactuing Line.
              </motion.li>
            </div>
            <div className=" font-semibold text-2xl">
              <motion.li
                variants={popOnView}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
              >
                Internet of Things (IoT).
              </motion.li>
            </div>
            <div className=" font-semibold text-2xl">
              <motion.li
                variants={popOnView}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
              >
                Electronic Design Manufacturing (EMD).
              </motion.li>
            </div>
            <div className=" font-semibold text-2xl">
              <motion.li
                variants={popOnView}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
              >
                PCB Fabrication Line.
              </motion.li>
            </div>
            <div className=" font-semibold text-2xl">
              <motion.li
                variants={popOnView}
                initial="initial"
                whileInView="animate"
                viewport={{
                  once: true,
                }}
              >
                Unmanned Aerial Vehicle (UAV) Simulation.
              </motion.li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure_services;
