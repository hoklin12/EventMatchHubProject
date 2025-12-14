"use client";

import {
  Zap,
  Users,
  Shield,
  Brain,
  Lock,
  Lightbulb,
  Target,
  SearchCode,
  FileText,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

const platformFeatures = {
  participants: [
    {
      icon: Lightbulb,
      title: "Centralized Event Hub",
      description:
        "Browse curated event opportunities and receive personalized recommendations tailored to your interests.",
    },
    {
      icon: Brain,
      title: "AI-Powered Recommendations",
      description:
        "Get AI-generated event suggestions based on your interests, skills, and previous participation.",
    },
    {
      icon: Lock,
      title: "Simplified Applications",
      description:
        "Apply to events with user-friendly forms and customize your registration needs.",
    },
    {
      icon: Shield,
      title: "Verified Digital Portfolio",
      description:
        "Build credibility with verified certificates that showcase your professional achievements.",
    },
  ],
  organizers: [
    {
      icon: Lightbulb,
      title: "Centralized Management",
      description:
        "Host, manage, and monitor events with comprehensive tools all in one place.",
    },
    {
      icon: Brain,
      title: "Customizable Forms",
      description:
        "Create registration forms tailored to your event needs with flexible options.",
    },
    {
      icon: Lock,
      title: "AI Applicant Summaries",
      description:
        "Get AI-generated summaries of participant profiles for quick evaluation.",
    },
    {
      icon: Shield,
      title: "Automated Certificates",
      description:
        "Generate and send verified digital certificates to attendees automatically.",
    },
  ],
};

const howItWorks = [
  {
    icon: SearchCode,
    title: "Centralized Event Hub",
    description:
      "Browse a vast catalog of opportunities and receive personalized recommendations to find the perfect match for your interests and skills.",
  },
  {
    icon: FileText,
    title: "Apply with Ease",
    description:
      "Our streamlined application process makes it simple to apply for organizers, letting us handle registration paperwork.",
  },
  {
    icon: BadgeCheck,
    title: "Get Verified",
    description:
      "Participants get recognized, and receive authentic digital certificates that enhance your professional portfolio.",
  },
];

export default function IntroPage() {
  const [activeTab, setActiveTab] = useState<"participants" | "organizers">(
    "participants"
  );

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance">
                Building Trust Through
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}
                  Verified Events
                </span>
              </h1>
              <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
                Event Match Hub is your all-in-one platform for discovering
                events, managing applications, and building a trustworthy
                digital portfolio with verified certificates.
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700"
                  asChild
                >
                  <Link href="/events">Find Your Next Event</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/signup">I`m an Organizer</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/ai-conference.png"
                alt="Event venue with attendees"
                className="w-full h-auto rounded-lg object-cover shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
              <Target className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              We believe in creating meaningful connections between event
              organizers and participants. Our platform ensures that every event
              is credible, every certificate is verified, and every experience
              contributes to your professional growth. We`re committed to
              building a trustworthy ecosystem where opportunities meet talent.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Our Values</h2>
              <p className="text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Trust</h3>
                <p className="text-muted-foreground">
                  We verify every organizer to ensure credibility and safety for
                  all participants.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously improve our platform with cutting-edge
                  features and technology.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                  <Users className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Community</h3>
                <p className="text-muted-foreground">
                  We foster meaningful connections and support growth for
                  everyone in our ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Platform Features Section */}
        <section className="py-16" style={{ backgroundColor: "var(--background-light)" }}>
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">
                A Platform Built for Everyone
              </h2>
              <p className="text-muted-foreground mb-10">
                Whether you`re looking for opportunities or organizing them, we
                have the tools you need to succeed.
              </p>

              {/* Perfect Pill Toggle - Matches your screenshot exactly */}
              <div className="flex justify-center">
                <div className="inline-flex rounded-full bg-gray-200 p-1 shadow-inner">
                  <button
                    onClick={() => setActiveTab("participants")}
                    className={`px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 ${
                      activeTab === "participants"
                        ? "bg-white text-foreground shadow-md"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    For Participants
                  </button>
                  <button
                    onClick={() => setActiveTab("organizers")}
                    className={`px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 ${
                      activeTab === "organizers"
                        ? "bg-white text-foreground shadow-md"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    For Organizer
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {(activeTab === "participants"
                ? platformFeatures.participants
                : platformFeatures.organizers
              ).map((feature) => (
                <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                      <feature.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="mb-2 font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                A simple, transparent, and efficient process for everyone involved.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {howItWorks.map((step, index) => (
                <Card
                  key={index}
                  className="border bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl"
                >
                  <CardContent className="p-8">
                    <div className="mb-6 flex items-start justify-between">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-indigo-600">
                        <step.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="text-5xl font-bold text-gray-100">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}