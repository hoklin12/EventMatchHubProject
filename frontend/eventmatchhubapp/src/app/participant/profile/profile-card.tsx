"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Separator } from "@/app/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { MapPin, Edit, Mail, Phone, Briefcase, Camera } from "lucide-react";

export function ProfileCard() {
  const [userData, setUserData] = useState({
    name: "Guest User",
    email: "guest@example.com",
    phone: "+1 (555) 000-0000",
    location: "Not specified",
    bio: "Sign in to view and edit your profile.",
    avatar: "",
    role: "guest" as "participant" | "organizer" | "guest",
    joinDate: "N/A",
    eventsAttended: 0,
    certificatesEarned: 0,
    completionRate: 0,
    organization: "",
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    phone: "",
    location: "",
    avatar: "", // base64
  });

  const [avatarPreview, setAvatarPreview] = useState("");

  // Load user data from localStorage on mount
  useEffect(() => {
    const role = localStorage.getItem("userRole") as "participant" | "organizer" | null;
    const name = localStorage.getItem("userName") || "User";
    const avatar = localStorage.getItem("userAvatar") || "";
    const organization = localStorage.getItem("organizationName") || "";

    if (role && (role === "participant" || role === "organizer")) {
      setUserData({
        name,
        avatar,
        role,
        organization,
        email: role === "participant" ? "participant@example.com" : "organizer@example.com",
        phone: "+1 (555) 123-4567",
        location: "Phnom Penh, Cambodia",
        bio:
          role === "participant"
            ? "Passionate about learning and attending events. Building a strong portfolio of achievements."
            : `Organizer at ${organization}. Creating impactful events for the community.`,
        joinDate: "January 2024",
        eventsAttended: role === "participant" ? 12 : 0,
        certificatesEarned: role === "participant" ? 8 : 0,
        completionRate: role === "participant" ? 100 : 0,
      });
    }
  }, []);

  // Open edit modal and populate form
  const openEdit = () => {
    setEditForm({
      name: userData.name,
      bio: userData.bio,
      phone: userData.phone,
      location: userData.location,
      avatar: userData.avatar,
    });
    setAvatarPreview(userData.avatar);
    setIsEditOpen(true);
  };

  // Handle avatar upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAvatarPreview(base64);
        setEditForm((prev) => ({ ...prev, avatar: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes
  const handleSave = () => {
    // Update local state
    setUserData((prev) => ({
      ...prev,
      name: editForm.name,
      bio: editForm.bio,
      phone: editForm.phone,
      location: editForm.location,
      avatar: editForm.avatar,
    }));

    // Save to localStorage
    localStorage.setItem("userName", editForm.name);
    localStorage.setItem("userAvatar", editForm.avatar);

    setIsEditOpen(false);
  };

  const isLoggedIn = userData.role !== "guest";

  return (
    <>
      <Card className="border-gray-200 shadow-md">
        <CardContent className="pt-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <Avatar className="w-40 h-40 flex-shrink-0 ring-4 ring-purple-100">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
              <AvatarFallback className="text-3xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            {/* Profile Info */}
            <div className="flex-1 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                    {userData.name}
                    {userData.role === "organizer" && (
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                        <Briefcase className="w-4 h-4" />
                        Organizer
                      </span>
                    )}
                  </h1>
                  <p className="text-foreground/70 max-w-lg">{userData.bio}</p>
                </div>

                {isLoggedIn && (
                  <Button variant="outline" size="sm" onClick={openEdit}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-6 text-sm text-foreground/70">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-600" />
                  {userData.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-purple-600" />
                  {userData.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  {userData.location}
                </div>
              </div>

              {/* Participant Stats */}
              {userData.role === "participant" && (
                <>
                  <Separator />
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <div className="text-3xl font-bold text-purple-700">{userData.eventsAttended}</div>
                      <div className="text-sm text-foreground/70">Events Attended</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-indigo-700">{userData.certificatesEarned}</div>
                      <div className="text-sm text-foreground/70">Certificates Earned</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-600">{userData.completionRate}%</div>
                      <div className="text-sm text-foreground/70">Completion Rate</div>
                    </div>
                  </div>
                </>
              )}

              {/* Organizer Info */}
              {userData.role === "organizer" && userData.organization && (
                <>
                  <Separator />
                  <div className="pt-4">
                    <p className="text-sm text-foreground/70">
                      <strong>Organization:</strong> {userData.organization}
                    </p>
                    <p className="text-sm text-foreground/70 mt-1">
                      <strong>Member since:</strong> {userData.joinDate}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information. Changes are saved instantly.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={avatarPreview || userData.avatar} />
                  <AvatarFallback>{editForm.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition"
                >
                  <Camera className="w-5 h-5" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <p className="text-sm text-muted-foreground">Click the camera to change photo</p>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-indigo-600">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}