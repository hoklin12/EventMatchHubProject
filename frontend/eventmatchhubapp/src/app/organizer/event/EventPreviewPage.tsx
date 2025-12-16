// // components/EventPreviewPage.tsx
// "use client";

// import { useRouter } from "next/navigation";
// import { Calendar, MapPin, Users, Share2, ArrowLeft } from "lucide-react";

// export default function EventPreviewPage() {
//   const router = useRouter();

//   const handleClosePreview = () => {
//     router.back(); // or router.push("/event-management") if preferred
//   };

//   const handleEditEvent = () => {
//     // Navigate back to the event creation/edit flow
//     router.push("/event/edit"); // Adjust to your actual edit route
//   };

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: "AI & Machine Learning Summit 2025",
//           text: "Check out this amazing event!",
//           url: window.location.href,
//         });
//       } catch (err) {
//         console.log("Share canceled", err);
//       }
//     } else {
//       // Fallback: copy to clipboard
//       navigator.clipboard.writeText(window.location.href);
//       alert("Link copied to clipboard!");
//     }
//   };

//   const handleReserveSpot = () => {
//     alert("Reserve spot clicked! (Redirect to registration/tickets)");
//     // In real app: router.push("/register") or open ticket modal
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Bar - All actions on the right */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4 pt-24">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <button
//             onClick={handleClosePreview}
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span className="text-sm font-medium">Close preview</span>
//           </button>

//           <div className="flex items-center gap-6">
//             {/* Status */}
//             <div className="flex items-center gap-3">
//               <div className="w-3 h-3 rounded-full bg-blue-600" />
//               <span className="text-sm font-medium text-blue-600">
//                 Status: Draft
//               </span>
//             </div>

//             {/* Edit Event Button */}
//             <button
//               onClick={handleEditEvent}
//               className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
//             >
//               Edit Event
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="pt-8">
//         {/* Hero Banner */}
//         <div className="relative h-96 md:h-[500px] overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900">
//             <div className="absolute inset-0 bg-black/30" />
//             <div className="absolute inset-0 flex items-center justify-center">
//               <h1 className="text-5xl md:text-7xl font-bold text-white text-center uppercase tracking-wider">
//                 TIMMUS HCHET
//               </h1>
//             </div>
//           </div>

//           {/* Panel Photo Overlay */}
//           <div className="absolute bottom-0 left-0 right-0 p-8">
//             <div className="max-w-7xl mx-auto">
//               <div className="flex justify-center gap-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div
//                     key={i}
//                     className="w-32 h-48 md:w-40 md:h-60 bg-gray-300 rounded-lg border-4 border-white shadow-2xl -translate-y-12"
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Event Card */}
//         <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">
//           <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
//             <div className="flex flex-col md:flex-row justify-between items-start gap-6">
//               <div>
//                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//                   AI & Machine Learning Summit 2025
//                 </h2>

//                 <div className="mt-6 space-y-3">
//                   <div className="flex items-center gap-3 text-gray-700">
//                     <Calendar className="w-5 h-5" />
//                     <span className="font-medium">
//                       Monday, October 22, 2025, 10:00AM
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3 text-gray-700">
//                     <MapPin className="w-5 h-5" />
//                     <span>Cambodia Academy of Digital Technology</span>
//                   </div>
//                 </div>

//                 {/* Organizer */}
//                 <div className="mt-8 flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white shadow-md" />
//                   <div>
//                     <p className="text-sm text-gray-600">Organized by</p>
//                     <p className="font-medium text-gray-900">Ms Touch Livita</p>
//                     <button className="text-sm text-blue-600 hover:underline">
//                       View Organizer Profile
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* CTA Buttons */}
//               <div className="flex flex-col gap-4">
//                 <button
//                   onClick={handleReserveSpot}
//                   className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
//                 >
//                   Reserve a spot
//                 </button>
//                 <button
//                   onClick={handleShare}
//                   className="flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900"
//                 >
//                   <Share2 className="w-5 h-5" />
//                   <span className="font-medium">Share</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content Sections */}
//         <div className="max-w-5xl mx-auto px-6 mt-12 space-y-12 pb-20">
//           {/* Overview */}
//           <section>
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Overview</h3>
//             <p className="text-gray-700 leading-relaxed">
//               Discover how artificial intelligence is changing the world around us at the AI & Machine Learning Summit 2025.
//             </p>
//             <p className="text-gray-700 leading-relaxed mt-4">
//               From self-driving cars to creative AI tools, this event opens the doors to everyone curious about the power and possibilities of machine learning.
//             </p>
//           </section>

