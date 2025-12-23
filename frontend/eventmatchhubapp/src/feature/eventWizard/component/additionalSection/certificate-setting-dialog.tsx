// "use client"

// import { useState, useEffect } from "react"
// import { Dialog, DialogContent } from "@/app/components/ui/dialog"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
// import { Textarea } from "@/app/components/ui/textarea"
// import { Award, Trophy } from "lucide-react"
// import { validateCertificate } from "@/lib/utils/validation"
// import type { CertificateFormData, CertificateType } from "@/lib/types/certificate"

// interface CertificateSettingsDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onSave: (data: CertificateFormData) => void
// }

// export function CertificateSettingsDialog({ open, onOpenChange, onSave }: CertificateSettingsDialogProps) {
//   const [selectedType, setSelectedType] = useState<CertificateType>("completion")
//   const [organizationName, setOrganizationName] = useState("")
//   const [description, setDescription] = useState("")
//   const [issueDate, setIssueDate] = useState("")
//   const [organizerDirector, setOrganizerDirector] = useState("")


//   const [errors, setErrors] = useState<Record<string, string>>({})


//   const resetForm = () => {
//     setSelectedType("completion")
//     setOrganizationName("")
//     setDescription("")
//     const today = new Date()
//     const yyyy = today.getFullYear()
//     const mm = String(today.getMonth() + 1).padStart(2, "0")
//     const dd = String(today.getDate()).padStart(2, "0")
//     setIssueDate(`${yyyy}-${mm}-${dd}`)

//     setOrganizerDirector("")
//     setErrors({})  
//   }

  
//   const handleSave = () => {
//   const validation = validateCertificate({
//     type: selectedType,
//     organizationName,
//     description,
//     issueDate,
//     organizerDirector,
//   })

//   if (validation.length > 0) {
//     const formatted: Record<string, string> = {}
//     validation.forEach(err => (formatted[err.field] = err.message))
//     setErrors(formatted)
//     return
//   }

//   onSave({
//     type: selectedType,
//     organizationName,
//     description,
//     issueDate,
//     organizerDirector,
//   })
// }


//   const certificateTypes = [
//     { type: "completion" as CertificateType, title: "Completion", subtitle: "Award for completing an event", icon: Award },
//     { type: "appreciation" as CertificateType, title: "Appreciation", subtitle: "Award for showing appreciation", icon: Trophy },
//   ]

//   return (
//       <Dialog
//         open={open}
//         onOpenChange={(isOpen) => {
//           // If dialog is closing
//           if (!isOpen) {
//             resetForm()   // reset BEFORE closing
//           }
//           onOpenChange(isOpen)
//         }}
//       >
  

//     <DialogContent className="w-[90vw] max-w-[90vw] max-h-[90vh] overflow-y-auto p-8">
//         {/* Header */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-semibold text-gray-900">Certificate</h2>
//           <p className="text-sm text-gray-600 mt-1">Create custom certificates for your event attendees</p>
//         </div>

//         <div className="flex gap-6">
//           {/* Left Column - Certificate Type & Details */}
//           <div className="flex-[0.5] space-y-6">
//             {/* Certificate Type */}
//             <div>
//               <h3 className="text-base font-semibold text-gray-900 mb-1">Certificate Type</h3>
//               <p className="text-sm text-gray-600 mb-4">Choose a certificate type</p>
//               <div className="space-y-3">
//                 {certificateTypes.map((cert) => {
//                   const Icon = cert.icon
//                   const isSelected = selectedType === cert.type
//                   return (
//                     <button
//                       key={cert.type}
//                       onClick={() => setSelectedType(cert.type)}
//                       className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
//                         isSelected
//                           ? "bg-indigo-600 border-indigo-600 text-white"
//                           : "bg-white border-gray-200 text-gray-900 hover:border-indigo-300"
//                       }`}
//                     >
//                       <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-indigo-600"}`} />
//                       <div>
//                         <div className={`font-semibold ${isSelected ? "text-white" : "text-gray-900"}`}>
//                           {cert.title}
//                         </div>
//                         <div className={`text-sm ${isSelected ? "text-indigo-100" : "text-gray-600"}`}>
//                           {cert.subtitle}
//                         </div>
//                       </div>
//                     </button>
//                   )
//                 })}
//               </div>
//             </div>

//             {/* Certificate Details */}
//             <div className="space-y-4">
//               <div>
//                 <Label className="text-sm font-medium text-gray-900">Organization Name</Label>
//                 <Input
//                   placeholder="Enter organization name"
//                   value={organizationName}
//                   onChange={(e) => setOrganizationName(e.target.value)}
//                   className="mt-1"
//                 />
//                 {errors.organizationName && (
//                   <p className="text-red-500 text-sm mt-1">{errors.organizationName}</p>
//                 )}
//               </div>

//               <div>
//                 <Label className="text-sm font-medium text-gray-900">Description</Label>
//                 <Textarea
//                   placeholder="Enter certificate description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="mt-1 min-h-[80px] resize-none"
//                 />
//               {errors.description && (
//                 <p className="text-red-500 text-sm mt-1">{errors.description}</p>
//               )}
//               </div>


