"use client";

import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { TabsContent } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Award, Download, Share2, Check } from "lucide-react";
import { certificates } from "@/lib/data/certificates";

export function CertificateSection() {

  return (
    <TabsContent value="certificates" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <Card key={cert.id} className="overflow-hidden border-gray-200">
            {/* Top section with ribbon icon and verified badge */}
            <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 flex flex-col items-center justify-center min-h-64 relative">
              {/* Verified badge positioned top right */}
              {cert.verified && (
                <Badge className="absolute top-4 right-4 bg-green-500 text-white border-0 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Verified
                </Badge>
              )}

              {/* Ribbon icon centered */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-4">
                  <Award
                    className="w-20 h-20 text-purple-600"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Certificate title and issuer */}
              <div className="text-center mt-8 space-y-2">
                <h3 className="text-2xl font-bold text-foreground">
                  {cert.title}
                </h3>
                <p className="text-foreground/60">{cert.eventOrganizer}</p>
              </div>
            </div>

            {/* Bottom section with details */}
            <div className="bg-background p-6 space-y-4">
              {/* Details grid */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                <div className="space-y-1">
                  <p className="text-xs text-foreground/60 font-medium">
                    Issued Date:
                  </p>
                  <p className="font-semibold text-foreground">
                    {cert.issueDate}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-foreground/60 font-medium">
                    Certificate ID:
                  </p>
                  <p className="font-semibold text-foreground text-sm font-mono">
                    {cert.certificateId}
                  </p>
                </div>
              </div>
              {/* Divider */}
              <div className="border-t border-gray-200" />
              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1 bg-foreground text-background hover:bg-foreground/90 rounded-md gap-2"
                  variant="default"
                  size="sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-md gap-1 bg-transparent"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-md gap-1 bg-transparent"
                >
                  <Check className="w-4 h-4" />
                  Verify
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
}
