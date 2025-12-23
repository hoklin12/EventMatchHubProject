// "use client"

// import { Plus, LayoutList } from "lucide-react"
// import { QuickStartCard } from "./quick-start-card"
// import { actionRoutes } from "@/lib/routes"

// const quickStartItems: {
//   action: keyof typeof actionRoutes
//   icon: typeof Plus | typeof LayoutList
//   title: string
//   description: string
//   primaryColor: "primary" | "secondary"
// }[] = [
//   {
//     action: "start-event",
//     icon: Plus,
//     title: "Start a new event",
//     description: "Add your event information, set up tickets, and manage recurring schedules.",
//     primaryColor: "primary"
//   },
//   {
//     action: "view-events",
//     icon: LayoutList,
//     title: "View all events",
//     description: "Browse and manage all your events collections",
//     primaryColor: "secondary"
//   }
// ]

// export function QuickStart() {
//   return (
//     <div className="mb-8">
//       <h2 className="text-3xl font-semibold text-foreground mb-4">Quick Start</h2>

//       <div className="grid grid-cols-2 gap-4">
//         {quickStartItems.map((item) => (
//           <QuickStartCard
//             key={item.action}
//             href={actionRoutes[item.action]} // ✅ dynamic route
//             icon={item.icon}
//             title={item.title}
//             description={item.description}
//             primaryColor={item.primaryColor}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// feature/general/quick-start.tsx

"use client";

import { Plus, LayoutList } from "lucide-react";
import Link from "next/link";

const quickStartItems = [
  {
    href: "/organizer/event/create",
    icon: Plus,
    title: "Create New Event",
    description: "Set up a new event with tickets, dates, and custom sections.",
    gradient: "from-purple-600 to-indigo-600",
  },
  {
    href: "/organizer/event",
    icon: LayoutList,
    title: "View All Events",
    description: "Browse and manage all your active and past events.",
    gradient: "from-blue-600 to-cyan-600",
  },
];

export function QuickStart() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-foreground mb-6">Quick Actions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickStartItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group block"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                <span className="inline-block mt-6 text-sm font-semibold text-primary group-hover:translate-x-2 transition">
                  Get Started →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}