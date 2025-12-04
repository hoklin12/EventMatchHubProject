"use client";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Separator } from "@/app/components/ui/separator";
import { MapPin, Edit, Mail, Phone } from "lucide-react";

export function ProfileCard() {
  const userProfile = {
    name: "Yun Jin",
    email: "yun.jin@besserafim.com",
    phone: "+1 (855) 123 435 6",
    location: "Phnom Penh, Cambodia",
    bio: "Passionate about technology and continuous learning. Always looking for opportunities to grow and connect with like-minded professionals.",
    avatar: "/professional-headshot.png",
    joinDate: "January 2024",
    eventsAttended: 12,
    certificatesEarned: 8,
    completionRate: 100,
  };

  return (
    <Card className="border-gray-200 shadow-md">
      <CardContent className="pt-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar Section */}
          <Avatar className="w-40 h-40 flex-shrink-0">
            <AvatarImage
              src={userProfile.avatar || "/placeholder.svg"}
              alt={userProfile.name}
            />
            <AvatarFallback className="text-2xl">YJ</AvatarFallback>
          </Avatar>

          {/* Profile Info Section */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{userProfile.name}</h1>
                <p className="text-foreground/70 max-w-lg">{userProfile.bio}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex-shrink-0 bg-transparent"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {userProfile.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {userProfile.phone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {userProfile.location}
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold">
                  {userProfile.eventsAttended}
                </div>
                <div className="text-sm text-foreground/70">
                  Events Attended
                </div>
              </div>
              <Separator orientation="vertical" className="h-14" />
              <div>
                <div className="text-3xl font-bold">
                  {userProfile.certificatesEarned}
                </div>
                <div className="text-sm text-foreground/70">
                  Certificates Earned
                </div>
              </div>
              <Separator orientation="vertical" className="h-14" />
              <div>
                <div className="text-3xl font-bold">
                  {userProfile.completionRate}%
                </div>
                <div className="text-sm text-foreground/70">
                  Completion Rates
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
