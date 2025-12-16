// "use client";

// import { usePathname } from "next/navigation";
// import { EventWizardSidebar } from "./wizardSidebar";

// export function EventWizardSidebarWrapper() {
//   const pathname = usePathname() ?? "/";

//   // Steps must match your URLs exactly
//   const steps = ["create", "ticket-registration", "additional-sections", "publish"];

//   // Determine the current step automatically
//   const currentStep = steps.find(step => pathname.includes(step)) || "create";

//   // Show on create page or any wizard page
//   const isCreate = pathname.startsWith("/organizer/event/create");
//   const isWizard = /\/organizer\/event\/[^/]+\/(ticket-registration|additional-sections|publish)/.test(pathname);

//   if (!isCreate && !isWizard) return null;

//   return (
//     <div className="flex-shrink-0 w-64 border-r border-gray-200 bg-white h-screen overflow-y-auto">
//       <EventWizardSidebar currentStep={currentStep} />
//     </div>
//   );
// }




// components/EventDetailSidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, Calendar, Eye } from "lucide-react"
import { Badge } from "@/app/components/ui/badge"
import LocationPinIcon from '@mui/icons-material/LocationPin';

export default function EventWizardSidebarWrapper() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/dashboard") return pathname === "/dashboard" || pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <aside className="hidden lg:block fixed left-16 lg:left-20 top-16 w-64 lg:w-72 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-30 overflow-y-auto">
      <div className="p-4 lg:p-6 space-y-6 lg:space-y-8">
        <Link href="/event-management" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm lg:text-base">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>

            <div className="bg-white border border-gray-200 rounded-xl p-4 lg:p-5">
            <h3 className="font-semibold text-base lg:text-lg line-clamp-2">
                AI & Machine Learning Summit 2025
            </h3>

            <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>Monday, October 22, 2025, 10:00 AM</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
            <LocationPinIcon className="w-4 h-4 flex-shrink-0" />
            <span>CADT</span>
            </div>

            {/* Badge (left) + Preview Button (right) */}
            <div className="flex items-center justify-between mt-5">
                <Badge variant="secondary" className="text-xs px-3 py-1">
                Draft
                </Badge>

                <button className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Preview</span>
                </button>
            </div>
            </div>

        <nav className="space-y-6">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Main</p>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/event_management/dashboard"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                    isActive("/dashboard")
                      ? "bg-gray-100 font-medium text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/event_management/attendees"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                    isActive("/attendees")
                      ? "bg-gray-100 font-medium text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Attendees
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Payment & Finance</p>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/event_management/payment"
                  className={`block px-3 py-2 rounded-lg transition-all text-sm ${
                    isActive("/payment")
                      ? "bg-gray-100 font-medium text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Payment Setup
                </Link>
              </li>
              <li>
                <Link href="#" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm">
                  Refund Settings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Reporting</p>
            <ul className="space-y-1">
              <li>
                <Link href="#" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm">
                  Analysis Overview
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  )
}