//               <div>
//                 <Label className="text-sm font-medium text-gray-900">Issue Date</Label>
//                 <Input
//                   type="date"
//                   value={issueDate}
//                   onChange={(e) => setIssueDate(e.target.value)}
//                   className="mt-1"
//                 />
//               {errors.issueDate && (
//                 <p className="text-red-500 text-sm mt-1">{errors.issueDate}</p>
//               )}
//               </div>


//               <div>
//                 <Label className="text-sm font-medium text-gray-900">Organizer Director</Label>
//                 <Input
//                   placeholder="Enter organizer director"
//                   value={organizerDirector}
//                   onChange={(e) => setOrganizerDirector(e.target.value)}
//                   className="mt-1"
//                 />
//               {errors.organizerDirector && (
//                 <p className="text-red-500 text-sm mt-1">{errors.organizerDirector}</p>
//               )}
//               </div>


//             </div>
//           </div>

//           {/* Right Column - Template Placeholder */}
//           <div className="flex-[0.5] space-y-4">
//             <h3 className="text-base font-semibold text-gray-900 mb-1">
//               Template
//             </h3>
//             <div className="p-4 border rounded-lg bg-gray-50 text-gray-500 text-center">
//               {selectedType === "completion"
//                 ? "Completion template - Updated soon"
//                 : "Appreciation template - Updated soon"}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
//         <Button
//           variant="outline"
//           onClick={() => {
//             resetForm();        // ← reset first
//             onOpenChange(false) // ← then close dialog
//           }}
//         >
//           Cancel
//         </Button>

//           <Button
//             onClick={handleSave}
//             className="bg-indigo-600 hover:bg-indigo-700 px-8">
//             Save
//           </Button>
//         </div>

//       </DialogContent>
//     </Dialog>
//   )
// }




// feature/eventWizard/component/additionalSection/certificate-setting-dialog.tsx

"use client";

import { useState, useEffect } from "react";
import { X, Trophy, Award } from "lucide-react";
import type { CertificateFormData, CertificateType } from "@/lib/types/certificate";

interface CertificateSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: CertificateFormData) => void;
}

export function CertificateSettingsDialog({
  open,
  onOpenChange,
  onSave,
}: CertificateSettingsDialogProps) {
  const [certificateType, setCertificateType] = useState<CertificateType>("completion");
  const [organizationName, setOrganizationName] = useState("");
  const [description, setDescription] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [organizerDirector, setOrganizerDirector] = useState("");

  // Load dummy data when opened
  useEffect(() => {
    if (open) {
      setCertificateType("completion");
      setOrganizationName("Cambodia Academy of Digital Technology (CADT)");
      setDescription("This certificate is awarded in recognition of successful completion and outstanding participation in the event.");
      setIssueDate("2025-12-23");
      setOrganizerDirector("Livita Touch");
    }
  }, [open]);

  const handleSave = () => {
    onSave({
      type: certificateType,
      organizationName,
      description,
      issueDate,
      organizerDirector,
    });
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
        onClick={handleClose}
      />

      {/* Modal - Full Width Style */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-300">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Certificate</h2>
              <p className="text-sm text-gray-600 mt-1">
                Create custom certificates for your event attendees
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Left Column: Type & Details */}
              <div className="space-y-8">
                {/* Certificate Type */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Certificate Type
                  </h3>
                  <p className="text-sm text-gray-600 mb-5">Choose a certificate type</p>
                  <div className="space-y-4">
                    <button
                      onClick={() => setCertificateType("completion")}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                        certificateType === "completion"
                          ? "border-purple-600 bg-purple-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            certificateType === "completion"
                              ? "bg-purple-600 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Completion</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Award for completing an event
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setCertificateType("appreciation")}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                        certificateType === "appreciation"
                          ? "border-purple-600 bg-purple-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            certificateType === "appreciation"
                              ? "bg-purple-600 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Appreciation</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Award for participating in an event
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Certificate Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-6">
                    Certificate Details
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issue Date
                      </label>
                      <input
                        type="date"
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organizer / Director
                      </label>
                      <input
                        type="text"
                        value={organizerDirector}
                        onChange={(e) => setOrganizerDirector(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Template Preview */}
              <div>
                <div className="sticky top-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Template <span className="text-red-500">*</span>
                  </h3>

                  {/* Certificate Preview */}
                  <div className="bg-gray-50 rounded-2xl p-10 border-2 border-dashed border-gray-300 relative">

                    {/* Certificate Content */}
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-800 mb-6">
                        Certificate of {certificateType === "completion" ? "Completion" : "Appreciation"}
                      </h1>
                      <p className="text-xl text-gray-700 mb-8">
                        This certificate is proudly presented to
                      </p>
                      <div className="h-12 border-b-2 border-gray-400 mx-auto w-80 mb-8" />
                      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                        {description || "For successfully completing the event"}
                      </p>
                      <p className="text-2xl font-semibold text-purple-700 mb-12">
                        AI & Machine Learning Summit 2025
                      </p>

                      <div className="flex justify-between items-end text-sm text-gray-600">
                        <div>
                          <p>Issued on</p>
                          <p className="font-medium">
                            {issueDate ? new Date(issueDate).toLocaleDateString("en-GB") : "23/12/2025"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p>Issued by</p>
                          <p className="font-medium">
                            {organizationName || "Cambodia Academy of Digital Technology"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-4">
                    Preview updates automatically as you make changes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-end">
            <button
              onClick={handleSave}
              className="px-10 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}