

// components/CreateEvent.tsx
"use client";

import { Upload, Calendar, Clock, X } from "lucide-react";
import { useState } from "react";
import EventDetailSidebar from "../detailslidebar";

interface CreateEventProps {
  onContinue: () => void;
  currentStep: string;
}

export default function CreateEvent({ onContinue, currentStep }: CreateEventProps) {
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(URL.createObjectURL(file));
    }
  };

  const removeBanner = () => setBannerImage(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <EventDetailSidebar activeStep={currentStep} />

        <main className="flex-1 lg:ml-72 min-h-screen">
          <div className="p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-xl border border-gray-200 p-8 lg:p-10">
                <div className="mb-10">
                  <h3 className="text-lg font-semibold mb-4">Event Theme</h3>
                  <div className="relative rounded-xl overflow-hidden h-64 bg-gray-100 border-2 border-dashed border-gray-300">
                    {bannerImage ? (
                      <img
                        src={bannerImage}
                        alt="Event banner"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <Upload className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="text-gray-600 font-medium">Upload photos</p>
                      </div>
                    )}
                    <label className="absolute inset-0 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBannerUpload}
                      />
                    </label>
                    {bannerImage && (
                      <button
                        onClick={removeBanner}
                        className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-4">Event Overview</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter event title"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Type <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Seminar</option>
                      <option>Conference</option>
                      <option>Workshop</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date & Time <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="date"
                        defaultValue="2025-10-22"
                        className="px-4 py-3 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="time"
                        defaultValue="10:00"
                        className="px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date & Time <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="date"
                        defaultValue="2025-10-22"
                        className="px-4 py-3 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="time"
                        defaultValue="18:00"
                        className="px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Venue Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Search for events"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden h-80 bg-gray-50 border border-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500 text-lg">Map will appear here</p>
                  </div>
                  <img
                    src="https://via.placeholder.com/1200x600.png?text=CADT+Location"
                    alt="Map preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                </div>

                <div className="flex justify-end gap-4 mt-12 pt-8 border-t border-gray-200">
                  <button className="px-6 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 font-medium">
                    Save as draft
                  </button>
                  <button
                    onClick={onContinue}
                    className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
                  >
                    Save and Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}