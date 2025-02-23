import React from 'react';
import { RocketIcon } from "lucide-react";
import { motion } from "framer-motion";
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

export default function PropelX() {
  return (
    <div className="w-full  mx-auto px-4 py-8 bg-white shadow-xl rounded-lg mb-10">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header with Animation */}
        <motion.div 
          className="text-center flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
          <img className=' shadow-2xl rounded-xl h-52' src={proplex} alt="" />
          </div>
          <h1 className="text-4xl mt-8 font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-customBlue to-purple-600">
            Propel X
          </h1>
          <p className="text-xl font-semibold text-gray-700">PUDUVAI STARTUP DEMO DAY</p>
          <p className="text-gray-500 mt-2">September 30 2022</p>
        </motion.div>

        {/* Main Description */}
        <motion.div 
          className="mb-12 max-w-3xl mx-auto text-center"
          {...fadeIn}
        >
          <p className="text-lg text-gray-600 leading-relaxed">
            10 promising growth stage startups would be provided opportunity for pitching their propositions at Startup
            Demo Day, who would be judged by an esteemed panel, which could be a precursor to the primary level screening
            for investment, customer acquisition and market development support.
          </p>
        </motion.div>

        {/* Objectives */}
        <motion.section 
          className="mb-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Objectives</h2>
          <div className="space-y-4">
            {objectives.map((objective, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="flex gap-4 items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <RocketIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{objective}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Demo Day Highlights */}
        <motion.section 
          className="mb-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Demo Day - Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <p className="font-bold text-3xl mb-3 text-blue-600">{highlight.number}</p>
                <p className="text-gray-700">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Benefits */}
        <motion.section 
          className="mb-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">What's in it for you?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="flex gap-4 items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <RocketIcon className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Profiles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Exhibitor Profile */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-4">Exhibitor Profile</h2>
            <div className="space-y-2">
              {exhibitorProfile.map((item, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-700"
                >
                  • {item}
                </motion.p>
              ))}
            </div>
          </motion.section>

          {/* Visitor Profile */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-4">Visitor Profile</h2>
            <div className="space-y-2">
              {visitorProfile.map((item, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-700"
                >
                  • {item}
                </motion.p>
              ))}
            </div>
          </motion.section>
        </div>
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