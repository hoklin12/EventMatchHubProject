"use client"

import type React from "react"
import { FileText, Award, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SectionCardProps {
  id: string
  title: string
  icon: string
  onAdd: (sectionId: string) => void
  added?: boolean 
}

const iconMap: Record<string, React.ReactNode> = {
  clipboard: <FileText className="w-6 h-6 text-gray-700" />,
  certificate: <Award className="w-6 h-6 text-gray-700" />,
  users: <Users className="w-6 h-6 text-gray-700" />,
  calendar: <Calendar className="w-6 h-6 text-gray-700" />,
}

export const SectionCard: React.FC<SectionCardProps> = ({ id, title, icon, onAdd, added }) => {
  return (
    <Card
      className="
        w-full
        flex !flex-row !gap-0
        items-center justify-between
        p-4
        border border-gray-200 rounded-lg
        shadow-sm
        hover:bg-gray-50 transition
      "
    >

      {/* Icon + Title */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          {iconMap[icon] || <FileText className="w-6 h-6 text-gray-500" />}
        </div>
        <h3 className="text-base font-medium text-gray-900">
          {title}
        </h3>
      </div>

      {/* Add Button */}
      <Button
        variant={added ? "default" : "outline"}
        size="sm"
        onClick={() => onAdd(id)}
        className={`px-5 py-2 font-medium rounded-md transition
          ${added 
            ? "bg-black text-white hover:bg-gray-800" 
            : "border border-gray-400 text-gray-700 hover:bg-gray-100"}`
        }
        > {added ? "View" : "Add"}
      </Button>
    </Card>
  )
}
