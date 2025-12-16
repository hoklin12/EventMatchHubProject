"use client";

import { MoreVertical, Plus, Calendar, Clock, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import EventDetailSidebar from "../detailslidebar";

interface Ticket {
  id: number;
  type: "Free" | "Paid";
  title: string;
  details: string;
  quantity: string;
  price: string;
  // Internal data for editing
  salesStartDate: string;
  salesStartTime: string;
  salesEndDate: string;
  salesEndTime: string;
}

interface TicketsPageProps {
  onBack?: () => void;
  onContinue?: () => void;
  currentStep: string;
}

export default function TicketsPage({
  onBack,
  onContinue,
  currentStep,
}: TicketsPageProps) {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      type: "Free",
      title: "General Admission",
      details: "Starts Nov 02, 2025 – Ends Dec 12, 2025 at 12:00PM",
      quantity: "Unlimited",
      price: "$0.00",
      salesStartDate: "2025-11-02",
      salesStartTime: "08:00",
      salesEndDate: "2025-12-12",
      salesEndTime: "12:00",
    },
    {
      id: 2,
      type: "Paid",
      title: "VIP Access",
      details: "Starts Nov 02, 2025 – Ends Dec 12, 2025 at 12:00PM",
      quantity: "100 available",
      price: "$49.99",
      salesStartDate: "2025-11-02",
      salesStartTime: "08:00",
      salesEndDate: "2025-12-12",
      salesEndTime: "12:00",
    },
  ]);

  const [isAddingTicket, setIsAddingTicket] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const defaultNewTicket = {
    type: "Free" as "Free" | "Paid",
    title: "",
    quantity: "100",
    price: "0.00",
    salesStartDate: "2025-11-02",
    salesStartTime: "08:00",
    salesEndDate: "2025-12-20",
    salesEndTime: "20:00",
  };

  const [formData, setFormData] = useState(defaultNewTicket);

  const resetForm = () => {
    setFormData(defaultNewTicket);
    setIsAddingTicket(false);
    setEditingTicket(null);
  };

  const handleSaveTicket = () => {
    if (!formData.title.trim()) {
      alert("Please enter a ticket title");
      return;
    }

    const details = `Starts ${formData.salesStartDate} – Ends ${formData.salesEndDate} at ${formData.salesEndTime}`;
    const quantityText = formData.type === "Free" ? "Unlimited" : `${formData.quantity} available`;
    const priceText = formData.type === "Free" ? "$0.00" : `$${parseFloat(formData.price || "0").toFixed(2)}`;

    const ticketData = {
      ...formData,
      details,
      quantity: quantityText,
      price: priceText,
    };

    if (editingTicket) {
      // Update existing
      setTickets(tickets.map(t => t.id === editingTicket.id ? { ...ticketData, id: editingTicket.id } : t));
    } else {
      // Add new
      setTickets([...tickets, { ...ticketData, id: Date.now() }]);
    }

    resetForm();
  };

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setFormData({
      type: ticket.type,
      title: ticket.title,
      quantity: ticket.quantity === "Unlimited" ? "100" : ticket.quantity.split(" ")[0],
      price: ticket.type === "Free" ? "0.00" : ticket.price.replace("$", ""),
      salesStartDate: ticket.salesStartDate,
      salesStartTime: ticket.salesStartTime,
      salesEndDate: ticket.salesEndDate,
      salesEndTime: ticket.salesEndTime,
    });
    setIsAddingTicket(true);
    setOpenMenuId(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      setTickets(tickets.filter(t => t.id !== id));
      setOpenMenuId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        <EventDetailSidebar activeStep={currentStep} />

        <main className="flex-1 lg:ml-72 min-h-screen">
          <div className="p-6 lg:p-10">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="p-8 lg:p-10 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">Tickets</h1>
                      <p className="text-gray-600 mt-2">
                        Define ticket types, pricing, and availability for your event
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        resetForm();
                        setIsAddingTicket(true);
                      }}
                      className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                    >
                      <Plus className="w-5 h-5" />
                      Add New Ticket
                    </button>
                  </div>
                </div>

                {/* Existing Tickets List */}
                <div className="p-8 lg:p-10">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Existing Tickets</h3>
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="group bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all relative"
                      >
                        <div className="flex items-center gap-5 flex-1">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-2xl font-bold text-white shadow-inner">
                              {ticket.type === "Free" ? "F" : "P"}
                            </div>
                            <span className="absolute -bottom-2 -right-2 px-3 py-1 text-xs font-bold rounded-full bg-black text-white">
                              {ticket.type}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <h4 className="text-lg font-semibold text-gray-900">{ticket.title}</h4>
                              <span
                                className={`px-3 py-1 text-xs font-medium rounded-full ${
                                  ticket.type === "Free"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {ticket.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {ticket.details}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-10">
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Quantity</p>
                            <p className="text-lg font-semibold text-gray-900">{ticket.quantity}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Price</p>
                            <p className="text-xl font-bold text-gray-900">{ticket.price}</p>
                          </div>

                          {/* 3-Dots Menu */}
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenuId(openMenuId === ticket.id ? null : ticket.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                              <MoreVertical className="w-5 h-5 text-gray-500" />
                            </button>

                            {openMenuId === ticket.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                                <button
                                  onClick={() => handleEdit(ticket)}
                                  className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-50 text-gray-700"
                                >
                                  <Edit2 className="w-4 h-4" />
                                  Edit Ticket
                                </button>
                                <button
                                  onClick={() => handleDelete(ticket.id)}
                                  className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-red-50 text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete Ticket
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add / Edit Ticket Form */}
                {(isAddingTicket || editingTicket) && (
                  <div className="px-8 lg:px-10 pb-10">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 mb-8">
                        {editingTicket ? "Edit Ticket" : "Add New Ticket Type"} <span className="text-red-500">*</span>
                      </h3>

                      {/* Ticket Type Pills */}
                      <div className="mb-8">
                        <label className="block text-sm font-semibold text-gray-700 mb-4">Ticket Type</label>
                        <div className="flex flex-wrap gap-4">
                          {(["Free", "Paid"] as const).map((type) => (
                            <button
                              key={type}
                              onClick={() => {
                                setFormData({ ...formData, type });
                                if (type === "Free") setFormData(prev => ({ ...prev, price: "0.00" }));
                              }}
                              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                formData.type === type
                                  ? type === "Free"
                                    ? "bg-green-600 text-white shadow-lg"
                                    : "bg-blue-600 text-white shadow-lg"
                                  : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Ticket Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g., General Admission"
                            className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Quantity Available <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            disabled={formData.type === "Free"}
                            min="1"
                            className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-100"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Ticket Fee (USD)
                            {formData.type !== "Free" && <span className="text-red-500">*</span>}
                          </label>
                          <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 font-medium">$</span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={formData.price}
                              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                              disabled={formData.type === "Free"}
                              className="w-full pl-12 pr-5 py-3.5 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 disabled:bg-gray-100"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Sales Period */}
                      <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-800 mb-6">Sales Period</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              Sales Start <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="relative">
                                <input
                                  type="date"
                                  value={formData.salesStartDate}
                                  onChange={(e) => setFormData({ ...formData, salesStartDate: e.target.value })}
                                  className="w-full pl-11 pr-4 py-3.5 border border-gray-300 rounded-xl"
                                />
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              </div>
                              <div className="relative">
                                <input
                                  type="time"
                                  value={formData.salesStartTime}
                                  onChange={(e) => setFormData({ ...formData, salesStartTime: e.target.value })}
                                  className="w-full pl-11 pr-4 py-3.5 border border-gray-300 rounded-xl"
                                />
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              Sales End <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="relative">
                                <input
                                  type="date"
                                  value={formData.salesEndDate}
                                  onChange={(e) => setFormData({ ...formData, salesEndDate: e.target.value })}
                                  className="w-full pl-11 pr-4 py-3.5 border border-gray-300 rounded-xl"
                                />
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              </div>
                              <div className="relative">
                                <input
                                  type="time"
                                  value={formData.salesEndTime}
                                  onChange={(e) => setFormData({ ...formData, salesEndTime: e.target.value })}
                                  className="w-full pl-11 pr-4 py-3.5 border border-gray-300 rounded-xl"
                                />
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="flex justify-end gap-4 mt-10">
                        <button
                          onClick={resetForm}
                          className="px-8 py-3.5 border border-gray-300 rounded-xl bg-white font-medium hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveTicket}
                          className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition"
                        >
                          {editingTicket ? "Update Ticket" : "Add Ticket"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Navigation */}
                <div className="px-8 lg:px-10 py-8 border-t border-gray-100 bg-gray-50">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-gray-600">
                      {tickets.length} ticket{tickets.length !== 1 ? "s" : ""} configured
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={onBack}
                        className="px-8 py-3.5 border border-gray-300 rounded-xl bg-white font-medium hover:bg-gray-50 transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={onContinue}
                        className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg transition"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Click outside to close menu */}
      {openMenuId && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setOpenMenuId(null)}
        />
      )}
    </div>
  );
}