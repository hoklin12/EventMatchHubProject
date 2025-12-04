/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { TabsContent } from "@/app/components/ui/tabs";
import {
  Award,
  Download,
  Share2,
  Sparkles,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { Event } from "@/app/types";
import { EventList } from "@/app/components/elements/event-list";

interface OverviewTabProps {
  upcomingEvents: Event[];
  setActiveTab: (value: string) => void;
}

export function OverviewTab({
  upcomingEvents,
  setActiveTab,
}: OverviewTabProps) {
  const certificates = [
    {
      id: 1,
      title: "Design Thinking Bootcamp",
      issuer: "Event Match Hub",
      date: "Feb 15, 2025",
      verified: true,
    },
    {
      id: 2,
      title: "Python Programming Workshop",
      issuer: "Event Match Hub",
      date: "Jan 20, 2025",
      verified: true,
    },
  ];

  const recommendedEvents = [
    {
      id: 3,
      title: "Web Development Bootcamp",
      category: "Technology",
      date: "Apr 5, 2025",
      attendees: 120,
      image: "/web-development-concept.png",
    },
    {
      id: 4,
      title: "UX Design Workshop",
      category: "Design",
      date: "Apr 12, 2025",
      attendees: 85,
      image: "/ux-design-workshop.png",
    },
  ];

  return (
    <TabsContent value="overview" className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Upcoming Events
                </CardTitle>
                <CardDescription className="pt-3">
                  Events you’re registered for
                </CardDescription>
              </div>
              <Button
                variant="outline"
                className="text-xs"
                onClick={() => setActiveTab("upcoming")}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <EventList events={upcomingEvents.slice(0, 2)} />
          </CardContent>
        </Card>

        {/* Recent Certificates */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Recent Certificates
                </CardTitle>
                <CardDescription className="pt-3">
                  Your latest achievements
                </CardDescription>
              </div>
              <Button variant="outline" asChild className="text-xs">
                <Link href="/participant/profile">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Award className="w-6 h-6 text-purple-600" />
                      {cert.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Issued by {cert.issuer}
                    </p>
                    <p className="text-xs text-muted-foreground">{cert.date}</p>
                  </div>
                  {cert.verified && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 flex items-center h-fit"
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                  >
                    <Download className="w-3 h-3 mr-2" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                  >
                    <Share2 className="w-3 h-3 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recommended Events */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" /> Recommended for
                You
              </CardTitle>
              <CardDescription className="pt-3">
                Based on your interests and past events
              </CardDescription>
            </div>
            <Button variant="outline" asChild className="text-xs">
              <Link href="/events">Browse All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendedEvents.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 space-y-3">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {event.category}
                    </Badge>
                    <h3 className="font-semibold">{event.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {event.date}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/events/${event.id}/register`}>Register Now</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
