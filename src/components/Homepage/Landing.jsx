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

const Landing = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.imageCarousel);
  const image = [
    co_working_space2,
    home2,
    home3,
    home4,
    home5,
    home6,
    home7,
    home8,
    home10,
    home11,
    home12,
  ];
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (!state.images) {
      dispatch(fetchImageCarousel());
      console.log("Fetching Image Carousel Data...");
    }
  }, []);

  useEffect(() => {
    if (state.images) {
      const imageList = state.images.images;
      setImages(imageList);
    }
  }, [state.images]);

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
        <Image_Carousel images={images} />
      </div>

      {/* Desktop Slider with responsive padding */}
      <div className="hidden md:block mt-10 px-2 sm:px-4 md:px-6 lg:px-8">
        <MainSlider images={images} />
      </div>

      {/* Uncomment if you want to include WhoAmI component */}
      {/* <WhoAmI /> */}
    </div>
  );
};

export default Landing;
