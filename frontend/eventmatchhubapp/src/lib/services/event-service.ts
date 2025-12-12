import { mockEventPreviewData } from "@/lib/mock-data/event-previews"
import type { EventPreviewData } from "@/lib/types/event-preview"

export class EventService {
  static async getEventById(eventId: string, isPreview = false): Promise<EventPreviewData> {
    // Use mock data first
    return Promise.resolve({
      ...mockEventPreviewData,
      id: eventId, 
    })
  }


  static async createEvent(payload: any): Promise<any> {
    // mock for now
    return Promise.resolve({ ...payload, id: "evt_mock_001" })
  }
}
