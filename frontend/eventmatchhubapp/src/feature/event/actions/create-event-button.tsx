"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function CreateEventButton() {
  const router = useRouter()

  return (
    <Button onClick={() => router.push("/eventmodule/event/create")} className="gap-2">
      <Plus className="h-4 w-4" />
      Create Event
    </Button>
  )
}
