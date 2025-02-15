import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AIM, PTU, aws, IFET, SMVEC, River, NIT, RJ, Pip, Zoho, Resuegent, START, touch, Ktech, Kris, Lucas,
  Easy, Idea, Seed, Start, Schn, Eagle, S, Bee, CII, MSME, BCIL, Digi } from '../../assets/Homepage/Partners/Keypartner';

export const Partner = () => {
  const logos = [
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
      <h2 className='mt-10' style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Corporate Partners</h2>
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} style={{ transform: `rotateY(${index * 15}deg)`, transition: 'transform 0.5s', padding: '10px' }}>
            <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {logo}
            </div>
          </div>
        ))}
      </Slider>
    </div>
    <div className="partner-carousel" style={{ perspective: '1500px', paddingBottom: '10px' }}>
      <h2 className='' style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Academic Partners</h2>
      <Slider {...settings}>
        {logos.map((logo, index) => (
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
