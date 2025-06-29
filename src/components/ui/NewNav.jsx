import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Aic, Aim, ptuLogo } from "../../assets/logos/logs";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const NewNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Add this to get current location
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [isLogin, state.authenticate]);

  const checkAuth = () => {
    const auth = state.authenticate.isAuthenticated;
    if (auth === true) {
      setIsLogin(true);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigation items remain the same...
  const navItems = [
    { name: "Home", dropdown: false, link: "/" },
    {
      name: "Portfolio",
      dropdown: false,
      link: "/startupDetail",
      submenu: [
        { name: "Startup Details", link: "/startupDetail" },
        { name: "Students Projects", link: "/studentProject" },
      ],
    },
    {
      name: "Service & Support",
      dropdown: false,
      link: "/studentProject",
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
      dropdown: false,
      link: "/team",
      submenu: [
        { name: "Core Team", link: "/team/coreteam" },
        { name: "Executive Committee", link: "/team/executive_committee" },
      ],
    },
    {
      name: "Events",
      dropdown: false,
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

  // Check if a nav item is active (current page)
  const isNavItemActive = (itemLink) => {
    // Exact match for home page
    if (itemLink === "/" && location.pathname === "/") {
      return true;
    }

    // For other pages, check if current path starts with the item link
    // This handles both exact matches and child routes
    return itemLink !== "/" && location.pathname.startsWith(itemLink);
  };

  // Check if submenu item is active
  const isSubmenuItemActive = (itemLink) => {
    return location.pathname === itemLink;
  };

  // Handle mouse enter for dropdown - updated for desktop only
  const handleMouseEnter = (index) => {
    if (window.innerWidth >= 1024 && navItems[index].dropdown) {
      setActiveDropdown(index);
    }
  };

  // Handle mouse leave with delay - updated for desktop only
  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      setTimeout(() => {
        setActiveDropdown(null);
      }, 2000);
    }
  };

  const handleMobileItemClick = (index, hasDropdown) => {
    if (hasDropdown) {
      setActiveDropdown(activeDropdown === index ? null : index);
    } else {
      setIsOpen(false);
      setActiveDropdown(null);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md border border-[#3f6197] m-2 sm:m-4 lg:m-7 rounded-3xl shadow-[#3f6197]"
    >
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between w-full items-center h-16 sm:h-18 lg:h-20">
          {/* Left Icons Group */}
          <motion.div
            className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 hover:cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            onClick={() => navigate("/")}
          >
            <img
              src={Aic}
              alt="AIC-PECT Logo"
              className="h-12 sm:h-16 lg:h-24 object-cover"
            />
            <img
              src={ptuLogo}
              alt="University Logo"
              className="h-8 sm:h-12 lg:h-16 object-cover"
            />
          </motion.div>

          {/* Desktop Menu - now only shows on lg screens */}
          <div className="hidden lg:flex flex-1 justify-evenly">
            <div className="flex w-full justify-evenly mx-5">
              {navItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.div
                    className={`flex items-center text-base h-full text-center font-medium px-2 py-3 `}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    style={{ color: "#3f6197" }}
                  >
                    <NavLink
                      to={item.link}
                      className={
                        isNavItemActive(item.link) ? " font-extrabold" : ""
                      }
                    >
                      {item.name}
                    </NavLink>
                    {item.dropdown && (
                      <ChevronDown
                        className="ml-1 h-4 w-4"
                        style={{ color: "#3f6197" }}
                      />
                    )}
                  </motion.div>

                  {/* Desktop Dropdown Menu */}
                  {item.dropdown && (
                    <motion.div
                      className="absolute left-0 mt-1 w-48 rounded-md z-20 shadow-lg bg-white overflow-hidden"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: activeDropdown === index ? 1 : 0,
                        height: activeDropdown === index ? "auto" : 0,
                      }}
                      transition={{ duration: 0.3 }}
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
                            className={`block px-4 py-2 hover:cursor-pointer text-sm hover:bg-gray-100 ${
                              isSubmenuItemActive(subItem.link)
                                ? "border-l-4 border-[#3f6197]"
                                : ""
                            }`}
                            whileHover={{ x: 5 }}
                            style={{ color: "#3f6197" }}
                          >
                            <NavLink to={subItem.link}>{subItem.name}</NavLink>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Register Button */}
          {!isLogin && (
            <div className="hidden lg:flex items-center mr-5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white bg-[#0F1F2C] px-3 py-2 rounded-lg shadow-lg transition-all"
                onClick={() => navigate("/login")}
              >
                Login
              </motion.button>
            </div>
          )}

          {isLogin && (
            <div className="hidden lg:flex items-center mr-5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white bg-[#0F1F2C] px-3 py-2 rounded-lg shadow-lg transition-all"
                onClick={() => navigate("/Profile")}
              >
                Profile
              </motion.button>
            </div>
          )}

          {/* Right Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <img
              src={Aim}
              alt="NITI Aayog Logo"
              className="h-8 sm:h-10 lg:h-14"
            />
          </motion.div>

          {/* Mobile/Tablet menu button - now shows on all screens below lg */}
          <div className="lg:hidden ml-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 focus:outline-none"
              style={{ color: "#3f6197" }}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="block h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet menu - now shows on all screens below lg */}
      <motion.div
        ref={mobileMenuRef}
        className="lg:hidden"
        initial={false}
        animate={
          isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white rounded-b-3xl">
          {navItems.map((item, index) => (
            <div key={index}>
              <div
                className={`flex justify-between items-center px-3 py-2 rounded-md text-sm sm:text-base font-medium hover:bg-gray-50 ${
                  isNavItemActive(item.link)
                    ? "border-l-4 border-[#3f6197] bg-gray-50"
                    : ""
                }`}
                style={{ color: "#3f6197" }}
              >
                <NavLink
                  to={item.link}
                  onClick={() =>
                    !item.dropdown && handleMobileItemClick(index, false)
                  }
                  className="flex-grow"
                >
                  {item.name}
                </NavLink>
                {item.dropdown && (
                  <button
                    onClick={() => handleMobileItemClick(index, true)}
                    className="p-1 focus:outline-none"
                  >
                    {activeDropdown === index ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Mobile/Tablet Submenu */}
              {item.dropdown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: activeDropdown === index ? 1 : 0,
                    height: activeDropdown === index ? "auto" : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="pl-6 pr-2 py-1 bg-gray-50 rounded-md mx-2"
                  style={{ overflow: "hidden" }}
                >
                  {item.submenu.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className={`block px-3 py-2 text-xs sm:text-sm rounded-md hover:bg-gray-100 ${
                        isSubmenuItemActive(subItem.link)
                          ? "border-l-2 border-[#3f6197] bg-gray-100"
                          : ""
                      }`}
                      style={{ color: "#3f6197" }}
                    >
                      <NavLink
                        to={subItem.link}
                        onClick={() => setIsOpen(false)}
                        className="block w-full"
                      >
                        • {subItem.name}
                      </NavLink>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}

          {/* Mobile/Tablet Register Button */}
          {!isLogin && (
            <div className="px-3 py-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full text-white bg-[#0F1F2C] px-3 py-2 rounded-lg shadow-lg transition-all text-center text-sm sm:text-base"
                onClick={() => navigate("/login")}
              >
                Login
              </motion.button>
            </div>
          )}

          {isLogin && (
            <div className="px-3 py-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full text-white bg-[#0F1F2C] px-3 py-2 rounded-lg shadow-lg transition-all text-center text-sm sm:text-base"
                onClick={() => navigate("/profile")}
              >
                Profile
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default NewNav;
