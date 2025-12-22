
// // components/Attendees.tsx
// "use client";

// import AttendeeDetailModal from "@/feature/eventWizard/component/attendeeModal";
// import { Search, Download, MoreVertical, Check, XCircle, UserCheck } from "lucide-react";
// import { useState } from "react";

// type AttendeeStatus = "Attended" | "Checked In" | "No-show" | "Registered";

// interface Attendee {
//   id: number;
//   name: string;
//   email: string;
//   ticket: string;
//   registered: string;
//   status: AttendeeStatus;
//   phone?: string;
//   paymentStatus?: string;
//   registeredDate?: string;
//   shirtSize?: string;
//   dietary?: string;
// }

// export default function Attendees() {
//   const [selectedTab, setSelectedTab] = useState<"All" | "Attended" | "Registered" | "No-show">("All");
//   const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(null);
//   const [menuOpenFor, setMenuOpenFor] = useState<number | null>(null);

//   // Sample data (in real app, fetch from API)
//   const [attendees, setAttendees] = useState<Attendee[]>([
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
//     {
//       id: 4,
//       name: "Touch Livita",
//       email: "livita99@gmail.com",
//       ticket: "Paid",
//       registered: "Oct 14, 2025",
//       status: "Registered",
//     },
//   ]);

//   // Filter attendees based on selected tab
//   const filteredAttendees = attendees.filter((a) => {
//     if (selectedTab === "All") return true;
//     if (selectedTab === "Attended") return a.status === "Attended" || a.status === "Checked In";
//     if (selectedTab === "No-show") return a.status === "No-show";
//     if (selectedTab === "Registered") return a.status === "Registered";
//     return true;
//   });

//   const getStatusBadge = (status: AttendeeStatus) => {
//     switch (status) {
//       case "Attended":
//         return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Attended</span>;
//       case "Checked In":
//         return <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">Checked In</span>;
//       case "No-show":
//         return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">No-show</span>;
//       case "Registered":
//         return <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Registered</span>;
//       default:
//         return null;
//     }
//   };

//   const updateStatus = (id: number, newStatus: AttendeeStatus) => {
//     setAttendees((prev) =>
//       prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
//     );
//     setMenuOpenFor(null);

//     // Update selected attendee if it's open
//     if (selectedAttendee?.id === id) {
//       setSelectedAttendee({ ...selectedAttendee, status: newStatus });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="flex relative">

//         <main className="flex-1 min-h-screen">
//           <div className="p-6 lg:p-10">
//             <div className="max-w-7xl mx-auto">
//               {/* Header */}
//               <div className="mb-8">
//                 <h1 className="text-2xl font-bold text-gray-900">Attendees</h1>
//                 <p className="text-gray-600 mt-1">Manage and view all event registrants</p>
//               </div>

//               {/* Search & Export */}
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
//               <div className="mb-6 flex gap-1 border-b border-gray-200">
//                 {(["All", "Attended", "Registered", "No-show"] as const).map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setSelectedTab(tab)}
//                     className={`px-4 py-2 font-medium transition-colors ${
//                       selectedTab === tab
//                         ? "bg-blue-600 text-white rounded-t-lg"
//                         : "text-gray-600 hover:text-gray-900"
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
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
//                       {filteredAttendees.map((attendee) => (
//                         <tr key={attendee.id} className="hover:bg-gray-50">
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
//                           <td className="px-6 py-4">{getStatusBadge(attendee.status)}</td>
//                           <td className="px-6 py-4 relative">
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 setMenuOpenFor(menuOpenFor === attendee.id ? null : attendee.id);
//                               }}
//                               className="text-gray-400 hover:text-gray-600"
//                             >
//                               <MoreVertical className="w-5 h-5" />
//                             </button>

//                             {/* 3-dot Action Menu */}
//                             {menuOpenFor === attendee.id && (
//                               <div className="absolute right-4 top-10 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 w-48">
//                                 <button
//                                   onClick={() => updateStatus(attendee.id, "Attended")}
//                                   className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-50 ${
//                                     attendee.status === "Attended" ? "text-blue-600 font-medium" : "text-gray-700"
//                                   }`}
//                                 >
//                                   <div className="flex items-center gap-3">
//                                     <UserCheck className="w-4 h-4" />
//                                     Attended
//                                   </div>
//                                   {attendee.status === "Attended" && <Check className="w-4 h-4" />}
//                                 </button>

