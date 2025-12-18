


// // "use client";

// // import type React from "react";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import Link from "next/link";
// // import { Button } from "../components/ui/button";
// // import { Input } from "../components/ui/input";
// // import { Label } from "../components/ui/label";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "../components/ui/card";
// // import {
// //   Tabs,
// //   TabsContent,
// //   TabsList,
// //   TabsTrigger,
// // } from "../components/ui/tabs";
// // import { Checkbox } from "../components/ui/checkbox";
// // import { Textarea } from "../components/ui/textarea";
// // import {
// //   Eye,
// //   EyeOff,
// //   Users,
// //   Briefcase,
// //   CheckCircle2,
// //   Upload,
// //   FileText,
// //   Building2,
// //   Globe,
// //   Shield,
// // } from "lucide-react";

// // export default function SignupPage() {
// //   const router = useRouter();
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [userType, setUserType] = useState<"participant" | "organizer">("participant");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [organizerStep, setOrganizerStep] = useState(1);
// //   const [error, setError] = useState("");

// //   const participantBenefits = [
// //     "Discover and register for events",
// //     "Get verified digital certificates",
// //     "Build your achievement portfolio",
// //     "Personalized event recommendations",
// //   ];

// //   const organizerBenefits = [
// //     "Create and manage unlimited events",
// //     "Track registrations and attendees",
// //     "Generate certificates automatically",
// //     "Access analytics and insights",
// //   ];

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     setError("");

// //     const formData = new FormData(e.currentTarget);

// //     const payload: any = {
// //       firstName: formData.get("firstName"),
// //       lastName: formData.get("lastName"),
// //       email: formData.get("email"),
// //       password: formData.get("password"),
// //       userType,
// //     };

// //     if (userType === "organizer") {
// //       payload.organization = formData.get("organization");
// //       payload.position = formData.get("position");
// //       payload.orgWebsite = formData.get("orgWebsite");
// //       payload.orgRegistration = formData.get("orgRegistration");
// //       payload.orgDescription = formData.get("orgDescription");
// //     }

// //     try {
// //       const res = await fetch("/api/auth/signup", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         throw new Error(data.message || "Signup failed");
// //       }

// //       // Success
// //       localStorage.setItem("userRole", userType);
// //       localStorage.setItem("userName", `${payload.firstName} ${payload.lastName}`);

// //       alert(
// //         userType === "organizer"
// //           ? "Application submitted! We'll review it within 1-2 days."
// //           : "Account created successfully!"
// //       );

// //       const routes = {
// //         participant: "/participant/overview",
// //         organizer: "/organizer/general", // or a "pending" page
// //       };
// //       router.push(routes[userType]);
// //     } catch (err: any) {
// //       setError(err.message);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
// //       <div className="absolute top-0 left-0 right-0 p-6">
// //         <div className="container mx-auto flex justify-end">
// //           <Button variant="outline" size="sm" asChild>
// //             <Link href="/">Back to Home</Link>
// //           </Button>
// //         </div>
// //       </div>

// //       <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 pt-20 pb-20 items-start">
// //         {/* Benefits Sidebar */}
// //         <div className="space-y-6 hidden md:block">
// //           <div>
// //             <h2 className="text-xl font-bold mb-2">Join Event Match Hub</h2>
// //             <p className="text-muted-foreground text-sm">
// //               Connect with opportunities and build your verified digital portfolio
// //             </p>
// //           </div>

// //           <Tabs value={userType} onValueChange={(v) => setUserType(v as any)}>
// //             <TabsList className="grid w-full grid-cols-2">
// //               <TabsTrigger value="participant">Participant</TabsTrigger>
// //               <TabsTrigger value="organizer">Organizer</TabsTrigger>
// //             </TabsList>

// //             <TabsContent value="participant" className="space-y-4 mt-6">
// //               <h3 className="font-semibold text-sm">As a Participant, you can:</h3>
// //               <ul className="space-y-3">
// //                 {participantBenefits.map((b, i) => (
// //                   <li key={i} className="flex items-start gap-3">
// //                     <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
// //                     <span className="text-sm">{b}</span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </TabsContent>

