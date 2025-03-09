import React, { useState } from 'react';
import { RocketIcon, ArrowUpRight, Calendar, Users, Briefcase, Target } from "lucide-react";
import { motion } from "framer-motion";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { proplex } from '../../assets/Programs/Proplex/data';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function PropelX() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="w-full mx-auto p-6 rounded-xl bg-white shadow-xl mb-10">
      <div className="max-w-6xl mx-auto">
        {/* Header with Animation */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="text-center md:text-left"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-purple-500">
              Propel X
            </h1>
            <p className="text-2xl font-semibold text-purple-700 tracking-wide">PUDUVAI STARTUP DEMO DAY</p>
            <div className="flex items-center mt-4 justify-center md:justify-start">
              <Calendar className="w-5 h-5 text-purple-500 mr-2" />
              <p className="text-purple-500">September 30, 2022</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            {!imageLoaded && <Skeleton height={180} width={280} className="rounded-xl" />}
            <motion.img 
              className='shadow-2xl rounded-xl h-44 border-4 border-purple-500' 
              src={proplex} 
              alt="Propel X Logo" 
              onLoad={() => setImageLoaded(true)}
              style={{ display: imageLoaded ? 'block' : 'none' }}
              initial={{ rotate: -5 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            />
          </motion.div>
        </motion.div>

        {/* Main Description */}
        <motion.div 
          className="mb-12 max-w-3xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="p-6 bg-purple-50 rounded-xl border border-purple-200 shadow-md">
            <p className="text-lg text-purple-800 leading-relaxed">
              10 promising growth stage startups would be provided opportunity for pitching their propositions at Startup
              Demo Day, who would be judged by an esteemed panel, which could be a precursor to the primary level screening
              for investment, customer acquisition and market development support.
            </p>
          </div>
        </motion.div>

        {/* Demo Day Highlights */}
        <motion.section 
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-2xl font-bold mb-6 text-center text-purple-800 flex items-center justify-center gap-2"
            variants={itemVariants}
          >
            <Target className="w-6 h-6 text-purple-500" />
            Demo Day - Highlights
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-lg border border-purple-200 text-center hover:shadow-xl transition-all hover:border-purple-400"
                whileHover={{ 
                  y: -5, 
                  backgroundColor: "#f3e8ff", 
                  transition: { duration: 0.2 } 
                }}
              >
                <motion.p 
                  className="font-bold text-4xl mb-3 text-purple-600"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 100 }}
                >
                  {highlight.number}
                </motion.p>
                <p className="text-purple-700">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Objectives */}
        <motion.section 
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-2xl font-bold mb-6 text-center text-purple-800 flex items-center justify-center gap-2"
            variants={itemVariants}
          >
            <Target className="w-6 h-6 text-purple-500" />
            Objectives
          </motion.h2>
          <div className="space-y-4">
            {objectives.map((objective, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="flex gap-4 items-start bg-white p-5 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-all"
                whileHover={{ 
                  x: 5, 
                  backgroundColor: "#f3e8ff", 
                  transition: { duration: 0.2 } 
                }}
              >
                <ArrowUpRight className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                <p className="text-purple-700">{objective}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Benefits */}
        <motion.section 
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-2xl font-bold mb-6 text-center text-purple-800 flex items-center justify-center gap-2"
            variants={itemVariants}
          >
            <RocketIcon className="w-6 h-6 text-purple-500" />
            What's in it for you?
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-4 items-start bg-white p-5 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-all"
                whileHover={{ 
                  x: 5, 
                  backgroundColor: "#f3e8ff", 
                  transition: { duration: 0.2 } 
                }}
              >
                <ArrowUpRight className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                <p className="text-purple-700">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Profiles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Exhibitor Profile */}
          <motion.section
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-lg border border-purple-200"
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <h2 className="text-2xl font-bold mb-4 text-purple-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-500" />
              Exhibitor Profile
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {exhibitorProfile.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.4 }}
                  className="flex items-center bg-purple-50 rounded-lg p-3 hover:bg-purple-100 transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <p className="text-purple-700">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Visitor Profile */}
          <motion.section
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl shadow-lg border border-purple-200"
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <h2 className="text-2xl font-bold mb-4 text-purple-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              Visitor Profile
            </h2>
            <div className="space-y-2">
              {visitorProfile.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.4 }}
                  className="flex items-center bg-purple-50 rounded-lg p-3 hover:bg-purple-100 transition-colors"
                  whileHover={{ x: 3 }}
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <p className="text-purple-700">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <motion.button 
            className="bg-gradient-to-r from-purple-500 to-purple-700 px-8 py-3 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now in Advance
          </motion.button>
          <p className="mt-4 text-purple-500 text-sm">For inquiries: contact@propelx.com</p>
        </motion.div>
      </div>
    </div>
  );
}

const objectives = [
  "To Brand Puducherry as an Emerging Startup Ecosystem.",
  "To create a unique platform for Startups where they can showcase their ventures to investors.",
  "To Create B2B networking and collaborations for start-ups to grow in Puducherry.",
];

const highlights = [
  {
    number: "20+",
    description: "start-ups will showcase their products / services in the demo day visitors stall",
  },
  {
    number: "15+",
    description: "investors and mentors will be invited to attend the event",
  },
  {
    number: "100+",
    description: "Industry Leaders / Entrepreneurs will be invited to attend the Demo Day",
  },
];

const benefits = [
  "Exposure of esteemed dignitaries of the ecosystem",
  "Build strategic alliances with like-minded communities",
  "Networking with budding entrepreneurs",
  "Exposure of product demonstration",
  "Awareness about issues & challenges of early-stage innovators",
];

const exhibitorProfile = [
  "Electronics",
  "Engineering", 
  "Internet of Things (IoT)",
  "Unmanned Aerial Vehicle (UAV)",
  "IT/ITES",
  "Renewable Energy & Solar",
  "Textile & Apparel Park",
  "Tourism",
];

const visitorProfile = [
  "CEOs & Entrepreneurs from various sectors",
  "VC's / PE's/ HNI's / Angel Investors",
  "Senior Officials of Central and State Government",
  "Aspiring Students",
  "Budding Entrepreneurs",
  "Key Experts, Industrialists and Associations",
  "Start-ups and MSMEs from Various sectors",
];