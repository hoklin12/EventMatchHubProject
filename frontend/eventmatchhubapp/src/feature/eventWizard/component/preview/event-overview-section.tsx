import { Badge } from "@/components/ui/badge"
import type { EventPreviewData } from "@/lib/types/event-preview"

interface EventOverviewSectionProps {
  event: EventPreviewData
}

export function EventOverviewSection({ event }: EventOverviewSectionProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <div className="text-muted-foreground whitespace-pre-line">{event.overview.description}</div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Event Category</h3>
        <div className="flex flex-wrap gap-2">
          {event.overview.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
