import React, { useState } from "react";
import { FileText, Users, UserCheck, BarChart, TrendingUp, ChevronRight } from "lucide-react";
import about from "../../assets/Programs/StartupSprouting/about.png";
import logo from "../../assets/Programs/StartupSprouting/image.png";
import target from "../../assets/Programs/StartupSprouting/targetStage.png";
import outcome from "../../assets/Programs/StartupSprouting/outcome.png";

const implementationPhases = [
  {id: 1, text: "Program Design", borderColor: "border-green-600", textColor: "text-green-600", icon: <FileText className="w-6 h-6" />},
  {id: 2, text: "Participants", borderColor: "border-blue-500", textColor: "text-blue-500", icon: <Users className="w-6 h-6" />},
  {id: 3, text: "Mentors-Mentee Connect", borderColor: "border-orange-500", textColor: "text-orange-500", icon: <UserCheck className="w-6 h-6" />},
  {id: 4, text: "Input-Outcome-Impact Mapping", borderColor: "border-pink-500", textColor: "text-pink-500", icon: <BarChart className="w-6 h-6" />},
  {id: 5, text: "Success Metrics", borderColor: "border-purple-500", textColor: "text-purple-500", icon: <TrendingUp className="w-6 h-6" />},
];

const startups = [
  { name: "Movilti", description: "Urban mobility solutions" },
  { name: "Nevar Systems", description: "IoT-enabled hardware" },
  { name: "Future Gurukuls", description: "EdTech innovations" },
  { name: "FlowGet", description: "Supply chain management" },
  { name: "Oli", description: "Renewable energy solutions" },
  { name: "Warar Energy", description: "Energy optimization platform" }
];

