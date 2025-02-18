import React from "react";
import { motion } from "framer-motion";
import { arduino, drone, puduvai_Startup_Sprint, rasparipi, solidworks } from "../../assets/Programs/Puduvai_Startup_Sprint/data";

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

const PuduvaiStartupSprint = () => {
  const programPillars = [
    {
      icon: "src/assets/logos/OP1.png",
      title: "Community Engagement",
      description: "Fostering connections and building stronger communities."
    },
    {
      icon: "src/assets/logos/OP2.png",
      title: "Education",
      description: "Promoting learning opportunities and knowledge sharing."
    },
    {
      icon: "src/assets/logos/OP3.png",
      title: "Innovation",
      description: "Encouraging creativity and forward-thinking solutions."
    },
    {
      icon: "src/assets/logos/OP4.png",
      title: "Sustainability",
      description: "Focusing on long-term environmental and social impacts."
    }
  ];

  const pedagogy = [
    { logo: "src/assets/logos/bootcamp.png", name: "Boot Camp" },
    { logo: "src/assets/logos/hackathon.png", name: "Hackathon" },
    { logo: "src/assets/logos/preinc.png", name: "Pre-Incubation" },
    { logo: "src/assets/logos/startup.png", name: "Startup Creation" },
    { logo: "src/assets/logos/outreach1.png", name: "Outreach" },
    { logo: "src/assets/logos/idea.png", name: "Ideathon" },
    { logo: "src/assets/logos/demo.png", name: "Demo Day" },
    { logo: "src/assets/logos/pitch.png", name: "Pitch Fest" }
  ];

  const programs = [
    { title: "Drone", image: drone },
    { title: "Arduino", image: arduino },
    { title: "Solid Works", image: solidworks },
    { title: "Raspberry Pi", image: rasparipi }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
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
          <img 
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
        <h1 className="text-4xl font-bold text-[#3f6197] mb-6">
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
              <motion.img 
                src={pillar.icon} 
                alt={pillar.title} 
                className="w-16 h-16 mx-auto mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <h3 className="text-xl font-semibold text-[#3f6197] mb-2">{pillar.title}</h3>
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
              <motion.img 
                src={item.logo} 
                alt={item.name} 
                className="w-16 h-16 mx-auto mb-3"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <h4 className="text-[#3f6197] font-semibold">{item.name}</h4>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="mb-16">
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {programs.map((program, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="rest"
              whileHover="hover"
      
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
            >
              <motion.div 
                className="relative overflow-hidden"
                variants={imageHover}
              >
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full object-cover h-64" 
                />
              </motion.div>
              <motion.h3 
                className="text-xl font-semibold text-[#3f6197] py-4 text-center"
                whileHover={{ scale: 1.05 }}
              >
                {program.title}
              </motion.h3>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-[#3f6197] text-white rounded-lg p-8"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Recap</h2>
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
        </motion.div>
      </motion.section>
    </div>
  );
};

export default PuduvaiStartupSprint;