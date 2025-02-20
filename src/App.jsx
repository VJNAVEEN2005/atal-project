import React from "react";
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
import CoreTeam from './components/Teams/CoreTeam.tsx'
import Executive_Committee from './components/Teams/Executive_Committee.tsx'
import NewNav from "./components/ui/NewNav.jsx";
import Events_Calendar from "./components/Events/Events_Calander.jsx";
import Road_Map from "./components/Events/Road_Map.jsx";
import News_letter from "./components/Events/News_letter.jsx";
import Press_Media_Coverage from "./components/Events/Press_Media_Coverage.jsx";
import Page_Not_Found from "./pages/Page_Not_Found.jsx";
import Drone_Technology from "./components/Programs/Skill_Pattara/Drone_Technology.jsx";


function App() {
  return (
    <Router>
      {/*
      <Header />
    */}
      <NewNav/>
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
        <Route path="/team" element={<Team/>} />
        <Route path="/team/coreteam" element={<CoreTeam/>} />
        <Route path="/team/executive_committee" element={<Executive_Committee/>} />
        <Route path="/upcoming_events" element={<Events_Calendar/>} />
        <Route path="/road_map" element={<Road_Map/>} />
        <Route path="/news_letter" element={<News_letter/>} />
        <Route path="/press_media" element={<Press_Media_Coverage/>} />

        {/* Skill_Pattara */}
        <Route path="/drone_technology" element={<Drone_Technology/>} />
        
        <Route path="*" element={<Page_Not_Found/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
