import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(0);
  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAuthenticated") || 0);
  }, []);
  const navigate = useNavigate();

  const adminControls = [
    {
      name: "Events Control",
      link: "/admin/eventscontrol",
      icon: "📅", // Keep calendar icon
    },
    {
      name: "Newsletter Control",
      link: "/admin/newslettercontrol",
      icon: "📧", // Keep email icon
    },
    {
      name: "Press Media Coverage Control",
      link: "/admin/presscontrol",
      icon: "📰", // Keep newspaper icon
    },
    {
      name: "Road Map Control",
      link: "/admin/roadmapcontrol",
      icon: "🗺️", // Changed to map icon
    },
    {
      name: "Teams Control",
      link: "/admin/teamscontrol",
      icon: "👥", // Changed to people icon
    },
     {
      name: "Startup Details Control",
      link: "/admin/startupdetailscontrol",
      icon: "📝", // Changed to document icon
    },
  ];

  const mainAdminControls = [
    {
      name: "Admin Control",
      link: "/admin/admincontrol",
      icon: "⚙️", // Changed to settings icon
    },
    {
      name: "Tenders Control",
      link: "/admin/tenderscontrol",
      icon: "📝", // Changed to document icon
    },
   
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2e4a76] to-[#3f6197] px-6 py-8 flex justify-between items-center">
          <div>
            <h1 className="font-bold text-3xl md:text-4xl text-white">Admin Dashboard</h1>
            <p className="text-blue-100 mt-1">Manage your site content and settings</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="font-semibold text-[#3f6197]">A</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8">
          {/* Main Admin Access */}
          {isAdmin === "1" && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-2xl text-gray-800">
                  Main Admin Access
                </h2>
                <button
                  className="bg-[#3f6197] hover:bg-[#2e4a76] transition-colors text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow-md"
                  onClick={() => navigate("/admin/main")}
                >
                  <span>Go To Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="bg-[#eef2f8] p-6 rounded-xl border border-[#d1ddf0] shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="bg-[#d1ddf0] p-4 rounded-lg shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-[#3f6197]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-gray-800">
                      Administrative Controls
                    </h3>
                    <p className="text-gray-500">
                      Manage core settings, user permissions, and site configuration
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {mainAdminControls.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(item.link)}
                    className="bg-white border border-gray-200 hover:border-[#3f6197] hover:bg-[#eef2f8] transition-all duration-300 rounded-xl p-6 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl bg-[#eef2f8] h-14 w-14 flex items-center justify-center rounded-lg text-[#3f6197] shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg text-gray-800">{item.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-[#3f6197] mt-2 font-medium">
                          <span>Manage</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* All Admin Controls */}
          <div>
            <h2 className="font-semibold text-2xl text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-[#3f6197] rounded-full block"></span>
              Control Panels
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminControls.map((item, index) => (
                <div
                  key={index}
                  onClick={() => navigate(item.link)}
                  className="bg-white border border-gray-200 hover:border-[#3f6197] hover:bg-[#eef2f8] transition-all duration-300 rounded-xl p-6 cursor-pointer shadow-md hover:shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl bg-[#eef2f8] h-14 w-14 flex items-center justify-center rounded-lg text-[#3f6197] shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-gray-800">{item.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-[#3f6197] mt-2 font-medium">
                        <span>Manage</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
       
      </div>
    </div>
  );
};

export default Admin;