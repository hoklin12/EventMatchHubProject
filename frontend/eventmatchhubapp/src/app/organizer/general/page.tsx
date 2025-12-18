import { Greeting } from "../greeting";
import { QuickStart } from "../quick-start";
import { UpcomingEvents } from "../upcoming-events";


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
