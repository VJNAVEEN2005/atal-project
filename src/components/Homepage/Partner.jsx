import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AIM, PTU, aws, IFET, SMVEC, River, NIT, RJ, Pip, Zoho, Resuegent, START, touch, Ktech, Kris, Lucas,
  Easy, Idea, Seed, Start, Schn, Eagle, S, Bee, CII, MSME, BCIL, Digi } from '../../assets/Homepage/Partners/Keypartner';
import { di, digi, idea, kris, ktech, lucas, re, schneider, tele, zoho } from '../../assets/Partnerspage/Corporate/CooperatePartner';
import { ifetlogo, nitLogo, pip, river, rj, smvec } from '../../assets/Partnerspage/Academic/AcadamicPartner';

const DirectionalPartnerCarousel = ({ title, logos, direction }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '20px',
        }
      },
    ],
  };

  const containerClasses = `relative overflow-hidden mb-5 transform transition-all duration-1000 ease-out
    ${isVisible ? 'translate-x-0 opacity-100' : direction === 'left' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'}`;

  const titleBoxClasses = `absolute ${direction === 'left' ? 'left-0' : 'right-0'} top-0 z-10 
    bg-[#12283c] text-white py-3 px-6 shadow-2xl ${direction === 'left' ? 'rounded-tr-2xl rounded-br-2xl' : 'rounded-tl-2xl rounded-bl-2xl'}`;

  return (
    <div className={containerClasses}>
      <div className="py-8 px-4 bg-gray-50 rounded-lg shadow-md relative">
        <div className={titleBoxClasses}>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>

        <div className="pt-10 pb-4 px-2">
          <Slider {...settings}>
            {logos.map((logo, index) => (
              <div key={index} className="px-2">
              <div className="scale-125 bg-white mx-16 rounded-2xl flex items-center justify-center p-3  transition-all duration-300 ">
                {logo}
              </div>
            </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

const Partner = () => {
  // Process logo data for consistent rendering
  const processLogo = (src, alt, maxWidth = 'auto', height = 50) => (
    <img 
      src={src} 
      alt={alt} 
      className="max-w-full object-contain" 
      style={{ maxWidth, height }} 
    />
  );

  // Corporate partner logos
  const corporateLogos = [
    processLogo(di, "Digital Impact Logo", 80),
    processLogo(digi, "DigiThink Logo", 80),
    processLogo(Easy, "EasyTech Logo", 80),
    processLogo(idea, "Idea Innovations Logo", 140),
    processLogo(kris, "Kris Systems Logo", 80),
    processLogo(ktech, "KTech Logo", 80),
    processLogo(lucas, "Lucas Technologies Logo", 140),
    processLogo(re, "Resuegent Logo", 140),
    processLogo(schneider, "Schneider Electric Logo", 140),
    processLogo(tele, "Telecom Solutions Logo", 80),
    processLogo(touch, "TouchTech Logo", 80),
    processLogo(zoho, "Zoho Logo", 80)
  ];

  // Academic partner logos
  const academicLogos = [
    processLogo(nitLogo, "NIT Logo", 80),
    processLogo(ifetlogo, "IFET Logo", 160),
    processLogo(pip, "PIP Institute Logo", 80),
    processLogo(river, "River University Logo", 140),
    processLogo(rj, "RJ College Logo", 80),
    processLogo(smvec, "SMVEC Logo", 160)
  ];

  // All partner logos (original size preserved)
  const allPartnerLogos = [
    <img src={AIM} alt="AIM Logo" style={{ width: 110, height: 50 }} />,
    <img src={PTU} alt="PTU Logo" style={{ width: 80, height: 80 }} />,
    <img src={Seed} alt="Seed Logo" style={{ width: 50, height: 50 }} />,
    <img src={Start} alt="Start Logo" style={{ width: 80, height: 50 }} />,
    <img src={Eagle} alt="Eagle Logo" style={{ width: 80, height: 50 }} />,
    <img src={Schn} alt="Schneider Logo" style={{ width: 80, height: 50 }} />,
    <img src={S} alt="Seed Logo" style={{ width: 50, height: 50 }} />,
    <img src={Bee} alt="BeeHive Logo" style={{ width: 70, height: 50 }} />,
    <img src={CII} alt="CII Logo" style={{ width: 100, height: 50 }} />,
    <img src={MSME} alt="MSME Logo" style={{ width: 80, height: 50 }} />,
    <img src={BCIL} alt="BCIL Logo" style={{ width: 70, height: 70 }} />,
    <img src={Digi} alt="Digi Logo" style={{ width: 80, height: 50 }} />,
    <img src={Idea} alt="Digi Logo" style={{ width: 80, height: 50 }} />,
    <img src={Easy} alt="Digi Logo" style={{ width: 50, height: 50 }} />,
    <img src={Lucas} alt="Digi Logo" style={{ width: 90, height: 50 }} />,
    <img src={Kris} alt="Digi Logo" style={{ width: 80, height: 50 }} />,
    <img src={Ktech} alt="Digi Logo" style={{ width: 70, height: 50 }} />,
    <img src={touch} alt="Digi Logo" style={{ width: 80, height: 50 }} />,
    <img src={START} alt="Digi Logo" style={{ width: 80, height: 50 }} />,
    <img src={Resuegent} alt="Digi Logo" style={{ width: 100, height: 50 }} />,
    <img src={Zoho} alt="Digi Logo" style={{ width: 80, height: 50 }} />,
    <img src={Pip} alt="Digi Logo" style={{ width: 80, height: 80 }} />,
    <img src={RJ} alt="Digi Logo" style={{ width: 90, height: 80 }} />,
    <img src={NIT} alt="Digi Logo" style={{ width: 80, height: 80 }} />,
    <img src={River} alt="Digi Logo" style={{ width: 130, height: 50 }} />,
    <img src={SMVEC} alt="Digi Logo" style={{ width: 130, height: 50 }} />,
    <img src={IFET} alt="Digi Logo" style={{ width: 130, height: 50 }} />,
    <img src={aws} alt="Digi Logo" style={{ width: 90, height: 50 }} />,
  ];

  const keyPartnerSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 5 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 }
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 mt-24 mb-24">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-[#12283c] mb-16">
        Our Strategic Partnerships
      </h1>
      
      <DirectionalPartnerCarousel 
        title="Corporate Partners" 
        logos={corporateLogos} 
        direction="left" 
      />
      
      <DirectionalPartnerCarousel 
        title="Academic Partners" 
        logos={academicLogos} 
        direction="left" 
      />
      
    </div>
  );
};

export default Partner;