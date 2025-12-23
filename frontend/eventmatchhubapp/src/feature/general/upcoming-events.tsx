'use client'

import { EventCard } from './event-card'

// Realistic dummy events
const dummyEvents = [
  {
    id: 1,
    title: "AI & Machine Learning Summit 2025",
    date: "December 23, 2025",
    location: "Phnom Penh Convention Center",
    attendees: 312,
    maxAttendees: 500,
    price: 149.00,
    status: "live",
    image: "/ux-design-workshop.png",
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    date: "January 15, 2026",
    location: "CADT Campus",
    attendees: 156,
    maxAttendees: 200,
    price: 99.00,
    status: "upcoming",
    image: "/marketing-strategy-meeting.png",
  },
  {
    id: 3,
    title: "Digital Marketing Workshop",
    date: "February 10, 2026",
    location: "Siem Reap",
    attendees: 89,
    maxAttendees: 150,
    price: 199.00,
    status: "registration-open",
    image: "/web-development-concept.png",
  },
]

export function UpcomingEvents() {
  const events = dummyEvents

  return (
    <div>
      <h2 className="text-3xl font-semibold text-foreground mb-4">Upcoming Events</h2>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No upcoming events</p>
        )}
      </div>
    </div>
  )
}