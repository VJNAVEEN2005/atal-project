import React,{ useState, useEffect }from 'react'


const WhoAmI = () => {
    // State to track selected role, search query, and dropdown visibility
  const [selectedRole, setSelectedRole] = useState("Startups");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false); // Control dropdown visibility
  const [filteredActions, setFilteredActions] = useState([]); // Filtered actions based on search query

  

  // Role-specific actions
  const roleActions = {
    Startups: [
      "Find mentors",
      "Collaborate with investors",
      "Access funding opportunities",
    ],
    Investors: [
      "Discover startups",
      "Invest in innovative ideas",
      "Explore growth markets",
    ],
    "Incubators / Accelerators": [
      "Raise funds for incubators",
      "Mentor early-stage founders",
      "Collaborate with StartupTN",
    ],
    Aspirants: ["Learn startup basics", "Get career guidance", "Find mentors"],
    "Startup Service Provider": [
      "Offer services to startups",
      "Collaborate with StartupTN",
      "Explore partnerships",
    ],
    Student: ["internship", "Event registration", "Service"],
  };

  // Update filtered actions whenever selectedRole or searchQuery changes
  useEffect(() => {
    setSearchQuery(""); // Reset the search query when role changes
    const filtered = roleActions[selectedRole]; // Show all actions for the selected role
    setFilteredActions(filtered);
  }, [selectedRole]); // Run this whenever selectedRole changes

  // Handle the opening and closing of the dropdown
  const handleFocusDropdown = () => {
    setDropdownOpen(true);
  };

  const handleBlurDropdown = () => {
    // Delay the closing of dropdown to avoid immediate loss of focus
    setTimeout(() => {
      setDropdownOpen(false);
    }, 100);
  };

  const handleSelectAction = (action) => {
    setSearchQuery(action); // Set the selected action as the search query
    setDropdownOpen(false); // Close the dropdown
  };


  return (
    <div>
     {/* Who Am I Section */}
      <div className="bg-gray-100 py-10 px-10 mt-4 md:mt-10 md:py-16">
        <div className="flex flex-wrap items-center justify-center gap-8">
          {/* Who Am I? Dropdown */}
          <div className="relative">
            <label className="text-gray-700 font-bold mb-2 block">Who Am I?</label>
            <select
              className="border border-gray-300 rounded-md p-3 bg-white text-gray-600 w-[200px]"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              onFocus={handleFocusDropdown} // Open dropdown when focused
            >
              {Object.keys(roleActions).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* I'm Looking For Section */}
          <div className="relative">
            <label className="text-gray-700 font-bold mb-2 block">I'm Looking for</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-md p-3 bg-white text-gray-600 w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleFocusDropdown} // Open dropdown when focused
                onBlur={handleBlurDropdown} // Close dropdown with delay
              />
              {/* {dropdownOpen && (
                <ul className="absolute mt-1 border border-gray-300 rounded-md bg-white p-4 shadow-md max-h-60 overflow-auto w-full">
                  {filteredActions?.map((action, index) => (
                    <li
                      key={index}
                      className="text-gray-600 py-1 border-b last:border-none"
                      onClick={() => handleSelectAction(action)} // Handle selecting an option
                    >
                      {action}
                    </li>
                  ))}
                </ul>
              )} */}
            </div>
          </div>

          {/* Explore Button */}
          <button className="bg-[#12283c] text-white py-3 px-6 rounded-md font-bold hover:bg-[#ccc] hover:text-black">
            Explore
          </button>
        </div>
      </div>
    </div>
  )
}

export default WhoAmI;