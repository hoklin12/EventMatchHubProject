/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

export interface EventCardProps {
  id: number; 
  title: string;
  date: string;
  time?: string;
  location: string;
  daysUntil?: number;
  image?: string; // optional for left image
  showBadge?: boolean; // whether to show daysUntil badge
}

export function EventCard({
  id, // receive id
  title,
  date,
  time,
  location,
  daysUntil,
  image,
  showBadge = true,
}: EventCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden flex gap-4">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-32 h-auto object-cover rounded-l-lg flex-shrink-0"
        />
      )}

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-semibold">{title}</h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {date} {time && `at ${time}`}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
          </div>

          {showBadge && daysUntil !== undefined && (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-700 flex items-center h-fit"
            >
              <Clock className="w-3 h-3 mr-1" />
              {daysUntil}d
            </Badge>
          )}
        </div>

        <div className="mt-4">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs"
            asChild
          >
            <Link href={`/events/${id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
