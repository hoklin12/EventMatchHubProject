

// "use client";

// import { useState } from "react";
// import {
//   Plus,
//   FileText,
//   Settings,
//   Users,
//   Calendar,
// } from "lucide-react";
// import EventDetailSidebar from "../detailslidebar";
// import CustomRegistrationFormModal from "./CustomRegistrationFormModal";
// import CertificateModal from "./CertificateModal";
// import SpeakersModal from "./SpeakersModal"; // New import
// import AgendaModal from "./agendaModal";

// interface AdditionalSectionsProps {
//   onBack?: () => void;
//   onContinue?: () => void;
//   currentStep: string;
// }

// export default function AdditionalSections({
//   onBack,
//   onContinue,
//   currentStep,
// }: AdditionalSectionsProps) {
//   // Modal states
//   const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
//   const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
//   const [isSpeakersModalOpen, setIsSpeakersModalOpen] = useState(false);

//   const sections = [
//     {
//       icon: <FileText className="w-5 h-5" />,
//       title: "Customize Registration Form",
//       description: "Add custom fields to collect attendee information",
//     },
//     {
//       icon: <Settings className="w-5 h-5" />,
//       title: "Certificate Settings",
//       description: "Issue certificates to attendees after the event",
//     },
//     {
//       icon: <Users className="w-5 h-5" />,
//       title: "Speakers & Hosts",
//       description: "Feature speakers and hosts on your event page",
//     },
//     {
//       icon: <Calendar className="w-5 h-5" />,
//       title: "Agenda",
//       description: "Build a detailed schedule with sessions and timings",
//     },
//   ];

//   const handleAddClick = (title: string) => {
//     if (title === "Customize Registration Form") {
//       setIsRegistrationModalOpen(true);
//     } else if (title === "Certificate Settings") {
//       setIsCertificateModalOpen(true);
//     } else if (title === "Speakers & Hosts") {
//       setIsSpeakersModalOpen(true);
//     }
//     // Agenda modal can be added later here
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="flex">
//         <EventDetailSidebar activeStep={currentStep} />

//         <main className="flex-1 lg:ml-72 min-h-screen">
//           <div className="p-6 lg:p-10">
//             <div className="max-w-6xl mx-auto">
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//                 {/* Header */}
//                 <div className="px-8 py-10 border-b border-gray-100">
//                   <h1 className="text-2xl font-semibold text-gray-900">
//                     More sections
//                   </h1>
//                   <p className="text-gray-600 mt-2 text-base">
//                     Easily extend your event setup with sections for agenda,
//                     speakers, or attendee preferences.
//                   </p>
//                 </div>

//                 {/* Sections List */}
//                 <div className="px-8 py-10">
//                   <div className="space-y-6">
//                     {sections.map((section, index) => (
//                       <div key={index} className="relative">
//                         {/* Dotted Line Separator (except last) */}
//                         {index < sections.length - 1 && (
//                           <div className="absolute left-6 top-16 bottom-0 w-px border-l-2 border-dashed border-gray-300" />
//                         )}

//                         <div className="flex items-center justify-between gap-6">
//                           <div className="flex items-center gap-5 flex-1">
//                             {/* Icon Circle */}
//                             <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
//                               {section.icon}
//                             </div>

//                             {/* Title & Description */}
//                             <div>
//                               <h3 className="text-lg font-medium text-gray-900">
//                                 {section.title}
//                               </h3>
//                               {section.description && (
//                                 <p className="text-sm text-gray-600 mt-1">
//                                   {section.description}
//                                 </p>
//                               )}
//                             </div>
//                           </div>

//                           {/* Add Button - Works for Registration, Certificate, and Speakers */}
//                           <button
//                             onClick={() => handleAddClick(section.title)}
//                             className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 hover:border-gray-400 transition"
//                           >
//                             Add
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Bottom Navigation */}
//                 <div className="px-8 lg:px-10 py-8 border-t border-gray-100 bg-gray-50">
//                   <div className="flex justify-end items-center gap-4">
//                     <button
//                       onClick={onBack}
//                       className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
//                     >
//                       Back
//                     </button>
//                     <button
//                       onClick={onContinue}
//                       className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium hover:shadow-lg transition"
//                     >
//                       Next
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Registration Form Modal */}
//       <CustomRegistrationFormModal
//         isOpen={isRegistrationModalOpen}
//         onClose={() => setIsRegistrationModalOpen(false)}
//       />

