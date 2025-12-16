"use client"

import { Badge } from  "@/app/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from  "@/app/components/ui/table";
import { EventRowMenu } from "../actions/event-row-menu"
import { FiCalendar, FiMapPin } from "react-icons/fi"
import type { Event } from "@/lib/types/event"

interface EventsTableProps {
  events: Event[]
}

const TABLE_HEADERS = ["Event", "Category", "Registered", "Price", "Status"]

export function EventsTable({ events }: EventsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid var(--table-border)" }}>
      <Table>
        <TableHeader>
          <TableRow className="table-row">
            {TABLE_HEADERS.map((header) => (
              <TableHead key={header} className="px-4 py-2">
                {header}
              </TableHead>
            ))}
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {events.map((event) => {
            const capacity = event.location.capacity ?? 0
            const registered = event.registered ?? 0
            const progress = capacity > 0 ? (registered / capacity) * 100 : 0

            const statusMap: Record<string, "default" | "destructive" | "outline" | "secondary" | "active"> = {
              draft: "outline",
              active: "active",
              completed: "secondary"
            };
            
            const statusBadgeVariant = statusMap[event.status];
            return (
              <TableRow key={event.id} className="table-row">
                {/* Event Info */}
                <TableCell className="px-4">
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{event.title}</p>

                    {/* Updated date */}
                    <p className="text-sm text-muted-foreground flex items-center">
                      <FiCalendar className="mr-2" />
                      {event.dateTime.eventDate}
                    </p>

                    {/* Updated location */}
                    <p className="text-sm text-muted-foreground flex items-center">
                      <FiMapPin className="mr-2" />
                      {event.location.locationName}
                    </p>
                  </div>
                </TableCell>

                {/* Category */}
                <TableCell>
                  <Badge variant="outline">{event.category}</Badge>
                </TableCell>

                {/* Registered */}
                <TableCell className="px-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      {registered}/{capacity}
                    </p>

                    <div className="h-2 w-24 rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </TableCell>

                {/* Price — new type has none */}
                <TableCell className="font-medium">Free</TableCell>

                {/* Status */}
                <TableCell>
                  <Badge variant={statusBadgeVariant}>{event.status}</Badge>
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <EventRowMenu eventId={event.id} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
