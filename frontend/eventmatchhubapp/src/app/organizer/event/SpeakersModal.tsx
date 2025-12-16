// components/SpeakersModal.tsx
"use client";

import { useState } from "react";
import { X, Plus, Trash2, Camera } from "lucide-react";

interface Speaker {
  id: string;
  name: string;
  title: string;
  description: string;
  photo: string | null; // URL or base64
}

export default function SpeakersModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [speakers, setSpeakers] = useState<Speaker[]>([
    {
      id: "1",
      name: "Povrajana",
      title: "AI Machine Learning",
      description: "",
      photo: null,
    },
    {
      id: "2",
      name: "Povrajana",
      title: "AI Machine Learning",
      description: "15+ years in Artificial Intelligence",
      photo: null,
    },
  ]);

  const addSpeaker = () => {
    const newSpeaker: Speaker = {
      id: Date.now().toString(),
      name: "",
      title: "",
      description: "",
      photo: null,
    };
    setSpeakers([...speakers, newSpeaker]);
  };

  const updateSpeaker = (id: string, updates: Partial<Speaker>) => {
    setSpeakers(speakers.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const removeSpeaker = (id: string) => {
    setSpeakers(speakers.filter((s) => s.id !== id));
  };

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
              <h2 className="text-2xl font-semibold text-gray-900">Speakers</h2>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-red-600 text-sm font-medium hover:text-red-700 flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete section
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 space-y-6">
            {/* Add Speaker Button */}
            <button
              onClick={addSpeaker}
              className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
            >
              <Plus className="w-5 h-5" />
              Add Speaker
            </button>

            {/* Speakers List */}
            <div className="space-y-6">
              {speakers.map((speaker) => (
                <div
                  key={speaker.id}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
                >
                  <div className="flex gap-6">
                    {/* Photo Upload */}
                    <div className="flex-shrink-0">
                      <div className="w-28 h-28 rounded-full border-2 border-dashed border-blue-400 flex items-center justify-center bg-white cursor-pointer hover:border-blue-600 transition">
                        {speaker.photo ? (
                          <img
                            src={speaker.photo}
                            alt={speaker.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <Camera className="w-10 h-10 text-blue-400" />
                        )}
                      </div>
                      <label className="block mt-3 text-center">
                        <span className="text-sm text-blue-600 cursor-pointer hover:underline">
                          Upload Photo
                        </span>
                        <input type="file" accept="image/*" className="hidden" />
                      </label>
                    </div>

                    {/* Speaker Details */}
                    <div className="flex-1 space-y-5">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Speaker Name
                        </label>
                        <input
                          type="text"
                          value={speaker.name}
                          onChange={(e) =>
                            updateSpeaker(speaker.id, { name: e.target.value })
                          }
                          placeholder="Enter speaker name"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Title */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={speaker.title}
                          onChange={(e) =>
                            updateSpeaker(speaker.id, { title: e.target.value })
                          }
                          placeholder="e.g., CEO, AI Expert"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Description */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          {speaker.description === "" && (
                            <button className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700">
                              <Plus className="w-4 h-4" />
                              Add Description
                            </button>
                          )}
                        </div>
                        <textarea
                          rows={speaker.description ? 3 : 1}
                          value={speaker.description}
                          onChange={(e) =>
                            updateSpeaker(speaker.id, {
                              description: e.target.value,
                            })
                          }
                          placeholder="Add speaker bio, expertise, etc."
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>

                      {/* Remove Button */}
                      {speakers.length > 1 && (
                        <div className="flex justify-end">
                          <button
                            onClick={() => removeSpeaker(speaker.id)}
                            className="text-red-600 text-sm font-medium hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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