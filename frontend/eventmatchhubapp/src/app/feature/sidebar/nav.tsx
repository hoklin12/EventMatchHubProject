"use client"

import { Home, Calendar, Grid3x3, ReceiptIcon } from 'lucide-react'
import { NavItem } from './nav-item'
import { usePathname } from 'next/navigation'

const navLinks = [
  { icon: Home, href: "/organizer/general" },
  { icon: Calendar, href: "/organizer/event" },
  { icon: ReceiptIcon, href: "/organizer/receipts" },

]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-6">
      {navLinks.map((link) => (
        <NavItem
          key={link.href}
          icon={link.icon}
          href={link.href}
          // Active if pathname equals or starts with href
          isActive={
            link.href === '/'
              ? pathname === '/'
              : pathname === link.href || pathname.startsWith(link.href + '/')
          }
        />
      ))}
    </nav>
  )
}


