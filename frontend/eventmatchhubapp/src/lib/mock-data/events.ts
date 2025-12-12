// src/mocks/events.ts
import { Event, User, CreateEventPayload, EventFormState } from '../types/event'

export const mockUser: User = {
  id: '1',
  name: 'Sovan',
  email: 'sovan@example.com',
  avatar: 'S'
}

export const mockEvents: Event[] = [
  {
    id: 'evt_001',
    title: 'AI & Machine Learning Summit 2025',
    name: 'AI & ML Summit 2025',
    type: 'Conference',
    category: 'Technology',
    description: 'An in-depth summit covering the latest advances in AI and machine learning, hands-on workshops, and networking for researchers and practitioners.',
    registered: 120,
    theme: {
      image: 'https://example.com/images/ai-summit-2025.jpg',
      uploadedAt: '2025-08-15T10:22:00Z'
    },
    dateTime: {
      eventDate: '2025-11-03',
      endDate: '2025-11-03', // or actual end date
      startTime: '09:00',
      endTime: '17:00'
    },
    
    location: {
      venue: 'Cambodia Academy of Digital Technology (CADT)',
      locationName: 'Main Auditorium',
      address: '123 Tech Ave, Phnom Penh, Cambodia',
      latitude: 11.562108,
      longitude: 104.888535,
      capacity: 300
    },
    status: 'active',
    createdAt: '2025-06-01T08:30:00Z',
    updatedAt: '2025-11-09T12:00:00Z'
  },
  {
    id: 'evt_002',
    title: 'Product Design Workshop — Rapid Prototyping',
    name: 'Rapid Prototyping Workshop',
    type: 'Workshop',
    category: 'Business',
    description: 'Hands-on workshop teaching rapid prototyping techniques using Figma and low-fidelity materials.',
    registered: 36,
    theme: {
      image: 'https://example.com/images/proto-workshop.jpg',
      uploadedAt: '2025-09-01T14:10:00Z'
    },
    dateTime: {
      eventDate: '2025-11-03',
      endDate: '2025-11-03', // or actual end date
      startTime: '09:00',
      endTime: '17:00'
    },
    location: {
      venue: 'Co-Create Studio',
      locationName: 'Workshop Room B',
      address: '45 Startup St, Phnom Penh, Cambodia',
      capacity: 36
    },
    status: 'completed',
    createdAt: '2025-09-02T09:00:00Z',
    updatedAt: '2025-09-10T11:45:00Z'
  },
  {
    id: 'evt_003',
    title: 'Healthy Living Webinar: Nutrition Basics',
    name: 'Nutrition Basics Webinar',
    type: 'Webinar',
    category: 'Health',
    description: 'An introductory webinar to nutrition, meal planning, and healthy lifestyles — Q&A with a registered dietitian.',
    theme: {
      image: 'https://example.com/images/nutrition-webinar.png'
    },
    dateTime: {
      eventDate: '2025-11-03',
      endDate: '2025-11-03', // or actual end date
      startTime: '09:00',
      endTime: '17:00'
    },
    location: {
      venue: 'Online',
      locationName: 'Zoom Webinar',
      address: 'https://zoom.example/meeting/987654321',
      capacity: 80
    },
    status: 'draft',
    createdAt: '2025-10-05T07:20:00Z',
    updatedAt: '2025-10-05T07:20:00Z'
  },
  {
    id: 'evt_004',
    title: 'Community Meetup: Indie Game Developers',
    name: 'Indie Game Dev Meetup — Phnom Penh',
    type: 'Meetup',
    category: 'Technology',
    description: 'Monthly meetup for independent game developers to show progress, get feedback and meet collaborators.',
    theme: {
      image: 'https://example.com/images/indie-game-meetup.jpg',
      uploadedAt: '2025-07-12T16:00:00Z'
    },
    dateTime: {
      eventDate: '2025-11-03',
      endDate: '2025-11-03', // or actual end date
      startTime: '09:00',
      endTime: '17:00'
    },
    location: {
      venue: 'Pixel Hub',
      locationName: 'Rooftop Area',
      address: '67 Creative Ln, Phnom Penh',
      latitude: 11.5564,
      longitude: 104.9282,
      capacity: 80
    },
    status: 'draft',
    createdAt: '2025-07-01T10:00:00Z',
    updatedAt: '2025-10-30T09:15:00Z'
  }
]

/**
 * Example payloads for creating a new event (matching CreateEventPayload)
 */
export const mockCreateEvent1: CreateEventPayload = {
  title: 'Intro to Flutter for Mobile',
  name: 'Flutter Intro Bootcamp',
  type: 'Seminar',
  category: 'Technology',
  description: 'A beginner-friendly seminar introducing Flutter basics for building cross-platform mobile apps.',
  theme: {
    image: 'https://example.com/images/flutter-bootcamp.jpg'
  },
  dateTime: {
    eventDate: '2025-11-03',
    endDate: '2025-11-03', // or actual end date
    startTime: '09:00',
    endTime: '17:00'
  },
  location: {
    venue: 'Tech Learning Center',
    locationName: 'Room 204',
    address: '10 Developer Dr, Phnom Penh',
    capacity: 50
  }
}

/**
 * Default / example form state for your event form (EventFormState)
 */
export const mockEventFormState: EventFormState = {
  title: '',
  name: '',
  type: '',
  category: '',
  description: '',
  themeImage: '',
  eventDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  venue: '',
  locationName: '',
  address: ''
}
