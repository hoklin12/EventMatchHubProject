import { Event } from "@/app/types";

export const allEvents: Event[] = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "AI & Machine Learning Summit 2025",
    category: "Technology",
    date: "2025-11-22",
    time: "9:00 AM - 10:30 AM",
    location: "Phnom Penh",
    organizer: {
      name: "Cambodia Academy of Digital Technology",
      logo: "/professional-headshot.png",
      verified: true,
      rating: 4.8,
      eventsHosted: 24,
    },
    attendees: 450,
    maxAttendees: 500,
    price: 0.5,
    rating: 4.8,
    reviews: 0,
    image: "/ai-conference.png",
    featured: true,
    tags: ["AI", "Machine Learning", "Technology", "Networking"],
    description: `Join us for the premier AI & Machine Learning Summit of 2025! This full-day event brings together industry leaders, researchers, and practitioners to explore the latest advancements in artificial intelligence and machine learning.`,
    highlights: [
      "20+ Expert Speakers",
      "Hands-on Workshops",
      "Networking Sessions",
      "Certificate of Attendance",
      "Lunch & Refreshments",
      "Access to Recordings",
    ],
    schedule: [
      { time: "9:00 AM", title: "Registration & Welcome Coffee" },
      { time: "10:00 AM", title: "Keynote: The Future of AI" },
      { time: "11:30 AM", title: "Workshop: Building ML Models" },
      { time: "1:00 PM", title: "Lunch & Networking" },
      { time: "2:30 PM", title: "Panel: AI Ethics & Responsibility" },
      { time: "4:00 PM", title: "Closing Remarks & Certificates" },
    ],
    speakers: [
      {
        name: "Dr. Sarah Chen",
        role: "AI Research Lead at TechCorp",
        image: "/professional-headshot.png",
      },
      {
        name: "Prof. Michael Johnson",
        role: "Machine Learning Specialist",
        image: "/professional-headshot.png",
      },
    ],
    status: "Completed",
    hasCertificate: true,
    attendeesStr: "80-100 attendees",
  },
  {
    id: "2",
    title: "Digital Marketing Masterclass",
    category: "Business",
    date: "2025-11-24",
    time: "2:00 PM - 5:00 PM",
    location: "Siem Reap",
    organizer: {
      name: "Cambodia Academy of Digital Technology",
      logo: "/professional-headshot.png",
      verified: true,
      rating: 4.7,
      eventsHosted: 24,
    },
    attendees: 320,
    maxAttendees: 400,
    price: 0,
    rating: 4.6,
    reviews: 0,
    image: "/digital_mkt.png",
    featured: true,
    tags: ["Marketing", "Digital", "Business", "Social Media"],
    description:
      "Master the fundamentals of digital marketing in this comprehensive masterclass. Learn strategies for social media, SEO, content marketing, and email campaigns.",
    highlights: [
      "Live Case Studies",
      "Social Media Strategies",
      "SEO Fundamentals",
      "Email Marketing",
      "Analytics & Reporting",
    ],
    schedule: [
      { time: "2:00 PM", title: "Welcome & Introduction" },
      { time: "2:30 PM", title: "Social Media Strategy" },
      { time: "3:30 PM", title: "SEO & Content Marketing" },
      { time: "4:30 PM", title: "Q&A & Networking" },
    ],
    speakers: [
      {
        name: "Jessica Martinez",
        role: "Digital Marketing Director",
        image: "/professional-headshot.png",
      },
    ],
    status: "Completed",
    hasCertificate: true,
    attendeesStr: "80-100 attendees",
  },
  {
    id: "3",
    title: "Contemporary Art Exhibition",
    category: "Arts & Culture",
    date: "2025-11-26",
    time: "10:00 AM - 6:00 PM",
    location: "Phnom Penh",
    organizer: {
      name: "Cambodia Academy of Digital Technology",
      logo: "/professional-headshot.png",
      verified: true,
      rating: 4.9,
      eventsHosted: 24,
    },
    attendees: 280,
    maxAttendees: 500,
    price: 0,
    rating: 4.9,
    reviews: 0,
    image: "/art-exhibition.png",
    featured: true,
    tags: ["Art", "Exhibition", "Culture", "Contemporary"],
    description:
      "Experience cutting-edge contemporary art from emerging and established artists. This exhibition showcases diverse perspectives on modern culture and society.",
    highlights: [
      "50+ Artworks",
      "Artist Talks",
      "Gallery Tours",
      "Networking Reception",
      "Photography Allowed",
    ],
    schedule: [
      { time: "10:00 AM", title: "Exhibition Opens" },
      { time: "11:00 AM", title: "Artist Talk: Modern Perspectives" },
      { time: "1:00 PM", title: "Guided Gallery Tours" },
      { time: "3:00 PM", title: "Networking Reception" },
    ],
    speakers: [
      {
        name: "Alex Rivera",
        role: "Contemporary Art Curator",
        image: "/professional-headshot.png",
      },
    ],
    status: "Completed",
    hasCertificate: true,
    attendeesStr: "80-100 attendees",
  },
  {
    id: "4",
    title: "Web Development Bootcamp",
    category: "Technology",
    date: "2025-11-28",
    time: "10:00 AM - 4:00 PM",
    location: "Battambang",
    organizer: {
      name: "Cambodia Academy of Digital Technology",
      logo: "/professional-headshot.png",
      verified: true,
      rating: 4.8,
      eventsHosted: 24,
    },
    attendees: 80,
    maxAttendees: 120,
    price: 0,
    rating: 4.7,
    reviews: 0,
    image: "/web-development-concept.png",
    featured: false,
    tags: ["Web Dev", "Coding", "JavaScript", "React"],
    description:
      "Intensive bootcamp covering modern web development fundamentals. Perfect for beginners and intermediate developers looking to level up.",
    highlights: [
      "Hands-on Coding",
      "Modern Frameworks",
      "Project-Based Learning",
      "Career Guidance",
    ],
    schedule: [
      { time: "10:00 AM", title: "Setup & Fundamentals" },
      { time: "11:00 AM", title: "HTML & CSS Basics" },
      { time: "12:30 PM", title: "Lunch Break" },
      { time: "1:30 PM", title: "JavaScript & React" },
      { time: "3:30 PM", title: "Q&A & Next Steps" },
    ],
    speakers: [
      {
        name: "Tom Wilson",
        role: "Senior Web Developer",
        image: "/professional-headshot.png",
      },
    ],
    status: "Cancelled",
    hasCertificate: false,
    attendeesStr: "250-300 attendees",
  },
  {
    id: "5",
    title: "UX/UI Design Workshop",
    category: "Technology",
    date: "2025-11-29",
    time: "1:00 PM - 5:00 PM",
    location: "Siem Reap",
    organizer: {
      name: "Cambodia Academy of Digital Technology",
      logo: "/professional-headshot.png",
      verified: true,
      rating: 4.9,
      eventsHosted: 24,
    },
    attendees: 60,
    maxAttendees: 100,
    price: 0,
    rating: 4.9,
    reviews: 0,
    image: "/ux-design-workshop.png",
    featured: false,
    tags: ["UX", "UI", "Design", "Figma"],
    description:
      "Learn the principles of user experience and user interface design. Create beautiful, functional designs that users love.",
    highlights: [
      "Design Thinking",
      "Figma Workshop",
      "Usability Testing",
      "Design Systems",
    ],
    schedule: [
      { time: "1:00 PM", title: "UX Principles" },
      { time: "2:00 PM", title: "Figma Basics" },
      { time: "3:00 PM", title: "Design Project" },
      { time: "4:30 PM", title: "Presentations & Feedback" },
    ],
    speakers: [
      {
        name: "Emily Chen",
        role: "UX/UI Designer",
        image: "/professional-headshot.png",
      },
    ],
    status: "Completed",
    hasCertificate: true,
    attendeesStr: "80-100 attendees",
  },
  {
    id: "6",
    title: "Business Growth Strategy Summit",
    category: "Business",
    date: "2025-11-30",
    time: "9:00 AM - 12:00 PM",
    location: "Phnom Penh",
    organizer: {
      name: "Cambodia Academy of Digital Technology",
      logo: "/professional-headshot.png",
      verified: true,
      rating: 4.8,
      eventsHosted: 24,
    },
    attendees: 45,
    maxAttendees: 80,
    price: 0,
    rating: 4.8,
    reviews: 0,
    image: "/marketing-strategy-meeting.png",
    featured: false,
    tags: ["Business", "Strategy", "Growth", "Leadership"],
    description:
      "Discover proven strategies for accelerating business growth. Network with entrepreneurs and business leaders.",
    highlights: [
      "Strategic Planning",
      "Market Analysis",
      "Growth Hacking",
      "Networking",
    ],
    schedule: [
      { time: "9:00 AM", title: "Opening Keynote" },
      { time: "10:00 AM", title: "Strategic Planning Workshop" },
      { time: "11:00 AM", title: "Growth Hacking Panel" },
      { time: "12:00 PM", title: "Networking Lunch" },
    ],
    speakers: [
      {
        name: "Robert Thompson",
        role: "Business Strategy Consultant",
        image: "/professional-headshot.png",
      },
    ],
    status: "Cancelled",
    hasCertificate: false,
    attendeesStr: "250-300 attendees",
  },
];

// Helper functions remain the same, but update getEventById to accept number
export const getEventsByCategory = (category: string) =>
  allEvents.filter((event) => event.category === category);

export const getFeaturedEvents = () =>
  allEvents.filter((event) => event.featured).slice(0, 4);

export const getUpcomingEvents = () => allEvents.slice(0, 3);

export const getEventById = (id: string) =>
  allEvents.find((event) => event.id === id);

export const getRecommendedEvents = () =>
  allEvents
    .filter((e) => (e.rating && e.rating >= 4.7) || e.featured)
    .slice(0, 4);

export const getPastEvents = () => {
  const today = new Date();
  return allEvents.filter((e) => new Date(e.date) < today);
};
