import React from "react";
import styled from "styled-components";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Contact } from 'lucide-react';
import GetInTouch from "../components/Contact/GetInTouch";

const ContactUs = () => {
  return (
    <ContactContainer>
      <SocialIconsContainer className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 bg-white p-3 shadow-lg rounded-l-lg z-50">
        <a
          href="https://www.instagram.com/aic_pecf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg md:text-2xl hover:scale-110 transition-transform text-[#E1306C]"
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com/aicpecftweet"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg md:text-2xl hover:scale-110 transition-transform text-black"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://www.linkedin.com/company/aicpecf/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg md:text-2xl hover:scale-110 transition-transform text-[#0077B5]"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://youtube.com/@atalincubationcentre-pecfo946"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg md:text-2xl hover:scale-110 transition-transform text-[#FF0000]"
        >
          <FaYoutube />
        </a>
        <a
          href="https://whatsapp.com/channel/0029Vas9egE9MF8vKLwXxn0s"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg md:text-2xl hover:scale-110 transition-transform text-[#29871c]"
        >
          <FaWhatsapp />
        </a>
      </SocialIconsContainer>

      <GrievanceSection>
        <h2 className="text-2xl font-bold mb-6">Point Of Contact</h2>
        <GrievanceCard>
          <GrievanceIconWrapper>
            <Contact size={32} color="#3f6197" />
          </GrievanceIconWrapper>
          <GrievanceContent>
            <GrievanceName>Mr. V Vishnu Varadan</GrievanceName>
            <GrievanceDesignation>Chief Executive Officer, AIC-PECF</GrievanceDesignation>
            <GrievanceEmail href="mailto:ceo@startuptn.in">ceo@aicpecf.org</GrievanceEmail>
          </GrievanceContent>
        </GrievanceCard>
      </GrievanceSection>

      <Title>Contact Us</Title>
      <TileContainer>
        <Tile>
          <FaPhoneAlt size={40} />
          <TileContent>
            <h3>Phone</h3>
            <p>Mr. V Vishnu Varadan</p>
            <p>+91-8903467223</p>
          </TileContent>
        </Tile>
        <Tile>
          <FaMapMarkerAlt size={40} />
          <TileContent>
            <h3>Location</h3>
            <p>Puducherry Technological University, Puducherry, India</p>
          </TileContent>
        </Tile>
        <Tile>
          <FaEnvelope size={40} />
          <TileContent>
            <h3>Support</h3>
            <p>Email: ceo@aicpecf.org</p>
          </TileContent>
        </Tile>
      </TileContainer>

      <ContentWrapper>
        <MapContainer>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3902.4421966329014!2d79.8531070539368!3d12.013048708963673!2m3!1f0!2f0!3f0!2m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1441215349055"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </MapContainer>

        <GetInTouch />
      </ContentWrapper>
    </ContactContainer>
  );
};

export default ContactUs;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f9;
  color: #12283c;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const SocialIconsContainer = styled.div`
  @media (max-width: 768px) {
    padding: 8px;
    gap: 16px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #12283c;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 16px;
  }
`;

const TileContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1000px;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-top: 16px;
  }
`;

const Tile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 250px;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 16px;
  }
`;

const TileContent = styled.div`
  margin-top: 10px;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  p {
    font-size: 1rem;
    color: #666;
    margin: 4px 0;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.1rem;
      margin-bottom: 6px;
    }
    p {
      font-size: 0.95rem;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1000px;
  margin-top: 50px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    gap: 24px;
  }
`;

const MapContainer = styled.div`
  width: 60%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const GrievanceSection = styled.section`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;

  h2 {
    color: #12283c;
  }
`;

const GrievanceCard = styled.div`
  background-color: #ffffff;
  border-radius: 24px;
  padding: 30px 40px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  text-align: center;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GrievanceIconWrapper = styled.div`
  background-color: #eef2f7;
  border-radius: 50%;
  padding: 12px;
  margin-bottom: 20px;
  display: inline-flex;
`;

const GrievanceContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GrievanceSubtitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #12283c;
  margin-bottom: 12px;
`;

const GrievanceName = styled.p`
  font-size: 1.15rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const GrievanceDesignation = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
`;

const GrievanceEmail = styled.a`
  font-size: 1rem;
  color: #3f6197;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #2d4974;
  }
`;