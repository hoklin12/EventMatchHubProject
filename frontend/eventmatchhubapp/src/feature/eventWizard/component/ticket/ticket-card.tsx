"use client"

import type React from "react"
import type { Ticket } from "@/lib/types/ticket"
import { Button } from "@/components/ui/button"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { format, parseISO } from "date-fns"

interface TicketCardProps {
  ticket: Ticket
  onEdit: (ticket: Ticket) => void
  onDelete: (id: string) => void
}

export const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onEdit,
  onDelete,
}) => {
  const formatDate = (dateStr: string) => format(parseISO(dateStr), "MMM dd, yyyy")

  return (
    <div
      className="
        bg-white border rounded-lg p-6 shadow-sm relative 
        cursor-pointer hover:shadow-md transition
      "
      onClick={() => onEdit(ticket)}  
    >
      {/* 3-dot menu */}
      <div
        className="absolute top-3 right-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem onClick={() => onEdit(ticket)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(ticket.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>

      <h3 className="text-lg font-semibold capitalize">{ticket.type}</h3>

      <p className="text-sm text-gray-500">
        Starts {formatDate(ticket.salesStart)} – Ends {formatDate(ticket.salesEnd)}
      </p>

      <div className="mt-3 flex justify-between">
        <p className="text-sm text-gray-500">{ticket.available} available</p>
        <p className="font-bold">${ticket.price.toFixed(2)}</p>
      </div>
    </div>
  )
}
