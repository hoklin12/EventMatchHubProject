// components/PaymentContent.tsx
"use client";

import EventDetailSidebar from "../detailslidebar";
import { Check, Upload } from "lucide-react";
import { useState } from "react";

type PaymentMethod = "ABA" | "Bakong" | "Wing" | "Acleda" | "Canadia" | null;

export default function PaymentContent() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [isManual, setIsManual] = useState(true);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [refundPolicy, setRefundPolicy] = useState<"allow" | "disallow">("disallow");
  const [refundDays, setRefundDays] = useState("");

  const methods = [
    { id: "Bakong", logo: "/bakong.jpg" },
    // Add more methods here when needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <EventDetailSidebar activeSection="payment-setup" />

        <main className="flex-1 lg:ml-72 min-h-screen">
          <div className="p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Payment & Finance</h1>
                <p className="text-gray-600 mt-2">Configure payment methods for your event</p>
              </div>

              {/* Payment Setup Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
                <h2 className="text-xl font-semibold mb-3">Payment Setup</h2>
                <p className="text-sm text-gray-500 mb-10">Configure payment methods for your event</p>

                {/* Step 1: Select Payment Method */}
                <div className="mb-12">
                  <h3 className="text-lg font-medium mb-6">Step 1: Select Payment Method</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {methods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => {
                          setSelectedMethod(method.id as PaymentMethod);
                          setIsManual(true);
                          setQrGenerated(false);
                        }}
                        className="relative group focus:outline-none"
                      >
                        {selectedMethod === method.id && (
                          <div className="absolute -top-3 -right-3 z-10 bg-blue-600 text-white rounded-full p-2 shadow-xl">
                            <Check className="w-6 h-6" strokeWidth={3} />
                          </div>
                        )}
                        <div
                          className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                            selectedMethod === method.id
                              ? "ring-4 ring-blue-500 shadow-2xl scale-105"
                              : "shadow-lg hover:shadow-2xl hover:scale-105"
                          }`}
                        >
                          <img
                            src={method.logo}
                            alt={method.id}
                            className="w-full h-48 object-contain bg-white p-6"
                          />
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Configure Selected Method */}
                {selectedMethod && (
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <h3 className="text-xl font-semibold mb-3">
                      Step 2: Configure {selectedMethod} Bank
                    </h3>
                    <p className="text-sm text-gray-600 mb-8">
                      Enter your account details to set up payment collection for your event
                    </p>

                    {/* Toggle: Manual vs QR Code Setup */}
                    <div className="mb-10">
                      <div className="inline-flex bg-gray-300 rounded-full p-1 shadow-sm">
                        <button
                          onClick={() => setIsManual(true)}
                          className={`px-8 py-3 rounded-full text-lg font-medium transition-all ${
                            isManual
                              ? "bg-white text-gray-900 shadow-sm"
                              : "text-gray-600"
                          }`}
                        >
                          Manual Setup
                        </button>
                        <button
                          onClick={() => setIsManual(false)}
                          className={`px-8 py-3 rounded-full text-lg font-medium transition-all ${
                            !isManual
                              ? "bg-white text-gray-900 shadow-sm"
                              : "text-gray-600"
                          }`}
                        >
                          QR Code Setup
                        </button>
                        
                      </div>
                    </div>

                    {isManual ? (
                      <div className="space-y-8">
                        {/* Account Holder Name */}
                        <div>
                          <label className="block text-lg font-medium text-gray-900 mb-3">
                            Account Holder Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Name for ABA Bank"
                            className="w-full px-6 py-4 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
                          />
                        </div>

                        {/* Account ID / Phone Number */}
                        <div>
                          <label className="block text-lg font-medium text-gray-900 mb-3">
                            Account ID / Phone Number
                          </label>
                          <input
                            type="text"
                            placeholder="Enter account ID or number"
                            className="w-full px-6 py-4 bg-white border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
                          />
                          <p className="mt-3 text-sm text-gray-500">
                            This will be used to generate your payment QR code
                          </p>
                        </div>

                        {/* Generate Button */}
                        <button
                          onClick={() => setQrGenerated(true)}
                          className="w-full py-5 bg-gray-700 text-white rounded-2xl font-medium text-lg hover:bg-gray-800 transition"
                        >
                          Generate Payment QR Code
                        </button>

                        {/* Success Message */}
                        {qrGenerated && (
                          <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
                            <p className="font-semibold text-blue-900">QR Code generated</p>
                            <p className="text-sm text-blue-700 mt-1">
                              Your payment QR code is ready. Save to finalize setup.
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <p className="text-sm text-gray-600 text-center mb-8">
                          Upload an existing QR code or generate one using the Manual Setup
                        </p>
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-20 text-center">
                          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                          <label className="cursor-pointer inline-flex items-center gap-4 px-12 py-6 bg-white border-2 border-gray-300 rounded-2xl hover:border-gray-400 hover:shadow-lg transition">
                            <Upload className="w-7 h-7" />
                            <span className="font-bold text-xl">Upload QR Code Image</span>
                            <input type="file" accept="image/*" className="hidden" />
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Save Button */}
                    <div className="mt-10">
                      <button className="w-full py-5 bg-gray-700 text-white rounded-2xl font-medium text-lg hover:bg-gray-800 transition">
                        Save Payment Setup
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Refund Policy */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-10">
                <h2 className="text-xl font-semibold mb-3">Refund Policy</h2>
                <p className="text-sm text-gray-500 mb-8">
                  After your event is published, you can only update your policy to make it more flexible for your attendees.
                </p>
                <div className="space-y-6">
                  <label className="flex items-center gap-4 cursor-pointer">
                    <input
                      type="radio"
                      name="refund"
                      checked={refundPolicy === "allow"}
                      onChange={() => setRefundPolicy("allow")}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="text-lg">Allow refunds</span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer">
                    <input
                      type="radio"
                      name="refund"
                      checked={refundPolicy === "disallow"}
                      onChange={() => setRefundPolicy("disallow")}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="text-lg">Don't allow refunds</span>
                  </label>

                  {refundPolicy === "allow" && (
                    <div className="ml-9 mt-4 space-y-4">
                      <p className="text-sm text-gray-600">
                        Set how many days before the event that the attendees can request refunds.
                      </p>
                      <input
                        type="number"
                        value={refundDays}
                        onChange={(e) => setRefundDays(e.target.value)}
                        placeholder="e.g. 7"
                        className="w-full max-w-xs px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
                <h4 className="font-semibold text-blue-900 mb-4 text-lg">Payment Information</h4>
                <ul className="space-y-3 text-blue-800">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">•</span>
                    Payment QR codes will be displayed on your event page
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">•</span>
                    Attendees can scan to make payments directly
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">•</span>
                    Multiple payment methods can be added later
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">•</span>
                    Keep your account details secure and up-to-date
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}