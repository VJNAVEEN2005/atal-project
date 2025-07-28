import React, { useState } from "react";
import { motion } from "framer-motion";
import { drone1, drone2, drone3, drone4, drone5, drone6, drone_event } from "../../../assets/Programs/SkillPattara/data";
import { drone } from "../../../assets/Focus/image/focus";
import ScrollToTop from "../../ScrollToTop";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from "react-redux";


const ImageWithSkeleton = ({ src, alt, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className={`relative ${className}`}>
      {!imageLoaded && <Skeleton className="bg-gray-300 w-full h-full rounded-lg"/>}
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

const Drone_Technology = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const state = useSelector((state) => state?.programsForm?.data?.data);
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const imageHover = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-gray-50">
      <ScrollToTop/>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#3f6197" }}>
          Drone Workshop – Build & Fly Your Own Drone
        </h1>
        <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: "#3f6197" }}></div>
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
            <motion.p variants={fadeIn} className="mb-4 text-gray-700 leading-relaxed">
              The "Build & Fly Your Own Drone" workshop is a two-day,
              action-oriented training program designed to introduce students and
              aspiring innovators to drone technology, UAV engineering, and
              real-world applications. Organized by AIC-PECF, this workshop provides
              a structured Do-It-Yourself (DIY) learning experience, covering drone
              assembly, electronics, automation, and avionics.
            </motion.p>
            
            <motion.p variants={fadeIn} className="text-gray-700 leading-relaxed">
              Participants will gain hands-on experience in building, calibrating,
              and flying drones, giving them a competitive edge in the rapidly
              growing UAV industry. This workshop is the Level-1 introduction to
              drone technology, preparing students for advanced drone applications
              in agriculture, defense, logistics, and surveying.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              whileHover="hover"
              initial="rest"
              variants={imageHover}
              className="overflow-hidden rounded-lg shadow-lg h-48"
            >
              <ImageWithSkeleton src={drone1} alt="Drone Workshop" className="h-full" />
            </motion.div>
            
            <motion.div 
              whileHover="hover"
              initial="rest"
              variants={imageHover}
              className="overflow-hidden rounded-lg shadow-lg h-48" 
            >
              <ImageWithSkeleton src={drone2} alt="Drone Workshop" className="h-full" />
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
        <h2 className="text-2xl font-semibold mb-6 inline-block border-b-2 pb-2"
            style={{ borderColor: "#3f6197", color: "#3f6197" }}>
          Course Overview
        </h2>
        
        <p className="text-gray-700 leading-relaxed">
          The workshop is designed to provide technical know-how on drone
          engineering and operation, with a strong focus on hands-on learning.
          Participants will explore the fundamentals of UAVs, drone electronics,
          flight control systems, and assembly techniques, ultimately leading to
          a live drone flight demonstration.
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
              <h3 className="text-xl font-semibold mb-4" style={{ color: "#3f6197" }}>
                Day 1: Introduction to UAVs and Drone Technology
              </h3>
              
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>•</span>
                  <span>Understanding UAV types, classifications, and applications in various industries.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>•</span>
                  <span>Exploring drone electronics, including BLDC motors, ESCs, telemetry, and radio control systems.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>•</span>
                  <span>Learning about flight control mechanisms and autopilot systems.</span>
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
                <ImageWithSkeleton src={drone3} alt="Drone Workshop Day 1" className="h-full" />
              </motion.div>
              
              <motion.div 
                whileHover="hover"
                initial="rest"
                variants={imageHover}
                className="overflow-hidden rounded-lg h-48"
              >
                <ImageWithSkeleton src={drone4} alt="Drone Workshop Day 1" className="h-full" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4" style={{ color: "#3f6197" }}>
                Day 2: Drone Assembly and Flight Demonstration
              </h3>
              
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>•</span>
                  <span>Hands-on assembly session – building a drone from the ground up.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>•</span>
                  <span>Configuring and calibrating firmware, sensors, and flight controllers.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-xl mr-2" style={{ color: "#3f6197" }}>•</span>
                  <span>Live drone prototype testing and flight demonstration.</span>
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
                <ImageWithSkeleton src={drone5} alt="Drone Workshop Day 2" className="h-full" />
              </motion.div>
              
              <motion.div 
                whileHover="hover"
                initial="rest"
                variants={imageHover}
                className="overflow-hidden rounded-lg h-48"
              >
                <ImageWithSkeleton src={drone6} alt="Drone Workshop Day 2" className="h-full" />
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
          <h2 className="text-2xl font-semibold mb-6 inline-block border-b-2 pb-2"
              style={{ borderColor: "#3f6197", color: "#3f6197" }}>
            Who Should Attend?
          </h2>
          
          <p className="text-gray-700 mb-4">This workshop is ideal for:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>•</span>
              <span>Students and researchers</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>•</span>
              <span>Tech enthusiasts and drone hobbyists</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>•</span>
              <span>Engineers and developers</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>•</span>
              <span>Entrepreneurs</span>
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
          <h2 className="text-2xl font-semibold mb-4 inline-block border-b-2 pb-2"
              style={{ borderColor: "#3f6197", color: "#3f6197" }}>
            Learning Outcomes
          </h2>
          
          <p className="text-gray-700 mb-4">By the end of this workshop, participants will:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>•</span>
              <span>Gain awareness of current and emerging drone technologies and their industry applications.</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>•</span>
              <span>Learn drone design, integration, and calibration using real-world components.</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>•</span>
              <span>Understand drone troubleshooting and performance optimization techniques.</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>•</span>
              <span>Gain hands-on experience in assembling and flying a functional drone prototype.</span>
            </li>
            <li className="flex items-start">
              <span className="text-xl mr-2" style={{ color: "#3f6197" }}>•</span>
              <span>Explore opportunities in drone entrepreneurship, research, and innovation.</span>
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
            <Skeleton className="bg-gray-300 w-full h-full rounded-lg"/>
          </div>
        )}
        <video 
          src={drone_event} 
          controls
          className="w-full h-[500px] object-cover"
          poster={drone}
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
          onClick={() => window.open(state?.droneTechnology, "_blank")}
        >
          Register Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Drone_Technology;