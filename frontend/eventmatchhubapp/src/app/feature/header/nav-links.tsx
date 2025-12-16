'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function HeaderNav() {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-8 flex-1">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
        <div className="text-2xl font-bold text-primary">📊</div>
        <span className="font-semibold text-foreground">EVENT MATCH HUB</span>
      </Link>

      {/* Navigation Links */}
      <nav className="flex gap-6">
        <Link 
          href="/" 
          className={`px-3 py-2 rounded-lg font-medium text-sm transition ${
            pathname === '/' 
              ? 'bg-accent bg-opacity-20 text-accent' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          ⚡ Overview
        </Link>
        <Link 
          href="/manage-events" 
          className={`px-3 py-2 rounded-lg font-medium text-sm transition ${
            pathname === '/manage-events' 
              ? 'bg-accent bg-opacity-20 text-accent' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Manage Events
        </Link>
        <Link 
          href="/profile" 
          className={`px-3 py-2 rounded-lg font-medium text-sm transition ${
            pathname === '/profile' 
              ? 'bg-accent bg-opacity-20 text-accent' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Profile
        </Link>
      </nav>
    </div>
  )
}
