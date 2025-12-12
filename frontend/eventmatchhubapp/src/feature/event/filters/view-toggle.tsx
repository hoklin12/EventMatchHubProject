"use client"

import { List, Grid3X3 } from "lucide-react"
import { Button } from "@/app/components/ui/button";

interface ViewToggleProps {
  viewMode: "list" | "card"
  onChange: (mode: "list" | "card") => void
}

export function ViewToggle({ viewMode, onChange }: ViewToggleProps) {
  return (
    <div className="flex gap-2 rounded-full border border-border bg-secondary p-1">
      <Button
        variant={viewMode === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("list")}
        className={`gap-2 ${
          viewMode === "list" ? "rounded-full bg-primary text-primary-foreground" : ""
        }`}
      >
        <List className="h-4 w-4" />List
      </Button>
      <Button
        variant={viewMode === "card" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("card")}
        className={`gap-2 ${
          viewMode === "card" ? "rounded-full bg-primary text-primary-foreground" : ""
        }`}
      >
        <Grid3X3 className="h-4 w-4" />Card
      </Button>
    </div>
  )
}