"use client";

import React from "react";
import { ArrowLeft, Edit3, Share2, Download, CheckCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { useRouter, useParams } from "next/navigation";

// Temporary mock data (replace later with real fetch)
const mockPortfolios: Record<string, any> = {
  "1": {
    title: "Web Developer Portfolio",
    subtitle: "Full-stack developer specializing in React & Node.js",
    bio: "I build fast, scalable web applications with modern technologies.",
    createdAt: "2023-11-24",
    certificateCount: 3,
  },
  "2": {
    title: "UX/UI Design Portfolio",
    subtitle: "Creative designer focused on user-centered design and digital experiences.",
    bio: "I am a UI/UX designer with a passion for creating beautiful, intuitive interfaces. My design process is grounded in user research and accessibility best practices.",
    createdAt: "2025-11-24",
    certificateCount: 2,
  },
  "3": {
    title: "Product Manager Portfolio",
    subtitle: "Strategic thinker driving product success from idea to launch",
    bio: "Experienced in leading cross-functional teams and delivering impactful products.",
    createdAt: "2025-11-24",
    certificateCount: 3,
  },
};

export default function PortfolioViewPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const portfolio = mockPortfolios[id] || mockPortfolios["2"]; // fallback

  const certificates = [
    { name: "Design Thinking Bootcamp", issuer: "Design Academy", date: "Feb 15, 2025" },
    { name: "Marketing Masterclass", issuer: "Design Academy", date: "Feb 15, 2025" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-white">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <Card className="mb-10 bg-white rounded-3xl shadow-lg overflow-hidden">
          <button
            onClick={() => router.back()}
            className="px-10 pt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
        </button>
          <div className="p-10">

            <h1 className="text-4xl font-bold text-gray-900 mb-2">{portfolio.title}</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-4xl">{portfolio.subtitle}</p>

            <div className="bg-gray-50/70 rounded-2xl p-8 mb-8">
              <p className="text-gray-700 leading-relaxed text-lg">{portfolio.bio}</p>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Created</span>
                  <span>{portfolio.createdAt}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">Certificates</span>
                  <Badge className="bg-purple-100 text-purple-700">
                    {portfolio.certificateCount}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Portfolio
                </Button>
                <Button variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Certificates ({portfolio.certificateCount})
        </h2>

        <div className="space-y-6">
          {certificates.map((cert, i) => (
            <Card key={i} className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Issued by {cert.issuer} • {cert.date}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}