import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faGraduationCap,
  faUsers,
  faUser,
  faDollarSign,
  faHandshake,
  faMessage,
  faBuilding,
  faSchool,
  faFile,
  faBriefcase,
  faEarthAsia,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchEcosystem } from "../../Redux/slice/ecosystemSlice";

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
        <FontAwesomeIcon
          icon={icon}
          className="text-xl sm:text-2xl md:text-3xl"
        />
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
  const dispatch = useDispatch();
  const {
    data: ecosystemData,
    loading,
    error,
  } = useSelector((state) => state.ecosystem);

  // Define stats configuration with API data mapping
  const statsConfig = [
    {
      key: "registeredMembers",
      description: "Registered Members",
      icon: faUser,
    },
    {
      key: "startupsSupported",
      description: "Start-ups Supported",
      icon: faRocket,
    },
    { key: "mentorsOnBoard", description: "Mentors On-board", icon: faMessage },
    {
      key: "industrialPartnerships",
      description: "Industrial Partnership",
      icon: faBuilding,
    },
    {
      key: "academicPartnerships",
      description: "Academic Partnership",
      icon: faSchool,
    },
    {
      key: "industryConsultingProjects",
      description: "Industry Consulting Projects",
      icon: faFile,
    },
    { key: "msmeSupport", description: "MSMEs Supported", icon: faBriefcase },
    {
      key: "outreachInitiativesEvents",
      description: "Outreach Initiatives Events",
      icon: faEarthAsia,
    },
    { key: "numberOfStartups", description: "No. of Startups", icon: faRocket },
    {
      key: "startupsGraduated",
      description: "Startups Graduated",
      icon: faGraduationCap,
    },
    {
      key: "employmentGenerated",
      description: "Employment Generated",
      icon: faUsers,
    },
    { key: "corpsFund", description: "Corps Fund", icon: faDollarSign },
    { key: "csrSecured", description: "CSR Secured", icon: faHandshake },
  ];

  useEffect(() => {
    if (!ecosystemData) {
      dispatch(fetchEcosystem());
    }
  }, [dispatch]);

  // Retry function for failed requests
  const handleRetry = () => {
    dispatch(fetchEcosystem());
  };

  if (error) {
    return (
      <div className="w-full bg-gray-50 py-8 sm:py-12 px-2 sm:px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-8 sm:mb-12">
            <h1 className="inline-block bg-[#12283c] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg md:text-xl relative">
              ECOSYSTEM IMPACT
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-red-500 mb-4">
              <FontAwesomeIcon icon={faUsers} className="text-4xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Unable to load ecosystem data
            </h3>
            <p className="text-gray-500 mb-4">
              {error || "There was an error fetching the latest statistics."}
            </p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-[#3F6197] text-white rounded-lg hover:bg-[#2c4b79] transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 py-8 sm:py-12 px-2 sm:px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8 sm:mb-12">
          <h1 className="inline-block bg-[#12283c] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-base sm:text-lg md:text-xl relative">
            ECOSYSTEM IMPACT
          </h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
            {statsConfig.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 sm:p-4 bg-white rounded-lg shadow-md"
              >
                <div className="text-[#3F6197] mb-1 sm:mb-2 bg-blue-50 p-2 sm:p-3 md:p-4 rounded-full">
                  <FontAwesomeIcon
                    icon={stat.icon}
                    className="text-xl sm:text-2xl md:text-3xl"
                  />
                </div>
                <div className="animate-pulse bg-gray-200 h-6 w-16 rounded mt-1 sm:mt-2"></div>
                <div className="animate-pulse bg-gray-200 h-4 w-24 rounded mt-1"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
            {statsConfig.map((stat, index) => (
              <StatItem
                key={index}
                number={ecosystemData?.[stat.key] || 0}
                description={stat.description}
                icon={stat.icon}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EcosystemImpact;
