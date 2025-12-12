"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { EventRowMenu } from "../actions/event-row-menu"
import type { Event } from "@/lib/types/event"

interface EventsGridProps {
  events: Event[]
}

export function EventsGrid({ events }: EventsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => {
        const capacity = event.location.capacity ?? 0
        const registered = event.registered ?? 0
        const progress = capacity > 0 ? (registered / capacity) * 100 : 0

        const statusVariant =
          event.status === "draft" ? "draft" :
          event.status === "active" ? "active" :
          "completed" // fallback


        return (
          <Card
            key={event.id}
            className="flex flex-col overflow-hidden"
            style={{ border: "1px solid var(--table-border)" }}
          >
            <div className="flex-1 space-y-4 px-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-foreground line-clamp-2">
                    {event.title}
                  </h3>

                  {/* Updated date */}
                  <p className="text-sm text-muted-foreground">
                    {event.dateTime.date}
                  </p>
                </div>
                <EventRowMenu eventId={event.id} />
              </div>

              <Badge variant="outline" className="w-fit">
                {event.category}
              </Badge>

              {/* Registered Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Registered</span>
                  <span className="font-medium">
                    {registered}/{capacity}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-medium">Free</span>

                <Badge variant={statusVariant}>{event.status}</Badge>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
