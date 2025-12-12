"use client"

import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/app/components/ui/button"

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 px-2 py-2 mb-6 text-gray-700 hover:bg-gray-100"
      onClick={() => router.push("/eventmodule/event")}
    >
      <ChevronLeft className="w-4 h-2" />
      <span className="text-sm font-medium">Back to Events</span>
    </Button>
  )
}
