// "use client"

// import { useRouter } from "next/navigation"
// import { ChevronLeft } from "lucide-react"
// import { Button } from "@/app/components/ui/button"

// export function BackButton() {
//   const router = useRouter()

//   return (
//     <Button
//       variant="ghost"
//       className="flex items-center gap-2 px-2 py-2 mb-6 text-gray-700 hover:bg-gray-100"
//       onClick={() => router.push("/organizer/event")}
//     >
//       <ChevronLeft className="w-4 h-2" />
//       <span className="text-sm font-medium">Back to Events</span>
//     </Button>
//   )
// }

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/organizer/event")}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to Events
    </button>
  );
}