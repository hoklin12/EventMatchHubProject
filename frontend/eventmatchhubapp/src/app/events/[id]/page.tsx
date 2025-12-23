"use client";

import { useParams } from "next/navigation";
import { SiteHeader } from "@/app/components/site-header";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Calendar, MapPin, Users, Clock, Star, Share2, Heart, CheckCircle2, Award, Globe, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { allEvents } from "@/lib/data/event-datas";
import { Event } from "@/app/types";

export default function EventDetailsPage() {
  const params = useParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const eventId = parseInt(idParam!, 10);
  const event: Event | undefined = allEvents.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Event not found</h1>
            <p className="text-muted-foreground mb-6">The event you&apos;re looking for doesn&apos;t exist.</p>
            <Button asChild>
              <Link href="/events">Back to Events</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Optional: compute daysUntil
  const today = new Date();
  const eventDate = new Date(event.date);
  const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="relative mb-6 aspect-video overflow-hidden rounded-lg">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              {event.featured && (
                <Badge className="absolute left-4 top-4 bg-gradient-to-r from-indigo-600 to-purple-600">
                  <Star className="mr-1 h-3 w-3" />
                  Featured Event
                </Badge>
              )}
            </div>

            {/* Event Header */}
            <div className="mb-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {event.category && (
                  <Badge variant="secondary" className="text-sm">
                    {event.category}
                  </Badge>
                )}
                {event.tags?.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance">{event.title}</h1>

              {/* Organizer Info */}
              {event.organizer && (
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={event.organizer.logo || "/placeholder.svg"} />
                    <AvatarFallback>TI</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{event.organizer.name}</span>
                      {event.organizer.verified && <CheckCircle2 className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {event.organizer.rating}
                      </span>
                      <span>•</span>
                      <span>{event.organizer.eventsHosted} events hosted</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="speakers">Speakers</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({event.reviews ?? 0})</TabsTrigger>
              </TabsList>

              {/* About */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Event</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{event.description}</p>

                    <Separator />

                    <div>
                      <h3 className="mb-3 font-semibold">Event Highlights</h3>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {event.highlights?.map((highlight) => (
                          <div key={highlight} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Schedule */}
              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {event.schedule?.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex w-24 shrink-0 items-center gap-2 text-sm font-medium">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            {item.time}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Speakers */}
              <TabsContent value="speakers">
                <Card>
                  <CardHeader>
                    <CardTitle>Featured Speakers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2">
                      {event.speakers?.map((speaker) => (
                        <div key={speaker.name} className="flex gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={speaker.image || "/placeholder.svg"} />
                            <AvatarFallback>
                              {speaker.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{speaker.name}</p>
                            <p className="text-sm text-muted-foreground">{speaker.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews */}
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Reviews will be available after the event.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {/* Price */}
                <div className="mb-6">
                  <div className="mb-2 text-3xl font-bold">${event.price ?? 0}</div>
                  <p className="text-sm text-muted-foreground">per attendee</p>
                </div>

                {/* CTA Buttons */}
                <div className="mb-6 space-y-2">
                  <Button className="w-full" size="lg" asChild>
                    <Link href={`/events/${event.id}/register`}>Register Now</Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                      <Heart className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Event Details */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                  </div>

                  {event.attendees && event.maxAttendees && (
                    <div className="flex items-start gap-3">
                      <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Attendees</p>
                        <p className="text-sm text-muted-foreground">
                          {event.attendees} / {event.maxAttendees} registered
                        </p>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                            style={{
                              width: `${(event.attendees / event.maxAttendees) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Award className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Certificate</p>
                      <p className="text-sm text-muted-foreground">Verified certificate included</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Contact Organizer */}
                <div>
                  <h3 className="mb-3 font-semibold">Contact Organizer</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <Link href="/messages">
                        <Mail className="mr-2 h-4 w-4" />
                        Send Message
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Globe className="mr-2 h-4 w-4" />
                      Visit Website
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
