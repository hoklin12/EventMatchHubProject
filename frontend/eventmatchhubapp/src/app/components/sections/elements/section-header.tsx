interface SectionHeaderProps {
  title: string
  description?: string
  className?: string
}

export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-12 ${className || ""}`}>
      <h2 className="text-3xl font-bold mb-3">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  )
}
