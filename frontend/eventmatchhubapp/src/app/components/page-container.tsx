interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return <div className={`min-h-screen bg-background ${className}`}>{children}</div>
}
