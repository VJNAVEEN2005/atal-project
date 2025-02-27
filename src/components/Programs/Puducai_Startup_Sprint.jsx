import React, { useState } from "react";
import { motion } from "framer-motion";
import { arduino, drone, puduvai_Startup_Sprint, rasparipi, solidworks } from "../../assets/Programs/Puduvai_Startup_Sprint/data";
import { bootcamp, demo, hackathon, idea, OP1, OP2, OP3, OP4, outreach1, pitch, preinc, startup } from "../../assets/logos/dataPrograms";

// Enhanced animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeInOut" }
  }
};

const imageHover = {
  rest: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
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

const PuduvaiStartupSprint = () => {
  const programPillars = [
    {
      icon: OP1,
      title: "Community Engagement",
      description: "Fostering connections and building stronger communities."
    },
    {
      icon: OP2,
      title: "Education",
      description: "Promoting learning opportunities and knowledge sharing."
    },
    {
      icon: OP3,
      title: "Innovation",
      description: "Encouraging creativity and forward-thinking solutions."
    },
    {
      icon: OP4,
      title: "Sustainability",
      description: "Focusing on long-term environmental and social impacts."
    }
  ];

  const pedagogy = [
    { logo: bootcamp, name: "Boot Camp" },
    { logo: hackathon, name: "Hackathon" },
    { logo: preinc, name: "Pre-Incubation" },
    { logo: startup, name: "Startup Creation" },
    { logo: outreach1, name: "Outreach" },
    { logo: idea, name: "Ideathon" },
    { logo: demo, name: "Demo Day" },
    { logo: pitch, name: "Pitch Fest" }
  ];

  const programs = [
    { title: "Drone", image: drone },
    { title: "Arduino", image: arduino },
    { title: "Solid Works", image: solidworks },
    { title: "Raspberry Pi", image: rasparipi }
  ];

  return (
    <div className="w-full mx-auto px-4 py-8 bg-white shadow-xl rounded-lg mb-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex justify-center mb-12"
      >
        <motion.div 
          animate="animate"
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <ImageWithLoader 
            className="w-72 object-cover" 
            src={puduvai_Startup_Sprint} 
            alt="Puduvai Startup Sprint" 
          />
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-red-600 mb-6">
          FOSTERING INNOVATION AND ENTREPRENEURSHIP
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          PUDUVAI – Startup Sprint is a uniquely designed and curated Startup
          Ecosystem development program model for the Union Territory of
          Puducherry aligned in line with National Startup Ecosystem framework
          reform areas. A joint initiative of Directorate of Industries and
          Commerce Government of Puducherry & AIC-PEC Foundation.
        </p>
      </motion.div>

      <section className="mb-16">
        <motion.h2 
          {...fadeInUp}
          className="text-3xl font-bold text-[#3f6197] text-center mb-8"
        >
          Program Pillars
        </motion.h2>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {programPillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial="rest"
              whileHover="hover"
              variants={cardHover}
              className="bg-white rounded-lg p-6 shadow-lg cursor-pointer"
            >
              <motion.div className="w-16 h-16 mx-auto mb-4">
                <ImageWithLoader 
                  src={pillar.icon} 
                  alt={pillar.title} 
                  className="w-16 h-16"
                />
              </motion.div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">{pillar.title}</h3>
              <p className="text-gray-600">{pillar.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mb-16">
        <motion.h2 
          {...fadeInUp}
          className="text-3xl font-bold text-[#3f6197] text-center mb-8"
        >
          Program Pedagogy
        </motion.h2>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {pedagogy.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg p-4 shadow-lg text-center cursor-pointer"
            >
              <motion.div className="w-16 h-16 mx-auto mb-3">
                <ImageWithLoader 
                  src={item.logo} 
                  alt={item.name} 
                  className="w-16 h-16"
                />
              </motion.div>
              <h4 className="text-red-600 font-semibold">{item.name}</h4>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className=" w-full flex justify-center items-center"
        // className="bg-[#3f6197] text-white rounded-lg p-8"
      >
        {/* <h2 className="text-3xl font-bold mb-6 text-center">Recap</h2>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          {[
            { label: "No. of Beneficiary", value: "12 Schools" },
            { label: "Duration", value: "3 months" },
            { label: "Mode of Training", value: "Hybrid" }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-white/10 rounded-lg backdrop-blur-sm cursor-pointer"
            >
              <p className="text-lg font-semibold">{item.label}</p>
              <motion.p 
                className="text-2xl font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {item.value}
              </motion.p>
            </motion.div>
          ))}
        </motion.div> */}
        <button className=" bg-[#3f6197] rounded-2xl p-4 text-white font-bold">Apply Now In Advance</button>
      </motion.section>
    </div>
  );
};

export default PuduvaiStartupSprint;