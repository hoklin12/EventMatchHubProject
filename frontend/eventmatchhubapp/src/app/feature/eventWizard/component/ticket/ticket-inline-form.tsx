"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import type { TicketFormErrors,TicketFormData, TicketType } from "@/lib/types/ticket"
import { validateTicketForm } from "@/lib/utils/ticket-validation"
import { cn } from "@/lib/utils"

interface TicketInlineFormProps {
  initialData?: TicketFormData
  onSubmit: (data: TicketFormData) => void
  onCancel: () => void
}

export const TicketInlineForm: React.FC<TicketInlineFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<TicketFormData>(
    initialData ?? {
      type: "free",
      quantity: 10,
      price: 0,
      salesStart: "",
      salesEnd: "",
      startTime: "08:00",
      endTime: "18:00",
    }
  )

  const [errors, setErrors] = useState<TicketFormErrors>({})

  const handleTypeChange = (type: TicketType) => {
    setFormData((prev) => ({
      ...prev,
      type,
      price: type === "free" ? 0 : prev.price,
    }))
  }

  const handleSubmit = () => {
    const validation = validateTicketForm(formData)

    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    onSubmit(formData)
  }

  return (
    <div className="border p-4 rounded-lg bg-gray-50 space-y-6">
      {/* Ticket Type */}
      <div>
        <Label className="text-sm font-semibold">Ticket Type *</Label>
        <div className="flex gap-2 mt-2">
          {(["free", "paid", "donation"] as TicketType[]).map((type) => (
            <Button
              key={type}
              type="button"
              variant={formData.type === type ? "default" : "outline"}
              className={cn(
                "flex-1 capitalize",
                formData.type === type ? "bg-black text-white" : "bg-gray-100 text-gray-700"
              )}
              onClick={() => handleTypeChange(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Quantity + Price */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Quantity *</Label>
          <Input
            type="number"
            className="mt-2"
            min={1}
            value={formData.quantity}
            onChange={(e) => setFormData((p) => ({ ...p, quantity: Number(e.target.value) }))}
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
        </div>

        <div>
          <Label>Price *</Label>
          <Input
            type="number"
            className="mt-2"
            step="0.01"
            min={0}
            disabled={formData.type === "free"}
            value={formData.price}
            onChange={(e) => setFormData((p) => ({ ...p, price: Number(e.target.value) }))}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Sales Start *</Label>
          <Input
            type="date"
            className="mt-2"
            value={formData.salesStart}
            onChange={(e) => setFormData((p) => ({ ...p, salesStart: e.target.value }))}
          />
          {errors.salesStart && <p className="text-red-500 text-sm mt-1">{errors.salesStart}</p>}
        </div>

        <div>
          <Label>Start Time *</Label>
          <Input
            type="time"
            className="mt-2"
            value={formData.startTime}
            onChange={(e) => setFormData((p) => ({ ...p, startTime: e.target.value }))}
          />
          {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Sales End *</Label>
          <Input
            type="date"
            className="mt-2"
            value={formData.salesEnd}
            onChange={(e) => setFormData((p) => ({ ...p, salesEnd: e.target.value }))}
          />
          {errors.salesEnd && <p className="text-red-500 text-sm mt-1">{errors.salesEnd}</p>}
        </div>

        <div>
          <Label>End Time *</Label>
          <Input
            type="time"
            className="mt-2"
            value={formData.endTime}
            onChange={(e) => setFormData((p) => ({ ...p, endTime: e.target.value }))}
          />
          {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button className="bg-black text-white" onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  )
}
