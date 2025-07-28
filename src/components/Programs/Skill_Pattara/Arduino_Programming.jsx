import React, { useState } from "react";
import { motion } from "framer-motion";
import ScrollToTop from "../../ScrollToTop";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { arduino1, arduino2, arduino3, arduino4, arduino5, arduino6, arduino_event } from "../../../assets/Programs/SkillPattara/data";
import { arduino } from "../../../assets/Programs/Puduvai_Startup_Sprint/data";
import { useSelector } from "react-redux";

// Assume these are imported from your assets directory
// Replace with your actual image imports
const ImageWithSkeleton = ({ src, alt, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!imageLoaded && (
        <Skeleton className="bg-gray-300 w-full h-full rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

const Arduino_Programming = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const state = useSelector((state) => state?.programsForm?.data?.data);
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const imageHover = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  // Placeholder image URLs - replace with your actual image paths
  const arduinoImages = {
    intro1: arduino1,
    intro2: arduino2,
    day1_1: arduino3,
    day1_2: arduino4,
    day2_1: arduino5,
    day2_2: arduino6,
    arduinoVideo: arduino_event,
    arduinoPoster: arduino,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-gray-50">
      <ScrollToTop />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#3f6197" }}>
          Arduino Workshop – Design & Build Your Own Microcontroller
        </h1>
        <div
          className="w-24 h-1 mx-auto mb-6"
          style={{ backgroundColor: "#3f6197" }}
        ></div>
      </motion.div>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mb-16 bg-white rounded-lg shadow-md p-8"
      >
        <motion.h2
          variants={fadeIn}
          className="text-2xl font-semibold mb-6 inline-block border-b-2 pb-2"
          style={{ borderColor: "#3f6197", color: "#3f6197" }}
        >
          Introduction
        </motion.h2>

        <motion.div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.p
              variants={fadeIn}
              className="mb-4 text-gray-700 leading-relaxed"
            >
              This structured workshop covers the technical aspects of Arduino
              development, starting from basic embedded systems concepts to
              building and testing custom microcontrollers. Participants will
              gain hands-on experience in designing circuits, assembling
              components, programming firmware, and debugging electronic
              prototypes.
            </motion.p>

            <motion.p
              variants={fadeIn}
              className="text-gray-700 leading-relaxed"
            >
              By the end of the workshop, participants will have developed a
              fully functional Arduino board and explored its applications in
              automation, IoT, and robotics. This workshop provides a solid
              foundation for future exploration in embedded systems design and
              development.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover="hover"
              initial="rest"
              variants={imageHover}
              className="overflow-hidden rounded-lg shadow-lg h-48"
            >
              <ImageWithSkeleton
                src={arduinoImages.intro1}
                alt="Arduino Workshop"
                className="h-full"
              />
            </motion.div>

            <motion.div
              whileHover="hover"
              initial="rest"
              variants={imageHover}
              className="overflow-hidden rounded-lg shadow-lg h-48"
            >
              <ImageWithSkeleton
                src={arduinoImages.intro2}
                alt="Arduino Workshop"
                className="h-full"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="mb-16 bg-white rounded-lg shadow-md p-8"
      >
        <h2
          className="text-2xl font-semibold mb-6 inline-block border-b-2 pb-2"
          style={{ borderColor: "#3f6197", color: "#3f6197" }}
        >
          Course Overview
        </h2>

        <p className="text-gray-700 leading-relaxed">
          The workshop is designed to provide technical knowledge on Arduino and
          embedded systems development, with a strong focus on hands-on
          learning. Participants will explore microcontroller design, PCB
          assembly, electronics integration, and firmware programming,
          ultimately leading to a functional Arduino-based project
          demonstration.
        </p>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mb-16"
      >
        <motion.h2
          variants={fadeIn}
          className="text-2xl font-semibold mb-8 text-center"
          style={{ color: "#3f6197" }}
        >
          Workshop Modules
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            variants={fadeIn}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "#3f6197" }}
              >
                Day 1: Microcontroller Design & PCB Assembly
              </h3>

              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                    •
                  </span>
                  <span>
                    Understanding microcontroller circuits and essential
                    components.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                    •
                  </span>
                  <span>
                    Designing Arduino circuits – selecting and configuring
                    resistors, capacitors, and oscillators.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                    •
                  </span>
                  <span>Hands-on PCB assembly, soldering, and debugging.</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2 p-2 mt-5">
              <motion.div
                whileHover="hover"
                initial="rest"
                variants={imageHover}
                className="overflow-hidden rounded-lg h-48"
              >
                <ImageWithSkeleton
                  src={arduinoImages.day1_1}
                  alt="Arduino Workshop Day 1"
                  className="h-full"
                />
              </motion.div>

              <motion.div
                whileHover="hover"
                initial="rest"
                variants={imageHover}
                className="overflow-hidden rounded-lg h-48"
              >
                <ImageWithSkeleton
                  src={arduinoImages.day1_2}
                  alt="Arduino Workshop Day 1"
                  className="h-full"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "#3f6197" }}
              >
                Day 2: Arduino Programming & Sensor Integration
              </h3>

              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                    •
                  </span>
                  <span>
                    Basics of Arduino programming syntax and bootloader setup.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                    •
                  </span>
                  <span>
                    Working with serial communication, timers, and interrupts.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                    •
                  </span>
                  <span>
                    Integrating Bluetooth, ultrasonic, RFID, and relay modules.
                  </span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2 p-2 mt-10">
              <motion.div
                whileHover="hover"
                initial="rest"
                variants={imageHover}
                className="overflow-hidden rounded-lg h-48"
              >
                <ImageWithSkeleton
                  src={arduinoImages.day2_1}
                  alt="Arduino Workshop Day 2"
                  className="h-full"
                />
              </motion.div>

              <motion.div
                whileHover="hover"
                initial="rest"
                variants={imageHover}
                className="overflow-hidden rounded-lg h-48"
              >
                <ImageWithSkeleton
                  src={arduinoImages.day2_2}
                  alt="Arduino Workshop Day 2"
                  className="h-full"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <h2
            className="text-2xl font-semibold mb-6 inline-block border-b-2 pb-2"
            style={{ borderColor: "#3f6197", color: "#3f6197" }}
          >
            Who Should Attend?
          </h2>

          <p className="text-gray-700 mb-4">This workshop is ideal for:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>Engineering students and researchers</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>Electronics and hardware enthusiasts</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>IoT developers and makers</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>Innovation-minded entrepreneurs</span>
            </li>
          </ul>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <h2
            className="text-2xl font-semibold mb-4 inline-block border-b-2 pb-2"
            style={{ borderColor: "#3f6197", color: "#3f6197" }}
          >
            Learning Outcomes
          </h2>

          <p className="text-gray-700 mb-4">
            By the end of this workshop, participants will:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>
                Gain awareness of Arduino and its role in embedded systems
                development.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>
                Learn to design, integrate, and calibrate custom Arduino-based
                microcontrollers.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>
                Develop hands-on skills in soldering, debugging, and assembling
                PCB circuits.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>
                Understand basic programming and firmware uploading for
                microcontroller projects.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>
                Explore real-world applications of Arduino in IoT, automation,
                and sensor-based systems.
              </span>
            </li>
          </ul>
        </motion.section>
      </div>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="rounded-lg overflow-hidden shadow-lg relative h-[500px]"
      >
        {!videoLoaded && (
          <div className="absolute inset-0 z-10">
            <Skeleton className="bg-gray-300 w-full h-full rounded-lg" />
          </div>
        )}
        <video
          src={arduinoImages.arduinoVideo}
          controls
          className="w-full h-[500px] object-cover"
          poster={arduinoImages.arduinoPoster}
          onLoadedData={() => setVideoLoaded(true)}
        ></video>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-16 text-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-lg text-white font-medium shadow-lg"
          style={{ backgroundColor: "#3f6197" }}
          onClick={() => window.open(state?.arduinoProgramming, "_blank")}
        >
          Register Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Arduino_Programming;
