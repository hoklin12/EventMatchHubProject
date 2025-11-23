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
  Upload,
  FileText,
  Building2,
  Globe,
  Shield,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<"participant" | "organizer">(
    "participant"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [organizerStep, setOrganizerStep] = useState(1);
  const [uploadedDocs, setUploadedDocs] = useState<{ [key: string]: string }>(
    {}
  );

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

  const handleFileUpload = (
    docType: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedDocs((prev) => ({ ...prev, [docType]: file.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect to appropriate dashboard based on user type
    if (userType === "participant") {
      router.push("/dashboard/participant");
    } else {
      router.push("/dashboard/organizer/pending");
    }
  };

  const handleOrganizerNext = () => {
    if (organizerStep < 2) {
      setOrganizerStep(organizerStep + 1);
    }
  };

  const handleOrganizerBack = () => {
    if (organizerStep > 1) {
      setOrganizerStep(organizerStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="container mx-auto flex items-center justify-end">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 pt-20 pb-20 items-start">
        {/* Benefits Section */}
        <div className="space-y-6 hidden md:block">
          <div>
            <h2 className="text-xl font-bold mb-2">Join Event Match Hub</h2>
            <p className="text-muted-foreground text-sm">
              Connect with opportunities and build your verified digital
              portfolio
            </p>
          </div>

          <Tabs
            value={userType}
            onValueChange={(value) =>
              setUserType(value as "participant" | "organizer")
            }
          >
            <TabsList className="grid w-full grid-cols-2 text-sm">
              <TabsTrigger value="participant">Participant</TabsTrigger>
              <TabsTrigger value="organizer">Organizer</TabsTrigger>
            </TabsList>
            <TabsContent value="participant" className="space-y-4 mt-6">
              <h3 className="font-semibold text-sm">
                As a Participant, you can:
              </h3>
              <ul className="space-y-3">
                {participantBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="organizer" className="space-y-4 mt-6">
              <h3 className="font-semibold text-sm">
                As an Organizer, you can:
              </h3>
              <ul className="space-y-3">
                {organizerBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold text-sm text-blue-900">
                        Verification Required
                      </p>
                      <p className="text-xs text-blue-700">
                        To maintain trust and quality, all organizers must
                        verify their organization credentials before hosting
                        events.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Signup Form */}
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>
              {userType === "organizer" && organizerStep === 2
                ? "Verify your organization credentials"
                : "Get started with Event Match Hub today"}
            </CardDescription>
            {userType === "organizer" && (
              <div className="flex items-center gap-2 pt-2">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    organizerStep >= 1
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </div>
                <div
                  className={`h-1 flex-1 ${
                    organizerStep >= 2 ? "bg-purple-600" : "bg-gray-200"
                  }`}
                />
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    organizerStep >= 2
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* User Type Selection - Mobile */}
            <div className="md:hidden">
              <Tabs
                value={userType}
                onValueChange={(value) =>
                  setUserType(value as "participant" | "organizer")
                }
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="participant"
                    className="flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Participant
                  </TabsTrigger>
                  <TabsTrigger
                    value="organizer"
                    className="flex items-center gap-2"
                  >
                    <Briefcase className="w-4 h-4" />
                    Organizer
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {userType === "participant" || organizerStep === 1 ? (
                <>
                  {/* Step 1: Basic Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  {userType === "organizer" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization Name</Label>
                        <Input
                          id="organization"
                          placeholder="Your company or organization"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Your Position</Label>
                        <Input
                          id="position"
                          placeholder="e.g., Event Manager, CEO"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-blue-600 hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-600 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  {userType === "participant" ? (
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? "Creating Account..."
                        : "Create Participant Account"}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleOrganizerNext}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      size="lg"
                    >
                      Next: Verify Organization
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex gap-3">
                        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-semibold text-sm text-blue-900">
                            Why we verify organizers
                          </p>
                          <p className="text-xs text-blue-700">
                            We verify all organizers to ensure participants can
                            trust the events on our platform. This process
                            typically takes 1-2 business days.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="orgWebsite">Organization Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="orgWebsite"
                          type="url"
                          placeholder="https://yourorganization.com"
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="orgRegistration">
                        Business Registration Number
                      </Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="orgRegistration"
                          placeholder="e.g., Company registration or tax ID"
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="orgDescription">
                        Organization Description
                      </Label>
                      <Textarea
                        id="orgDescription"
                        placeholder="Brief description of your organization and the types of events you plan to host..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Verification Documents</Label>
                      <p className="text-xs text-muted-foreground">
                        Upload at least one document to verify your organization
                        (business license, tax certificate, etc.)
                      </p>

                      <div className="space-y-2">
                        <div className="border-1 border-dashed rounded-lg p-4 border-purple-400 hover:border-purple-900 transition-colors">
                          <label
                            htmlFor="businessLicense"
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                {uploadedDocs.businessLicense ? (
                                  <CheckCircle2 className="w-5 h-5 text-purple-600" />
                                ) : (
                                  <Upload className="w-5 h-5 text-purple-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">
                                  {uploadedDocs.businessLicense ||
                                    "Business License or Registration"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  PDF, JPG, or PNG (max 5MB)
                                </p>
                              </div>
                            </div>
                            <input
                              id="businessLicense"
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload("businessLicense", e)
                              }
                              required
                            />
                          </label>
                        </div>

                        <div className="border-1 border-dashed rounded-lg p-4 border-purple-400 hover:border-purple-900 transition-colors">
                          <label
                            htmlFor="taxCertificate"
                            className="cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                {uploadedDocs.taxCertificate ? (
                                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                ) : (
                                  <FileText className="w-5 h-5 text-blue-600" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">
                                  {uploadedDocs.taxCertificate ||
                                    "Tax Certificate (Optional)"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Additional verification document
                                </p>
                              </div>
                            </div>
                            <input
                              id="taxCertificate"
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload("taxCertificate", e)
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleOrganizerBack}
                        className="flex-1 bg-transparent"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Submitting..." : "Submit for Approval"}
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {/* Divider - Only show on step 1 */}
              {(userType === "participant" || organizerStep === 1) && (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or sign up with
                      </span>
                    </div>
                  </div>

                  {/* Social Signup */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button">
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" type="button">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
