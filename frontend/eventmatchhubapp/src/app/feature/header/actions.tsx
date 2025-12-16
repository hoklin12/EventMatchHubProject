'use client'

import { Plus, Bell, Settings } from 'lucide-react'
import Link from 'next/link'
import useSWR from 'swr'
import { User as UserType } from '@/lib/types/event'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function HeaderActions() {
  const { data: user } = useSWR<UserType>('/api/user', fetcher)

  return (
    <div className="flex items-center gap-4">
      <Link href="/create-event" className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition">
        <Plus size={20} />
      </Link>
      <button className="p-2 text-muted-foreground hover:text-foreground transition">
        <Bell size={20} />
      </button>
      <button className="p-2 text-muted-foreground hover:text-foreground transition">
        <Settings size={20} />
      </button>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary overflow-hidden flex items-center justify-center text-primary-foreground font-bold text-sm">
        <span>{user?.avatar || 'U'}</span>
      </div>
    </div>
  )
}
