"use client"

import React, { useState, useEffect } from "react"
import { FileUpload } from "@/app/components/shared/FileUpload"

interface EventThemeSectionProps {
  imageUrl: string
  onImageChange: (file: File | null) => void
}

export const EventThemeSection: React.FC<EventThemeSectionProps> = ({ imageUrl, onImageChange }) => {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(imageUrl || null)

  useEffect(() => {
    setPreviewUrl(file ? URL.createObjectURL(file) : imageUrl || null)
  }, [file, imageUrl])

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile)
    onImageChange(selectedFile)
  }

  return (
    <FileUpload
      file={file}
      onFileChange={handleFileChange}
      accept="image/*"
      title="Event Theme"
      description="Drag and drop or click to select"
      height="h-48"
    />
  )
}
