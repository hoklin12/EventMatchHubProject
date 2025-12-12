// Event preview/display types for public and preview pages

import type { Event } from "./event"
import type { Speaker } from "./speaker"
import type { Ticket } from "./ticket"

export interface EventPreviewData extends Event {
  organizer: {
    id: string
    name: string
    imageUrl: string
    profileUrl: string
  }
  overview: {
    description: string
    tags: string[]
  }
  schedule?: {
    hasAgenda: boolean
    agendaUrl?: string
    message?: string
  }
  speakers: Speaker[]
  format: "in-person" | "virtual" | "hybrid"
  refundPolicy: {
    deadline: string
    terms: RefundTerm[]
  }
  tickets: Ticket[]
  registrationCount: number
  capacity: number
}

export interface RefundTerm {
  percentage: number
  deadline: string
  description: string
}

export interface EventDisplayMode {
  isPreview: boolean
  canEdit: boolean
  showDraftIndicator: boolean
}
