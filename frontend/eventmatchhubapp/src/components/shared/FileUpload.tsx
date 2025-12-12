"use client"

import React, { useState, useRef, useEffect } from "react"
import { Upload, Trash2, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  file: File | null
  onFileChange: (file: File | null) => void
  accept?: string
  height?: string
  title?: string
  description?: string
}

export const FileUpload: React.FC<FileUploadProps> = ({
  file,
  onFileChange,
  accept = "image/*,application/pdf",
  height = "h-48",
  title = "Upload File",
  description = "Drag and drop or click to select",
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => setPreviewUrl(e.target?.result as string)
        reader.readAsDataURL(file)
      } else if (file.type === "application/pdf") {
        setPreviewUrl(URL.createObjectURL(file))
      }
    } else {
      setPreviewUrl(null)
    }

    return () => {
      if (previewUrl && file?.type === "application/pdf") URL.revokeObjectURL(previewUrl)
    }
  }, [file])

  const handleFile = (selected: File | undefined) => {
    if (!selected) return

    if (!selected.type.startsWith("image/") && selected.type !== "application/pdf") {
      alert("Please upload an image or PDF file.")
      return
    }

    onFileChange(selected)

    if (inputRef.current) inputRef.current.value = "" // reset input for re-upload
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFileChange(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  const handleClick = () => inputRef.current?.click()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => handleFile(e.target.files?.[0])
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const isImage = file?.type.startsWith("image/")
  const isPdf = file?.type === "application/pdf"

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 KB"
    const kb = bytes / 1024
    return `${kb.toFixed(1)} KB`
  }

  const handleViewPdf = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (previewUrl) {
      window.open(previewUrl, "_blank") // Open PDF in new tab
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative rounded-lg overflow-hidden cursor-pointer transition-all border-2",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        )}
      >
        <input type="file" ref={inputRef} className="hidden" accept={accept} onChange={handleChange} />

        {file ? (
          <div className={`relative ${height}`}>
            {/* Image Preview */}
            {isImage && previewUrl && (
              <img src={previewUrl} alt="Uploaded file" className="w-full h-full object-cover" />
            )}

            {/* PDF Card */}
            {isPdf && previewUrl && (
              <div className={`relative ${height} flex items-center justify-center bg-gray-100 rounded`}>
                <div className="flex items-center gap-3 p-4">
                  <FileText className="w-8 h-8 text-indigo-600" />
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={handleViewPdf}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                    title="View PDF"
                  >
                    <FileText className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClick()
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400"
                    title="Upload New PDF"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700"
                    title="Delete PDF"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Overlay for images */}
            {isImage && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-40 gap-4">
                <Upload className="w-8 h-8 text-white" />
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={`${height} flex items-center justify-center bg-gray-100`}>
            <div className="text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">{title}</p>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
