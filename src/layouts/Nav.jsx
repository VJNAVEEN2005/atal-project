import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const goToHome = () => {
    navigate("/");
  };

  const goTOContact = () => {
    navigate("/contact"); 
  };

  return (
    <div className="menu">
      <button className="hamburger" onClick={toggleMenu}>☰</button>
      <nav className={`items ${isMenuOpen ? "show" : ""}`}> {/* Corrected string interpolation */}
        <button onClick={goToHome} className="mainitem">Home</button> 
        <div className="wrap">
          <button className="mainitem" onClick={() => toggleDropdown(0)}>Portfolio</button>
          <div className={`dropitem ${openDropdown === 0 ? "show-dropdown" : ""}`}> {/* Corrected string interpolation */}
            <Link to="/startupDetail" className="menuitem">Startup Details</Link> 
            <Link to="/studentProject" className="menuitem">Students Project</Link> 
          </div>
        </div>
        <div className="wrap">
          <button className="mainitem" onClick={() => toggleDropdown(2)}>Programs</button>
          <div className={`dropitem ${openDropdown === 2 ? "show-dropdown" : ""}`}> {/* Corrected string interpolation */}
            <Link to="/" className="menuitem">Pre-Incubate</Link> 
            <Link to="/" className="menuitem">Incubate</Link> 
            <Link to="/" className="menuitem">Incubation</Link> 
            <Link to="/" className="menuitem">IP Facilities</Link> 
          </div>
        </div>
        <div className="wrap">
          <button className="mainitem" onClick={() => toggleDropdown(3)}>Partners</button>
          <div className={`dropitem ${openDropdown === 3 ? "show-dropdown" : ""}`}> {/* Corrected string interpolation */}
            <Link to="/" className="menuitem">Academic Partners</Link> 
            <Link to="/" className="menuitem">Co-operative Partners</Link> 
            <Link to="/" className="menuitem">IP Supporters</Link> 
            <Link to="/" className="menuitem">Networking Partners</Link> 
            <Link to="/" className="menuitem">Investment Partners</Link> 
          </div>
        </div>
        <div className="wrap">
          <button className="mainitem" onClick={() => toggleDropdown(4)}>Events</button>
          <div className={`dropitem ${openDropdown === 4 ? "show-dropdown" : ""}`}> {/* Corrected string interpolation */}
            <Link to="/" className="menuitem">Upcoming Events</Link> 
            <Link to="/" className="menuitem">Outreach Events</Link> 
            <Link to="/" className="menuitem">Event Gallery</Link> 
            <Link to="/" className="menuitem">Register</Link> 
            <Link to="/" className="menuitem">Summary</Link> 
          </div>
        </div>
        <div className="wrap">
          <button className="mainitem" onClick={() => toggleDropdown(5)}>Funding</button>
          <div className={`dropitem ${openDropdown === 5 ? "show-dropdown" : ""}`}> {/* Corrected string interpolation */}
            <Link to="/" className="menuitem">SISFS</Link> 
            <Link to="/" className="menuitem">PROPLEX</Link> 
            <Link to="/" className="menuitem">Aim Seed Investments</Link> 
            <Link to="/" className="menuitem">External Funding Support</Link> 
          </div>
        </div>
        <div className="wrap">
          <button className="mainitem" onClick={() => toggleDropdown(6)}>Tenders</button>
          <div className={`dropitem ${openDropdown === 6 ? "show-dropdown" : ""}`}> {/* Corrected string interpolation */}
            <Link to="/" className="menuitem">Ongoing</Link> 
            <Link to="/" className="menuitem">Closed</Link> 
          </div>
        </div>
        <button onClick={goTOContact} className="mainitem">Contact Us</button> 
      </nav>
    </div>
  );
};

export default Navbar;
