import type { Ticket } from "@/lib/types/ticket"

export const MOCK_TICKETS: Ticket[] = [
  {
    id: "1",
    type: "free",
    quantity: 100,
    available: 85,
    price: 0.0,
    salesStart: "2025-10-16",
    salesEnd: "2025-10-20",
    startTime: "08:00",
    endTime: "12:00",
  },
]
