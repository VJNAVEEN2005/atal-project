import React, { useState, useEffect } from 'react';
import { Rajkumar_COO, Sundhara_Moorthy_Director, Vishnu_CEO } from '../../assets/Team/coreTeam/images/coreTeamImage';

const Testimonials = () => {
  const testimonials = [
    {
      role: 'CEO',
      name: 'Mr. Vishnu Vardhan',
      occupation: 'Chief Executive Officer',
      company: 'Atal Incubation Centre, PEC Foundation',
      message:
        'AIC-PECF has been instrumental in our startup journey. The support we have received, including expert mentorship, crucial resources, and valuable networking opportunities, has been vital for our product development. Their dedication continues to play a key role as we advance in our development process.',
      photo: Vishnu_CEO, // Replace with actual image URLs
    },
    {
      role: 'COO',
      name: 'Mr. S Rajakumar',
      occupation: 'Chief Operating Officer',
      company: 'Atal Incubation Centre, PEC Foundation',
      message:
        'The strategic guidance from AIC-PECF helped us navigate critical challenges in our business. The team’s hands-on approach ensured we had access to essential resources and connections that accelerated our growth.',
      photo: Rajkumar_COO,
    },
    {
      role: 'Director',
      name: 'Dr. R Sundaramurthy',
      occupation: 'Executive Director',
      company: 'Atal Incubation Centre, PEC Foundation',
      message:
        'AIC-PECF provided us with a nurturing environment to innovate and grow. Their mentorship and resources have been invaluable in helping us reach new milestones in our journey.',
      photo: Sundhara_Moorthy_Director,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="w-[85%] mx-auto mb-20">
      <div className="max-w-fit ml-[-30px] mt-10">
        <h2 className="text-2xl font-semibold ml-2 md:ml">HEAR FROM OUR FOUNDERS</h2>
        {/* Border bottom */}
        <div
          id="border-bottom"
          className="mt-2 w-52 mx-auto h-[6px] rounded-full bg-customBlue"
        ></div>
      </div>

      {/* Carousel Container */}
      <div className="relative mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Photo Section */}
          <div className="rounded-full overflow-hidden bg-customBlue w-40 h-40  md:w-80 md:h-80">
            <img
              src={testimonials[currentSlide].photo}
              alt={`${testimonials[currentSlide].role}'s photo`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Message Section */}
          <div className="flex-col flex justify-between bg-slate-100 p-10 rounded-md w-full md:w-[50vw] relative">
            <p className="md:text-xl text-base text-justify">{testimonials[currentSlide].message}</p>
            <div className="gap-5 text-center font-medium text-sm md:text-lg mt-4">
              <h4 className=' text-lg'>{testimonials[currentSlide].name}</h4>
              <div className=' flex gap-2 justify-center'>
              <h4 className=' text-sm'>{testimonials[currentSlide].occupation + `,`}</h4>
              <h4 className=' text-sm'>{testimonials[currentSlide].company}</h4>
              </div>
            </div>
            {/* Decorative Arrow */}
            <div className="min-w-7 min-h-7 hidden md:block bg-slate-100 absolute top-[50%] -left-3 rotate-45"></div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-[220px] -left-4 md:top-1/2 md:left-0 transform -translate-y-1/2 p-4">
          <button
            className="bg-customBlue text-white p-2 rounded-full"
            onClick={prevSlide}
          >
            &lt;
          </button>
        </div>
        <div className="absolute top-[220px] -right-4 md:top-1/2 md:right-0 transform -translate-y-1/2 p-4">
          <button
            className="bg-customBlue text-white p-2 rounded-full"
            onClick={nextSlide}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${
              index === currentSlide ? 'bg-customBlue' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
