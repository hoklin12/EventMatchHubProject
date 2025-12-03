"use client";

import { Button } from "../../ui/button";
// import { Input } from "../../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { X } from "lucide-react";

export interface FilterState {
  searchQuery: string;
  categories: string[];
  eventType: string[];
  dateRange: string;
}

interface EventFiltersProps {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: any) => void;
}

export function EventFilters({ filters, updateFilter }: EventFiltersProps) {
  const categories = [
    "Technology",
    "Business",
    "Arts & Culture",
    "Sports",
    "Education",
    "Health",
  ];
  const eventTypes = [
    "Workshop",
    "Conference",
    "Competition",
    "Volunteer",
    "Meetup",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      {/* Divider */}
      <div className="border-t border-gray-200" />
      <CardContent className="space-y-6">
        {/* Search
        <div className="space-y-2">
          <Label htmlFor="search">Search Events</Label>
          <Input
            id="search"
            placeholder="Search by name or location..."
            value={filters.searchQuery}
            onChange={(e) => updateFilter("searchQuery", e.target.value)}
          />
        </div> */}

        {/* Categories */}
        <div className="space-y-3">
          <Label className="font-semibold">Categories</Label>

          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => {
                  const newCategories = checked
                    ? [...filters.categories, category]
                    : filters.categories.filter((c) => c !== category);

                  updateFilter("categories", newCategories);
                }}
              />
              <Label htmlFor={category} className="font-normal cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>

        {/* Event Type */}
        <div className="space-y-3">
          <Label className="font-semibold">Event Type</Label>

          {eventTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={filters.eventType.includes(type)}
                onCheckedChange={(checked) => {
                  const newTypes = checked
                    ? [...filters.eventType, type]
                    : filters.eventType.filter((t) => t !== type);

                  updateFilter("eventType", newTypes);
                }}
              />
              <Label htmlFor={type} className="font-normal cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>

        {/* Reset */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            updateFilter("searchQuery", "");
            updateFilter("categories", []);
            updateFilter("eventType", []);
            updateFilter("dateRange", "all");
          }}
        >
          <X className="w-4 h-4 mr-2" />
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
}
