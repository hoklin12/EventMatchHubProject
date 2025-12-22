// // src/mocks/events.ts
// import { Event, User, CreateEventPayload, EventFormState } from '../types/event'

// export const mockUser: User = {
//   id: '1',
//   name: 'Sovan',
//   email: 'sovan@example.com',
//   avatar: 'S'
// }

// export const mockEvents: Event[] = [
//   {
//     id: 'evt_001',
//     title: 'AI & Machine Learning Summit 2025',
//     name: 'AI & ML Summit 2025',
//     type: 'Conference',
//     category: 'Technology',
//     description: 'An in-depth summit covering the latest advances in AI and machine learning, hands-on workshops, and networking for researchers and practitioners.',
//     registered: 120,
//     theme: {
//       image: 'https://example.com/images/ai-summit-2025.jpg',
//       uploadedAt: '2025-08-15T10:22:00Z'
//     },
//     dateTime: {
//       eventDate: '2025-11-03',
//       endDate: '2025-11-03', // or actual end date
//       startTime: '09:00',
//       endTime: '17:00'
//     },
    
//     location: {
//       venue: 'Cambodia Academy of Digital Technology (CADT)',
//       locationName: 'Main Auditorium',
//       address: '123 Tech Ave, Phnom Penh, Cambodia',
//       latitude: 11.562108,
//       longitude: 104.888535,
//       capacity: 300
//     },
//     status: 'active',
//     createdAt: '2025-06-01T08:30:00Z',
//     updatedAt: '2025-11-09T12:00:00Z'
//   },
//   {
//     id: 'evt_002',
//     title: 'Product Design Workshop — Rapid Prototyping',
//     name: 'Rapid Prototyping Workshop',
//     type: 'Workshop',
//     category: 'Business',
//     description: 'Hands-on workshop teaching rapid prototyping techniques using Figma and low-fidelity materials.',
//     registered: 36,
//     theme: {
//       image: 'https://example.com/images/proto-workshop.jpg',
//       uploadedAt: '2025-09-01T14:10:00Z'
//     },
//     dateTime: {
//       eventDate: '2025-11-03',
//       endDate: '2025-11-03', // or actual end date
//       startTime: '09:00',
//       endTime: '17:00'
//     },
//     location: {
//       venue: 'Co-Create Studio',
//       locationName: 'Workshop Room B',
//       address: '45 Startup St, Phnom Penh, Cambodia',
//       capacity: 36
//     },
//     status: 'completed',
//     createdAt: '2025-09-02T09:00:00Z',
//     updatedAt: '2025-09-10T11:45:00Z'
//   },
//   {
//     id: 'evt_003',
//     title: 'Healthy Living Webinar: Nutrition Basics',
//     name: 'Nutrition Basics Webinar',
//     type: 'Webinar',
//     category: 'Health',
//     description: 'An introductory webinar to nutrition, meal planning, and healthy lifestyles — Q&A with a registered dietitian.',
//     theme: {
//       image: 'https://example.com/images/nutrition-webinar.png'
//     },
//     dateTime: {
//       eventDate: '2025-11-03',
//       endDate: '2025-11-03', // or actual end date
//       startTime: '09:00',
//       endTime: '17:00'
//     },
//     location: {
//       venue: 'Online',
//       locationName: 'Zoom Webinar',
//       address: 'https://zoom.example/meeting/987654321',
//       capacity: 80
//     },
//     status: 'draft',
//     createdAt: '2025-10-05T07:20:00Z',
//     updatedAt: '2025-10-05T07:20:00Z'
//   },
//   {
//     id: 'evt_004',
//     title: 'Community Meetup: Indie Game Developers',
//     name: 'Indie Game Dev Meetup — Phnom Penh',
//     type: 'Meetup',
//     category: 'Technology',
//     description: 'Monthly meetup for independent game developers to show progress, get feedback and meet collaborators.',
//     theme: {
//       image: 'https://example.com/images/indie-game-meetup.jpg',
//       uploadedAt: '2025-07-12T16:00:00Z'
//     },
//     dateTime: {
//       eventDate: '2025-11-03',
//       endDate: '2025-11-03', // or actual end date
//       startTime: '09:00',
//       endTime: '17:00'
//     },
//     location: {
//       venue: 'Pixel Hub',
//       locationName: 'Rooftop Area',
//       address: '67 Creative Ln, Phnom Penh',
//       latitude: 11.5564,
//       longitude: 104.9282,
//       capacity: 80
//     },
//     status: 'draft',
//     createdAt: '2025-07-01T10:00:00Z',
//     updatedAt: '2025-10-30T09:15:00Z'
//   }
// ]

// /**
//  * Example payloads for creating a new event (matching CreateEventPayload)
//  */
// export const mockCreateEvent1: CreateEventPayload = {
//   title: 'Intro to Flutter for Mobile',
//   name: 'Flutter Intro Bootcamp',
//   type: 'Seminar',
//   category: 'Technology',
//   description: 'A beginner-friendly seminar introducing Flutter basics for building cross-platform mobile apps.',
//   theme: {
//     image: 'https://example.com/images/flutter-bootcamp.jpg'
//   },
//   dateTime: {
//     eventDate: '2025-11-03',
//     endDate: '2025-11-03', // or actual end date
//     startTime: '09:00',
//     endTime: '17:00'
//   },
//   location: {
//     venue: 'Tech Learning Center',
//     locationName: 'Room 204',
//     address: '10 Developer Dr, Phnom Penh',
//     capacity: 50
//   }
// }

