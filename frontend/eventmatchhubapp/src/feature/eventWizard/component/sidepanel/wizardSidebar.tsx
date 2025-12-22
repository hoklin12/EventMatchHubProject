


"use client";

import { BackButton } from "./backButton";
import { FormPreview } from "./formPreview";
import { SetupSection } from "./setupSection";
import { MainSection } from "./mainSection";
import { mockEvents } from "@/lib/mock-data/events";

interface EventWizardSidebarProps {
  currentStep?: string;
  eventId?: string;
}

export function EventWizardSidebar({
  currentStep = "form",
  eventId = "evt_001",
}: EventWizardSidebarProps) {
  const event = mockEvents.find((e) => e.id === eventId);
  if (!event) return null;

  return (
    <div className="h-full w-64 bg-gray-50 border-r border-gray-200 flex flex-col pb-24">
      {/* Fixed top: back button */}
      <div className="flex-shrink-0 pt-10 px-2">
        <div className="flex justify-start">
          <BackButton />
        </div>
      </div>

      {/* Scrollable area with hidden scrollbar */}
      <div className="flex-1 overflow-y-auto px-2 pb-10 
                      scrollbar-hide 
                      [-ms-overflow-style:none] 
                      [scrollbar-width:none] 
                      [&::-webkit-scrollbar]:hidden">
        <FormPreview event={event} />
        <SetupSection currentStep={currentStep} eventId={eventId} />
        <MainSection />
      </div>
    </div>
  );
}