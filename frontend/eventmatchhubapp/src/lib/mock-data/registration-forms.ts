import type { CustomQuestion, AdditionalSection } from '../types/registration-form'

export const mockCustomQuestions: CustomQuestion[] = [
  {
    id: "q1",
    type: "short_answer",
    label: "Question",
    description: undefined,
    required: false,
    enabled: true,
  },
  {
    id: "q2",
    type: "multiple_choice",
    label: "Question",
    description: undefined,
    required: false,
    enabled: true,
    options: [
      { id: "opt1", label: "Option 1" },
      { id: "opt2", label: "Option 2" },
    ],
  },
]

export const additionalSections: AdditionalSection[] = [
  {
    id: "customize-registration",
    title: "Customize Registration Form",
    description: "",
    icon: "clipboard",
    enabled: false,
    route: "/event-module/additional-sections/customize-registration",
  },
  {
    id: "certificate-settings",
    title: "Certificate Settings",
    description: "",
    icon: "certificate",
    enabled: false,
  },
  {
    id: "speakers-hosts",
    title: "Speakers & Hosts",
    description: "",
    icon: "users",
    enabled: false,
  },
  {
    id: "agenda",
    title: "Agenda",
    description: "",
    icon: "calendar",
    enabled: false,
  },
]
