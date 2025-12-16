import { Plus } from "lucide-react"

interface DayProps {
  day: number
  isCurrentMonth: boolean
  events: string[]
  isToday: boolean
  hasCreateButton: boolean
}

export function CalendarDay({ day, isCurrentMonth, events, isToday, hasCreateButton }: DayProps) {
  return (
    <div
      className={`
        min-h-32 p-3 rounded-lg border transition relative flex flex-col
        ${!isCurrentMonth ? "bg-muted/30 border-transparent" : "bg-background"}
        ${isToday ? "border-2 border-primary" : "border-muted/50"}
      `}
    >
      {/* Day number - larger text */}
      <span
        className={`text-base font-semibold block mb-2 ${
          !isCurrentMonth ? "text-muted-foreground" : isToday ? "text-primary" : "text-foreground"
        }`}
      >
        {day}
      </span>

      {/* Events */}
      <div className="space-y-1 flex-1">
        {events.map((event, idx) => (
          <div key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium truncate">
            {event}
          </div>
        ))}

        {hasCreateButton && (
          <button className="text-xs text-primary font-semibold flex items-center gap-1 mt-auto hover:text-primary/80 transition">
            <Plus size={16} />
            Create
          </button>
        )}
      </div>
    </div>
  )
}
