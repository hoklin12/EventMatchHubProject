// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Globe,
//   Lock,
//   Calendar,
//   MapPin,
//   Users,
//   Tag,
//   Edit2,
// } from "lucide-react";
// import EventDetailSidebar from "../detailslidebar";

// interface PublishSettingsProps {
//   onBack?: () => void;
//   currentStep: string;
// }

// export default function PublishSettings({
//   onBack,
//   currentStep,
// }: PublishSettingsProps) {
//   const router = useRouter();

//   const [isPublic, setIsPublic] = useState(true);
//   const [publishOption, setPublishOption] = useState<"now" | "later">("now");

//   const handlePublish = () => {
//     // Here you would normally save the event data to your backend
//     // For now, we just navigate to the preview page
//     router.push("/event/preview"); // Adjust route as needed
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="flex">
//         <EventDetailSidebar activeStep={currentStep} />

//         <main className="flex-1 lg:ml-72 min-h-screen">
//           <div className="p-6 lg:p-10">
//             <div className="max-w-4xl mx-auto">
//               {/* Main Card */}
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//                 {/* Header */}
//                 <div className="px-8 lg:px-10 py-10 border-b border-gray-100">
//                   <h1 className="text-3xl font-bold text-gray-900">
//                     You're nearly there!
//                   </h1>
//                   <p className="text-gray-600 mt-3 text-lg">
//                     Review your details before making it visible to everyone.
//                   </p>
//                 </div>

//                 {/* Event Preview Card */}
//                 <div className="px-8 lg:px-10 py-10">
//                   <div className="bg-gray-50 rounded-2xl p-6 flex flex-col md:flex-row gap-6 border border-gray-200">
//                     {/* Event Banner Image */}
//                     <div className="md:w-80 flex-shrink-0">
//                       <div className="aspect-[3/1] bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl overflow-hidden relative">
//                         <div className="absolute inset-0 flex items-center justify-center">
//                           <div className="text-white text-center">
//                             <h2 className="text-2xl font-bold">
//                               AI & Machine Learning Summit 2025
//                             </h2>
//                             <p className="mt-2 text-lg opacity-90">TECH SUMMIT</p>
//                           </div>
//                         </div>
//                         {/* Mock panel photo overlay */}
//                         <div className="absolute bottom-0 left-0 right-0 p-4">
//                           <div className="bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
//                             <div className="flex gap-2 justify-center">
//                               {[1, 2, 3, 4].map((i) => (
//                                 <div
//                                   key={i}
//                                   className="w-16 h-20 bg-gray-300 rounded-lg border-2 border-white shadow"
//                                 />
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Event Info */}
//                     <div className="flex-1">
//                       <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                         AI & Machine Learning Summit 2025
//                       </h2>

//                       <div className="space-y-3 text-gray-700">
//                         <div className="flex items-center gap-3">
//                           <Calendar className="w-5 h-5 text-gray-500" />
//                           <span>Monday, October 22, 2025</span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                           <MapPin className="w-5 h-5 text-gray-500" />
//                           <span>CADT</span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                           <Users className="w-5 h-5 text-gray-500" />
//                           <span>200 attendees</span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                           <Tag className="w-5 h-5 text-gray-500" />
//                           <span>120 interested</span>
//                         </div>
//                       </div>

//                       <div className="mt-6 flex justify-end">
//                         <button className="text-blue-600 font-medium flex items-center gap-2 hover:text-blue-700">
//                           Preview
//                           <Edit2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Settings Section */}
//                 <div className="px-8 lg:px-10 pb-10 space-y-10">
//                   {/* Event Type & Category */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Event Type <span className="text-red-500">*</span>
//                       </label>
//                       <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500">
//                         <option>Seminar</option>
//                         <option>Conference</option>
//                         <option>Workshop</option>
//                         <option>Webinar</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Category <span className="text-red-500">*</span>
//                       </label>
//                       <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500">
//                         <option>Technology</option>
//                         <option>Business</option>
//                         <option>Education</option>
//                         <option>Health</option>
//                       </select>
//                     </div>
//                   </div>

//                   {/* Keywords */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Keywords
//                     </label>
//                     <div className="flex flex-wrap gap-2 mb-3">
//                       <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm">
//                         tech
//                         <button className="ml-1 text-gray-500 hover:text-gray-700">
//                           ×
//                         </button>
//                       </span>
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="Add search keywords that highlight your event's topic, theme, and more"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                     <p className="text-sm text-gray-500 mt-2 text-right">
//                       1/10 Tags
//                     </p>
//                   </div>

//                   {/* Organizer */}
//                   <div className="flex items-center gap-4 py-4">
//                     <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-dashed border-gray-400" />
//                     <div>
//                       <p className="text-sm text-gray-600">Organized by</p>
//                       <p className="font-medium text-gray-900">Ms Touch Livita</p>
//                     </div>
//                   </div>

