"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Calendar, Award } from "lucide-react";
import { SiteHeader } from "@/app/components/site/site-header";
import { SiteFooter } from "@/app/components/site/site-footer";
import { ProfileCard } from "./profile-card";
import { RegisteredEvent } from "./registered-event";
import { CertificateSection } from "./certificate-section";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const tabFromQuery = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(tabFromQuery || "registrations");

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Profile Header Card */}
          <ProfileCard />

          {/* Tabs Section */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger
                value="registrations"
                className="flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                My Registrations
              </TabsTrigger>
              <TabsTrigger
                value="certificates"
                className="flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                My Certificates
              </TabsTrigger>
            </TabsList>
            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Registrations Tab */}
            <RegisteredEvent />

            {/* Certificates Tab */}
            <CertificateSection />
          </Tabs>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
