

// // src/app/organizer/general/page.tsx
// import { EventsList } from "@/app/organizer/event/EventsList"

import EventCreationWizard from "../EventCreationWizard";


// export default function EventsPage() {
//   return (
//     <div className="mx-auto px-6 py-8">
//       <EventsList />
//     </div>
//   )
// }

// app/events/create/page.tsx

export default function EventsPage() {
  return <EventCreationWizard />;
}