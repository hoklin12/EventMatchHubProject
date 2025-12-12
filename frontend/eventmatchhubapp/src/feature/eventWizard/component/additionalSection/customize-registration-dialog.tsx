"use client"

import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog"
import { validateQuestions } from "@/lib/utils/validation"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Checkbox } from "@/app/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Copy, Trash2, GripVertical, Plus } from "lucide-react"
import type {
  CustomQuestion,
  QuestionFieldType,
} from "@/lib/types/registration-form"


interface CustomizeRegistrationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (questions: CustomQuestion[]) => void
}

/** Field type options shown in the Select */
const fieldTypeOptions: { value: QuestionFieldType; label: string }[] = [
  { value: "short_answer", label: "Short answer" },
  { value: "paragraph", label: "Paragraph" },
  { value: "multiple_choice", label: "Multiple choice" },
  { value: "checkboxes", label: "Checkboxes" },
  { value: "dropdown", label: "Dropdown" },
]

/** Helper: whether a field type has options */
const hasOptions = (type: QuestionFieldType) =>
  ["multiple_choice", "checkboxes", "dropdown"].includes(type)

/** Small helper to create option id */
const makeOptionId = () => `opt_${crypto.randomUUID().slice(0, 8)}`

/** Small helper to create question id */
const makeQuestionId = () => `q_${crypto.randomUUID().slice(0, 8)}`

