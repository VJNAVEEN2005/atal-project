import React from 'react';
import { Linkedin, Instagram, User } from 'lucide-react';
import { Dr_A_Kalaisselvane, Dr_A_Muthadhi, Dr_B_Hemakumar, Dr_K_Ashok, Dr_N_Sivakumar, Dr_R_Sridar, Dr_S_Jeevananthan } from '../../assets/Team/executiveTeam/images/data';

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
      name: "Dr.A.Muthadhi",
      role: "Member - AICPECF / CE",
      image: Dr_A_Muthadhi
    },
    {
      name: "Dr. A. Kalaisselvane",
      role: "Member - AICPECF / ME",
      image: Dr_A_Kalaisselvane
    },
    {
      name: "Dr. K. Ashok",
      role: "Member - AICPECF / ME",
      image: Dr_K_Ashok
    },
    {
      name: "Dr. S. Tamilselvan",
      role: "Member - AICPECF / ECE"
    },
    {
      name: "Dr.N. Sivakumar",
      role: "Member - AICPECF / CSE",
      image: Dr_N_Sivakumar
    },
    {
      name: "Dr.S.Jeevananthan",
      role: "Member - AICPECF / EEE",
      image: Dr_S_Jeevananthan
    },
    {
      name: "Dr. V. Govindasamy",
      role: "Member - IEDC / IT"
    },
    {
      name: "Dr.R.Sridar",
      role: "Member - AICPECF / CHE",
      image: Dr_R_Sridar
    },
    {
      name: "Dr.B.Hemakumar",
      role: "Member - IEDC / EIE",
      image: Dr_B_Hemakumar
    }
];

const Team = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">AIC-PECF – Executive Committee</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Meet our dedicated team of professionals driving innovation and success
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="group flex flex-col items-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full border-4 overflow-hidden border-[#3F6197]">
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