import React, { useState } from "react";
import { useRef } from "react";
import {
  Building2,
  Network,
  Lightbulb,
  Handshake,
  GraduationCap,
  User,
  X,
  Linkedin,
  Mail,
} from "lucide-react";
import {
  nitLogo,
  ifetlogo,
  pip,
  river,
  rj,
  smvec,
  achariya,
  balaji,
  chirst,
  kingston,
  krisiinasamy,
  mit,
  motilal,
  nandha,
  pajancoa,
  psg,
  pvkk,
  sctr,
  sri,
  lecole,
  tripura,
} from "../assets/Partnerspage/Academic/AcadamicPartner";
import {
  di,
  digi,
  Easy,
  idea,
  kris,
  ktech,
  lucas,
  re,
  schneider,
  tele,
  touch,
  zoho,
  ip,
  periyar,
  raksha,
  tally,
  startup,
  aic,
  appasamy,
  artilab,
  beehive,
  boudiik,
  conf,
  socio,
  startupBuddy,
  eagle10,
  mr,
  puthra,
  uav,
} from "../assets/Partnerspage/Corporate/CooperatePartner";
import {
  amits,
  anil,
  puru,
  rohit,
  manoj,
} from "../assets/Partnerspage/Investors/Investors";
import { useLocation } from 'react-router-dom';
const images = import.meta.glob("../assets/Partnerspage/Mentors/*.jpg", {
  eager: true,
});

const getImage = (name) => {
  return images[`../assets/Partnerspage/Mentors/${name}.jpg`]?.default;
};

