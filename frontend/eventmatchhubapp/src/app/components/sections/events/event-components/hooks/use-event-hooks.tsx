// use-event-hooks.tsx
import { useState, useCallback, useMemo } from "react"
import { Event } from "@/app/types"

export interface FilterState {
  searchQuery: string
  categories: string[]
  eventType: string[]
  dateRange: string
  timeframe: "all" | "today" | "weekend"
  sortBy: "date" | "popular" | "price-low" | "price-high" | "rating"
}


export function useEventFilters(events: Event[]) {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    categories: [],
    eventType: [],
    dateRange: "",
    timeframe: "all",
    sortBy: "date",
  })

  type FilterKey = keyof FilterState
  type FilterValue<K extends FilterKey> = FilterState[K]

  const updateFilter = useCallback(
    <K extends FilterKey>(key: K, value: FilterValue<K>) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const filteredEvents = useMemo(() => {
    let result = [...events]

    // Search
    if (filters.searchQuery) {
      result = result.filter((e) =>
        e.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      )
    }

    // Categories
    if (filters.categories.length > 0) {
      result = result.filter((e) => filters.categories.includes(e.category))
    }

    // Timeframe
    const today = new Date()
    if (filters.timeframe === "today") {
      result = result.filter(
        (e) => new Date(e.date).toDateString() === today.toDateString()
      )
    } else if (filters.timeframe === "weekend") {
      const nextSaturday = new Date(today)
      nextSaturday.setDate(today.getDate() + (6 - today.getDay()))
      const nextSunday = new Date(nextSaturday)
      nextSunday.setDate(nextSaturday.getDate() + 1)
      result = result.filter((e) => {
        const eventDate = new Date(e.date)
        return eventDate >= nextSaturday && eventDate <= nextSunday
      })
    }

    // Sorting
    switch (filters.sortBy) {
      case "popular":
        result.sort((a, b) => b.attendees - a.attendees)
        break
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }

    return result
  }, [events, filters])

  return { filters, updateFilter, filteredEvents }
}
