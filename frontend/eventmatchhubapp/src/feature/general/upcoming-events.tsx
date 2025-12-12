'use client'

import useSWR from 'swr'
import { Event } from '@/lib/types/event'
import { EventCard } from './event-card'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function UpcomingEvents() {
  const { data: events = [] } = useSWR<Event[]>('/api/events', fetcher)

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
