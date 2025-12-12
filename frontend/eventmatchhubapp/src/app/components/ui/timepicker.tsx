"use client"

import * as React from "react"
import { Label } from "./label"
import { Input } from "./input"

interface TimePickerProps {
  label?: string
  value?: string // HH:mm:ss format
  onChange?: (value: string) => void
  required?: boolean
}

export function TimePicker({ label = "Time", value, onChange, required }: TimePickerProps) {
  const [time, setTime] = React.useState(value || "10:30:00")

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value)
    onChange?.(e.target.value)
  }

  return (
    <div className="flex flex-col gap-2">
      <Label className="px-1">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        type="time"
        value={time}
        onChange={handleTimeChange}
        step="1"
        className="w-32 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  )
}
