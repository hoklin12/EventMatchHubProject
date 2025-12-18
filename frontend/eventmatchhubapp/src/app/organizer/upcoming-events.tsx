

'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from 'date-fns'

// Updated sample data to include all events shown in the screenshot
const upcomingEvents = [
  {
    id: "evt-201",
    title: "AI & Machine Learning Summit 2025",
    dateTime: { eventDate: "2025-11-03", endDate: "2025-11-08" },
    location: { venue: "CADT Conference Hall", locationName: "Phnom Penh" },
    venueCode: "CADT",
  },
  {
    id: "evt-202",
    title: "AI & Machine Learning Summit 2025",
    dateTime: { eventDate: "2025-11-03", endDate: "2025-11-08" },
    location: { venue: "CADT Conference Hall", locationName: "Phnom Penh" },
    venueCode: "CADT",
  },
  {
    id: "evt-203",
    title: "AI & Machine Learning Summit 2025",
    dateTime: { eventDate: "2025-11-03", endDate: "2025-11-08" },
    location: { venue: "CADT Conference Hall", locationName: "Phnom Penh" },
    venueCode: "CADT",
  },
  {
    id: "evt-204",
    title: "AI & Machine Learning Summit 2025",
    dateTime: { eventDate: "2025-11-03", endDate: "2025-11-08" },
    location: { venue: "CADT Conference Hall", locationName: "Phnom Penh" },
    venueCode: "CADT",
  },
  {
    id: "evt-205",
    title: "Digital Innovation Forum",
    dateTime: { eventDate: "2025-11-15", endDate: "2025-11-16" },
    location: { venue: "ACET Center", locationName: "Phnom Penh" },
    venueCode: "ACET",
  },
] as const

export function UpcomingEvents() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9)) // October 2025 → shows November events
  const [viewMode] = useState<'month' | 'week' | 'day'>('month')

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const startingDayOfWeek = getDay(monthStart) // 0 = Sunday

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const getEventsForDay = (day: Date) => {
    const dayStr = format(day, 'yyyy-MM-dd')
    return upcomingEvents.filter(
      (event) => event.dateTime.eventDate <= dayStr && event.dateTime.endDate >= dayStr
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold text-foreground mb-6">Upcoming Events</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Vertical Event List */}
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex gap-4">
                <div className="w-1 bg-primary rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{event.title}</h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    {event.dateTime.eventDate.replace(/-/g, '.')} - {event.dateTime.endDate.replace(/-/g, '.')}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mt-2">
                    <CalendarIcon size={14} />
                    <span>{format(new Date(event.dateTime.eventDate), 'd MMMM yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs mt-1">
                    <MapPin size={14} />
                    <span>{event.location.venue}</span>
                  </div>
                  <div className="text-xs font-medium text-primary mt-2">{event.venueCode}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Calendar */}
        <div className="lg:col-span-3 bg-card rounded-2xl shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button onClick={prevMonth} className="p-2 hover:bg-muted rounded-lg">
                <ChevronLeft size={24} />
              </button>
              <h3 className="text-2xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</h3>
              <button onClick={nextMonth} className="p-2 hover:bg-muted rounded-lg">
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-muted text-foreground text-sm font-medium">Month</button>
              <button className="px-4 py-2 rounded-lg text-muted-foreground text-sm font-medium hover:bg-muted/50">Week</button>
              <button className="px-4 py-2 rounded-lg text-muted-foreground text-sm font-medium hover:bg-muted/50">Today</button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-muted-foreground mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-4">
            {/* Empty cells */}
            {Array.from({ length: startingDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Days */}
            {daysInMonth.map((day) => {
              const events = getEventsForDay(day)
              const isToday = format(day, 'yyyy-MM-dd') === '2025-12-14' // current date

              return (
                <div
                  key={day.toString()}
                  className={`min-h-32 rounded-2xl border p-3 ${
                    isToday ? 'bg-primary/10 border-primary' : 'border-border bg-background'
                  } hover:bg-muted/50 transition`}
                >
                  <div className={`text-lg font-semibold ${isToday ? 'text-primary' : ''}`}>
                    {format(day, 'd')}
                  </div>

                  {/* Event bars */}
                  {events.map((event, idx) => (
                    <div
                      key={event.id}
                      className="mt-2 h-8 bg-primary/10 rounded-lg flex items-center px-3 text-xs font-medium text-primary overflow-hidden"
                    >
                      <div className="w-1 h-5 bg-primary rounded-full mr-2" />
                      <span className="truncate">{event.venueCode}</span>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}