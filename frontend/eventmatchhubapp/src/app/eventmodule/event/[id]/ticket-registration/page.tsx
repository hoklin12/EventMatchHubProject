"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import type { Ticket, TicketFormData } from "@/lib/types/ticket"
import { TicketList } from "@/feature/eventWizard/component/ticket/ticket-list"
import { MOCK_TICKETS } from "@/lib/mock-data/tickets"
import { WizardButtons } from "@/feature/eventWizard/component/wizard/wizardButtons"

export default function TicketRegistrationPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string

  const [mounted, setMounted] = useState(false)
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    setTickets(MOCK_TICKETS)
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Add ticket
  const handleAddTicket = (ticketData: TicketFormData) => {
    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      type: ticketData.type,
      quantity: ticketData.quantity,
      available: ticketData.quantity,
      price: ticketData.price,
      salesStart: ticketData.salesStart,
      salesEnd: ticketData.salesEnd,
      startTime: ticketData.startTime,
      endTime: ticketData.endTime,
    }

    setTickets(prev => [...prev, newTicket])
  }

  // Edit ticket
  const handleEditTicket = (updated: Ticket) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === updated.id
          ? { ...updated, available: Math.min(t.available, updated.quantity) }
          : t
      )
    )
  }

  // Delete ticket
  const handleDeleteTicket = (id: string) => {
    setTickets(prev => prev.filter(t => t.id !== id))
  }

  // Save Draft
  const handleSaveDraft = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/tickets/saveDraft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tickets }),
      })

      if (!response.ok) throw new Error("Failed to save draft")

      const data = await response.json()
      console.log("Draft saved:", data)
      alert("Draft saved successfully!")
    } catch (error) {
      console.error(error)
      alert("Error saving draft")
    }
  }

  const handleSaveAndContinue = async () => {
    console.log("Saving ticket data for event:", eventId)
    // Imagine API here
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-6xl mx-auto p-8">

        <TicketList
          tickets={tickets}
          onAddTicket={handleAddTicket}
          onEditTicket={handleEditTicket}
          onDeleteTicket={handleDeleteTicket}
        />

        <WizardButtons
          onSaveDraft={handleSaveDraft}
          onSaveAndContinue={() => {
            handleSaveAndContinue()
            router.push(`/eventmodule/event/${eventId}/additional-sections`)
          }}
          onBack={() => router.push(`/eventmodule/event/create`)}

          nextLabel="Continue"
          backLabel="Go Back"
        />
      </div>
    </div>
  )
}