// //             <TabsContent value="organizer" className="space-y-4 mt-6">
// //               <h3 className="font-semibold text-sm">As an Organizer, you can:</h3>
// //               <ul className="space-y-3">
// //                 {organizerBenefits.map((b, i) => (
// //                   <li key={i} className="flex items-start gap-3">
// //                     <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
// //                     <span className="text-sm">{b}</span>
// //                   </li>
// //                 ))}
// //               </ul>
// //               <Card className="bg-blue-50 border-blue-200">
// //                 <CardContent className="p-4">
// //                   <div className="flex gap-3">
// //                     <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
// //                     <div>
// //                       <p className="font-semibold text-sm text-blue-900">Verification Required</p>
// //                       <p className="text-xs text-blue-700">
// //                         All organizers are verified to ensure trust and quality.
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>
// //           </Tabs>
// //         </div>

// //         {/* Signup Form Card */}
// //         <Card className="shadow-xl">
// //           <CardHeader>
// //             <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
// //             <CardDescription>
// //               {userType === "organizer" && organizerStep === 2
// //                 ? "Verify your organization"
// //                 : "Get started with Event Match Hub today"}
// //             </CardDescription>
// //           </CardHeader>

// //           <CardContent>
// //             {/* Mobile Tabs */}
// //             <div className="md:hidden mb-6">
// //               <Tabs value={userType} onValueChange={(v) => setUserType(v as any)}>
// //                 <TabsList className="grid w-full grid-cols-2">
// //                   <TabsTrigger value="participant" className="flex items-center gap-2">
// //                     <Users className="w-4 h-4" /> Participant
// //                   </TabsTrigger>
// //                   <TabsTrigger value="organizer" className="flex items-center gap-2">
// //                     <Briefcase className="w-4 h-4" /> Organizer
// //                   </TabsTrigger>
// //                 </TabsList>
// //               </Tabs>
// //             </div>

// //             <form onSubmit={handleSubmit} className="space-y-6">
// //               {error && <p className="text-red-600 text-sm text-center">{error}</p>}

// //               {/* Step 1: Basic Info */}
// //               {(userType === "participant" || organizerStep === 1) && (
// //                 <>
// //                   <div className="grid grid-cols-2 gap-4">
// //                     <div className="space-y-2">
// //                       <Label htmlFor="firstName">First Name</Label>
// //                       <Input name="firstName" placeholder="John" required />
// //                     </div>
// //                     <div className="space-y-2">
// //                       <Label htmlFor="lastName">Last Name</Label>
// //                       <Input name="lastName" placeholder="Doe" required />
// //                     </div>
// //                   </div>

// //                   <div className="space-y-2">
// //                     <Label htmlFor="email">Email</Label>
// //                     <Input name="email" type="email" placeholder="you@example.com" required />
// //                   </div>

// //                   {userType === "organizer" && (
// //                     <>
// //                       <div className="space-y-2">
// //                         <Label htmlFor="organization">Organization Name</Label>
// //                         <Input name="organization" placeholder="ABC Corp" required />
// //                       </div>
// //                       <div className="space-y-2">
// //                         <Label htmlFor="position">Your Position</Label>
// //                         <Input name="position" placeholder="Event Manager" required />
// //                       </div>
// //                     </>
// //                   )}

// //                   <div className="space-y-2">
// //                     <Label htmlFor="password">Password</Label>
// //                     <div className="relative">
// //                       <Input
// //                         name="password"
// //                         type={showPassword ? "text" : "password"}
// //                         required
// //                       />
// //                       <button
// //                         type="button"
// //                         onClick={() => setShowPassword(!showPassword)}
// //                         className="absolute right-3 top-1/2 -translate-y-1/2"
// //                       >
// //                         {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                       </button>
// //                     </div>
// //                   </div>

// //                   <div className="space-y-2">
// //                     <Label htmlFor="confirmPassword">Confirm Password</Label>
// //                     <div className="relative">
// //                       <Input
// //                         name="confirmPassword"
// //                         type={showConfirmPassword ? "text" : "password"}
// //                         required
// //                       />
// //                       <button
// //                         type="button"
// //                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                         className="absolute right-3 top-1/2 -translate-y-1/2"
// //                       >
// //                         {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                       </button>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-start space-x-2">
// //                     <Checkbox id="terms" required />
// //                     <label htmlFor="terms" className="text-sm">
// //                       I agree to the <Link href="/terms" className="text-blue-600 underline">Terms</Link> and{" "}
// //                       <Link href="/privacy" className="text-blue-600 underline">Privacy Policy</Link>
// //                     </label>
// //                   </div>

