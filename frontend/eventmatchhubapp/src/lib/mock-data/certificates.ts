import type { CertificateTemplate } from "@/lib/types/certificate"

export const defaultCertificateTemplates: CertificateTemplate[] = [
  {
    id: "template-1",
    name: "Classic Certificate",
    enabled: true,
  },
  {
    id: "template-2",
    name: "Modern Certificate",
    enabled: false,
  },
  {
    id: "template-3",
    name: "Elegant Certificate",
    enabled: false,
  },
]