function App() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'Academic'); 
  const [selectedPartner, setSelectedPartner] = useState(null);
  const dialogRef = useRef(null);

  const partnerSections = [
    {
      name: "Academic",
      icon: <GraduationCap className="w-6 h-6" />,
      path: "Academic",
    },
    {
      name: "Corporate",
      icon: <Handshake className="w-6 h-6" />,
      path: "Corporate",
    },
    {
      name: "IP Partners",
      icon: <Lightbulb className="w-6 h-6" />,
      path: "IP Supporters",
    },
    { name: "Mentors", icon: <Network className="w-6 h-6" />, path: "Mentors" },
    {
      name: "External Investors",
      icon: <Building2 className="w-6 h-6" />,
      path: "Investment",
    },
  ];

  const academicPartners = [
    { name: "NIT Karaikal", logo: nitLogo },
    { name: "IFET College of Engineering", logo: ifetlogo },
    { name: "PAJANCOA & RI Karaikal", logo: pip },
    {
      name: "Rajiv Gandhi Institute of Veterinary Education and Research (River)",
      logo: river,
    },
    { name: "Dr. B. R. Ambedkar Polytechnic College Yanam", logo: rj },
    { name: "Sri Manakula Vinayagar Engineering College", logo: smvec },
    { name: "Achariya Educational Public Trust", logo: achariya },
    { name: "BALAJI COLLEGE OF PHARMACY", logo: balaji },
    { name: "CHRIST COLLEGE OF ENGINEERING AND TECIINOLOGY", logo: chirst },
    { name: "KINGSTON Engineering College", logo: kingston },
    {
      name: "Krisiinasamy College of Engineering & Technology, CUDDALORE",
      logo: krisiinasamy,
    },
    { name: "Manakula Vinayagar Institute of Technology", logo: mit },
    { name: "Motilal Nehru Government Polytechnic College", logo: motilal },
    { name: "Nandha Engineering College", logo: nandha },
    { name: "PAJANCOA & RI", logo: pajancoa },
    { name: "PSG POLYTECHNUC COLLEGE", logo: psg },
    { name: "PVKK INSTITUTE OF TECHNOLOGY", logo: pvkk },
    { name: "SCTR_S PUNE ISNTITUTE OF_COMPUTER TECHNOLOGY", logo: sctr },
    {
      name: "SRI Venkateshwaraa College of Engineering & Technology",
      logo: sri,
    },
    { name: "Study Lecole Internationale", logo: lecole },
    { name: "Tripura Institute of Technology", logo: tripura },
  ];

  const corporatePartners = [
    { name: "Zoho Corporation", logo: zoho },
    { name: "Schneider Electric", logo: schneider },
    { name: "Digi Electronics", logo: digi },
    { name: "Idea Labs", logo: idea },
    { name: "Krisp Technologies", logo: kris },
    { name: "KTech Innovation Hub", logo: ktech },
    { name: "Lucas TVS", logo: lucas },
    { name: "Renewable Energy Solutions", logo: re },
    { name: "Telemedia Solutions", logo: tele },
    { name: "Touch Enterprises", logo: touch },
    { name: "Easy Tech", logo: Easy },
    { name: "DI Corporation", logo: di },
    { name: "4A IP Solutions", logo: ip },
    { name: "Periyar Technology Business Incubator", logo: periyar },
    { name: "Raksha Agarwal and Associates", logo: raksha },
    { name: "Tally Solutions Private Limited", logo: tally },
    { name: "10000 Startup", logo: startup },
    { name: "AIC-Great Lakes Balachandran Foundation", logo: aic },
    { name: "APPASAMY OCULAR DEVICES PVT LTD", logo: appasamy },
    { name: "Artilab Foundation", logo: artilab },
    { name: "Boudiiik Ventures Pvt Ltd", logo: boudiik },
    { name: "Beehive Capital Advisor", logo: beehive },
    { name: "Confederation of Indian Industries", logo: conf },
    { name: "Sociocharge ", logo: socio },
    { name: "Startup Buddy Services Pvt Ltd", logo: startupBuddy },
    { name: "Eagle Ventures", logo: eagle10 },
    { name: "Mr Steel Corporation Pvt Ltd", logo: mr },
    { name: "Puthran and Associates", logo: puthra },
    { name: "UAV Sysytems Pvt Ltd", logo: uav },
  ];

  const ipPartners = [
    { name: "Puthran and Associates", logo: puthra },
    { name: "4A IP Solutions", logo: ip },
    { name: "Ideation IP", logo: idea },
    { name: "Resurgent India", logo: re },
    { name: "Kris Hagan", logo: kris },
  ];

  const mentorPartnersDetailed = [
    {
      name: "Mr. Raj Bharat",
      logo: getImage("Mr Raj Bharat"),
      role: "Founder - Director",
      expertise: ["Marketing", "Media Services"],
      Company_name: "ThinkComm Marketing & Media Services Pvt Ltd.",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Dr. N. Sozhan",
      logo: getImage("Dr N Sozhan"),
      role: "Principal",
      expertise: ["Polytechnic Education"],
      Company_name: "Dr. B.R. Ambedkar Polytechnic College, Yanam",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Mr. Ashwin Shah",
      logo: getImage("Mr Ashwin Shah"),
      role: "Director & CTO",
      expertise: ["Robotics", "Technology"],
      Company_name: "RoboFun Lab Pvt. Ltd.",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Mr. Mriganka Das",
      logo: getImage("Mr Mriganka Das"),
      role: "Founder & CEO",
      expertise: ["Semiconductor Industry"],
      Company_name: "Semiconductor Society",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Ms. Vaishali Chandrakant Shelar",
      logo: getImage("Ms. Vaishali Chandrakant Shelar"),
      role: "ATL Manager",
      expertise: [
        "HR",
        "Business Administration",
        "Information & Communication Technology (ICT)",
      ],
      Company_name: "HOPE FOUNDATION",
      type: "Network",
      mail: "vaishalishelar7@gmail.com",
      linkedin: "https://www.linkedin.com/in/vaishali-shelar-625678150/",
    },
    {
      name: "Dr. S. Karthikrajan",
      logo: getImage("Dr S Karthikrajan"),
      role: "Research Advisor - Product Development",
      expertise: ["Product Development", "Management"],
      Company_name: "REVOLTAXE INDIA PVT LTD",
      type: "Network",
      linkedin: "https://www.linkedin.com/in/karthikrajansenthilnathan/",
      mail: "skarthikrajan@live.com",
    },
    {
      name: "Mr. Saurabh Trivedi",
      logo: getImage("Mr Saurabh Trivedi"),
      role: "Co-Founder & Director",
      expertise: ["Intellectual Property"],
      Company_name: "Boudhik Ventures Pvt. Ltd.",
      type: "Network",
      linkedin: "https://www.linkedin.com/in/saurabh-trivedi",
      mail: "saurabh@boudhikventures.com",
    },
    {
      name: "Mr. R Ananda Natrajan",
      logo: getImage("Mr R Ananda Natrajan"),
      role: "Professor",
      expertise: ["Instrumentation"],
      Company_name: "Puducherry Technological University",
      type: "Network",
      linkedin: "https://www.linkedin.com/in/ananda-r-634482/",
      mail: "ananda_natrajan@yahoo.com",
    },
    {
      name: "Mr. Seyed M Buhari",
      logo: getImage("Mr Seyed M Buhari"),
      role: "Professor",
      expertise: [
        "Hardware-Software Integration",
        "Internet of Things (IoT)",
        "Product Development and Management",
      ],
      Company_name: "King Abdulaziz University",
      type: "Network",
      linkedin: "https://www.linkedin.com/in/seyed-m-buhari-3907508a/",
      mail: "mibuhari@gmail.com",
    },
    {
      name: "Mr. M. Kalaiichelvan",
      logo: getImage("Mr. M Kalaiichelvan"),
      role: "Managing Director",
      expertise: [
        "Product Development and Management",
        "Manufacturing and Engineering",
      ],
      Company_name: "Manatec Electronics Private Limited",
      type: "Network",
      linkedin: "http://linkedin.com/in/kalaiichelvan-mananathan-3641904",
      mail: "kalaii.chelvan@manatec.in",
    },
    {
      name: "Mr. M. Nandakumar",
      logo: getImage("Mr M Nandakumar"),
      role: "Jt. Managing Director & CEO",
      expertise: [
        "Product Development and Management",
        "Manufacturing and Engineering",
      ],
      Company_name: "Lebracs Rubber Linings Pvt Ltd",
      type: "Network",
      linkedin: "https://www.linkedin.com/in/nandakumar-menon-b92a7433/",
      mail: "lebracsnandakr@gmail.com",
    },
    {
      name: "Mr. Syed Sajjadh Ali",
      logo: getImage("Mr I Syed Sajjadh Ali"),
      role: "Managing Director",
      expertise: ["Product Development and Management", "Energy"],
      Company_name: "Eaton Power Quality Pvt Ltd",
      linkedin: "http://linkedin.com/in/syed-sajjadh-ali-34b89313",
      type: "Network",
      mail: "syedsajjadh@eaton.com",
    },
    {
      name: "Mr. Upamshu Singhal",
      logo: getImage("Mr. Upamshu Singhal"),
      role: "Senior Software Principal Engineer",
      expertise: [
        "Product Development and Management",
        "Information & Communication Technology (ICT)",
      ],
      Company_name: "Dell Technologies",
      linkedin: "https://www.linkedin.com/in/upanshu/",
      type: "Network",
      mail: "upanshu@hotmail.com",
    },
    {
      name: "Mr. Niranjan Agarwal",
      logo: getImage("Mr Niranjan Agarwal"),
      role: "Co-Founder",
      expertise: ["Product Development and Management"],
      Company_name: "Seed Funds (Ganges Consultancies LLP)",
      type: "Network",
    },
    {
      name: "Dr. R. Krishnakumar",
      logo: getImage("Dr R Krishna Kumar"),
      role: "Professor & Head, EEE",
      expertise: ["Product Development and Management"],
      Company_name:
        "Vels Institute of Science Technology and Advanced Studies (VISTAS)",
      type: "Network",
    },
    {
      name: "Dr. S. Sudalai",
      logo: getImage("Dr S Sudalai"),
      role: "Assistant Professor",
      expertise: ["Pollution Control and Environmental Engineering"],
      Company_name: "Pondicherry University",
      type: "Network",
    },
    {
      name: "Mr. Manoj Kumar Wada",
      logo: getImage("Manoj-Kumar-bada-ghar-wala"),
      role: "Startup Coach & Mentor",
      expertise: ["Prototype Development and MVP"],
      Company_name: "BGW Tech",
      email: "manoj@bgwtech.com",
      phone: "9642038383",
      type: "Network",
    },
    {
      name: "Mr. L. Djody Bascarane",
      logo: getImage("Mr L Djody Bascarane"),
      role: "Senior Consultant",
      expertise: ["Telecommunications"],
      Company_name: "Telecommunications Consultants India Limited",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Mr. Adarsh Krishnamurthy",
      logo: getImage("Mr.Adarsh Krishnamurthy"),
      role: "Assistant Professor",
      expertise: ["Engineering Education"],
      Company_name: "Mangalore Institute of Technology & Engineering",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Dr. S. Ramachandran",
      logo: getImage("Dr S Ramachandran"),
      role: "COO",
      expertise: ["Educational Management"],
      Company_name: "Achariya Group of Educational Institutions",
      type: "Network",
      mail: "",
      linkedin: "",
    },

    {
      name: "Mr. Santhosh Nair",
      logo: getImage("Mr Santosh S Nair"),
      role: "Business Consultant",
      expertise: ["Business Consulting"],
      Company_name: "Past- Senior Vice President-NIIT and ITC Foods Division",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Mr. G. Prabhu Ram",
      logo: getImage("Mr Prabu Ram G"),
      role: "Assistant Professor (Senior Grade)",
      expertise: ["Engineering Education"],
      Company_name: "Ramco Institute of Technology",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Mr. Srinath Birur",
      logo: getImage("Mr Srinath Birur"),
      role: "Chief Innovation Evangelist",
      expertise: ["Innovation", "Technology"],
      Company_name: "Excelsoft Technologies Pvt Ltd",
      type: "Network",
      mail: "Srinath.birur@srinathbirur.in",
      linkedin: "",
    },
    {
      name: "Mr. V. Shanmuganandam",
      logo: getImage("Mr. V Shanmuganandam"),
      role: "CEO",
      expertise: ["Energy Technologies"],
      Company_name: "Touch Energy Technologies",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Ms. Radhika Meenakshi Shankar",
      logo: getImage("Ms Radhlka MeenakshiShankar"),
      role: "Founder Director",
      expertise: ["Consultancy Services"],
      Company_name: "Wise Owl Consultancy and Services",
      type: "Network",
      mail: "radshankar@gmail.com",
      linkedin: "",
    },
    {
      name: "Mr. Subhajit Saha",
      logo: getImage("Mr Subhajit Saha"),
      role: "Head - Legal & IPR",
      expertise: ["Legal", "Intellectual Property Rights"],
      Company_name: "Resolute Group of Companies",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Dr. Rose Kavitha",
      logo: getImage("Dr Rose Kavitha"),
      role: "Professor & Corporate Trainer",
      expertise: ["Engineering Education", "Corporate Training"],
      Company_name: "New Horizon College of Engineering",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Mr. Joseph Rajasekar",
      logo: getImage("Mr Joseph Mariadass Rajasekar"),
      role: "Chief Consultant - HR & IR",
      expertise: ["Human Resources", "Industrial Relations"],
      Company_name: "-",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Mr. Rohitkumar Pillai",
      logo: getImage("Mr Rohitkumar Pillai"),
      role: "Co-founder",
      expertise: ["Rural Entrepreneurship", "Livelihood Development"],
      Company_name: "Rural Entrepreneurship and Livelihood Foundation",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Mr. Boovaragan",
      logo: getImage("Mr M Boovaragan"),
      role: "Founder & CEO",
      expertise: ["Process Solutions"],
      Company_name: "Third Eye Process Solutions",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Mr. Jaya Ganesh",
      logo: getImage("Mr Jaya Ganesh"),
      role: "CEO",
      expertise: ["Technology"],
      Company_name: "Paramount Tech Labs",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Dr. M. S. Chidambara Raja",
      logo: getImage("Dr M S Chidambara Raja"),
      role: "Assistant Professor",
      expertise: ["Renewable Energy", "Smart Grid"],
      Company_name: "VIT University",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Dr. Sivakumar N",
      logo: getImage("Dr. Sivakumar N"),
      role: "Assistant Professor",
      expertise: ["Polymer Science"],
      Company_name: "Indian Institute of Technology, Madras",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Mr. Parthasarathy B",
      logo: getImage("Mr Parthasarathy B"),
      role: "Business Consultant",
      expertise: ["Business Consulting", "Entrepreneurship"],
      Company_name: "Self-Employed",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Dr. N. Rajendran",
      logo: getImage("Dr. N. Rajendran"),
      role: "Professor & Dean",
      expertise: ["Materials Science"],
      Company_name: "Anna University",
      type: "Network",
      mail: "",
      linkedin: "",
    },
    {
      name: "Shree Harish",
      logo: getImage("Shree Harish"),
      role: "Co-Founder & Chief Operating Officer",
      expertise: [
        "Sales and Marketing Strategy",
        "Information & Communication Technology (ICT)",
      ],
      Company_name: "aahaa Stores",
      type: "Network",
      mail: "harishshri@gmail.com",
      linkedin: "http://linkedin.com/in/shriharish",
    },
    {
      name: "Dr.S.Ramkumar",
      logo: getImage("Dr.S.Ramkumar"),
      role: "Director",
      expertise: ["Agriculture and Allied Fields"],
      Company_name:
        "Entrepreneurship Development Cell Government of Puducherry",
      type: "Network",
      mail: "directedc@gmail.com",
      linkedin: "http://linkedin.com/in/ramkumar-sukumaran-42a71428",
    },
    {
      name: "K.Senthilkumar",
      role: "Professor & Director In-charge CASR",
      expertise: [
        "Product Development and Management",
        "Unmanned aerial vehicle systems",
      ],
      Company_name: "MIT Centre for Aerospace Research",
      type: "Network",
      mail: "ksk.mit@gmail.com",
      linkedin: "",
    },
    {
      name: "Mr. Joseph Prakash",
      logo: getImage("Mr Joseph Prakash"),
      role: "Associate Director",
      expertise: [
        "Go to Market Strategy",
        "Other emerging areas or of social / national importance",
      ],
      Company_name: "Meghraj Capital",
      type: "Network",
      mail: "Joseph@meghrajindia.com",
      linkedin: "https://www.linkedin.com/in/joseph-prakash-5442b46/",
    },
    {
      name: "Vengat Prabhu Padmanaban",
      logo: getImage("Vengat Prabhu Padmanaban"),
      role: "Founder ,CEO",
      expertise: [
        "Sales and Marketing Strategy",
        "Information & Communication Technology (ICT)",
      ],
      Company_name: "Atlas Research Consulting",
      type: "Network",
      mail: "vengat@atlasresearch.in",
      linkedin:
        "https://www.linkedin.com/in/vengat-prabhu-padmanaban-3b09a8157/",
    },
    {
      name: "Elizabeth Puthran",
      logo: getImage("Elizabeth Puthran"),
      role: "Founder Partner",
      expertise: ["Intellectual Property Rights"],
      Company_name: "Puthran & Associates",
      type: "Network",
      mail: "elizabeth@iplexglobal.in",
      linkedin: "https://www.linkedin.com/in/elizabethputhran/",
    },
    {
      name: "Meenakshi Kumar",
      logo: getImage("Meenakshi Kumar"),
      role: "Managing Partner",
      expertise: ["Brand Communication", "Sensor Technology"],
      Company_name: "UK GEMS",
      type: "Network",
      mail: "meenakshi.k@ukgems.com",
      linkedin: "https://www.linkedin.com/in/meenakshi-kumar-39a68224",
    },
    {
      name: "Sriram Subramanya",
      logo: getImage("Sriram Subramanya"),
      role: "Founder, MD & CEO",
      expertise: [
        "Business Model Canvassing",
        "Information & Communication Technology (ICT)",
      ],
      Company_name: "Integra Software Services",
      type: "Network",
      mail: "sriram@integra.co.in",
      linkedin: "https://www.linkedin.com/in/sriram-subramanya-2386b79/",
    },
    {
      name: "S Narasimhan",
      logo: getImage("S Narasimhan"),
      role: "Managing Director",
      expertise: ["Sales and Marketing Strategy", "Transportation"],
      Company_name: "Sattva Logistics Pvt. Ltd.",
      type: "Network",
      mail: "narsi@sattva.in",
      linkedin: "https://www.linkedin.com/in/narasimhan-santhanam-2150454/",
    },
    {
      name: "Dr. Zuleika Homavazir",
      logo: getImage("Dr Zuleika Homavazir"),
      role: "Assistant Professor & Coordinator- Self Financing courses, Certificate courses, International Collaborations, Member- Board of Management",
      expertise: ["Go to Market Strategy"],
      Company_name: "Wilson College",
      type: "Network",
      mail: "zuleikahomavazir@gmail.com",
      linkedin: "",
    },
    {
      name: "Urvashi Baid",
      logo: getImage("Urvashi Baid"),
      role: "Director",
      expertise: [
        "Brand Communication",
        "Water, Sanitation and Solid Waste Management",
      ],
      Company_name: "Amel Services & Consultancy Pvt. Ltd.",
      type: "Network",
      mail: "urvashi.baid@amelconsultancy.com",
      linkedin: "https://www.linkedin.com/in/urvashibaid/",
    },

    {
      name: "Daniel Prabhakaran G",
      logo: getImage("Daniel Prabhakaran G"),
      role: "Project Executive",
      expertise: ["Product Development and Management", "Energy"],
      Company_name: "TN Startup & Innovation Mission",
      type: "Network",
      mail: "daniel.litj@gmail.com",
      linkedin: "https://www.linkedin.com/in/daniel-prabhakaran-b04bb480/",
    },
    {
      name: "Christopher Sequeira",
      logo: getImage("Christopher Sequeira"),
      role: "ATL Trainer",
      expertise: ["HR and Business Administration"],
      Company_name: "Dell-Hope Foundation",
      type: "Network",
      mail: "christophersequeira10@gmail.com",
      linkedin: "https://www.linkedin.com/in/christopher-sequeira-596412182/",
    },
    {
      name: "Saurabh Trivedi",
      logo: getImage("Saurabh Trivedi"),
      role: "Managing Director",
      expertise: [
        "Intellectual Property Rights",
        "Information & Communication Technology (ICT)",
      ],
      Company_name: "Boudhik Ventures Pvt. Ltd.",
      type: "Network",
      mail: "saurabh@boudhikventures.com",
      linkedin: "https://www.linkedin.com/in/saurabh-trivedi",
    },
  ];

  const investmentPartnersDetailed = [
    {
      name: "Amit Singal",
      logo: amits,
      role: "Founding Partner,Fluid Ventures,Director,ASR Business Advisor & Startup Buddy",
      Company_name: "Fluid Ventures",
      type: "Investment",
    },
    {
      name: "Anil Joshi",
      role: "Founder Partner,Founder and Managing Partner,Unicorn India Ventures",
      logo: anil,
      Company_name: "Unicorn India Ventures",
      type: "Investment",
    },
    {
      name: "Puru Modani",
      logo: puru,
      role: "Director,The Marwari Angels",
      Company_name: "The Marwari Angels",
      type: "Investment",
    },
    {
      name: "Rohit",
      role: "Senior Manager,The Chennai Angels",
      Company_name: "The Chennai Angels",
      logo: rohit,
      type: "Investment",
    },
    {
      name: "Manoj Kumar Agarwal",
      role: "Managing Partner, SEAFUND",
      Company_name: "SEAFUND",
      logo: manoj,
      type: "Investment",
    },
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
    let partners = [];
    let detailedPartners = null;
    switch (activeTab) {
      case "Academic":
        partners = academicPartners;
        break;
      case "Corporate":
        partners = corporatePartners;
        break;
      case "IP Supporters":
        partners = ipPartners;
        break;
      case "Mentors":
        detailedPartners = mentorPartnersDetailed;
        break;
      case "Investment":
        detailedPartners = investmentPartnersDetailed;
        break;
      default:
        partners = [];
    }

    if (activeTab === "Mentors" || activeTab === "Investment") {
      if (!detailedPartners) return null;
      return (
        <>
          <div className="grid gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
            {detailedPartners.map(
              (partner, index) =>
                partner.logo && (
                  <div
                    key={index}
                    className="group flex flex-col items-center cursor-pointer"
                    onClick={() => openModal(partner)}
                  >
                    <div className="relative w-20 h-20 sm:w-30 sm:h-30 md:w-48 md:h-48 lg:w-48 lg:h-48">
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
                            <a
                              href={partner.linkedin}
                              className="hover:scale-110 transition-transform duration-200"
                            >
                              <Linkedin
                                size={24}
                                className="text-white hover:text-[#0077b5] transition-colors duration-200"
                              />
                            </a>
                            <a
                              href={`mailto:${partner.mail}`}
                              className="hover:scale-110 transition-transform duration-200"
                            >
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
                      <h3 className="text-lg font-semibold text-gray-900">
                        {partner.name}
                      </h3>
                      <p className="text-sm text-gray-500">{partner.role}</p>
                    </div>
                  </div>
                )
            )}
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
                    <h2 className="text-2xl font-bold">
                      {selectedPartner.name}
                    </h2>
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
                        <h3 className="text-xl font-semibold text-gray-900">
                          {selectedPartner.role}
                        </h3>
                        <p className="text-gray-600">
                          {selectedPartner.Company_name}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-700">
                        {selectedPartner.description}
                      </p>
                    </div>

                    {selectedPartner.type === "Network" && (
                      <div>
                        <h4 className="text-lg font-semibold mb-2">
                          Areas of Expertise
                        </h4>
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

                    {selectedPartner.type === "Investment" && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            Startup
                          </h4>
                          <p className="text-gray-700">
                            {selectedPartner.Company_name}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">Role</h4>
                          <p className="text-gray-700">
                            {selectedPartner.role}
                          </p>
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
            onClick={() => setActiveTab(section.path)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border ${
              activeTab === section.path
                ? "bg-[#12283c] text-white border-[#0f1e2d]"
                : "bg-white text-gray-700 border-gray-100"
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
            {activeTab} Partners
          </h2>
          {renderPartners()}
        </div>
      </div>
    </div>
  );
}

export default App;
