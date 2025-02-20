import React from "react";
import { motion } from "framer-motion";
import { astronaut } from "../assets/404/data";
import { useNavigate } from "react-router-dom";

const Page_Not_Found = () => {
  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const navigate = new useNavigate();

  const starVariants = {
    twinkle: {
      opacity: [0.2, 1, 0.2],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: Math.random() * 3 + 1,
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="h-screen bg-[#3f6197] overflow-hidden relative m-1 md:m-10 shadow-2xl shadow-gray-500 rounded-lg">
      {/* Animated Background Elements */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          variants={starVariants}
          animate="twinkle"
        />
      ))}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="h-full flex flex-col justify-center items-center relative"
      >
        {/* Floating Grid Pattern */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-10">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="border border-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.01 }}
            />
          ))}
        </div>

        {/* Animated 404 Text */}
        <div className="flex relative z-10">
          <motion.div
            initial={{ y: -1000 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
            className="text-9xl font-bold text-white"
          >
            4
          </motion.div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="relative mx-4"
          >
            <motion.div
              className="text-9xl font-bold text-white relative"
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              0
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full"
              variants={floatingVariants}
              animate="float"
            />
          </motion.div>

          <motion.div
            initial={{ y: 1000 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 120 }}
            className="text-9xl font-bold text-white"
          >
            4
          </motion.div>
        </div>

        {/* Animated Text */}
        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ delay: 1, type: "spring" }}
          className="text-2xl font-bold text-white mt-8 text-center"
        >
          <span className="block mb-2">🚀 Lost in Space?</span>
          <motion.span
            className="block text-lg"
            animate={{ opacity: [0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            The page you requested was not found
          </motion.span>
        </motion.div>

        {/* Floating Astronaut */}
        <motion.img
          src={astronaut} // Replace with your astronaut image
          className="absolute w-32 h-32"
          style={{ right: "20%", top: "30%" }}
          variants={floatingVariants}
          animate="float"
        />

        {/* Animated Rocket Button */}
        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.9 }}
          className="mt-12 bg-white text-[#3f6197] px-8 py-3 rounded-full cursor-pointer font-bold flex items-center gap-2"
        >
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            🚀
          </motion.span>
          Back to Home
        </motion.button>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Page_Not_Found;
