import { SiteHeader } from "@/app/components/site/site-header";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import NotificationTab from "@/app/participant/account-settings/notification-tab";
import ProfileTab from "@/app/participant/account-settings/profile-tab";
import { User, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background isolation-isolate">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8 overflow-visible relative z-0">
        {/* Header */}
        <div className="mb-8 pt-24">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger
              value="profile"
              className="flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center justify-center gap-2"
            >
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <ProfileTab />

          {/* Notifications Tab */}
          <NotificationTab />
        </Tabs>
      </main>
    </div>
  );
}
