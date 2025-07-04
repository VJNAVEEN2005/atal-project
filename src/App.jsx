import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import Home from "./pages/Homepage";
import About from "./pages/about.jsx";
import Contact from "./pages/contact.jsx";
import Partners from "./pages/Partners.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Services from "./pages/Service.jsx";
import Events from "./pages/Events.jsx";
import Tenders from "./pages/Tenders";
import TendersAdmin from "./Admin/TendersAdmin";

// Layouts
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

// Components (Partners)
import Academic from "./components/Partners/Academic.jsx";
import Cooperative from "./components/Partners/Co-operative.jsx";
import Investment from "./components/Partners/Investment.jsx";
import IP from "./components/Partners/IPsupport.jsx";
import Network from "./components/Partners/Network.jsx";
import NavbarOG from "./layouts/NavbarOG.jsx";
import Programs from "./pages/Programs.jsx";
import Team from "./pages/Teams.jsx";
import CoreTeam from "./components/Teams/CoreTeam.tsx";
import Executive_Committee from "./components/Teams/Executive_Committee.tsx";
import NewNav from "./components/ui/NewNav.jsx";
import Events_Calendar from "./components/Events/Events_Calander.jsx";
import Road_Map from "./components/Events/Road_Map.jsx";
import News_letter from "./components/Events/News_letter.jsx";
import Press_Media_Coverage from "./components/Events/Press_Media_Coverage.jsx";
import Page_Not_Found from "./pages/Page_Not_Found.jsx";
import Drone_Technology from "./components/Programs/Skill_Pattara/Drone_Technology.jsx";
import Arduino_Programming from "./components/Programs/Skill_Pattara/Arduino_Programming.jsx";
import Raspberry_Pi_Development from "./components/Programs/Skill_Pattara/Raspberry_Pi_Development.jsx";
import MoveToTop from "./components/MoveToTop.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import Admin from "./pages/Admin.jsx";
import TendersControl from "./Admin/TendersControl.jsx";
import EventsControl from "./Admin/EventsControl.jsx";
import EditEvent from "./Admin/EditEvent.jsx";
import PressMediaControl from "./Admin/PressMediaControl.jsx";
import RoadMapControl from "./Admin/RoadMapControl.jsx";
import NewsLetterControl from "./Admin/NewsLetterControl.jsx";
import TeamsControl from "./Admin/TeamsControl.jsx";
import AdminControl from "./Admin/AdminControl.jsx";
import ProfileShare from "./pages/ProfileShare.jsx";

import StartupDetailsControl from "./Admin/StartupDetailsControl.jsx";
import LoaderAic from "./components/ui/Loader.jsx";
import PartnersControl from "./Admin/PartnersControl.jsx";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "./Redux/slice/authenticateSlice.js";
import ImageCarouselControl from "./Admin/ImageCarouselControl.jsx";
import MessagesControl from "./Admin/MessagesControl.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {
  const [isAdmin, setIsAdmin] = useState(0);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch]);

  useEffect(() => {
    if (state.authenticate) {
      setIsAdmin(state.authenticate.admin);
      console.log("Admin Status:", state.authenticate.admin);
      console.log("Is Authenticated:", state.authenticate.isAuthenticated);
    }
  }, [state.authenticate]);

  return (
    <Router>
      {/*
      <Header />
    */}
      <NewNav />
      <MoveToTop />
      {/* <NavbarOG /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/studentProject" element={<Services />} />
        <Route path="/startupDetail" element={<Portfolio />} />
        <Route path="/events" element={<Events />} />
        <Route path="/tenders" element={<Tenders />} />
        <Route path="/admin/tenders" element={<TendersAdmin />} />
        <Route path="/academicPartners" element={<Academic />} />
        <Route path="/cooperativePartners" element={<Cooperative />} />
        <Route path="/investmentPartner" element={<Investment />} />
        <Route path="/ipSupporters" element={<IP />} />
        <Route path="/networkingPartners" element={<Network />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team/coreteam" element={<CoreTeam />} />
        <Route
          path="/team/executive_committee"
          element={<Executive_Committee />}
        />
        <Route path="/upcoming_events" element={<Events_Calendar />} />
        <Route path="/road_map" element={<Road_Map />} />
        <Route path="/news_letter" element={<News_letter />} />
        <Route path="/press_media" element={<Press_Media_Coverage />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/profile/:id" element={<ProfileShare />} />

        {isAdmin > 0 && (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/tenderscontrol" element={<TendersControl />} />
            <Route path="/admin/eventscontrol" element={<EventsControl />} />
            <Route path="/events/edit/:id" element={<EditEvent />} />
            <Route path="/admin/presscontrol" element={<PressMediaControl />} />
            <Route path="/admin/roadmapcontrol" element={<RoadMapControl />} />
            <Route
              path="/admin/newslettercontrol"
              element={<NewsLetterControl />}
            />
            <Route
              path="/admin/startupdetailscontrol"
              element={<StartupDetailsControl />}
            />
            <Route
              path="/admin/partnerscontrol"
              element={<PartnersControl />}
            />
            <Route path="/admin/imagecarouselcontrol" element={<ImageCarouselControl />} />
            <Route path="/admin/messagescontrol" element={<MessagesControl />} />
            {isAdmin == 1 && (
              <>
                <Route path="/admin/teamscontrol" element={<TeamsControl />} />
                <Route path="/admin/admincontrol" element={<AdminControl />} />
                
              </>
            )}
          </>
        )}
        {/* Admin - Works */}

        {/* Skill_Pattara */}
        <Route path="/drone_technology" element={<Drone_Technology />} />
        <Route path="/arduino_programming" element={<Arduino_Programming />} />
        <Route
          path="/raspberry_pi_development"
          element={<Raspberry_Pi_Development />}
        />

        {/* 404 Page */}
        <Route path="*" element={<Page_Not_Found />} />
        <Route path="/loader" element={<LoaderAic />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
