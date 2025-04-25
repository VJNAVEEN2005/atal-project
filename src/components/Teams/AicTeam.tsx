import React, { useEffect, useState } from "react";
import { Linkedin, Mail, User } from "lucide-react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import api from "../../Api/api";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
  email?: string;
  team: string;
}

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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
                src={`${api.web}api/v1/team/image/${member._id}`}
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
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-200">
                  <Linkedin size={24} className="text-white hover:text-[#0077b5] transition-colors duration-200" />
                </a>
              )}
              {member.email && (
                <a href={`mailto:${member.email}`} className="hover:scale-110 transition-transform duration-200">
                  <Mail size={24} className="text-white hover:text-[#E4405F] transition-colors duration-200" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
        {member.role.split(",").map((item, index) => {
          return <p key={index} className="text-sm text-gray-500">{item}</p>
        })}
      </div>
    </div>
  );
};

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Core Team");
  const [error, setError] = useState<string | null>(null);

  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api.web}api/v1/team`);
        setTeamMembers(response.data.team);
        setError(null);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Failed to load team members. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Filter team members based on active tab
  const filteredMembers = teamMembers.filter(
    (member) => member.team === activeTab
  );

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

        <div className="flex justify-center mt-10 space-x-4">
          {["Core Team", "Executive Team"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab 
                  ? 'bg-[#3F6197] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 text-red-800 rounded-lg text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-12">
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-48 h-48">
                    <Skeleton circle height="100%" containerClassName="w-full h-full" />
                  </div>
                  <div className="mt-4 w-40">
                    <Skeleton height={24} width="100%" />
                    <Skeleton height={18} width="80%" style={{ marginTop: 8 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              {activeTab}
            </h3>
            {filteredMembers.length === 0 ? (
              <div className="text-center py-12 bg-blue-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-400 mb-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No team members available</h3>
                <p className="text-gray-500">There are currently no members in this team.</p>
              </div>
            ) : (
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMembers.map((member, index) => (
                  <TeamMemberCard key={member._id || index} member={member} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;