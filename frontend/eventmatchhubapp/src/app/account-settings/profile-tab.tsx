// "use client";
// import { useState, useRef } from "react";

// import { Button } from "@/app/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/app/components/ui/card";
// import { Input } from "@/app/components/ui/input";
// import { Label } from "@/app/components/ui/label";
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/app/components/ui/avatar";
// import { Upload } from "lucide-react";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/app/components/ui/select";

// import { SelectableSkills } from "./selectable-skills";
// import { TabsContent } from "@radix-ui/react-tabs";

// const ORGANIZATIONS = [
//   "CADT",
//   "RUPP",
//   "NUM",
//   "Institute of Technology",
//   "Paragon International University",
//   "Other",
// ];

// const SKILL_OPTIONS = [
//   "Communication",
//   "Teamwork",
//   "Leadership",
//   "Time management",
//   "Problem solving",
//   "Critical thinking",
//   "Adaptability",
//   "Creativity",
//   "Work ethic",
//   "Attention to detail",
//   "Emotional intelligence",
// ];

// export default function ProfileTab() {
//   const [organization, setOrganization] = useState("");
//   const [customOrg, setCustomOrg] = useState("");
//   const [skills, setSkills] = useState<string[]>([]);
//   const [fullName, setFullName] = useState("Yun Jin");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("+855 12 345 678");

