import type { TicketFormData, TicketFormErrors } from "@/lib/types/ticket"

export function validateTicketForm(data: TicketFormData): TicketFormErrors {
  const errors: TicketFormErrors = {}

  if (!data.quantity || data.quantity <= 0) {
    errors.quantity = "Quantity must be greater than 0"
  }

  if (data.type === "paid" && data.price <= 0) {
    errors.price = "Price must be greater than 0 for paid tickets"
  }

  if (!data.salesStart) {
    errors.salesStart = "Sales start date is required"
  }

  if (!data.salesEnd) {
    errors.salesEnd = "Sales end date is required"
  }

  if (data.salesStart && data.salesEnd) {
    const start = new Date(data.salesStart)
    const end = new Date(data.salesEnd)
    if (end <= start) {
      errors.salesEnd = "Sales end date must be after start date"
    }
  }

  if (!data.startTime) {
    errors.startTime = "Start time is required"
  }

  if (!data.endTime) {
    errors.endTime = "End time is required"
  }

  return errors
}
