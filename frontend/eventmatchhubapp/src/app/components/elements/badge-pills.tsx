import { Badge } from "@/components/ui/badge"

interface BadgePillProps {
  icon?: React.ReactNode
  label: string
  count?: number
  variant?: "primary" | "secondary" | "accent"
  className?: string
}

export function BadgePill({ icon, label, count, variant = "secondary", className }: BadgePillProps) {
  const variantClasses = {
    primary: "bg-blue-100 text-blue-700",
    secondary: "bg-purple-100 text-purple-700",
    accent: "bg-pink-100 text-pink-700",
  }

  return (
    <Badge className={`${variantClasses[variant]} ${className || ""}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {label}
      {count !== undefined && <span className="ml-1 font-semibold">{count}</span>}
    </Badge>
  )
}
