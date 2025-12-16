// src/app/organizer/general/page.tsx
import { UpcomingEvents } from "@/app/feature/general/upcoming-events"
import { Greeting } from "../../feature/general/greeting"
import { QuickStart } from "../../feature/general/quick-start"


export default function GeneralPage() {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-6">
        <Greeting />
        <QuickStart />
        <UpcomingEvents />
      </div>
    </div>
  )
}
