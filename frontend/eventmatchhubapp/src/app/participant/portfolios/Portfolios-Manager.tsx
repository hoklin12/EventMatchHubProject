

"use client";
import React, { useState, useRef } from "react";
import { Plus, Upload, X, Download, Share2, Eye, Edit2, Trash2 } from "lucide-react";
import FolderCopyMUI from '@mui/icons-material/FolderCopy';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";
import { useRouter } from "next/navigation";


export default function PortfoliosManager() {
  const [showForm, setShowForm] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedCerts, setSelectedCerts] = useState<number[]>([]);
  const router = useRouter();

  // Form refs
  const titleRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const certificates = [
    { id: 1, name: "Design Thinking Bootcamp", issuer: "Design Academy", date: "Feb 15, 2025" },
    { id: 2, name: "Marketing Masterclass", issuer: "Design Academy", date: "Feb 15, 2025" },
    { id: 3, name: "AI For Education Competition", issuer: "Design Academy", date: "Feb 15, 2025" },
    { id: 4, name: "AI & Machine Learning Conference", issuer: "Design Academy", date: "Feb 15, 2025" },
  ];

  // Dynamic portfolios list — new ones go to the top
  const [portfolios, setPortfolios] = useState([
    {
      id: 1,
      title: "Web Developer Portfolio",
      description: "Showcase of full-stack web development projects",
      year: "2023-11-24",
      certificates: 3,
      published: true,
    },
    {
      id: 2,
      title: "UX/UI Design Portfolio",
      description: "Collection of design systems and interface work",
      year: "2025-11-24",
      certificates: 3,
      published: true,
    },
    {
      id: 3,
      title: "Product Manager Portfolio",
      description: "Strategic initiatives and product launches",
      year: "2025-11-24",
      certificates: 3,
      published: true,
    },
  ]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = Array.from(e.dataTransfer.files);
    if (dropped.length > 0) {
      setFiles(prev => [...prev, ...dropped]);
      setShowForm(true);
    }
  };

  const handleClickBox = () => setShowForm(true);

  const removeFile = (i: number) => setFiles(files.filter((_, idx) => idx !== i));

  // Save Portfolio Function
  const handleSavePortfolio = () => {
    const title = titleRef.current?.value || "My New Portfolio";
    const description = descRef.current?.value || "A collection of my achievements and certificates";

    const newPortfolio = {
      id: Date.now(),
      title,
      description,
      year: new Date().toISOString().split('T')[0],
      certificates: selectedCerts.length,
      published: true,
    };

    // Add to top of the list
    setPortfolios(prev => [newPortfolio, ...prev]);

    // Reset everything
    setShowForm(false);
    setFiles([]);
    setSelectedCerts([]);
    if (titleRef.current) titleRef.current.value = "";
    if (bioRef.current) bioRef.current.value = "";
    if (descRef.current) descRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/50 to-white pb-12">
      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Portfolios Manager</h1>
        <br />
        <p className="text-gray-600 mb-12">
          Create a professional portfolio to showcase your achievements and get more opportunities
        </p>

        <Card className="mb-16 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <FolderCopyMUI className="h-6 w-6 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-900">Add Your Portfolio</h2>
            </div>
            <p className="text-gray-600 text-sm mb-8">
              Showcase your skills and achievements to event organizers
            </p>

            {/* Initial Drag Box */}
            {!showForm && files.length === 0 && (
              <div className="w-full">
                <div
                  className={`border-2 border-dashed rounded-2xl p-20 text-center cursor-pointer transition-all duration-300
                    ${isDragOver 
                      ? "border-purple-500 bg-purple-50/80 shadow-2xl scale-105" 
                      : "border-purple-300 bg-purple-50/30 hover:bg-purple-50/50"
                    }`}
                  onClick={handleClickBox}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-4xl font-light mb-6
                      ${isDragOver ? "bg-purple-700" : "bg-purple-600"}`}>
                      {isDragOver ? <Upload className="h-8 w-8" /> : "+"}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {isDragOver ? "Drop files here" : "Create New Portfolio"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Drag & drop your certificates, resume, or projects here<br />
                      <span className="text-purple-600 font-medium">or click to browse</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Form */}
            {(showForm || files.length > 0) && (
              <div className="space-y-10">
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <FolderCopyMUI className="h-6 w-6 text-gray-700" />
                      <h3 className="text-xl font-semibold">Portfolio Information</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">Create your professional portfolio</p>

                    <div className="grid gap-5">
                      <div>
                        <Label>Portfolio Title</Label>
                        <Input ref={titleRef} placeholder="e.g. My Professional Portfolio" className="mt-2" />
                      </div>
                      <div>
                        <Label>Bio</Label>
                        <Textarea ref={bioRef} placeholder="Tell us about yourself..." className="mt-2 min-h-24" />
                      </div>
                      <div>
                        <Label>Portfolio Description</Label>
                        <Textarea ref={descRef} placeholder="Describe your professional goals and expertise..." className="mt-2 min-h-32" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Uploaded Files */}
                {files.length > 0 && (
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                    <p className="font-medium mb-3">Uploaded Files ({files.length})</p>
                    {files.map((file, i) => (
                      <div key={i} className="flex items-center justify-between bg-white rounded-lg p-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded flex items-center justify-center">
                            <Upload className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button onClick={() => removeFile(i)} className="text-red-500">
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Certificates */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <CardGiftcardIcon className="h-6 w-6 text-gray-700" />
                    <h3 className="text-xl font-semibold">Certificates</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-6">Select the certificates you have earned to include in your portfolio</p>

                  <div className="space-y-4 mt-6">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between bg-white rounded-xl p-5 shadow-sm hover:shadow transition">
                        <div className="flex items-center gap-4 flex-1">
                          <Checkbox
                            id={`cert-${cert.id}`}
                            checked={selectedCerts.includes(cert.id)}
                            onCheckedChange={(c) => {
                              if (c) setSelectedCerts(prev => [...prev, cert.id]);
                              else setSelectedCerts(prev => prev.filter(id => id !== cert.id));
                            }}
                          />
                          <Label htmlFor={`cert-${cert.id}`} className="cursor-pointer flex-1">
                            <p className="font-medium text-gray-900">{cert.name}</p>
                            <p className="text-sm text-gray-500">
                              Issued by {cert.issuer} • {cert.date}
                            </p>
                          </Label>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Verified
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Download className="h-5 w-5" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Share2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <Button variant="outline" onClick={() => {
                    setShowForm(false);
                    setFiles([]);
                    setSelectedCerts([]);
                  }}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleSavePortfolio}
                  >
                    Save Portfolio
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Your Portfolios — New ones appear at the top */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Your Portfolios</h2>
        <div className="grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((p) => (
            <Card key={p.id} className="hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900">{p.title}</h3>
                  <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs rounded-full">Published</span>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{p.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-5">
                  <span>{p.year}</span>
                  <span>•</span>
                  <span>{p.certificates} certificates</span>
                </div>
                <div className="flex gap-2">
                <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => router.push(`/participant/portfolios/${p.id}`)}  
                >
                <Eye className="h-4 w-4 mr-1" /> View
                </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit2 className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}