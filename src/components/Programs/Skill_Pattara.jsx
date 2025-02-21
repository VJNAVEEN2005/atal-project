import React from "react";
import { motion } from "framer-motion";
import {
  arduino,
  drone,
  rasparipi,
  solidworks,
} from "../../assets/Programs/Puduvai_Startup_Sprint/data";
import { skill_patara } from "../../assets/Programs/SkillPattara/data";
import { useNavigate } from "react-router-dom";

const Skill_Pattara = () => {
  const navigate = new useNavigate();
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(63, 97, 151, 0.3)",
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  const programs = [
    {
      title: "Drone Technology",
      image: drone,
      description: "Learn drone design, assembly and flight operations",
      link: "/drone_technology",
    },
    {
      title: "Arduino Programming",
      image: arduino,
      description: "Build electronic projects with Arduino",
      link: "/arduino_programming",
    },
    {
      title: "3D Modeling with SolidWorks",
      image: solidworks,
      description: "Create precision 3D models for manufacturing",
      link: "/drone_technology",
    },
    {
      title: "Raspberry Pi Development",
      image: rasparipi,
      description: "Develop IoT solutions using Raspberry Pi",
      link: "/raspberry_pi_development",
    },
  ];

  return (
    <div className="py-16 bg-white shadow-xl rounded-lg mb-10">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              src={skill_patara}
              alt="Skill Pattara Logo"
              className="h-32 md:h-40 shadow-xl rounded-lg"
            />
          </div>

          {/* Added content about Skill Pattarai */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-10 mt-6 bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-xl shadow-sm"
          >
            <h2 className="text-2xl font-bold text-[#3f6197] mb-4 flex items-center">
              <span className="w-2 h-8 bg-[#3f6197] mr-3 rounded-full"></span>
              What is Skill Pattarai
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-[#3f6197]">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold text-[#3f6197]">
                    Skill Pattarai
                  </span>{" "}
                  is a Grassroot Technical program organized by Atal Incubation
                  Centre - PEC Foundation. It serves as a dynamic platform that
                  provides essential education and training in our focus areas
                  where young Grads acquire technical knowledge in the fields
                  such as Embedded Systems(Arduino), IoT(Raspberry Pi) Unmanned
                  Aerial Vehicles (Drones), Robotics, 3-D Printing and Website
                  Building.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-[#3f6197]">
                <p className="text-gray-700 leading-relaxed">
                  Skill Pattarai offers an immersive experience that bridges the
                  gap between theoretical knowledge and practical application.
                  You'll engage in real-world projects involving complex system
                  integration, precision engineering, and advanced prototyping
                  techniques. This practical exposure enhances your
                  problem-solving abilities and prepares you to tackle complex
                  challenges in real-world scenarios.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center mt-6">
              {[
                "Arduino",
                "Raspberry Pi",
                "Drones",
                "Robotics",
                "3D Printing",
                "Web Development",
              ].map((tech, index) => (
                <span
                  key={index}
                  className="bg-[#3f6197]/10 text-[#3f6197] px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Empowering the next generation of tech innovators through hands-on
            learning and practical skill development in emerging technologies.
          </p>
        </div>

        {/* Programs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {programs.map((program, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100"
            >
              <motion.div
                className="relative h-60 overflow-hidden"
                variants={imageVariants}
              >
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3f6197]/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="p-4 text-white text-sm">
                    {program.description}
                  </p>
                </div>
              </motion.div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#3f6197] mb-2">
                  {program.title}
                </h3>
                <div className="w-10 h-1 bg-[#3f6197] mb-4"></div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  className="text-sm font-medium text-[#3f6197] hover:text-[#2a4268] flex items-center"
                  onClick={() => navigate(program.link)}
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-[#3f6197] text-white px-8 py-3 rounded-md font-medium shadow-lg hover:bg-[#2a4268] transition-colors"
          >
            Apply Now
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Skill_Pattara;
