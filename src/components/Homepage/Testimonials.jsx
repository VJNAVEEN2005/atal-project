import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Rajkumar_COO, Sundhara_Moorthy_Director, Vishnu_CEO } from '../../assets/Team/coreTeam/images/coreTeamImage';

const Testimonials = () => {
  const testimonials = [
    {
      role: 'CEO',
      name: 'Mr. Vishnu Vardhan',
      occupation: 'Chief Executive Officer',
      company: 'Atal Incubation Centre, PEC Foundation',
      message:
        'AIC-PECF has been instrumental in our startup journey. The support we have received, including expert mentorship, crucial resources, and valuable networking opportunities, has been vital for our product development. Their dedication continues to play a key role as we advance in our development process.',
      photo: Vishnu_CEO,
    },
    {
      role: 'COO',
      name: 'Mr. S Rajakumar',
      occupation: 'Chief Operating Officer',
      company: 'Atal Incubation Centre, PEC Foundation',
      message:
        "The strategic guidance from AIC-PECF helped us navigate critical challenges in our business. The team's hands-on approach ensured we had access to essential resources and connections that accelerated our growth.",
      photo: Rajkumar_COO,
    },
    {
      role: 'Director',
      name: 'Dr. R Sundaramurthy',
      occupation: 'Executive Director',
      company: 'Atal Incubation Centre, PEC Foundation',
      message:
        'AIC-PECF provided us with a nurturing environment to innovate and grow. Their mentorship and resources have been invaluable in helping us reach new milestones in our journey.',
      photo: Sundhara_Moorthy_Director,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [transition, setTransition] = useState("slide"); // "slide", "fade", "zoom", "flip"

  // Auto-rotate transitions for variety
  useEffect(() => {
    const transitionTypes = ["slide", "fade", "zoom", "flip"];
    let transitionIndex = 0;
    
    const transitionInterval = setInterval(() => {
      transitionIndex = (transitionIndex + 1) % transitionTypes.length;
      setTransition(transitionTypes[transitionIndex]);
    }, 15000); // Change transition type every 15 seconds
    
    return () => clearInterval(transitionInterval);
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Different transition variants
  const getVariants = () => {
    switch (transition) {
      case "fade":
        return {
          enter: { opacity: 0 },
          center: { opacity: 1 },
          exit: { opacity: 0 }
        };
      case "zoom":
        return {
          enter: { scale: 0.7, opacity: 0 },
          center: { scale: 1, opacity: 1 },
          exit: { scale: 1.3, opacity: 0 }
        };
      case "flip":
        return {
          enter: { rotateY: 90, opacity: 0 },
          center: { rotateY: 0, opacity: 1 },
          exit: { rotateY: -90, opacity: 0 }
        };
      default: // "slide"
        return {
          enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
          }),
          center: {
            x: 0,
            opacity: 1
          },
          exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0
          })
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
        stiffness: 100
      } 
    },
    exit: { 
      scale: 0.8, 
      opacity: 0, 
      rotateY: -30,
      transition: { duration: 0.5 }
    }
  };

  // Button hover animation
  const buttonHoverAnimation = {
    rest: { 
      scale: 1,
      backgroundColor: "#3f6197", // tailwind blue-500
      boxShadow: "0px 0px 0px rgba(0,0,0,0.2)"
    },
    hover: { 
      scale: 1.1,
      backgroundColor: "#17396f", // tailwind blue-600
      boxShadow: "0px 5px 10px rgba(0,0,0,0.2)"
    },
    pressed: { 
      scale: 0.95,
      backgroundColor: "#496ba1" // tailwind blue-700
    }
  };

  return (
    <motion.div 
      className="w-[85%] mx-auto mb-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="max-w-fit ml-[-30px] mt-10"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.h2 
          className="text-2xl font-semibold ml-2 md:ml"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          HEAR FROM OUR TEAM
        </motion.h2>
        <motion.div
          id="border-bottom"
          className="mt-2 w-52 mx-auto h-[6px] rounded-full bg-customBlue"
          initial={{ width: 0 }}
          animate={{ width: 208 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        ></motion.div>
      </motion.div>

      <motion.div 
        className="relative mt-10 shadow-lg rounded-md p-4 md:p-10  bg-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Photo Section with Animation */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={`image-${currentSlide}`}
              className="rounded-full overflow-hidden bg-customBlue w-40 h-40 md:w-80 md:h-80 flex items-center justify-center"
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
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              custom={1}
              variants={getVariants()}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ 
                duration: 0.6, 
                type: transition === "flip" ? "spring" : "tween",
                stiffness: transition === "flip" ? 200 : null
              }}
              className="flex-col flex justify-between bg-slate-100 p-10 rounded-md w-full md:w-[50vw] relative"
              style={{ perspective: 1000 }}
            >
              <motion.p 
                className="md:text-xl text-base text-justify"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {testimonials[currentSlide].message}
              </motion.p>
              <motion.div 
                className="gap-5 text-center font-medium text-sm md:text-lg mt-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.h4 
                  className="text-lg font-bold text-customBlue"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {testimonials[currentSlide].name}
                </motion.h4>
                <motion.div 
                  className="flex gap-2 justify-center text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h4 className="text-sm">{testimonials[currentSlide].occupation + `,`}</h4>
                  <h4 className="text-sm">{testimonials[currentSlide].company}</h4>
                </motion.div>
              </motion.div>
              {/* Decorative Arrow with Animation */}
              <motion.div 
                className="min-w-7 min-h-7 hidden md:block bg-slate-100 absolute top-[50%] -left-3 rotate-45"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0, rotate:45 }}
                transition={{ delay: 0.3 }}
              ></motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Navigation Buttons */}
        <div className="absolute top-[220px] -left-4 md:top-1/2 md:-left-6 transform -translate-y-1/2 p-4">
          <motion.button
            className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-blue-500 text-white"
            onClick={prevSlide}
            initial="rest"
            whileHover="hover"
            whileTap="pressed"
            variants={buttonHoverAnimation}
          >
            <ChevronLeft size={24} />
          </motion.button>
        </div>
        <div className="absolute top-[220px] -right-4 md:top-1/2 md:-right-6 transform -translate-y-1/2 p-4">
          <motion.button
            className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-blue-500 text-white"
            onClick={nextSlide}
            initial="rest"
            whileHover="hover"
            whileTap="pressed"
            variants={buttonHoverAnimation}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </motion.div>

      {/* Pagination Dots with Animation */}
      <div className="flex justify-center mt-6">
        {testimonials.map((_, index) => (
          <motion.div
            key={index}
            className="mx-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <motion.button
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-customBlue' : 'bg-gray-400'
              }`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 1 }}
              animate={index === currentSlide ? 
                { scale: [1, 1.2, 1], transition: { repeat: Infinity, repeatDelay: 2 } } : 
                { scale: 1 }
              }
            />
          </motion.div>
        ))}
      </div>

      {/* Transition Type Indicator (optional, for debugging) */}
      {/* <motion.div 
        className="text-xs text-center text-gray-400 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
      >
        Current transition: {transition}
      </motion.div> */}
    </motion.div>
  );
};

export default Testimonials;