'use client'

import useSWR from 'swr'
import { User } from '@/lib/types/event'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function Greeting() {
  const { data: user } = useSWR<User>('/api/user', fetcher)

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-extrabold text-foreground mb-2">Hello, {user?.name || 'User'}</h1>
      <p className="text-muted-foreground">Manage and track all your events</p>
    </div>
  )
}
