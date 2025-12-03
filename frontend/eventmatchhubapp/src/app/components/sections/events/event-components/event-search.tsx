"use client"

import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Search } from 'lucide-react'

interface EventSearchProps {
  onSearch?: (query: string) => void
}

export function EventSearch({ onSearch }: EventSearchProps) {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search events, locations, or keywords..."
          className="pl-10"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
      {/* <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Search</Button> */}
      <Button className="bg-black">Search</Button>
    </div>
  )
}
