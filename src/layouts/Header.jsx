import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ptuLogo, Aim, Aic } from '../assets/logos/logs';
import "./Navbar.css";

const Header = () => {
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

  const goToContact = () => {
    navigate("/contact");
  };
  const goToPartners = () => {
    navigate("/partners");
  };
  const goToEvents = () => {
    navigate("/events");
  };
  const goToTenders = () => {
    navigate("/tenders");
  };


  return (
    <div style={styles.headerContainer}>
      <div style={styles.logoContainer}>
        <img src={Aic} alt="AIC Logo" style={styles.logo} />
        <img src={Aim} alt="AIM Logo" style={styles.logo} />
        <img src={ptuLogo} alt="PTU Logo" style={styles.logo} />
      </div>
      <h1 style={styles.mainText}>ATAL INCUBATION CENTER - PEC FOUNDATION</h1>
      <h2 style={styles.subText}>PUDUCHERRY TECHNOLOGY UNIVERSITY</h2>
      
      <div className="menu">
        <button className="hamburger" onClick={toggleMenu}>☰</button>
        <nav className={`items ${isMenuOpen ? "show" : ""}`}>
          <button onClick={goToHome} className="mainitem">Home</button>
          <div className="wrap">
            <button className="mainitem" onClick={() => toggleDropdown(0)}>Portfolio</button>
            <div className={`dropitem ${openDropdown === 0 ? "show-dropdown" : ""}`}>
              <Link to="/startupDetail" className="menuitem">Startup Details</Link>
              <Link to="/studentProject" className="menuitem">Students Project</Link>
            </div>
          </div>
          <div className="wrap">
            <button className="mainitem" onClick={() => toggleDropdown(2)}>Programs</button>
            <div className={`dropitem ${openDropdown === 2 ? "show-dropdown" : ""}`}>
              <Link to="/preIncubate" className="menuitem">Pre-Incubate</Link>
              <Link to="/incubate" className="menuitem">Incubate</Link>
              <Link to="/incubation" className="menuitem">Incubation</Link>
              <Link to="/ipFacilities" className="menuitem">IP Facilities</Link>
            </div>
          </div>
          <div className="wrap">
          <button className="mainitem" onClick={() => { goToPartners(); toggleDropdown(3); }}>Partners</button>

            <div className={`dropitem ${openDropdown === 3 ? "show-dropdown" : ""}`}>
              <Link to="/academicPartners" className="menuitem">Academic Partners</Link>
              <Link to="/cooperativePartners" className="menuitem">Co-operative Partners</Link>
              <Link to="/ipSupporters" className="menuitem">IP Supporters</Link>
              <Link to="/networkingPartners" className="menuitem">Networking Partners</Link>
              <Link to="/investmentPartners" className="menuitem">Investment Partners</Link>
            </div>
          </div>
          <div className="wrap">
            <button className="mainitem" onClick={() => {goToEvents();toggleDropdown(4);}}>Events</button>
          </div>
          <div className="wrap">
            <button className="mainitem" onClick={() => toggleDropdown(5)}>Funding</button>
            <div className={`dropitem ${openDropdown === 5 ? "show-dropdown" : ""}`}>
              <Link to="/sisfs" className="menuitem">SISFS</Link>
              <Link to="/proplex" className="menuitem">PROPLEX</Link>
              <Link to="/aimSeedInvestments" className="menuitem">Aim Seed Investments</Link>
              <Link to="/externalFunding" className="menuitem">External Funding Support</Link>
            </div>
          </div>
          <div className="wrap">
            <button className="mainitem" onClick={() => {goToTenders();toggleDropdown(6)}}>Tenders</button>
            <div className={`dropitem ${openDropdown === 6 ? "show-dropdown" : ""}`}>
              <Link to="/ongoingTenders" className="menuitem">Ongoing</Link>
              <Link to="/closedTenders" className="menuitem">Closed</Link>
            </div>
          </div>
          <button onClick={goToContact} className="mainitem">Contact Us</button>
        </nav>
      </div>
    </div>
  );
};

const styles = {
  headerContainer: {
    padding: '5px',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '5px',
    width: '100%',
    zIndex: 5,
    paddingTop: '5px',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '0px',
    padding: '0 10px',
    flexWrap: 'wrap',
  },
  logo: {
    height: '70px',
    margin: '2px',
    maxWidth: '100%',
  },
  mainText: {
    fontSize: '1.5rem',
    color: '#12283c',
    fontWeight: 'bold',
    marginTop: '5px',
  },
  subText: {
    fontSize: '1.2rem',
    color: '#1a1a1a',
    fontWeight: 'normal',
    marginBottom: '2px',
  },
};

export default Header;
