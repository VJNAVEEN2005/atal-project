import React from 'react';
import styled from 'styled-components';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const ContactUs = () => {
  return (
    <ContactContainer>
      <Title>Contact Us</Title>
      <TileContainer>
        <Tile>
          <FaPhoneAlt size={40} />
          <TileContent>
            <h3>Phone</h3>
            <p>+91 123456789</p>
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
            <p>Email: info@aicpecf.org</p>
            <p>Phone: +91 123456789</p>
            <SocialIcons>
            <a className='instagram' href="https://www.instagram.com/aic_pecf" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a className='x'href="https://twitter.com/aicpecftweet" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
            <a className='link'href="https://www.linkedin.com/company/aicpecf/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a className='youtube'href="https://youtube.com/@atalincubationcentre-pecfo946" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </SocialIcons>
          </TileContent>
        </Tile>
      </TileContainer>
      <MapContainer>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3902.4421966329014!2d79.8531070539368!3d12.013048708963673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1441215349055"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </MapContainer>
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
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #12283c;
  margin-bottom: 20px;
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
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  a {
    color: black;
    font-size: 24px;
    &.instagram:hover {
      color: #E1306C;
    }&.youtube:hover {
      color: #FF0000;
    }&.link:hover {
      color:#0077B5;
    }&.x:hover {
      color: black;
    }
  }
`;

const MapContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 50px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0px;
  overflow: hidden;
`;
