"use client";

import { Calendar, Home } from "lucide-react";
import Link from "next/link";
import type { Event } from "@/lib/types/event";

interface FormPreviewProps {
  event: Event;
}

export function FormPreview({ event }: FormPreviewProps) {
  const { eventDate, endTime, startTime } = event.dateTime;

  return (
    <div className="bg-white rounded-md border border-gray-200 w-full px-4 py-3 mb-3">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{event.title}</h3>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Calendar className="w-3 h-3" />
          <span>
            {eventDate} {startTime ? `(${startTime}` : ""}{endTime ? ` - ${endTime})` : startTime ? ")" : ""}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Home className="w-3 h-3" />
          <span>{event.location.locationName || event.location.venue}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`text-xs font-medium px-3 py-1 rounded ${
            event.status === "draft"
              ? "bg-gray-200 text-gray-700"
              : event.status === "active"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </span>
        <Link href="#" className="text-xs text-blue-600 hover:underline">
          Preview
        </Link>
      </div>
    </div>
  );
}
