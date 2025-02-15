import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Slider from 'react-slick';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEye } from '@fortawesome/free-solid-svg-icons';

import Image from '../assets/Aboutpage/a.jpg';

import Lottie from 'react-lottie-player';
import vImage from '../assets/Aboutpage/Vision.json';
import mImage from '../assets/Aboutpage/Mision.json';

import slide1 from '../assets/Aboutpage/s1.jpg';
import slide2 from '../assets/Aboutpage/s2.jpg';
import slide3 from '../assets/Aboutpage/s3.jpg';
import slide4 from '../assets/Aboutpage/s4.jpg';
import slide5 from '../assets/Aboutpage/s5.jpg';
import slide6 from '../assets/Aboutpage/s6.jpg';
import slide7 from '../assets/Aboutpage/s7.jpg';
import Video1 from '../assets/Aboutpage/aic-pecf.mp4';

const About = () => {

  const bodyContentRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
      const handleScroll = () => {
          const bodyContent = bodyContentRef.current;
          const rect = bodyContent.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          if (rect.top < windowHeight) {
              const opacity = Math.min(1, 0.4 + ((windowHeight - rect.top) / windowHeight) * 0.6);
              bodyContent.style.opacity = opacity;
          }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      appendDots: dots => <CustomDots>{dots}</CustomDots>
  };

  const handleMouseEnter = () => {
      if (videoRef.current) {
          videoRef.current.play();
      }
  };

  const handleMouseLeave = () => {
      if (videoRef.current) {
          videoRef.current.pause();
      }
  };

  return (
      <AboutPage>
          <Head>
              <ImageWrapper>
                  <HeadImage src={Image} alt="About AIC-PECF" />
                  <Overlay />
                  <TextOverlay>About AIC-PECF</TextOverlay>
              </ImageWrapper>
          </Head>
            <p class="max-w-5xl  font-serif mx-auto text-lg">
                Atal Incubation Centre Pondicherry Engineering College Foundation (AIC-PECF) is fully supported and funded by the Atal Innovation Mission (AIM), Niti Aayog, and Government of India. AIC-PECF was initiated to provide a platform to assist and enable young entrepreneurs to initiate start-ups for the commercial exploitation of technologies developed by them. AIC-PECF also enables the budding entrepreneurs to showcase and test their abilities to run a start-up business in the areas of Electronics Design and Manufacturing (EDM), Internet of Things (IoT), and Unmanned Aerial Vehicle (UAV).
            </p>

          <VisionMission>
              <VisionMissionContent>
                  <Lottie
                        loop
                        animationData={vImage}
                        play
                        style={{ width: '80%', height: '250px' }}
                  />
              </VisionMissionContent>
              <VisionMissionContent>
              <p class="text-2xl font-bold mt-10 ">Our Vision</p>
                  <p class=" text-lg">
                      To provide world-class incubation support for Start-ups that promotes technological innovations to improve people's lives, generate employment, and drive the sustainable growth of the Indian economy.
                  </p>  
              </VisionMissionContent>
          </VisionMission>
          <VisionMission>
              <VisionMissionContent>
                <p class="text-2xl font-bold ">Our Mission</p>
                  <p class=" text-lg">
                      To facilitate and enable innovators to pursue their own ideas and convert them into successful ventures. To build a holistic partnership among stakeholders and create a sustainable start-up ecosystem. To promote and inculcate the habit of innovation among the student community and thereby foster future start-ups.
                  </p>
              </VisionMissionContent>
              <VisionMissionContent><Lottie
                        loop
                        animationData={mImage}
                        play
                        style={{ width: '80%', height: '250px' }}
                  />
              </VisionMissionContent>
          </VisionMission>
          <Activities>
              {/* <ActivitiesContent>
              <p class="text-2xl font-bold text-center">Activities of PECF</p>
                  <p class=" text-lg mt-1">
                      Entrepreneurship and innovation are critical for the growth of any economy, in an increasingly competitive world. They become even more critical for India as its demographic dividend can only be realized with rapid creation of employment and income generation opportunities. Global experience shows that, apart from creating wealth and boosting the economy, new businesses also create disproportionately more jobs than established ones. AIC-PECF actively creates an environment for the young innovators to test their business ideas with minimal risks.
                  </p>
              </ActivitiesContent> */}
              {/* <CarouselSection>
                  <Slider {...settings}>
                      <Slide>
                          <img src={slide1} alt="Slide 1" />
                      </Slide>
                      <Slide>
                          <img src={slide2} alt="Slide 2" />
                      </Slide>
                      <Slide>
                          <img src={slide3} alt="Slide 3" />
                      </Slide>
                      <Slide>
                          <img src={slide4} alt="Slide 4" />
                      </Slide>
                      <Slide>
                          <img src={slide5} alt="Slide 5" />
                      </Slide>
                      <Slide>
                          <img src={slide6} alt="Slide 6" />
                      </Slide>
                      <Slide>
                          <img src={slide7} alt="Slide 7" />
                      </Slide>
                  </Slider>
              </CarouselSection> */}
          </Activities>
          <p class="text-2xl font-bold text-center">Infrastructure</p>
          <Infrastructure onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <StyledVideo ref={videoRef} muted={false}>
                  <source src={Video1} type="video/mp4" />
                  Your browser does not support the video.
              </StyledVideo>
          </Infrastructure>
      </AboutPage>
  );
  };
  
  const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const zoomIn = keyframes`
    0% {
        transform: scale(0.5);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
`;