//                                 <button
//                                   onClick={() => updateStatus(attendee.id, "Registered")}
//                                   className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-50 ${
//                                     attendee.status === "Registered" ? "text-blue-600 font-medium" : "text-gray-700"
//                                   }`}
//                                 >
//                                   <div className="flex items-center gap-3">
//                                     Registered
//                                   </div>
//                                   {attendee.status === "Registered" && <Check className="w-4 h-4" />}
//                                 </button>

//                                 <button
//                                   onClick={() => updateStatus(attendee.id, "No-show")}
//                                   className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-50 ${
//                                     attendee.status === "No-show" ? "text-blue-600 font-medium" : "text-gray-700"
//                                   }`}
//                                 >
//                                   <div className="flex items-center gap-3">
//                                     <XCircle className="w-4 h-4" />
//                                     No-show
//                                   </div>
//                                   {attendee.status === "No-show" && <Check className="w-4 h-4" />}
//                                 </button>

//                                 <div className="border-t border-gray-200 mt-2 pt-2">
//                                   <button
//                                     onClick={() => {
//                                       setSelectedAttendee(attendee);
//                                       setMenuOpenFor(null);
//                                     }}
//                                     className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
//                                   >
//                                     View Details
//                                   </button>
//                                 </div>
//                               </div>
//                             )}
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

//         {/* Attendee Detail Modal (4:3 ratio on desktop) */}
//         {selectedAttendee && (
//           <AttendeeDetailModal
//             attendee={selectedAttendee}
//             onClose={() => setSelectedAttendee(null)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// components/Attendees.tsx or app/organizer/event/attendees/page.tsx

"use client";

