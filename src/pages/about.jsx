import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import Lottie from 'react-lottie-player';
import { motion } from 'framer-motion';

// Assuming these imports are still valid
import vImage from '../assets/Aboutpage/Vision.json';
import mImage from '../assets/Aboutpage/Mision.json';
import Video1 from '../assets/Aboutpage/aic-pecf.mp4';
import Image from '../assets/Aboutpage/a.jpg';

const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  const handleThumbnailClick = () => {
    setIsPlaying(true);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section with Video - Fixed Height */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-5xl mx-auto my-8 overflow-hidden rounded-xl shadow-lg"
      >
        <div className="w-full aspect-video">
          <ReactPlayer
            ref={playerRef}
            url={Video1}
            playing={isPlaying}
            controls={true}
            width="100%"
            height="100%"
            light={Image}
            onClickPreview={handleThumbnailClick}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                  style: { objectFit: 'cover' },
                },
              },
            }}
            className="w-full h-full"
          />
        </div>
      </motion.div>

      {/* Introduction Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-4xl mx-auto px-6 py-8 bg-white rounded-2xl shadow-md mb-12"
      >
        <p className="text-gray-800 text-lg leading-relaxed">
          Atal Incubation Centre Pondicherry Engineering College Foundation (AIC-PECF) is fully supported and funded by the Atal Innovation Mission (AIM), Niti Aayog, and Government of India. AIC-PECF was initiated to provide a platform to assist and enable young entrepreneurs to initiate start-ups for the commercial exploitation of technologies developed by them. AIC-PECF also enables the budding entrepreneurs to showcase and test their abilities to run a start-up business in the areas of Electronics Design and Manufacturing (EDM), Internet of Things (IoT), and Unmanned Aerial Vehicle (UAV).
        </p>
      </motion.section>

      {/* Vision Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="max-w-5xl mx-auto px-4 mb-16"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
          <div className="md:w-1/2 flex justify-center">
            <Lottie
              loop
              animationData={vImage}
              play
              className="w-[280px] h-[280px]"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold text-indigo-900">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To provide world-class incubation support for Start-ups that promotes technological innovations to improve people's lives, generate employment, and drive the sustainable growth of the Indian economy.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        className="max-w-5xl mx-auto px-4 mb-16"
      >
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl shadow-sm">
          <div className="md:w-1/2 flex justify-center">
            <Lottie
              loop
              animationData={mImage}
              play
              className="w-[280px] h-[280px]"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold text-teal-900">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To facilitate and enable innovators to pursue their own ideas and convert them into successful ventures. To build a holistic partnership among stakeholders and create a sustainable start-up ecosystem. To promote and inculcate the habit of innovation among the student community and thereby foster future start-ups.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Activities Section Placeholder */}
      {/* <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-5xl mx-auto px-4 mb-16"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
          {/* Activity cards would go here */}
          {/* This is a placeholder for the Activities section mentioned in the original code */}
        {/* </div>
      </motion.div> */}

    </div>
  );
};

export default About;