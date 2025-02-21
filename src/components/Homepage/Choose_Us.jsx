import React from "react";
import { motion } from "framer-motion";
import Card_Choose_Us from "./Card_Choose_Us";

const Choose_Us = () => {
  const dataChooseUs = [
    {
        title: 'For Startups & Innovators',
        details: 'AIC-PECF offer a variety of services which enable startups, innovators, industries, academic institutes, teachers and students to  collaborate with us for their growth. We welcome ​all the stake holders to productively engage and collaborate with us for taking your innovation to the next level.',
        link: 'http://www.aicpecf.org/incubation.html',
        button:'Apply for Incubation'
    },
    {
        title: 'For Industry / Corporates',
        details: 'For Industries / Corporates / R&D Labs  we offer exciting opportunity for collaborative product development, market research, facilitating and supporting the innovation at community level, promoting industry institute connect. Join us to form a part of this existing nation building activity.',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLSe7gMW9-N3lh85VQUwlR8wHXHlNNHa44ifJ6PAmdOBPhvkZng/viewform',
        button:'Join as Industry Partner'
    },
    {
        title: 'For Colleges / Schools',
        details:'AIC-PECF connect with Entrepreneurship development cells and innovation centers of colleges and universities  to promote entrepreneurial ideas and products that contribute to societal change. We  support University-based entrepreneurial ecosystems by providing resources and partnering  events. ',
        link:'https://docs.google.com/forms/d/e/1FAIpQLSe7gMW9-N3lh85VQUwlR8wHXHlNNHa44ifJ6PAmdOBPhvkZng/viewform',
        button:'Apply for MoU'
    },
    {
        title: 'For Mentors / Investors',
        details:'AIC-PECF is constantly engaging with Mentors who can help get the right talent on board, find the right investors, determine the company’s worth, and help lay the foundations of the company culture for startups. We welcome all the Mentors and Investors to become a part of this exciting eco-system.',
        link:'https://docs.google.com/forms/d/e/1FAIpQLSfNFPBQNQ_woDdVWjf0uZpDbtXdNR7YNK8DiA-rZxa1_x2G3A/viewform',
        button:'Join as a Mentor / Investor'
    },
    {
        title:'For Government Departments',
        details:'For Government departments  we offer need based technology solutions for their customized requirements to increase the productivity, skill development programs, workshops, collaborative product development, facilitating and supporting the innovation. Government departments can sign MoU with AIC-PECF for collaborative activities. ',
        link:'https://docs.google.com/forms/d/e/1FAIpQLSe7gMW9-N3lh85VQUwlR8wHXHlNNHa44ifJ6PAmdOBPhvkZng/viewform',
        button:'Join as Govt. Dept. Partner'
    },
    {
        title:'For Teachers / Students',
        details:'For Professors / Teachers, Students and budding Entrepreneurs AIC-PECF offers a wide range of opportunities including participation in Pre-Incubation activities, training programs, skill development events, workshops and many more. Join as a free member and avail the endless opportunities .',
        link:'https://docs.google.com/forms/d/1FOpi2u5gNcTaBNuXd4oRaFAZza_Ru5xZ7NDWOjym0TU/edit',
        button:'Apply for Free Membership'
    }
]

  return (
    <div className="mt-6 sm:mt-8 lg:mt-10 mx-4 sm:mx-6 lg:mx-10">
      <div className="w-full block px-2 sm:px-4 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-start mx-2 sm:mx-6 lg:mx-10">
          Why to Choose Us
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 lg:mt-8">
          {dataChooseUs.map((val, index) => (
            <div key={index} className="flex justify-center">
              <Card_Choose_Us
                title={val.title}
                details={val.details}
                link={val.link}
                button={val.button}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Choose_Us;