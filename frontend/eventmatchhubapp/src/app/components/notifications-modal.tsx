"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Bell, CheckCircle2, Calendar, Award, Sparkles } from "lucide-react";

// Dummy notification data matching your screenshot
const dummyNotifications = [
  {
    id: 1,
    type: "reminder",
    title: "Event Reminder",
    message: "Get notified about upcoming events you're registered for",
    icon: Calendar,
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    type: "new-event",
    title: "New Events",
    message: "Receive updates about new events in your interests",
    icon: Sparkles,
    time: "2 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "certificate",
    title: "Certificate Updates",
    message: "Get notified when new certificates are issued",
    icon: Award,
    time: "1 day ago",
    read: true,
  },
  {
    id: 4,
    type: "marketing",
    title: "Marketing Emails",
    message: "Receive news, tips, and special offers",
    icon: Bell,
    time: "3 days ago",
    read: true,
  },
  {
    id: 5,
    type: "push",
    title: "Event Updates",
    message: "Changes to events you're attending",
    icon: Calendar,
    time: "5 hours ago",
    read: false,
  },
  {
    id: 6,
    type: "message",
    title: "Messages",
    message: "New messages from organizers",
    icon: Bell,
    time: "Yesterday",
    read: false,
  },
];

interface NotificationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationsModal({ open, onOpenChange }: NotificationsModalProps) {
  const [notifications, setNotifications] = useState(dummyNotifications);

  // Load read status from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("notificationsRead");
    if (saved) {
      const readIds = JSON.parse(saved);
      setNotifications(prev => prev.map(n => ({
        ...n,
        read: readIds.includes(n.id)
      })));
    }
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    
    const readIds = notifications.filter(n => n.read || n.id === id).map(n => n.id);
    localStorage.setItem("notificationsRead", JSON.stringify(readIds));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    localStorage.setItem("notificationsRead", JSON.stringify(notifications.map(n => n.id)));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} New
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No notifications yet
            </p>
          ) : (
            notifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <div
                  key={notif.id}
                  className={`p-4 rounded-lg border transition-all ${
                    notif.read ? "bg-muted/50" : "bg-background border-primary/20 shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      notif.read ? "bg-muted" : "bg-primary/10"
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        notif.read ? "text-muted-foreground" : "text-primary"
                      }`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium ${notif.read ? "text-muted-foreground" : ""}`}>
                          {notif.title}
                        </h4>
                        {!notif.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2 text-xs"
                            onClick={() => markAsRead(notif.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                      <p className={`text-sm ${notif.read ? "text-muted-foreground" : "text-foreground"}`}>
                        {notif.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notif.time}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {unreadCount > 0 && (
          <div className="flex justify-center pt-4 border-t">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}