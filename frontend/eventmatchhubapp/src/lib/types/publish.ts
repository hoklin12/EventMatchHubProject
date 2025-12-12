export type PublishingOption = "publish-now" | "schedule-later"

export interface PublishSettings {
  eventType: string
  category: string
  keywords: string[]
  organizer: {
    name: string
    link?: string
  }
  isPublic: boolean
  publishingOption: PublishingOption
  scheduledDate?: string
  scheduledTime?: string
}

export interface EventPreview {
  id: string
  title: string
  date: string
  location: string
  attendeeCount: number
  ticketCount: number
  image: string
}
