const dayOffset = (offset) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
};

const newsDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const isDemoMode = () => localStorage.getItem("demoMode") === "true";

export const demoNews = [
  {
    news_id: "demo-news-1",
    newsTitle: "NU students unveil new robotics research",
    name: "Alisher",
    surname: "Kunbolsyn",
    email: "alisher.kunbolsyn@nu.edu.kz",
    newsDatePosted: newsDate(1),
    text_content:
      "Student researchers presented a new generation of autonomous robots at this week's campus technology showcase.",
    status: "accepted",
    photo: { filePath: `${process.env.PUBLIC_URL}/images/robotics.jpg` },
  },
  {
    news_id: "demo-news-2",
    newsTitle: "Campus community launches autumn charity drive",
    name: "Student",
    surname: "Council",
    email: "council@nu.edu.kz",
    newsDatePosted: newsDate(3),
    text_content:
      "Students and staff can contribute essential supplies at collection points across campus through the end of the month.",
    status: "accepted",
    photo: { filePath: `${process.env.PUBLIC_URL}/images/donation.jpg` },
  },
  {
    news_id: "demo-news-3",
    newsTitle: "New safety improvements arrive across campus",
    name: "Campus",
    surname: "Services",
    email: "services@nu.edu.kz",
    newsDatePosted: newsDate(5),
    text_content:
      "Additional lighting and updated wayfinding have been installed around the library and student residence areas.",
    status: "accepted",
    photo: { filePath: `${process.env.PUBLIC_URL}/images/safety.jpg` },
  },
  {
    news_id: "demo-news-4",
    newsTitle: "Applications open for the student innovation fund",
    name: "NU Innovation",
    surname: "Office",
    email: "innovation@nu.edu.kz",
    newsDatePosted: newsDate(7),
    text_content:
      "Student teams can apply for mentorship and project funding for research, technology, and community initiatives.",
    status: "accepted",
    photo: { filePath: `${process.env.PUBLIC_URL}/images/aiworkshop.jpg` },
  },
];

export const demoEvents = [
  {
    eventId: "demo-event-1",
    eventTitle: "AI and the Future of Research",
    description:
      "Meet NU researchers for an evening of talks and conversation about practical applications of artificial intelligence.",
    organizer: "NU Tech Community",
    organizer_type: "Student Organization",
    date: dayOffset(2),
    time: "17:30",
    type: "accepted",
    participants_number: 120,
    venue: { venueTitle: "Main Atrium" },
    photo: { filePath: `${process.env.PUBLIC_URL}/images/aiworkshop.jpg` },
  },
  {
    eventId: "demo-event-2",
    eventTitle: "Open Mic: New Voices",
    description:
      "An easygoing evening of live music, poetry, and performances from the NU community.",
    organizer: "NU Music Society",
    organizer_type: "Student Organization",
    date: dayOffset(4),
    time: "19:00",
    type: "accepted",
    participants_number: 80,
    venue: { venueTitle: "Senate Hall" },
    photo: { filePath: `${process.env.PUBLIC_URL}/images/openmic.jpg` },
  },
  {
    eventId: "demo-event-3",
    eventTitle: "Founders and Students Networking Night",
    description:
      "Connect with local founders and alumni for short talks, introductions, and practical career advice.",
    organizer: "NU Business Club",
    organizer_type: "Student Organization",
    date: dayOffset(7),
    time: "18:00",
    type: "accepted",
    participants_number: 95,
    venue: { venueTitle: "Library Event Space" },
    photo: { filePath: `${process.env.PUBLIC_URL}/images/networking.jpg` },
  },
  {
    eventId: "demo-event-4",
    eventTitle: "Weekend Art Studio",
    description:
      "Drop in for a relaxed afternoon of sketching, painting, and creative activities. Materials are provided.",
    organizer: "NU Art Studio",
    organizer_type: "Student Organization",
    date: dayOffset(10),
    time: "14:00",
    type: "accepted",
    participants_number: 35,
    venue: { venueTitle: "Arts Workshop" },
    photo: { filePath: `${process.env.PUBLIC_URL}/images/artstudio.jpg` },
  },
];

export const demoClubs = [
  {
    title: "Art Studio",
    description:
      "A welcoming space for visual arts, painting, and creative projects.",
    category: "Arts",
    aims: "Make art accessible and build a creative community on campus.",
    corpEmail: "artstudio@nu.edu.kz",
    logo: { filePath: `${process.env.PUBLIC_URL}/images/artstudio.jpg` },
    president: { name: "Anna", surname: "Smith" },
  },
  {
    title: "Boxing Club",
    description: "Training sessions for beginners and experienced athletes.",
    category: "Sports",
    aims: "Promote fitness, discipline, and supportive training.",
    corpEmail: "boxing@nu.edu.kz",
    logo: { filePath: `${process.env.PUBLIC_URL}/images/boxclub.jfif` },
    president: { name: "John", surname: "Doe" },
  },
  {
    title: "Board Games Society",
    description:
      "Weekly game nights featuring strategy, party, and tabletop games.",
    category: "Recreation",
    aims: "Bring students together through friendly games and shared interests.",
    corpEmail: "boardgames@nu.edu.kz",
    logo: { filePath: `${process.env.PUBLIC_URL}/images/boardgames.png` },
    president: { name: "Emily", surname: "Taylor" },
  },
];