//   // Profile photo state
//   const [photoPreview, setPhotoPreview] = useState(
//     "/professional-headshot.png"
//   );
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleFile = (file: File) => {
//     if (!file) return;

//     if (!["image/png", "image/jpeg", "image/gif"].includes(file.type)) {
//       alert("Only JPG, PNG or GIF allowed.");
//       return;
//     }
//     if (file.size > 2 * 1024 * 1024) {
//       alert("Max file size is 2MB.");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = () => setPhotoPreview(reader.result as string);
//     reader.readAsDataURL(file);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     handleFile(file);
//   };

//   const handleSave = () => {
//     const finalData = {
//       fullName,
//       email,
//       phone,
//       organization: organization === "Other" ? customOrg : organization,
//       skills,
//       photoPreview,
//     };

//     console.log("Saved Profile Data:", finalData);

//     alert("Profile saved! (Check console)");
//   };

//   return (
//     <TabsContent value="profile" className="overflow-visible">
//       <div className="space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Profile Information</CardTitle>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             {/* Photo Upload */}
//             <div
//               className="flex items-center gap-6 bg-muted/30 p-6 rounded-xl border border-transparent hover:border-primary/50 transition"
//               onDragOver={(e) => e.preventDefault()}
//               onDrop={handleDrop}
//             >
//               <Avatar className="h-24 w-24">
//                 <AvatarImage src={photoPreview} />
//                 <AvatarFallback>YJ</AvatarFallback>
//               </Avatar>

//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   ref={fileInputRef}
//                   onChange={(e) => handleFile(e.target.files?.[0] as File)}
//                 />

//                 <Button
//                   variant="outline"
//                   className="flex items-center gap-2"
//                   onClick={() => fileInputRef.current?.click()}
//                 >
//                   <Upload className="h-4 w-4" />
//                   Change Photo
//                 </Button>

//                 <p className="mt-2 text-sm text-muted-foreground">
//                   JPG, PNG or GIF. Max size 2MB.
//                 </p>
//               </div>
//             </div>

//             {/* Form Fields */}
//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="fullName">Full Name *</Label>
//                 <Input
//                   id="fullName"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email Address *</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={email}
//                   placeholder="name@example.com"
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Organization *</Label>

//                 <Select onValueChange={(v) => setOrganization(v)}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select organization" />
//                   </SelectTrigger>

//                   <SelectContent className="z-[9999]">
//                     {ORGANIZATIONS.map((org) => (
//                       <SelectItem key={org} value={org}>
//                         {org}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>

//                 {organization === "Other" && (
//                   <Input
//                     className="mt-2"
//                     placeholder="Enter organization name"
//                     value={customOrg}
//                     onChange={(e) => setCustomOrg(e.target.value)}
//                   />
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="phone">Phone Number *</Label>
//                 <Input
//                   id="phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//               </div>
//             </div>

//             {/* Skill Selection */}
//             <div className="space-y-2">
//               <Label>Skill *</Label>

//               <div className="border border-gray-300 rounded-md px-3 py-3 relative">
//                 <SelectableSkills
//                   availableSkills={SKILL_OPTIONS}
//                   selectedSkills={skills}
//                   onChange={setSkills}
//                 />
//               </div>
//             </div>

//             {/* Save Button */}
//             <Button className="relative z-0" onClick={handleSave}>
//               Save Changes
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     </TabsContent>
//   );
// }

"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
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
  const router = useRouter();

  const [organization, setOrganization] = useState("");
  const [customOrg, setCustomOrg] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [fullName, setFullName] = useState("Yun Jin");
  const [email, setEmail] = useState("yunjin@example.com");
  const [phone, setPhone] = useState("+855 12 345 678");

  // Profile photo state
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Get current user role
  const userRole = typeof window !== "undefined" 
    ? (localStorage.getItem("userRole") as "participant" | "organizer" | null) || "participant"
    : "participant";

  const handleFile = (file: File | null) => {
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/gif", "image/webp"].includes(file.type)) {
      alert("Only JPG, PNG, GIF, or WebP images are allowed.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      alert("Max file size is 3MB.");
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
    const profileData = {
      fullName,
      email,
      phone,
      organization: organization === "Other" ? customOrg : organization,
      skills,
      photoPreview,
      updatedAt: new Date().toISOString(),
    };

    // Save to localStorage
    localStorage.setItem("profileData", JSON.stringify(profileData));
    if (photoPreview) {
      localStorage.setItem("userAvatar", photoPreview);
    }
    localStorage.setItem("userName", fullName);

    console.log("Profile saved:", profileData);
    alert("Profile updated successfully!");

    // Redirect to correct profile page based on role
    if (userRole === "organizer") {
      router.push("/organizer/profile");
    } else {
      router.push("/participant/profile");
    }
  };

  return (
    <TabsContent value="profile" className="overflow-visible">
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Photo Upload Section */}
          <div
            className="flex flex-col sm:flex-row items-center gap-8 bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl border border-purple-200 mb-10"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <Avatar className="h-32 w-32 ring-8 ring-white shadow-2xl">
              <AvatarImage src={photoPreview || "/professional-headshot.png"} />
              <AvatarFallback className="text-4xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                {fullName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="text-center sm:text-left">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={(e) => handleFile(e.target.files?.[0] || null)}
              />

              <Button
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-5 w-5 mr-2" />
                Change Profile Photo
              </Button>

              <p className="mt-4 text-sm text-gray-600">
                JPG, PNG, GIF or WebP. Max size 3MB.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-base font-semibold">Full Name *</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="text-lg py-6"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="text-lg py-6"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base font-semibold">Organization / University *</Label>
              <Select onValueChange={(v) => setOrganization(v)}>
                <SelectTrigger className="text-lg py-6">
                  <SelectValue placeholder="Select your organization" />
                </SelectTrigger>
                <SelectContent>
                  {ORGANIZATIONS.map((org) => (
                    <SelectItem key={org} value={org}>
                      {org}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {organization === "Other" && (
                <Input
                  className="mt-4 text-lg py-6"
                  placeholder="Enter your organization name"
                  value={customOrg}
                  onChange={(e) => setCustomOrg(e.target.value)}
                />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-semibold">Phone Number *</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+855 12 345 678"
                className="text-lg py-6"
              />
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-10 space-y-4">
            <Label className="text-base font-semibold">Skills *</Label>
            <p className="text-sm text-gray-600 mb-4">
              Select skills that best describe you
            </p>
            <div className="border-2 border-gray-300 rounded-xl p-6 bg-gray-50">
              <SelectableSkills
                availableSkills={SKILL_OPTIONS}
                selectedSkills={skills}
                onChange={setSkills}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-12 text-center">
            <Button
              size="lg"
              onClick={handleSave}
              className="px-16 py-8 text-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-2xl"
            >
              Save Changes & View Profile
            </Button>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}