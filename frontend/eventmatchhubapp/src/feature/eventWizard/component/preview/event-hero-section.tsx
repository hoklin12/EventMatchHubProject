"use client";

import Image from "next/image";
import { Calendar, MapPin, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { EventPreviewData } from "@/lib/types/event-preview";

interface EventHeroSectionProps {
  event: EventPreviewData;
  onReserve?: () => void;
  onShare?: () => void;
}

export function EventHeroSection({ event, onReserve, onShare }: EventHeroSectionProps) {
  return (
<div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] h-[420px]">
      {/* Hero Image */}
      <Image
        src={event.theme.image || "/placeholder.svg"}
        alt={event.title}
        fill
        className="object-cover"
        priority
      />

      {/* Card Overlay - Bottom Hanging */}
      <Card className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-white/95 backdrop-blur-sm p-8 w-[95%] max-w-5xl shadow-xl">

        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-foreground">{event.title}</h1>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(event.dateTime.eventDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                , {event.dateTime.startTime}
                {event.dateTime.endDate && (
                  <span>
                    {" - "}
                    {new Date(event.dateTime.endDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    , {event.dateTime.endTime}
                  </span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{event.location.locationName}</span>
            </div>

            {event.location.capacity && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {event.registrationCount} / {event.location.capacity}
                </span>
              </div>
            )}
          </div>

          {/* Organizer Info */}
          <div className="flex items-center gap-3 pt-2 border-t">
            <Image
              src={event.organizer.imageUrl || "/placeholder.svg"}
              alt={event.organizer.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">{event.organizer.name}</p>
              <button
                onClick={() => window.open(event.organizer.profileUrl, "_blank")}
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                View Organizer Profile
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button onClick={onReserve} className="flex-1">
              Reserve a spot
            </Button>
            <Button onClick={onShare} variant="outline" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
