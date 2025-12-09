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
import { Filter, ChevronLeft, ChevronRight, FilterIcon } from "lucide-react";

import { Button } from "../../ui/button";
import { EventSearch } from "./event-components/event-search";
import { EventList } from "./event-components/event-list";
import { EventFilters } from "./event-components/event-filter";
import { useEventFilters } from "./event-components/hooks/use-event-hooks";

export default function IntroEvents() {
  const { filters, updateFilter, filteredEvents } = useEventFilters(allEvents); // use allEvents
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 6;

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

          <div className="mx-auto max-w-5xl">
            <EventSearch
              onSearch={(query) => updateFilter("searchQuery", query)}
            />
          </div>
        </div>

        {/* Layout with Sidebar */}
        <div className="grid gap-8 md:grid-cols-4 lg:grid-cols-5 mb-12">
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } md:block md:col-span-1`}
          >
            <EventFilters filters={filters} updateFilter={updateFilter} />
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 lg:col-span-4">
            {/* Browsing Events Section */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Browsing Events
                </h2>
                <div className="flex gap-2 items-center">
                  <Select
                    value={filters.sortBy}
                    onValueChange={(val) =>
                      updateFilter(
                        "sortBy",
                        val as
                          | "date"
                          | "popular"
                          | "price-low"
                          | "price-high"
                          | "rating"
                      )
                    }
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by"></SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-sm rounded-sm w-50">
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="price-low">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-high">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                  <FilterIcon className="h-4 w-4 text-gray-400" />

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

            {/* Events Section */}
            {/* <h3 className="mb-6 text-2xl font-bold text-foreground">
              Events in Your Locations
            </h3> */}
            <EventList events={paginatedEvents} />

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button
                variant="ghost"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "disable" : "outline"}
                    size="sm"
                    className="w-8 h-8"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                )
              )}

              <Button
                variant="ghost"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
