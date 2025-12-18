'use client'

import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'

interface QuickStartCardProps {
  href: string
  icon: LucideIcon
  title: string
  description: string
  primaryColor: 'primary' | 'secondary'
}

export function QuickStartCard({ 
  href, 
  icon: Icon, 
  title, 
  description, 
  primaryColor 
}: QuickStartCardProps) {
  const accentClass = primaryColor === 'primary' ? 'primary text-accent' : 'primary text-secondary'

  return (
    <Link href={href} className="bg-primary/5 border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:shadow-lg hover:border-primary/50 transition cursor-pointer">
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4">
        <Icon size={32} className="text-primary" />
      </div>
      <h3 className="font-display font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Link>
  )
}
