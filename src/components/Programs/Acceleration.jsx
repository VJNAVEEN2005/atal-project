import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import { acceleration } from '../../assets/Programs/Acceleration/data';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const buttonAnimation = {
  rest: { scale: 1, backgroundColor: "#E31B23" },
  hover: { 
    scale: 1.05, 
    backgroundColor: "#C41019",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
  },
  tap: { scale: 0.95 }
};

// Image loader component
const ImageWithLoader = ({ src, alt, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className="relative">
      {!imageLoaded && (
        <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}>
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
      )}
      <img 
        className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} 
        src={src} 
        alt={alt} 
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

const Acceleration = () => {
  // Key features of the acceleration program
  const features = [
    {
      icon: "🚀",
      title: "Mentorship Clinics",
      description: "Get guidance from industry experts who have been there and done that."
    },
    {
      icon: "💰",
      title: "Investor Masterclass",
      description: "Learn how to pitch, fundraise, and manage investor relationships."
    },
    {
      icon: "📑",
      title: "IP Support",
      description: "Protect your innovations and intellectual property with expert guidance."
    },
    {
      icon: "📈",
      title: "Investment Opportunities",
      description: "Pitch to the investor forums of AIC-PECF and potential investors."
    }
  ];

  return (
    <div className="w-full mx-auto px-4 py-12 bg-gradient-to-b from-white shadow-xl rounded-lg overflow-hidden to-gray-50 mb-10">
      {/* Header Section with Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8"
      >
        <motion.div className="flex-1 max-w-xl">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 bg-red-500/10 text-red-600 rounded-full text-sm font-medium mb-4">
              STARTUP REVIVE
            </span>
            <h1 className="text-5xl font-bold text-red-600 mb-4">
              Acceleration
            </h1>
            <div className="h-1 w-20 bg-red-600 mb-6"></div>
            <motion.p 
              className="text-lg text-gray-700 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Empowering Puducherry startups to scale faster, grow stronger, and achieve market leadership.
            </motion.p>
            <motion.div
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={buttonAnimation}
              className="inline-block"
            >
              <motion.button
                className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg shadow-md"
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Apply Now
                <motion.span 
                  className="inline-block ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex-1 flex justify-center md:justify-end"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            className="bg-white p-4 rounded-2xl shadow-xl"
            whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ duration: 0.4 }}
          >
            <ImageWithLoader 
              src={acceleration} 
              alt="Acceleration Program" 
              className="w-80 md:w-96 object-contain rounded-lg"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Program Description Cards */}
      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
      >
        <motion.div 
          variants={fadeInUp}
          className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-600"
        >
          <h3 className="text-xl font-semibold text-red-600 mb-4">The Revival Mission</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Startup Revive is a flagship initiative to support and revive the existing startups in Puducherry to accelerate their growth. This 3-month program provides comprehensive support to help startups overcome challenges and reach their full potential.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This program is specifically aimed at growth-stage startups that are based in Puducherry or intending to set up their facility in Puducherry.
          </p>
        </motion.div>

        <motion.div 
          variants={fadeInUp}
          className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-red-600"
        >
          <h3 className="text-xl font-semibold text-red-600 mb-4">Designed for Growth</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Revive accelerator programme is exclusively designed for growth-stage startups with initial market traction. Our goal is to help you build a scalable business around your product or services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Through intensive mentorship, networking opportunities, and access to investors, we provide everything you need to take your startup to the next level.
          </p>
        </motion.div>
      </motion.div>

      {/* Core Features Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-red-600 text-center mb-12"
        >
          Program Components
        </motion.h2>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-all duration-300"
            >
              <motion.div 
                className="text-4xl mb-4"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Program Timeline */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16 bg-red-600 text-white rounded-lg p-8"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">3-Month Journey</h2>
        <div className="flex flex-col md:flex-row justify-between items-start relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-white/30 -translate-y-1/2 z-0"></div>
          
          {/* Timeline points */}
          {["Month 1: Foundation", "Month 2: Growth", "Month 3: Showcase"].map((phase, index) => (
            <motion.div 
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center mb-8 md:mb-0 relative z-10 bg-red-600 p-4 rounded-lg"
            >
              <motion.div 
                className="w-12 h-12 rounded-full bg-white text-red-600 flex items-center justify-center text-xl font-bold mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {index + 1}
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{phase}</h3>
              <p className="text-white/80 max-w-xs">
                {index === 0 && "Assessment, goal setting, and mentorship matching."}
                {index === 1 && "Skill development, strategy refinement, and IP support."}
                {index === 2 && "Investor preparation, demo day, and networking."}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-12 bg-gray-50 rounded-xl shadow-inner"
      >
        <motion.h3 
          className="text-2xl font-bold text-red-600 mb-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to Accelerate Your Startup's Growth?
        </motion.h3>
        <motion.p 
          className="text-gray-600 mb-8 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          Join Startup Revive and transform your growing business into a market leader with expert guidance, investor access, and a supportive ecosystem.
        </motion.p>
        <motion.div
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          variants={buttonAnimation}
          className="inline-block rounded-full"
        >
          <motion.button
            className="px-10 py-4 bg-red-600 text-white font-bold rounded-full text-lg shadow-lg flex items-center mx-auto"
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            animate={{ y: [0, -5, 0] }}
          >
            <span>Apply for Startup Revive</span>
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </motion.svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Acceleration;