"use client"

import { RecommendedEventCard } from "../recommended-event-card"
import { Empty } from "@/app/components/ui/empty"
import { Event } from "@/app/types"

interface EventListProps {
  events: Event[]
  isLoading?: boolean
}

export function EventList({ events, isLoading }: EventListProps) {
  if (isLoading) {
    return <div className="text-center py-8">Loading events...</div>
  }

  if (events.length === 0) {
    return <Empty title="No events found" />
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <RecommendedEventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
