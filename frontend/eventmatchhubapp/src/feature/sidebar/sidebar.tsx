'use client'

import { SidebarNav } from './nav'

export function Sidebar() {
  return (
    <aside className="w-16 flex flex-col items-center py-6 gap-8 border-r border-border">
      <SidebarNav />
    </aside>
  )
}
