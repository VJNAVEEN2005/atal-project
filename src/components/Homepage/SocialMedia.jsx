import React from "react";
import styled from "styled-components";

const SocialMediaFeeds = () => {
  return (
    <SocialMediaContainer>
      <Heading>Connect With Us</Heading>

      <SocialMediaRow>
        {/* Instagram Feed */}
        <FeedContainer>
          <iframe
            src="https://www.instagram.com/aic_pecf/embed"
            title="Instagram Feed"
            allow="encrypted-media"
            width="100%"
            height="100%"
            frameBorder="0"
          ></iframe>
        </FeedContainer>

        {/* YouTube Feed */}
        <FeedContainer>
          <iframe
            src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7297534059407151104"
            title="LinkedIn Post"
            frameBorder="0"
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </FeedContainer>
      </SocialMediaRow>
    </SocialMediaContainer>
  );
};

export default SocialMediaFeeds;

// Styled Components
const SocialMediaContainer = styled.div`
  text-align: center;
  margin: 20px 10px 40px;
  padding: 0 10px;

  @media (min-width: 768px) {
    margin: 40px 20px;
    padding: 0 20px;
  }
`;

const Heading = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 15px;
  color: #12283c;

  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
`;

const SocialMediaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    gap: 20px;
  }
`;

const FeedContainer = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 350px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (min-width: 480px) {
    height: 400px;
  }

  @media (min-width: 768px) {
    flex: 1;
    min-width: 300px;
    max-width: 600px;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;
