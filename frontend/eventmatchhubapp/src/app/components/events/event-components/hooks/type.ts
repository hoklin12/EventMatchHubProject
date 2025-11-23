export interface Event {
  id: number
  title: string
  category: string
  date: string
  time: string
  location: string
  organizer: string
  attendees: number
  maxAttendees: number
  price: number
  rating: number
  image: string
  featured?: boolean
  tags: string[]
}
