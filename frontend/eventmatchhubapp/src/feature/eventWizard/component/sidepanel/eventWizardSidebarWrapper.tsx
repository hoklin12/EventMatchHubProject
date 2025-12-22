

"use client";

import { usePathname } from "next/navigation";
import { BackButton } from "./backButton";
import { FormPreview } from "./formPreview";
import { SetupSection } from "./setupSection";
import { MainSection } from "./mainSection";
import { mockEvents } from "@/lib/mock-data/events";
import type { Event } from "@/lib/types/event";

export function EventWizardSidebarWrapper() {
  const pathname = usePathname() ?? "/";

  // Define the base organizer event path
  const basePath = "/organizer/event";

  // Check if we are inside the event module at all
  if (!pathname.startsWith(basePath)) {
    return null;
  }

  // Hide sidebar ONLY on the exact list page: /organizer/event
  // Show on /organizer/event/create, /organizer/event/dashboard, etc.
  if (pathname === basePath || pathname === `${basePath}/`) {
    return null;
  }

  // Now we're on a valid event module page (create, dashboard, etc.)
  // Determine if we're on the create page to show SetupSection
  const isCreatePage = pathname === "/organizer/event/create" || pathname.startsWith("/organizer/event/create/");

  // For FormPreview: we need an event object
  // On create page → use placeholder "new event"
  // On other pages (dashboard, etc.) → you will later pass real eventId, but for now use a mock
  // Adjust this logic when you have real event data

  let event: Event;

  if (isCreatePage) {
    // Placeholder for new event creation
    event = {
      id: "new",
      title: "New Event",
      name: "Untitled Event",
      description: "",
      type: "conference", // match your EventType
      category: "business", // match your EventCategory
      status: "draft",
      theme: { image: null },
      dateTime: {
        eventDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
      },
      location: {
        venue: "",
        locationName: "No location yet",
        address: "",
      },
      // Add other required fields if needed
    } as unknown as Event;
  } else {
    // For other pages like dashboard, attendees, etc.
    // Use first mock event as fallback, or improve later with real data
    event = mockEvents[0] || {
      id: "fallback",
      title: "Current Event",
      name: "Event Name",
      description: "",
      type: "conference",
      category: "business",
      status: "draft",
      theme: { image: null },
      dateTime: { eventDate: "", startTime: "", endTime: "", endDate: "" },
      location: { locationName: "No location", venue: "", address: "" },
    } as unknown as Event;
  }

  return (
    <div className="flex-shrink-0 w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto">
      <div className="h-full bg-gray-50 flex flex-col pb-24">
        {/* Back Button */}
        <div className="flex-shrink-0 pt-10 px-2">
          <div className="flex justify-start py-8">
            <BackButton /> {/* Should go back to /organizer/event */}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-2 pb-10 scrollbar-hidden">
          <FormPreview event={event} />

          {/* Only show setup steps on create page */}
          {isCreatePage && (
            <SetupSection currentStep="create" eventId="new" />
          )}

          {/* Main sections always visible on all event module pages */}
          <MainSection />
        </div>
      </div>
    </div>
  );
}