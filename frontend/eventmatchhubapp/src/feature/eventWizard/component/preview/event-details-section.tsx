import type { EventPreviewData } from "@/lib/types/event-preview"

interface EventDetailsSectionProps {
  event: EventPreviewData
}

export function EventDetailsSection({ event }: EventDetailsSectionProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Event Format</h3>
        <p className="text-muted-foreground capitalize">{event.format.replace("-", " ")}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Refund Policy</h3>
        <div className="space-y-2">
          {event.refundPolicy.terms.map((term, index) => (
            <p key={index} className="text-muted-foreground text-sm">
              {term.description}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
