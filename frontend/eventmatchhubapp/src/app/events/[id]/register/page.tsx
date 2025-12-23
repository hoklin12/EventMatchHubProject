// /* eslint-disable @next/next/no-img-element */
// "use client";

// import { Button } from "@/app/components/ui/button";
// import { Input } from "@/app/components/ui/input";
// import { Label } from "@/app/components/ui/label";
// import { Textarea } from "@/app/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/app/components/ui/card";
// import { Badge } from "@/app/components/ui/badge";
// import { Checkbox } from "@/app/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
// import { Separator } from "@/app/components/ui/separator";
// import {
//   Calendar,
//   MapPin,
//   Users,
//   Award,
//   Shield,
// } from "lucide-react";
// import { SiteHeader } from "@/app/components/site/site-header";
// import { useParams } from "next/navigation";
// import { getEventById } from "@/lib/data/event-datas";

// export default function RegistrationPage() {
//   const params = useParams();
//   const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
//   const eventId = parseInt(idParam!, 10);
//   const eventDetails = getEventById(eventId);

//   if (!eventDetails) return <p>Event not found.</p>;

//   return (
//     <div className="min-h-screen bg-background">
//       <SiteHeader />

//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold mb-2">Event Registration</h1>
//             <p className="text-muted-foreground">
//               Complete your registration to secure your spot
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Registration Form */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Personal Information */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Personal Information</CardTitle>
//                   <CardDescription>Please provide your details</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="firstName">First Name *</Label>
//                       <Input id="firstName" placeholder="John" />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="lastName">Last Name *</Label>
//                       <Input id="lastName" placeholder="Doe" />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email Address *</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="john@example.com"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Phone Number</Label>
//                     <Input
//                       id="phone"
//                       type="tel"
//                       placeholder="+1 (555) 000-0000"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="organization">Organization/Company</Label>
//                     <Input id="organization" placeholder="Your company name" />
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Additional Information */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Additional Information</CardTitle>
//                   <CardDescription>
//                     Help us personalize your experience
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="dietary">Dietary Restrictions</Label>
//                     <Input
//                       id="dietary"
//                       placeholder="e.g., Vegetarian, Vegan, Gluten-free"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="questions">
//                       Questions or Special Requests
//                     </Label>
//                     <Textarea
//                       id="questions"
//                       placeholder="Any questions or special accommodations needed?"
//                       rows={3}
//                     />
//                   </div>
//                   <div className="space-y-3">
//                     <Label>T-Shirt Size (if applicable)</Label>
//                     <RadioGroup defaultValue="m">
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="s" id="s" />
//                         <Label htmlFor="s" className="font-normal">
//                           Small
//                         </Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="m" id="m" />
//                         <Label htmlFor="m" className="font-normal">
//                           Medium
//                         </Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="l" id="l" />
//                         <Label htmlFor="l" className="font-normal">
//                           Large
//                         </Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="xl" id="xl" />
//                         <Label htmlFor="xl" className="font-normal">
//                           X-Large
//                         </Label>
//                       </div>
//                     </RadioGroup>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Payment Information */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Payment Information</CardTitle>
//                   <CardDescription>
//                     Make payment through this QR code
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
//                     {/* QR Code */}
//                     <img
//                       src="/aba-qr.png"
//                       alt="ABA QR Code"
//                       className="w-70 h-70 object-contain rounded-lg border"
//                     />

//                     {/* Upload & Instructions */}
//                     <div className="flex-1 space-y-4">
//                       <p className="text-sm text-muted-foreground">
//                         Open your ABA Mobile app, scan the QR code, and complete
//                         the payment.
//                       </p>

//                       {/* Optional: Upload payment screenshot */}
//                       <div className="w-full md:w-3/4 flex flex-col gap-2">
//                         <span className="font-semibold text-sm flex items-center gap-2">
//                           {/* You can add an icon here if you want */}
//                           Upload Payment Proof
//                         </span>
//                         <Input id="paymentProof" type="file" accept="image/*" />
//                       </div>

