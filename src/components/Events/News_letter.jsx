import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { news1, news2, news3, news4, news5, news6 } from '../../assets/Events/News_Letter/data';

const NewsLetter = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTurning, setIsTurning] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const images = [news1, news2, news3, news4, news5, news6];
  
  const isMobile = windowWidth < 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive dimensions
  const getBookDimensions = () => {
    if (windowWidth < 640) return { width: 300, height: 420 };
    if (windowWidth < 768) return { width: 320, height: 448 };
    if (windowWidth < 1024) return { width: 360, height: 504 };
    return { width: 400, height: 560 };
  };

  const dimensions = getBookDimensions();

  const nextPage = () => {
    if (!isTurning) {
      setIsTurning(true);
      if (isMobile) {
        if (currentPage < images.length - 1) {
          setCurrentPage(currentPage + 1);
        }
      } else {
        if (currentPage < images.length - 2) {
          setCurrentPage(currentPage + 2);
        }
      }
      setTimeout(() => setIsTurning(false), 800);
    }
  };

  const prevPage = () => {
    if (!isTurning) {
      setIsTurning(true);
      if (isMobile) {
        if (currentPage > 0) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        if (currentPage > 0) {
          setCurrentPage(currentPage - 2);
        }
      }
      setTimeout(() => setIsTurning(false), 800);
    }
  };

  const pageVariants = {
    enter: (direction) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
      zIndex: 1,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      zIndex: 2,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 50,
      }
    },
    exit: (direction) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
      scale: 0.9,
      zIndex: 1,
    })
  };

  // Render book pages based on device type
  const renderPages = () => {
    if (isMobile) {
      // Single page for mobile
      return (
        <motion.div
          key={currentPage}
          className="bg-white shadow-2xl overflow-hidden rounded-lg"
          style={{
            width: dimensions.width,
            height: dimensions.height,
          }}
          variants={pageVariants}
          custom={currentPage}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {currentPage < images.length && (
            <img
              src={images[currentPage]}
              alt={`Page ${currentPage + 1}`}
              className="w-full h-full object-cover"
              style={{
                transform: isTurning ? 'scale(1.02)' : 'scale(1)',
                transition: 'transform 0.4s'
              }}
            />
          )}
        </motion.div>
      );
    }

    // Double page for desktop
    return [currentPage, currentPage + 1].map((pageIndex) => (
      <motion.div
        key={pageIndex}
        className="bg-white shadow-2xl overflow-hidden"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          borderRadius: pageIndex === currentPage ? '8px 0 0 8px' : '0 8px 8px 0',
          transformOrigin: pageIndex === currentPage ? 'right' : 'left',
        }}
        variants={pageVariants}
        custom={currentPage}
        initial="enter"
        animate="center"
        exit="exit"
      >
        {pageIndex < images.length && (
          <img
            src={images[pageIndex]}
            alt={`Page ${pageIndex + 1}`}
            className="w-full h-full object-cover"
            style={{
              transform: isTurning ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.4s'
            }}
          />
        )}
      </motion.div>
    ));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-6 md:py-12 px-4">
      {/* Header */}
      <motion.div 
        className="w-full max-w-4xl text-center mb-8 md:mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-2xl md:text-4xl font-bold mb-2"
          style={{ color: '#3f6197' }}
          whileHover={{ scale: 1.05 }}
        >
          NEWS LETTERS
        </motion.h2>
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4"
          whileHover={{ scale: 1.02 }}
        >
          Don't Miss Out
        </motion.h1>
        <motion.p 
          className="text-base md:text-xl text-gray-600 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Stay connected and informed with the latest happenings in the startup ecosystem
        </motion.p>
      </motion.div>

      {/* Book Cover */}
      {!isOpen && (
        <motion.div
          className="cursor-pointer transform-gpu"
          whileHover={{ scale: 1.05, rotateY: 15 }}
          onClick={() => setIsOpen(true)}
        >
          <div 
            className="bg-[#3f6197] rounded-lg shadow-2xl flex items-center justify-center"
            style={{ 
              width: isMobile ? dimensions.width : dimensions.width * 2,
              height: dimensions.height,
              perspective: "1000px"
            }}
          >
            <motion.div 
              className="text-white text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <BookOpen size={windowWidth < 768 ? 60 : 80} className="mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-2">AIC PECF Newsletter</h2>
              <p className="text-base md:text-lg">Click to Open</p>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Flipbook Container */}
      {isOpen && (
        <div className="relative flex justify-center items-center w-full">
          <motion.button 
            onClick={prevPage}
            disabled={currentPage === 0 || isTurning}
            className="absolute left-2 md:left-4 z-10 p-2 md:p-4 rounded-full bg-white shadow-lg hover:bg-gray-100 disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={windowWidth < 768 ? 20 : 24} />
          </motion.button>

          <motion.div 
            className="flex justify-center items-center transform-gpu"
            style={{ perspective: "2000px" }}
            whileHover={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait" custom={currentPage}>
              <motion.div 
                className="relative flex gap-2 md:gap-4"
                animate={{
                  rotateX: isHovered ? 10 : 0,
                  rotateY: isHovered ? -10 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                {isTurning && (
                  <motion.div
                    className="absolute inset-0 bg-black/5 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
                {renderPages()}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.button 
            onClick={nextPage}
            disabled={(isMobile ? currentPage >= images.length - 1 : currentPage >= images.length - 2) || isTurning}
            className="absolute right-2 md:right-4 z-10 p-2 md:p-4 rounded-full bg-white shadow-lg hover:bg-gray-100 disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={windowWidth < 768 ? 20 : 24} />
          </motion.button>
        </div>
      )}

      {/* Page Counter and Close Button */}
      <div className="flex flex-col items-center mt-4 md:mt-6 space-y-4">
        <motion.div 
          className="text-base md:text-lg font-medium"
          style={{ color: '#3f6197' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isMobile ? (
            `Page ${currentPage + 1} of ${images.length}`
          ) : (
            `Page ${currentPage + 1}-${Math.min(currentPage + 2, images.length)} of ${images.length}`
          )}
        </motion.div>

        {isOpen && (
          <motion.button
            className="px-4 md:px-6 py-2 bg-[#3f6197] text-white rounded-full shadow-lg text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(false)}
          >
            Close Book
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default NewsLetter;