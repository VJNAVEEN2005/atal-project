import React from 'react';
import { Linkedin, Instagram, User } from 'lucide-react';
import { Gerald_Director, Iyonstan_GET, Kamesh_IM, Parthiban_MTS, Rajkumar_COO, Sundhara_Moorthy_Director, Udhaya_PE, Vishnu_CEO } from '../../assets/Team/coreTeam/images/coreTeamImage';

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
      name: "Dr. G Gerald Moses",
      role: "Director",
      image: Gerald_Director
    },
    {
      name: "Dr. R Sundaramurthy",
      role: "Executive Director",
      image: Sundhara_Moorthy_Director
    },
    {
      name: "Mr. V Vishnu Varadan",
      role: "Chief Executive Officer",
      image: Vishnu_CEO
    },
    {
      name: "Mr. S Rajakumar",
      role: "Chief Operating Officer",
      image: Rajkumar_COO
    },
    {
      name: "Mr. S Kameswaran",
      role: "Incubation Manager",
      image: Kamesh_IM
    },
    {
      name: "Mr. T Uthaya Kumar",
      role: "Program Executive",
      image: Udhaya_PE
    },
    {
      name: "Mr. Iyonstan",
      role: "Embedded System Intern",
      image: Iyonstan_GET
    },
    {
      name: "Mr. R Parthiban",
      role: "Tech Assistant",
      image: Parthiban_MTS
    },
  
];

const Team = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">AIC-PECF – Core Team</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Meet our dedicated team of professionals driving innovation and success
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="group flex flex-col items-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full border-4 border-[#3F6197] overflow-hidden">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full">
                      <User size={48} className="text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center rounded-full">
                    <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <a href="#" className="hover:scale-110 transition-transform duration-200">
                        <Linkedin 
                          size={24} 
                          className="text-white hover:text-[#0077b5] transition-colors duration-200"
                        />
                      </a>
                      <a href="#" className="hover:scale-110 transition-transform duration-200">
                        <Instagram 
                          size={24} 
                          className="text-white hover:text-[#E4405F] transition-colors duration-200"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;