"use client"

import { Plus, LayoutList } from "lucide-react"
import { QuickStartCard } from "./quick-start-card"
import { actionRoutes } from "@/lib/routes"

const quickStartItems: {
  action: keyof typeof actionRoutes
  icon: typeof Plus | typeof LayoutList
  title: string
  description: string
  primaryColor: "primary" | "secondary"
}[] = [
  {
    action: "start-event",
    icon: Plus,
    title: "Start a new event",
    description: "Add your event information, set up tickets, and manage recurring schedules.",
    primaryColor: "primary"
  },
  {
    action: "view-events",
    icon: LayoutList,
    title: "View all events",
    description: "Browse and manage all your events collections",
    primaryColor: "secondary"
  }
]

export function QuickStart() {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-semibold text-foreground mb-4">Quick Start</h2>

      <div className="grid grid-cols-2 gap-4">
        {quickStartItems.map((item) => (
          <QuickStartCard
            key={item.action}
            href={actionRoutes[item.action]} // ✅ dynamic route
            icon={item.icon}
            title={item.title}
            description={item.description}
            primaryColor={item.primaryColor}
          />
        ))}
      </div>
    </div>
  )
}
