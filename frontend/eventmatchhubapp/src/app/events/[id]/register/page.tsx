/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Checkbox } from "@/app/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Separator } from "@/app/components/ui/separator";
import {
  Calendar,
  MapPin,
  Users,
  Award,
  Shield,
  Upload,
  CheckCircle2,
} from "lucide-react";
import { SiteHeader } from "@/app/components/site/site-header";
import { useParams, useRouter } from "next/navigation";
import { getEventById } from "@/lib/data/event-datas";
import { registerEventParticipant } from "@/app/api/events/eventAPI";

export default function RegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const eventId = idParam;
  const eventDetails = eventId ? getEventById(eventId) : null;

  // Form state
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [sessionTime, setSessionTime] = useState("");
  const [registerStatus, setRegisterStatus] = useState(false);

  const DIETARY_OPTIONS = [
    { label: "Vegetarian", value: "c6341d1b-53c0-47a4-b8f7-db332b32f6f9" },
    { label: "Vegan", value: "c3d0c1b5-1acc-463d-880f-86bbf82fcb32" },
    { label: "Gluten-Free", value: "b7294797-3a89-4c74-897b-38d9ca198045" },
    { label: "None", value: "none" },
  ];

  if (!eventDetails) {
    return <p className="text-center py-10">Event not found.</p>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentProof(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitRegistration = async () => {
    const res = await registerEventParticipant(
      "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "e4149667-f494-4e45-b72a-a0de408ee4d7",
      [
        {
          formfield_id: "eea8a5cb-ed02-4dd3-bf5b-caad8cb1cacd",
          answer_text: "Kao Vichet",
        },
        {
          formfield_id: "de8a7971-12d9-4913-8662-2886cd935b6c",
          answer_text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra convallis dapibus. Sed elementum placerat dui, eu condimentum mi congue sit amet. In velit est, mattis in mattis at, vehicula tempor sapien. Duis ac euismod libero, eu egestas arcu. Proin in posuere orci. Aliquam erat volutpat. Pellentesque at luctus risus. Sed ut augue nec ante accumsan tincidunt. Nullam malesuada dolor vel aliquet gravida. Praesent elit sem, pellentesque quis quam ac, placerat pellentesque nisi.",
        },
        {
          formfield_id: "ca99dfa5-b901-4e4d-8f31-6d5ec6cc0451",
          selected_options_id: "4da3a002-9ba6-4116-9fd7-f6d67fb42af7",
        },
        {
          formfield_id: "09f31248-15ca-4830-8089-2a1f7846de72",
          selected_options_ids: [
            "c6341d1b-53c0-47a4-b8f7-db332b32f6f9",
            "c3d0c1b5-1acc-463d-880f-86bbf82fcb32",
          ],
        },
        {
          formfield_id: "51764724-5fa9-456f-b627-54550b0dbe1a",
          selected_options_id: "3d93c0ea-2fb4-4e49-a36d-597afc66093f",
        },
      ]
    );
    console.log("Registration response:", res);
    alert(`Registration successful!\n\nEvent: ${eventDetails.title}.`);
    setRegisterStatus(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const firstName = formData.get("firstName")?.toString().trim();
    const lastName = formData.get("lastName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();

    // if (!firstName || !lastName || !email || !termsAccepted) {
    //   alert("Please fill in all required fields and accept the terms.");
    //   return;
    // }

    // if (!paymentProof) {
    //   alert("Please upload proof of payment.");
    //   return;
    // }

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // alert(
    //   `Registration successful!\n\nEvent: ${eventDetails.title}\nName: ${firstName} ${lastName}\nEmail: ${email}\n\nYou'll receive a confirmation email shortly.`
    // );

    // Redirect to dashboard
    // router.push("/participant/overview");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Event Registration</h1>
            <p className="text-muted-foreground">
              Complete your registration to secure your spot
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Registration Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Please provide your details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          name="firstName"
                          id="firstName"
                          placeholder="John"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          name="lastName"
                          id="lastName"
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        name="email"
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        name="phone"
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization/Company</Label>
                      <Input
                        name="organization"
                        id="organization" */}
                {/* placeholder="Your company name"
                      />
                    </div>
                  </CardContent>
                </Card> */}

                {/* Additional Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                    <CardDescription>
                      Help us personalize your experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dietary">What is your full name?</Label>
                      <Input
                        name="dietary"
                        id="dietary"
                        placeholder="Kao Vichet"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="questions">
                        Please provide a brief bio about yourself.
                      </Label>
                      <Textarea
                        name="questions"
                        id="questions"
                        placeholder="I am a software developer with a passion for creating innovative solutions."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>How did you hear about this event?</Label>
                      <RadioGroup defaultValue="Social Media" name="tshirt">
                        {[
                          "Advertisement",
                          "Social Media",
                          "Friend or Colleague",
                          "Other",
                        ].map((heard) => (
                          <div
                            key={heard}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem value={heard} id={heard} />
                            <Label
                              htmlFor={heard}
                              className="font-normal capitalize"
                            >
                              {heard === "Friend or Colleague"
                                ? "Friend or Colleague"
                                : heard === "Advertisement"
                                ? "Advertisement"
                                : heard === "Social Media"
                                ? "Social Media"
                                : "Other"}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <div className="space-y-3">
                      <Label>Do you have any dietary restrictions?</Label>

                      {DIETARY_OPTIONS.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={option.value}
                            checked={dietaryRestrictions.includes(option.value)}
                            onCheckedChange={(checked) => {
                              setDietaryRestrictions((prev) =>
                                checked
                                  ? [...prev, option.value]
                                  : prev.filter((item) => item !== option.value)
                              );
                            }}
                          />
                          <Label
                            htmlFor={option.value}
                            className="font-normal cursor-pointer"
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Label>What is your preferred session time?</Label>
                      <Select
                        value={sessionTime}
                        onValueChange={setSessionTime}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose session time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="04584737-1947-4805-bdec-ee9b5d39569e">
                            Afternoon Session (1 PM - 4 PM)
                          </SelectItem>
                          <SelectItem value="26e444cc-0c49-4f5b-b88a-c0ea418ffcca">
                            Evening Session (5 PM - 8 PM)
                          </SelectItem>
                          <SelectItem value="4da3a002-9ba6-4116-9fd7-f6d67fb42af7">
                            Morning Session (9 AM - 12 PM)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold"
                  onClick={() => {
                    setTermsAccepted(true);
                    setMarketingOptIn(true);
                    submitRegistration();
                  }}
                >
                  Register to Get Payment Details
                </Button>

                {/* Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>
                      Make payment through this QR code
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(registerStatus && (
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* QR Code */}
                        <div className="bg-white p-4 rounded-lg border shadow-sm">
                          <img
                            src="/vichet_qr.jpg"
                            alt="ABA QR Code"
                            className="w-64 h-64 object-contain"
                          />
                        </div>

                        {/* Upload & Instructions */}
                        <div className="flex-1 space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Open your ABA Mobile app, scan the QR code, and
                            complete the payment.
                          </p>

                          {/* Payment Proof Upload */}
                          <div className="space-y-3">
                            <Label
                              htmlFor="paymentProof"
                              className="font-semibold text-sm flex items-center gap-2"
                            >
                              Checking Payment After You Paid
                            </Label>
                            <a
                              className="text-sm text-blue-900 underline cursor-pointer font-bold"
                              onClick={() => {
                                alert(
                                  "Payment Successful! Your registration is now complete."
                                );
                                router.push("/participant/overview");
                              }}
                            >
                              Click to check your payment status after you have
                              made the payment.
                            </a>
                            {proofPreview && (
                              <div className="mt-3">
                                <p className="text-sm text-green-600 flex items-center gap-2 mb-2">
                                  <CheckCircle2 className="w-4 h-4" />
                                  Proof uploaded successfully
                                </p>
                                <img
                                  src={proofPreview}
                                  alt="Payment proof preview"
                                  className="w-full max-w-xs rounded-lg border shadow-sm"
                                />
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-600">
                              Your payment information is secure and encrypted
                            </span>
                          </div>
                        </div>
                      </div>
                    )) || (
                      <div className="flex justify-center h-20 items-center">
                        <p className="text-md font-bold text-muted-foreground">
                          Please Complete the Form Information First
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Terms and Conditions */}
                <Card>
                  <CardContent className="space-y-4 pt-6">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) =>
                          setTermsAccepted(checked as boolean)
                        }
                        required
                      />
                      <Label
                        htmlFor="terms"
                        className="font-normal text-sm leading-relaxed cursor-pointer"
                      >
                        I agree to the terms and conditions and understand the
                        cancellation policy
                      </Label>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="marketing"
                        checked={marketingOptIn}
                        onCheckedChange={(checked) =>
                          setMarketingOptIn(checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="marketing"
                        className="font-normal text-sm leading-relaxed cursor-pointer"
                      >
                        I want to receive updates about future events and
                        opportunities
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button
                  size="lg"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold"
                >
                  {isSubmitting
                    ? "Processing Registration..."
                    : `Complete Registration - $${eventDetails.price.toFixed(
                        2
                      )}`}
                </Button>
              </div>

              {/* Event Summary Sidebar */}
              <div className="space-y-6">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Event Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <img
                      src={eventDetails.image || "/placeholder.svg"}
                      alt={eventDetails.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <div>
                      <Badge className="mb-2">{eventDetails.category}</Badge>
                      <h3 className="font-semibold text-lg mb-3">
                        {eventDetails.title}
                      </h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {eventDetails.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {eventDetails.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {eventDetails.attendees}/{eventDetails.maxAttendees}{" "}
                          registered
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Registration Fee</span>
                        <span>${eventDetails.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Processing Fee</span>
                        <span>$0.00</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${(eventDetails.price + 0.0).toFixed(2)}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2 text-blue-700 font-medium">
                        <Award className="w-5 h-5" />
                        Certificate Included
                      </div>
                      <p className="text-sm text-blue-600">
                        You’ll receive a verified digital certificate upon
                        completion
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
