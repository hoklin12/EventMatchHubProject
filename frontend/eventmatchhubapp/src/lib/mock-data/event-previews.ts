import type { EventPreviewData } from "../types/event-preview"

export const mockEventPreviewData: EventPreviewData = {
  id: "evt_001",
  title: "AI & Machine Learning Summit 2025",
  name: "AI & Machine Learning Summit 2025",
  type: "Seminar",
  category: "Technology",
  description:
    "Discover how artificial intelligence is changing the world around us at the AI & Machine Learning Summit 2025.\n\nFrom self-driving cars to creative AI tools, this event opens the doors to everyone curious about the power and possibilities of machine learning.",
  theme: {
    image: "/panel_discussion.png",
  },
  dateTime: {
    eventDate: "2025-10-22",
    endDate: "2025-10-23",
    startTime: "10:00 AM",
    endTime: "05:00 PM",
  },
  location: {
    venue: "Main Hall",
    locationName: "Cambodia Academy of Digital Technology",
    address: "Street 315, Phnom Penh, Cambodia",
    capacity: 200,
  },
  status: "draft",
  createdAt: "2025-10-01",
  updatedAt: "2025-10-15",
  organizer: {
    id: "org_001",
    name: "Ms Touch Livita",
    imageUrl: "/profile.png",
    profileUrl: "/organizer/ms-touch-livita",
  },
  overview: {
    description:
      "Discover how artificial intelligence is changing the world around us at the AI & Machine Learning Summit 2025.\n\nFrom self-driving cars to creative AI tools, this event opens the doors to everyone curious about the power and possibilities of machine learning.",
    tags: ["Technology", "Machine Learning", "Artificial Intelligence"],
  },
  schedule: {
    hasAgenda: true,
    agendaUrl: "/pdf_test.pdf", 
    message: "",
  },
  speakers: [
    {
      id: "spk_001",
      name: "Mr Lay Vathna",
      title: "Researcher",
      description: "15+ years in Artificial Intelligence",
      imageUrl: "/profile.png",
    },
    {
      id: "spk_002",
      name: "Mr Lay Vathna",
      title: "Researcher",
      description: "AI Ethics and Policy Expert",
      imageUrl: "/profile.png",
    },
    {
      id: "spk_003",
      name: "Mr Lay Vathna",
      title: "Researcher",
      description: "Machine Learning Innovator",
      imageUrl: "/profile.png",
    },
  ],
  format: "in-person",
  refundPolicy: {
    deadline: "March 5, 2025",
    terms: [
      {
        percentage: 100,
        deadline: "March 5, 2025",
        description: "Full refunds until March 5, 2025",
      },
      {
        percentage: 50,
        deadline: "March 10, 2025",
        description: "50% refunds until March 10, 2025",
      },
    ],
  },
  tickets: [],
  registrationCount: 120,
  capacity: 200,
}
