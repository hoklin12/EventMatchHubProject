"use client";

import { usePathname } from "next/navigation";
import { EventWizardSidebar } from "./wizardSidebar";

export function EventWizardSidebarWrapper() {
  const pathname = usePathname() ?? "/";

  // Steps must match your URLs exactly
  const steps = ["create", "ticket-registration", "additional-sections", "publish"];

  // Determine the current step automatically
  const currentStep = steps.find(step => pathname.includes(step)) || "create";

  // Show on create page or any wizard page
  const isCreate = pathname.startsWith("/organizer/event/create");
  const isWizard = /\/organizer\/event\/[^/]+\/(ticket-registration|additional-sections|publish)/.test(pathname);

  if (!isCreate && !isWizard) return null;

  return (
    <div className="flex-shrink-0 w-64 border-r border-gray-200 bg-white h-screen overflow-y-auto">
      <EventWizardSidebar currentStep={currentStep} />
    </div>
  );
}
