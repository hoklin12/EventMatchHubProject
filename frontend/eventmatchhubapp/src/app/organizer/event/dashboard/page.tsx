

"use client";

import { Users, Ticket, DollarSign, List, MoreVertical, Eye, Mail, DollarSign as RefundIcon, Ban } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function DashboardPage() {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId]);

  const recentRegistrations = [
    { id: 1, name: "Touch Livita", email: "livita99@gmail.com", ticketType: "Paid", registered: "Oct 14, 2025", paid: true },
    { id: 2, name: "Alex Johnson", email: "alex.j@example.com", ticketType: "Free", registered: "Oct 15, 2025", paid: false },
    { id: 3, name: "Sarah Chen", email: "sarah.chen@mail.com", ticketType: "Paid", registered: "Oct 16, 2025", paid: true },
    { id: 4, name: "Mike Ross", email: "mike.ross@gmail.com", ticketType: "Paid", registered: "Oct 16, 2025", paid: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <main className="flex-1 min-h-screen">
          <div className="p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Event Dashboard</h1>
                <p className="text-gray-600 mt-1">Monitor your event performance and registrations</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">24</p>
                    <p className="text-sm text-gray-500">Total Attendees</p>
                    <p className="text-xs text-gray-400 mt-1">of 500 capacity</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Ticket className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">18 / 100</p>
                    <p className="text-sm text-gray-500">Tickets Sold</p>
                    <p className="text-xs text-gray-400 mt-1">14 paid, 4 free</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">$1,240</p>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-xs text-gray-400 mt-1">From ticket sales</p>
                  </div>
                </div>
              </div>

              {/* Recent Registrations */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Registrations</h2>
                  <Link
                    href="/organizer/event/attendees"
                    className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline"
                  >
                    <List className="w-4 h-4" />
                    View All Attendees
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs text-gray-500 uppercase border-b border-gray-200">
                      <tr>
                        <th className="pb-3 font-medium">Name</th>
                        <th className="pb-3 font-medium">Email</th>
                        <th className="pb-3 font-medium">Ticket Type</th>
                        <th className="pb-3 font-medium">Registered</th>
                        <th className="pb-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-900 divide-y divide-gray-200">
                      {recentRegistrations.map((attendee) => (
                        <tr key={attendee.id} className="hover:bg-gray-50">
                          <td className="py-4 font-medium">{attendee.name}</td>
                          <td className="py-4 text-gray-600">{attendee.email}</td>
                          <td className="py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                attendee.paid
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {attendee.ticketType}
                            </span>
                          </td>
                          <td className="py-4 text-gray-500">{attendee.registered}</td>
                          <td className="py-4 text-right relative">
                            <div ref={openDropdownId === attendee.id ? dropdownRef : null}>
                              {/* Three Dots Button */}
                              <button
                                onClick={() => toggleDropdown(attendee.id)}
                                className="p-2 rounded-md hover:bg-gray-200 transition-colors"
                              >
                                <MoreVertical className="h-4 w-4 text-gray-600" />
                              </button>

                              {/* Dropdown Menu - Fully visible, no overflow */}
                              {openDropdownId === attendee.id && (
                                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-visible">
                                  <div className="py-2">
                                    <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3">
                                      <Eye className="h-4 w-4" />
                                      View Details
                                    </button>
                                    <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3">
                                      <Mail className="h-4 w-4" />
                                      Send Email
                                    </button>
                                    {attendee.paid && (
                                      <button className="w-full px-4 py-2.5 text-left text-sm text-orange-600 hover:bg-orange-50 flex items-center gap-3">
                                        <RefundIcon className="h-4 w-4" />
                                        Issue Refund
                                      </button>
                                    )}
                                    <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                                      <Ban className="h-4 w-4" />
                                      Cancel Registration
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
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
      </div>
    </div>
  );
}