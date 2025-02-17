import React, { useRef, useState } from 'react';
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

import ReactPlayer from 'react-player';

const About = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const playerRef = useRef(null);

    const togglePlay = () => {
        setIsPlaying(true);
    };

    const handleProgress = (state) => {
        // Handle progress if needed
    };

    const handleThumbnailClick = () => {
        setIsPlaying(true);
    };

    return (
        <AboutPage>
            <VideoContainer
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
            >
                <ReactPlayer
                    ref={playerRef}
                    url={Video1}
                    playing={isPlaying}
                    controls={true}
                    width="100%"
                    height="100%"
                    light={Image}
                    onProgress={handleProgress}
                    onClickPreview={handleThumbnailClick}
                    config={{
                        file: {
                            attributes: {
                                controlsList: 'nodownload',
                                style: {objectFit: 'cover'},
                            },
                        },
                    }}
                />
               
            </VideoContainer>

            <Section>
                <p>
                    Atal Incubation Centre Pondicherry Engineering College Foundation (AIC-PECF) is fully supported and funded by the Atal Innovation Mission (AIM), Niti Aayog, and Government of India. AIC-PECF was initiated to provide a platform to assist and enable young entrepreneurs to initiate start-ups for the commercial exploitation of technologies developed by them. AIC-PECF also enables the budding entrepreneurs to showcase and test their abilities to run a start-up business in the areas of Electronics Design and Manufacturing (EDM), Internet of Things (IoT), and Unmanned Aerial Vehicle (UAV).
                </p>
            </Section>

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
                    <p className="text-2xl font-bold mt-10">Our Vision</p>
                    <p className="text-lg">
                        To provide world-class incubation support for Start-ups that promotes technological innovations to improve people's lives, generate employment, and drive the sustainable growth of the Indian economy.
                    </p>
                </VisionMissionContent>
            </VisionMission>
            <VisionMission>
                <VisionMissionContent>
                    <p className="text-2xl font-bold">Our Mission</p>
                    <p className="text-lg">
                        To facilitate and enable innovators to pursue their own ideas and convert them into successful ventures. To build a holistic partnership among stakeholders and create a sustainable start-up ecosystem. To promote and inculcate the habit of innovation among the student community and thereby foster future start-ups.
                    </p>
                </VisionMissionContent>
                <VisionMissionContent>
                    <Lottie
                        loop
                        animationData={mImage}
                        play
                        style={{ width: '80%', height: '250px' }}
                    />
                </VisionMissionContent>
            </VisionMission>
            <Activities>
                {/* Activities content */}
            </Activities>
        </AboutPage>
    );
};

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
    height: auto;
    overflow-x: hidden;
    align-items: center;
    text-align: center;
`;

const VideoContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 900px;
    aspect-ratio: 16/9;
    margin: auto;
    height: auto;
    text-align: center;
    border-radius: 10px;
    overflow: hidden;
`;


const Section = styled.section`
    max-width: 1000px;
    margin: auto;
    padding: 24px;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.12);
    text-align: center;
    margin-top: 24px;
    margin-bottom: 24px;
    color: #333;
    transition: all 0.3s ease-in-out;

    p {
        font-size: 15px;
        font-weight: 500; /* Bold text */
        margin: 0;
        line-height: 1.6;
    }

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
        padding: 18px;
        margin: 12px;
        border-radius: 12px;

        p {
            font-size: 16px;
            font-weight: 600; /* Slightly less bold for mobile */
        }
    }
`;


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
        flex-direction: column;
        font-size: 12px;
    }
`;

const VisionMissionContent = styled.div`
    flex: 1;
    color: black;
    padding: 20px;
    border-radius: 20px;
    animation: ${zoomIn} 8s ease-out; // Use the zoomIn animation
    margin: 0 10px;

    @media (max-width: 768px) {
        margin: 10px 0;
        padding: 10px;
        border-radius: 10px;
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

export default About;