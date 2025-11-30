// // components/AttendeesContent.tsx
// "use client"

// import { Search, Download, Filter } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
// import { Button } from "@/app/components/ui/button"
// import { Badge } from "@/app/components/ui/badge"
// import { Input } from "@/app/components/ui/input"

// const attendees = [
//   { name: "Touch Livita", email: "livita99@gmail.com", ticket: "Paid", date: "Oct 14, 2025", status: "Attended" },
//   { name: "Touch Livita", email: "livita99@gmail.com", ticket: "Paid", date: "Oct 14, 2025", status: "Checked In" },
//   { name: "Touch Livita", email: "livita99@gmail.com", ticket: "Paid", date: "Oct 14, 2025", status: "No-show" },
// ]

// const getStatusBadge = (status: string) => {
//   switch (status) {
//     case "Attended":
//       return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Attended</Badge>
//     case "Checked In":
//       return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">Checked In</Badge>
//     case "No-show":
//       return <Badge variant="secondary">No-show</Badge>
//     default:
//       return <Badge variant="secondary">{status}</Badge>
//   }
// }

// export default function AttendeesContent() {
//   return (
//     <div className="p-6 lg:p-8 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold mb-8">Attendees</h1>

//       {/* Search + Export */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//         <div className="relative flex-1 max-w-md">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <Input placeholder="Search by name" className="pl-10" />
//         </div>
//         <Button variant="outline" className="gap-2">
//           <Download className="w-4 h-4" /> Export
//         </Button>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-8 border-b border-gray-200 mb-6">
//         <button className="pb-3 border-b-2 border-blue-600 text-blue-600 font-medium">All</button>
//         <button className="pb-3 text-gray-500 hover:text-gray-900">Attended</button>
//         <button className="pb-3 text-gray-500 hover:text-gray-900">Checked In</button>
//         <button className="pb-3 text-gray-500 hover:text-gray-900">No-show</button>
//       </div>

//       {/* Attendees Table */}
//       <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                 <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
//                 <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
//                 <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                 <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {attendees.map((attendee, i) => (
//                 <tr key={i} className="hover:bg-gray-50">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <Avatar className="h-10 w-10">
//                         <AvatarImage src="/avatar.jpg" />
//                         <AvatarFallback>TL</AvatarFallback>
//                       </Avatar>
//                       <span className="font-medium">{attendee.name}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{attendee.email}</td>
//                   <td className="px-6 py-4">
//                     <Badge variant="outline">Paid</Badge>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-600">{attendee.date}</td>
//                   <td className="px-6 py-4">{getStatusBadge(attendee.status)}</td>
//                   <td className="px-6 py-4 text-right">
//                     <button className="text-gray-400 hover:text-gray-600">
//                       <Filter className="w-5 h-5" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }



// components/events/Dashboard/AttendeesContent.tsx
"use client"

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Search, Download, Filter } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Input } from "@/app/components/ui/input"


const attendees = [
  { name: "Touch Livita", email: "livita99@gmail.com", ticket: "Paid", date: "Oct 14, 2025", status: "Attended" },
  { name: "Sok Dara", email: "dara@gmail.com", ticket: "Paid", date: "Oct 15, 2025", status: "Checked In" },
  { name: "Chan Vanny", email: "vanny99@gmail.com", ticket: "Free", date: "Oct 14, 2025", status: "No-show" },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Attended":
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Attended</Badge>
    case "Checked In":
      return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">Checked In</Badge>
    case "No-show":
      return <Badge variant="secondary">No-show</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function AttendeesContent() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold">Attendees</h1>

      {/* Search + Export */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input placeholder="Search by name or email" className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200">
        <button className="pb-3 border-b-2 border-purple-600 text-purple-600 font-medium">All</button>
        <button className="pb-3 text-gray-500 hover:text-gray-900">Attended</button>
        <button className="pb-3 text-gray-500 hover:text-gray-900">Checked In</button>
        <button className="pb-3 text-gray-500 hover:text-gray-900">No-show</button>
      </div>

      {/* Attendees Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {attendees.map((attendee, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/avatar.jpg" />
                        <AvatarFallback className="bg-purple-100 text-purple-700">
                          {attendee.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">{attendee.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{attendee.email}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline">{attendee.ticket}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{attendee.date}</td>
                  <td className="px-6 py-4">{getStatusBadge(attendee.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => alert(`Actions for ${attendee.name}`)}
                    >
                      <MoreVertIcon className="w-5 h-5 text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}