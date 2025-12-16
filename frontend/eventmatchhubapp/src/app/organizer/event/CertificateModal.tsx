// components/CertificateModal.tsx
"use client";

import { useState } from "react";
import { X, Trophy, Award } from "lucide-react";

type CertificateType = "Completion" | "Appreciation";

export default function CertificateModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [certificateType, setCertificateType] = useState<CertificateType>("Completion");

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-transparent bg-opacity-50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-300">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Certificate</h2>
              <p className="text-sm text-gray-600 mt-1">
                Create custom certificates for your event attendees
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Column: Certificate Type & Details */}
              <div className="space-y-8">
                {/* Certificate Type */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Certificate Type
                  </h3>
                  <p className="text-sm text-gray-600 mb-5">Choose a certificate type</p>

                  <div className="space-y-4">
                    <button
                      onClick={() => setCertificateType("Completion")}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                        certificateType === "Completion"
                          ? "border-purple-600 bg-purple-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          certificateType === "Completion"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Completion</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Award for completing an event
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setCertificateType("Appreciation")}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                        certificateType === "Appreciation"
                          ? "border-purple-600 bg-purple-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          certificateType === "Appreciation"
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Appreciation</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Award for participating in an event
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Certificate Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">
                    Certificate Details
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        defaultValue="CADT"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="Cambodia Academy of Digital Technology Certificate Description"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issue Date
                      </label>
                      <input
                        type="date"
                        defaultValue="2025-12-18"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organizer / Director
                      </label>
                      <input
                        type="text"
                        defaultValue="Livita Touch"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Template Preview */}
              <div>
                <div className="sticky top-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Template <span className="text-red-500">*</span>
                  </h3>

                  {/* Certificate Preview Card */}
                  <div className="bg-gray-50 rounded-2xl p-10 border-2 border-dashed border-gray-300 relative">
                    {/* Signature Avatar */}
                    <div className="absolute bottom-8 right-8">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img
                          src="/api/placeholder/80/80"
                          alt="Organizer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-center text-sm text-gray-600 mt-2 font-medium">
                        Livita Touch
                      </p>
                    </div>

                    {/* Certificate Content */}
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-800 mb-6">
                        Certificate of {certificateType}
                      </h1>

                      <p className="text-xl text-gray-700 mb-8">
                        This certificate is proudly presented to
                      </p>

                      <div className="h-12 border-b-2 border-gray-400 mx-auto w-80 mb-8" />

                      <p className="text-lg text-gray-700 mb-8">
                        For successfully completing the event
                      </p>

                      <p className="text-2xl font-semibold text-purple-700 mb-12">
                        AI & Machine Learning Summit 2025
                      </p>

                      <div className="flex justify-between items-end text-sm text-gray-600">
                        <div>
                          <p>Issued on</p>
                          <p className="font-medium">18/11/2025</p>
                        </div>
                        <div className="text-right">
                          <p>Issued by</p>
                          <p className="font-medium">Cambodia Academy of Digital Technology</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-4">
                    Preview updates automatically as you make changes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-10 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}