"use client"

import { Button } from "@/components/ui/button"

interface StatusTabsProps {
  activeStatus: "all" | "active" | "completed"
  onChange: (status: "all" | "active" | "completed") => void
}

export function StatusTabs({ activeStatus, onChange }: StatusTabsProps) {
  return (
    <div className="flex gap-2 rounded-full border border-border bg-secondary p-1">
      {[
        { value: "all", label: "All Events" },
        { value: "active", label: "Active" },
        { value: "completed", label: "Completed" },
      ].map(({ value, label }) => (
        <Button
          key={value}
          variant={activeStatus === value ? "default" : "ghost"}
          size="sm"
          onClick={() => onChange(value as "all" | "active" | "completed")}
          className={`gap-2 ${
            activeStatus === value ? "rounded-full bg-primary text-primary-foreground" : ""
          }`}
        >
          {label}
        </Button>
      ))}
    </div>
  )
}
