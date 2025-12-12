// Constants for event module

import type { EventFormState, EventType, EventCategory } from "@/lib/types/event"

export const EVENT_TYPES: EventType[] = ["Seminar", "Workshop", "Conference", "Webinar", "Meetup"]

export const EVENT_CATEGORIES = [
  "Technology",
  "Business",
  "Literature",
  "Health",
  "Sports",
] as const

export const SIDEBAR_MENU = {
  MAIN: [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "attendees", label: "Attendees", icon: "users" },
  ],
  PAYMENT_FINANCE: [
    { id: "payment-setup", label: "Payment Setup", icon: "credit-card" },
    { id: "refund-settings", label: "Refund Settings", icon: "refund" },
  ],
  REPORTING: [{ id: "analysis-overview", label: "Analysis Overview", icon: "chart" }],
}

export const EVENT_SETUP_STEPS = [
  { id: "event-overview", label: "Event Overview", active: true },
  { id: "ticket-registration", label: "Ticket and Registration", active: false },
  { id: "additional-sections", label: "Additional Sections", active: false },
  { id: "publish-settings", label: "Publish Settings", active: false },
]

export const DEFAULT_EVENT_FORM_STATE: EventFormState = {
  title: "",
  name: "", 
  type: "",
  category: "",
  description: "",
  themeImage: "",
  eventDate: "",
  endDate: "",
  startTime: "08:00 AM",
  endTime: "08:00 PM",
  venue: "",
  locationName: "",
  address: "",
}

export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Please enter a valid email",
  INVALID_DATE: "Please enter a valid date",
  INVALID_TIME: "Please enter a valid time",
  DESCRIPTION_MIN_LENGTH: "Description must be at least 10 characters",
  DESCRIPTION_MAX_LENGTH: "Description must not exceed 500 characters",
}
