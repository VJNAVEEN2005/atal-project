import React, { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Carousel } from "@mantine/carousel";
import Autoplay from 'embla-carousel-autoplay';

function MainSlider({ images }) {
  const [loading, setLoading] = useState(true);

  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }) // auto-scroll every 3s
  );

  useEffect(() => {
    if (images.length > 0) {
      setLoading(false);
    }
  }, [images]);

  return (
    <div className="relative overflow-hidden mx-auto mt-10 mb-2 rounded-lg">
      <Carousel
        withIndicators
        height={230}
        slideSize="33.333333%"
        slideGap="md"
        align="start"
        slidesToScroll={1}
        loop
        dragFree
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.reset}
        onMouseLeave={autoplay.current.reset}
      >
        {images.map((image, index) => (
          <Carousel.Slide key={index}>
            {loading ? (
              <Skeleton className="h-56 w-full bg-gray-300 animate-pulse rounded-xl" />
            ) : (
              <img
                src={image.imageUrl}
                alt={`Image ${index + 1}`}
                onLoad={() => {
                  setLoading(false);
                }}
                className="h-56 w-full object-cover rounded-xl"
              />
            )}
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

export default MainSlider;
