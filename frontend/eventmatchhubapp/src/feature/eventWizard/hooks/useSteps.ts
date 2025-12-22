
// import type { EventSetupStep } from "../types/eventSetupStep"
// import { EVENT_SETUP_STEPS } from "../constants/wizardNavigation"
// import { useMemo } from "react"

// /**
//  * Returns the list of steps with `completed` flag based on currentStepId
//  */
// export const useSteps = (currentStepId?: string) => {
//   return useMemo(() => {
//     const currentIndex = EVENT_SETUP_STEPS.findIndex(step => step.id === currentStepId)

//     return EVENT_SETUP_STEPS.map((step, index) => ({
//       ...step,
//       completed: currentIndex > index, // all steps before currentStep are completed
//     }))
//   }, [currentStepId])
// }


import { EVENT_SETUP_STEPS } from "../component/sidepanel/mainSection";
import { useMemo } from "react";

/**
 * Returns the list of setup steps with additional status flags:
 * - completed: true if the step has been passed (before current step)
 * - current: true if this is the active step
 * - upcoming: true if this step is after the current one
 */
export const useSteps = (currentStepId?: string) => {
  return useMemo(() => {
    const currentIndex = currentStepId
      ? EVENT_SETUP_STEPS.findIndex((step) => step.id === currentStepId)
      : -1;

    return EVENT_SETUP_STEPS.map((step, index) => ({
      ...step,
      completed: currentIndex >= 0 && index < currentIndex,
      current: index === currentIndex,
      upcoming: currentIndex >= 0 && index > currentIndex,
    }));
  }, [currentStepId]);
};