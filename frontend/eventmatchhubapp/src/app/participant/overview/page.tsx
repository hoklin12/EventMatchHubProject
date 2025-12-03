"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { SiteHeader } from "@/app/components/site/site-header";
import { SiteFooter } from "@/app/components/site/site-footer";
import { OverviewTab } from "./overview-tab";
import { UpcomingTab } from "./upcoming-tab";

export default function ParticipantOverview() {
  const [activeTab, setActiveTab] = useState("overview");
  const upcomingEvents = [
    {
      id: 1,
      title: "AI & Machine Learning Summit 2025",
      date: "Mar 15, 2025",
      time: "9:00 AM",
      location: "San Francisco, CA",
      image: "/ai-conference.png",
      daysUntil: 14,
      tags: ["AI", "ML"],
    },
    {
      id: 2,
      title: "Digital Marketing Masterclass",
      date: "Mar 22, 2025",
      time: "2:00 PM",
      location: "Online",
      image: "/digital_mkt.png",
      daysUntil: 21,
      tags: ["Marketing", "Digital"],
    },
    {
      id: 3,
      title: "Contemporary Art Exhibition",
      date: "Apr 5, 2025",
      time: "10:00 AM",
      location: "New York, NY",
      image: "/art-exhibition.png",
      daysUntil: 30,
      tags: ["Art", "Culture"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader  />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">
            Here`s what`s happening with your events
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          </TabsList>

          {/* Certificates Tab
          <TabsContent value="certificates" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <Card key={cert.id} className="overflow-hidden">
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white text-center">
                    <Award className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{cert.title}</h3>
                    <p className="text-blue-100">Certificate of Completion</p>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Issued by</span>
                        <span className="font-medium">{cert.issuer}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">{cert.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent> */}
          {/* Overview Tab */}
          <OverviewTab
            upcomingEvents={upcomingEvents.slice(0, 2)} // limit to 2 for overview
            setActiveTab={setActiveTab} // for "View All" button
          />

          {/* Upcoming Events Tab */}
          <UpcomingTab events={upcomingEvents} />
        </Tabs>
      </div>
      <SiteFooter />
    </div>
  );
}
