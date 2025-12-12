"use client";

import { FileText, ExternalLink } from "lucide-react";
import type { EventPreviewData } from "@/lib/types/event-preview";

interface ScheduleHighlightsSectionProps {
  event: EventPreviewData;
}

export function ScheduleHighlightsSection({ event }: ScheduleHighlightsSectionProps) {
  const hasAgenda =
    event.schedule?.hasAgenda === true && !!event.schedule?.agendaUrl;

  const agendaFileName = event.schedule?.agendaUrl
    ? event.schedule.agendaUrl.split("/").pop()
    : null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">Schedule Highlights</h2>

      {hasAgenda ? (
        <div className="p-6 border border-gray-100 rounded-lg shadow-sm flex items-center justify-between bg-white">
          {/* Left: File information */}
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">
              {agendaFileName || "Agenda.pdf"}
            </span>
          </div>

          {/* Right: View Agenda */}
          <a
            href={event.schedule!.agendaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            View Agenda
          </a>
        </div>
      ) : (
        <div className="p-8 border rounded-lg text-center">
          <p className="text-muted-foreground">
            {event.schedule?.message || "Schedule details will be announced soon."}
          </p>
        </div>
      )}
    </section>
  );
}
