"use client";

import { useState } from "react";
import { Plus, Calendar, Clock } from "lucide-react";

interface AddTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (ticket: any) => void; // Adjust type as needed
}

export default function AddTicketModal({ isOpen, onClose, onAdd }: AddTicketModalProps) {
  const [ticketType, setTicketType] = useState<"Free" | "Paid" | "Donation">("Free");
  const [quantity, setQuantity] = useState("10");
  const [price, setPrice] = useState("0.00");

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Create new ticket object
    const newTicket = {
      id: Date.now(), // Simple ID generation
      type: ticketType,
      title: `${ticketType} Ticket`,
      details: "Starts Nov 02, 2025 - Ends Dec 12, 2025 at 12:00PM",
      quantity: ticketType === "Free" ? "Unlimited" : `${quantity} available`,
      price: ticketType === "Free" ? "$0.00" : `$${price}`,
    };
    onAdd(newTicket);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8 lg:p-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-900">Add New Ticket</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                ✕
              </button>
            </div>

            {/* Form Content */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-6">
                Ticket Type <span className="text-red-500">*</span>
              </h4>

              {/* Toggle Buttons */}
              <div className="flex gap-3 mb-8">
                {(["Free", "Paid", "Donation"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setTicketType(type);
                      if (type === "Free") setPrice("0.00");
                    }}
                    className={`px-6 py-3 rounded-full font-medium transition ${
                      ticketType === type
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ticket Fee (USD) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={ticketType === "Free"}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Sales Date/Time Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sales start <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      defaultValue="2025-11-02"
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      defaultValue="08:00"
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sales end <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      defaultValue="2025-12-20"
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      defaultValue="20:00"
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}