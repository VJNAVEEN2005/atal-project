import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import "./Events.css"; // Add your custom styles here
import { color } from "framer-motion";
import Events_Calander from "../components/Events/Events_Calander";
import Road_Map from "../components/Events/Road_Map";
import NewsLetter from "../components/Events/News_letter";
import Press_Media_Coverage from "../components/Events/Press_Media_Coverage";

const Events = () => {

  const [activeTab, setActiveTab] = useState("Road Map"); // Track active tab
  const [observed, setObserved] = useState(false); // To trigger the observer only once

  // IntersectionObserver to trigger animation when tiles are in view
  const observeTiles = () => {
    const tiles = document.querySelectorAll('.pedagogy-tile');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Add visible class when the tile is in view
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the tile is in view
      }
    );

    tiles.forEach((tile) => {
      observer.observe(tile);
    });
  };

  useEffect(() => {
    if (!observed) {
      observeTiles();
      setObserved(true); // Set observed to true to avoid multiple observer initializations
    }
  }, [observed]);

  return (
    <div className="events-page">
      {/* Tabs */}
      <div className="tabs">
        {[ "Road Map", "Upcoming Events", "News Letters", "Press Media Coverage"].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Upcoming Events" && (
        <Events_Calander/>
      )}

      {activeTab === "Road Map" && (
        <Road_Map/>
      )}

      {activeTab === "News Letters" && (
        <NewsLetter/>
      )}

      {activeTab === "Press Media Coverage" && (
        <Press_Media_Coverage/>
      )}

    </div>
  );
};

export default Events;
