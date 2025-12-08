"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { SiteHeader } from "@/app/components/site/site-header";
import { SiteFooter } from "@/app/components/site/site-footer";
import { OverviewTab } from "./overview-tab";
import { UpcomingTab } from "./upcoming-tab";
import { getUpcomingEvents } from "@/lib/data/event-datas";

export default function ParticipantOverview() {
  const [activeTab, setActiveTab] = useState("overview");
  const upcoming = getUpcomingEvents();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

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
          {/* Overview Tab */}
          <OverviewTab
            upcomingEvents={upcoming.slice(0, 2)} // limit to 2 for overview
            setActiveTab={setActiveTab} // for "View All" button
          />

          {/* Upcoming Events Tab */}
          <UpcomingTab events={upcoming} />
        </Tabs>
      </div>
      <SiteFooter />
    </div>
  );
}