const AboutPage = styled.div`
    width: 100%;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    align-items: center;
`;

const Head = styled.div`
    padding: 30px;
    font-size: 45px;
    color: #333;
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    border-radius: 10px;

    @media (max-width: 768px) {
        max-width: 100%;
        border-radius: 0;
    }
`;

const HeadImage = styled.img`
    width: 100%;
    height: auto;
    max-height: 450px;
    border-radius: 10px;

    @media (max-width: 768px) {
        max-height: 300px;
        border-radius: 0;
    }
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
    border-radius: 10px;

    @media (max-width: 768px) {
        border-radius: 0;
    }
`;

const TextOverlay = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    z-index: 1;
    animation: ${fadeIn} 2s ease-in;
`;

/*const Body = styled.div`
    margin-top: 50px;
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding: 10px;
    color: #333;
    font-size: 25px;

    @media (max-width: 768px) {
        padding: 5px;
        font-size: 15px;
    }
`;*/

/*const BodyContent = styled.div`
    max-width: 768px;
    color: black;
    border-radius: 15px;
    opacity: 0;
    transition: opacity 0.5s ease-in;

    @media (max-width: 768px) {
        padding: 15px;
        border-radius: 5px;
    }
`;*/

const VisionMission = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding: 10px;
    font-size: 22px;
    color: #333;

    @media (max-width: 768px) {
        flex-direction: row;
        font-size: 12px;
    }
`;

const VisionMissionContent = styled.div`
    flex: 1;
    color: black;
    padding: 20px;
    border-radius: 20px;
    animation: ${zoomIn} 8s ease-out;
    margin: 0 10px;

    @media (max-width: 768px) {
        margin: 10px 0;
        padding: 10px;
        border-radius: 10px;
    }
`;

const VisionMissionImage = styled.img`
    width: 70%;
    height: 250px;
    max-height: 700px;

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
    }
`;

const Activities = styled.div`
    margin-top: 50px;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding: 10px;
    color: #333;

    @media (max-width: 768px) {
        padding: 5px;
    }
`;

const ActivitiesContent = styled.div`
    flex: 1;
    color: black;
    padding: 20px;
    border-radius: 20px;
    animation: ${zoomIn} 10s ease-out;
    margin: 0 10px;
    font-size: 22px;

    @media (max-width: 768px) {
        padding: 10px;
        border-radius: 10px;
        font-size: 15px;
    }
`;

const CarouselSection = styled.section`
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
    .slick-slide img {
        width: 100%;
        height: 80vh;

        @media (max-width: 768px) {
            height: 40vh;
        }
    }
`;

const Slide = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;

    @media (max-width: 768px) {
        height: 40vh;
    }
`;

const CustomDots = styled.ul`
    bottom: 0px !important;
`;

const Infrastructure = styled.div`
    margin-top: 5px;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding: 10px;
    color: #333;
    font-size: 25px;

    @media (max-width: 768px) {
        padding: 5px;
        font-size: 15px;
    }
`;

const StyledVideo = styled.video`
    height:500px;
    width: 1024px;

    @media (max-width: 768px) {
        width: 320px;
        height: 300px;
    }
`;


  export default About;
  