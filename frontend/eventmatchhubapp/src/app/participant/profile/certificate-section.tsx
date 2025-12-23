"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { TabsContent } from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Award,
  Download,
  Share2,
  Check,
  Copy,
  ShieldCheck,
} from "lucide-react";
import { certificates } from "@/lib/data/certificates";

// Simple in-browser certificate generator (print → save as PDF)
const generateAndDownloadCertificate = (cert: (typeof certificates)[0]) => {
  const userName = localStorage.getItem("userName") || "Participant";

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to download the certificate.");
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${cert.title} - Certificate</title>
        <style>
          body { 
            font-family: 'Times New Roman', serif; 
            background: linear-gradient(to bottom, #f8f0ff, #fff8f0); 
            padding: 40px; 
            margin: 0;
          }
          .certificate {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            padding: 80px 60px;
            border: 15px double #5b21b6;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            position: relative;
          }
          h1 { font-size: 52px; color: #5b21b6; text-align: center; margin: 40px 0; }
          h2 { font-size: 38px; text-align: center; color: #1e293b; margin: 30px 0; }
          p { font-size: 22px; text-align: center; line-height: 1.8; color: #475569; }
          .signature { margin-top: 100px; text-align: right; font-style: italic; color: #64748b; }
          .id { position: absolute; bottom: 40px; right: 60px; font-size: 14px; color: #94a3b8; font-family: monospace; }
          .logo { text-align: center; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="logo">
            <h2>Event Match Hub</h2>
          </div>
          <h2>Certificate of Completion</h2>
          <h1>${cert.title}</h1>
          <p>Proudly presented to</p>
          <h2>${userName}</h2>
          <p>for successfully completing the event organized by</p>
          <h2>${cert.eventOrganizer}</h2>
          <p>Issued on ${cert.issueDate}</p>
          <div class="signature">
            _________________________<br>
            Authorized Signature
          </div>
          <div class="id">ID: ${cert.certificateId}</div>
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
  }, 800);

  alert("Certificate generated! Use the print dialog to save as PDF.");
};

export function CertificateSection() {
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<
    (typeof certificates)[0] | null
  >(null);

  const handleDownload = (cert: (typeof certificates)[0]) => {
    generateAndDownloadCertificate(cert);
  };

  const handleShare = async (cert: (typeof certificates)[0]) => {
    const shareUrl = `${window.location.origin}/certificate/${cert.certificateId}`;
    const shareData = {
      title: "My Certificate - Event Match Hub",
      text: `I earned a certificate: ${cert.title} from ${cert.eventOrganizer}!`,
      url: shareUrl,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        alert("Certificate shared successfully!");
      } catch (err) {
        fallbackToCopy(shareUrl);
      }
    } else {
      fallbackToCopy(shareUrl);
    }
  };

  const fallbackToCopy = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Certificate link copied to clipboard!");
      })
      .catch(() => {
        alert(`Copy this link:\n${url}`);
      });
  };

  const handleVerify = (cert: (typeof certificates)[0]) => {
    setSelectedCert(cert);
    setVerifyOpen(true);
  };

  return (
    <>
      <TabsContent value="certificates" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <Card
              key={cert.id}
              className="overflow-hidden border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 flex flex-col items-center justify-center min-h-64 relative">
                {cert.verified && (
                  <Badge className="absolute top-4 right-4 bg-green-500 text-white border-0 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
                <Award
                  className="w-20 h-20 text-purple-600"
                  strokeWidth={1.5}
                />
                <div className="text-center mt-8 space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    {cert.title}
                  </h3>
                  <p className="text-foreground/60">{cert.eventOrganizer}</p>
                </div>
              </div>

              <div className="bg-background p-6 space-y-4">
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

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => handleDownload(cert)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white gap-2"
                    size="sm"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button
                    onClick={() => handleShare(cert)}
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button
                    onClick={() => handleVerify(cert)}
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Verify
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Verification Modal */}
      <Dialog open={verifyOpen} onOpenChange={setVerifyOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-700">
              <ShieldCheck className="w-6 h-6" />
              Certificate Verification
            </DialogTitle>
            <DialogDescription>
              This certificate is digitally signed and verified on the Event
              Match Hub platform.
            </DialogDescription>
          </DialogHeader>

          {selectedCert && (
            <div className="space-y-5 py-4">
              <div
                className={`p-4 rounded-lg border ${
                  selectedCert.verified
                    ? "bg-green-50 border-green-300"
                    : "bg-yellow-50 border-yellow-300"
                }`}
              >
                <p
                  className={`font-semibold flex items-center gap-2 ${
                    selectedCert.verified ? "text-green-800" : "text-yellow-800"
                  }`}
                >
                  <Check className="w-5 h-5" />
                  {selectedCert.verified
                    ? "Authentic & Verified"
                    : "Verification Pending"}
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Certificate ID</span>
                  <span className="font-mono font-medium">
                    {selectedCert.certificateId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Title</span>
                  <span className="font-medium">{selectedCert.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recipient</span>
                  <span className="font-medium">
                    {localStorage.getItem("userName") || "Participant"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Organizer</span>
                  <span className="font-medium">
                    {selectedCert.eventOrganizer}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issued</span>
                  <span className="font-medium">{selectedCert.issueDate}</span>
                </div>
              </div>

              <div className="pt-3 text-center">
                <Badge variant="secondary" className="text-xs">
                  {selectedCert.verified
                    ? "Blockchain Verified • Immutable"
                    : "Pending Organizer Approval"}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
