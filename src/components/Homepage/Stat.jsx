import React from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faGraduationCap, faUsers, faUser, faDollarSign, faHandshake, faMessage, faBuilding, faSchool, faFile, faBriefcase, faEarthAsia } from '@fortawesome/free-solid-svg-icons';

const stats = [
  { number: 2500, description: "Registered Members", icon: faUser },
  { number: 75, description: "Start-ups Supported", icon: faRocket },
  { number: 35, description: "Mentors On-board", icon: faMessage },
  { number: 25, description: "Industrial Partnership", icon: faBuilding },
  { number: 15, description: "Academic Partnership", icon: faSchool },
  { number: 15, description: "Industry Consulting Projects", icon: faFile },
  { number: 8, description: "MSMEs Supported", icon: faBriefcase },
  { number: 1375, description: "Outreach Initiatives Events", icon: faEarthAsia },
  { number: 67, description: "No. of Startups", icon: faRocket },
  { number: 12, description: "Startups Graduated", icon: faGraduationCap },
  { number: 250, description: "Employment Generated", icon: faUsers },
  { number: 92, description: "Corps Fund", icon: faDollarSign },
  { number: 92, description: "CSR Secured", icon: faHandshake },
];

const StatItem = ({ number, description, icon }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref} 
      className="flex flex-col items-center p-3 sm:p-4 bg-white rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="text-[#3F6197] mb-1 sm:mb-2 bg-blue-50 p-2 sm:p-3 md:p-4 rounded-full">
        <FontAwesomeIcon icon={icon} className="text-xl sm:text-2xl md:text-3xl" />
      </div>
      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#12283c] mt-1 sm:mt-2">
        {inView ? <CountUp start={0} end={number} duration={2} /> : 0}
      </div>
      <div className="text-xs sm:text-sm md:text-base text-gray-700 mt-1 text-center font-medium leading-tight">
        {description}
      </div>
    </div>
  );
};

const EcosystemImpact = () => {
  return (
    <div className="w-full bg-gray-50 py-8 sm:py-12 px-2 sm:px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8 sm:mb-12">
          <h1 className="inline-block bg-[#12283c] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg md:text-xl relative">
            ECOSYSTEM IMPACT
            
          </h1>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              number={stat.number}
              description={stat.description}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcosystemImpact;