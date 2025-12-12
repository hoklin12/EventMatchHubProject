"use client";

import { Input } from "@/app/components/ui/input";
import { TabsContent } from "@/app/components/ui/tabs";
import { Search } from "lucide-react";
import { EventCard } from "@/app/components/sections/elements/event-card";
import { Event } from "@/app/types";

interface UpcomingTabProps {
  events: Event[];
}

export function UpcomingTab({ events }: UpcomingTabProps) {
  return (
    <TabsContent value="upcoming" className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search your events..." className="pl-9" />
        </div>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}        // pass the event id
            title={event.title}
            date={event.date}
            time={event.time}
            location={event.location}
            daysUntil={event.daysUntil}
            image={event.image}
          />
        ))}
      </div>
    </TabsContent>
  );
}
