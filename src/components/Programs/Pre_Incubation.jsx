import React from "react";
import { motion } from "framer-motion";
import { bridge, wadhwani } from "../../assets/Programs/Pre_Incubation/data";

const Pre_Incubation = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const modules = [
    "Problem Identification – Understanding real-world challenges",
    "Customer Identification & Needs Validation",
    "Customer Validation (Continued)",
    "Solution Idea Generation – Converting ideas into practical solutions",
    "Opportunity & Competition Mapping",
    "Prototype Development & MVP",
    "Market & Opportunity Scoping",
    "Business Modelling – Structuring your startup for success",
    "Marketing & Sales Strategy",
    "Financial Management for Profitability",
    "Team & Talent Requirements",
    "Venture Pitch Readiness"
  ];

  return (
    <motion.div
      className="w-full mx-auto p-8 rounded-xl bg-white shadow-lg mb-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Logo Section */}
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
          <div className=" p-2 shadow-2xl rounded-xl bg-white">
            <img className=" h-16 flex items-center justify-center" src={bridge} alt="" />
          </div>
        </motion.div>

        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <motion.div
            className="inline-block px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r from-[#3f6197] to-[#5b84c0] rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
          >
            BRIDGE 3.0
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-[#3f6197] mb-4"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Pre-Incubation Program
          </motion.h1>
          <p className="text-xl text-gray-600">Transforming Ideas into Scalable Startups</p>
        </motion.div>

        {/* About Section */}
        <motion.div variants={itemVariants} className="mb-12 text-center max-w-4xl mx-auto">
          <p className="text-gray-700 leading-relaxed">
            Bridge 3.0 is a 12-week pre-incubation program designed to empower early-stage startups by refining their business ideas, validating market needs, and developing viable business models. Organized by Atal Incubation Centre - PEC Foundation (AIC-PECF) in collaboration with Wadhwani Foundation, this program equips entrepreneurs with structured guidance, mentoring, and resources to transition from ideation to a market-ready startup.
          </p>
        </motion.div>

        {/* Program Highlights */}
        <motion.div variants={containerVariants} className="mb-12">
          <h2 className="text-2xl font-bold text-[#3f6197] mb-6 text-center">Program Highlights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Structured cohort-based learning",
              "One-on-one mentoring from industry experts",
              "Hands-on workshops and peer learning",
              "Access to startup success toolkits"
            ].map((highlight, index) => (
              <motion.div
                key={index}
                className="bg-[#f5f8ff] p-6 rounded-lg shadow-sm border-l-4 border-[#3f6197]"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(63, 97, 151, 0.2)",
                }}
              >
                <p className="text-gray-700">{highlight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Modules */}
        <motion.div variants={containerVariants} className="mb-12">
          <h2 className="text-2xl font-bold text-[#3f6197] mb-6 text-center">12-Week Learning Modules</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 bg-[#f5f8ff] p-6 rounded-lg shadow-sm"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(63, 97, 151, 0.2)",
                }}
              >
                <motion.div
                  className="w-8 h-8 bg-[#3f6197] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  whileHover={{ rotate: 10 }}
                >
                  {index + 1}
                </motion.div>
                <p className="text-gray-700">{module}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Who Can Apply */}
        <motion.div variants={containerVariants} className="mb-12">
          <h2 className="text-2xl font-bold text-[#3f6197] mb-6 text-center">Who Can Apply?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Students, innovators, and early-stage entrepreneurs",
              "Individuals with a business idea or prototype",
              "Startups looking to refine their business model and market validation"
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-[#f5f8ff] p-6 rounded-lg shadow-sm border-l-4 border-[#3f6197]"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(63, 97, 151, 0.2)",
                }}
              >
                <p className="text-gray-700">{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Program Partners */}
        <motion.div variants={containerVariants} className="mb-12">
          <h2 className="text-2xl font-bold text-[#3f6197] mb-6 text-center">Program Partners</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Partner 1 */}
            {/* <motion.div
              className="bg-[#f5f8ff] p-8 rounded-xl shadow-lg border-2 border-[#3f6197]"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(63, 97, 151, 0.3)",
              }}
            >
              <div className="h-24 bg-white rounded-lg mb-6 flex items-center justify-center">
                <span className="text-gray-400">AIC-PECF Logo</span>
              </div>
              <h3 className="text-xl font-semibold text-[#3f6197] mb-3">
                Atal Incubation Centre - PEC Foundation
              </h3>
              <p className="text-gray-700">
                A premier incubation center fostering innovation and entrepreneurship through structured guidance and support.
              </p>
            </motion.div> */}

            {/* Partner 2 */}
            <motion.div
              className="bg-[#f5f8ff] p-8 rounded-xl shadow-lg border-2 border-[#3f6197]"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(63, 97, 151, 0.3)",
              }}
            >
              <div className="">
                <img className="h-24 bg-white rounded-lg mb-6 flex items-center justify-center" src={wadhwani} alt="" />
              </div>
              <h3 className="text-xl font-semibold text-[#3f6197] mb-3">
                Wadhwani Foundation
              </h3>
              <p className="text-gray-700">
                A global non-profit organization accelerating economic development through entrepreneurship and innovation.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div className="text-center" variants={itemVariants}>
          <motion.button
            className="px-8 py-3 bg-[#3f6197] text-white font-medium rounded-lg shadow-md"
            whileHover={{ scale: 1.05, backgroundColor: "#5b84c0" }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Pre_Incubation;