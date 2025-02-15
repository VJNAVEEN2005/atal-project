import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import "./Events.css"; // Add your custom styles here

const Events = () => {
  const [selectedDates, setSelectedDates] = useState([]); // Array to hold multiple selected dates
  const [filteredDates, setFilteredDates] = useState([]); // Dates to filter events
  const [activeTab, setActiveTab] = useState("Upcoming Events"); // Track active tab
  const [observed, setObserved] = useState(false); // To trigger the observer only once

  const events = [
    {
      date: "2025-01-11",
      title: "Tech Conference 2024",
      time: "10:00 AM",
      poster: "src/assets/logos/Eventsp1.jpg",
    },
    {
      date: "2025-01-10",
      title: "Art Exhibition",
      time: "3:00 PM",
      poster: "src/assets/logos/Events-2.jpg",
    },
    {
      date: "2025-01-15",
      title: "Music Fest",
      time: "7:00 PM",
      poster: "src/assets/logos/Eventsp3.jpg",
    },
    {
      date: "2025-01-07",
      title: "Dance Fest",
      time: "8:00 PM",
      poster: "src/assets/logos/Eventsp4.jpg",
    },
    {
      date: "2025-01-20",
      title: "Tech Fest",
      time: "9:00 PM",
      poster: "src/assets/logos/Eventsp5.jpg",
    },
  ];

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    setSelectedDates((prevDates) =>
      prevDates.includes(formattedDate)
        ? prevDates.filter((d) => d !== formattedDate) // Unselect if already selected
        : [...prevDates, formattedDate] // Add the selected date
    );
  };

  const handleApply = () => {
    setFilteredDates(selectedDates);
  };

  const handleClear = () => {
    setSelectedDates([]); // Clear selected dates
    setFilteredDates([]); // Reset filtered dates to show all events
  };

  const displayedEvents = filteredDates.length
    ? events.filter((event) => filteredDates.includes(event.date))
    : events; // Show all events if no dates are selected

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
        {["Upcoming Events", "Outreach Events", "Register", "Summary"].map((tab) => (
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
        <div className="content-container">
          <div className="calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={selectedDates.length > 0 ? selectedDates.map((date) => new Date(date)) : []} // Use empty array when no dates are selected
              tileClassName={({ date }) =>
                selectedDates.includes(formatDate(date)) ? "selected-date" : "" // Highlight only selected dates
              }
              selectRange={false} // Prevent selecting date ranges
            />
            <div className="button-group">
              <button onClick={handleApply} className="apply-button">
                Apply
              </button>
              <button onClick={handleClear} className="clear-button">
                Clear
              </button>
            </div>
          </div>

          <div className="events-container">
            {displayedEvents.map((event, index) => {
              const eventDate = new Date(event.date);
              const currentDate = new Date();
              const isExpired = eventDate < currentDate; // Check if the event date is in the past

              return (
                <div key={index} className="event-card">
                  <div className={`event-indicator ${isExpired ? "expired" : "available"}`}></div>
                  <div className="event-date">
                    {event.date} | {event.time}
                  </div>
                  <img src={event.poster} alt={event.title} />
                  <h3>{event.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      )}

{activeTab === "Outreach Events" && (
  <div className="outreach-tab">
    <img
      src="src/assets/logos/Outreach.png"
      alt="Outreach Event"
      className="outreach-image"
    />

    {/* Program Pillars Section */}
    <div className="program-pillars">
      <h3>Program Pillars</h3>
      <div className="pillars-container">
        {/* Pillar 1 */}
        <div className="pillar-box">
          <img
            src="src/assets/logos/OP1.png"
            alt="Pillar 1"
            className="pillar-icon"
          />
          <h4>Community Engagement</h4>
          <p>Fostering connections and building stronger communities.</p>
        </div>
        {/* Pillar 2 */}
        <div className="pillar-box">
          <img
            src="src/assets/logos/OP2.png"
            alt="Pillar 2"
            className="pillar-icon"
          />
          <h4>Education</h4>
          <p>Promoting learning opportunities and knowledge sharing.</p>
        </div>
        {/* Pillar 3 */}
        <div className="pillar-box">
          <img
            src="src/assets/logos/OP3.png"
            alt="Pillar 3"
            className="pillar-icon"
          />
          <h4>Innovation</h4>
          <p>Encouraging creativity and forward-thinking solutions.</p>
        </div>
        {/* Pillar 4 */}
        <div className="pillar-box">
          <img
            src="src/assets/logos/OP4.png"
            alt="Pillar 4"
            className="pillar-icon"
          />
          <h4>Sustainability</h4>
          <p>Focusing on long-term environmental and social impacts.</p>
        </div>
      </div>
    </div>

    {/* Program Pedagogy Section */}
    <div className="program-pedagogy">
      <h3>Program Pedagogy</h3>
      <div className="pedagogy-container">
        {[
          { logo: "src/assets/logos/bootcamp.png", name: "Boot Camp" },
          { logo: "src/assets/logos/hackathon.png", name: "Hackathon" },
          { logo: "src/assets/logos/preinc.png", name: "Pre-Incubation" },
          { logo: "src/assets/logos/startup.png", name: "Startup Creation" },
          { logo: "src/assets/logos/outreach1.png", name: "Outreach" },
          { logo: "src/assets/logos/idea.png", name: "Ideathon" },
          { logo: "src/assets/logos/demo.png", name: "Demo Day" },
          { logo: "src/assets/logos/pitch.png", name: "Pitch Fest" },
        ].map((tile, index) => (
          <div
            key={index}
            className="pedagogy-tile"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <img src={tile.logo} alt={tile.name} className="pedagogy-icon" />
            <h4>{tile.name}</h4>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

      {activeTab === "Register" && (
        <div className="register-tab">
          <h2>Register for Events</h2>
          <p>Registration functionality can be added here.</p>
        </div>
      )}

      {activeTab === "Summary" && (
        <div className="summary-tab">
          <h2>Event Summary</h2>
          <p>Summary details of events can be displayed here.</p>
        </div>
      )}
    </div>
  );
};

export default Events;
