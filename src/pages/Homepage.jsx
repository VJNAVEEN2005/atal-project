import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stats from "../components/Homepage/Stat";
import styled, { keyframes, css } from "styled-components";
import SocialMedia from "../components/Homepage/SocialMedia";
import Partner from "../components/Homepage/Partner";
import Landing from "../components/Homepage/Landing";
import AboutNew from "../components/Homepage/AboutNew";
import Focus from '../components/Homepage/Focus';
import EcoSystem from "../components/Homepage/Ecosystem";
import Testimonials from "../components/Homepage/Testimonials";
import Choose_Us from "../components/Homepage/Choose_Us";
import Infrastructure_services from "../components/Homepage/Infrastructure_services";
import ScrollToTop from '../components/ScrollToTop'
import Popup from './Popup';

// For demo, mock events here or import from a shared data file
const eventsData = [
  {
    title: 'Startup Pitch Day',
    date: '2024-07-25',
    location: 'AIC-PECF Auditorium',
    description: 'A day for startups to pitch their ideas to investors and mentors.'
  },
  {
    title: 'Innovation Bootcamp',
    date: '2024-07-28',
    location: 'Main Hall',
    description: 'A bootcamp for students and entrepreneurs to learn about innovation.'
  },
  {
    title: 'Tech Networking Night',
    date: '2024-08-02',
    location: 'Cafeteria',
    description: 'An evening to network with tech professionals and founders.'
  },
];

const Home = ({ showPopup, onClosePopup }) => {
  const navigate = useNavigate();

  return (
    <Container>
      {showPopup && (
        <Popup
          events={eventsData}
          onClose={onClosePopup}
          autoClose={true}
          closeAfter={6000}
          renderEventButton={(event) => (
            <button
              className="mt-2 px-4 py-1 bg-[#3f6197] text-white rounded-lg hover:bg-[#5478b0] transition-colors text-sm font-semibold"
              onClick={() => navigate(`/events?eventId=${event._id}&tab=Events`)}
            >
              View Event
            </button>
          )}
        />
      )}
      <ScrollToTop/>
      <Landing />
      <AboutNew /> 
      <Testimonials/>
      <Focus/>
      <Infrastructure_services/>
      <Choose_Us/>
      <Partner />
      {/* <EcoSystem/> */}
      <Stats />
      <SocialMedia />
    </Container>
  );
};

export default Home;

const blink = keyframes`
  0%{
    color: #333;
    opacity: 0.5;
  }
  50%{
    color: #EC8305;
    opacity: 0.75;
  }
  100%{
    color: #333;
    opacity: 1;
  }
`;

const highlight = keyframes`
  0%{
    color: #6F61C0;
    opacity: 1;
  }
  50%{
    color: #A084E8;
    opacity: 1;
  }
  100%{
    color: #8BE8E5;
    opacity: 1;
  }

`;

// Styled Components

const Container = styled.div`
  text-align: center;
  padding: 0px;

  width: 100%;
  overflow: hidden;
  @media (max-width: ) {
    width: 97%;
  }
`;

const AnimationsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
/* White background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
  flex-wrap: wrap; /* Allow wrapping on smaller screens */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack vertically on small screens */
    align-items: center;
  }
`;

const Heading = styled.h1`
  width: 100%;
  margin-bottom: 20px;
  font-size: 32px;
  color: #333;
  text-align: center;
  font-weight: bold;
  opacity: 1;
  /*animation: ${blink} 2s infinite ease-in-out;*/
`;

const Box = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #fffff; /* Light background for each box */
  border-radius: 10px;
  //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Box shadow for each item */
  width: 100%;
  max-width: 300px; /* Ensure box doesn’t stretch too wide */

  h1 {
    margin-bottom: 10px;
    font-size: 24px;
    color: #333;
    opacity: 1;
    /*animation: ${highlight} 3s infinite ease-in-out;*/
  }

  /* Lottie Animation Responsive */
  .lottie-player {
    width: 100%;
    max-width: 300px;
    height: auto;
  }

  /* For smaller screens */
  @media (max-width: 480px) {
    padding: 15px;
    h1 {
      font-size: 20px;
    }
  }
`;
