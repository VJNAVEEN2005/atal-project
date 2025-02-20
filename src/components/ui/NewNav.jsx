import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Aic, Aim, ptuLogo } from "../../assets/logos/logs";
import { NavLink, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

const NewNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  // Navigation items with correct titles from the image
  const navItems = [
    { name: "Home", dropdown: false, link: "/" },
    {
      name: "Ecosystem",
      dropdown: true,
      link: "/ecosystem",
      submenu: [
        { name: "Startup Details", link: "/startupDetail" },
        { name: "Students Projects", link: "/studentProject" },
      ],
    },
    {
      name: "Programs",
      dropdown: false,
      link: "/programs",
      submenu: [
        { name: "Incubation Program", link: "/programs/incubation" },
        { name: "Acceleration Program", link: "/programs/acceleration" },
        { name: "Mentorship", link: "/programs/mentorship" },
      ],
    },
    {
      name: "Partners",
      dropdown: false,
      link: "/partners",
      submenu: [
        { name: "Industry Partners", link: "/partners/industry" },
        { name: "Academic Partners", link: "/partners/academic" },
        { name: "Government Partners", link: "/partners/government" },
      ],
    },
    {
      name: "Team",
      dropdown: true,
      link: "/team",
      submenu: [
        { name: "Core Team", link: "/team/coreteam" },
        { name: "Executive Committee", link: "/team/executive_committee" },
      ],
    },
    {
      name: "Events",
      dropdown: true,
      link: "/events",
      submenu: [
        { name: "Road Map", link: "/road_map" },
        { name: "Upcoming Events", link: "upcoming_events" },
        { name: "News Letter", link: "/news_letter" },
        { name: "Press Media Coverage", link: "/press_media" },
      ],
    },
    {
      name: "Tenders",
      dropdown: false,
      link: "/tenders",
      submenu: [
        { name: "Current Tenders", link: "/tenders/current" },
        { name: "Past Tenders", link: "/tenders/past" },
      ],
    },
    {
      name: "Contact",
      dropdown: false,
      link: "/contact",
      submenu: [
        { name: "Contact Details", link: "/contact/details" },
        { name: "Locate Us", link: "/contact/locate" },
        { name: "Submit Query", link: "/contact/query" },
      ],
    },
  ];

  // Handle mouse enter for dropdown
  const handleMouseEnter = (index) => {
    if (navItems[index].dropdown) {
      setActiveDropdown(index);
    }
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    // Use timeout to prevent immediate hiding
    setTimeout(() => {
      setActiveDropdown(null);
    }, 2000); // 300ms delay before hiding
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md md:border md:border-[#3f6197] md:m-7 md:rounded-3xl md:shadow-[#3f6197]"
    >
      <div className="max-w-full flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between w-full items-center h-20">
          {/* Left Icons Group */}
          <motion.div
            className="flex items-center space-x-4 hover:cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            onClick={() => navigate("/")}
          >
            <img src={Aic} alt="AIC-PECT Logo" className="h-24 object-cover" />
            <img
              src={ptuLogo}
              alt="University Logo"
              className="h-16 object-cover"
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex">
            <div className="flex space-x-6">
              {navItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative"
                
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.div
                    className="flex items-center text-base font-medium px-2 py-3"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    style={{ color: "#3f6197" }}
                  >
                    <NavLink to={item.link}>{item.name}</NavLink>
                    {/* <span>{item.name}</span> */}
                    {item.dropdown && (
                      <ChevronDown
                        className="ml-1 h-4 w-4"
                        style={{ color: "#3f6197" }}
                      />
                    )}
                  </motion.div>

                  {/* Dropdown Menu with Animation */}
                  {item.dropdown && (
                    <motion.div
                      className="absolute left-0 mt-1 w-48 rounded-md z-20 shadow-lg bg-white overflow-hidden"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: activeDropdown === index ? 1 : 0,
                        height: activeDropdown === index ? "auto" : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: activeDropdown === index ? 0 : 0.2, // Delay hiding
                      }}
                      style={{
                        transformOrigin: "top",
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <div className="py-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <motion.div
                            key={subIndex}
                            className="block px-4 py-2 hover:cursor-pointer text-sm hover:bg-gray-100"
                            whileHover={{ x: 5 }}
                            style={{ color: "#3f6197" }}
                            onClick={()=>navigate(subItem.link)}
                          >
                            <NavLink to={subItem.link}>{subItem.name}</NavLink>
                            {/* {subItem.name} */}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Icons Group */}
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <img src={Aim} alt="NITI Aayog Logo" className="h-14" />
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              style={{ color: "#3f6197" }}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden"
        initial={false}
        animate={
          isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          {navItems.map((item, index) => (
            <div key={index}>
              <div
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                style={{ color: "#3f6197" }}
                onClick={(e) => {
                  if (item.dropdown) {
                    e.preventDefault();
                    setActiveDropdown(activeDropdown === index ? null : index);
                  }
                }}
              >
                <NavLink to={item.link}>{item.name}</NavLink>
                {/* {item.name} */}
                {item.dropdown && (
                  <ChevronDown className="ml-1 h-4 w-4 inline" />
                )}
              </div>

              {/* Mobile Submenu */}
              {item.dropdown && isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: activeDropdown === index ? 1 : 0,
                    height: activeDropdown === index ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="pl-6 pr-2 py-1"
                >
                  {item.submenu.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="block px-3 py-1 text-sm rounded-md hover:bg-gray-50"
                      style={{ color: "#3f6197" }}
                    >
                      <NavLink to={subItem.link}>• {subItem.name}</NavLink>
                      {/* • {subItem.name} */}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default NewNav;
