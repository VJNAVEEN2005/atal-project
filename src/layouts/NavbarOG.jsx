import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Aic, Aim, ptuLogo } from "../assets/logos/logs";
import { NavbarDemo } from "./Navbar";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const NavbarOG = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/"); // Navigate to home page
  };

  const [isOpen, setIsOpen] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const toggleMenue = () => {
    setIsOpen(!isOpen);
  };

  const [isPartnersOpen, setIsPartnersOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  const hideAll = () => {
    setIsPartnersOpen(false);
    setIsProgramsOpen(false);
    setIsOpen(true);
  };

  const toggleLoginPopup = () => {
    setShowLoginPopup(!showLoginPopup);
  };

  return (
    <div>
      {/* Mobile Navbar */}
      <div className="relative py-6 gap-10 md:hidden sm:block">
        <div
          className={
            !isOpen
              ? "fixed z-10 w-full top-0 h-screen bg-slate-950 transition duration-1000 backdrop-blur-lg bg-opacity-40"
              : "fixed z-10 w-full top-0 hidden -left-[100%] h-screen bg-slate-950 transition duration-1000 backdrop-blur-lg bg-opacity-40"
          }
          onClick={toggleMenue}
        ></div>

        <div>
          <nav className="flex items-center justify-between">
            <a href="/">
              <div className="flex ml-2">
                <img className="h-14 mr-4" src={Aic} alt="" />
                <img className="h-14 mr-4" src={ptuLogo} alt="" />
                <img className="h-14" src={Aim} alt="" />
              </div>
            </a>

            <ul
              className={
                isOpen
                  ? "flex-col text-white absolute justify-evenly text-2xl top-4 space-y-60 opacity-0 transition-all p-7 -left-full z-20"
                  : "flex-col text-white absolute justify-evenly text-2xl top-4 space-y-4 p-7 left-0 z-20 transition-all"
              }
            >
              <div
                className={
                  isOpen
                    ? "hidden"
                    : "fixed z-10 right-0 top-6 cursor-pointer text-6xl"
                }
                onClick={toggleMenue}
              >
                <IoCloseSharp />
              </div>

              <li onClick={hideAll}>
                <NavLink to="/">Home</NavLink>
              </li>
              <hr />

              <li>
                <NavLink to="/startupDetail" onClick={hideAll}>
                  Portfolio
                </NavLink>
              </li>
              <hr />
              <li>
                <NavLink to="/programs" onClick={hideAll}>
                  Programs
                </NavLink>
              </li>

              <hr />
              <li>
                <NavLink onClick={hideAll} to="/partners">
                  Partners
                </NavLink>
              </li>

              <hr />
              <li>
                <NavLink onClick={hideAll} to="/events">
                  Events
                </NavLink>
              </li>
              <hr />
             
              <li>
                <NavLink onClick={hideAll} to="/tenders">
                  Tenders
                </NavLink>
              </li>
              <hr />
              <li>
                <NavLink onClick={hideAll} to="/contact">
                  Contact Us
                </NavLink>
              </li>
              <hr />
            </ul>
            <div
              className="cursor-pointer text-4xl mr-2 transition-transform duration-300 ease-in-out"
              onClick={toggleMenue}
            >
              <div
                className={`transform transition-transform duration-300 ease-in-out ${
                  isOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
                }`}
              >
                <FaBars className={`${isOpen ? "block" : "hidden"}`} />
              </div>
              <div
                className={`transform transition-transform duration-300 ease-in-out ${
                  isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                }`}
              >
                <IoCloseSharp className={`${isOpen ? "hidden" : "block"}`} />
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="relative py-6 justify-center gap-10 items-center hidden md:flex">
        <div className="flex gap-10 items-center border-b-4 rounded-3xl border-customBlue px-5 bg-white">
          <div className="w-24 h-24 cursor-pointer" onClick={goToHome}>
            <img
              src={Aic}
              className="w-full h-full object-cover"
              alt="AIC Logo"
            />
          </div>
          <div className="w-24 h-24 cursor-pointer" onClick={goToHome}>
            <img
              src={ptuLogo}
              className="w-full h-full object-contain"
              alt="PTU Logo"
            />
          </div>
        </div>
        <div className="w-fit scale-95">
          <NavbarDemo />
        </div>
        <div className="w-48 h-24 flex items-center border-b-4 rounded-3xl border-customBlue px-5 bg-white">
          <div className="w-20 h-20 cursor-pointer">
            <img
              src={Aim}
              alt="Aim Logo"
              className="max-w-36 max-h-full pt-2 object-cover"
            />
          </div>
        </div>
        {/* <div>
          <button
            className="ml-4 px-6 py-2 rounded-lg bg-[#12283c] text-white font-semibold hover:bg-opacity-90 transition"
            onClick={toggleLoginPopup}
          >
            Login
          </button>
        </div> */}
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Login</h2>
              <button
                className="text-gray-500 hover:text-black"
                onClick={toggleLoginPopup}
              >
                <IoCloseSharp size={24} />
              </button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#12283c] text-white py-2 rounded-lg hover:bg-opacity-90 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarOG;
