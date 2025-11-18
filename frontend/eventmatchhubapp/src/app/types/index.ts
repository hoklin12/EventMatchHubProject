// app/types/index.ts

export interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
  featured?: boolean;
}

export interface Category {
  name: string;
  icon: string;
  count: number;
  color: string;
}
