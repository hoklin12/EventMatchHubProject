

// // components/EventSidebar.tsx
// "use client"

// import Link from "next/link"
// import { Home, Calendar, Settings, BarChart3, MessageSquare, LogOut } from "lucide-react"
// import ReceiptIcon from '@mui/icons-material/Receipt'
// import { usePathname } from "next/navigation"

// const sidebarItems = [
//   { icon: Home, label: "Dashboard", href: "/dashboard" },
//   { icon: Calendar, label: "Events", href: "/event_management/dashboard" },
//   { icon: ReceiptIcon, label: "Receipts", href: "/receipts" },
// ]

// export default function EventSidebar() {
//   const pathname = usePathname()

//   return (
//     <aside className="fixed left-0 top-0 z-40 h-screen w-16 lg:w-20 bg-white border-r border-gray-200 flex flex-col items-center py-4 py-20 space-y-6 lg:space-y-8">
//       {/* Navigation Icons */}
//       <nav className="flex-1 flex flex-col items-center space-y-4 lg:space-y-6 w-full">
//         {sidebarItems.map((item) => {
//           const Icon = item.icon
//           const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className={`relative transition-all duration-200 p-2 lg:p-3 rounded-lg lg:rounded-xl w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center ${
//                 isActive
//                   ? "bg-purple-100 text-purple-600"
//                   : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
//             </Link>
//           )
//         })}
//       </nav>
//     </aside>
//   )
// }



// components/EventSidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Receipt } from "lucide-react"
import ReceiptIcon from '@mui/icons-material/Receipt'

const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Calendar, label: "Events", href: "/event_management" },        // Root event path
  { icon: ReceiptIcon, label: "Receipts", href: "/receipts" },
]

export default function EventSidebar() {
  const pathname = usePathname()

  // Events icon active if URL starts with /event_management
  const isActive = (href: string) => {
    if (href === "/event_management") {
      return pathname.startsWith("/event_management")
    }
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-16 lg:w-20 bg-white border-r border-gray-200 flex flex-col items-center py-20 space-y-8">


      {/* Navigation Icons */}
      <nav className="flex-1 flex flex-col items-center space-y-6 w-full">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative group transition-all duration-200 p-3 rounded-xl w-14 h-14 flex items-center justify-center ${
                active
                  ? "bg-purple-100 text-purple-600 shadow-md"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-6 h-6" />

              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                {item.label}
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-gray-900" />
              </div>
            </Link>
          )
        })}
      </nav>

    </aside>
  )
}