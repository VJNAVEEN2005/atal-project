import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AIM, PTU, aws, IFET, SMVEC, River, NIT, RJ, Pip, Zoho, Resuegent, START, touch, Ktech, Kris, Lucas,
  Easy, Idea, Seed, Start, Schn, Eagle, S, Bee, CII, MSME, BCIL, Digi } from '../../assets/Homepage/Partners/Keypartner';
import { di, digi, idea, kris, ktech, lucas, re, schneider, tele, zoho } from '../../assets/Partnerspage/Corporate/CooperatePartner';
import { ifetlogo, nitLogo, pip, river, rj, smvec } from '../../assets/Partnerspage/Academic/AcadamicPartner';

export const Partner = () => {
  const logos1 = [
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

  const cooperatePartnerLogo = [
    <img src={di} alt="AIM Logo" style={{ width: 80, height: 50}} />,
    <img src={digi} alt="AIM Logo" style={{ width: 80, height: 50 }} />,
    <img src={Easy} alt="AIM Logo" style={{ width: 80, height: 50}} />,
    <img src={idea} alt="AIM Logo" style={{ width: 140, height: 50 }} />,
    <img src={kris} alt="AIM Logo" style={{ width: 80, height: 50 }} />,
    <img src={ktech} alt="AIM Logo" style={{width: 80, height: 50 }} />,
    <img src={lucas} alt="AIM Logo" style={{width: 140, height: 50 }} />,
    <img src={re} alt="AIM Logo" style={{ width: 140, height: 50 }} />,
    <img src={schneider} alt="AIM Logo" style={{ width: 140, height: 50 }} />,
    <img src={tele} alt="AIM Logo" style={{ width: 80, height: 50 }} />,
    <img src={touch} alt="AIM Logo" style={{ width: 80, height: 50 }} />,
    <img src={zoho} alt="AIM Logo" style={{ width: 80, height: 50 }} />,
  ]

  const acadamicPartnerLogo = [
    <img src={nitLogo} alt="AIM Logo" style={{ width: 80, height: 50 }} />,
    <img src={ifetlogo} alt="AIM Logo" style={{ width: 160, height: 50 }} />,
    <img src={pip} alt="AIM Logo" style={{ width: 80, height: 50 }} />,
    <img src={river} alt="AIM Logo" style={{ width: 140, height: 50 }} />,
    <img src={rj} alt="AIM Logo" style={{ width: 80, height: 50 }} />,
    <img src={smvec} alt="AIM Logo" style={{ width: 160, height: 50 }} />,
  ]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true, // Enables centering of items for better 3D effect
    focusOnSelect: true, // Makes items selectable
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className=' mt-24'>
      <div className="partner-carousel" style={{ perspective: '1500px', paddingBottom: '10px' }}>
      <div className=' flex justify-center'><h2 className='mt-10 border-2 border-[#12283c] p-2 rounded-xl shadow-md shadow-gray-400' style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Corporate Partners</h2></div>
      <Slider {...settings}>
        {cooperatePartnerLogo.map((logo, index) => (
          <div key={index} style={{ transform: `rotateY(${index * 15}deg)`, transition: 'transform 0.5s', padding: '10px' }}>
            <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {logo}
            </div>
          </div>
        ))}
      </Slider>
    </div>
    <div className="partner-carousel" style={{ perspective: '1500px', paddingBottom: '10px' }}>
    <div className=' flex justify-center'><h2 className='border-2 border-[#12283c] p-2 rounded-xl shadow-md shadow-gray-400' style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Academic Partners</h2></div>
      <Slider {...settings}>
        {acadamicPartnerLogo.map((logo, index) => (
          <div key={index} style={{ transform: `rotateY(${index * 15}deg)`, transition: 'transform 0.5s', padding: '10px' }}>
            <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {logo}
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default Partner;
