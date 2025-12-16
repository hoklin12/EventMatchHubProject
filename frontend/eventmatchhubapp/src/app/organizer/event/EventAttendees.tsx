// // components/Attendees.tsx
// "use client";

// import { Search, Download, MoreVertical, Mail, Edit } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import EventDetailSidebar from "../detailslidebar";

// export default function Attendees() {
//   const [selectedAttendee, setSelectedAttendee] = useState<number | null>(null);

//   // Sample data based on the screenshot
//   const attendees = [
//     {
//       id: 1,
//       name: "Touch Livita",
//       email: "livita99@gmail.com",
//       ticket: "Paid",
//       registered: "Oct 14, 2025",
//       status: "Attended",
//       phone: "+855 12 574 322",
//       paymentStatus: "Confirmed",
//       registeredDate: "Oct 09, 2025",
//       shirtSize: "S",
//       dietary: "Vegan",
//     },
//     {
//       id: 2,
//       name: "Touch Livita",
//       email: "livita99@gmail.com",
//       ticket: "Paid",
//       registered: "Oct 14, 2025",
//       status: "Checked In",
//     },
//     {
//       id: 3,
//       name: "Touch Livita",
//       email: "livita99@gmail.com",
//       ticket: "Paid",
//       registered: "Oct 14, 2025",
//       status: "No-show",
//     },
//   ];

//   const currentAttendee = attendees.find(a => a.id === selectedAttendee);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="flex relative">
//         {/* Reuse the shared sidebar - Attendees is active */}
//         <EventDetailSidebar activeSection="attendees" />

//         {/* Main Content */}
//         <main className="flex-1 lg:ml-72 min-h-screen">
//           <div className="p-6 lg:p-10">
//             <div className="max-w-7xl mx-auto">
//               {/* Header */}
//               <div className="mb-8">
//                 <h1 className="text-2xl font-bold text-gray-900">Attendees</h1>
//                 <p className="text-gray-600 mt-1">Manage and view all event registrants</p>
//               </div>

//               {/* Search & Export Bar */}
//               <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
//                 <div className="relative flex-1 max-w-md">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     placeholder="Search by name"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 font-medium">
//                   <Download className="w-5 h-5" />
//                   Export
//                 </button>
//               </div>

//               {/* Tabs */}
//               <div className="mb-6">
//                 <div className="flex gap-1 border-b border-gray-200">
//                   <button className="px-4 py-2 bg-blue-600 text-white rounded-t-lg font-medium">All</button>
//                   <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Attended</button>
//                   <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Registered</button>
//                   <button className="px-4 py-2 text-gray-600 hover:text-gray-900">No-show</button>
//                 </div>
//               </div>

//               {/* Attendees Table */}
//               <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-left">
//                     <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
//                       <tr>
//                         <th className="px-6 py-3 font-medium">Name</th>
//                         <th className="px-6 py-3 font-medium">Email</th>
//                         <th className="px-6 py-3 font-medium">Ticket</th>
//                         <th className="px-6 py-3 font-medium">Registered</th>
//                         <th className="px-6 py-3 font-medium">Status</th>
//                         <th className="px-6 py-3"></th>
//                       </tr>
//                     </thead>
//                     <tbody className="text-sm text-gray-900 divide-y divide-gray-200">
//                       {attendees.map((attendee) => (
//                         <tr
//                           key={attendee.id}
//                           className="hover:bg-gray-50 cursor-pointer"
//                           onClick={() => setSelectedAttendee(attendee.id)}
//                         >
//                           <td className="px-6 py-4 flex items-center gap-3">
//                             <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white shadow-md" />
//                             <span className="font-medium">{attendee.name}</span>
//                           </td>
//                           <td className="px-6 py-4">{attendee.email}</td>
//                           <td className="px-6 py-4">
//                             <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
//                               {attendee.ticket}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 text-gray-500">{attendee.registered}</td>
//                           <td className="px-6 py-4">
//                             {attendee.status === "Attended" && (
//                               <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
//                                 Attended
//                               </span>
//                             )}
//                             {attendee.status === "Checked In" && (
//                               <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
//                                 Checked In
//                               </span>
//                             )}
//                             {attendee.status === "No-show" && (
//                               <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
//                                 No-show
//                               </span>
//                             )}
//                           </td>
//                           <td className="px-6 py-4 text-gray-400">
//                             <MoreVertical className="w-5 h-5" />
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>

