// components/AgendaModal.tsx
"use client";

import { X, Upload, FileText, Trash2 } from "lucide-react";
import { useState } from "react";

interface AgendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (file: File | null) => void; // Optional callback when saving
}

export default function AgendaModal({ 
  isOpen, 
  onClose, 
  onSave 
}: AgendaModalProps) {
  const [agendaFile, setAgendaFile] = useState<File | null>(null);
  const [agendaFileName, setAgendaFileName] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        setAgendaFile(file);
        setAgendaFileName(file.name);
      } else {
        alert("Please upload a PDF file only.");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        setAgendaFile(file);
        setAgendaFileName(file.name);
      } else {
        alert("Please select a PDF file only.");
      }
    }
  };

  const handleRemove = () => {
    setAgendaFile(null);
    setAgendaFileName(null);
  };

  const handleSave = () => {
    if (!agendaFile) {
      alert("Please upload a PDF file before saving.");
      return;
    }

    // Call the optional onSave callback (useful for parent component)
    if (onSave) {
      onSave(agendaFile);
    }

    // You can add actual upload logic here, e.g.:
    // uploadToServer(agendaFile);

    alert("Agenda PDF saved successfully!");
    onClose(); // Close modal after successful save
  };

  const handleClose = () => {
    // Optional: warn if there's an unsaved file
    if (agendaFile && !window.confirm("You have an unsaved agenda. Close anyway?")) {
      return;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      {/* Modal container */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-lg lg:max-w-4xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Agenda</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-gray-400 transition-colors"
          >
            {agendaFileName ? (
              <div className="flex flex-col items-center gap-4">
                <FileText className="w-16 h-16 text-blue-600" />
                <p className="text-lg font-medium text-gray-900">{agendaFileName}</p>
                <p className="text-sm text-gray-500">Agenda PDF ready to save</p>
                <button
                  onClick={handleRemove}
                  className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove File
                </button>
              </div>
            ) : (
              <>
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                <p className="text-xl font-medium text-gray-900 mb-3">
                  Drop PDF for agenda
                </p>
                <p className="text-sm text-gray-500 mb-6">or</p>
                <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium cursor-pointer transition-colors">
                  <Upload className="w-5 h-5" />
                  Choose a PDF File
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                </label>
              </>
            )}
          </div>
        </div>

        {/* Footer with Save button */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleSave}
            disabled={!agendaFile}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}