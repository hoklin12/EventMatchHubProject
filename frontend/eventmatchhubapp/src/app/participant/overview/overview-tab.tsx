/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import Image from "next/image";
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
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Event } from "@/app/types";
import { EventList } from "@/app/components/sections/elements/event-list";
import { certificates } from "@/lib/data/certificates";
import { useEffect, useState } from "react";

interface OverviewTabProps {
  upcomingEvents: Event[];
  setActiveTab: (value: string) => void;
}

export function OverviewTab({
  upcomingEvents,
  setActiveTab,
}: OverviewTabProps) {
  const [userName, setUserName] = useState("Participant");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName") || "Participant";
    setUserName(storedUserName);
  }, []);

  // Recommended events with local images
  const recommendedEvents = [
    {
      id: 1,
      title: "AI & Machine Learning Summit 2025",
      category: "Technology",
      date: "October 22, 2025",
      image: "/digital_mkt.png",
    },
    {
      id: 2,
      title: "Tech Summit 2025",
      category: "Technology",
      date: "October 22, 2025",
      image: "/web-development-concept.png",
    },
  ];

  // Certificate button handlers
  const handleCertDownload = async (title: string) => {
    const fileUrl =
      "https://vauvenyaixseqagokokz.supabase.co/storage/v1/object/public/certificate/generated/a1b2c3d4-e5f6-7890-abcd-ef1234567890/8fa18b42-d2d4-47d6-8bc7-25e648cabbc7.png";

    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${title.replace(/\s+/g, "_")}.png`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Certificate download error:", error);
      alert("Failed to download certificate");
    }
    alert(
      `Downloading certificate: "${title}"\n\nIn a real app, this would generate a PDF.`
    );
  };

  const callCertiticate: () => void = () => {
    useEffect(() => {
      const fetchProfile = async () => {
        // const res = await ();
        // setUserName(res.data);
      };
      fetchProfile();
    }, []);
  };

  const handleCertShare = async (title: string) => {
    const shareUrl = `${
      window.location.origin
    }/certificate/${encodeURIComponent(
      title.replace(/\s+/g, "-").toLowerCase()
    )}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `My Certificate: ${title}`,
          text: "Check out my achievement from Event Match Hub!",
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fall back to clipboard
      }
    }

    // Fallback: copy to clipboard
    navigator.clipboard.writeText(shareUrl);
    alert("Certificate link copied to clipboard!\n\n" + shareUrl);
  };

  return (
    <TabsContent value="overview" className="space-y-8">
      {/* Greeting */}
      {/* <div className="pb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {userName.split(" ")[0]}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your events
        </p>
      </div> */}

      {/* Main Grid: Upcoming + Certificates */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription className="pt-2">
                  Events you're registered for
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab("upcoming")}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.length > 0 ? (
              <EventList events={upcomingEvents.slice(0, 2)} />
            ) : (
              <p className="text-center text-gray-500 py-8">
                No upcoming events. Explore events to register!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Certificates */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Certificates</CardTitle>
                <CardDescription className="pt-2">
                  Your latest achievements
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/participant/profile">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {certificates.length > 0 ? (
              certificates.slice(0, 3).map((cert) => (
                <div
                  key={cert.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-600" />
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Issued by {cert.eventOrganizer} • {cert.issueDate}
                      </p>
                    </div>
                    {cert.verified && (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleCertDownload(cert.title)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleCertShare(cert.title)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                No certificates yet. Attend events to earn them!
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommended For You */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Recommended For You
              </CardTitle>
              <CardDescription className="pt-2">
                Personalized event suggestions based on your interests
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/events">Browse All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {recommendedEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <Badge variant="secondary">{event.category}</Badge>
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    size="sm"
                    asChild
                  >
                    <Link href={`/events/${event.id}/register`}>
                      Register Now
                    </Link>
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
