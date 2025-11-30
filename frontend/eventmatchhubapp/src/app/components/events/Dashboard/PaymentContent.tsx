// components/PaymentContent.tsx
"use client"

import { useState } from "react"
import { Check, Upload, Calendar } from "lucide-react"
import { Badge } from "@/app/components/ui/badge"

type PaymentMethod = "ABA" | "Bakong" | "Wing" | "Acleda" | "Canadia" | null

export default function PaymentContent() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null)
  const [isManual, setIsManual] = useState(true)
  const [qrGenerated, setQrGenerated] = useState(false)

  const methods = [
    { id: "ABA", logo: "/payment_logo/aba.png" },
    { id: "Bakong", logo: "/payment_logo/bakong.jpg" },
    { id: "Wing", logo: "/payment_logo/wing.png" },
    { id: "Acleda", logo: "/payment_logo/acleda.png" },
    { id: "Canadia", logo: "/payment_logo/canadia.jpg" },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Payment & Finance</h1>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h2 className="text-lg font-semibold mb-2">Payment Setup</h2>
        <p className="text-sm text-gray-500 mb-8">Configure payment methods for your event</p>

        {/* Step 1: Select Payment Method */}
        <div className="mb-12">
          <h3 className="text-sm font-medium mb-6">Step 1: Select Payment Method</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {methods.map((method) => (
              <button
                key={method.id}
                onClick={() => {
                  setSelectedMethod(method.id as PaymentMethod)
                  setIsManual(true)
                  setQrGenerated(false)
                }}
                className="relative focus:outline-none focus:ring-4 focus:ring-blue-200 rounded-2xl transition-all"
              >
                {selectedMethod === method.id && (
                  <div className="absolute -top-3 -right-3 z-10 bg-blue-600 text-white rounded-full p-2 shadow-lg">
                    <Check className="w-6 h-6" strokeWidth={3} />
                  </div>
                )}

                <img
                  src={method.logo}
                  alt={method.id}
                  className={`h-48 w-72 rounded-2xl shadow-lg object-cover transition-all ${
                    selectedMethod === method.id
                      ? "ring-4 ring-blue-500 shadow-2xl scale-105"
                      : "hover:shadow-xl hover:scale-105"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Configure Selected Method */}
        {selectedMethod && (
          <div className="border-t pt-10">
            <h3 className="text-lg font-semibold mb-2">Step 2: Configure {selectedMethod}</h3>
            <p className="text-sm text-gray-500 mb-10">
              Enter your account details to set up payment collection for your event
            </p>

            {/* Toggle: Manual vs QR Upload */}
            <div className="mb-12 -mx-8 px-8">
              <div className="bg-gray-200 rounded-full p-1 flex shadow-inner">
                <button
                  onClick={() => setIsManual(true)}
                  className={`flex-1 py-4 rounded-full text-lg font-semibold transition-all ${
                    isManual ? "bg-white text-gray-900 shadow-lg" : "text-gray-600"
                  }`}
                >
                  Manual Setup
                </button>
                <button
                  onClick={() => setIsManual(false)}
                  className={`flex-1 py-4 rounded-full text-lg font-semibold transition-all ${
                    !isManual ? "bg-white text-gray-900 shadow-lg" : "text-gray-600"
                  }`}
                >
                  QR Code Setup
                </button>
              </div>
            </div>

            {isManual ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account ID / Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter account ID or phone number"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500">This will be used to generate your payment QR code</p>

                <button
                  onClick={() => setQrGenerated(true)}
                  className="w-full py-5 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 text-lg transition"
                >
                  Generate Payment QR Code
                </button>

                {qrGenerated && (
                  <div className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="font-semibold text-blue-900">QR Code generated</p>
                    <p className="text-sm text-blue-700">
                      Your payment QR code is ready. Save to finalize setup.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="min-h-96 flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-300 rounded-2xl -mx-8">
                <p className="text-gray-600 text-center max-w-lg mb-10 text-lg">
                  Upload an existing QR code or generate one using the Manual Setup
                </p>
                <label className="cursor-pointer inline-flex items-center gap-4 px-12 py-6 bg-white border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-lg transition">
                  <Upload className="w-7 h-7" />
                  <span className="font-bold text-xl">Upload QR Code Image</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>
            )}

            <button className="mt-12 w-full py-5 bg-gray-800 text-white rounded-xl font-bold text-lg hover:bg-black transition">
              Save Payment Setup
            </button>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-medium text-blue-900 mb-3">Payment Information</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Payment QR codes will be displayed on your event page
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Attendees can scan to make payments directly
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Multiple payment methods can be added later
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span> Keep your account details secure and up-to-date
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}


