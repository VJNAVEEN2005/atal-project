import React, {useState,useEffect} from "react";


function Image_Carousel(props) {
  
    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically move to the next slide
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev === props.images.length - 1 ? 0 : prev + 1));
      }, 3000); // Change slide every 3 seconds
  
      return () => clearInterval(interval); // Cleanup on unmount
    }, []);
  
    const prevSlide = () => {
      setCurrentIndex((prev) => (prev === 0 ? props.images.length - 1 : prev - 1));
    };
  
    const nextSlide = () => {
      setCurrentIndex((prev) => (prev === props.images.length - 1 ? 0 : prev + 1));
    };
  return (
    <>
       <div className="relative w-full max-w-4xl mx-auto mt-2 mb-2 overflow-hidden rounded-lg shadow-lg">
      {/* Carousel Content */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {props.images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 md:h-96 object-contain"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white shadow-md"
        onClick={prevSlide}
      >
        <svg
          className="w-6 h-6 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white shadow-md"
        onClick={nextSlide}
      >
        <svg
          className="w-6 h-6 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {props.images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
    </>
  );
}

export default Image_Carousel;
