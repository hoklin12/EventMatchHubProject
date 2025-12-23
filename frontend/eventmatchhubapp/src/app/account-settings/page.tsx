
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui/tabs";
import { User, Bell } from "lucide-react";
import ProfileTab from "./profile-tab";
import NotificationTab from "./notification-tab";
import { SiteHeader } from "../components/site-header";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background isolation-isolate">
      <SiteHeader />

      <main className="container mx-auto px-4 py-8 overflow-visible relative z-0">
        <div className="mb-8 pt-24">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}