//         {/* Attendee Detail Drawer / Modal (appears on click) */}
//         {currentAttendee && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
//             <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-xl">
//               <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//                 <h2 className="text-xl font-semibold">{currentAttendee.name}</h2>
//                 <button
//                   onClick={() => setSelectedAttendee(null)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="p-6 space-y-8">
//                 {/* Contact */}
//                 <div>
//                   <h3 className="text-sm font-semibold text-gray-900 mb-3">CONTACT</h3>
//                   <div className="space-y-2 text-sm text-gray-600">
//                     <div>
//                       <p className="font-medium text-gray-900">Email</p>
//                       <p>{currentAttendee.email}</p>
//                     </div>
//                     {currentAttendee.phone && (
//                       <div>
//                         <p className="font-medium text-gray-900">Phone</p>
//                         <p>{currentAttendee.phone}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Registration */}
//                 <div>
//                   <h3 className="text-sm font-semibold text-gray-900 mb-3">REGISTRATION</h3>
//                   <div className="space-y-3 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Ticket Type</span>
//                       <span className="font-medium">Paid</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Payment Status</span>
//                       <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
//                         Confirmed
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Registered</span>
//                       <span className="text-gray-900">{currentAttendee.registeredDate || currentAttendee.registered}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Preferences */}
//                 {(currentAttendee.shirtSize || currentAttendee.dietary) && (
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-900 mb-3">PREFERENCES</h3>
//                     <div className="space-y-3 text-sm">
//                       {currentAttendee.shirtSize && (
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">T-Shirt Size</span>
//                           <span className="text-gray-900">{currentAttendee.shirtSize}</span>
//                         </div>
//                       )}
//                       {currentAttendee.dietary && (
//                         <div className="flex justify-between">
//                           <span className="text-gray-600">Dietary</span>
//                           <span className="text-gray-900">{currentAttendee.dietary}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Actions */}
//                 <div className="space-y-4 pt-6">
//                   <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2">
//                     <Mail className="w-5 h-5" />
//                     Send Email
//                   </button>
//                   <button className="w-full px-6 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 font-medium flex items-center justify-center gap-2">
//                     <Edit className="w-5 h-5" />
//                     Edit Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// components/Attendees.tsx
"use client";

import EventDetailSidebar from "../detailslidebar";
import { Search, Download, MoreVertical, Check, XCircle, UserCheck } from "lucide-react";
import { useState } from "react";
import AttendeeDetailModal from "./AttendeeDetailModal";

type AttendeeStatus = "Attended" | "Checked In" | "No-show" | "Registered";

interface Attendee {
  id: number;
  name: string;
  email: string;
  ticket: string;
  registered: string;
  status: AttendeeStatus;
  phone?: string;
  paymentStatus?: string;
  registeredDate?: string;
  shirtSize?: string;
  dietary?: string;
}