const Startup_Sprouting = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "structure", label: "Program Structure" },
    { id: "mentorship", label: "Mentorship" },
    { id: "startups", label: "Startups" },
    { id: "outcomes", label: "Outcomes" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <header className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 p-8 flex justify-center items-center bg-gradient-to-br from-orange-50 to-orange-100">
              <div className="w-50 h-50 rounded-sm overflow-hidden shadow-xl border-4 border-white transition-transform duration-300 hover:scale-105">
                <img src={logo} alt="Startup Sprouting Logo" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-2/3 p-8 flex flex-col justify-center">
              <div className="mb-4">
                <p className="text-green-600 text-sm font-medium tracking-wider">MENTOR CONNECT SERIES</p>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Startup Sprouting</h1>
                <p className="text-gray-600 mt-2">Powered by AIC-PEC Foundation</p>
              </div>
              <p className="text-gray-700 my-4 max-w-xl">
                A 12-month structured mentorship program guiding startups from MVP to Go-To-Market, hosted by Puducherry Technological University and supported by Atal Innovation Mission, NITI Aayog.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Electronics Design", "UAV Technology", "IoT"].map((tag, idx) => (
                  <span key={idx} className="bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded-full font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-orange-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview */}
            {activeTab === "overview" && (
              <section className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Program</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-gray-700 mb-4">
                      Atal Incubation Centre - PEC Foundation is an initiative that focuses on nurturing innovative startups in specialized technology domains:
                    </p>
                    <ul className="space-y-2">
                      {["Electronics Design & Manufacturing", "Unmanned Aerial Vehicles", "Internet of Things", "AI / ML", "Robotics"].map((item, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <ChevronRight className="w-4 h-4 text-orange-500 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-105">
                      <img src={about} alt="About" className="w-full h-auto object-cover" />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Program Structure */}
            {activeTab === "structure" && (
              <section className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Program Structure</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-gray-700 mb-4">
                      A comprehensive 12-month program designed to transform early-stage startups through structured mentorship and milestone-based progress tracking.
                    </p>
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                      <h3 className="font-semibold text-orange-600 mb-2">Key Features</h3>
                      <ul className="space-y-2">
                        {["Milestone tracking", "Self-matching mentorship", "Quarterly assessments", "Industry expert guidance"].map((item, idx) => (
                          <li key={idx} className="flex items-center text-gray-700">
                            <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Target Stage</h3>
                    <div className="rounded-lg overflow-hidden shadow-md">
                      <img src={target} alt="Target Stage" className="w-full h-auto" />
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-4">5-Phase Implementation</h3>
                <div className="space-y-4">
                  {implementationPhases.map((phase) => (
                    <div
                      key={phase.id}
                      className={`flex items-center border-l-4 ${phase.borderColor} rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300`}
                    >
                      <div className={`w-12 h-12 flex justify-center items-center border-2 ${phase.borderColor} rounded-full bg-white`}>
                        {phase.icon}
                      </div>
                      <div className="bg-gray-50 px-4 py-3 ml-4 flex-grow rounded-md">
                        <p className={`text-lg font-medium ${phase.textColor}`}>
                          {phase.text}
                        </p>
                      </div>
                      <div className="ml-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full text-sm font-medium text-gray-800">
                          {phase.id}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Mentorship */}
            {activeTab === "mentorship" && (
              <section className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Mentorship Program</h2>
                
                <div className="bg-blue-50 p-5 rounded-lg mb-6 border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-blue-600 mb-2">Mentorship Benefits</h3>
                  <p className="text-gray-700 mb-3">
                    Connecting startups with industry experts for technical and functional mentoring.
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["Pro-bono or consulting model", "4-8 hours/month engagement", "Flexible mentor selection"].map((item, idx) => (
                      <li key={idx} className="flex items-center bg-white p-2 rounded shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Mentors */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-blue-600 mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      For Mentors
                    </h3>
                    <ul className="space-y-2">
                      {["Networking with Innovative Startups", "Recognized Advisor", "Contribution towards Atma Nirbhar Bharat", "Dedicated & Innovative in Nature", "Gaining New Perspectives"].map((item, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mentees */}
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-5 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-orange-500 mb-3 flex items-center">
                      <UserCheck className="w-5 h-5 mr-2" />
                      For Mentees
                    </h3>
                    <ul className="space-y-2">
                      {["Learn the Workspace Culture", "Enhance Skill Development", "Network Opportunities", "Potential for Promotion", "Problem-Solving", "Knowledge Transfer"].map((item, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mentorship Sector */}
                  <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
                      Mentorship Sectors
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {["Electronics Design & Manufacturing", "Internet of Things", "Drone Technology (UAV)", "AI / ML", "Machine Learning", "Robotics", "Renewable Energy", "AR / VR Computer Vision", "Agricultural Technology", "EV Battery Technology"].map((item, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mentorship Domain */}
                  <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">
                      Mentorship Domains
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {["Product Development", "Business Development", "Go-to-Market", "Digital Marketing", "Accounts & Finance", "Investment & Valuation", "Pitching", "Compliance & Legal", "Human Resources"].map((item, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Startups */}
            {activeTab === "startups" && (
              <section className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Startups</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {startups.map((startup, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-orange-200 flex items-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 text-white flex items-center justify-center font-bold text-xl mr-4">
                        {startup.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{startup.name}</h3>
                        <p className="text-sm text-gray-600">{startup.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Outcomes */}
            {activeTab === "outcomes" && (
              <section className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Program Outcomes and Impact</h2>
                <div className="mb-6">
                  <p className="text-gray-700 mb-4">
                    The Startup Sprouting program aims to create sustainable impact through structured mentorship and support mechanisms.
                  </p>
                  <div className="rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-105">
                    <img src={outcome} alt="Program Outcomes" className="w-full h-auto" />
                  </div>
                </div>
                
                
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Apply Now Card */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Join the Program</h3>
              <p className="mb-4 opacity-90">Applications open for our next cohort. Submit your startup profile today.</p>
              <button className="w-full py-2 px-4 bg-white text-orange-600 font-medium rounded-lg hover:bg-orange-50 transition-colors duration-300">
                Apply Now
              </button>
            </div>

            

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
              <div className="space-y-3">
                <p className="text-gray-700">Have questions about the program? Reach out to our team.</p>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Email:</span>
                  <a href="mailto:info@aic-pec.org" className="text-blue-600 hover:underline">ceo@aicpecf.org</a>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="font-medium mr-2">Phone:</span>
                  <a href="tel:+918046872345" className="text-blue-600 hover:underline">+91 8903467223</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Startup_Sprouting;