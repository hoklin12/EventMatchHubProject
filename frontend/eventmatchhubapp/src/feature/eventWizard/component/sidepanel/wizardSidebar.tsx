"use client"

import { BackButton } from "./backButton"
import { FormPreview } from "./formPreview"
import { SetupSection } from "./setupSection"
import { MainSection } from "./mainSection"
import { mockEvents } from "@/lib/mock-data/events"

interface EventWizardSidebarProps {
  currentStep?: string
  eventId?: string
}

export function EventWizardSidebar({ currentStep = "form", eventId = "evt_001" }: EventWizardSidebarProps) {
  const event = mockEvents.find((e) => e.id === eventId)

  if (!event) return null

  return (
<div className="h-full w-64 bg-gray-50 border-r border-gray-200 pt-10 flex flex-col px-2">

     <div className="flex justify-start">
        <BackButton />
      </div>
      <FormPreview event={event} />
      <SetupSection currentStep={currentStep}  eventId={eventId}/>
      <MainSection />
    </div>
  )
}
