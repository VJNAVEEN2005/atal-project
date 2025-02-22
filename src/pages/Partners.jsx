import React, { useState } from 'react';
import { useRef } from 'react';
import { Building2, Network, Lightbulb, Handshake, GraduationCap, User, X, Linkedin,Mail  } from 'lucide-react';
import {nitLogo,ifetlogo,pip,river,rj,smvec,achariya,balaji,chirst,kingston,krisiinasamy,mit,motilal,nandha,pajancoa,psg,pvkk,sctr,sri,lecole,tripura
} from '../assets/Partnerspage/Academic/AcadamicPartner';
import {di,digi,Easy,idea,kris,ktech,lucas,re,schneider,tele,touch,zoho,ip,periyar,raksha,tally, startup,aic,appasamy,artilab,beehive,boudiik,conf,socio,startupBuddy,eagle10,mr,puthra,uav
} from '../assets/Partnerspage/Corporate/CooperatePartner';
const images = import.meta.glob('../assets/Partnerspage/Mentors/*.jpg', { eager: true });

const getImage = (name) => {
  return images[`../assets/Partnerspage/Mentors/${name}.jpg`]?.default ;
};

function App() {
  const [activeSection, setActiveSection] = useState('Academic');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const dialogRef = useRef(null);

  const partnerSections = [
    { name: 'Academic', icon: <GraduationCap className="w-6 h-6" />, path: 'Academic' },
    { name: 'Corporate', icon: <Handshake className="w-6 h-6" />, path: 'Corporate' },
    { name: 'IP Partners', icon: <Lightbulb className="w-6 h-6" />, path: 'IP Supporters' },
    { name: 'Mentors', icon: <Network className="w-6 h-6" />, path: 'Mentors' },
    { name: 'Investment', icon: <Building2 className="w-6 h-6" />, path: 'Investment' }
  ];

  const academicPartners = [
    { name: 'NIT Karaikal', logo: nitLogo },
    { name: 'IFET College of Engineering', logo: ifetlogo },
    { name: 'PAJANCOA & RI Karaikal', logo: pip },
    { name: 'Rajiv Gandhi Institute of Veterinary Education and Research (River)', logo: river },
    { name: 'Dr. B. R. Ambedkar Polytechnic College Yanam', logo: rj },
    { name: 'Sri Manakula Vinayagar Engineering College', logo: smvec },
    { name: 'Achariya Educational Public Trust', logo: achariya },
    { name:'BALAJI COLLEGE OF PHARMACY',logo:balaji},
    { name:'CHRIST COLLEGE OF ENGINEERING AND TECIINOLOGY',logo:chirst},
    { name:'KINGSTON Engineering College',logo:kingston},
    { name:'Krisiinasamy College of Engineering & Technology, CUDDALORE',logo:krisiinasamy},
    { name:'Manakula Vinayagar Institute of Technology',logo:mit},
    { name:'Motilal Nehru Government Polytechnic College',logo:motilal},
    { name:'Nandha Engineering College',logo:nandha},
    { name:'PAJANCOA & RI',logo:pajancoa},
    { name:'PSG POLYTECHNUC COLLEGE',logo:psg},
    { name:'PVKK INSTITUTE OF TECHNOLOGY',logo:pvkk},
    { name:'SCTR_S PUNE ISNTITUTE OF_COMPUTER TECHNOLOGY',logo:sctr},
    { name:'SRI Venkateshwaraa College of Engineering & Technology',logo:sri},
    { name:'Study Lecole Internationale',logo:lecole},
    { name:'Tripura Institute of Technology',logo:tripura}
  ];
  
  const corporatePartners = [
    { name: 'Zoho Corporation', logo: zoho },
    { name: 'Schneider Electric', logo: schneider },
    { name: 'Digi Electronics', logo: digi },
    { name: 'Idea Labs', logo: idea },
    { name: 'Krisp Technologies', logo: kris },
    { name: 'KTech Innovation Hub', logo: ktech },
    { name: 'Lucas TVS', logo: lucas },
    { name: 'Renewable Energy Solutions', logo: re },
    { name: 'Telemedia Solutions', logo: tele },
    { name: 'Touch Enterprises', logo: touch },
    { name: 'Easy Tech', logo: Easy },
    { name: 'DI Corporation', logo: di },
    { name: '4A IP Solutions', logo: ip },
    { name: 'Periyar Technology Business Incubator', logo: periyar },
    { name:'Raksha Agarwal and Associates',logo:raksha},
    { name:'Tally Solutions Private Limited',logo:tally},
    { name:'10000 Startup',logo:startup},
    { name:'AIC-Great Lakes Balachandran Foundation',logo:aic},
    { name:'APPASAMY OCULAR DEVICES PVT LTD',logo:appasamy},
    { name:'Artilab Foundation',logo:artilab},
    { name:'Boudiiik Ventures Pvt Ltd',logo:boudiik},
    { name:'Beehive Capital Advisor',logo:beehive},
    { name:'Confederation of Indian Industries',logo:conf},
    { name:'Sociocharge ',logo:socio},
    { name:'Startup Buddy Services Pvt Ltd',logo:startupBuddy},
    { name: 'Eagle Ventures', logo: eagle10 },
    { name:'Mr Steel Corporation Pvt Ltd',logo:mr},
    { name:'Puthran and Associates',logo:puthra},
    { name:'UAV Sysytems Pvt Ltd',logo:uav},
    
  ];
  
  const ipPartners = [
    { name: 'Facebook Research', logo: 'https://via.placeholder.com/150?text=FB' },
    { name: 'Google AI', logo: 'https://via.placeholder.com/150?text=Google' },
    { name: 'Microsoft Labs', logo: 'https://via.placeholder.com/150?text=MS' },
    { name: 'OpenAI', logo: 'https://via.placeholder.com/150?text=OpenAI' }
  ];
  
  const mentorPartnersDetailed = [
    {
      name: 'Ms. Vaishali Chandrakant Shelar',
      logo: getImage('Ms Vaishali Chandrakant Shelar'),
      role: 'ATL Manager',
      expertise: ['HR', 'Business Administration'],
      Company_name: 'HOPE FOUNDATION',
      type: 'Network',
      mail:'vaishalishelar7@gmail.com',
      linkedin:'https://www.linkedin.com/in/vaishali-shelar-625678150/'
    },
    {
      name: 'Dr. S. Karthikrajan',
      logo: getImage('Dr S Karthikrajan'),
      role: 'Research Advisor - Product Development',
      expertise: ['Product Development', 'Management'],
      Company_name: 'REVOLTAXE INDIA PVT LTD',
      type: 'Network',
      linkedin:'https://www.linkedin.com/in/karthikrajansenthilnathan/',
      mail:'skarthikrajan@live.com'
    },
    {
      name: 'Mr. Saurabh Trivedi',
      logo: getImage('Mr Saurabh Trivedi'),
      role: 'Co-Founder & Director',
      expertise: ['Intellectual Property'],
      Company_name: 'Boudhik Ventures Pvt. Ltd.',
      type: 'Network',
      linkedin:'https://www.linkedin.com/in/saurabh-trivedi',
      mail:'saurabh@boudhikventures.com'
    },
    {
      name: 'Mr. R Ananda Natrajan',
      logo: getImage('Mr R Ananda Natrajan'),
      role: 'Professor',
      expertise: ['Instrumentation'],
      Company_name: 'Puducherry Technological University',
      type: 'Network',
      linkedin:'https://www.linkedin.com/in/ananda-r-634482/',
      mail:'ananda_natrajan@yahoo.com'
    },
    {
      name: 'Mr. Seyed M Buhari',
      logo: getImage('Mr Seyed M Buhari'),
      role: 'Professor',
      expertise: ['Hardware-Software Integration', 'Internet of Things (IoT)'],
      Company_name: 'King Abdulaziz University',
      type: 'Network',
      linkedin:'https://www.linkedin.com/in/seyed-m-buhari-3907508a/',
      mail:'mibuhari@gmail.com'
    },
    {
      name: 'Mr. M. Kalaiichelvan',
      logo: getImage('Mr. M Kalaiichelvan'),
      role: 'Managing Director',
      expertise: ['Product Development and Management'],
      Company_name: 'Manatec Electronics Private Limited',
      type: 'Network',
      linkedin:'http://linkedin.com/in/kalaiichelvan-mananathan-3641904',
      mail:'kalaii.chelvan@manatec.in'
    },
    {
      name: 'Mr. M. Nandakumar',
      logo: getImage('Mr M Nandakumar'),
      role: 'Managing Director',
      expertise: ['Product Development and Management'],
      Company_name: 'Lebracs Rubber Linings Pvt Ltd',
      type: 'Network',
      linkedin:'https://www.linkedin.com/in/nandakumar-menon-b92a7433/',
      mail:'lebracsnandakr@gmail.com'
    },
    {
      name: 'Mr. Syed Sajjadh Ali',
      logo: getImage('Mr I Syed Sajjadh Ali'),
      role: 'Managing Director',
      expertise: ['Product Development and Management'],
      Company_name: 'Eaton Power Quality Pvt Ltd',
      linkedin: 'http://linkedin.com/in/syed-sajjadh-ali-34b89313',
      type: 'Network',
      mail:'syedsajjadh@eaton.com'
    },
    {
      name: 'Mr. Upamshu Singhal',
      logo: getImage('Mr Upamshu Singhal'),
      role: 'Product Architect',
      expertise: ['Product Development and Management'],
      Company_name: 'Dell Technologies',
      linkedin: 'https://www.linkedin.com/in/upanshu/',
      type: 'Network',
      mail:'upanshu@hotmail.com'
    },
    {
      name: 'Mr. Niranjan Agarwal',
      logo: getImage('Mr Niranjan Agarwal'),
      role: 'Co-Founder',
      expertise: ['Product Development and Management'],
      Company_name: 'Seed Funds (Ganges Consultancies LLP)',
      type: 'Network',
    },
    {
      name: 'Dr. R. Krishnakumar',
      logo: getImage('Dr R Krishna Kumar'),
      role: 'Professor & Head, EEE',
      expertise: ['Product Development and Management'],
      Company_name: 'Vels Institute of Science Technology and Advanced Studies (VISTAS)',
      type: 'Network'
    },
    {
      name: 'Dr. S. Sudalai',
      logo: getImage('Dr S Sudalai'),
      role: 'Assistant Professor',
      expertise: ['Pollution Control and Environmental Engineering'],
      Company_name: 'Pondicherry University',
      type: 'Network'
    },
    {
      name: 'Mr. Manoj Kumar Wada',
      logo: getImage('Mr Manoj Kumar Wada'),
      role: 'Startup Coach & Mentor',
      expertise: ['Prototype Development and MVP'],
      Company_name: 'BGW Tech',
      email: 'manoj@bgwtech.com',
      phone: '9642038383',
      type: 'Network'
    },
    {
      name: 'Mr. L. Djody Bascarane',
      logo: getImage('Mr L Djody Bascarane'),
      role: 'Senior Consultant',
      expertise: ['Telecommunications'],
      Company_name: 'Telecommunications Consultants India Limited',
      type: 'Network',
      mail: '', 
      linkedin: '', 
    },
    {
      name: 'Mr. Adarsh Krishnamurthy',
      logo: getImage('Mr Adarsh Krishnamurthy'),
      role: 'Assistant Professor',
      expertise: ['Engineering Education'],
      Company_name: 'Mangalore Institute of Technology & Engineering',
      type: 'Network',
      mail: '', 
      linkedin: '', 
    },
    {
      name: 'Dr. S. Ramachandran',
      logo: getImage('Dr S Ramachandran'),
      role: 'COO',
      expertise: ['Educational Management'],
      Company_name: 'Achariya Group of Educational Institutions',
      type: 'Network',
      mail: '',
      linkedin: '', 
    },
    {
      name: 'Mr. Raj Bharat',
      logo: getImage('Mr Raj Bharat'),
      role: 'Founder - Director',
      expertise: ['Marketing', 'Media Services'],
      Company_name: 'ThinkComm Marketing & Media Services Pvt Ltd.',
      type: 'Network',
      mail: '', 
      linkedin: '', 
    },
    {
      name: 'Dr. N. Sozhan',
      logo: getImage('Dr N Sozhan'),
      role: 'Principal',
      expertise: ['Polytechnic Education'],
      Company_name: 'Dr. B.R. Ambedkar Polytechnic College, Yanam',
      type: 'Network',
      mail: '', 
      linkedin: '',
    },
    {
      name: 'Mr. Ashwin Shah',
      logo: getImage('Mr Ashwin Shah'),
      role: 'Director & CTO',
      expertise: ['Robotics', 'Technology'],
      Company_name: 'RoboFun Lab Pvt. Ltd.',
      type: 'Network',
      mail: '', 
      linkedin: '', 
    },
    {
      name: 'Mr. Mriganka Das',
      logo: getImage('Mr Mriganka Das'),
      role: 'Founder & CEO',
      expertise: ['Semiconductor Industry'],
      Company_name: 'Semiconductor Society',
      type: 'Network',
      mail: '', 
      linkedin: '', 
    },
    {
      name: 'Mr. Santhosh Nair',
      logo: getImage('Mr Santosh S Nair'),
      role: 'Business Consultant',
      expertise: ['Business Consulting'],
      Company_name: 'Past- Senior Vice President-NIIT and ITC Foods Division',
      type: 'Network',
      mail: '', 
      linkedin: '', 
    },
    {
      name: 'Mr. G. Prabhu Ram',
      logo: getImage('Mr Prabu Ram G'),
      role: 'Assistant Professor (Senior Grade)',
      expertise: ['Engineering Education'],
      Company_name: 'Ramco Institute of Technology',
      type: 'Network',
      mail: '',
      linkedin: '', 
    },
    {
      name: 'Mr. Srinath Birur',
      logo: getImage('Mr Srinath Birur'),
      role: 'Chief Innovation Evangelist',
      expertise: ['Innovation', 'Technology'],
      Company_name: 'Excelsoft Technologies Pvt Ltd',
      type: 'Network',
      mail: 'Srinath.birur@srinathbirur.in',
      linkedin: '',
    },
    {
      name: 'Mr. V. Shanmuganandam',
      logo: getImage('Mr. V Shanmuganandam'),
      role: 'CEO',
      expertise: ['Energy Technologies'],
      Company_name: 'Touch Energy Technologies',
      type: 'Network',
      mail: '',
      linkedin: '', 
    },
    {
      name: 'Ms. Radhika Meenakshi Shankar',
      logo: getImage('Ms Radhlka MeenakshiShankar'),
      role: 'Founder Director',
      expertise: ['Consultancy Services'],
      Company_name: 'Wise Owl Consultancy and Services',
      type: 'Network',
      mail: 'radshankar@gmail.com',
      linkedin: '', 
    },
    {
      name: 'Mr. Subhajit Saha',
      logo: getImage('Mr Subhajit Saha'),
      role: 'Head - Legal & IPR',
      expertise: ['Legal', 'Intellectual Property Rights'],
      Company_name: 'Resolute Group of Companies',
      type: 'Network',
      mail: '', 
      linkedin: '', 
    },
    {
      name: 'Dr. Rose Kavitha',
      logo: getImage('Dr Rose Kavitha'),
      role: 'Professor & Corporate Trainer',
      expertise: ['Engineering Education', 'Corporate Training'],
      Company_name: 'New Horizon College of Engineering',
      type: 'Network',
      mail: '', 
      linkedin: '', 
    },
    {
      name: 'Mr. Joseph Rajasekar',
      logo: getImage('Mr Joseph Mariadass Rajasekar'),
      role: 'Chief Consultant - HR & IR',
      expertise: ['Human Resources', 'Industrial Relations'],
      Company_name: '-', 
      type: 'Network',
      mail: '', 
      linkedin: '', 
    },
    {
      name: 'Mr. Rohitkumar Pillai',
      logo: getImage('Mr Rohitkumar Pillai'),
      role: 'Co-founder',
      expertise: ['Rural Entrepreneurship', 'Livelihood Development'],
      Company_name: 'Rural Entrepreneurship and Livelihood Foundation',
      type: 'Network',
      mail: '',
      linkedin: '',
    },
    {
      name: 'Mr. Boovaragan',
      logo: getImage('Mr M Boovaragan'),
      role: 'Founder & CEO',
      expertise: ['Process Solutions'],
      Company_name: 'Third Eye Process Solutions',
      type: 'Network',
      mail: '', 
      linkedin: '', 
    },
    {
      name: 'Mr. Jaya Ganesh',
      logo: getImage('Mr Jaya Ganesh'),
      role: 'CEO',
      expertise: ['Technology'],
      Company_name: 'Paramount Tech Labs',
      type: 'Network',
      mail: '', 
      linkedin: '', 
    },
    {
      name: 'Dr. M. S. Chidambara Raja',
      logo: getImage('Dr M S Chidambara Raja'),
      role: 'Assistant Professor',
      expertise: ['Renewable Energy', 'Smart Grid'],
      Company_name: 'VIT University',
      type: 'Network',
      mail: '', 
      linkedin: '',
    },
    {
      name: 'Dr. Sivakumar N',
      logo: getImage('Dr Sivakumar N'),
      role: 'Assistant Professor',
      expertise: ['Polymer Science'],
      Company_name: 'Indian Institute of Technology, Madras',
      type: 'Network',
      mail: '', 
      linkedin: '', 
    },
    {
      name: 'Mr. Parthasarathy B',
      logo: getImage('Mr Parthasarathy B'),
      role: 'Business Consultant',
      expertise: ['Business Consulting', 'Entrepreneurship'],
      Company_name: 'Self-Employed',
      type: 'Network',
      mail: '', 
      linkedin: '', 
    },
    {
      name: 'Dr. N. Rajendran',
      logo: getImage('Dr N Rajendran'),
      role: 'Professor & Dean',
      expertise: ['Materials Science'],
      Company_name: 'Anna University',
      type: 'Network',
      mail: '', 
      linkedin: '', 
    }
];

  const investmentPartnersDetailed = [
    {
      name: 'Sequoia Capital',
      logo: 'https://via.placeholder.com/150?text=Sequoia',
      role: 'Lead Venture Capital Partner',
      description: 'Sequoia Capital is a leading venture capital firm with a track record of backing revolutionary companies.',
      portfolio: ['Apple', 'Google', 'Airbnb'],
      investmentRange: '$1M - $50M',
      focus: 'Series A to Late Stage',
      location: 'Menlo Park, USA',
      type: 'Investment'
    },
    {
      name: 'Andreessen Horowitz',
      logo: 'https://via.placeholder.com/150?text=A16Z',
      role: 'Strategic Investment Partner',
      description: 'A16Z combines deep technical knowledge with practical company-building expertise to help founders succeed.',
      portfolio: ['Facebook', 'Twitter', 'Coinbase'],
      investmentRange: '$500K - $100M',
      focus: 'Seed to Growth Stage',
      location: 'Menlo Park, USA',
      type: 'Investment'
    },
    {
      name: 'SoftBank Vision Fund',
      logo: 'https://via.placeholder.com/150?text=SoftBank',
      role: 'Growth Capital Partner',
      description: 'SoftBank Vision Fund focuses on transformative technologies and business models that are leading innovation.',
      portfolio: ['Uber', 'WeWork', 'ByteDance'],
      investmentRange: '$100M+',
      focus: 'Late Stage and Growth',
      location: 'Tokyo, Japan',
      type: 'Investment'
    },
    {
      name: 'Accel Partners',
      logo: 'https://via.placeholder.com/150?text=Accel',
      role: 'Early-Stage Investment Partner',
      description: 'Accel Partners specializes in early-stage startup investments across technology sectors globally.',
      portfolio: ['Slack', 'Dropbox', 'Spotify'],
      investmentRange: '$1M - $25M',
      focus: 'Seed to Series B',
      location: 'Palo Alto, USA',
      type: 'Investment'
    }
  ];

  const openModal = (partner) => {
    setSelectedPartner(partner);
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
    setSelectedPartner(null);
  };

  const renderPartners = () => {
    let partners=[];
    let detailedPartners=null;
    switch (activeSection) {
      case 'Academic':
        partners = academicPartners;
        break;
      case 'Corporate':
        partners = corporatePartners;
        break;
      case 'IP Supporters':
        partners = ipPartners;
        break;
      case 'Mentors':
        detailedPartners = mentorPartnersDetailed;
        break;
      case 'Investment':
        detailedPartners = investmentPartnersDetailed;
        break;
      default:
        partners = [];
    }

    
    if (activeSection === "Mentors" || activeSection === "Investment") {
      if (!detailedPartners) return null;
      return (
        <>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {detailedPartners.map((partner, index) => (
              <div 
                key={index} 
                className="group flex flex-col items-center cursor-pointer"
                onClick={() => openModal(partner)}
              >
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#3F6197] hover:border-[#1e3f75] transition-colors">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full">
                        <User size={48} className="text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center rounded-full">
                                          <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            <a href={partner.linkedin} className="hover:scale-110 transition-transform duration-200">
                                              <Linkedin 
                                                size={24} 
                                                className="text-white hover:text-[#0077b5] transition-colors duration-200"
                                              />
                                            </a>
                                            <a href={`mailto:${partner.mail}`} className="hover:scale-110 transition-transform duration-200">
                                              <Mail
                                                size={24} 
                                                className="text-white hover:text-[#E4405F] transition-colors duration-200"
                                              />
                                            </a>
                                          </div>
                                        </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                  <p className="text-sm text-gray-500">{partner.role}</p>
                </div>
              </div>
            ))}
          </div>

          <dialog
            ref={dialogRef}
            className="w-full max-w-2xl rounded-lg p-0 backdrop:bg-black backdrop:bg-opacity-50"
            onClick={(e) => {
              if (e.target === dialogRef.current) closeModal();
            }}
          >
            {selectedPartner && (
              <div className="bg-white rounded-lg">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold">{selectedPartner.name}</h2>
                    <button 
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#3F6197]">
                        <img 
                          src={selectedPartner.logo} 
                          alt={selectedPartner.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{selectedPartner.role}</h3>
                        <p className="text-gray-600">{selectedPartner.Company_name}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-700">{selectedPartner.description}</p>
                    </div>

                    {selectedPartner.type === 'Network' && (
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Areas of Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedPartner.expertise.map((skill) => (
                            <span 
                              key={skill} 
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedPartner.type === 'Investment' && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Notable Portfolio Companies</h4>
                          <p className="text-gray-700">{selectedPartner.portfolio.join(', ')}</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Investment Focus</h4>
                          <p className="text-gray-700">{selectedPartner.focus}</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Investment Range</h4>
                          <p className="text-gray-700">{selectedPartner.investmentRange}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </dialog>
        </>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="relative group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="w-full h-32 flex items-center justify-center">
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="mt-4 opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center transition-opacity duration-300 rounded-xl">
              <h3 className="text-white text-lg font-semibold px-4 text-center">
                {partner.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {partnerSections.map((section) => (
          <button
            key={section.name}
            onClick={() => setActiveSection(section.path)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border ${
              activeSection === section.path
                ? 'bg-[#12283c] text-white border-[#0f1e2d]'
                : 'bg-white text-gray-700 border-gray-100'
            }`}
          >
            {section.icon}
            <span className="font-medium">{section.name}</span>
          </button>
        ))}
      </div>

      <div className="partners-container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          {activeSection} Partners
        </h2>
        {renderPartners()}
      </div>
    </div>
    </div>
  );
}

export default App;