
// // components/EventCreationWizard.tsx
// "use client";

// import { useState } from "react";
// import CreateEvent from "./event/CreateEvent";
// import TicketsRegistration from "./event/TicketsRegistration";
// import AdditionalSections from "./event/AdditionalSections";

// export default function EventCreationWizard() {
//   const [currentStep, setCurrentStep] = useState<"overview" | "tickets" | "additional">("overview");

//   const handleToTickets = () => setCurrentStep("tickets");
//   const handleToAdditional = () => setCurrentStep("additional");
//   const handleBackFromTickets = () => setCurrentStep("overview");
//   const handleBackFromAdditional = () => setCurrentStep("tickets");

//   return (
//     <>
//       {currentStep === "overview" && <CreateEvent onContinue={handleToTickets} currentStep="overview" />}
//       {currentStep === "tickets" && (
//         <TicketsRegistration onBack={handleBackFromTickets} onContinue={handleToAdditional} currentStep="tickets" />
//       )}
//       {currentStep === "additional" && (
//         <AdditionalSections onBack={handleBackFromAdditional} currentStep="additional" />
//       )}
//     </>
//   );
// }


// components/EventCreationWizard.tsx
"use client";

import { useState } from "react";
import CreateEvent from "./event/CreateEvent";
import TicketsRegistration from "./event/TicketsRegistration";
import AdditionalSections from "./event/AdditionalSections";
import PublishSettings from "./event/PublishSettings";

export default function EventCreationWizard() {
  const [currentStep, setCurrentStep] = useState<
    "overview" | "tickets" | "additional" | "publish"
  >("overview");

  // Navigation handlers
  const goToTickets = () => setCurrentStep("tickets");
  const goToAdditional = () => setCurrentStep("additional");
  const goToPublish = () => setCurrentStep("publish");

  const goBackFromTickets = () => setCurrentStep("overview");
  const goBackFromAdditional = () => setCurrentStep("tickets");
  const goBackFromPublish = () => setCurrentStep("additional");

  const handlePublish = () => {
    alert("Event published successfully! 🎉");
    // Redirect to event page or dashboard
    // router.push("/events");
  };

  return (
    <>
      {currentStep === "overview" && (
        <CreateEvent onContinue={goToTickets} currentStep="overview" />
      )}

      {currentStep === "tickets" && (
        <TicketsRegistration
          onBack={goBackFromTickets}
          onContinue={goToAdditional}
          currentStep="tickets"
        />
      )}

      {currentStep === "additional" && (
        <AdditionalSections
          onBack={goBackFromAdditional}
          onContinue={goToPublish}
          currentStep="additional"
        />
      )}

      {currentStep === "publish" && (
        <PublishSettings
          onBack={goBackFromPublish}
          onPublish={handlePublish}
          currentStep="publish"
        />
      )}
    </>
  );
}