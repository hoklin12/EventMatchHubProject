"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { validateSpeakers, SpeakerValidationError } from "@/lib/utils/validation"
import { Textarea } from "@/components/ui/textarea"
import { UserPlus, ImageIcon, MoreVertical, Copy, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Speaker, SpeakerFormData } from "@/lib/types/speaker"

import { FileUpload } from "@/components/shared/FileUpload"

interface SpeakersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: SpeakerFormData) => void
}

export function SpeakersDialog({ open, onOpenChange, onSave }: SpeakersDialogProps) {

  const [errors, setErrors] = useState<SpeakerValidationError[]>([])

  const getSpeakerError = (speakerId: string, field: keyof Omit<Speaker, "id" | "imageUrl">) => {
    return errors.find((err) => err.id === speakerId && err.field === field)?.message || null
  }
  

  const [speakers, setSpeakers] = useState<Speaker[]>([
    {
      id: "1",
      name: "",
      title: "",
      file: undefined, // store the uploaded file here
    },
  ])

  const handleAddSpeaker = () => {
    const newSpeaker: Speaker = {
      id: Date.now().toString(),
      name: "",
      title: "",
      file: undefined,
      imageUrl: undefined, // optional preview
    }
    setSpeakers([...speakers, newSpeaker])
    
  }

  const handleRemoveSpeaker = (id: string) => {
    setSpeakers(speakers.filter((speaker) => speaker.id !== id))
  }

  const handleUpdateSpeaker = (id: string, field: keyof Speaker, value: any) => {
    setSpeakers(
      speakers.map((speaker) =>
        speaker.id === id
          ? { ...speaker, [field]: value }
          : speaker
      )
    )
  }

  const handleFileChange = (speakerId: string, file: File | null) => {
    setSpeakers((prev) =>
      prev.map((speaker) => {
        if (speaker.id !== speakerId) return speaker
  
        // Revoke old preview URL if exists
        if (speaker.imageUrl) URL.revokeObjectURL(speaker.imageUrl)
  
        return {
          ...speaker,
          file: file ?? undefined,
          imageUrl: file ? URL.createObjectURL(file) : undefined,
        }
      })
    )
  }
  const resetForm = () => {
    setSpeakers([
      {
        id: "1",
        name: "",
        title: "",
        file: undefined,
        imageUrl: undefined,
      },
    ])
    setErrors([])
  }
  

  const handleSave = () => {
    const validationErrors = validateSpeakers(speakers)
  
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }
  
    setErrors([])
    onSave({ speakers })
    
  }

  return (
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) resetForm()
          onOpenChange(isOpen)
        }}
      >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between pr-8">
          <DialogTitle className="text-2xl font-semibold">Speakers</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <Button
            variant="ghost"
            className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
            onClick={handleAddSpeaker}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Speaker
          </Button>

          <div className="space-y-6">
            {speakers.map((speaker) => (
              <div key={speaker.id} className="bg-gray-50 rounded-lg p-6 relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute top-4 right-4">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleRemoveSpeaker(speaker.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Speaker
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-32">
                  <FileUpload
                    file={speaker.file ?? null}
                    onFileChange={(file) => handleFileChange(speaker.id, file)}
                    accept="image/*"
                    height="h-32"
                    title=""
                    description="Upload an image"
                  />
                   {getSpeakerError(speaker.id, "file") && (
                      <p className="mt-1 text-sm text-red-500">{getSpeakerError(speaker.id, "file")}</p>
                    )}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <Label htmlFor={`speaker-name-${speaker.id}`} className="text-base font-semibold">
                        Speaker Name
                      </Label>
                      <Input
                        id={`speaker-name-${speaker.id}`}
                        value={speaker.name}
                        onChange={(e) => handleUpdateSpeaker(speaker.id, "name", e.target.value)}
                        placeholder="Enter Name"
                        className="mt-2"
                      />
                       {getSpeakerError(speaker.id, "name") && (
                        <p className="mt-1 text-sm text-red-500">{getSpeakerError(speaker.id, "name")}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`speaker-title-${speaker.id}`} className="text-base font-semibold">
                        Title
                      </Label>
                      <Input
                        id={`speaker-title-${speaker.id}`}
                        value={speaker.title}
                        onChange={(e) => handleUpdateSpeaker(speaker.id, "title", e.target.value)}
                        placeholder="AI Machine Learning"
                        className="mt-2"
                      />
                      {getSpeakerError(speaker.id, "title") && (
                        <p className="mt-1 text-sm text-red-500">{getSpeakerError(speaker.id, "title")}</p>
                      )}
                    </div>

                    {speaker.description !== undefined ? (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor={`speaker-description-${speaker.id}`} className="text-base font-semibold">
                            Description
                          </Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleUpdateSpeaker(speaker.id, "description", undefined)}
                          >
                            Remove
                          </Button>
                        </div>
                        <Textarea
                          id={`speaker-description-${speaker.id}`}
                          value={speaker.description ?? ""}
                          onChange={(e) => handleUpdateSpeaker(speaker.id, "description", e.target.value)}
                          placeholder="15+ years in Artificial Intelligence"
                          rows={3}
                        />
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                        onClick={() => handleUpdateSpeaker(speaker.id, "description", "")}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Add Description
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
        <Button
          variant="outline"
          onClick={() => {
            resetForm()
            onOpenChange(false)
          }}
        >
          Cancel
        </Button>

        <Button
          onClick={handleSave}
          className="bg-indigo-600 hover:bg-indigo-700 px-8"
        >
          Save
        </Button>
      </div>

      </DialogContent>
    </Dialog>
  )
}
