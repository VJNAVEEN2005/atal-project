import React, { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import { Home1, Home2, Home3 } from "../../assets/Homepage/images";
import Image_Carousel from "./Image_Carousel";
import WhoAmI from "./WhoAmI";
import MainSlider from "./MainSlider";
import {
  home1,
  home2,
  home3,
  home4,
  home5,
  home6,
  home7,
  home8,
  home9,
  home10,
  home11,
  home12,
} from "../../assets/Homepage/image_carousel/image_carousel";
import { co_working_space2 } from "../../assets/Infrastucture_Services/images/infrastucture_services";
import axios from "axios";
import api from "../../Api/api";
import { fetchImageCarousel } from "../../Redux/slice/imageCarouselSlice";
import { useDispatch, useSelector } from "react-redux";

const Landing = ({ onCarouselLoaded, onLoadingProgress }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.imageCarousel);
  const [hasCalledOnLoaded, setHasCalledOnLoaded] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);
  const image = [
    { imageUrl: co_working_space2 },
    { imageUrl: home2 },
    { imageUrl: home3 },
    { imageUrl: home4 },
    { imageUrl: home5 },
    { imageUrl: home6 },
    { imageUrl: home7 },
    { imageUrl: home8 },
    { imageUrl: home10 },
    { imageUrl: home11 },
    { imageUrl: home12 },
  ];
  const [images, setImages] = useState([]);
    useEffect(() => {
    console.log("Landing: Component mounted, dispatching fetchImageCarousel");
    
    // Start with 10% progress to show something is happening
    if (onLoadingProgress) {
      console.log("Landing: Setting initial progress to 10%");
      onLoadingProgress(10);
    } else {
      console.log("Landing: onLoadingProgress callback is not available");
    }
    
    dispatch(fetchImageCarousel());
    
    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (onCarouselLoaded && !hasCalledOnLoaded) {
        console.log("Landing: Fallback timeout - calling onCarouselLoaded");
        setHasCalledOnLoaded(true);
        onCarouselLoaded();
      }
    }, 8000); // 8 second timeout
    
    return () => clearTimeout(timeout);
  }, [dispatch, onCarouselLoaded, hasCalledOnLoaded, onLoadingProgress]);

  useEffect(() => {
    console.log("Landing: Redux state changed", { 
      loading: state.loading, 
      hasImages: !!state.images, 
      imageCount: state.images?.images?.length || 0,
      hasCalledOnLoaded 
    });
    
    if (state.images) {
      const imageList = state.images.images;
      setImages(imageList);
      setTotalImages(imageList.length);
      // Update progress to 30% when images are fetched
      if (onLoadingProgress) {
        console.log("Landing: API images fetched, setting progress to 30%");
        onLoadingProgress(30);
      }
    } else if (!state.loading && images.length === 0) {
      // If API failed and we have no images, use fallback
      console.log("Landing: Using fallback images");
      setImages(image);
      setTotalImages(image.length);
      // Update progress to 30% when fallback images are set
      if (onLoadingProgress) {
        console.log("Landing: Fallback images set, setting progress to 30%");
        onLoadingProgress(30);
      }
    }
  }, [state.images, state.loading, images.length, image, onLoadingProgress]);

  // Track loading progress
  useEffect(() => {
    if (totalImages > 0 && onLoadingProgress) {
      // Calculate progress from 30% to 90% based on image loading
      const imageProgress = Math.round((loadedImages / totalImages) * 60); // 60% of remaining progress
      const totalProgress = 30 + imageProgress; // Start from 30%
      console.log("Landing: Progress update", loadedImages, "/", totalImages, "=", totalProgress + "%");
      onLoadingProgress(totalProgress);
    }
  }, [loadedImages, totalImages, onLoadingProgress]);

  // Debug: Log when component renders
  console.log("Landing: Component rendered with", {
    totalImages,
    loadedImages,
    hasOnLoadingProgress: !!onLoadingProgress,
    hasOnCarouselLoaded: !!onCarouselLoaded
  });

  return (
    <div className="py-6 sm:py-8 md:py-0 px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Decorative circles - visible only on larger screens with better positioning */}
      <div className="hidden md:block absolute border-4 border-gray-300 rounded-full min-h-screen w-[850px] lg:w-[1000px] -left-[650px] lg:-left-[700px] top-0 -z-10 opacity-50"></div>
      <div className="hidden md:block absolute border-4 border-gray-300 rounded-full min-h-screen w-[850px] lg:w-[1000px] -right-[650px] lg:-right-[700px] top-0 -z-10 opacity-50"></div>

      {/* Title Section - Responsive text sizing */}
      <div className="mt-4 sm:mt-6 md:mt-8 text-gray-700 flex flex-col items-center">
        <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl text-center title">
          Atal Incubation Centre - PEC Foundation
        </h1>
        <h4 className="mt-2 md:mt-3 text-xl sm:text-2xl text-center font-semibold title">
          Puducherry Technological University
        </h4>
        <h4 className="mt-2 md:mt-3 text-base sm:text-lg text-center text-blue-800 max-w-3xl mx-auto title">
          Supported by Atal Innovation Mission (AIM), NITI Aayog, Govt. of India
        </h4>
      </div>

      {/* Mobile Carousel with improved spacing */}
      <div className="mt-6 sm:mt-8 md:mt-10 md:hidden">
        {images.length > 0 ? (
          <Image_Carousel
            images={images}
            onLoaded={() => {
              console.log("Landing: Carousel onLoaded called");
              if (onLoadingProgress) {
                onLoadingProgress(100);
              }
              if (onCarouselLoaded && !hasCalledOnLoaded) {
                setHasCalledOnLoaded(true);
                onCarouselLoaded();
              }
            }}
            onImageLoaded={(loadedCount) => {
              console.log("Landing: Mobile carousel image loaded", loadedCount);
              setLoadedImages(loadedCount);
            }}
          />
        ) : (
          <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
            <p className="text-gray-500">Loading carousel...</p>
          </div>
        )}
      </div>

      {/* Desktop Slider with responsive padding */}
      <div className="hidden md:block mt-10 px-2 sm:px-4 md:px-6 lg:px-8">
        {images.length > 0 ? (
          <MainSlider 
            images={images} 
            onLoaded={() => {
              console.log("Landing: MainSlider onLoaded called");
              if (onLoadingProgress) {
                onLoadingProgress(100);
              }
              if (onCarouselLoaded && !hasCalledOnLoaded) {
                setHasCalledOnLoaded(true);
                onCarouselLoaded();
              }
            }}
            onImageLoaded={(loadedCount) => {
              console.log("Landing: Desktop slider image loaded", loadedCount);
              setLoadedImages(loadedCount);
            }}
          />
        ) : (
          <div className="flex justify-center items-center h-96 bg-gray-100 rounded-lg">
            <p className="text-gray-500">Loading carousel...</p>
          </div>
        )}
      </div>

      {/* Uncomment if you want to include WhoAmI component */}
      {/* <WhoAmI /> */}
    </div>
  );
};

export default Landing;
