export type CertificateType = "completion" | "appreciation"

export interface CertificateSettings {
  id: string
  type: CertificateType
  organizationName: string
  description: string
  issueDate: string
  organizerDirector: string
  templates: CertificateTemplate[]
}

export interface CertificateTemplate {
  id: string
  name: string
  enabled: boolean
}

export interface CertificateFormData {
  type: CertificateType
  organizationName: string
  description: string
  issueDate: string
  organizerDirector: string
}
