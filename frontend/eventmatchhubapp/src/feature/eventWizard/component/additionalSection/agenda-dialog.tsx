"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/shared/FileUpload"

interface AgendaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (file: File | null) => void
}

export function AgendaDialog({ open, onOpenChange, onSave }: AgendaDialogProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile)
  }

  const handleSave = () => {
    onSave(file)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Agenda</h2>
          </div>

          {/* Upload Area */}
          <FileUpload
            file={file}
            onFileChange={handleFileChange}
            accept="image/*,application/pdf"
            height="h-48"
            title=""
            description="PDF or Image (drag & drop or click)"
          />

          {/* Footer */}
          <div className="flex justify-end mt-6 pt-6 border-t">
            <Button
              onClick={handleSave}
              disabled={!file}
              className="bg-indigo-600 hover:bg-indigo-700 px-8"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