// //                   {userType === "organizer" ? (
// //                     <Button
// //                       type="button"
// //                       onClick={() => setOrganizerStep(2)}
// //                       className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
// //                       size="lg"
// //                     >
// //                       Next: Verify Organization
// //                     </Button>
// //                   ) : (
// //                     <Button
// //                       type="submit"
// //                       className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
// //                       size="lg"
// //                       disabled={isLoading}
// //                     >
// //                       {isLoading ? "Creating..." : "Create Participant Account"}
// //                     </Button>
// //                   )}
// //                 </>
// //               )}

// //               {/* Step 2: Organizer Verification */}
// //               {userType === "organizer" && organizerStep === 2 && (
// //                 <>
// //                   <div className="space-y-4">
// //                     <div className="bg-blue-50 p-4 rounded-lg">
// //                       <div className="flex gap-3">
// //                         <Shield className="w-5 h-5 text-blue-600" />
// //                         <p className="text-xs text-blue-800">
// //                           Verification typically takes 1-2 business days.
// //                         </p>
// //                       </div>
// //                     </div>

// //                     <div className="space-y-2">
// //                       <Label htmlFor="orgWebsite">Organization Website</Label>
// //                       <div className="relative">
// //                         <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// //                         <Input name="orgWebsite" type="url" className="pl-10" required />
// //                       </div>
// //                     </div>

// //                     <div className="space-y-2">
// //                       <Label htmlFor="orgRegistration">Registration Number</Label>
// //                       <div className="relative">
// //                         <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
// //                         <Input name="orgRegistration" className="pl-10" required />
// //                       </div>
// //                     </div>

// //                     <div className="space-y-2">
// //                       <Label htmlFor="orgDescription">Description</Label>
// //                       <Textarea name="orgDescription" rows={4} required />
// //                     </div>
// //                   </div>

// //                   <div className="flex gap-3">
// //                     <Button type="button" variant="outline" onClick={() => setOrganizerStep(1)} className="flex-1">
// //                       Back
// //                     </Button>
// //                     <Button
// //                       type="submit"
// //                       className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
// //                       disabled={isLoading}
// //                     >
// //                       {isLoading ? "Submitting..." : "Submit for Approval"}
// //                     </Button>
// //                   </div>
// //                 </>
// //               )}
// //             </form>
// //           </CardContent>

// //           <CardFooter>
// //             <div className="text-sm text-center w-full text-muted-foreground">
// //               Already have an account?{" "}
// //               <Link href="/login" className="text-blue-600 hover:underline font-medium">
// //                 Sign in
// //               </Link>
// //             </div>
// //           </CardFooter>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import type React from "react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Label } from "../components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/card";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "../components/ui/tabs";
// import { Checkbox } from "../components/ui/checkbox";
// import { Textarea } from "../components/ui/textarea";
// import {
//   Eye,
//   EyeOff,
//   Users,
//   Briefcase,
//   CheckCircle2,
//   Shield,
//   Globe,
//   Building2,
// } from "lucide-react";

// export default function SignupPage() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [userType, setUserType] = useState<"participant" | "organizer">("participant");
//   const [isLoading, setIsLoading] = useState(false);
//   const [organizerStep, setOrganizerStep] = useState(1);
//   const [error, setError] = useState("");

//   const participantBenefits = [
//     "Discover and register for events",
//     "Get verified digital certificates",
//     "Build your achievement portfolio",
//     "Personalized event recommendations",
//   ];

//   const organizerBenefits = [
//     "Create and manage unlimited events",
//     "Track registrations and attendees",
//     "Generate certificates automatically",
//     "Access analytics and insights",
//   ];

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     const formData = new FormData(e.currentTarget);

//     const password = formData.get("password") as string;
//     const confirmPassword = formData.get("confirmPassword") as string;

