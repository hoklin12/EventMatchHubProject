// app/(event_management)/layout.tsx
import type { ReactNode } from "react"
import EventDetailSidebar from "../components/events/Dashboard/EventDetailSidebar"
import EventSidebar from "../components/events/Dashboard/EventSidebar"
import { EventHeader } from "../components/events/Dashboard/Header"


export default function EventManagementLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Fixed Header */}
      <EventHeader />

      {/* Slim Left Sidebar (Icons only) */}
      <EventSidebar />

      {/* Main Layout: Detail Sidebar + Page Content */}
      <div className="flex">
        {/* Detailed Right Sidebar */}
        <EventDetailSidebar />

        {/* Your Page Content (Dashboard, Attendees, Payment...) */}
        <main className="flex-1 ml-0 lg:ml-72 pt-20 lg:pt-42 p-6 lg:p-8 md:pl-20 lg:pl-32 pl-18">
          {children}
        </main>
      </div>
    </div>
  )
}


