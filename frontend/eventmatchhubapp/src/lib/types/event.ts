export interface Event {
  id: string
  title: string
  name: string
  type: EventType
  category: EventCategory
  description: string
  registered?: number
  theme: {
    image: string
    uploadedAt?: string
  }
  dateTime: EventDateTime
  location: EventLocation
  status: EventStatus
  createdAt: string
  updatedAt: string
}

  
  export interface User {
    id: string
    name: string
    email: string
    avatar?: string
  }
  

  export interface EventFormData {
    eventName: string
    eventType: string
    category: string
    description: string
    eventDate: string
    endDate: string
    startTime: string
    endTime: string
    venue?: string
    location: string
    address: string
    status: EventStatus
  }
  
  export type EventStatus = "draft" | "active" | "completed"
  export type EventType = "Seminar" | "Workshop" | "Conference" | "Webinar" | "Meetup"
  export type EventCategory = "Technology" | "Business" | "Literature" | "Health" | "Sports"
  
  export interface CreateEventPayload {
    title: string
    name: string
    type: EventType
    category: EventCategory
    description: string
    theme: {
      image: string
    }
    dateTime: EventDateTime
    location: EventLocation
  }

  export interface EventLocation {
    venue: string
    locationName: string
    address: string
    latitude?: number
    longitude?: number
    capacity?: number
  }
  
  export interface EventDateTime {
    eventDate: string
    endDate: string
    startTime: string
    endTime: string
  }
  
  export interface EventFormState {
    title: string
    name: string
    type: EventType | ""
    category: EventCategory | ""
    description: string
    themeImage: string
    themeImageFile?: File | null
    eventDate: string
    endDate: string
    startTime: string
    endTime: string
    venue: string
    locationName: string
    address: string
  }