//     // Client-side password match validation
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       setIsLoading(false);
//       return;
//     }

//     const payload: any = {
//       full_name: `${formData.get("firstName")} ${formData.get("lastName")}`.trim(),
//       email: formData.get("email"),
//       password_hash: formData.get("password"),  // Send as password_hash
//       phone_number: "",  // Temporary empty string (or add real field later)
//       userType,  // Keep for your proxy routing
//     };

//    if (userType === "organizer") {
//       payload.organization_name = formData.get("organization");
//       payload.position = formData.get("position");
//       // Optional extra fields — backend ignores if not used
//       payload.org_website = formData.get("orgWebsite");
//       payload.org_registration = formData.get("orgRegistration");
//       payload.org_description = formData.get("orgDescription");
//     }

//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Signup failed");
//       }

//       // Success message
//       const successMessage =
//         userType === "organizer"
//           ? "Application submitted! We'll review it within 1-2 business days."
//           : "Account created successfully! Please sign in to continue.";

//       alert(successMessage);

//       // Redirect to login page with pre-filled email
//       const email = encodeURIComponent(payload.email as string);
//       router.push(`/login?email=${email}`);

//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
//       <div className="absolute top-0 left-0 right-0 p-6">
//         <div className="container mx-auto flex justify-end">
//           <Button variant="outline" size="sm" asChild>
//             <Link href="/">Back to Home</Link>
//           </Button>
//         </div>
//       </div>

//       <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 pt-20 pb-20 items-start">
//         {/* Benefits Sidebar */}
//         <div className="space-y-6 hidden md:block">
//           <div>
//             <h2 className="text-xl font-bold mb-2">Join Event Match Hub</h2>
//             <p className="text-muted-foreground text-sm">
//               Connect with opportunities and build your verified digital portfolio
//             </p>
//           </div>

//           <Tabs value={userType} onValueChange={(v) => setUserType(v as any)}>
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="participant">Participant</TabsTrigger>
//               <TabsTrigger value="organizer">Organizer</TabsTrigger>
//             </TabsList>

//             <TabsContent value="participant" className="space-y-4 mt-6">
//               <h3 className="font-semibold text-sm">As a Participant, you can:</h3>
//               <ul className="space-y-3">
//                 {participantBenefits.map((b, i) => (
//                   <li key={i} className="flex items-start gap-3">
//                     <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
//                     <span className="text-sm">{b}</span>
//                   </li>
//                 ))}
//               </ul>
//             </TabsContent>

//             <TabsContent value="organizer" className="space-y-4 mt-6">
//               <h3 className="font-semibold text-sm">As an Organizer, you can:</h3>
//               <ul className="space-y-3">
//                 {organizerBenefits.map((b, i) => (
//                   <li key={i} className="flex items-start gap-3">
//                     <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
//                     <span className="text-sm">{b}</span>
//                   </li>
//                 ))}
//               </ul>
//               <Card className="bg-blue-50 border-blue-200">
//                 <CardContent className="p-4">
//                   <div className="flex gap-3">
//                     <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <p className="font-semibold text-sm text-blue-900">Verification Required</p>
//                       <p className="text-xs text-blue-700">
//                         All organizers are verified to ensure trust and quality.
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>

//         {/* Signup Form Card */}
//         <Card className="shadow-xl">
//           <CardHeader>
//             <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
//             <CardDescription>
//               {userType === "organizer" && organizerStep === 2
//                 ? "Verify your organization"
//                 : "Get started with Event Match Hub today"}
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             {/* Mobile Tabs */}
//             <div className="md:hidden mb-6">
//               <Tabs value={userType} onValueChange={(v) => setUserType(v as any)}>
//                 <TabsList className="grid w-full grid-cols-2">
//                   <TabsTrigger value="participant" className="flex items-center gap-2">
//                     <Users className="w-4 h-4" /> Participant
//                   </TabsTrigger>
//                   <TabsTrigger value="organizer" className="flex items-center gap-2">
//                     <Briefcase className="w-4 h-4" /> Organizer
//                   </TabsTrigger>
//                 </TabsList>
//               </Tabs>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}

