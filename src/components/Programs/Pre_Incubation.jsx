import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { bridge, wadhwani } from "../../assets/Programs/Pre_Incubation/data";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

const Pre_Incubation = () => {
  const [loading, setLoading] = useState(true);
  const [bridgeImageLoaded, setBridgeImageLoaded] = useState(false);
  const [wadhwaniImageLoaded, setWadhwaniImageLoaded] = useState(false);
  const state = useSelector((state) => state?.programsForm?.data?.data);
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Preload images
  useEffect(() => {
    const bridgeImg = new Image();
    bridgeImg.src = bridge;
    bridgeImg.onload = () => setBridgeImageLoaded(true);

    const wadhwaniImg = new Image();
    wadhwaniImg.src = wadhwani;
    wadhwaniImg.onload = () => setWadhwaniImageLoaded(true);
  }, []);

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

  const highlights = [
    "Structured cohort-based learning",
    "One-on-one mentoring from industry experts",
    "Hands-on workshops and peer learning",
    "Access to startup success toolkits"
  ];

  const eligibility = [
    "Students, innovators, and early-stage entrepreneurs",
    "Individuals with a business idea or prototype",
    "Startups looking to refine their business model and market validation"
  ];

  // Theme colors
  const themeColors = {
    primary: "#0099cc",       // Turquoise blue (from BRIDGE logo)
    secondary: "#00ccff",     // Lighter blue
    background: "#f0f9ff",    // Very light blue background
    text: "#00597a",          // Darker blue for text
    accent: "#00b8e6"         // Medium blue accent
  };

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
          <div className="p-2 shadow-2xl rounded-xl bg-white">
            {loading || !bridgeImageLoaded ? (
              <div className="h-16 w-48 flex items-center justify-center">
                <Skeleton height={64} width={200} />
              </div>
            ) : (
              <img 
                className="h-16 flex items-center justify-center" 
                src={bridge} 
                alt="BRIDGE Logo"
              />
            )}
          </div>
        </motion.div>

        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-12 text-center">
          {loading ? (
            <>
              <Skeleton width={100} height={30} className="mb-4 mx-auto" />
              <Skeleton height={50} className="mb-4" />
              <Skeleton width="60%" height={24} className="mx-auto" />
            </>
          ) : (
            <>
              <motion.div
                className="inline-block px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r from-[#0099cc] to-[#00ccff] rounded-full mb-4"
                whileHover={{ scale: 1.05 }}
              >
                BRIDGE 3.0
              </motion.div>
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-[#0099cc] mb-4"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Pre-Incubation Program
              </motion.h1>
              <p className="text-xl text-gray-600">Transforming Ideas into Scalable Startups</p>
            </>
          )}
        </motion.div>

        {/* About Section */}
        <motion.div variants={itemVariants} className="mb-12 text-center max-w-4xl mx-auto">
          {loading ? (
            <>
              <Skeleton count={3} className="mb-1" />
            </>
          ) : (
            <p className="text-gray-700 leading-relaxed">
              Bridge 3.0 is a 12-week pre-incubation program designed to empower early-stage startups by refining their business ideas, validating market needs, and developing viable business models. Organized by Atal Incubation Centre - PEC Foundation (AIC-PECF) in collaboration with Wadhwani Foundation, this program equips entrepreneurs with structured guidance, mentoring, and resources to transition from ideation to a market-ready startup.
            </p>
          )}
        </motion.div>

        {/* Program Highlights */}
        <motion.div variants={containerVariants} className="mb-12">
          {loading ? (
            <>
              <Skeleton width={200} height={30} className="mb-6 mx-auto" />
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} height={100} className="rounded-lg" />
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#0099cc] mb-6 text-center">Program Highlights</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#f0f9ff] p-6 rounded-lg shadow-sm border-l-4 border-[#0099cc]"
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 153, 204, 0.2)",
                    }}
                  >
                    <p className="text-[#00597a]">{highlight}</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Learning Modules */}
        <motion.div variants={containerVariants} className="mb-12">
          {loading ? (
            <>
              <Skeleton width={250} height={30} className="mb-6 mx-auto" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} height={80} className="rounded-lg" />
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#0099cc] mb-6 text-center">12-Week Learning Modules</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 bg-[#f0f9ff] p-6 rounded-lg shadow-sm"
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 153, 204, 0.2)",
                    }}
                  >
                    <motion.div
                      className="w-8 h-8 bg-[#0099cc] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      whileHover={{ rotate: 10 }}
                    >
                      {index + 1}
                    </motion.div>
                    <p className="text-[#00597a]">{module}</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Who Can Apply */}
        <motion.div variants={containerVariants} className="mb-12">
          {loading ? (
            <>
              <Skeleton width={180} height={30} className="mb-6 mx-auto" />
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} height={100} className="rounded-lg" />
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#0099cc] mb-6 text-center">Who Can Apply?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {eligibility.map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#f0f9ff] p-6 rounded-lg shadow-sm border-l-4 border-[#0099cc]"
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 153, 204, 0.2)",
                    }}
                  >
                    <p className="text-[#00597a]">{item}</p>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Program Partners */}
        <motion.div variants={containerVariants} className="mb-12">
          {loading ? (
            <>
              <Skeleton width={200} height={30} className="mb-6 mx-auto" />
              <Skeleton height={200} className="rounded-xl" />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#0099cc] mb-6 text-center">Program Partners</h2>
              <div>
                <motion.div
                  className="bg-[#f0f9ff] p-8 rounded-xl shadow-lg border-2 border-[#0099cc]"
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 153, 204, 0.3)",
                  }}
                >
                  <div className="w-full flex items-center justify-center flex-col">
                    {!wadhwaniImageLoaded ? (
                      <div className="h-24 w-48 bg-white rounded-lg mb-6 flex items-center justify-center">
                        <Skeleton height={96} width={180} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 border-4 border-t-[#0099cc] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                        </div>
                      </div>
                    ) : (
                      <img 
                        className="h-24 bg-white rounded-lg mb-6 flex items-center justify-center" 
                        src={wadhwani} 
                        alt="Wadhwani Foundation Logo" 
                        onLoad={() => setWadhwaniImageLoaded(true)}
                      />
                    )}
                  </div>
                  <h3 className="text-xl text-center font-semibold text-[#0099cc] mb-3">
                    Wadhwani Foundation
                  </h3>
                  <p className="text-[#00597a] text-center">
                    A global non-profit organization accelerating economic development through entrepreneurship and innovation.
                  </p>
                </motion.div>
              </div>
            </>
          )}
        </motion.div>

        {/* CTA Button */}
        <motion.div className="text-center" variants={itemVariants}>
          {loading ? (
            <Skeleton width={150} height={50} className="mx-auto rounded-lg" />
          ) : (
            <motion.button
              className="px-8 py-3 bg-[#0099cc] text-white font-medium rounded-lg shadow-md"
              whileHover={{ scale: 1.05, backgroundColor: "#00b8e6" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(state?.preIncubation, "_blank")}
            >
              Apply Now In Advance
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Pre_Incubation;