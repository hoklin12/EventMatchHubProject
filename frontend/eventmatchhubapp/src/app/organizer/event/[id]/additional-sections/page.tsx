"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { SectionCard } from "@/feature/eventWizard/component/additionalSection/section-card";
import { CustomizeRegistrationDialog } from "@/feature/eventWizard/component/additionalSection/customize-registration-dialog";
import { AgendaDialog } from "@/feature/eventWizard/component/additionalSection/agenda-dialog";
import { SpeakersDialog } from "@/feature/eventWizard/component/additionalSection/speaker-dialog";
import { CertificateSettingsDialog } from "@/feature/eventWizard/component/additionalSection/certificate-setting-dialog";
import { additionalSections } from "@/lib/mock-data/registration-forms";
import type { CustomQuestion } from "@/lib/types/registration-form";
import type { CertificateFormData } from "@/lib/types/certificate";
import type { SpeakerFormData } from "@/lib/types/speaker";
import { WizardButtons } from "@/feature/eventWizard/component/wizard/wizardButtons";

export default function AdditionalSectionsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false);
  const [agendaDialogOpen, setAgendaDialogOpen] = useState(false);
  const [speakersDialogOpen, setSpeakersDialogOpen] = useState(false);
  const [addedSections, setAddedSections] = useState<Record<string, boolean>>({});
  const [uploadedPdf, setUploadedPdf] = useState<File | null>(null);

  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const handleAddSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    if (sectionId === "customize-registration") setDialogOpen(true);
    else if (sectionId === "certificate-settings") setCertificateDialogOpen(true);
    else if (sectionId === "agenda") setAgendaDialogOpen(true);
    else if (sectionId === "speakers-hosts") setSpeakersDialogOpen(true);
  };

  const markSectionAdded = () => {
    if (currentSection) {
      setAddedSections(prev => ({ ...prev, [currentSection]: true }));
    }
  };

  const handleSaveRegistrationForm = (questions: CustomQuestion[]) => {
    markSectionAdded();
    setDialogOpen(false);
  };

  const handleSaveCertificate = (data: CertificateFormData) => {
    markSectionAdded();
    setCertificateDialogOpen(false);
  };

  const handleSaveAgenda = (file: File | null) => {
    markSectionAdded();
    setUploadedPdf(file);
    setAgendaDialogOpen(false);
  };

  const handleSaveSpeakers = (data: SpeakerFormData) => {
    markSectionAdded();
    setSpeakersDialogOpen(false);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">More sections</h1>
          <p className="text-sm text-gray-600">
            Easily extend your event setup with sections for agenda, speakers, or attendee preferences.
          </p>
        </div>

        <div className="space-y-3">
          {additionalSections.map(section => (
            <SectionCard
              key={section.id}
              id={section.id}
              title={section.title}
              icon={section.icon}
              onAdd={handleAddSection}
              added={!!addedSections[section.id]}
            />
          ))}
        </div>
      </div>

      <WizardButtons
        onBack={() => router.push(`/organizer/event/${eventId}/ticket-registration`)}
        onSaveDraft={() => console.log("Save draft current state")}
        onSaveAndContinue={() => router.push(`/organizer/event/${eventId}/publish-sections`)}
      />

      <CustomizeRegistrationDialog open={dialogOpen} onOpenChange={setDialogOpen} onSave={handleSaveRegistrationForm} />
      <CertificateSettingsDialog open={certificateDialogOpen} onOpenChange={setCertificateDialogOpen} onSave={handleSaveCertificate} />
      <AgendaDialog open={agendaDialogOpen} onOpenChange={setAgendaDialogOpen} onSave={handleSaveAgenda} />
      <SpeakersDialog open={speakersDialogOpen} onOpenChange={setSpeakersDialogOpen} onSave={handleSaveSpeakers} />
    </div>
  );
}
