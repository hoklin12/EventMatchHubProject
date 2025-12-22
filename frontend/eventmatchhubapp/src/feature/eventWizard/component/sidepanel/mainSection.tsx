

// import { Home, DollarSign, FileText } from "lucide-react";

// export const EVENT_SETUP_STEPS = [
//   {
//     id: "create",
//     title: "Overview",
//     description: "Basic event information",
//   },
//   {
//     id: "ticket-registration",
//     title: "Ticket Registration",
//     description: "Setup ticket types and pricing",
//   },
//   {
//     id: "additional-sections",
//     title: "Additional Sections",
//     description: "Extra settings or custom fields",
//   },
//   {
//     id: "publish",
//     title: "Publish",
//     description: "Finalize and publish your event",
//   },
// ];

// export const MAIN_SECTIONS = [
//   { id: "dashboard", label: "Dashboard", href: "/organizer/event/dashboard" },
//   { id: "attendees", label: "Attendees", href: "/organizer/event/attendees" },
// ];

// export const PAYMENT_SECTIONS = [
//   { id: "settings", label: "Payment Settings", href: "/organizer/event/Payment" },
//   { id: "finance", label: "Finance Overview", href: "/organizer/event/Finance" },
// ];

// export const REPORTING_SECTIONS = [
//   { id: "reports", label: "Reports & Analytics", href: "/organizer/event/Reports" },
// ];

// export function MainSection() {
//   return (
//     <div className="w-full border-b border-gray-200 pb-4">
//       {/* Main Section */}
//       <div className="px-4 pt-3">
//         <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">
//           Main
//         </h4>
//         <div className="space-y-0">
//           {MAIN_SECTIONS.map((item) => (
//             <a
//               key={item.id}
//               href={item.href || "#"}
//               className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 py-2"
//             >
//               <Home className="w-3 h-3" />
//               <span>{item.label}</span>
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* Payment & Finance Section */}
//       <div className="px-4 pt-6">
//         <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">
//           Payment & Finance
//         </h4>
//         <div className="space-y-0">
//           {PAYMENT_SECTIONS.map((item) => (
//             <a
//               key={item.id}
//               href={item.href || "#"}
//               className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 py-2"
//             >
//               <DollarSign className="w-3 h-3" />
//               <span>{item.label}</span>
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* Reporting Section */}
//       <div className="px-4 pt-6">
//         <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">
//           Reporting
//         </h4>
//         <div className="space-y-0">
//           {REPORTING_SECTIONS.map((item) => (
//             <a
//               key={item.id}
//               href={item.href || "#"}
//               className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-900 py-2"
//             >
//               <FileText className="w-3 h-3" />
//               <span>{item.label}</span>
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Home, DollarSign, FileText } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";




export const EVENT_SETUP_STEPS = [
  {
    id: "create",
    title: "Overview",
    description: "Basic event information",
  },
  {
    id: "ticket-registration",
    title: "Ticket Registration",
    description: "Setup ticket types and pricing",
  },
  {
    id: "additional-sections",
    title: "Additional Sections",
    description: "Extra settings or custom fields",
  },
  {
    id: "publish",
    title: "Publish",
    description: "Finalize and publish your event",
  },
];
export const MAIN_SECTIONS = [
  { id: "dashboard", label: "Dashboard", href: "/organizer/event/dashboard" },
  { id: "attendees", label: "Attendees", href: "/organizer/event/attendees" },
];

export const PAYMENT_SECTIONS = [
  { id: "settings", label: "Payment Settings", href: "/organizer/event/payment" },
  { id: "finance", label: "Finance Overview", href: "/organizer/event/finance" },
];

export const REPORTING_SECTIONS = [
  { id: "reports", label: "Reports & Analytics", href: "/organizer/event/reports" },
];

interface MainSectionProps {
  currentPath?: string; // passed from wrapper
}

export function MainSection({ currentPath }: MainSectionProps) {
  // Fallback to usePathname if not passed
  const pathname = usePathname();
  const activePath = currentPath || pathname;

  const isActive = (href: string) => {
    // Exact match or starts with (in case of nested routes)
    return activePath === href || activePath.startsWith(href + "/");
  };

  return (
    <div className="w-full border-b border-gray-200 pb-4">
      {/* Main Section */}
      <div className="px-4 pt-3">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">
          Main
        </h4>
        <div className="space-y-0">
          {MAIN_SECTIONS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-2 text-xs py-2 transition-colors ${
                isActive(item.href)
                  ? "text-gray-900 font-semibold bg-gray-200/50 rounded-md px-2"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md px-2"
              }`}
            >
              <Home className="w-3 h-3" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Payment & Finance */}
      <div className="px-4 pt-6">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">
          Payment & Finance
        </h4>
        <div className="space-y-0">
          {PAYMENT_SECTIONS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-2 text-xs py-2 transition-colors ${
                isActive(item.href)
                  ? "text-gray-900 font-semibold bg-gray-200/50 rounded-md px-2"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md px-2"
              }`}
            >
              <DollarSign className="w-3 h-3" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Reporting */}
      <div className="px-4 pt-6">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">
          Reporting
        </h4>
        <div className="space-y-0">
          {REPORTING_SECTIONS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-2 text-xs py-2 transition-colors ${
                isActive(item.href)
                  ? "text-gray-900 font-semibold bg-gray-200/50 rounded-md px-2"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md px-2"
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}