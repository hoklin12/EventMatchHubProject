"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/feature/sidebar/sidebar";
import { SiteHeader } from "../components/site/site-header";
import { EventWizardSidebarWrapper } from "@/feature/eventWizard/component/sidepanel/eventWizardSidebarWrapper";

interface EventModuleLayoutProps {
  children: ReactNode;
}

export default function EventModuleLayout({ children }: EventModuleLayoutProps) {
  const pathname = usePathname();

  // Hide main sidebar on preview page
  const hideMainSidebar = pathname?.includes("/preview");

  return (
    <div className="flex flex-col h-screen">
      <SiteHeader />
      <div className="flex flex-1 overflow-hidden">
        
        {/* Main Sidebar */}
        {!hideMainSidebar && (
          <div className="flex-shrink-0 border-r border-gray-200">
            <Sidebar />
          </div>
        )}

        {/* Content + Wizard Sidebar as flex row */}
        <div className="flex flex-1 overflow-hidden">
          <EventWizardSidebarWrapper />

          <main className="flex-1 overflow-auto p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}


