// components/EventsCalendar.tsx

"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

interface DayProps {
  day: number;
  isCurrentMonth: boolean;
  events: string[];
  isToday: boolean;
  hasCreateButton: boolean;
}

function CalendarDay({ day, isCurrentMonth, events, isToday, hasCreateButton }: DayProps) {
  return (
    <div
      className={`
        min-h-32 p-3 rounded-lg border transition relative flex flex-col
        ${!isCurrentMonth ? "bg-muted/30 border-transparent" : "bg-background"}
        ${isToday ? "border-2 border-primary" : "border-muted/50"}
      `}
    >
      <span
        className={`text-base font-semibold block mb-2 ${
          !isCurrentMonth ? "text-muted-foreground" : isToday ? "text-primary" : "text-foreground"
        }`}
      >
        {day}
      </span>

      <div className="space-y-1 flex-1">
        {events.map((event, idx) => (
          <div
            key={idx}
            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium truncate"
          >
            {event}
          </div>
        ))}

        {hasCreateButton && (
          <button className="text-xs text-primary font-semibold flex items-center gap-1 mt-auto hover:text-primary/80 transition">
            <Plus size={16} />
            Create
          </button>
        )}
      </div>
    </div>
  );
}

export function EventsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9)); // October 2025

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

  const calendarDays = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      events: [],
      isToday: false,
      hasCreateButton: false,
    });
  }

  const eventMap: Record<number, { events: string[]; hasCreateButton: boolean }> = {
    3: { events: ["ACET"], hasCreateButton: false },
    5: { events: ["ACET"], hasCreateButton: false },
    15: { events: ["ACET"], hasCreateButton: false },
    21: { events: [], hasCreateButton: true },
    27: { events: [], hasCreateButton: false },
  };

  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      i === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();

    const dateConfig = eventMap[i] || { events: [], hasCreateButton: false };

    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      events: dateConfig.events,
      isToday,
      hasCreateButton: dateConfig.hasCreateButton,
    });
  }

  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      events: [],
      isToday: false,
      hasCreateButton: false,
    });
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg text-foreground">
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() =>
              setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
            }
            className="p-2 hover:bg-muted rounded-lg transition"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() =>
              setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
            }
            className="p-2 hover:bg-muted rounded-lg transition"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 justify-end">
        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-muted text-foreground">
          Month
        </button>
        <button className="px-4 py-2 text-sm font-medium rounded-lg text-primary font-semibold hover:opacity-90">
          Today
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-muted-foreground py-4"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((dayObj, idx) => (
          <CalendarDay key={idx} {...dayObj} />
        ))}
      </div>
    </div>
  );
}