// /**
//  * Default / example form state for your event form (EventFormState)
//  */
// export const mockEventFormState: EventFormState = {
//   title: '',
//   name: '',
//   type: '',
//   category: '',
//   description: '',
//   themeImage: '',
//   eventDate: '',
//   endDate: '',
//   startTime: '',
//   endTime: '',
//   venue: '',
//   locationName: '',
//   address: ''
// }


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
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      uploadedAt: '2025-08-15T10:22:00Z'
    },
    dateTime: {
      eventDate: '2025-11-15',
      endDate: '2025-11-17',
      startTime: '09:00',
      endTime: '18:00'
    },
    location: {
      venue: 'Cambodia Academy of Digital Technology (CADT)',
      locationName: 'Main Auditorium',
      address: 'Russian Blvd, Phnom Penh, Cambodia',
      latitude: 11.562108,
      longitude: 104.888535,
      capacity: 500
    },
    status: 'active',
    createdAt: '2025-06-01T08:30:00Z',
    updatedAt: '2025-11-09T12:00:00Z',

    // === PAYMENT INFO ADDED HERE ===
    isPaid: true,
    ticketPrice: 199.00,
    currency: 'USD',
    ticketTiers: [
      { name: 'Early Bird', price: 149.00, availableUntil: '2025-09-30' },
      { name: 'Regular', price: 199.00, availableUntil: '2025-11-10' },
      { name: 'On-site', price: 249.00, availableUntil: null }
    ]
  },
  {
    id: 'evt_002',
    title: 'Product Design Workshop — Rapid Prototyping',
    name: 'Rapid Prototyping Workshop',
    type: 'Workshop',
    category: 'Business',
    description: 'Hands-on workshop teaching rapid prototyping techniques using Figma and physical materials.',
    registered: 36,
    theme: {
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80',
      uploadedAt: '2025-09-01T14:10:00Z'
    },
    dateTime: {
      eventDate: '2025-12-05',
      endDate: '2025-12-05',
      startTime: '10:00',
      endTime: '16:00'
    },
    location: {
      venue: 'Co-Create Studio',
      locationName: 'Workshop Room B',
      address: '45 Startup St, Phnom Penh, Cambodia',
      capacity: 40
    },
    status: 'active',
    createdAt: '2025-09-02T09:00:00Z',
    updatedAt: '2025-11-20T11:45:00Z',

    // Paid workshop
    isPaid: true,
    ticketPrice: 89.00,
    currency: 'USD',
    ticketTiers: [
      { name: 'Standard Ticket', price: 89.00, availableUntil: null }
    ]
  },
  {
    id: 'evt_003',
    title: 'Healthy Living Webinar: Nutrition Basics',
    name: 'Nutrition Basics Webinar',
    type: 'Webinar',
    category: 'Health',
    description: 'An introductory webinar to nutrition, meal planning, and healthy lifestyles — Q&A with a registered dietitian.',
    registered: 85,
    theme: {
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80',
      uploadedAt: '2025-10-01T08:00:00Z'
    },
    dateTime: {
      eventDate: '2025-12-10',
      endDate: '2025-12-10',
      startTime: '19:00',
      endTime: '20:30'
    },
    location: {
      venue: 'Online',
      locationName: 'Zoom Webinar',
      address: 'https://zoom.us/j/987654321',
      capacity: 200
    },
    status: 'active',
    createdAt: '2025-10-05T07:20:00Z',
    updatedAt: '2025-11-15T10:00:00Z',

    // Free event
    isPaid: false,
    ticketPrice: 0,
    currency: 'USD'
  },
  {
    id: 'evt_004',
    title: 'Community Meetup: Indie Game Developers',
    name: 'Indie Game Dev Meetup — Phnom Penh',
    type: 'Meetup',
    category: 'Technology',
    description: 'Monthly meetup for independent game developers to share progress, get feedback, and find collaborators.',
    registered: 42,
    theme: {
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
      uploadedAt: '2025-07-12T16:00:00Z'
    },
    dateTime: {
      eventDate: '2025-12-20',
      endDate: '2025-12-20',
      startTime: '18:00',
      endTime: '21:00'
    },
    location: {
      venue: 'Pixel Hub',
      locationName: 'Rooftop Area',
      address: '67 Creative Ln, Phnom Penh',
      latitude: 11.5564,
      longitude: 104.9282,
      capacity: 80
    },
    status: 'active',
    createdAt: '2025-07-01T10:00:00Z',
    updatedAt: '2025-12-01T09:15:00Z',

    // Free community event
    isPaid: false,
    ticketPrice: 0,
    currency: 'USD'
  }
]

/**
 * Example payload for creating a new paid event
 */
export const mockCreateEventPaid: CreateEventPayload = {
  title: 'Advanced React & Next.js Masterclass',
  name: 'React Masterclass 2025',
  type: 'Workshop',
  category: 'Technology',
  description: 'Deep dive into modern React patterns, Next.js App Router, Server Actions, and performance optimization.',
  theme: {
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80'
  },
  dateTime: {
    eventDate: '2025-12-18',
    endDate: '2025-12-19',
    startTime: '09:00',
    endTime: '17:00'
  },
  location: {
    venue: 'DevHub Center',
    locationName: 'Training Hall A',
    address: '88 Code Street, Phnom Penh',
    capacity: 60
  }
}

/**
 * Default empty form state
 */
export const mockEventFormState: EventFormState = {
  title: '',
  name: '',
  type: '',
  category: '',
  description: '',
  themeImage: '',
  themeImageFile: null,
  eventDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  venue: '',
  locationName: '',
  address: ''
}