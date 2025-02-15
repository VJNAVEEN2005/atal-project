import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import AboutImage from '../../assets/Homepage/about.png';

// Keyframe animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
  }
`;

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const heroOffset = heroRef.current ? heroRef.current.offsetTop : 0;

      if (scrollPosition >= heroOffset && !isVisible) {
        setIsVisible(true);
      } else if (scrollPosition < heroOffset && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  return (
    <HeroSection ref={heroRef} $isVisible={isVisible}>
      <HeroContent>
        <HeroImage src={AboutImage} alt="NIC" />
        <HeroText>
          <h1>About Us</h1>
          <p>
            Atal Incubation Centre - Pondicherry Engineering College Foundation (AIC-PECF) is fully supported and funded by Atal Innovation Mission (AIM), Niti Aayog, Government of India. AIC-PECF was initiated to provide a platform to assist and enable young entrepreneurs to initiate startups for the commercial exploitation of technologies developed by them.
          </p>
          <HeroButton to="/about" $isVisible={isVisible}>Learn More</HeroButton>
        </HeroText>
      </HeroContent>
    </HeroSection>
  );
};

// Styled Components

/*const HeroSection = styled.section`
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #12283c;
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  transform: ${({ $isVisible }) => ($isVisible ? 'scale(1)' : 'scale(0.5)')};
  transition: opacity 1s ease, transform 1s ease;
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  padding: 20px;
  gap: 50px;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
`;

const HeroImage = styled.img`
  width: 470px;
  height: auto;
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const HeroButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  font-weight: bold;
  color: #fff;
  background-color: #12283c;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  animation: ${({ $isVisible }) =>
    $isVisible ? css`${fadeIn} 1s ease forwards, ${scaleUp} 1s ease forwards` : 'none'};
  animation-delay: 1.5s;

  &:hover {
    background: orange;
  }
`;

const HeroText = styled.div`
  flex: 1;

  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    opacity: 0;
    animation: ${fadeIn} 1s ease forwards;
    animation-delay: 1s;
  }

  p {
    font-size: 1.2em;
    line-height: 1.5;
    opacity: 0;
    animation: ${fadeIn} 1s ease forwards;
    animation-delay: 1.5s;
  }
`;*/
const HeroSection = styled.section`
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #12283c;
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  transform: ${({ $isVisible }) => ($isVisible ? 'scale(1)' : 'scale(0.5)')};
  transition: opacity 1s ease, transform 1s ease;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack content vertically */
    padding: 20px;
  }
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  padding: 20px;
  gap: 50px;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack text and image */
    gap: 20px;
  }
`;

const HeroImage = styled.img`
  width: 470px;
  height: auto;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 100%; /* Full width for mobile */
    max-width: 300px; /* Set a maximum size to maintain proportions */
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const HeroText = styled.div`
  flex: 1;

  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    opacity: 0;
    animation: ${fadeIn} 1s ease forwards;
    animation-delay: 1s;

    @media (max-width: 768px) {
      font-size: 1.8em; /* Smaller font size for mobile */
    }
  }

  p {
    font-size: 1.2em;
    line-height: 1.5;
    opacity: 0;
    animation: ${fadeIn} 1s ease forwards;
    animation-delay: 1.5s;

    @media (max-width: 768px) {
      font-size: 1em; /* Adjust text size for readability on smaller screens */
      line-height: 1.4;
    }
  }
`;

const HeroButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  font-weight: bold;
  color: #fff;
  background-color: #12283c;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  animation: ${({ $isVisible }) =>
    $isVisible ? css`${fadeIn} 1s ease forwards, ${scaleUp} 1s ease forwards` : 'none'};
  animation-delay: 1.5s;

  &:hover {
    background: orange;
  }

  @media (max-width: 768px) {
    padding: 10px 15px; /* Slightly smaller button */
    font-size: 0.9em;
  }
`;

