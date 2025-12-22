// components/AttendeeDetailModal.tsx
"use client";

import { Mail, Edit, X } from "lucide-react";

interface Attendee {
  name: string;
  email: string;
  phone?: string;
  ticket: string;
  paymentStatus?: string;
  registeredDate?: string;
  registered: string;
  shirtSize?: string;
  dietary?: string;
}

interface AttendeeDetailModalProps {
  attendee: Attendee;
  onClose: () => void;
}

export default function AttendeeDetailModal({ attendee, onClose }: AttendeeDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center p-4">
      {/* Modal with fixed 4:3 aspect ratio on large screens, full width/height on mobile */}
      <div
        className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-lg 
                   lg:w-[800px] lg:h-[800px] lg:max-w-none lg:max-h-none 
                   lg:aspect-[4/3] 
                   flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{attendee.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{attendee.email}</p>
              </div>
              {attendee.phone && (
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{attendee.phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Registration */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Registration
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Ticket Type</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Paid
                </span>
              </div>
              {attendee.paymentStatus && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Payment Status</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {attendee.paymentStatus}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Registered</span>
                <span className="font-medium text-gray-900">
                  {attendee.registeredDate || attendee.registered}
                </span>
              </div>
            </div>
          </div>

          {/* Preferences */}
          {(attendee.shirtSize || attendee.dietary) && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Preferences
              </h3>
              <div className="space-y-4 text-sm">
                {attendee.shirtSize && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">T-Shirt Size</span>
                    <span className="font-medium text-gray-900">{attendee.shirtSize}</span>
                  </div>
                )}
                {attendee.dietary && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Dietary</span>
                    <span className="font-medium text-gray-900">{attendee.dietary}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions - Fixed at bottom on large screens */}
          <div className="lg:mt-auto pt-6 space-y-4">
            <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2 transition-colors">
              <Mail className="w-5 h-5" />
              Send Email
            </button>
            <button className="w-full px-6 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 font-medium flex items-center justify-center gap-2 transition-colors">
              <Edit className="w-5 h-5" />
              Edit Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}