import React from 'react';
import { motion } from 'framer-motion';

const Pre_Incubation = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-8 rounded-xl bg-white shadow-lg mb-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section with Gradient Badge */}
      <motion.div variants={itemVariants} className="mb-8">
        <motion.div 
          className="inline-block px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r from-[#3f6197] to-[#5b84c0] rounded-full mb-4"
          whileHover={{ scale: 1.05 }}
        >
          BRIDGE
        </motion.div>
        <motion.h1 
          className="text-5xl font-bold text-[#3f6197]"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Pre-Incubation
        </motion.h1>
      </motion.div>

      {/* Content Cards */}
      <motion.div 
        className="grid gap-6 md:grid-cols-3"
        variants={containerVariants}
      >
        {/* Card 1 */}
        <motion.div 
          className="bg-[#f5f8ff] border-l-4 border-[#3f6197] p-6 rounded-lg shadow-sm"
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(63, 97, 151, 0.2)" }}
        >
          <motion.div 
            className="w-12 h-12 bg-[#3f6197] text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold"
            whileHover={{ rotate: 10 }}
          >
            1
          </motion.div>
          <p className="text-gray-700 leading-relaxed">
            This Program is suited for early stage startups in the ideation stage, problem identification stage, idea validation stage or prototype stage, and are unable to take their ideas to the next stage.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          className="bg-[#f5f8ff] border-l-4 border-[#3f6197] p-6 rounded-lg shadow-sm"
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(63, 97, 151, 0.2)" }}
        >
          <motion.div 
            className="w-12 h-12 bg-[#3f6197] text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold"
            whileHover={{ rotate: 10 }}
          >
            2
          </motion.div>
          <p className="text-gray-700 leading-relaxed">
            Selected teams will undergo 12-week pre-incubation program, during which they will be engaged in various sessions, workshops, peer-to-peer learning activities.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          className="bg-[#f5f8ff] border-l-4 border-[#3f6197] p-6 rounded-lg shadow-sm"
          variants={itemVariants}
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(63, 97, 151, 0.2)" }}
        >
          <motion.div 
            className="w-12 h-12 bg-[#3f6197] text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold"
            whileHover={{ rotate: 10 }}
          >
            3
          </motion.div>
          <p className="text-gray-700 leading-relaxed">
            Post-pre-incubation, the startups will be given an opportunity to pitch to AIC-PECF for a 24-month incubation journey.
          </p>
        </motion.div>
      </motion.div>

      {/* CTA Button */}
      <motion.div 
        className="mt-12 text-center"
        variants={itemVariants}
      >
        <motion.button
          className="px-8 py-3 bg-[#3f6197] text-white font-medium rounded-lg shadow-md"
          whileHover={{ scale: 1.05, backgroundColor: "#5b84c0" }}
          whileTap={{ scale: 0.95 }}
        >
          Apply Now
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Pre_Incubation;