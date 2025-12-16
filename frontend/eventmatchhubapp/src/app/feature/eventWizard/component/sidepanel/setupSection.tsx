"use client";

import { cn } from "@/lib/utils";
import { useSteps } from "../../hooks/useSteps";
import { useRouter } from "next/navigation";

interface Props {
  currentStep: string;
  eventId: string;
}

export function SetupSection({ currentStep, eventId }: Props) {
  const steps = useSteps(currentStep);
  const router = useRouter();

  const renderStatus = (step: any) => {
    const baseClass = "w-3 h-3 rounded-full flex-shrink-0 mt-1"; // added mt-1 to align with text
    if (step.id === currentStep) return <div className={cn(baseClass, "bg-blue-600")} />;
    if (step.completed) return <div className={cn(baseClass, "bg-green-600")} />;
    return <div className={cn(baseClass, "bg-gray-300")} />;
  };

  const stepRoutes: Record<string, string> = {
    form: `/organizer/event/${eventId}/create`,
    ticket: `/organizer/event/${eventId}/ticket-registration`,
    additional: `/organizer/event/${eventId}/additional-sections`,
    publish: `/organizer/event/${eventId}/publish`,
  };

  const handleClick = (stepId: string) => {
    const route = stepRoutes[stepId];
    if (route) router.push(route);
  };

  return (
    <div className="bg-white rounded-md border border-gray-200 w-full px-4 py-4 mb-3 shadow-sm">
      <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">
        Event Setup
      </h4>

      <p className="text-xs text-gray-600 mb-4">
        Configure your event settings before publishing
      </p>

      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.id}>
            {/* Make whole div clickable */}
            <button
              onClick={() => handleClick(step.id)}
              className="flex gap-3 items-start w-full text-left p-1 hover:bg-gray-50 rounded"
            >
              {renderStatus(step)}
              <div className="flex flex-col">
                <p
                  className={cn(
                    "text-xs font-medium",
                    step.id === currentStep ? "text-blue-600" : "text-gray-700"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                )}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
