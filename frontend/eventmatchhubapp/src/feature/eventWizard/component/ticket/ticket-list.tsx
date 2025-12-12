"use client"

import { useState } from "react"
import type { Ticket, TicketFormData } from "@/lib/types/ticket"
import { TicketCard } from "./ticket-card"
import { TicketInlineForm } from "./ticket-inline-form"
import { Button } from "@/app/components/ui/button"
import { Plus } from "lucide-react"

interface TicketListProps {
  tickets: Ticket[]
  onAddTicket: (data: TicketFormData) => void
  onEditTicket: (ticket: Ticket) => void
  onDeleteTicket: (id: string) => void
}

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  onAddTicket,
  onEditTicket,
  onDeleteTicket,
}) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)

  const handleAddSubmit = (data: TicketFormData) => {
    onAddTicket(data)
    setShowAddForm(false)
    
  }

  const handleEditSubmit = (data: TicketFormData) => {
    if (!editingTicket) return

    onEditTicket({
      ...editingTicket,
      ...data,
    })

    setEditingTicket(null)
  }

  return (
    <div className="space-y-4">

      {/* Header with Add Button */}
<div className="flex justify-between items-center">
  <h2 className="text-2xl font-bold text-gray-900">Tickets</h2>

  {/* Hide the Add button if:
       - currently adding a ticket
       - currently editing a ticket
       - or already have at least one ticket */}
  {!showAddForm && !editingTicket && tickets.length === 0 && (
    <Button
      className="bg-black text-white flex items-center"
      onClick={() => setShowAddForm(true)}
    >
      <Plus className="w-4 h-4 mr-2" />
      Add Ticket
    </Button>
  )}
</div>


      {/* Ticket Cards */}
      {tickets.map((ticket) => (
        <div key={ticket.id} className="space-y-2">
          <TicketCard
            ticket={ticket}
            onEdit={(t) => setEditingTicket(t)}
            onDelete={onDeleteTicket}
          />

          {/* Edit Form below the card */}
          {editingTicket?.id === ticket.id && (
            <TicketInlineForm
              initialData={{
                type: ticket.type,
                quantity: ticket.quantity,
                price: ticket.price,
                salesStart: ticket.salesStart,
                salesEnd: ticket.salesEnd,
                startTime: ticket.startTime,
                endTime: ticket.endTime,
              }}
              onSubmit={handleEditSubmit}
              onCancel={() => setEditingTicket(null)}
            />
          )}
        </div>
      ))}

      {/* Add Ticket Form below all cards */}
      {showAddForm && (
        <TicketInlineForm
          onSubmit={handleAddSubmit}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  )
}
