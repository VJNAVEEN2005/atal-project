import React, { useEffect, useState } from "react";
import { Linkedin, Mail, User } from "lucide-react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  Gerald_Director,
  Iyonstan_GET,
  Kamesh_IM,
  Parthiban_MTS,
  Rajkumar_COO,
  Sundhara_Moorthy_Director,
  Udhaya_PE,
  Vishnu_CEO,
} from "../../assets/Team/coreTeam/images/coreTeamImage";
import {
  Dr_A_Kalaisselvane,
  Dr_A_Muthadhi,
  Dr_B_Hemakumar,
  Dr_K_Ashok,
  Dr_N_Sivakumar,
  Dr_R_Sridar,
  Dr_S_Jeevananthan,
  Dr_S_Tamilselvan,
  Dr_V_Govindasamy,
} from "../../assets/Team/executiveTeam/images/data";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
  email?: string;
}

const TeamMemberCard = ({ member }: { member: TeamMember }, {index}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  console.log(index);

  return (
    <div className="group flex flex-col items-center">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#3F6197]">
          {member.image && !imageError ? (
            <>
              {/* Skeleton loader */}
              {!imageLoaded && (
                <div className="absolute inset-0">
                  <Skeleton circle height="100%" containerClassName="w-full h-full" />
                </div>
              )}
              <img
                src={member.image}
                alt={member.name}
                className={`w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full">
              <User size={48} className="text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center rounded-full">
            <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <a href={member.linkedin} target="_blank" className="hover:scale-110 transition-transform duration-200">
                <Linkedin size={24} className="text-white hover:text-[#0077b5] transition-colors duration-200" />
              </a>
              <a href={`mailto:${member.email}`} className="hover:scale-110 transition-transform duration-200">
                <Mail size={24} className="text-white hover:text-[#E4405F] transition-colors duration-200" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
         
            <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
            {member.role.split(",").map((item,index)=>{
              return <p key={index} className="text-sm  text-gray-500">{item}</p>
            })}
            
         
     
      </div>
    </div>
  );
};

const teamMembers: TeamMember[] = [
  {
    name: "Dr. G Gerald Moses",
    role: "Director",
    image: Gerald_Director,
  },
  {
    name: "Dr. R Sundaramurthy",
    role: "Executive Director",
    image: Sundhara_Moorthy_Director,
  },
  {
    name: "Mr. V Vishnu Varadan",
    role: "Chief Executive Officer",
    image: Vishnu_CEO,
    linkedin: "https://www.linkedin.com/in/vishnuvaradan/?originalSubdomain=in",
    email: "ceo@aicpecf.org"
  },
  {
    name: "Mr. S Rajakumar",
    role: "Chief Operating Officer",
    image: Rajkumar_COO,
  },
  {
    name: "Mr. S Kameswaran",
    role: "Incubation Manager",
    image: Kamesh_IM,
  },
  {
    name: "Mr. T Uthaya Kumar",
    role: "Program Executive",
    image: Udhaya_PE,
  },
  {
    name: "Mr. Iyonstan",
    role: "Embedded System Intern",
    image: Iyonstan_GET,
  },
  {
    name: "Mr. R Parthiban",
    role: "Tech Assistant",
    image: Parthiban_MTS,
  },
  {
    name: "Dr.A.Muthadhi",
    role: "Associate Professor, Dept of Civil Engineering, Puducherry Technological University",
    image: Dr_A_Muthadhi,
  },
  {
    name: "Dr. A. Kalaisselvane",
    role: "Member - AICPECF / ME",
    image: Dr_A_Kalaisselvane,
  },
  {
    name: "Dr. K. Ashok",
    role: "Member - AICPECF / ME",
    image: Dr_K_Ashok,
  },
  {
    name: "Dr. S. Tamilselvan",
    role: "Member - AICPECF / ECE",
    image: Dr_S_Tamilselvan
  },
  {
    name: "Dr.N. Sivakumar",
    role: "Member - AICPECF / CSE",
    image: Dr_N_Sivakumar,
  },
  {
    name: "Dr.S.Jeevananthan",
    role: "Member - AICPECF / EEE",
    image: Dr_S_Jeevananthan,
  },
  {
    name: "Dr. V. Govindasamy",
    role: "Member - IEDC / IT",
    image: Dr_V_Govindasamy
  },
  {
    name: "Dr.R.Sridar",
    role: "Member - AICPECF / CHE",
    image: Dr_R_Sridar,
  },
  {
    name: "Dr.B.Hemakumar",
    role: "Member - IEDC / EIE",
    image: Dr_B_Hemakumar,
  },
];

const Team = () => {
  const coreTeamRoles = [
    "Director",
    "Executive Director",
    "Chief Executive Officer",
    "Chief Operating Officer",
    "Incubation Manager",
    "Program Executive",
    "Graduate Engineer Intern",
    "Tech Assistant",
    "Embedded System Intern",
  ];

  const coreTeam = teamMembers.filter((member) =>
    coreTeamRoles.includes(member.role)
  );
  const executiveTeam = teamMembers.filter(
    (member) => !coreTeamRoles.includes(member.role)
  );

  const [activeTab, setActiveTab] = useState("Core Team");
  const [observed, setObserved] = useState(false);

  const observeTiles = () => {
    const tiles = document.querySelectorAll(".pedagogy-tile");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    tiles.forEach((tile) => {
      observer.observe(tile);
    });
  };

  useEffect(() => {
    if (!observed) {
      observeTiles();
      setObserved(true);
    }
  }, [observed]);

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            AIC-PECF – TEAM MEMBERS
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Meet our dedicated team of professionals driving innovation and success
          </p>
        </div>

        <div className="tabs mt-10">
          {["Core Team", "Executive Team"].map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Core Team" && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Core Team
            </h3>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {coreTeam.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "Executive Team" && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Executive Team
            </h3>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {executiveTeam.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;