export const demoProfile = {
  id: "demo-student",
  name: "Alisher",
  surname: "Kunbolsyn",
  phoneNumber: "+7 (701) 555-0142",
  birthDate: "14/03/2004",
  studyYear: 3,
  major: "Computer Science",
  school: "School of Engineering and Digital Sciences",
  gpa: "3.82",
  account: {
    email: "alisher.kunbolsyn@nu.edu.kz",
    photo: { filePath: `${process.env.PUBLIC_URL}/images/alisher.jpg` },
  },
};

export const demoPhonebook = {
  Students: [
    {
      id: "202300041",
      name: "Alisher Kunbolsyn",
      email: "alisher.kunbolsyn@nu.edu.kz",
      phone: "+7 (701) 555-0142",
      school: "School of Engineering and Digital Sciences",
      department: "Computer Science",
      gpa: "3.82",
      image: `${process.env.PUBLIC_URL}/images/alisher.jpg`,
    },
    {
      id: "202200118",
      name: "Daniyar Nurgali",
      email: "daniyar.nurgali@nu.edu.kz",
      phone: "+7 (702) 555-0188",
      school: "School of Sciences and Humanities",
      department: "Mathematics",
      gpa: "3.67",
      image: `${process.env.PUBLIC_URL}/images/profile.jpg`,
    },
    {
      id: "202100207",
      name: "Madina Karimova",
      email: "madina.karimova@nu.edu.kz",
      phone: "+7 (707) 555-0207",
      school: "School of Medicine",
      department: "Biomedical Sciences",
      gpa: "3.91",
      image: `${process.env.PUBLIC_URL}/images/profile.png`,
    },
  ],
  "Teaching Staff": [
    {
      id: "faculty-01",
      name: "Dr. Aigerim Omarova",
      email: "aigerim.omarova@nu.edu.kz",
      phone: "+7 (7172) 555-221",
      school: "School of Engineering and Digital Sciences",
      department: "Artificial Intelligence",
      image: `${process.env.PUBLIC_URL}/images/profile.jpg`,
    },
    {
      id: "faculty-02",
      name: "Dr. Mark Thompson",
      email: "mark.thompson@nu.edu.kz",
      phone: "+7 (7172) 555-309",
      school: "School of Sciences and Humanities",
      department: "Applied Mathematics",
      image: `${process.env.PUBLIC_URL}/images/profile.jpg`,
    },
  ],
  Staff: [
    {
      id: "staff-01",
      name: "Jane Admin",
      email: "jane.admin@nu.edu.kz",
      phone: "+7 (7172) 555-412",
      school: "Registrar's Office",
      department: "Academic Records Specialist",
      image: `${process.env.PUBLIC_URL}/images/profile.jpg`,
    },
    {
      id: "staff-02",
      name: "Arman Bekov",
      email: "arman.bekov@nu.edu.kz",
      phone: "+7 (7172) 555-508",
      school: "Student Services",
      department: "Student Support Coordinator",
      image: `${process.env.PUBLIC_URL}/images/profile.jpg`,
    },
  ],
  "Student Clubs": [
    {
      id: "artstudio@nu.edu.kz",
      name: "Art Studio (Pres: Anna Smith)",
      email: "artstudio@nu.edu.kz",
      phone: "+7 (701) 555-0101",
      school: "School of Sciences and Humanities",
      department: "Fine Arts",
      image: `${process.env.PUBLIC_URL}/images/artstudio.jpg`,
    },
    {
      id: "techcommunity@nu.edu.kz",
      name: "NU Tech Community (Pres: Daniyar Nurgali)",
      email: "techcommunity@nu.edu.kz",
      phone: "+7 (702) 555-0112",
      school: "School of Engineering and Digital Sciences",
      department: "Computer Science",
      image: `${process.env.PUBLIC_URL}/images/aiworkshop.jpg`,
    },
  ],
  Others: [
    {
      id: "library@nu.edu.kz",
      name: "NU Library",
      email: "library@nu.edu.kz",
      phone: "+7 (7172) 555-600",
      department: "Research support, study spaces, and borrowing services.",
      image: `${process.env.PUBLIC_URL}/images/profile.jpg`,
    },
    {
      id: "wellness@nu.edu.kz",
      name: "Student Wellness Center",
      email: "wellness@nu.edu.kz",
      phone: "+7 (7172) 555-710",
      department: "Counseling and wellbeing services for students.",
      image: `${process.env.PUBLIC_URL}/images/profile.jpg`,
    },
  ],
};
