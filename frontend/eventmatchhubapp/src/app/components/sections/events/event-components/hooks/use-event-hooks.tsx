// src/components/event-components/hooks/use-event-hooks.ts
import { useState, useMemo } from "react";
import { allEvents } from "@/lib/data/event-datas";
import { Event } from "@/app/types";

type Timeframe = "all" | "today" | "weekend";
type SortBy = "date" | "popular" | "price-low" | "price-high" | "rating";

interface Filters {
  searchQuery: string;
  location: string;
  category: string;
  timeframe: Timeframe;
  sortBy: SortBy;
}

export function useEventFilters(initialEvents: Event[]) {
  const [filters, setFilters] = useState<Filters>({
    searchQuery: "",
    location: "all",
    category: "all",
    timeframe: "all",
    sortBy: "date",
  });

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredEvents = useMemo(() => {
    let events = [...initialEvents];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      events = events.filter((event) => {
        const titleMatch = event.title.toLowerCase().includes(query);
        const descMatch = (event.description ?? "").toLowerCase().includes(query);
        const tagsMatch = (event.tags ?? []).some((tag) =>
          tag.toLowerCase().includes(query)
        );
        return titleMatch || descMatch || tagsMatch;
      });
    }

    // Location filter
    if (filters.location && filters.location !== "all") {
      events = events.filter(
        (event) => event.location.toLowerCase() === filters.location.toLowerCase()
      );
    }

    // Category filter
    if (filters.category && filters.category !== "all") {
      events = events.filter(
        (event) => event.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Timeframe filter
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const isToday = (date: string) => date === todayStr;

    const isThisWeekend = (date: string) => {
      const eventDate = new Date(date);
      const dayOfWeek = eventDate.getDay(); // 0 = Sunday, 6 = Saturday
      return dayOfWeek === 0 || dayOfWeek === 6;
    };

    if (filters.timeframe === "today") {
      events = events.filter((event) => isToday(event.date));
    } else if (filters.timeframe === "weekend") {
      events = events.filter((event) => isThisWeekend(event.date));
    }
    // "all" → no filter

    // Sorting
    events.sort((a, b) => {
      switch (filters.sortBy) {
        case "date":
          return a.date.localeCompare(b.date);
        case "popular":
          return b.attendees - a.attendees; // higher attendees first
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating ?? 0) - (a.rating ?? 0);
        default:
          return 0;
      }
    });

    return events;
  }, [initialEvents, filters]);

  return { filters, updateFilter, filteredEvents };
}