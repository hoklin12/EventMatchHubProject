// // components/events/Dashboard/EventDashboardContent.tsx
// import Link from "next/link"
// import { Users, Ticket, DollarSign } from "lucide-react"
// import MoreVertIcon from '@mui/icons-material/MoreVert'

// const registrations = [
//   { name: "Touch Livita", email: "livita99@gmail.com", type: "Paid", date: "Oct 14, 2025" },
//   { name: "Touch Livita", email: "livita99@gmail.com", type: "Free", date: "Oct 14, 2025" },
// ]

// export default function EventDashboardContent() {
//   return (
//     <div className="max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold mb-8">Event Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white rounded-2xl p-6 border border-gray-200">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">Total Attendees</p>
//               <p className="text-4xl font-bold mt-2">24</p>
//             </div>
//             <div className="bg-purple-100 p-3 rounded-xl"><Users className="w-7 h-7 text-purple-600" /></div>
//           </div>
//         </div>
//         <div className="bg-white rounded-2xl p-6 border border-gray-200">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">Tickets Sold</p>
//               <p className="text-4xl font-bold mt-2">04 / 100</p>
//             </div>
//             <div className="bg-blue-100 p-3 rounded-xl"><Ticket className="w-7 h-7 text-blue-600" /></div>
//           </div>
//         </div>
//         <div className="bg-white rounded-2xl p-6 border border-gray-200 ring-2 ring-green-100">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-sm text-gray-500">Revenue</p>
//               <p className="text-4xl font-bold mt-2 text-green-600">$54</p>
//             </div>
//             <div className="bg-green-100 p-3 rounded-xl"><DollarSign className="w-7 h-7 text-green-600" /></div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
//         <div className="p-6 border-b border-gray-100 flex justify-between items-center">
//           <h3 className="font-semibold text-lg">Recent Registrations</h3>
//           <Link href="/event_management/attendees" className="text-blue-600 text-sm hover:underline">
//             View all →
//           </Link>
//         </div>
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Name</th>
//               <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Email</th>
//               <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Type</th>
//               <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase">Date</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {registrations.map((reg, i) => (
//               <tr key={i} className="hover:bg-gray-50">
//                 <td className="px-6 py-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-xs font-medium text-purple-700">TL</div>
//                     <span className="font-medium">{reg.name}</span>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{reg.email}</td>
//                 <td className="px-6 py-4">
//                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${reg.type === "Paid" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}`}>
//                     {reg.type}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-600">{reg.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }


// components/events/Dashboard/EventDashboardContent.tsx

"use client"   // ADD THIS LINE AT THE VERY TOP

import Link from "next/link"
import { Users, Ticket, DollarSign } from "lucide-react"
import MoreVertIcon from '@mui/icons-material/MoreVert'

const registrations = [
  { name: "Touch Livita", email: "livita99@gmail.com", type: "Paid", date: "Oct 14, 2025" },
  { name: "Touch Livita", email: "livita99@gmail.com", type: "Free", date: "Oct 14, 2025" },
  { name: "Sok Dara", email: "dara@gmail.com", type: "Paid", date: "Oct 15, 2025" },
]

export default function EventDashboardContent() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold">Event Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ... your 3 cards ... */}
      </div>

      {/* Recent Registrations */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-semibold text-lg">Recent Registrations</h3>
          <Link href="/event_management/attendees" className="text-blue-600 text-sm font-medium hover:underline">
            View all
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-right px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {registrations.map((reg, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-sm font-semibold text-purple-700">
                        {reg.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="font-medium text-gray-900">{reg.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{reg.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${reg.type === "Paid" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"}`}>
                      {reg.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{reg.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => alert(`Actions for ${reg.name}`)} // This now works!
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

