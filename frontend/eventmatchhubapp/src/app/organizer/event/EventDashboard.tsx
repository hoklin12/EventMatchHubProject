// components/EventDashboard.tsx
"use client";

import { Users, Ticket, DollarSign, List } from "lucide-react";
import Link from "next/link";
import EventDetailSidebar from "../detailslidebar";

export default function EventDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Reuse the shared sidebar - Dashboard is active */}
        <EventDetailSidebar activeSection="dashboard" />

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 min-h-screen">
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
                    <p className="text-3xl font-bold text-gray-900">04 / 100</p>
                    <p className="text-sm text-gray-500">Ticket Sold</p>
                    <p className="text-xs text-gray-400 mt-1">0 paid, 4 free</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900">54 $</p>
                    <p className="text-sm text-gray-500">Revenues</p>
                    <p className="text-xs text-gray-400 mt-1">Total earnings</p>
                  </div>
                </div>
              </div>

              {/* Recent Registrations */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Recent Registration</h2>
                  <Link href="#" className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline">
                    <List className="w-4 h-4" />
                    View Attendee Lists
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
                        <th className="pb-3"></th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-900 divide-y divide-gray-200">
                      <tr>
                        <td className="py-4">Touch Livita</td>
                        <td className="py-4">livita99@gmail.com</td>
                        <td className="py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Paid</span>
                        </td>
                        <td className="py-4 text-gray-500">Oct 14, 2025</td>
                        <td className="py-4 text-gray-400">...</td>
                      </tr>
                      <tr>
                        <td className="py-4">Touch Livita</td>
                        <td className="py-4">livita99@gmail.com</td>
                        <td className="py-4">
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Free</span>
                        </td>
                        <td className="py-4 text-gray-500">Oct 14, 2025</td>
                        <td className="py-4 text-gray-400">...</td>
                      </tr>
                      <tr>
                        <td className="py-4">Touch Livita</td>
                        <td className="py-4">livita99@gmail.com</td>
                        <td className="py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Paid</span>
                        </td>
                        <td className="py-4 text-gray-500">Oct 14, 2025</td>
                        <td className="py-4 text-gray-400">...</td>
                      </tr>
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