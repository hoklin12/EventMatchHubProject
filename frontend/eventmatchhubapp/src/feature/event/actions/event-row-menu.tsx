"use client"

import { MoreVertical, Eye, Edit, Copy, CopyX as Copy2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface EventRowMenuProps {
  eventId: string
}

export function EventRowMenu({ eventId }: EventRowMenuProps) {
  const router = useRouter()

  const handleView = () => {
    router.push(`/events/${eventId}`)
  }

  const handleEdit = () => {
    router.push(`/events/${eventId}/edit`)
  }

  const handleCopyLink = () => {
    const link = `${window.location.origin}/events/${eventId}`
    navigator.clipboard.writeText(link)
    // toast({ description: 'Event link copied to clipboard' })
  }

  const handleDuplicate = () => {
    // Add duplication logic here
    console.log("Duplicating event:", eventId)
  }

  const handleDelete = () => {
    // Add deletion logic here
    console.log("Deleting event:", eventId)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
            align="end"
            className="bg-background shadow-lg border border-border">
        <DropdownMenuItem onClick={handleView} className="gap-2 cursor-pointer">
          <Eye className="h-4 w-4" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEdit} className="gap-2 cursor-pointer">
          <Edit className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer">
          <Copy className="h-4 w-4" />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDuplicate} className="gap-2 cursor-pointer">
          <Copy2 className="h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleDelete}
          className="gap-2 cursor-pointer text-destructive focus:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
