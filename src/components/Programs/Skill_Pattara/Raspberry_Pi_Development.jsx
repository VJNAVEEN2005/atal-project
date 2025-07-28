import React, { useState } from "react";
import { motion } from "framer-motion";
import ScrollToTop from "../../ScrollToTop";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { raspberry1, raspberry2, raspberry3, raspberry4, raspberry5, raspberry6 } from "../../../assets/Programs/SkillPattara/data";
import { useSelector } from "react-redux";

const raspberryPi1 = raspberry1;
const raspberryPi2 = raspberry2;
const raspberryPi3 = raspberry3;
const raspberryPi4 = raspberry4;
const raspberryPi5 = raspberry5;
const raspberryPi6 = raspberry6;
const raspberryPi_event = "https://via.placeholder.com/640x360";
const raspberryPi = "https://via.placeholder.com/640x360";

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

const Raspberry_Pi_Development = () => {
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

  // Image collection
  const raspberryPiImages = {
    intro1: raspberryPi1,
    intro2: raspberryPi2,
    day1_1: raspberryPi3,
    day1_2: raspberryPi4,
    day2_1: raspberryPi5,
    day2_2: raspberryPi6,
    raspberryPiVideo: raspberryPi_event,
    raspberryPiPoster: raspberryPi,
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
          Exploring Raspberry Pi: Hands-On Sensor Integration
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
              The "Exploring Raspberry Pi: Hands-On Sensor Integration" workshop is a technical training program designed to introduce students and innovators to Raspberry Pi-based computing, sensor integration, and real-world applications. Organized by AIC-PECF, this workshop provides a structured approach to learning embedded systems, IoT, and automation, focusing on practical implementation and problem-solving.
            </motion.p>

            <motion.p
              variants={fadeIn}
              className="text-gray-700 leading-relaxed"
            >
              By the end of the workshop, participants will have built multiple projects integrating hardware components, real-time data processing, and AI-driven object detection, providing a solid foundation for future exploration in IoT and embedded systems.
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
                src={raspberryPiImages.intro1}
                alt="Raspberry Pi Workshop"
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
                src={raspberryPiImages.intro2}
                alt="Raspberry Pi Workshop"
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
          This workshop offers an in-depth exploration of Raspberry Pi, covering both hardware and software aspects. Participants will engage in hands-on learning through structured modules, gaining expertise in Python programming, Linux commands, GPIO operations, and sensor-based automation. The curriculum is designed to build practical skills through project-based learning, culminating in functional IoT prototypes.
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
                Day 1: Fundamentals of Raspberry Pi
              </h3>

              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                    •
                  </span>
                  <span>
                    Introduction to Raspberry Pi, hardware architecture, and GPIO connectivity.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                    •
                  </span>
                  <span>
                    Installing and configuring Raspberry Pi OS (Raspbian).
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                    •
                  </span>
                  <span>Basics of Linux commands and Python programming.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                    •
                  </span>
                  <span>Hands-on practice: GPIO pin control with an LED demonstration.</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2 p-2">
              <motion.div
                whileHover="hover"
                initial="rest"
                variants={imageHover}
                className="overflow-hidden rounded-lg h-48"
              >
                <ImageWithSkeleton
                  src={raspberryPiImages.day1_1}
                  alt="Raspberry Pi Workshop Day 1"
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
                  src={raspberryPiImages.day1_2}
                  alt="Raspberry Pi Workshop Day 1"
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
                Day 2: Sensor Integration & Object Detection
              </h3>

              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                    •
                  </span>
                  <span>
                    Working with ultrasonic, LDR, IR, and moisture sensors.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                    •
                  </span>
                  <span>
                    Integrating Raspberry Pi Camera for object detection.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                    •
                  </span>
                  <span>
                    Hands-on project: Real-time object detection and analysis.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                    •
                  </span>
                  <span>
                    Building an IoT-based monitoring system with data visualization.
                  </span>
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
                  src={raspberryPiImages.day2_1}
                  alt="Raspberry Pi Workshop Day 2"
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
                  src={raspberryPiImages.day2_2}
                  alt="Raspberry Pi Workshop Day 2"
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

          <p className="text-gray-700 mb-4">This workshop is designed for:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>Students and researchers</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>Tech enthusiasts and hobbyists</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>Engineers and developers</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>IoT project creators</span>
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
            By completing this workshop, participants will:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>
                Gain practical skills in Raspberry Pi programming and sensor interfacing.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>
                Understand hardware-software integration for real-world applications.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>
                Develop problem-solving capabilities using Linux and Python.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>
                Build and test sensor-based prototypes for automation and IoT.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>
                •
              </span>
              <span>
                Explore computer vision and AI-based object detection.
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
          src={raspberryPiImages.raspberryPiVideo}
          controls
          className="w-full h-[500px] object-cover"
          poster={raspberryPiImages.raspberryPiPoster}
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
          onClick={() => window.open(state?.raspberryPiDevelopment, "_blank")}
        >
          Register Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Raspberry_Pi_Development;