//               {/* Step 1: Basic Info */}
//               {(userType === "participant" || organizerStep === 1) && (
//                 <>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="firstName">First Name</Label>
//                       <Input name="firstName" placeholder="John" required />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="lastName">Last Name</Label>
//                       <Input name="lastName" placeholder="Doe" required />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input name="email" type="email" placeholder="you@example.com" required />
//                   </div>

//                   {userType === "organizer" && (
//                     <>
//                       <div className="space-y-2">
//                         <Label htmlFor="organization">Organization Name</Label>
//                         <Input name="organization" placeholder="ABC Corp" required />
//                       </div>
//                       <div className="space-y-2">
//                         <Label htmlFor="position">Your Position</Label>
//                         <Input name="position" placeholder="Event Manager" required />
//                       </div>
//                     </>
//                   )}

//                   <div className="space-y-2">
//                     <Label htmlFor="password">Password</Label>
//                     <div className="relative">
//                       <Input
//                         name="password"
//                         type={showPassword ? "text" : "password"}
//                         required
//                         minLength={6}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2"
//                       >
//                         {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                       </button>
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="confirmPassword">Confirm Password</Label>
//                     <div className="relative">
//                       <Input
//                         name="confirmPassword"
//                         type={showConfirmPassword ? "text" : "password"}
//                         required
//                         minLength={6}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2"
//                       >
//                         {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex items-start space-x-2">
//                     <Checkbox id="terms" required />
//                     <label htmlFor="terms" className="text-sm leading-none">
//                       I agree to the{" "}
//                       <Link href="/terms" className="text-blue-600 underline">
//                         Terms
//                       </Link>{" "}
//                       and{" "}
//                       <Link href="/privacy" className="text-blue-600 underline">
//                         Privacy Policy
//                       </Link>
//                     </label>
//                   </div>

//                   {userType === "organizer" ? (
//                     <Button
//                       type="button"
//                       onClick={() => setOrganizerStep(2)}
//                       className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
//                       size="lg"
//                     >
//                       Next: Verify Organization
//                     </Button>
//                   ) : (
//                     <Button
//                       type="submit"
//                       className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
//                       size="lg"
//                       disabled={isLoading}
//                     >
//                       {isLoading ? "Creating..." : "Create Participant Account"}
//                     </Button>
//                   )}
//                 </>
//               )}

//               {/* Step 2: Organizer Verification */}
//               {userType === "organizer" && organizerStep === 2 && (
//                 <>
//                   <div className="space-y-4">
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <div className="flex gap-3">
//                         <Shield className="w-5 h-5 text-blue-600" />
//                         <p className="text-xs text-blue-800">
//                           Verification typically takes 1-2 business days.
//                         </p>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="orgWebsite">Organization Website</Label>
//                       <div className="relative">
//                         <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                         <Input name="orgWebsite" type="url" className="pl-10" required />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="orgRegistration">Registration Number</Label>
//                       <div className="relative">
//                         <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
//                         <Input name="orgRegistration" className="pl-10" required />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <Label htmlFor="orgDescription">Description</Label>
//                       <Textarea name="orgDescription" rows={4} required />
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={() => setOrganizerStep(1)}
//                       className="flex-1"
//                     >
//                       Back
//                     </Button>
//                     <Button
//                       type="submit"
//                       className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
//                       disabled={isLoading}
//                     >
//                       {isLoading ? "Submitting..." : "Submit for Approval"}
//                     </Button>
//                   </div>
//                 </>
//               )}
//             </form>
//           </CardContent>

//           <CardFooter>
//             <div className="text-sm text-center w-full text-muted-foreground">
//               Already have an account?{" "}
//               <Link href="/login" className="text-blue-600 hover:underline font-medium">
//                 Sign in
//               </Link>
//             </div>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// }


