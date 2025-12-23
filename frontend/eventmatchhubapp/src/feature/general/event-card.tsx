// 'use client'

// import { Calendar, MapPin } from 'lucide-react'
// import { Event } from '@/lib/types/event'

// interface EventCardProps {
//   event: Event
// }

// export function EventCard({ event }: EventCardProps) {
//   return (
//     <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition cursor-pointer hover:border-primary/50">
//       <div className="flex gap-4">
//         <div className="w-1 bg-primary rounded-full flex-shrink-0"></div>
//         <div className="flex-1 min-w-0">
//           <h3 className="font-semibold text-foreground text-sm">{event.title}</h3>
//           <div className="flex items-center gap-2 text-muted-foreground text-xs mt-2">
//             <Calendar size={14} />
//             <span>{event.dateTime.eventDate} - {event.dateTime.endTime}</span>
//           </div>
//           <div className="flex items-center gap-2 text-muted-foreground text-xs mt-1">
//             <MapPin size={14} />
//             <span>{event.location.locationName}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// feature/general/event-card.tsx

import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import Link from "next/link";

export function EventCard({ event }: { event: any }) {
  return (
    <Link href={`/organizer/event/${event.id}`}>
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
        <div className="flex gap-6">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex-shrink-0" />
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{event.date} • {event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{event.attendees}/{event.maxAttendees} registered</span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-green-600" />
                <span className="font-medium">${event.price}</span>
              </div>
            </div>

            <div className="mt-4">
              <span className={`inline-block px-4 py-1 rounded-full text-xs font-medium ${
                event.status === "live" ? "bg-green-100 text-green-800" :
                event.status === "upcoming" ? "bg-blue-100 text-blue-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}