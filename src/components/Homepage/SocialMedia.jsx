import React from "react";
import styled from "styled-components";

const SocialMediaFeeds = () => {
  return (
    <SocialMediaContainer>
      <Heading>Social Media</Heading>

      <div className=" hidden md:block">
        <SocialMediaRow>
          {/* Instagram Feed */}

          <FeedContainer>
            <iframe
              src="https://www.instagram.com/aic_pecf/embed"
              title="Instagram Feed"
              allow="encrypted-media"
              width="100%"
              height="400"
              frameBorder="0"
            ></iframe>
          </FeedContainer>

          {/* YouTube Feed */}

          <FeedContainer>
            <iframe
              src="https://www.youtube.com/embed/Ydc5tR0_HF0?si=g5PVQJ1MOqX5DU0U"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              width="100%"
              height="400"
            ></iframe>
          </FeedContainer>
        </SocialMediaRow>
      </div>

      <div className=" block md:hidden">
        <SocialMediaRow>
          {/* Instagram Feed */}

          <div>
            <FeedContainer>
              <iframe
                src="https://www.instagram.com/aic_pecf/embed"
                title="Instagram Feed"
                allow="encrypted-media"
                width="100%"
                height="400"
                frameBorder="0"
              ></iframe>
            </FeedContainer>
          </div>

          {/* YouTube Feed */}

          <div>
            <FeedContainer>
              <iframe
                src="https://www.youtube.com/embed/Ydc5tR0_HF0?si=g5PVQJ1MOqX5DU0U"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                width="100%"
                height="400"
              ></iframe>
            </FeedContainer>
          </div>
        </SocialMediaRow>
      </div>
    </SocialMediaContainer>
  );
};

export default SocialMediaFeeds;

// Styled Components

const SocialMediaContainer = styled.div`
  text-align: center;
  margin: 40px 0;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #12283c;
`;

const SocialMediaRow = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
`;

const FeedContainer = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  iframe {
    width: 100%;
    height: 400px;
    border: none;
  }
`;
