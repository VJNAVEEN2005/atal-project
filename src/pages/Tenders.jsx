import React, { useEffect, useState } from "react";
import axios from "axios";

function Tenders() {
  const [tenders, setTenders] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tenders")
      .then((response) => {
        setTenders(response.data); // Update tenders with response data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tenders:", error);
        setTenders([]); // Fallback to an empty array
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading tenders...</div>; // Display while loading
  }

  if (!Array.isArray(tenders)) {
    return <div>Error: Tenders data is not an array!</div>; // Handle invalid data
  }

  return (
    <div>
      <h1>Tenders</h1>
      {tenders.length === 0 ? (
        <p>No tenders available.</p> // Handle case with no tenders
      ) : (
        <ul>
          {tenders.map((tender) => (
            <li key={tender.id}>
              <h2>{tender.title}</h2>
              <p>{tender.description}</p>
              <p>Expires on: {new Date(tender.expiryDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tenders;
