"use client"
import { useEffect } from "react"

export const GoogleMapsProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
  }, [])

  return <>{children}</>
}
