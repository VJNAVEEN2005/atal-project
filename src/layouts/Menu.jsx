// src/components/Menu.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <MenuContainer>
      <ContentWrapper>
        <MenuItems>
          <MenuItem to="/home">Home</MenuItem>
          <DropdownMenuItem>
            <MenuItem to="/portfolio">Portfolio</MenuItem>
            <DropdownContent>
              <DropdownItem to="/startupdetails">Startup Details</DropdownItem>
              <DropdownItem to="/studentsproject">Students Project</DropdownItem>
            </DropdownContent>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MenuItem to="/programs">Programs</MenuItem>
            <DropdownContent>
              <DropdownItem to="/pre-incubate">Pre-Incubate</DropdownItem>
              <DropdownItem to="/incubate">Incubate</DropdownItem>
              <DropdownItem to="/incubation">Incubation</DropdownItem>
              <DropdownItem to="/ip-facilities">IP Facilities</DropdownItem>
            </DropdownContent>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MenuItem to="/partners">Partners</MenuItem>
            <DropdownContent>
              <DropdownItem to="/academicpartner">Academic Partners</DropdownItem>
              <DropdownItem to="/co-operativepartners">Corperate Partners</DropdownItem>
              <DropdownItem to="/ipsupporters">IP Supporters</DropdownItem>
              <DropdownItem to="/networkingpartners">Networking Partners</DropdownItem>
              <DropdownItem to="/investmentpartners">Investment Partners</DropdownItem>
            </DropdownContent>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MenuItem to="/events">Events</MenuItem>
            <DropdownContent>
              <DropdownItem to="/upcomingevents">Upcoming Events</DropdownItem>
              <DropdownItem to="/outreachevents">Outreach Events</DropdownItem>
              <DropdownItem to="/eventgallery">Event Gallery</DropdownItem>
              <DropdownItem to="/register">Register</DropdownItem>
              <DropdownItem to="/summary">Summary</DropdownItem>
            </DropdownContent>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MenuItem to="/funding">Funding</MenuItem>
            <DropdownContent>
              <DropdownItem to="/sisfs">SISFS</DropdownItem>
              <DropdownItem to="/proplex">PROPLEX</DropdownItem>
              <DropdownItem to="/aimseedinvestments">Aim Seed Investments</DropdownItem>
              <DropdownItem to="/externalfunding">External Funding Support</DropdownItem>
            </DropdownContent>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MenuItem to="/tender">Tenders</MenuItem>
            <DropdownContent>
              <DropdownItem to="/ongoing">Ongoing</DropdownItem>
              <DropdownItem to="/closed">Closed</DropdownItem>
            </DropdownContent>
          </DropdownMenuItem>
          <MenuItem to="/contact">Contact Us</MenuItem>
        </MenuItems>
      </ContentWrapper>
    </MenuContainer>
  );
};

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff;
  padding: 20px 0;
  position: fixed;
  width: 100%;
  top: 200px; /* Adjust based on Navbar height */
  left: 0;
  z-index: 999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Subtle shadow for depth */
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuItems = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

const MenuItem = styled(Link)`
  color: #12283c;
  text-decoration: none;
  margin: 0 15px;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 1em;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: orange;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15); /* Updated shadow for dropdown */
  min-width: 200px;
  z-index: 1;
  border-radius: 4px;
  overflow: hidden;

  a {
    color: #12283c;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;

    &:hover {
      background-color: #ddd;
      color: orange;
    }
  }
`;

const DropdownMenuItem = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${DropdownContent} {
    display: block;
  }
`;

const DropdownItem = styled(Link)`
  color: #12283c;
  text-decoration: none;
  padding: 12px 16px;
  display: block;

  &:hover {
    background-color: #ddd;
    color: orange;
  }
`;

export default Menu;
