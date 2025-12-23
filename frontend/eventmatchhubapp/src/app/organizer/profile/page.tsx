"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { LayoutDashboard, CalendarDays, Award, Users, DollarSign, Calendar } from "lucide-react";
import { SiteHeader } from "@/app/components/site-header";
import { SiteFooter } from "@/app/components/site/site-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export default function OrganizerProfilePage() {
  const searchParams = useSearchParams();
  const tabFromQuery = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabFromQuery || "dashboard");

  // Dummy organizer data
  const organizer = {
    name: "Livita Touch",
    organization: "Cambodia Academy of Digital Technology (CADT)",
    avatar: "/api/placeholder/150/150", // Replace with real avatar later
    stats: {
      eventsCreated: 12,
      totalAttendees: 1248,
      revenue: 18420,
      certificatesIssued: 892,
    },
  };

  // Dummy upcoming events
  const upcomingEvents = [
    { id: 1, title: "AI & Machine Learning Summit 2025", date: "December 23, 2025", attendees: 312 },
    { id: 2, title: "Web Development Bootcamp", date: "January 15, 2026", attendees: 156 },
    { id: 3, title: "Digital Marketing Workshop", date: "February 10, 2026", attendees: 89 },
  ];

  // Dummy past events
  const pastEvents = [
    { id: 4, title: "React Advanced Patterns", date: "November 2025", attendees: 210, revenue: 8400 },
    { id: 5, title: "Cloud Computing Fundamentals", date: "October 2025", attendees: 180, revenue: 7200 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* Organizer Profile Header */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 h-32"></div>
            <CardContent className="relative pt-0 -mt-16 pb-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
                <Avatar className="h-32 w-32 ring-8 ring-white">
                  <AvatarImage src={organizer.avatar} />
                  <AvatarFallback className="text-4xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                    {organizer.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left flex-1">
                  <h1 className="text-3xl font-bold text-gray-900">{organizer.name}</h1>
                  <p className="text-lg text-gray-600 mt-1">{organizer.organization}</p>
                  <Badge className="mt-3" variant="secondary">Event Organizer</Badge>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                <div className="text-center">
                  <p className="text-4xl font-bold text-purple-600">{organizer.stats.eventsCreated}</p>
                  <p className="text-sm text-gray-600 mt-1">Events Created</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600">{organizer.stats.totalAttendees.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Attendees</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600">${organizer.stats.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-1">Revenue Generated</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-orange-600">{organizer.stats.certificatesIssued}</p>
                  <p className="text-sm text-gray-600 mt-1">Certificates Issued</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-3 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger
                value="dashboard"
                className="flex items-center justify-center gap-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow"
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="flex items-center justify-center gap-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow"
              >
                <CalendarDays className="w-5 h-5" />
                My Events
              </TabsTrigger>
              <TabsTrigger
                value="certificates"
                className="flex items-center justify-center gap-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow"
              >
                <Award className="w-5 h-5" />
                Certificates Issued
              </TabsTrigger>
            </TabsList>

            <div className="border-t border-gray-200" />

            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold">Overview</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Next event: AI & ML Summit 2025
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${organizer.stats.revenue.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        From all events
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{organizer.stats.totalAttendees.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Across all events
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                  <Card>
                    <CardContent className="pt-6">
                      <ul className="space-y-4">
                        <li className="flex justify-between text-sm">
                          <span>New registration for AI Summit</span>
                          <span className="text-muted-foreground">2 hours ago</span>
                        </li>
                        <li className="flex justify-between text-sm">
                          <span>Certificate issued to participant #892</span>
                          <span className="text-muted-foreground">5 hours ago</span>
                        </li>
                        <li className="flex justify-between text-sm">
                          <span>Payment received: $149</span>
                          <span className="text-muted-foreground">Yesterday</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* My Events Tab */}
            {activeTab === "events" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">My Events</h2>
                  <Button asChild>
                    <Link href="/organizer/event/create">Create New Event</Link>
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Upcoming Events */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Upcoming</h3>
                    <div className="space-y-4">
                      {upcomingEvents.map(event => (
                        <Card key={event.id}>
                          <CardContent className="pt-6">
                            <h4 className="font-semibold">{event.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                            <div className="flex items-center gap-2 mt-3">
                              <Users className="w-4 h-4" />
                              <span className="text-sm">{event.attendees} registered</span>
                            </div>
                            <div className="mt-4 flex gap-2">
                              <Button size="sm" variant="outline">Edit</Button>
                              <Button size="sm">View Details</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Past Events */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Past Events</h3>
                    <div className="space-y-4">
                      {pastEvents.map(event => (
                        <Card key={event.id}>
                          <CardContent className="pt-6">
                            <h4 className="font-semibold">{event.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{event.date}</p>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span className="text-sm">{event.attendees} attendees</span>
                              </div>
                              <span className="text-sm font-medium text-green-600">
                                ${event.revenue.toLocaleString()}
                              </span>
                            </div>
                            <Button size="sm" variant="outline" className="mt-4 w-full">
                              View Report
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Certificates Issued Tab */}
            {activeTab === "certificates" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold">Certificates Issued</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Certificates</CardTitle>
                    <CardDescription>
                      You have issued {organizer.stats.certificatesIssued} certificates across all events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Award className="w-24 h-24 text-purple-600 mx-auto mb-6" />
                      <p className="text-xl text-gray-600">
                        Certificate management coming soon
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        View, download, and revoke certificates from here
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </Tabs>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}