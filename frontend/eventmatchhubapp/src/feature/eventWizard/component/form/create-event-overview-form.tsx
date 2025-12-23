// Main create event form component

"use client"

import type React from "react"
import { useState, useCallback } from "react"
import type { EventFormState, Event,EventType, EventCategory, EventStatus } from "@/lib/types/event"
import { DEFAULT_EVENT_FORM_STATE } from "@/lib/constants/event"
import { validateEventForm, ValidationError } from "@/lib/utils/validation"
import { EventThemeSection } from "./event-theme-selection"
import { EventOverviewSection } from "./event-overview-section"
import { EventDateTimeSection } from "./event-datetime-selection"
import { EventLocationSection } from "./event-location-selection"
import { WizardButtons } from "../wizard/wizardButtons"

interface CreateEventFormProps {
  onSaveDraft?: (data: Partial<Event>) => void
  onSaveAndContinue?: (data: Partial<Event>) => void
}

export const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSaveDraft, onSaveAndContinue }) => {
  const [formState, setFormState] = useState<EventFormState>(DEFAULT_EVENT_FORM_STATE)
  const [errors, setErrors] = useState<ValidationError[]>([])

  const handleFieldChange = useCallback((field: keyof EventFormState, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft({
        title: formState.name,
        name: formState.name,
        type: formState.type as any,
        category: formState.category as any,
        description: formState.description,
        theme: {
          image: formState.themeImage,
        },
        dateTime: {
          eventDate: formState.eventDate,
          endDate: formState.endDate,
          startTime: formState.startTime,
          endTime: formState.endTime,
        },
        location: {
          venue: formState.venue,
          locationName: formState.locationName,
          address: formState.address,
        },
        status: "draft",
      })
    }
  }

  const handleSaveAndContinue = () => {
    const validationErrors = validateEventForm(formState)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    if (onSaveAndContinue) {
      onSaveAndContinue({
        title: formState.name,
        name: formState.name,
        type: formState.type as EventType,
        category: formState.category as EventCategory,
        description: formState.description,
        dateTime: {
          eventDate: formState.eventDate,
          endDate: formState.endDate,
          startTime: formState.startTime,
          endTime: formState.endTime,
        },
        location: {
          venue: formState.venue,
          locationName: formState.locationName,
          address: formState.address,
        },
        status: "draft" as EventStatus,
      })
    }
  }

  return (
    <div className="space-y-6">
      <EventThemeSection
        imageUrl={formState.themeImage}            // preview URL
        onImageChange={(file) => setFormState(prev => ({
          ...prev,
          themeImageFile: file,
          themeImage: file ? URL.createObjectURL(file) : ""  // update preview
        }))}
      />
      <EventOverviewSection formState={formState} errors={errors} onChange={handleFieldChange} />
      <EventDateTimeSection formState={formState} errors={errors} onChange={handleFieldChange} />
      <EventLocationSection formState={formState} errors={errors} onChange={handleFieldChange} />

      {/* Action Buttons */}
      <WizardButtons
        onSaveDraft={handleSaveDraft}
        onSaveAndContinue={handleSaveAndContinue}
        
      />
    </div>
  )
}



