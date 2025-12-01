"use client";

import { EventCard } from "./event-card";
import { Event } from "@/app/types"; // define your Event type

interface EventListProps {
  events: Event[];
  limit?: number; // optional limit for number of events
  onViewDetails?: (event: Event) => void;
}

export function EventList({ events, limit }: EventListProps) {
  const displayedEvents = limit ? events.slice(0, limit) : events;

  return (
    <div className="grid gap-4">
      {displayedEvents.map((event) => (
        <EventCard
          key={event.id}
          id={event.id} 
          title={event.title}
          date={event.date}
          time={event.time}
          location={event.location}
          daysUntil={event.daysUntil}
          image={event.image}
        />
      ))}
    </div>
  );
}