export default function Attendees() {
  const [selectedTab, setSelectedTab] = useState<"All" | "Attended" | "Registered" | "No-show">("All");
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
  const [menuOpenFor, setMenuOpenFor] = useState<number | null>(null);

  // Sample data (in real app, fetch from API)
  const [attendees, setAttendees] = useState<Attendee[]>([
    {
      id: 1,
      name: "Touch Livita",
      email: "livita99@gmail.com",
      ticket: "Paid",
      registered: "Oct 14, 2025",
      status: "Attended",
      phone: "+855 12 574 322",
      paymentStatus: "Confirmed",
      registeredDate: "Oct 09, 2025",
      shirtSize: "S",
      dietary: "Vegan",
    },
    {
      id: 2,
      name: "Touch Livita",
      email: "livita99@gmail.com",
      ticket: "Paid",
      registered: "Oct 14, 2025",
      status: "Checked In",
    },
    {
      id: 3,
      name: "Touch Livita",
      email: "livita99@gmail.com",
      ticket: "Paid",
      registered: "Oct 14, 2025",
      status: "No-show",
    },
    {
      id: 4,
      name: "Touch Livita",
      email: "livita99@gmail.com",
      ticket: "Paid",
      registered: "Oct 14, 2025",
      status: "Registered",
    },
  ]);

  // Filter attendees based on selected tab
  const filteredAttendees = attendees.filter((a) => {
    if (selectedTab === "All") return true;
    if (selectedTab === "Attended") return a.status === "Attended" || a.status === "Checked In";
    if (selectedTab === "No-show") return a.status === "No-show";
    if (selectedTab === "Registered") return a.status === "Registered";
    return true;
  });

  const getStatusBadge = (status: AttendeeStatus) => {
    switch (status) {
      case "Attended":
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Attended</span>;
      case "Checked In":
        return <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">Checked In</span>;
      case "No-show":
        return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">No-show</span>;
      case "Registered":
        return <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Registered</span>;
      default:
        return null;
    }
  };

  const updateStatus = (id: number, newStatus: AttendeeStatus) => {
    setAttendees((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    setMenuOpenFor(null);

    // Update selected attendee if it's open
    if (selectedAttendee?.id === id) {
      setSelectedAttendee({ ...selectedAttendee, status: newStatus });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex relative">
        <EventDetailSidebar activeSection="attendees" />

        <main className="flex-1 lg:ml-72 min-h-screen">
          <div className="p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Attendees</h1>
                <p className="text-gray-600 mt-1">Manage and view all event registrants</p>
              </div>

              {/* Search & Export */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 font-medium">
                  <Download className="w-5 h-5" />
                  Export
                </button>
              </div>

              {/* Tabs */}
              <div className="mb-6 flex gap-1 border-b border-gray-200">
                {(["All", "Attended", "Registered", "No-show"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-4 py-2 font-medium transition-colors ${
                      selectedTab === tab
                        ? "bg-blue-600 text-white rounded-t-lg"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Attendees Table */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 font-medium">Name</th>
                        <th className="px-6 py-3 font-medium">Email</th>
                        <th className="px-6 py-3 font-medium">Ticket</th>
                        <th className="px-6 py-3 font-medium">Registered</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-900 divide-y divide-gray-200">
                      {filteredAttendees.map((attendee) => (
                        <tr key={attendee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-white shadow-md" />
                            <span className="font-medium">{attendee.name}</span>
                          </td>
                          <td className="px-6 py-4">{attendee.email}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                              {attendee.ticket}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{attendee.registered}</td>
                          <td className="px-6 py-4">{getStatusBadge(attendee.status)}</td>
                          <td className="px-6 py-4 relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setMenuOpenFor(menuOpenFor === attendee.id ? null : attendee.id);
                              }}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <MoreVertical className="w-5 h-5" />
                            </button>

                            {/* 3-dot Action Menu */}
                            {menuOpenFor === attendee.id && (
                              <div className="absolute right-4 top-10 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 w-48">
                                <button
                                  onClick={() => updateStatus(attendee.id, "Attended")}
                                  className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-50 ${
                                    attendee.status === "Attended" ? "text-blue-600 font-medium" : "text-gray-700"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <UserCheck className="w-4 h-4" />
                                    Attended
                                  </div>
                                  {attendee.status === "Attended" && <Check className="w-4 h-4" />}
                                </button>

                                <button
                                  onClick={() => updateStatus(attendee.id, "Registered")}
                                  className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-50 ${
                                    attendee.status === "Registered" ? "text-blue-600 font-medium" : "text-gray-700"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    Registered
                                  </div>
                                  {attendee.status === "Registered" && <Check className="w-4 h-4" />}
                                </button>

                                <button
                                  onClick={() => updateStatus(attendee.id, "No-show")}
                                  className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-50 ${
                                    attendee.status === "No-show" ? "text-blue-600 font-medium" : "text-gray-700"
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <XCircle className="w-4 h-4" />
                                    No-show
                                  </div>
                                  {attendee.status === "No-show" && <Check className="w-4 h-4" />}
                                </button>

                                <div className="border-t border-gray-200 mt-2 pt-2">
                                  <button
                                    onClick={() => {
                                      setSelectedAttendee(attendee);
                                      setMenuOpenFor(null);
                                    }}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                                  >
                                    View Details
                                  </button>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Attendee Detail Modal (4:3 ratio on desktop) */}
        {selectedAttendee && (
          <AttendeeDetailModal
            attendee={selectedAttendee}
            onClose={() => setSelectedAttendee(null)}
          />
        )}
      </div>
    </div>
  );
}