"use client"

import type React from "react"
import type { EventFormState } from "@/lib/types/event"
import { getFieldError, type ValidationError } from "@/lib/utils/validation"
import { Calendar, Clock } from "lucide-react"

interface EventDateTimeSectionProps {
  formState: EventFormState
  errors: ValidationError[]
  onChange: (field: keyof EventFormState, value: string) => void
}

export const EventDateTimeSection: React.FC<EventDateTimeSectionProps> = ({
  formState,
  errors,
  onChange,
}) => {
  const getError = (field: keyof EventFormState) => getFieldError(errors, field)

  const clickableField = (icon: React.ReactNode, input: React.ReactNode) => (
    <div
      className="relative cursor-pointer"
      onClick={(e) => {
        const inputEl = e.currentTarget.querySelector("input") as HTMLInputElement | null
        inputEl?.showPicker?.()
      }}
    >
      {icon}
      {input}
    </div>
  )

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-base font-bold text-gray-900">Date and Time</h3>

      <div className="grid grid-cols-4 gap-4">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Start Date <span className="text-red-500">*</span>
          </label>

          {clickableField(
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />,
            <input
              type="date"
              value={formState.eventDate}
              onChange={(e) => onChange("eventDate", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          cursor-pointer"
            />
          )}

          {getError("eventDate") && (
            <p className="mt-1 text-sm text-red-500">{getError("eventDate")}</p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">End Date</label>

          {clickableField(
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />,
            <input
              type="date"
              value={formState.endDate}
              onChange={(e) => onChange("endDate", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          cursor-pointer"
            />
          )}

          {getError("endDate") && (
            <p className="mt-1 text-sm text-red-500">{getError("endDate")}</p>
          )}
        </div>

        {/* Start Time */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Start Time <span className="text-red-500">*</span>
          </label>

          {clickableField(
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />,
            <input
              type="time"
              value={formState.startTime}
              onChange={(e) => onChange("startTime", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          cursor-pointer"
            />
          )}

          {getError("startTime") && (
            <p className="mt-1 text-sm text-red-500">{getError("startTime")}</p>
          )}
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">End Time</label>

          {clickableField(
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />,
            <input
              type="time"
              value={formState.endTime}
              onChange={(e) => onChange("endTime", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  )
}
