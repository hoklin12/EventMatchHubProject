"use client"

import Link from "next/link"
import { RecommendedEventCard } from "./recommended-event-card"
import { Button } from "@/app/components/ui/button"
import { Event } from "@/app/types"

interface RecommendedEventsSectionProps {
  events: Event[]
}

export function RecommendedEventsSection({ events }: RecommendedEventsSectionProps) {
  return (
    <section className="py-16" style={{ backgroundColor: "var(--background-light)" }}>
      <div className="container mx-auto px-4">

        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Recommended for You</h2>
            <p className="text-muted-foreground">
              Personalized event suggestions based on your interests
            </p>
          </div>

          <Button variant="outline" asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <RecommendedEventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}
