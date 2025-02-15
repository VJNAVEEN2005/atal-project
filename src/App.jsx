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


function App() {
  return (
    <Router>
      {/*
      <Header />
    */}
      <NavbarOG />
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
        
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
