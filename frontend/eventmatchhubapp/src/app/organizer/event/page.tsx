"use client"

import { EventsContent } from "@/feature/event/events-content"

export default function EventsPage() {
  return (
    <div className="flex-1 flex flex-col overflow-auto bg-background">
          <EventsContent />
        </div>
  )
}
