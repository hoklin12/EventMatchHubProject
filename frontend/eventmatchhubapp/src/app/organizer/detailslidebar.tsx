// components/EventDetailSidebar.tsx
"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Eye } from "lucide-react";
import { Badge } from "../components/ui/badge";

interface EventDetailSidebarProps {
  activeSection?: string;
  activeStep?: string;
}

const wizardSteps = [
  { id: "overview", label: "Event Overview" },
  { id: "tickets", label: "Ticket and Registration" },
  { id: "additional", label: "Additional Sections" },
  { id: "publish", label: "Publish Settings" },
];

const dashboardSections = [
  { id: "dashboard", label: "Dashboard", path: "/organizer/event/dashboard" },
  { id: "attendees", label: "Attendees", path: "/organizer/event/attendees" },
  { id: "payment-setup", label: "Payment Setup", path: "/organizer/event/payment" },
  { id: "refund-settings", label: "Refund Settings", path: "/organizer/event/refund-settings" },
  { id: "analysis", label: "Analysis Overview", path: "/organizer/event/analysis" },
];

export default function EventDetailSidebar({
  activeSection = "dashboard",
  activeStep,
}: EventDetailSidebarProps) {
  const isWizardMode = !!activeStep;
  const currentActive = activeStep || activeSection;
  const isActive = (id: string) => currentActive === id;

  return (
    <>
      {/* Mobile Bottom Sidebar */}
      <aside className="lg:hidden fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="p-4 space-y-6 overflow-y-auto max-h-[80vh]">
          <Link
            href="/organizer/general"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Events
          </Link>

          {/* Event Info Card */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-lg">Event Title</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <Calendar className="w-4 h-4" />
              <span>Event Date, Time (AM/PM)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <MapPin className="w-4 h-4" />
              <span>Event Location</span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <Badge variant="secondary" className="px-3 py-1 text-xs">Draft</Badge>
              <button className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>
          </div>

          {/* Wizard Steps (only in creation mode) */}
          {isWizardMode && (
            <div>
              <h4 className="font-semibold text-sm mb-3">Event Setup</h4>
              <p className="text-xs text-gray-500 mb-4">
                Configure your event settings before publishing
              </p>
              <ul className="space-y-3">
                {wizardSteps.map((step, i) => (
                  <li key={step.id} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium ${
                        isActive(step.id)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 text-gray-400"
                      }`}
                    >
                      {isActive(step.id) ? i + 1 : "•"}
                    </div>
                    <span
                      className={`text-sm ${
                        isActive(step.id) ? "font-medium text-gray-900" : "text-gray-600"
                      }`}
                    >
                      {step.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dashboard Navigation - Always Visible */}
          <nav className="space-y-4 pt-4 border-t border-gray-200 text-sm">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Main</p>
              {dashboardSections.slice(0, 2).map((section) => (
                <Link
                  key={section.id}
                  href={section.path}
                  className={`block py-1.5 ${
                    isActive(section.id)
                      ? "text-gray-900 font-semibold"
                      : "text-gray-600"
                  } hover:text-gray-900 transition-colors`}
                >
                  {section.label}
                </Link>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Payment & Finance</p>
              {dashboardSections.slice(2, 4).map((section) => (
                <Link
                  key={section.id}
                  href={section.path}
                  className={`block py-1.5 ${
                    isActive(section.id)
                      ? "text-gray-900 font-semibold"
                      : "text-gray-600"
                  } hover:text-gray-900 transition-colors`}
                >
                  {section.label}
                </Link>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Reporting</p>
              <Link
                href={dashboardSections[4].path}
                className={`block py-1.5 ${
                  isActive(dashboardSections[4].id)
                    ? "text-gray-900 font-semibold"
                    : "text-gray-600"
                } hover:text-gray-900 transition-colors`}
              >
                {dashboardSections[4].label}
              </Link>
            </div>
          </nav>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-16 lg:left-20 top-16 w-64 lg:w-72 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-40 overflow-y-auto">
        <div className="p-6 space-y-8">
          <Link
            href="/organizer/general"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-base transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>

          {/* Event Info */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-lg line-clamp-2">Event Title</h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>Event Date, Time (AM/PM)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>Event Location</span>
            </div>
            <div className="flex items-center justify-between mt-5">
              <Badge variant="secondary" className="text-xs px-3 py-1">Draft</Badge>
              <button className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* Wizard Steps (only in creation mode) */}
          {isWizardMode && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Event Setup
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Configure your event settings before publishing
              </p>
              <ul className="space-y-3">
                {wizardSteps.map((step, i) => (
                  <li key={step.id} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium ${
                        isActive(step.id)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 text-gray-400"
                      }`}
                    >
                      {isActive(step.id) ? i + 1 : "•"}
                    </div>
                    <span
                      className={`text-sm ${
                        isActive(step.id) ? "font-medium text-gray-900" : "text-gray-600"
                      }`}
                    >
                      {step.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dashboard Navigation - Always Visible */}
          <nav className="space-y-6">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Main</p>
              <ul className="space-y-1">
                {dashboardSections.slice(0, 2).map((section) => (
                  <li key={section.id}>
                    <Link
                      href={section.path}
                      className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                        isActive(section.id)
                          ? "bg-gray-100 text-gray-900 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {section.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Payment & Finance</p>
              <ul className="space-y-1">
                {dashboardSections.slice(2, 4).map((section) => (
                  <li key={section.id}>
                    <Link
                      href={section.path}
                      className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                        isActive(section.id)
                          ? "bg-gray-100 text-gray-900 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {section.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Reporting</p>
              <ul className="space-y-1">
                <li>
                  <Link
                    href={dashboardSections[4].path}
                    className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                      isActive(dashboardSections[4].id)
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {dashboardSections[4].label}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}