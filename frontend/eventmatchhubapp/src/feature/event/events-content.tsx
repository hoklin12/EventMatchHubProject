"use client"

import { useState, useMemo } from "react"
import { SearchBar } from "./filters/search-bar"
import { CategoryFilter } from "./filters/category-filter"
import { ViewToggle } from "./filters/view-toggle"
import { StatusTabs } from "./filters/status-tabs"
import { EventsTable } from "./views/events-table"
import { EventsGrid } from "./views/events-grid"
import { CreateEventButton } from "./actions/create-event-button"
import { mockEvents } from "@/lib/mock-data/events"

export function EventsContent() {
  const [viewMode, setViewMode] = useState<"list" | "card">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [activeStatus, setActiveStatus] = useState<"all" | "active" | "completed">("all")

  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || event.category === selectedCategory
      const matchesStatus =
        activeStatus === "all" ||
        (activeStatus === "active" && event.status === "active") ||
        (activeStatus === "completed" && event.status === "completed")

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [searchQuery, selectedCategory, activeStatus])

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <div className="border-b border-border bg-card">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-foreground">Events</h1>
          <CreateEventButton />
        </div>
  
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <CategoryFilter value={selectedCategory} onChange={setSelectedCategory} />
          </div>
  
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
            <StatusTabs activeStatus={activeStatus} onChange={setActiveStatus} />
          </div>
        </div>
      </div>
  
      {/* Content Section */}
      {filteredEvents.length === 0 ? (
        <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border bg-card">
          <p className="text-muted-foreground">
            {searchQuery || selectedCategory
              ? "No events found matching your filters."
              : "No events available."}
          </p>
        </div>
      ) : viewMode === "list" ? (
        <EventsTable events={filteredEvents} />
      ) : (
        <EventsGrid events={filteredEvents} />
      )}
    </div> 
  )
  
}
