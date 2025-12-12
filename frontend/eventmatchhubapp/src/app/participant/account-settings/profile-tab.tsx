"use client";
import { useState, useRef } from "react";

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Upload } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";

import { SelectableSkills } from "./selectable-skills";
import { TabsContent } from "@radix-ui/react-tabs";

const ORGANIZATIONS = [
  "CADT",
  "RUPP",
  "NUM",
  "Institute of Technology",
  "Paragon International University",
  "Other",
];

const SKILL_OPTIONS = [
  "Communication",
  "Teamwork",
  "Leadership",
  "Time management",
  "Problem solving",
  "Critical thinking",
  "Adaptability",
  "Creativity",
  "Work ethic",
  "Attention to detail",
  "Emotional intelligence",
];

export default function ProfileTab() {
  const [organization, setOrganization] = useState("");
  const [customOrg, setCustomOrg] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [fullName, setFullName] = useState("Yun Jin");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+855 12 345 678");

  // Profile photo state
  const [photoPreview, setPhotoPreview] = useState(
    "/professional-headshot.png"
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file: File) => {
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/gif"].includes(file.type)) {
      alert("Only JPG, PNG or GIF allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Max file size is 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleSave = () => {
    const finalData = {
      fullName,
      email,
      phone,
      organization: organization === "Other" ? customOrg : organization,
      skills,
      photoPreview,
    };

    console.log("Saved Profile Data:", finalData);

    alert("Profile saved! (Check console)");
  };

  return (
    <TabsContent value="profile" className="overflow-visible">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Photo Upload */}
            <div
              className="flex items-center gap-6 bg-muted/30 p-6 rounded-xl border border-transparent hover:border-primary/50 transition"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <Avatar className="h-24 w-24">
                <AvatarImage src={photoPreview} />
                <AvatarFallback>YJ</AvatarFallback>
              </Avatar>

              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => handleFile(e.target.files?.[0] as File)}
                />

                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                  Change Photo
                </Button>

                <p className="mt-2 text-sm text-muted-foreground">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Organization *</Label>

                <Select onValueChange={(v) => setOrganization(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization" />
                  </SelectTrigger>

                  <SelectContent className="z-[9999]">
                    {ORGANIZATIONS.map((org) => (
                      <SelectItem key={org} value={org}>
                        {org}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {organization === "Other" && (
                  <Input
                    className="mt-2"
                    placeholder="Enter organization name"
                    value={customOrg}
                    onChange={(e) => setCustomOrg(e.target.value)}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            {/* Skill Selection */}
            <div className="space-y-2">
              <Label>Skill *</Label>

              <div className="border border-gray-300 rounded-md px-3 py-3 relative">
                <SelectableSkills
                  availableSkills={SKILL_OPTIONS}
                  selectedSkills={skills}
                  onChange={setSkills}
                />
              </div>
            </div>

            {/* Save Button */}
            <Button className="relative z-0" onClick={handleSave}>
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
