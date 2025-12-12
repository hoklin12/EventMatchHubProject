import Image from "next/image"
import { Card } from "@/components/ui/card"
import type { Speaker } from "@/lib/types/speaker"

interface FeatureSpeakersSectionProps {
  speakers: Speaker[]
}

export function FeatureSpeakersSection({ speakers }: FeatureSpeakersSectionProps) {
  if (speakers.length === 0) {
    return null
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Feature Speakers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker) => (
          <Card key={speaker.id} className="overflow-hidden">
            <div className="aspect-square relative bg-muted">
              {speaker.imageUrl && (
                <Image src={speaker.imageUrl || "/placeholder.svg"} alt={speaker.name} fill className="object-cover" />
              )}
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-semibold">{speaker.name}</h3>
              <p className="text-sm text-primary">{speaker.title}</p>
              {speaker.description && <p className="text-sm text-muted-foreground">{speaker.description}</p>}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
