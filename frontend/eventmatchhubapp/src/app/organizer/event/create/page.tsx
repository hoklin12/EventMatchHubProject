"use client";

import { CreateEventForm } from "@/feature/eventWizard/component/form/create-event-overview-form";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();

  const handleSaveDraft = async (data: any) => {
    console.log("Saving as draft:", data);

    // TODO: Replace this with real API call that returns eventId
    const eventId = await saveDraftToServer(data); // <- dynamic

    router.push(`/organizer/event/${eventId}/ticket-registration`);
  };

  const handleSaveAndContinue = async (data: any) => {
    console.log("Saving and continuing:", data);

    // TODO: Replace this with real API call that returns eventId
    const eventId = await createEvent(data); // <- dynamic

    router.push(`/organizer/event/${eventId}/ticket-registration`);
  };

  return (
    <CreateEventForm
      onSaveDraft={handleSaveDraft}
      onSaveAndContinue={handleSaveAndContinue}
    />
  );
}

// Example mock API functions for now:
async function saveDraftToServer(data: any) {
  console.log("Mock saving draft:", data);
  // return a dynamic id instead of hardcoding
  return "evt_" + Math.floor(Math.random() * 10000);
}

async function createEvent(data: any) {
  console.log("Mock creating event:", data);
  return "evt_" + Math.floor(Math.random() * 10000);
}
