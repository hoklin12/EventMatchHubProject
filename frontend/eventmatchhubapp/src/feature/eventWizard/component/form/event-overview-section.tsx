// Event overview form section

"use client"

import type React from "react"
import type { EventFormState } from "@/lib/types/event"
import { EVENT_TYPES, EVENT_CATEGORIES } from "@/lib/constants/event"
import { getFieldError, type ValidationError } from "@/lib/utils/validation"

interface EventOverviewSectionProps {
  formState: EventFormState
  errors: ValidationError[]
  onChange: (field: keyof EventFormState, value: string) => void
}

export const EventOverviewSection: React.FC<EventOverviewSectionProps> = ({ formState, errors, onChange }) => {
  const getError = (field: keyof EventFormState) => getFieldError(errors, field)

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-1">Event Overview</h2>
        <p className="text-sm text-gray-600">
          Fill in the details to create your event and start accepting registrations
        </p>
      </div>

      {/* Event Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Event Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formState.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Enter event name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {getError("name") && <p className="mt-1 text-sm text-red-500">{getError("name")}</p>}
      </div>

      {/* Event Type and Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Event Type<span className="text-red-500">*</span>
          </label>
          <select
            value={formState.type}
            onChange={(e) => onChange("type", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Event Type</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {getError("type") && <p className="mt-1 text-sm text-red-500">{getError("type")}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={formState.category}
            onChange={(e) => onChange("category", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Category</option>
            {Object.values(EVENT_CATEGORIES).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {getError("category") && <p className="mt-1 text-sm text-red-500">{getError("category")}</p>}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formState.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Add a short, engaging description to introduce your event. Shown at the top of your event page."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="mt-1 text-xs text-gray-500">{formState.description.length} / 500 characters</p>
        {getError("description") && <p className="mt-1 text-sm text-red-500">{getError("description")}</p>}
      </div>
    </div>
  )
}
