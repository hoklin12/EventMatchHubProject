// app/types/index.ts

export interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  time?: string;
  location: string;

  // Organizer object (your original type only had string[])
  organizer?: {
    name: string;
    logo: string;
    verified: boolean;
    rating: number;
    eventsHosted: number;
  };

  attendees: number;
  maxAttendees: number;
  price: number;
  rating: number;
  reviews?: number;
  image?: string;
  featured?: boolean;
  tags?: string[];

  // NEW: because your events include these
  description?: string;

  highlights?: string[];

  schedule?: {
    time: string;
    title: string;
  }[];

  speakers?: {
    name: string;
    role: string;
    image: string;
  }[];

  daysUntil?: number;
  status?: "Completed" | "Cancelled";
  hasCertificate?: boolean;
  attendeesStr?: string;
}
