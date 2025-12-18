// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/app/components/ui/card";
// import { Label } from "@/app/components/ui/label";
// import { Switch } from "@/app/components/ui/switch";
// import { TabsContent } from "@/app/components/ui/tabs";

// export default function NotificationTab() {
//   return (
//     <TabsContent value="notifications" className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Email Notifications</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div className="space-y-0.5">
//               <Label>Event Reminders</Label>
//               <p className="text-sm text-muted-foreground">
//                 Get notified about upcoming events you`re registered for
//               </p>
//             </div>
//             <Switch defaultChecked />
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="space-y-0.5">
//               <Label>New Events</Label>
//               <p className="text-sm text-muted-foreground">
//                 Receive updates about new events in your interests
//               </p>
//             </div>
//             <Switch defaultChecked />
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="space-y-0.5">
//               <Label>Certificate Updates</Label>
//               <p className="text-sm text-muted-foreground">
//                 Get notified when new certificates are issued
//               </p>
//             </div>
//             <Switch defaultChecked />
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="space-y-0.5">
//               <Label>Marketing Emails</Label>
//               <p className="text-sm text-muted-foreground">
//                 Receive news, tips, and special offers
//               </p>
//             </div>
//             <Switch />
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Push Notifications</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div className="space-y-0.5">
//               <Label>Event Updates</Label>
//               <p className="text-sm text-muted-foreground">
//                 Changes to events you`re attending
//               </p>
//             </div>
//             <Switch defaultChecked />
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="space-y-0.5">
//               <Label>Messages</Label>
//               <p className="text-sm text-muted-foreground">
//                 New messages from organizers
//               </p>
//             </div>
//             <Switch defaultChecked />
//           </div>
//         </CardContent>
//       </Card>
//     </TabsContent>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch";
import { TabsContent } from "@/app/components/ui/tabs";

export default function NotificationTab() {
  const [preferences, setPreferences] = useState({
    eventReminders: true,
    newEvents: true,
    certificateUpdates: true,
    marketing: false,
    pushEventUpdates: true,
    pushMessages: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem("notificationPrefs");
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  const handleToggle = (key: keyof typeof preferences) => {
    const updated = { ...preferences, [key]: !preferences[key] };
    setPreferences(updated);
    localStorage.setItem("notificationPrefs", JSON.stringify(updated));
  };

  return (
    <TabsContent value="notifications" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Event Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about upcoming events you’re registered for
              </p>
            </div>
            <Switch
              checked={preferences.eventReminders}
              onCheckedChange={() => handleToggle("eventReminders")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New Events</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about new events in your interests
              </p>
            </div>
            <Switch
              checked={preferences.newEvents}
              onCheckedChange={() => handleToggle("newEvents")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Certificate Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when new certificates are issued
              </p>
            </div>
            <Switch
              checked={preferences.certificateUpdates}
              onCheckedChange={() => handleToggle("certificateUpdates")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive news, tips, and special offers
              </p>
            </div>
            <Switch
              checked={preferences.marketing}
              onCheckedChange={() => handleToggle("marketing")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Event Updates</Label>
              <p className="text-sm text-muted-foreground">
                Changes to events you’re attending
              </p>
            </div>
            <Switch
              checked={preferences.pushEventUpdates}
              onCheckedChange={() => handleToggle("pushEventUpdates")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Messages</Label>
              <p className="text-sm text-muted-foreground">
                New messages from organizers
              </p>
            </div>
            <Switch
              checked={preferences.pushMessages}
              onCheckedChange={() => handleToggle("pushMessages")}
            />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}