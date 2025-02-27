import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Rajkumar_COO,
  Sundhara_Moorthy_Director,
  Vishnu_CEO,
} from "../../assets/Team/coreTeam/images/coreTeamImage";

const Testimonials = () => {
  const testimonials = [
    {
      role: "CEO",
      name: "Mr. Vishnu Vardhan",
      occupation: "Chief Executive Officer",
      company: "Atal Incubation Centre, PEC Foundation",
      message:
        "A strong incubation ecosystem is the foundation of every successful startup. At AIC-PECF, we bridge the gap between ideas and execution, offering a structured environment where startups can validate, build, and scale with confidence.",
      photo: Vishnu_CEO,
    },
    {
      role: "COO",
      name: "Mr. S Rajakumar",
      occupation: "Chief Operating Officer",
      company: "Atal Incubation Centre, PEC Foundation",
      message:
        "Technology is at the heart of every startup’s journey. We provide the necessary technical support, industry insights, and access to cutting-edge tools that enable startups to innovate, prototype, and commercialize their solutions effectively.",
      photo: Rajkumar_COO,
    },
    {
      role: "Director",
      name: "Dr. R Sundaramurthy",
      occupation: "Executive Director",
      company: "Atal Incubation Centre, PEC Foundation",
      message:
        "Our goal is to create a thriving ecosystem where entrepreneurs receive the right mentorship, resources, and opportunities to scale their ventures successfully.",
      photo: Sundhara_Moorthy_Director,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [transition, setTransition] = useState("slide");
  const [direction, setDirection] = useState(1);

  // Auto-rotate transitions for variety
  useEffect(() => {
    const transitionTypes = ["slide", "fade", "zoom", "flip"];
    let transitionIndex = 0;

    const transitionInterval = setInterval(() => {
      transitionIndex = (transitionIndex + 1) % transitionTypes.length;
      setTransition(transitionTypes[transitionIndex]);
    }, 15000);

    return () => clearInterval(transitionInterval);
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Different transition variants
  const getVariants = () => {
    switch (transition) {
      case "fade":
        return {
          enter: { opacity: 0 },
          center: { opacity: 1 },
          exit: { opacity: 0 },
        };
      case "zoom":
        return {
          enter: { scale: 0.7, opacity: 0 },
          center: { scale: 1, opacity: 1 },
          exit: { scale: 1.3, opacity: 0 },
        };
      case "flip":
        return {
          enter: { rotateY: 90, opacity: 0 },
          center: { rotateY: 0, opacity: 1 },
          exit: { rotateY: -90, opacity: 0 },
        };
      default: // "slide"
        return {
          enter: (direction) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
          }),
          center: {
            x: 0,
            opacity: 1,
          },
          exit: (direction) => ({
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0,
          }),
        };
    }
  };

  // Image animation variants
  const imageVariants = {
    initial: { scale: 0.8, opacity: 0, rotateY: 30 },
    animate: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      rotateY: -30,
      transition: { duration: 0.5 },
    },
  };

  // Button hover animation
  const buttonHoverAnimation = {
    rest: {
      scale: 1,
      backgroundColor: "#3f6197",
      boxShadow: "0px 0px 0px rgba(0,0,0,0.2)",
    },
    hover: {
      scale: 1.1,
      backgroundColor: "#17396f",
      boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
    },
    pressed: {
      scale: 0.95,
      backgroundColor: "#496ba1",
    },
  };

  return (
    <motion.div
      className="w-[90%] sm:w-[85%] mx-auto mb-10 sm:mb-20 px-2 sm:px-0"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="max-w-fit mx-auto sm:ml-0 mt-8 sm:mt-10"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.h2
          className="text-xl sm:text-2xl font-semibold text-center sm:text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          HEAR FROM OUR TEAM
        </motion.h2>
        <motion.div
          id="border-bottom"
          className="mt-2 w-36 sm:w-52 mx-auto sm:mx-0 h-[4px] sm:h-[6px] rounded-full bg-customBlue"
          initial={{ width: 0 }}
          animate={{ width: "100%", maxWidth: 208 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        ></motion.div>
      </motion.div>

      <motion.div
        className="relative mt-6 sm:mt-10 shadow-lg rounded-md p-4 sm:p-6 md:p-10 bg-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
      >
        <div className="flex flex-col md:flex-row justify-center sm:justify-between items-center gap-4 sm:gap-6 md:gap-10">
          {/* Photo Section with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${currentSlide}`}
              className="rounded-full overflow-hidden bg-customBlue w-28 h-28 sm:w-40 sm:h-40 md:w-60 lg:w-80 md:h-60 lg:h-80 flex items-center justify-center shrink-0"
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="w-full h-full relative"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src={testimonials[currentSlide].photo}
                  alt={`${testimonials[currentSlide].role}'s photo`}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-customBlue opacity-0"
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Message Section with Animation */}
          <div className=" overflow-hidden w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={getVariants()}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.6,
                  type: transition === "flip" ? "spring" : "tween",
                  stiffness: transition === "flip" ? 200 : null,
                }}
                className="flex-col flex justify-between bg-slate-100 p-4 sm:p-6 md:p-10 rounded-md w-full relative"
                style={{ perspective: 1000 }}
              >
                <motion.p
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-left sm:text-justify"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {testimonials[currentSlide].message}
                </motion.p>
                <motion.div
                  className="gap-2 sm:gap-5 text-center font-medium text-xs sm:text-sm md:text-base lg:text-lg mt-3 sm:mt-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <motion.h4
                    className="text-base sm:text-lg font-bold text-customBlue"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {testimonials[currentSlide].name}
                  </motion.h4>
                  <motion.div
                    className="flex flex-col sm:flex-row gap-0 sm:gap-2 justify-center text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h4 className="text-xs sm:text-sm">
                      {testimonials[currentSlide].occupation}
                      {window.innerWidth >= 640 ? "," : ""}
                    </h4>
                    <h4 className="text-xs sm:text-sm">
                      {testimonials[currentSlide].company}
                    </h4>
                  </motion.div>
                </motion.div>
                {/* Decorative Arrow with Animation - Only visible on MD+ screens */}
                <motion.div
                  className="min-w-4 min-h-4 sm:min-w-6 sm:min-h-6 md:min-w-7 md:min-h-7 hidden md:block bg-slate-100 absolute top-[50%] -left-2 sm:-left-3 rotate-45"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0, rotate: 45 }}
                  transition={{ delay: 0.3 }}
                ></motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Enhanced Navigation Buttons - Repositioned for mobile */}
        <div className="absolute top-[65%] -left-2 sm:top-[50%] sm:-left-4 md:-left-6 transform -translate-y-1/2 z-10">
          <motion.button
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg bg-blue-500 text-white"
            onClick={prevSlide}
            initial="rest"
            whileHover="hover"
            whileTap="pressed"
            variants={buttonHoverAnimation}
          >
            <ChevronLeft size={window.innerWidth >= 640 ? 24 : 16} />
          </motion.button>
        </div>
        <div className="absolute top-[65%] -right-2 sm:top-[50%] sm:-right-4 md:-right-6 transform -translate-y-1/2 z-10">
          <motion.button
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg bg-blue-500 text-white"
            onClick={nextSlide}
            initial="rest"
            whileHover="hover"
            whileTap="pressed"
            variants={buttonHoverAnimation}
          >
            <ChevronRight size={window.innerWidth >= 640 ? 24 : 16} />
          </motion.button>
        </div>
      </motion.div>

      {/* Pagination Dots with Animation */}
      <div className="flex justify-center mt-4 sm:mt-6">
        {testimonials.map((_, index) => (
          <motion.div
            key={index}
            className="mx-1 sm:mx-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <motion.button
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                index === currentSlide ? "bg-customBlue" : "bg-gray-400"
              }`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 1 }}
              animate={
                index === currentSlide
                  ? {
                      scale: [1, 1.2, 1],
                      transition: { repeat: Infinity, repeatDelay: 2 },
                    }
                  : { scale: 1 }
              }
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