"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Checkbox } from "../components/ui/checkbox";
import { Textarea } from "../components/ui/textarea";
import {
  Eye,
  EyeOff,
  Users,
  Briefcase,
  CheckCircle2,
  Shield,
  Globe,
  Building2,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<"participant" | "organizer">("participant");
  const [isLoading, setIsLoading] = useState(false);
  const [organizerStep, setOrganizerStep] = useState(1);
  const [error, setError] = useState("");

  const participantBenefits = [
    "Discover and register for events",
    "Get verified digital certificates",
    "Build your achievement portfolio",
    "Personalized event recommendations",
  ];

  const organizerBenefits = [
    "Create and manage unlimited events",
    "Track registrations and attendees",
    "Generate certificates automatically",
    "Access analytics and insights",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Client-side password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const payload: any = {
      full_name: `${formData.get("firstName")} ${formData.get("lastName")}`.trim(),
      email: formData.get("email"),
      password_hash: formData.get("password"),  // Send as password_hash
      phone_number: "",  // Temporary empty string (or add real field later)
      userType,  // Keep for your proxy routing
    };

   if (userType === "organizer") {
      payload.organization_name = formData.get("organization");
      payload.position = formData.get("position");
      // Optional extra fields — backend ignores if not used
      payload.org_website = formData.get("orgWebsite");
      payload.org_registration = formData.get("orgRegistration");
      payload.org_description = formData.get("orgDescription");
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Success message
      const successMessage =
        userType === "organizer"
          ? "Application submitted! We'll review it within 1-2 business days."
          : "Account created successfully! Please sign in to continue.";

      alert(successMessage);

      // Redirect to login page with pre-filled email
      const email = encodeURIComponent(payload.email as string);
      router.push(`/login?email=${email}`);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="container mx-auto flex justify-end">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 pt-20 pb-20 items-start">
        {/* Benefits Sidebar */}
        <div className="space-y-6 hidden md:block">
          <div>
            <h2 className="text-xl font-bold mb-2">Join Event Match Hub</h2>
            <p className="text-muted-foreground text-sm">
              Connect with opportunities and build your verified digital portfolio
            </p>
          </div>

          <Tabs value={userType} onValueChange={(v) => setUserType(v as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="participant">Participant</TabsTrigger>
              <TabsTrigger value="organizer">Organizer</TabsTrigger>
            </TabsList>

            <TabsContent value="participant" className="space-y-4 mt-6">
              <h3 className="font-semibold text-sm">As a Participant, you can:</h3>
              <ul className="space-y-3">
                {participantBenefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="organizer" className="space-y-4 mt-6">
              <h3 className="font-semibold text-sm">As an Organizer, you can:</h3>
              <ul className="space-y-3">
                {organizerBenefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{b}</span>
                  </li>
                ))}
              </ul>
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm text-blue-900">Verification Required</p>
                      <p className="text-xs text-blue-700">
                        All organizers are verified to ensure trust and quality.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Signup Form Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>
              {userType === "organizer" && organizerStep === 2
                ? "Verify your organization"
                : "Get started with Event Match Hub today"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Mobile Tabs */}
            <div className="md:hidden mb-6">
              <Tabs value={userType} onValueChange={(v) => setUserType(v as any)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="participant" className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> Participant
                  </TabsTrigger>
                  <TabsTrigger value="organizer" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Organizer
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}

              {/* Step 1: Basic Info */}
              {(userType === "participant" || organizerStep === 1) && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input name="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input name="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" type="email" placeholder="you@example.com" required />
                  </div>

                  {userType === "organizer" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization Name</Label>
                        <Input name="organization" placeholder="ABC Corp" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Your Position</Label>
                        <Input name="position" placeholder="Event Manager" required />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <label htmlFor="terms" className="text-sm leading-none">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 underline">
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  {userType === "organizer" ? (
                    <Button
                      type="button"
                      onClick={() => setOrganizerStep(2)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                      size="lg"
                    >
                      Next: Verify Organization
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating..." : "Create Participant Account"}
                    </Button>
                  )}
                </>
              )}

              {/* Step 2: Organizer Verification */}
              {userType === "organizer" && organizerStep === 2 && (
                <>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex gap-3">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <p className="text-xs text-blue-800">
                          Verification typically takes 1-2 business days.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="orgWebsite">Organization Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input name="orgWebsite" type="url" className="pl-10" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="orgRegistration">Registration Number</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input name="orgRegistration" className="pl-10" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="orgDescription">Description</Label>
                      <Textarea name="orgDescription" rows={4} required />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOrganizerStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit for Approval"}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>

          <CardFooter>
            <div className="text-sm text-center w-full text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

