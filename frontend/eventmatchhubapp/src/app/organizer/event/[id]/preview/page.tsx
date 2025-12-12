"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { Eye } from "lucide-react"

import { Badge } from "@/app/components/ui/badge";
import { EventHeroSection } from "@/feature/eventWizard/component/preview/event-hero-section";
import { EventOverviewSection } from "@/feature/eventWizard/component/preview/event-overview-section";
import { ScheduleHighlightsSection } from "@/feature/eventWizard/component/preview/schedule-highlight-section";
import { FeatureSpeakersSection } from "@/feature/eventWizard/component/preview/feature-speakers-section";
import { EventDetailsSection } from "@/feature/eventWizard/component/preview/event-details-section";
import type { EventPreviewData } from "@/lib/types/event-preview";
import { EventService } from "@/lib/services/event-service";
import { WizardButtons } from "@/feature/eventWizard/component/wizard/wizardButtons"

export default function EventPreviewPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const [eventData, setEventData] = useState<EventPreviewData | null>(null);
  const [loading, setLoading] = useState(true);

  const isPreview = true;

  useEffect(() => {
    if (!eventId) return;

    //Use the service instead of fetch
    EventService.getEventById(eventId)
      .then((data) => {
        setEventData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch event data", err);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) return <div className="p-6 text-center">Loading event...</div>;
  if (!eventData)
    return <div className="p-6 text-center text-red-500">Event not found.</div>;

  const canEdit = eventData.status === "draft";

  const handleReserve = () => console.log("Reserve spot clicked");

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: eventData.title,
        text: eventData.description,
        url: window.location.href,
      });
    } else {
      console.log("Share clicked");
    }
  };

  const handleEditEvent = () => {
    router.push(`/organizer/event/create`);
  };

  const handleClosePreview = () => {
    router.push(`/organizer/event/${eventId}/publish-sections`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Close Preview Button */}
      {isPreview && (
        <div className="border-b bg-white">
        <div className="container mx-auto pl-2 pr-6 py-3">

            <button
              onClick={handleClosePreview}
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Eye className="h-4 w-4" />
              Close preview
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <EventHeroSection event={eventData} onReserve={handleReserve} onShare={handleShare} />

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-5xl pb-28">

        <div className="space-y-12">
          {/* Push Overview Section lower */}
          <div className="mt-[200px]"> {/* increase from 160px to 200px for more space */}
            <EventOverviewSection event={eventData} />
          </div>

          <ScheduleHighlightsSection event={eventData} />
          <FeatureSpeakersSection speakers={eventData.speakers} />
          <EventDetailsSection event={eventData} />
        </div>
      </div>


      {/* Footer Actions */}
      {canEdit && (
        <div className="fixed top-24 right-6 z-50">
          {eventData.status === "draft" && (
            <Badge variant="secondary" className="gap-2 py-1 px-3">
              <div className="h-2 w-2 rounded-full bg-primary" />
              Status: Draft
            </Badge>
          )}
          {eventData.status === "active" && (
            <Badge variant="default" className="gap-2 py-1 px-3">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              Status: Published
            </Badge>
          )}
          {eventData.status === "completed" && (
            <Badge variant="default" className="gap-2 py-1 px-3">
              <div className="h-2 w-2 rounded-full bg-gray-500" />
              Status: Completed
            </Badge>
          )}

        {/* Wizard Button */}
        <WizardButtons
          hideDraft={true}
          nextLabel="Edit Event"
          onSaveAndContinue={handleEditEvent}
        />
      </div>
     )}

    </div>
  );
}
