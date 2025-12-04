/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { TabsContent } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Calendar, MapPin, Award, Users } from "lucide-react";
import { allEvents } from "@/lib/data/event-datas";

export function RegisteredEvent() {
  const [registrationFilter, setRegistrationFilter] = useState("completed");
  const completedEvents = allEvents.filter(e => e.status === "Completed");
  const cancelledEvents = allEvents.filter(e => e.status === "Cancelled");
  const completedCount = allEvents.filter(
    (event) => event.status === "Completed"
  ).length;
  const cancelledCount = allEvents.filter(
    (event) => event.status === "Cancelled"
  ).length;

  return (
    <TabsContent value="registrations" className="space-y-6">
      <div className="flex gap-2">
        <Button
          variant={registrationFilter === "completed" ? "default" : "outline"}
          onClick={() => setRegistrationFilter("completed")}
          size="sm"
        >
          Completed ({completedCount})
        </Button>
        <Button
          variant={registrationFilter === "cancelled" ? "default" : "outline"}
          onClick={() => setRegistrationFilter("cancelled")}
          size="sm"
        >
          Cancelled ({cancelledCount})
        </Button>
      </div>

      {/* Show events based on filter */}
      <div className="space-y-4">
        {registrationFilter === "completed" &&
          completedEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-35 h-35 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <Badge variant="active" className="mt-1">
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-foreground/70">
                      <div className="flex items-center gap-1 text-xs">
                        <Calendar className="w-4 h-4" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Users className="w-4 h-4" />
                        {event.attendees}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Link href={`/events/${event.id}`}>View Details</Link>
                      </Button>
                      {event.hasCertificate && (
                        <Button variant="outline" size="sm" className="text-xs">
                          <Award className="w-2 h-2" />
                          Certificate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        {registrationFilter === "cancelled" &&
          cancelledEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-35 h-35 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <Badge variant="destructive" className="mt-1">
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-foreground/70">
                      <div className="flex items-center gap-1 text-xs">
                        <Calendar className="w-4 h-4" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Award className="w-4 h-4" />
                        {event.attendees}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </TabsContent>
  );
}