//       {/* Certificate Modal */}
//       <CertificateModal
//         isOpen={isCertificateModalOpen}
//         onClose={() => setIsCertificateModalOpen(false)}
//       />

//       {/* Speakers & Hosts Modal */}
//       <SpeakersModal
//         isOpen={isSpeakersModalOpen}
//         onClose={() => setIsSpeakersModalOpen(false)}
//       />
//       <AgendaModal
//         isOpen={isAgendaModalOpen}
//         onClose={() => setIsAgendaModalOpen(false)}
//       />
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import {
  Plus,
  FileText,
  Settings,
  Users,
  Calendar,
} from "lucide-react";

import EventDetailSidebar from "../detailslidebar";
import CustomRegistrationFormModal from "./CustomRegistrationFormModal";
import CertificateModal from "./CertificateModal";
import SpeakersModal from "./SpeakersModal";
import AgendaModal from "./agendaModal";

interface AdditionalSectionsProps {
  onBack?: () => void;
  onContinue?: () => void;
  currentStep: string;
}

export default function AdditionalSections({
  onBack,
  onContinue,
  currentStep,
}: AdditionalSectionsProps) {
  // Modal states
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isSpeakersModalOpen, setIsSpeakersModalOpen] = useState(false);
  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false); // Added state

  const sections = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Customize Registration Form",
      description: "Add custom fields to collect attendee information",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Certificate Settings",
      description: "Issue certificates to attendees after the event",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Speakers & Hosts",
      description: "Feature speakers and hosts on your event page",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Agenda",
      description: "Build a detailed schedule with sessions and timings",
    },
  ];

  const handleAddClick = (title: string) => {
    if (title === "Customize Registration Form") {
      setIsRegistrationModalOpen(true);
    } else if (title === "Certificate Settings") {
      setIsCertificateModalOpen(true);
    } else if (title === "Speakers & Hosts") {
      setIsSpeakersModalOpen(true);
    } else if (title === "Agenda") {
      setIsAgendaModalOpen(true); // Open Agenda modal
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <EventDetailSidebar activeStep={currentStep} />

        <main className="flex-1 lg:ml-72 min-h-screen">
          <div className="p-6 lg:p-10">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="px-8 py-10 border-b border-gray-100">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    More sections
                  </h1>
                  <p className="text-gray-600 mt-2 text-base">
                    Easily extend your event setup with sections for agenda,
                    speakers, or attendee preferences.
                  </p>
                </div>

                {/* Sections List */}
                <div className="px-8 py-10">
                  <div className="space-y-6">
                    {sections.map((section, index) => (
                      <div key={index} className="relative">
                        {/* Dotted Line Separator (except last) */}
                        {index < sections.length - 1 && (
                          <div className="absolute left-6 top-16 bottom-0 w-px border-l-2 border-dashed border-gray-300" />
                        )}

                        <div className="flex items-center justify-between gap-6">
                          <div className="flex items-center gap-5 flex-1">
                            {/* Icon Circle */}
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
                              {section.icon}
                            </div>

                            {/* Title & Description */}
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {section.title}
                              </h3>
                              {section.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {section.description}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Add Button */}
                          <button
                            onClick={() => handleAddClick(section.title)}
                            className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 hover:border-gray-400 transition"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="px-8 lg:px-10 py-8 border-t border-gray-100 bg-gray-50">
                  <div className="flex justify-end items-center gap-4">
                    <button
                      onClick={onBack}
                      className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={onContinue}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium hover:shadow-lg transition"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <CustomRegistrationFormModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
      />

      <CertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
      />

      <SpeakersModal
        isOpen={isSpeakersModalOpen}
        onClose={() => setIsSpeakersModalOpen(false)}
      />

      <AgendaModal
        isOpen={isAgendaModalOpen}
        onClose={() => setIsAgendaModalOpen(false)}
      />
    </div>
  );
}