//                   {/* Event Setting - Public/Private */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                       Event Setting
//                     </h3>
//                     <div className="flex items-center justify-between py-4">
//                       <div>
//                         <p className="font-medium text-gray-900">
//                           Make your event public?
//                         </p>
//                         <p className="text-sm text-gray-600 mt-1">
//                           {isPublic
//                             ? "Public: shared for all"
//                             : "Private: shared for selected audience"}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => setIsPublic(!isPublic)}
//                         className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
//                           isPublic ? "bg-purple-600" : "bg-gray-300"
//                         }`}
//                       >
//                         <span
//                           className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
//                             isPublic ? "translate-x-7" : "translate-x-1"
//                           }`}
//                         />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Publishing Options */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                       Publishing Options
//                     </h3>
//                     <div className="flex gap-4">
//                       <button
//                         onClick={() => setPublishOption("now")}
//                         className={`flex-1 px-6 py-4 rounded-xl border-2 font-medium transition-all ${
//                           publishOption === "now"
//                             ? "border-purple-600 bg-purple-50 text-purple-700"
//                             : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
//                         }`}
//                       >
//                         Publish Now
//                       </button>
//                       <button
//                         onClick={() => setPublishOption("later")}
//                         className={`flex-1 px-6 py-4 rounded-xl border-2 font-medium transition-all ${
//                           publishOption === "later"
//                             ? "border-purple-600 bg-purple-50 text-purple-700"
//                             : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
//                         }`}
//                       >
//                         Schedule For Later
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bottom Navigation - Right Aligned */}
//                 <div className="px-8 lg:px-10 py-8 border-t border-gray-100 bg-gray-50">
//                   <div className="flex justify-end items-center gap-4">
//                     <button
//                       onClick={onBack}
//                       className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
//                     >
//                       Back
//                     </button>
//                     <button
//                       onClick={handlePublish}
//                       className="px-10 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition"
//                     >
//                       Publish
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Globe,
  Lock,
  Calendar,
  MapPin,
  Users,
  Tag,
  Edit2,
} from "lucide-react";
import EventDetailSidebar from "../detailslidebar";

interface PublishSettingsProps {
  onBack?: () => void;
  currentStep: string;
}

export default function PublishSettings({
  onBack,
  currentStep,
}: PublishSettingsProps) {
  const router = useRouter();

  const [isPublic, setIsPublic] = useState(true);
  const [publishOption, setPublishOption] = useState<"now" | "later">("now");

  const handlePublish = () => {
    router.push("/organizer/event/preview");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <EventDetailSidebar activeStep={currentStep} />

        <main className="flex-1 lg:ml-72 min-h-screen">
          <div className="p-6 lg:p-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-8 lg:px-10 py-10 border-b border-gray-100">
                  <h1 className="text-3xl font-bold text-gray-900">
                    You're nearly there!
                  </h1>
                  <p className="text-gray-600 mt-3 text-lg">
                    Review your details before making it visible to everyone.
                  </p>
                </div>

                <div className="px-8 lg:px-10 py-10">
                  <div className="bg-gray-50 rounded-2xl p-6 flex flex-col md:flex-row gap-6 border border-gray-200">
                    <div className="md:w-80 flex-shrink-0">
                      <div className="aspect-[3/1] bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white text-center">
                            <h2 className="text-2xl font-bold">
                              AI & Machine Learning Summit 2025
                            </h2>
                            <p className="mt-2 text-lg opacity-90">TECH SUMMIT</p>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
                            <div className="flex gap-2 justify-center">
                              {[1, 2, 3, 4].map((i) => (
                                <div
                                  key={i}
                                  className="w-16 h-20 bg-gray-300 rounded-lg border-2 border-white shadow"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        AI & Machine Learning Summit 2025
                      </h2>

                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-gray-500" />
                          <span>Monday, October 22, 2025</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-gray-500" />
                          <span>CADT</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-gray-500" />
                          <span>200 attendees</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Tag className="w-5 h-5 text-gray-500" />
                          <span>120 interested</span>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button className="text-blue-600 font-medium flex items-center gap-2 hover:text-blue-700">
                          Preview
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-8 lg:px-10 pb-10 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Type <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>Seminar</option>
                        <option>Conference</option>
                        <option>Workshop</option>
                        <option>Webinar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>Technology</option>
                        <option>Business</option>
                        <option>Education</option>
                        <option>Health</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keywords
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm">
                        tech
                        <button className="ml-1 text-gray-500 hover:text-gray-700">
                          ×
                        </button>
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="Add search keywords that highlight your event's topic, theme, and more"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <p className="text-sm text-gray-500 mt-2 text-right">
                      1/10 Tags
                    </p>
                  </div>

                  <div className="flex items-center gap-4 py-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-dashed border-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Organized by</p>
                      <p className="font-medium text-gray-900">Ms Touch Livita</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Event Setting
                    </h3>
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          Make your event public?
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {isPublic
                            ? "Public: shared for all"
                            : "Private: shared for selected audience"}
                        </p>
                      </div>
                      <button
                        onClick={() => setIsPublic(!isPublic)}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                          isPublic ? "bg-purple-600" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            isPublic ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Publishing Options
                    </h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setPublishOption("now")}
                        className={`flex-1 px-6 py-4 rounded-xl border-2 font-medium transition-all ${
                          publishOption === "now"
                            ? "border-purple-600 bg-purple-50 text-purple-700"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        Publish Now
                      </button>
                      <button
                        onClick={() => setPublishOption("later")}
                        className={`flex-1 px-6 py-4 rounded-xl border-2 font-medium transition-all ${
                          publishOption === "later"
                            ? "border-purple-600 bg-purple-50 text-purple-700"
                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        Schedule For Later
                      </button>
                    </div>
                  </div>
                </div>

                <div className="px-8 lg:px-10 py-8 border-t border-gray-100 bg-gray-50">
                  <div className="flex justify-end items-center gap-4">
                    <button
                      onClick={onBack}
                      className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePublish}
                      className="px-10 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition"
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}