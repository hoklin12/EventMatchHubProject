"use client";

import type React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import type { EventPreviewData } from "@/lib/types/event-preview";

interface EventPreviewCardProps {
  preview: EventPreviewData;
}

export const EventPreviewCard: React.FC<EventPreviewCardProps> = ({ preview }) => {
  const router = useRouter();

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/organizer/event/${preview.id}/preview`);
  };

  // Extract values safely
  const title = preview.title || "Untitled Event";
  const date = preview.dateTime?.eventDate || "TBD";
  const location =
    preview.location?.locationName || preview.location?.venue || "TBD";
  const attendeeCount = preview.registrationCount ?? preview.registered ?? 0;
  const ticketCount = preview.tickets?.length ?? 0;
  const image = preview.theme?.image || "/placeholder.svg";

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 relative">
        <div className="flex items-start gap-6 p-6">
          {/* Event Image */}
          <div className="relative w-64 h-40 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>

          {/* Event Details */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{attendeeCount}</span>
              </div>

              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                <span>{ticketCount}</span>
              </div>
            </div>
          </div>

          {/* Preview Link */}
          <div className="ml-auto self-start">
            <span
              onClick={handlePreviewClick}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 cursor-pointer"
            >
              Preview
              <span className="text-lg">↗</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