//           {/* Categories */}
//           <section>
//             <h3 className="text-xl font-semibold text-gray-900 mb-4">
//               Event Category
//             </h3>
//             <div className="flex flex-wrap gap-3">
//               <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
//                 Technology
//               </span>
//               <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
//                 Machine Learning
//               </span>
//               <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
//                 Artificial Intelligence
//               </span>
//             </div>
//           </section>

//           {/* Schedule */}
//           <section>
//             <h3 className="text-xl font-semibold text-gray-900 mb-6">
//               Schedule Highlights
//             </h3>
//             <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200">
//               <p className="text-gray-600">
//                 Agenda details will be announced shortly.
//               </p>
//             </div>
//           </section>

//           {/* Speakers */}
//           <section>
//             <h3 className="text-xl font-semibold text-gray-900 mb-6">
//               Feature Speakers
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {[1, 2, 3].map((i) => (
//                 <div
//                   key={i}
//                   className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-200"
//                 >
//                   <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4" />
//                   <h4 className="font-semibold text-gray-900">Mr Lay Vathna</h4>
//                   <p className="text-sm text-gray-600 mt-1">Researcher in AI</p>
//                   <p className="text-sm text-gray-500 mt-3">Description</p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Event Info Grid */}
//           <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                 Event Format
//               </h3>
//               <p className="text-gray-700">In person</p>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                 Refund Policy
//               </h3>
//               <p className="text-gray-700">
//                 Full refunds until March 5, 2025<br />
//                 50% refunds until March 10, 2025
//               </p>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }

// components/EventPreviewPage.tsx
"use client";

import { useRouter } from "next/navigation";
import { Calendar, MapPin, Users, Share2, ArrowLeft } from "lucide-react";

export default function EventPreviewPage() {
  const router = useRouter();

  const handleClosePreview = () => {
    router.push("/organizer/event//publish"); // Go back to Publish Settings
  };

  const handleEditEvent = () => {
    router.push("/organizer/event//create"); // Go to Create Event (first step)
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "AI & Machine Learning Summit 2025",
          text: "Check out this amazing event!",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share canceled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Event link copied to clipboard!");
    }
  };

  const handleReserveSpot = () => {
    alert("Redirecting to registration...");
    // In real app: router.push("/register")
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 pt-24">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleClosePreview}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Close preview</span>
          </button>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-600" />
              <span className="text-sm font-medium text-blue-600">
                Status: Draft
              </span>
            </div>

            <button
              onClick={handleEditEvent}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Edit Event
            </button>
          </div>
        </div>
      </div>

      {/* Rest of your beautiful preview page (unchanged UI) */}
      <div className="pt-8">
        {/* Hero Banner */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900">
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white text-center uppercase tracking-wider">
                TIMMUS HCHET
              </h1>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-center gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-32 h-48 md:w-40 md:h-60 bg-gray-300 rounded-lg border-4 border-white shadow-2xl -translate-y-12"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  AI & Machine Learning Summit 2025
                </h2>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">
                      Monday, October 22, 2025, 10:00AM
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5" />
                    <span>Cambodia Academy of Digital Technology</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white shadow-md" />
                  <div>
                    <p className="text-sm text-gray-600">Organized by</p>
                    <p className="font-medium text-gray-900">Ms Touch Livita</p>
                    <button className="text-sm text-blue-600 hover:underline">
                      View Organizer Profile
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleReserveSpot}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
                >
                  Reserve a spot
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All other sections remain exactly as before */}
        <div className="max-w-5xl mx-auto px-6 mt-12 space-y-12 pb-20">
          <section>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Overview</h3>
            <p className="text-gray-700 leading-relaxed">
              Discover how artificial intelligence is changing the world around us at the AI & Machine Learning Summit 2025.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              From self-driving cars to creative AI tools, this event opens the doors to everyone curious about the power and possibilities of machine learning.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Event Category
            </h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                Technology
              </span>
              <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                Machine Learning
              </span>
              <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                Artificial Intelligence
              </span>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Schedule Highlights
            </h3>
            <div className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-200">
              <p className="text-gray-600">
                Agenda details will be announced shortly.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Feature Speakers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-200"
                >
                  <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4" />
                  <h4 className="font-semibold text-gray-900">Mr Lay Vathna</h4>
                  <p className="text-sm text-gray-600 mt-1">Researcher in AI</p>
                  <p className="text-sm text-gray-500 mt-3">Description</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Event Format
              </h3>
              <p className="text-gray-700">In person</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Refund Policy
              </h3>
              <p className="text-gray-700">
                Full refunds until March 5, 2025<br />
                50% refunds until March 10, 2025
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}