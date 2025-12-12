export type QuestionFieldType = "short_answer" | "paragraph" | "multiple_choice" | "checkboxes" | "dropdown"

export interface QuestionOption {
  id: string
  label: string
}

export interface CustomQuestion {
  id: string
  type: QuestionFieldType
  label: string
  description?: string
  required: boolean
  enabled: boolean
  options?: QuestionOption[]
  answer?: string | string[] 
}


export interface RegistrationForm {
  id: string
  eventId: string
  questions: CustomQuestion[]
  createdAt: string
  updatedAt: string
}

export interface AdditionalSection {
  id: string
  title: string
  description: string
  icon: string
  enabled: boolean
  route?: string
}
