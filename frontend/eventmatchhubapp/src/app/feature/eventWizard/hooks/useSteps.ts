
import type { EventSetupStep } from "../types/eventSetupStep"
import { EVENT_SETUP_STEPS } from "../constants/wizardNavigation"
import { useMemo } from "react"

/**
 * Returns the list of steps with `completed` flag based on currentStepId
 */
export const useSteps = (currentStepId?: string) => {
  return useMemo(() => {
    const currentIndex = EVENT_SETUP_STEPS.findIndex(step => step.id === currentStepId)

    return EVENT_SETUP_STEPS.map((step, index) => ({
      ...step,
      completed: currentIndex > index, // all steps before currentStep are completed
    }))
  }, [currentStepId])
}
