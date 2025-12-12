'use client'

import { Calendar, MapPin } from 'lucide-react'
import { Event } from '@/lib/types/event'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition cursor-pointer hover:border-primary/50">
      <div className="flex gap-4">
        <div className="w-1 bg-primary rounded-full flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm">{event.title}</h3>
          <div className="flex items-center gap-2 text-muted-foreground text-xs mt-2">
            <Calendar size={14} />
            <span>{event.dateTime.eventDate} - {event.dateTime.endTime}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs mt-1">
            <MapPin size={14} />
            <span>{event.location.locationName}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
