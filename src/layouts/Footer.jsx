import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactData } from "../Redux/slice/contactSlice";
import { Aic } from "../assets/logos/logs";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaRegUserCircle,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.contact);

  useEffect(() => {
    if (!data?.name) {
      dispatch(fetchContactData());
    }
  }, [dispatch, data?.name]);

  return (
    <>
      <div className="block md:hidden">
        <FooterContainer>
          <center>
            <h2>AIC-PECF</h2>
            <img
              src={Aic}
              alt="NIC"
              style={{ width: "100px", height: "auto" }}
            />

            <div className="flex justify-evenly items-center">
              <div>
                <h3>About Us</h3>
                <ul>
                  <li>Vision</li>
                  <li>Mission</li>
                  <li>Who We Are</li>
                </ul>
              </div>

              <div>
                <h3>Quick Links</h3>
                <ul>
                  <li>Careers</li>
                  <li>Apply</li>
                  <li>Events</li>
                  <li>Join as a Partner</li>
                  <li>Become an Investor</li>
                </ul>
              </div>
            </div>

            <br />

            <div className="flex justify-evenly items-center">
              <div>
                <h3>News</h3>
                <ul>
                  <li>Daily News</li>
                  <li>Press Release</li>
                  <li>Event News</li>
                </ul>
              </div>

              <div>
                <h3>Contact Us</h3>
                <p>
                  <FaRegUserCircle /> {data?.name || "Loading..."}
                </p>
                <p>
                  <FaEnvelope /> {data?.email || "ceo@aicpecf.org"}
                </p>
                <p>
                  <FaPhoneAlt /> {data?.phone || "+91 123456789"}
                </p>
              </div>
            </div>

            <br />

            <div className="flex justify-center">
              <SocialIcons>
                {data?.instagram && (
                  <a
                    className="instagram"
                    href={data.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                )}
                {data?.twitter && (
                  <a
                    className="x"
                    href={data.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaXTwitter />
                  </a>
                )}
                {data?.linkedin && (
                  <a
                    className="link"
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn />
                  </a>
                )}
                {data?.youtube && (
                  <a
                    className="youtube"
                    href={data.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube />
                  </a>
                )}
              </SocialIcons>
            </div>
          </center>
        </FooterContainer>
        <Copyright>
          <h1 className="text-white">
            &copy; 2024 AIC-PECF. All rights reserved.
          </h1>
        </Copyright>
      </div>

      <div className="hidden md:block">
        <FooterContainer>
          <Container>
            <Column>
             <div className=" flex justify-center items-center flex-col">
             <h2>AIC-PECF</h2>
              <img
                src={Aic}
                alt="NIC"
                style={{ width: "100px", height: "auto" }}
              />
             </div>
            </Column>
            <Column>
              <h3>About Us</h3>
              <ul>
                <li>Vision</li>
                <li>Mission</li>
                <li>Who We Are</li>
              </ul>
            </Column>
            <Column>
              <h3>Quick Links</h3>
              <ul>
                <li>Careers</li>
                <li>Apply</li>
                <li>Events</li>
                <li>Join as a Partner</li>
                <li>Become an Investor</li>
              </ul>
            </Column>
            <Column>
              <h3>News</h3>
              <ul>
                <li>Daily News</li>
                <li>Press Release</li>
                <li>Event News</li>
              </ul>
            </Column>
            <Column>
              <h3>Contact Us</h3>
              <p>
                <FaRegUserCircle /> {data?.name || "Mr. V Vishnu Varadan"}
              </p>
              <p>
                <FaEnvelope /> {data?.email || "ceo@aicpecf.org"}
              </p>
              <p>
                <FaPhoneAlt /> {data?.phone || "+91-8903467223"}
              </p>
              <SocialIcons>
                {data?.instagram && (
                  <a
                    className="instagram"
                    href={data.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                )}
                {data?.twitter && (
                  <a
                    className="x"
                    href={data.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaXTwitter />
                  </a>
                )}
                {data?.linkedin && (
                  <a
                    className="link"
                    href={data.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn />
                  </a>
                )}
                {data?.youtube && (
                  <a
                    className="youtube"
                    href={data.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaYoutube />
                  </a>
                )}
              </SocialIcons>
            </Column>
          </Container>
        </FooterContainer>
        <Copyright>
          <h1 className="text-white">
            &copy; 2024 AIC-PECF. All rights reserved.
          </h1>
        </Copyright>
      </div>
    </>
  );
};

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #12283c;
  color: #fff;
  padding: 20px 0;
  position: relative;
  bottom: 0;
  left: 0;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Column = styled.div`
  flex: 1 1 200px;
  margin: 10px;
  min-width: 200px;

  h2,
  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 5px;
    cursor: pointer;
  }

  p {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 5px 0;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;

  a {
    color: #fff;
    font-size: 24px;
    &.instagram:hover {
      color: #e1306c;
    }
    &.youtube:hover {
      color: #ff0000;
    }
    &.link:hover {
      color: #0077b5;
    }
    &.x:hover {
      color: black;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding: 15px 0;
  background-color: #0f1e34;
  width: 100%;
  font-size: 0.9em;
`;

export default Footer;
