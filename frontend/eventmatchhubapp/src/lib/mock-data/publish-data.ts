import type { PublishSettings, EventPreview } from "@/lib/types/publish"

export const mockEventPreview: EventPreview = {
  id: "evt_001",
  title: "AI & Machine Learning Summit 2025",
  date: "Monday, October 22, 2025",
  location: "CADT",
  attendeeCount: 200,
  ticketCount: 120,
  image: "/panel_discussion.png",
}

export const mockPublishSettings: PublishSettings = {
  eventType: "Seminar",
  category: "Technology",
  keywords: ["tech"],
  organizer: {
    name: "Ms Touch Livita",
    link: "#",
  },
  isPublic: true,
  publishingOption: "publish-now",
}
