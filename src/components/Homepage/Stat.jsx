import React from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faGraduationCap, faUsers,faUser, faDollarSign, faHandshake, faMessage, faBuilding, faSchool, faFile, faBriefcase, faEarthAsia } from '@fortawesome/free-solid-svg-icons';


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

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    background-color:#F5F5F5;
`;

const StatContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const StatIcon = styled.div`
    font-size: 3rem;
    color: #3F6197;
    margin-bottom: 0.5rem;
`;

const StatNumber = styled.span`
    font-size: 2.5rem;
    font-weight: bold;
    color:#12283c ;
`;

const StatDescription = styled.span`
    font-size: 1.125rem;
    color: black; 
`;

const App = () => {
    return (
        <div className="max-w-full bg-gray-100 mx-auto mt-12 p-5 pt-10">
      <h1 className="inline-block bg-[#12283c] text-white px-5 py-2.5 rounded-full font-bold mb-10">
        ECOSYSTEM IMPACT
      </h1>
        <Wrapper>
            {stats.map((stat, index) => (
                <StatItem
                    key={index}
                    number={stat.number}
                    description={stat.description}
                    icon={stat.icon}
                />
            ))}
        </Wrapper>
        </div>
    );
};

const StatItem = ({ number, description, icon }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    return (
        <StatContainer ref={ref}>
            <StatIcon>
                <FontAwesomeIcon icon={icon} />
            </StatIcon>
            <StatNumber>
                {inView ? <CountUp start={0} end={number} duration={2} /> : 0}
            </StatNumber>
            <StatDescription>{description}</StatDescription>
        </StatContainer>
    );
};

export default App;
