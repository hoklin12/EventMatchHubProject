"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { allEvents } from "@/lib/data/event-datas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { EventList } from "./event-components/event-list";
import { useEventFilters } from "./event-components/hooks/use-event-hooks";

export default function IntroEvents() {
  const { filters, updateFilter, filteredEvents } = useEventFilters(allEvents);

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 6;

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Extract unique locations from data
  const locations = Array.from(new Set(allEvents.map((e) => e.location))).sort();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance text-foreground">
            Discover Amazing Events
          </h1>
          <p className="mb-8 text-lg text-muted-foreground text-balance">
            Find and join events that match your interests
          </p>

          {/* Search Bar */}
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center">
              <div className="relative flex-1 max-w-lg">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <Input
                  type="text"
                  placeholder="Search for events, categories, or locations..."
                  className="pl-10 pr-4 py-3 rounded-lg border-gray-300 focus:border-gray-500"
                  onChange={(e) => updateFilter("searchQuery", e.target.value)}
                />
              </div>

              <Select
                value={filters.location}
                onValueChange={(value) => updateFilter("location", value)}
              >
                <SelectTrigger className="w-full sm:w-48 py-3 rounded-lg">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.category}
                onValueChange={(value) => updateFilter("category", value)}
              >
                <SelectTrigger className="w-full sm:w-48 py-3 rounded-lg">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Arts & Culture">Arts & Culture</SelectItem>
                </SelectContent>
              </Select>

              <Button className="px-8 py-3 rounded-lg bg-black text-white hover:bg-gray-800">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="ml-2 hidden sm:inline">Search</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-foreground">Browsing Events</h2>
            <div className="flex gap-2 items-center">
              <Select
                value={filters.sortBy}
                onValueChange={(val) =>
                  updateFilter(
                    "sortBy",
                    val as "date" | "popular" | "price-low" | "price-high" | "rating"
                  )
                }
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200 my-4" />

          <Tabs
            value={filters.timeframe}
            onValueChange={(val) =>
              updateFilter("timeframe", val as "all" | "today" | "weekend")
            }
            className="w-full"
          >
            <TabsList className="bg-transparent border-b border-border rounded-none h-auto p-0">
              <TabsTrigger
                value="all"
                className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="today"
                className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
              >
                Today
              </TabsTrigger>
              <TabsTrigger
                value="weekend"
                className="px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
              >
                This weekend
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <EventList events={paginatedEvents} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className="w-8 h-8"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
