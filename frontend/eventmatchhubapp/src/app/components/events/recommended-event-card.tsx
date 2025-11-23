/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Calendar, Users, TrendingUp } from "lucide-react"
import { Button } from "../ui/button"
import { Event } from "@/app/types"

interface RecommendedEventCardProps {
  event: Event
}

export function RecommendedEventCard({ event }: RecommendedEventCardProps) {
  return (
    <Card className="overflow-hidden border border-gray-200 rounded-lg">
      <div className="relative">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-48 object-cover"
        />

        {event.featured && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600">
            <TrendingUp className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
      </div>

      <CardHeader>
        <Badge variant="secondary">{event.category}</Badge>

        <CardTitle className="text-xl">{event.title}</CardTitle>

        <CardDescription className="space-y-2 pt-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4" />
            {event.date}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4" />
            {event.attendees} attendees
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button
          className="w-full"
          variant="outline"
          size="lg"
          asChild
        >
          <Link href={`/registration?event=${event.id}`}>Register Now</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
