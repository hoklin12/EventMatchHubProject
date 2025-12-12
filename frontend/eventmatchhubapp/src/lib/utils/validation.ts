// Validation utilities for event form

import type { EventFormState } from "@/lib/types/event"
import type { CertificateFormData } from "@/lib/types/certificate"
import type { Speaker } from "@/lib/types/speaker"
import { VALIDATION_MESSAGES } from "@/lib/constants/event"
import type { CustomQuestion } from "@/lib/types/registration-form";

export interface ValidationError {
  field: keyof EventFormState
  message: string
}

export const validateEventForm = (formState: EventFormState): ValidationError[] => {
  const errors: ValidationError[] = []

  // Validate event name
  if (!formState.name?.trim()) {
    errors.push({ field: "name", message: VALIDATION_MESSAGES.REQUIRED })
  }

  // Validate event type
  if (!formState.type) {
    errors.push({ field: "type", message: VALIDATION_MESSAGES.REQUIRED })
  }

  // Validate category
  if (!formState.category) {
    errors.push({ field: "category", message: VALIDATION_MESSAGES.REQUIRED })
  }

  // Validate description
  if (!formState.description?.trim()) {
    errors.push({ field: "description", message: VALIDATION_MESSAGES.REQUIRED })
  } else if (formState.description.length < 10) {
    errors.push({ field: "description", message: VALIDATION_MESSAGES.DESCRIPTION_MIN_LENGTH })
  } else if (formState.description.length > 500) {
    errors.push({ field: "description", message: VALIDATION_MESSAGES.DESCRIPTION_MAX_LENGTH })
  }

  // Validate event date
  if (!formState.eventDate) {
    errors.push({ field: "eventDate", message: VALIDATION_MESSAGES.REQUIRED })
  }

  // Validate end date
  if (!formState.endDate) {
    errors.push({ field: "endDate", message: VALIDATION_MESSAGES.REQUIRED })
  }

  // Validate start time
  if (!formState.startTime) {
    errors.push({ field: "startTime", message: VALIDATION_MESSAGES.REQUIRED })
  }

  // Validate location name
  if (!formState.locationName?.trim()) {
    errors.push({ field: "locationName", message: VALIDATION_MESSAGES.REQUIRED })
  }

  // Validate address
  if (!formState.address?.trim()) {
    errors.push({ field: "address", message: VALIDATION_MESSAGES.REQUIRED })
  }

  return errors
}

export const getFieldError = (errors: ValidationError[], field: keyof EventFormState): string | null => {
  return errors.find((error) => error.field === field)?.message || null
}


export interface SpeakerValidationError {
  id: string
  field: keyof Omit<Speaker, "id" | "imageUrl">
  message: string
}

export const validateSpeakers = (speakers: Speaker[]): SpeakerValidationError[] => {
  const errors: SpeakerValidationError[] = []

  speakers.forEach((speaker) => {
    if (!speaker.name?.trim()) {
      errors.push({ id: speaker.id, field: "name", message: "Name is required" })
    }

    if (!speaker.title?.trim()) {
      errors.push({ id: speaker.id, field: "title", message: "Title is required" })
    }

    // Optional: enforce image upload
    if (!speaker.file) {
      errors.push({ id: speaker.id, field: "file", message: "Image is required" })
    }

    // Optional: description length validation
    if (speaker.description && speaker.description.length > 200) {
      errors.push({ id: speaker.id, field: "description", message: "Description is too long" })
    }
  })

  return errors
}

export const validateQuestions = (questions: CustomQuestion[]) => {
  const errors: Record<string, string> = {};
  questions.forEach(q => {
    if (!q.label?.trim()) errors[q.id] = "Question label is required";
    q.options?.forEach(o => {
      if (!o.label?.trim()) errors[`${q.id}-${o.id}`] = "Option label is required";
    });
  });
  return errors;
};

export interface CertificateValidationError {
  field: keyof CertificateFormData
  message: string
}

export const validateCertificate = (data: CertificateFormData): CertificateValidationError[] => {
  const errors: CertificateValidationError[] = []

  // Type
  if (!data.type) {
    errors.push({ field: "type", message: "Certificate type is required" })
  }

  // Organization Name
  if (!data.organizationName?.trim()) {
    errors.push({ field: "organizationName", message: "Organization name is required" })
  }

  // Description
  if (!data.description?.trim()) {
    errors.push({ field: "description", message: "Description is required" })
  } else if (data.description.length < 5) {
    errors.push({ field: "description", message: "Description must be at least 5 characters" })
  } else if (data.description.length > 300) {
    errors.push({ field: "description", message: "Description cannot exceed 300 characters" })
  }

  // Issue Date
  if (!data.issueDate) {
    errors.push({ field: "issueDate", message: "Issue date is required" })
  }

  // Organizer Director
  if (!data.organizerDirector?.trim()) {
    errors.push({ field: "organizerDirector", message: "Organizer director is required" })
  }

  return errors
}
