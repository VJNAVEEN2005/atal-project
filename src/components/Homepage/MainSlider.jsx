import React, { useState, useEffect } from "react";
import { Tilt } from "react-tilt";

function MainSlider(props) {

    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically move to the next slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === props.images.length - 3 ? 0 : prev + 1));
        }, 5000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [currentIndex]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? props.images.length - 3 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === props.images.length - 3 ? 0 : prev + 1));
    };
    return (
        <>
            <div className="relative  overflow-hidden mx-auto mt-10 mb-2 rounded-lg">
                {/* Carousel Content */}
                <div
                    className="flex transition-transform duration-700 ease-in-out h-80"
                    style={{ transform: `translateX(-${(currentIndex * 3 * 100 / 3)}%)`, width: `${100 / 3}%` }}
                >
                    {props.images.map((image, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-2">
                            <img
                                src={image}
                                alt={`Slide ${index + 1}`}

                                className={` h-72 md:h-full w-full object-cover rounded-xl`}
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
                    {props.images.slice(0,props.images.length-2).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400"
                                }`}
                        ></button>
                        
                    ))}
                </div>
            </div>
        </>
    );
}

export default MainSlider;
