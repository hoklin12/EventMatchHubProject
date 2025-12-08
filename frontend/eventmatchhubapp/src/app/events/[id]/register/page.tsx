/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
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
} from "lucide-react";
import { SiteHeader } from "@/app/components/site/site-header";
import { useParams } from "next/navigation";
import { getEventById } from "@/lib/data/event-datas";

export default function RegistrationPage() {
  const params = useParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const eventId = parseInt(idParam!, 10);
  const eventDetails = getEventById(eventId);

  if (!eventDetails) return <p>Event not found.</p>;

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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Registration Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Please provide your details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization/Company</Label>
                    <Input id="organization" placeholder="Your company name" />
                  </div>
                </CardContent>
              </Card>

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
                    <Label htmlFor="dietary">Dietary Restrictions</Label>
                    <Input
                      id="dietary"
                      placeholder="e.g., Vegetarian, Vegan, Gluten-free"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="questions">
                      Questions or Special Requests
                    </Label>
                    <Textarea
                      id="questions"
                      placeholder="Any questions or special accommodations needed?"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>T-Shirt Size (if applicable)</Label>
                    <RadioGroup defaultValue="m">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="s" id="s" />
                        <Label htmlFor="s" className="font-normal">
                          Small
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="m" id="m" />
                        <Label htmlFor="m" className="font-normal">
                          Medium
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="l" id="l" />
                        <Label htmlFor="l" className="font-normal">
                          Large
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="xl" id="xl" />
                        <Label htmlFor="xl" className="font-normal">
                          X-Large
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>
                    Make payment through this QR code
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* QR Code */}
                    <img
                      src="/aba-qr.png"
                      alt="ABA QR Code"
                      className="w-70 h-70 object-contain rounded-lg border"
                    />

                    {/* Upload & Instructions */}
                    <div className="flex-1 space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Open your ABA Mobile app, scan the QR code, and complete
                        the payment.
                      </p>

                      {/* Optional: Upload payment screenshot */}
                      <div className="w-full md:w-3/4 flex flex-col gap-2">
                        <span className="font-semibold text-sm flex items-center gap-2">
                          {/* You can add an icon here if you want */}
                          Upload Payment Proof
                        </span>
                        <Input id="paymentProof" type="file" accept="image/*" />
                      </div>

                      {/* Secure payment info */}
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">
                          Your payment information is secure and encrypted
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" />
                    <Label
                      htmlFor="terms"
                      className="font-normal text-sm leading-relaxed"
                    >
                      I agree to the terms and conditions and understand the
                      cancellation policy
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="marketing" />
                    <Label
                      htmlFor="marketing"
                      className="font-normal text-sm leading-relaxed"
                    >
                      I want to receive updates about future events and
                      opportunities
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Complete Registration - ${eventDetails.price.toFixed(2)}
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
                      You`ll receive a verified digital certificate upon
                      completion
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
