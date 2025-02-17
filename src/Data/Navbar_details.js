const Navbar_menu = [
  {
    Title: "Home",
    link: "/",
    drop: null,
  },
  {
    Title: `Ecosystem`,
    link: "/",
    drop: "active",
    dropList: [
      {
        title: "Startup Details",
        link: "/startupDetail",
      },
      {
        title: "Students Projects",
        link: "/studentProject",
      },
    ],
  },
  {
    Title: "Programs",
    link: "/",
    drop: "active",
    dropList: [
      {
        title: "Pre-Incubate",
        link: "/",
      },
      {
        title: "Incubate",
        link: "/",
      },
      {
        title: "Incubation",
        link: "/",
      },
      {
        title: "IP Facilities",
        link: "/",
      },
    ],
  },
  {
    Title: "Partners",
    link: "/partners",
    drop: null,
    dropList: [
      {
        title: "Academic Partners",
        link: "/academicPartners",
      },
      {
        title: "Co-operative Parnters",
        link: "/cooperativePartners",
      },
      {
        title: "IP Supporters",
        link: "/ipSupporters",
      },
      {
        title: "Networking Partners",
        link: "/networkingPartners",
      },
      {
        title: "Investment Partners",
        link: "/investmentPartner",
      },
    ],
  },
  {
    Title: "Team",
    link: "/team",
    drop: "active",
    dropList: [
      {
        title: "Core Team",
        link: "/team/coreteam",
      },
      {
        title: "Executive Committee",
        link: "/team/executive_committee",
      },
    ],
  },
  {
    Title: "Events",
    link: "/events",
    dropList: null,
  },
 
  {
    Title: "Tenders",
    link: "/tenders",
    dropList: null,
  },
  {
    Title: "Contact",
    link: "/contact",
    dropList:null, 
  },
];

export default Navbar_menu;
