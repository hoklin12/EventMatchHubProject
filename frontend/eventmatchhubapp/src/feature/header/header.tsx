'use client'

import { HeaderNav } from './nav-links'
import { HeaderActions } from './actions'

export function Header() {
  return (
    <header className="border-b border-border bg-background px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <HeaderNav />
        <HeaderActions />
      </div>
    </header>
  )
}
