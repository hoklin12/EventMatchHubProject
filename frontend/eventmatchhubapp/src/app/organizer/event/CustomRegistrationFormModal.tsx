


// components/CustomRegistrationFormModal.tsx
"use client";

import { useState } from "react";
import { X, GripVertical, Plus } from "lucide-react";

interface CustomField {
  id: string;
  question: string;
  type: "Short Answer" | "Paragraph" | "Multiple choice" | "Checkboxes" | "Dropdown";
  required: boolean;
  options?: string[];
}

interface CustomRegistrationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const answerTypes = ["Short Answer", "Paragraph", "Multiple choice", "Checkboxes", "Dropdown"] as const;

export default function CustomRegistrationFormModal({
  isOpen,
  onClose,
}: CustomRegistrationFormModalProps) {
  const [fields, setFields] = useState<CustomField[]>([
    {
      id: "1",
      question: "",
      type: "Short Answer",
      required: false,
    },
    {
      id: "2",
      question: "",
      type: "Multiple choice",
      required: false,
      options: ["Option 1", "Option 2", "Add option or add 'Other'"],
    },
  ]);

  const [selectedType, setSelectedType] = useState<CustomField["type"]>("Short Answer");

  const addNewField = () => {
    const newField: CustomField = {
      id: Date.now().toString(),
      question: "",
      type: selectedType,
      required: false,
      ...(selectedType !== "Short Answer" && selectedType !== "Paragraph"
        ? { options: ["Option 1"] }
        : {}),
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<CustomField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const addOption = (fieldId: string) => {
    setFields(
      fields.map((f) =>
        f.id === fieldId
          ? { ...f, options: [...(f.options || []), "New option"] }
          : f
      )
    );
  };

  const removeOption = (fieldId: string, index: number) => {
    setFields(
      fields.map((f) =>
        f.id === fieldId
          ? { ...f, options: f.options?.filter((_, i) => i !== index) }
          : f
      )
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-transparent bg-opacity-50 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-300">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Customize Registration Form
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Add custom fields to collect additional information from attendees
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <div className="p-8">
            <div className="space-y-8">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-200"
                >
                  <div className="flex gap-6">
                    {/* Drag Handle */}
                    <div className="mt-2">
                      <GripVertical className="w-6 h-6 text-gray-400" />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                      {/* Question & Type */}
                      <div className="flex items-center justify-between gap-6">
                        <input
                          type="text"
                          placeholder="Question"
                          value={field.question}
                          onChange={(e) =>
                            updateField(field.id, { question: e.target.value })
                          }
                          className="text-xl font-medium bg-transparent border-none outline-none flex-1 placeholder-gray-400"
                        />
                        <select
                          value={field.type}
                          onChange={(e) =>
                            updateField(field.id, {
                              type: e.target.value as CustomField["type"],
                              ...(e.target.value === "Short Answer" ||
                              e.target.value === "Paragraph"
                                ? { options: undefined }
                                : {}),
                            })
                          }
                          className="px-5 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {answerTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Choice Options */}
                      {(field.type === "Multiple choice" ||
                        field.type === "Checkboxes" ||
                        field.type === "Dropdown") && (
                        <div className="space-y-4">
                          {field.options?.map((option, i) => (
                            <div key={i} className="flex items-center gap-4">
                              {/* Indicator */}
                              {field.type === "Multiple choice" && (
                                <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex-shrink-0" />
                              )}
                              {field.type === "Checkboxes" && (
                                <div className="w-5 h-5 rounded border-2 border-gray-400 flex-shrink-0" />
                              )}
                              {field.type === "Dropdown" && (
                                <span className="text-gray-500 font-medium w-8 text-right">
                                  {i + 1}.
                                </span>
                              )}

                              <input
                                type="text"
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...(field.options || [])];
                                  newOptions[i] = e.target.value;
                                  updateField(field.id, { options: newOptions });
                                }}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                              <button
                                onClick={() => removeOption(field.id, i)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => addOption(field.id)}
                            className="text-blue-600 font-medium text-sm hover:text-blue-700 flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add option
                          </button>
                        </div>
                      )}

                      {/* Text Field Preview */}
                      {(field.type === "Short Answer" || field.type === "Paragraph") && (
                        <input
                          type="text"
                          disabled
                          placeholder={
                            field.type === "Short Answer"
                              ? "Short answer text"
                              : "Long answer text"
                          }
                          className="w-full px-4 py-4 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed"
                        />
                      )}

                      {/* Field Settings */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <div className="flex items-center gap-8">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) =>
                                updateField(field.id, { required: e.target.checked })
                              }
                              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              Required
                            </span>
                          </label>

                          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
                            <Plus className="w-4 h-4" />
                            Add Description
                          </button>
                        </div>

                        <button
                          onClick={() => removeField(field.id)}
                          className="text-red-600 font-medium text-sm hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Field */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-300">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="px-5 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {answerTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                <button
                  onClick={addNewField}
                  className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition shadow-md"
                >
                  Add Field
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-12 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}