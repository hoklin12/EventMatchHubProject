import { Greeting } from "@/feature/general/greeting"
import { QuickStart } from "@/feature/general/quick-start"
import { UpcomingEvents } from "@/feature/general/upcoming-events"
import { EventsCalendar } from "@/feature/general/calendar"

export default function GeneralPage() {
  return (
    <div className="flex gap-6 pt-24">
      <div className="flex flex-col gap-6">
        <Greeting />
        <QuickStart />
        <UpcomingEvents />
      </div>
      <div className="w-1/2">
        <EventsCalendar />
      </div>
    </div>
  )
}