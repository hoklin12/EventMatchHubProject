"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { Award, Trophy } from "lucide-react"
import { validateCertificate } from "@/lib/utils/validation"
import type { CertificateFormData, CertificateType } from "@/lib/types/certificate"

interface CertificateSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: CertificateFormData) => void
}

export function CertificateSettingsDialog({ open, onOpenChange, onSave }: CertificateSettingsDialogProps) {
  const [selectedType, setSelectedType] = useState<CertificateType>("completion")
  const [organizationName, setOrganizationName] = useState("")
  const [description, setDescription] = useState("")
  const [issueDate, setIssueDate] = useState("")
  const [organizerDirector, setOrganizerDirector] = useState("")


  const [errors, setErrors] = useState<Record<string, string>>({})


  const resetForm = () => {
    setSelectedType("completion")
    setOrganizationName("")
    setDescription("")
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, "0")
    const dd = String(today.getDate()).padStart(2, "0")
    setIssueDate(`${yyyy}-${mm}-${dd}`)

    setOrganizerDirector("")
    setErrors({})  
  }

  
  const handleSave = () => {
  const validation = validateCertificate({
    type: selectedType,
    organizationName,
    description,
    issueDate,
    organizerDirector,
  })

  if (validation.length > 0) {
    const formatted: Record<string, string> = {}
    validation.forEach(err => (formatted[err.field] = err.message))
    setErrors(formatted)
    return
  }

  onSave({
    type: selectedType,
    organizationName,
    description,
    issueDate,
    organizerDirector,
  })
}


  const certificateTypes = [
    { type: "completion" as CertificateType, title: "Completion", subtitle: "Award for completing an event", icon: Award },
    { type: "appreciation" as CertificateType, title: "Appreciation", subtitle: "Award for showing appreciation", icon: Trophy },
  ]

  return (
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          // If dialog is closing
          if (!isOpen) {
            resetForm()   // reset BEFORE closing
          }
          onOpenChange(isOpen)
        }}
      >
  

    <DialogContent className="w-[90vw] max-w-[90vw] max-h-[90vh] overflow-y-auto p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Certificate</h2>
          <p className="text-sm text-gray-600 mt-1">Create custom certificates for your event attendees</p>
        </div>

        <div className="flex gap-6">
          {/* Left Column - Certificate Type & Details */}
          <div className="flex-[0.5] space-y-6">
            {/* Certificate Type */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">Certificate Type</h3>
              <p className="text-sm text-gray-600 mb-4">Choose a certificate type</p>
              <div className="space-y-3">
                {certificateTypes.map((cert) => {
                  const Icon = cert.icon
                  const isSelected = selectedType === cert.type
                  return (
                    <button
                      key={cert.type}
                      onClick={() => setSelectedType(cert.type)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                        isSelected
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "bg-white border-gray-200 text-gray-900 hover:border-indigo-300"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-indigo-600"}`} />
                      <div>
                        <div className={`font-semibold ${isSelected ? "text-white" : "text-gray-900"}`}>
                          {cert.title}
                        </div>
                        <div className={`text-sm ${isSelected ? "text-indigo-100" : "text-gray-600"}`}>
                          {cert.subtitle}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Certificate Details */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-900">Organization Name</Label>
                <Input
                  placeholder="Enter organization name"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  className="mt-1"
                />
                {errors.organizationName && (
                  <p className="text-red-500 text-sm mt-1">{errors.organizationName}</p>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-900">Description</Label>
                <Textarea
                  placeholder="Enter certificate description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 min-h-[80px] resize-none"
                />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
              </div>


              <div>
                <Label className="text-sm font-medium text-gray-900">Issue Date</Label>
                <Input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="mt-1"
                />
              {errors.issueDate && (
                <p className="text-red-500 text-sm mt-1">{errors.issueDate}</p>
              )}
              </div>


              <div>
                <Label className="text-sm font-medium text-gray-900">Organizer Director</Label>
                <Input
                  placeholder="Enter organizer director"
                  value={organizerDirector}
                  onChange={(e) => setOrganizerDirector(e.target.value)}
                  className="mt-1"
                />
              {errors.organizerDirector && (
                <p className="text-red-500 text-sm mt-1">{errors.organizerDirector}</p>
              )}
              </div>


            </div>
          </div>

          {/* Right Column - Template Placeholder */}
          <div className="flex-[0.5] space-y-4">
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Template
            </h3>
            <div className="p-4 border rounded-lg bg-gray-50 text-gray-500 text-center">
              {selectedType === "completion"
                ? "Completion template - Updated soon"
                : "Appreciation template - Updated soon"}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
        <Button
          variant="outline"
          onClick={() => {
            resetForm();        // ← reset first
            onOpenChange(false) // ← then close dialog
          }}
        >
          Cancel
        </Button>

          <Button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 px-8">
            Save
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}