//                       {/* Secure payment info */}
//                       <div className="flex items-center gap-2">
//                         <Shield className="w-4 h-4 text-green-600" />
//                         <span className="text-sm text-green-600">
//                           Your payment information is secure and encrypted
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Terms and Conditions */}
//               <Card>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-start space-x-2">
//                     <Checkbox id="terms" />
//                     <Label
//                       htmlFor="terms"
//                       className="font-normal text-sm leading-relaxed"
//                     >
//                       I agree to the terms and conditions and understand the
//                       cancellation policy
//                     </Label>
//                   </div>
//                   <div className="flex items-start space-x-2">
//                     <Checkbox id="marketing" />
//                     <Label
//                       htmlFor="marketing"
//                       className="font-normal text-sm leading-relaxed"
//                     >
//                       I want to receive updates about future events and
//                       opportunities
//                     </Label>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Button
//                 size="lg"
//                 className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
//               >
//                 Complete Registration - ${eventDetails.price.toFixed(2)}
//               </Button>
//             </div>

//             {/* Event Summary Sidebar */}
//             <div className="space-y-6">
//               <Card className="sticky top-24">
//                 <CardHeader>
//                   <CardTitle>Event Summary</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <img
//                     src={eventDetails.image || "/placeholder.svg"}
//                     alt={eventDetails.title}
//                     className="w-full h-40 object-cover rounded-lg"
//                   />
//                   <div>
//                     <Badge className="mb-2">{eventDetails.category}</Badge>
//                     <h3 className="font-semibold text-lg mb-3">
//                       {eventDetails.title}
//                     </h3>
//                     <div className="space-y-2 text-sm text-muted-foreground">
//                       <div className="flex items-center gap-2">
//                         <Calendar className="w-4 h-4" />
//                         {eventDetails.date}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <MapPin className="w-4 h-4" />
//                         {eventDetails.location}
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Users className="w-4 h-4" />
//                         {eventDetails.attendees}/{eventDetails.maxAttendees}{" "}
//                         registered
//                       </div>
//                     </div>
//                   </div>

//                   <Separator />

//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span>Registration Fee</span>
//                       <span>${eventDetails.price.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-sm">
//                       <span>Processing Fee</span>
//                       <span>$0.00</span>
//                     </div>
//                     <Separator />
//                     <div className="flex justify-between font-semibold">
//                       <span>Total</span>
//                       <span>${(eventDetails.price + 0.0).toFixed(2)}</span>
//                     </div>
//                   </div>

//                   <Separator />

//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
//                     <div className="flex items-center gap-2 text-blue-700 font-medium">
//                       <Award className="w-5 h-5" />
//                       Certificate Included
//                     </div>
//                     <p className="text-sm text-blue-600">
//                       You`ll receive a verified digital certificate upon
//                       completion
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
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
  CheckCircle,
  Upload,
} from "lucide-react";
import { SiteHeader } from "@/app/components/site-header";
import { useParams } from "next/navigation";

// Dummy event data (replace getEventById with this for demo)
const dummyEvents = [
  {
    id: 1,
    title: "AI & Machine Learning Summit 2025",
    category: "Technology",
    date: "December 23, 2025",
    location: "Phnom Penh, Cambodia",
    attendees: 124,
    maxAttendees: 500,
    price: 10.0,
    image: "/ai-summit.jpg",
  },
  {
    id: 2,
    title: "Digital Marketing Workshop",
    category: "Business",
    date: "January 15, 2026",
    location: "Siem Reap",
    attendees: 89,
    maxAttendees: 200,
    price: 10.0,
    image: "/marketing.jpg",
  },
];

const getEventById = (id: number) => dummyEvents.find((e) => e.id === id);