export const CustomizeRegistrationDialog: React.FC<CustomizeRegistrationDialogProps> =
  ({ open, onOpenChange, onSave }) => {
    const [questions, setQuestions] = useState<CustomQuestion[]>([
      {
        id: makeQuestionId(),
        type: "short_answer",
        label: "",
        required: true,
        enabled: true,
      },
      {
        id: makeQuestionId(),
        type: "multiple_choice",
        label: "",
        required: true,
        enabled: true,
        options: [
          { id: makeOptionId(), label: "" },
          { id: makeOptionId(), label: "" },
        ],
      },
    ])

    const updateQuestion = (id: string, patch: Partial<CustomQuestion>) => {
      setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)))
    }

    const deleteQuestion = (id: string) => {
      setQuestions((prev) => prev.filter((q) => q.id !== id))
    }

    const duplicateQuestion = (id: string) => {
      const q = questions.find((x) => x.id === id)
      if (!q) return
      const copy: CustomQuestion = {
        ...q,
        id: makeQuestionId(),
        options: q.options?.map((o) => ({ ...o, id: makeOptionId() })),
      }
      setQuestions((prev) => {
        const idx = prev.findIndex((x) => x.id === id)
        const next = [...prev]
        next.splice(idx + 1, 0, copy)
        return next
      })
    }

    // PREPEND new question so it appears under the Add button
    const addQuestion = (type: QuestionFieldType = "short_answer") => {
      const q: CustomQuestion = {
        id: makeQuestionId(),
        type,
        label: "",
        required: false,
        enabled: true,
        options: hasOptions(type)
          ? [
              { id: makeOptionId(), label: "" },
              { id: makeOptionId(), label: "" },
            ]
          : undefined,
      }
      setQuestions((prev) => [q, ...prev])
    }

    const addOption = (questionId: string) => {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? {
                ...q,
                options: [
                  ...(q.options || []),
                  { id: makeOptionId(), label: "" },
                ],
              }
            : q,
        ),
      )
    }
    

    const updateOption = (questionId: string, optionId: string, label: string) => {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionId
            ? { ...q, options: q.options?.map((o) => (o.id === optionId ? { ...o, label } : o)) }
            : q,
        ),
      )
    }

    const deleteOption = (questionId: string, optionId: string) => {
      setQuestions((prev) =>
        prev.map((q) => (q.id === questionId ? { ...q, options: q.options?.filter((o) => o.id !== optionId) } : q)),
      )
    }

    const [errors, setErrors] = useState<Record<string, string>>({})
    // controls when errors are shown. initially false -> no errors displayed
    const [showErrors, setShowErrors] = useState(false)

    // keep errors in sync (but we won't show them until showErrors = true)
    useEffect(() => {
      const e = validateQuestions(questions)
      setErrors(e)
    }, [questions])

    const getError = (questionId: string, optionId?: string) => {
      if (!showErrors) return null // don't show errors until user attempted save
      if (optionId) return errors[`${questionId}-${optionId}`] || null
      return errors[questionId] || null
    }

    // Save: show errors, and only actually save when no errors
    const handleSave = () => {
      setShowErrors(true) // enable showing errors
      const validationErrors = validateQuestions(questions)
      setErrors(validationErrors)

      if (Object.keys(validationErrors).length === 0) {
        onSave(questions)
        onOpenChange(false)
        setShowErrors(false) // reset for next open if you want
      }
    }
    const isValid = Object.keys(errors).length === 0

    const resetForm = () => {
      setQuestions([
        {
          id: makeQuestionId(),
          type: "short_answer",
          label: "",
          required: true,
          enabled: true,
        },
        {
          id: makeQuestionId(),
          type: "multiple_choice",
          label: "",
          required: true,
          enabled: true,
          options: [
            { id: makeOptionId(), label: "" },
            { id: makeOptionId(), label: "" },
          ],
        },
      ]);
      setShowErrors(false);
      setErrors({});
    };
    

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full h-full max-w-[1200px] h-[90vh] p-6 flex flex-col">
          <DialogHeader>
            <div className="mb-1">
              <DialogTitle className="text-xl font-semibold">Customize registration form</DialogTitle>
              <p className="text-sm text-gray-500">Add fields to collect more information from attendees.</p>
            </div>
          </DialogHeader>

          <div className="flex items-center gap-2 mt-3 mb-1">
            <Button
              variant="ghost"
              className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              onClick={() => addQuestion("short_answer")}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Question
            </Button>
          </div>

          {/* scrollable content area */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {questions.map((question) => (
              <div
                key={question.id}
                className="border border-gray-200 rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    <Label className="text-sm font-medium text-gray-700">Question</Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Select
                      value={question.type}
                      onValueChange={(v) => {
                        const newType = v as QuestionFieldType
                        if (hasOptions(newType) && !question.options) {
                          updateQuestion(question.id, {
                            type: newType,
                            options: [
                              { id: makeOptionId(), label: "" },
                              { id: makeOptionId(), label: "" },
                            ],
                          })
                        } else {
                          updateQuestion(question.id, { type: newType })
                        }
                      }}
                    >
                      <SelectTrigger className="w-[170px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {fieldTypeOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-2">
                  <Input
                    value={question.label}
                    onChange={(e) => updateQuestion(question.id, { label: e.target.value })}
                    placeholder="Question text"
                    className={`text-sm ${getError(question.id) ? "border-red-500" : ""}`}
                  />
                  {getError(question.id) && (
                    <p className="mt-1 text-sm text-red-500">{getError(question.id)}</p>
                  )}
                </div>

                <div className="mt-3">
                  {question.type === "paragraph" ? (
                    <textarea
                      className="w-full border border-gray-200 rounded-md p-3 text-sm h-28 resize-none"
                      placeholder="Long answer text"
                      value={question.answer || ""}
                      onChange={(e) => updateQuestion(question.id, { answer: e.target.value })}
                    />
                  ) : question.type === "short_answer" ? (
                    <Input
                      placeholder="Short answer text"
                      className="text-sm"
                      value={question.answer || ""}
                      onChange={(e) => updateQuestion(question.id, { answer: e.target.value })}
                    />
                  ) : null}
                </div>

                {hasOptions(question.type) && (
                  <div className="mt-4 pl-1 space-y-2">
                    {question.options?.map((opt) => (
                      <div key={opt.id} className="flex items-center gap-2">
                        <div className="shrink-0">
                          {question.type === "checkboxes" ? (
                            <div className="w-4 h-4 rounded-sm border border-gray-300" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                          )}
                        </div>

                        <Input
                          value={opt.label}
                          placeholder={`Option ${question.options?.indexOf(opt)! + 1}`}
                          onChange={(e) => updateOption(question.id, opt.id, e.target.value)}
                          className={`flex-1 text-sm ${getError(question.id, opt.id) ? "border-red-500" : ""}`}
                        />

                        {getError(question.id, opt.id) && (
                          <p className="mt-1 text-sm text-red-500">{getError(question.id, opt.id)}</p>
                        )}

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteOption(question.id, opt.id)}
                          className="text-gray-400 hover:text-gray-600"
                          aria-label="Remove option"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addOption(question.id)}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      + Add option or “Other”
                    </button>
                  </div>
                )}

                <div className="mt-4">
                  {question.description === undefined ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuestion(question.id, { description: "" })}
                      className="text-sm text-gray-600"
                    >
                      Add description
                    </Button>
                  ) : (
                    <Input
                      value={question.description}
                      onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
                      placeholder="Description"
                      className="text-sm"
                    />
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => duplicateQuestion(question.id)} aria-label="Duplicate">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteQuestion(question.id)} aria-label="Delete">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                  <Checkbox
                    checked={question.required}
                    onCheckedChange={(checked) =>
                      updateQuestion(question.id, { required: checked === true })
                    }
                    className="border border-gray-400 data-[state=checked]:border-indigo-600"
                  />
                    <Label htmlFor={`required-${question.id}`} className="text-sm text-gray-700">Required</Label>
                  </div>
                </div>
              </div>
            ))}

            <div className="h-24" />
          </div>

          {/* dialog actions */}
          <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              resetForm()
              onOpenChange(false)
            }}
          >
            Cancel
          </Button>

            {/* Save stays enabled; handleSave manages validation and actual save */}
            <Button
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
