export type TicketType = "free" | "paid" | "donation"

export interface Ticket {
  id: string
  type: TicketType
  quantity: number
  available: number
  price: number
  salesStart: string
  salesEnd: string
  startTime: string
  endTime: string
}

export interface TicketFormData {
  type: TicketType
  quantity: number
  price: number
  salesStart: string
  salesEnd: string
  startTime: string
  endTime: string
}

export interface TicketFormErrors {
  quantity?: string
  price?: string
  salesStart?: string
  salesEnd?: string
  startTime?: string
  endTime?: string
}
