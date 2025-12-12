// Location and capacity section

"use client"

import React, { useEffect, useRef, useState } from "react"
import type { EventFormState } from "@/lib/types/event"
import { getFieldError, type ValidationError } from "@/lib/utils/validation"
import { MapPin, Search } from "lucide-react"


interface EventLocationSectionProps {
  formState: EventFormState
  errors: ValidationError[]
  onChange: (field: keyof EventFormState, value: string) => void
}

declare global {
  interface Window {
    google: any
  }
}

export const EventLocationSection: React.FC<EventLocationSectionProps> = ({ formState, errors, onChange }) => {
  const getError = (field: keyof EventFormState) => getFieldError(errors, field)
  const addressInputRef = useRef<HTMLInputElement | null>(null)
  const mapRef = useRef<HTMLDivElement | null>(null)
  const markerRef = useRef<any>(null)
  const [map, setMap] = useState<any>(null)
  const [googleLoaded, setGoogleLoaded] = useState(false)

  const venueOptions = ["Venue"]

  // Wait for Google Maps API to load
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google) {
        setGoogleLoaded(true)
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Initialize Google Map
  useEffect(() => {
    if (!googleLoaded || !mapRef.current) return

    const initialLatLng = new window.google.maps.LatLng(11.5564, 104.9282) // Phnom Penh default

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: initialLatLng,
      zoom: 12,
    })

    const marker = new window.google.maps.Marker({
      position: initialLatLng,
      map: mapInstance,
      draggable: true,
    })

    marker.addListener("dragend", () => {
      const pos = marker.getPosition()
      if (pos) {
        onChange("address", `${pos.lat()},${pos.lng()}`)
      }
    })

    markerRef.current = marker
    setMap(mapInstance)
  }, [googleLoaded, onChange])

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (!googleLoaded || !addressInputRef.current) return

    const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
      types: ["geocode"],
    })

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace()
      if (!place.geometry) return
      const location = place.geometry.location
      onChange("address", place.formatted_address)
      map?.setCenter(location)
      markerRef.current.setPosition(location)
    })
  }, [googleLoaded, map, onChange])

  return (
    <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-base font-bold text-gray-900">Location</h3>

      {/* Venue Type */}
      <div className="flex gap-2 mb-4">
        {venueOptions.map((option) => (
          <button
            key={option}
            onClick={() => onChange("venue", option)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              formState.venue === option
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Location Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Location Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formState.locationName}
          onChange={(e) => onChange("locationName", e.target.value)}
          placeholder="Venue Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {getError("locationName") && <p className="mt-1 text-sm text-red-500">{getError("locationName")}</p>}
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Address <span className="text-red-500">*</span>
        </label>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            ref={addressInputRef}
            value={formState.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Search address"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {getError("address") && <p className="mt-1 text-sm text-red-500">{getError("address")}</p>}

        {/* Map */}
        <div ref={mapRef} className="bg-gray-200 rounded-lg h-64 w-full" />
      </div>
    </div>
  )
}
