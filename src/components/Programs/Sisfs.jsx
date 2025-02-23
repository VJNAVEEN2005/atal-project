import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { sisfs, sisfslogo } from '../../assets/Programs/Sisfs/data';

const BeneficiaryModal = ({ beneficiary, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <img 
                  src={beneficiary.logo} 
                  alt={beneficiary.company} 
                  className="w-20 h-20 object-contain"
                />
                <h2 className="text-2xl font-bold text-[#3f6197]">{beneficiary.company}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-700 mb-6">{beneficiary.description}</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <div className="bg-yellow-400 p-2 rounded-lg">
                    <img src="/api/placeholder/24/24" alt="Revenue icon" className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Revenue Generated</p>
                    <p className="font-bold text-gray-800">INR {beneficiary.revenue}</p>
                    <p className="text-sm text-gray-500">FY 2023-2024</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <div className="bg-yellow-400 p-2 rounded-lg">
                    <img src="/api/placeholder/24/24" alt="Grant icon" className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Grant Released</p>
                    <p className="font-bold text-gray-800">INR {beneficiary.grant}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <div className="bg-yellow-400 p-2 rounded-lg">
                    <img src="/api/placeholder/24/24" alt="Sector icon" className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sector</p>
                    <p className="font-bold text-gray-800">{beneficiary.sector}</p>
                  </div>
                </div>
              </div>

              <div>
                <img 
                  src={beneficiary.image} 
                  alt={`${beneficiary.company} product`}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const BeneficiaryCard = ({ beneficiary, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg cursor-pointer overflow-hidden aspect-square"
      onClick={onClick}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex-1">
          <img 
            src={beneficiary.logo} 
            alt={beneficiary.company} 
            className="w-20 h-20 object-contain mb-4"
          />
          <h3 className="text-xl font-bold text-[#3f6197] mb-2">{beneficiary.company}</h3>
          <p className="text-gray-700 line-clamp-3">{beneficiary.description}</p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-1.5 rounded-lg">
              <img src="/api/placeholder/16/16" alt="Sector icon" className="w-4 h-4" />
            </div>
            <span className="font-medium text-gray-800">{beneficiary.sector}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Sisfs = () => {
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const beneficiaries = [
    {
      company: "NEVAR SYSTEMS",
      description: "Developing drone products and providing services in the field of technology and software analytics to develop end to end drone solutions. (DaaS) Drone-as-a-Service - Make in India Micro class category autonomous drones for commercial & defense industry.",
      revenue: "70 Lakhs",
      grant: "14.20 Lakhs",
      sector: "UAV",
      image: "/path-to-nevar-drone-image",
      logo: "/path-to-nevar-logo"
    },
    {
      company: "FUTURE GURUKULS",
      description: "Aiming to impart 21st centuries skills like - coding, Robotics, IoT, Drone, 3D printing etc. to school students, we provide Robotics lab in schools. Offline edutech offering K12 - STEM training to young minds at school level by imparting the skill-set of Robotics, Coding, IoT and creative ability.",
      revenue: "19 Lakhs",
      grant: "11.28 Lakhs",
      sector: "Edu-Tech",
      image: "/path-to-gurukuls-product-image",
      logo: "/path-to-gurukuls-logo"
    },
    {
      company: "FUTURE GURUKULS",
      description: "Aiming to impart 21st centuries skills like - coding, Robotics, IoT, Drone, 3D printing etc. to school students, we provide Robotics lab in schools. Offline edutech offering K12 - STEM training to young minds at school level by imparting the skill-set of Robotics, Coding, IoT and creative ability.",
      revenue: "19 Lakhs",
      grant: "11.28 Lakhs",
      sector: "Edu-Tech",
      image: "/path-to-gurukuls-product-image",
      logo: "/path-to-gurukuls-logo"
    },
    {
      company: "FUTURE GURUKULS",
      description: "Aiming to impart 21st centuries skills like - coding, Robotics, IoT, Drone, 3D printing etc. to school students, we provide Robotics lab in schools. Offline edutech offering K12 - STEM training to young minds at school level by imparting the skill-set of Robotics, Coding, IoT and creative ability.",
      revenue: "19 Lakhs",
      grant: "11.28 Lakhs",
      sector: "Edu-Tech",
      image: "/path-to-gurukuls-product-image",
      logo: "/path-to-gurukuls-logo"
    },
  ];

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      className="bg-white py-14 px-4 shadow-xl rounded-lg mb-10"
    >
      <motion.div 
        variants={staggerChildren}
        className="max-w-4xl mx-auto"
      >
        {/* Header Section */}
        <motion.div 
          variants={fadeIn}
          className="flex items-center gap-8 mb-12"
        >
          <div className="">
            <img className="h-16 p-2 rounded-xl shadow-xl" src={sisfslogo} alt="" />
          </div>
          <motion.h1 
            variants={fadeIn}
            className="text-4xl font-bold text-[#3f6197]"
          >
            SISFS
          </motion.h1>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={fadeIn}
          className="text-lg mb-12 text-gray-700"
        >
          Startup India Seed Fund Scheme (SISFS) aims to provide financial assistance to startups for proof of concept, prototype development, product trials, market entry and commercialization. This would enable these startups to graduate to a level where they will be able to raise investments from angel investors or venture capitalists or seek loans from commercial banks or financial institutions.
        </motion.p>

        {/* Eligibility Criteria Section */}
        <motion.div 
          variants={fadeIn}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-[#3f6197] mb-6">Eligibility Criteria</h2>
          <motion.ul className="space-y-4 text-gray-700">
            {[
              "Registered startups recognized by DPIIT.",
              "Startups with an innovative and scalable business model.",
              "Early-stage startups focusing on product development and market validation.",
              "Must not have received financial support under any other government seed fund."
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={fadeIn}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#3f6197]" />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Program Structure Section */}
        <motion.div 
          variants={fadeIn}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-[#3f6197] mb-6">Program Structure</h2>
          <motion.ul className="space-y-4 text-gray-700">
            {[
              ["Funding Support", "Seed capital for product development & scaling."],
              ["Mentorship & Guidance", "Expert-led sessions for business growth."],
              ["Investor & Market Access", "Connecting startups with key stakeholders."],
              ["Incubation Support", "Infrastructure, networking, and strategic advisory."]
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={fadeIn}
                className="flex items-start gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#3f6197] mt-2" />
                <div>
                  <span className="font-semibold">{item[0]}</span> – {item[1]}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Program Pedagogy Section */}
        <motion.div 
          variants={fadeIn}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-[#3f6197] mb-6">Program Pedagogy</h2>
          <motion.ul className="space-y-4 text-gray-700">
            {[
              "Structured Funding Assistance",
              "Business Model Validation",
              "One-on-One Mentorship",
              "Industry Networking & Collaboration",
              "Go-to-Market & Scaling Strategy"
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={fadeIn}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-[#3f6197]" />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Funding Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Grant Funding */}
          <motion.div 
            variants={fadeIn}
            className="bg-white p-6 rounded-lg shadow-lg border border-[#3f6197]/20"
          >
            <h2 className="text-2xl font-semibold text-[#3f6197] mb-6">Grant Funding</h2>
            <h3 className="text-lg font-medium text-gray-700 mb-4">(PoC & Prototype Development)</h3>
            <ul className="space-y-4 text-gray-700">
              <li>• Non-repayable financial assistance.</li>
              <li>• Provided for idea validation, prototype building, and early-stage R&D.</li>
              <li>• Helps startups de-risk product development and prepare for market entry.</li>
            </ul>
          </motion.div>

          {/* Debt Funding */}
          <motion.div 
            variants={fadeIn}
            className="bg-white p-6 rounded-lg shadow-lg border border-[#3f6197]/20"
          >
            <h2 className="text-2xl font-semibold text-[#3f6197] mb-6">Debt Funding</h2>
            <h3 className="text-lg font-medium text-gray-700 mb-4">(Scale-Up & Market Entry)</h3>
            <ul className="space-y-4 text-gray-700">
              <li>• Loan-based funding with flexible repayment terms.</li>
              <li>• Offered to startups with proven market potential to support growth and commercialization.</li>
              <li>• Helps in scaling operations, customer acquisition, and revenue generation.</li>
            </ul>
          </motion.div>
        </div>

        <div className="mb-12">
          <img className="p-3 shadow-xl rounded-xl" src={sisfs} alt="" />
        </div>

        {/* Beneficiaries Section */}
        <motion.div variants={fadeIn}>
          <h2 className="text-2xl font-bold py-2 px-6 bg-yellow-400 inline-block rounded-r-full text-black mb-8">
            SISFS GRANT BENEFICIARIES
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficiaries.map((beneficiary, index) => (
              <BeneficiaryCard 
                key={index}
                beneficiary={beneficiary}
                onClick={() => setSelectedBeneficiary(beneficiary)}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      <BeneficiaryModal 
        beneficiary={selectedBeneficiary}
        isOpen={!!selectedBeneficiary}
        onClose={() => setSelectedBeneficiary(null)}
      />
    </motion.div>
  );
};

export default Sisfs;