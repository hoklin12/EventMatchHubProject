"use client"

import { Filter, X } from "lucide-react"
import { Button } from "@/app/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu";

const CATEGORIES = ["Technology", "Business", "Marketing", "Design", "Finance"]

interface CategoryFilterProps {
  value: string | null
  onChange: (value: string | null) => void
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 h-12">
            <Filter className="h-4 w-4 " />
            Category
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onChange(null)}>All Categories</DropdownMenuItem>
          {CATEGORIES.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => onChange(category)}
              className={value === category ? "bg-primary/10" : ""}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {value && (
        <Button variant="ghost" size="sm" onClick={() => onChange(null)} className="h-8 w-8 p-0">
          <X className="h-4 w-4 " />
        </Button>
      )}
    </div>
  )
}