export default function RegistrationPage() {
  const params = useParams();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const eventId = parseInt(idParam!, 10);
  const eventDetails = getEventById(eventId);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [dietary, setDietary] = useState("");
  const [questions, setQuestions] = useState("");
  const [tshirtSize, setTshirtSize] = useState("m");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!eventDetails) return <p className="text-center py-20 text-2xl">Event not found.</p>;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("Please accept the terms and conditions to continue.");
      return;
    }

    if (!firstName || !lastName || !email) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Registration submitted:", {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      organization,
      dietary,
      questions,
      tshirtSize,
      paymentProof: paymentProof?.name,
      termsAccepted,
      marketingOptIn,
      event: eventDetails.title,
    });

    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className="w-24 h-24 text-green-600 mx-auto" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Registration Complete!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for registering for <strong>{eventDetails.title}</strong>.
            </p>
            <div className="bg-gray-50 rounded-xl p-8 space-y-4 text-left max-w-lg mx-auto">
              <p><strong>Name:</strong> {firstName} {lastName}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Ticket Price:</strong> ${eventDetails.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground mt-6">
                A confirmation email has been sent. Please complete payment via the QR code provided.
              </p>
            </div>
            <Button
              size="lg"
              className="mt-10"
              onClick={() => {
                setSubmitSuccess(false);
                // Reset form or redirect
                window.location.href = "/";
              }}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

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

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
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
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+855 12 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization/Company</Label>
                    <Input
                      id="organization"
                      placeholder="CADT"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                  <CardDescription>Help us personalize your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dietary">Dietary Restrictions</Label>
                    <Input
                      id="dietary"
                      placeholder="e.g., Vegetarian, No Pork"
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="questions">Questions or Special Requests</Label>
                    <Textarea
                      id="questions"
                      placeholder="Any questions or accommodations needed?"
                      rows={3}
                      value={questions}
                      onChange={(e) => setQuestions(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>T-Shirt Size (if applicable)</Label>
                    <RadioGroup value={tshirtSize} onValueChange={setTshirtSize}>
                      {["S", "M", "L", "XL"].map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                          <RadioGroupItem value={size.toLowerCase()} id={size.toLowerCase()} />
                          <Label htmlFor={size.toLowerCase()} className="font-normal">
                            {size}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>Make payment through this QR code</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <img
                      src="/aba-qr.png"
                      alt="ABA QR Code"
                      className="w-64 h-64 object-contain rounded-lg border shadow-lg"
                    />
                    <div className="flex-1 space-y-6">
                      <p className="text-muted-foreground">
                        Open your <strong>ABA Mobile</strong> app, scan the QR code above, and complete the payment of <strong>${eventDetails.price.toFixed(2)}</strong>.
                      </p>

                      <div className="space-y-3">
                        <Label className="font-semibold flex items-center gap-2">
                          <Upload className="w-5 h-5" />
                          Upload Payment Proof (Screenshot)
                        </Label>
                        <Input
                          id="paymentProof"
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="cursor-pointer"
                        />
                        {paymentProof && (
                          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-800 font-medium">
                              ✓ {paymentProof.name} uploaded successfully
                            </p>
                            {proofPreview && (
                              <img
                                src={proofPreview}
                                alt="Payment proof"
                                className="mt-3 max-w-xs rounded border"
                              />
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-green-600">
                        <Shield className="w-5 h-5" />
                        <span className="font-medium">Your payment is secure and encrypted</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                      required
                    />
                    <Label htmlFor="terms" className="font-normal text-sm leading-relaxed cursor-pointer">
                      I agree to the <a href="#" className="text-blue-600 underline">terms and conditions</a> and understand the cancellation policy
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="marketing"
                      checked={marketingOptIn}
                      onCheckedChange={(checked) => setMarketingOptIn(checked as boolean)}
                    />
                    <Label htmlFor="marketing" className="font-normal text-sm leading-relaxed cursor-pointer">
                      I want to receive updates about future events and opportunities
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg py-7"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing Registration..." : `Complete Registration - $${eventDetails.price.toFixed(2)}`}
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
                    src={eventDetails.image || "/placeholder-event.jpg"}
                    alt={eventDetails.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div>
                    <Badge className="mb-3">{eventDetails.category}</Badge>
                    <h3 className="font-bold text-xl mb-4">{eventDetails.title}</h3>
                    <div className="space-y-3 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>{eventDetails.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{eventDetails.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span>{eventDetails.attendees}/{eventDetails.maxAttendees} registered</span>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Registration Fee</span>
                      <span className="font-semibold">${eventDetails.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fee</span>
                      <span className="font-semibold">$0.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${eventDetails.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 text-blue-700 font-semibold mb-2">
                      <Award className="w-6 h-6" />
                      Certificate Included
                    </div>
                    <p className="text-sm text-blue-600">
                      You'll receive a verified digital certificate upon completion
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}