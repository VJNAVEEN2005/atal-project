import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const adminControls = [
    {
      name: "Events Control",
      link: "/admin/eventscontrol",
      icon: "📅"
    },
    {
      name: "Newsletter Control",
      link: "/admin/newslettercontrol",
      icon: "📧"
    },
    {
      name: "Press Media Coverage Control",
      link: "/admin/presscontrol",
      icon: "📰"
    },
    {
        name:"Tenders Control",
        link:"/admin/tenderscontrol",
        icon:"T"
    },
    {
        name:"Road Map Control",
        link:"/admin/roadmapcontrol",
        icon:"T"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3f6197] to-[#5477b1] px-8 py-6 flex justify-between items-center">
          <h1 className="font-bold text-3xl text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
              <span className="font-semibold text-[#3f6197]">A</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Main Admin Access */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-2xl text-gray-800">Main Admin Access</h2>
              <button 
                className="bg-[#3f6197] hover:bg-[#2e4a76] transition-colors text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
                onClick={() => navigate("/admin/main")}
              >
                <span>Go To Page</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#3f6197]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-lg text-gray-800">Administrative Controls</h3>
                  <p className="text-gray-500">Manage core settings, user permissions, and site configuration</p>
                </div>
              </div>
            </div>
          </div>

          {/* All Admin Controls */}
          <div>
            <h2 className="font-semibold text-2xl text-gray-800 mb-6">Control Panels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminControls.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => navigate(item.link)}
                  className="bg-white border border-gray-100 hover:border-[#3f6197] transition-colors rounded-xl p-6 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl bg-[#eef2f8] h-12 w-12 flex items-center justify-center rounded-lg text-[#3f6197]">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-[#3f6197] mt-1">
                        <span>Manage</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
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