import AttendeeDetailModal from "@/feature/eventWizard/component/attendeeModal";
import { Search, Download, MoreVertical, Check, XCircle, UserCheck } from "lucide-react";
import { useState } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data
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
      name: "Alex Johnson",
      email: "alex.j@example.com",
      ticket: "Free",
      registered: "Oct 15, 2025",
      status: "Checked In",
    },
    {
      id: 3,
      name: "Sarah Chen",
      email: "sarah.chen@mail.com",
      ticket: "Paid",
      registered: "Oct 16, 2025",
      status: "No-show",
    },
    {
      id: 4,
      name: "Mike Ross",
      email: "mike.ross@gmail.com",
      ticket: "Paid",
      registered: "Oct 16, 2025",
      status: "Registered",
    },
    {
      id: 5,
      name: "Emma Watson",
      email: "emma.w@example.com",
      ticket: "VIP",
      registered: "Oct 13, 2025",
      status: "Attended",
    },
  ]);

  // Filter by tab
  const tabFiltered = attendees.filter((a) => {
    if (selectedTab === "All") return true;
    if (selectedTab === "Attended") return a.status === "Attended" || a.status === "Checked In";
    if (selectedTab === "No-show") return a.status === "No-show";
    if (selectedTab === "Registered") return a.status === "Registered";
    return true;
  });

  // Filter by search
  const filteredAttendees = tabFiltered.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Status badge
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

  // Update status
  const updateStatus = (id: number, newStatus: AttendeeStatus) => {
    setAttendees((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    setMenuOpenFor(null);

    if (selectedAttendee?.id === id) {
      setSelectedAttendee({ ...selectedAttendee, status: newStatus });
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Ticket", "Registered", "Status", "Phone", "Payment Status", "Shirt Size", "Dietary"];
    const rows = filteredAttendees.map((a) => [
      a.name,
      a.email,
      a.ticket,
      a.registered,
      a.status,
      a.phone || "",
      a.paymentStatus || "",
      a.shirtSize || "",
      a.dietary || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((field) => `"${field}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `event_attendees_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex relative">
        <main className="flex-1 min-h-screen">
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
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition shadow-sm"
                >
                  <Download className="w-5 h-5" />
                  Export CSV
                </button>
              </div>

              {/* Tabs */}
              <div className="mb-6 flex gap-1 border-b border-gray-200">
                {(["All", "Attended", "Registered", "No-show"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                      selectedTab === tab
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-600 border-transparent hover:text-gray-900"
                    }`}
                  >
                    {tab} ({selectedTab === tab ? filteredAttendees.length : attendees.filter(a => tab === "All" ? true : tab === "Attended" ? a.status === "Attended" || a.status === "Checked In" : a.status === tab.toLowerCase().replace("-", " ")).length})
                  </button>
                ))}
              </div>

              {/* Attendees Table */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 font-medium">Name</th>
                        <th className="px-6 py-4 font-medium">Email</th>
                        <th className="px-6 py-4 font-medium">Ticket</th>
                        <th className="px-6 py-4 font-medium">Registered</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-900 divide-y divide-gray-200">
                      {filteredAttendees.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                            No attendees found
                          </td>
                        </tr>
                      ) : (
                        filteredAttendees.map((attendee) => (
                          <tr key={attendee.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white shadow-md" />
                              <span className="font-medium">{attendee.name}</span>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{attendee.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                attendee.ticket === "Paid" ? "bg-green-100 text-green-800" :
                                attendee.ticket === "VIP" ? "bg-purple-100 text-purple-800" :
                                "bg-gray-100 text-gray-800"
                              }`}>
                                {attendee.ticket}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">{attendee.registered}</td>
                            <td className="px-6 py-4">{getStatusBadge(attendee.status)}</td>
                            <td className="px-6 py-4 relative text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setMenuOpenFor(menuOpenFor === attendee.id ? null : attendee.id);
                                }}
                                className="p-2 rounded-lg hover:bg-gray-200 transition"
                              >
                                <MoreVertical className="w-5 h-5 text-gray-500" />
                              </button>

                              {/* Dropdown Menu - Fully visible */}
                              {menuOpenFor === attendee.id && (
                                <div className="absolute right-4 top-12 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
                                  <div className="py-2">
                                    <button
                                      onClick={() => updateStatus(attendee.id, "Attended")}
                                      className={`w-full px-5 py-3 text-left text-sm flex items-center justify-between hover:bg-gray-50 transition ${
                                        attendee.status === "Attended" ? "text-blue-600 font-semibold" : "text-gray-700"
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <UserCheck className="w-4 h-4" />
                                        Mark as Attended
                                      </div>
                                      {attendee.status === "Attended" && <Check className="w-4 h-4 text-blue-600" />}
                                    </button>

                                    <button
                                      onClick={() => updateStatus(attendee.id, "Registered")}
                                      className={`w-full px-5 py-3 text-left text-sm flex items-center justify-between hover:bg-gray-50 transition ${
                                        attendee.status === "Registered" ? "text-blue-600 font-semibold" : "text-gray-700"
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        Registered
                                      </div>
                                      {attendee.status === "Registered" && <Check className="w-4 h-4 text-blue-600" />}
                                    </button>

                                    <button
                                      onClick={() => updateStatus(attendee.id, "No-show")}
                                      className={`w-full px-5 py-3 text-left text-sm flex items-center justify-between hover:bg-gray-50 transition ${
                                        attendee.status === "No-show" ? "text-blue-600 font-semibold" : "text-gray-700"
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <XCircle className="w-4 h-4" />
                                        Mark as No-show
                                      </div>
                                      {attendee.status === "No-show" && <Check className="w-4 h-4 text-blue-600" />}
                                    </button>

                                    <div className="border-t border-gray-200 mt-2 pt-2">
                                      <button
                                        onClick={() => {
                                          setSelectedAttendee(attendee);
                                          setMenuOpenFor(null);
                                        }}
                                        className="w-full px-5 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition font-medium"
                                      >
                                        View Full Details
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modal */}
        {selectedAttendee && (
          <AttendeeDetailModal
            attendee={selectedAttendee}
            onClose={() => setSelectedAttendee(null)}
          />
        )}

        {/* Click outside to close dropdown */}
        {menuOpenFor !== null && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpenFor(null)}
          />
        )}
      </div>
    </div>
  );
}