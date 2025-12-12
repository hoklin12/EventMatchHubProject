"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { KeywordInput } from "@/feature/eventWizard/component/publish/keyword-input";
import { SchedulePicker } from "@/feature/eventWizard/component/publish/scedule-picker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { mockPublishSettings } from "@/lib/mock-data/publish-data";
import { mockEventPreviewData } from "@/lib/mock-data/event-previews";
import type { PublishSettings } from "@/lib/types/publish";
import Link from "next/link";
import { EventPreviewCard } from "@/feature/eventWizard/component/publish/event-preview-card";
import { WizardButtons } from "@/feature/eventWizard/component/wizard/wizardButtons";
import type { EventPreviewData } from "@/lib/types/event-preview";

export default function PublishSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [settings, setSettings] = useState<PublishSettings>(mockPublishSettings);
  const [eventPreview, setEventPreview] = useState<EventPreviewData | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(true);

  const updateSettings = (updates: Partial<PublishSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  // Fetch preview dynamically (for now, use mock but assign the eventId)
  useEffect(() => {
    if (!eventId) return;
    
    setEventPreview({
      ...mockEventPreviewData,
      id: eventId,
      organizer: {
        ...mockEventPreviewData.organizer,
        id: `org_${eventId}`, // optional: dynamic organizer id
      },
    });
    setLoadingPreview(false);
  }, [eventId]);

  const handlePublish = async () => {
    if (
      settings.publishingOption === "schedule-later" &&
      (!settings.scheduledDate || !settings.scheduledTime)
    ) {
      alert("Please select a date and time for scheduling.");
      return;
    }

    console.log("Publishing event:", eventId, settings);
    // TODO: Replace with actual API call
    alert("Event published!");
    router.push("/eventmodule/event");
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-background p-8">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">You're nearly there!</h1>
        <p className="text-gray-600">Review your details before making it visible to everyone.</p>
      </div>

      {/* Event Preview */}
      <div className="mb-6">
        {loadingPreview ? (
          <div>Loading preview...</div>
        ) : eventPreview ? (
          <EventPreviewCard preview={eventPreview} />
        ) : (
          <div className="text-red-500">Preview not available.</div>
        )}
      </div>

      {/* Confirmation: Event Type + Category */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <Label className="text-sm font-medium text-gray-900 mb-1">Event Type</Label>
          <div className="p-3 bg-gray-50 border rounded-md text-gray-700">{settings.eventType || "-"}</div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-900 mb-1">Category</Label>
          <div className="p-3 bg-gray-50 border rounded-md text-gray-700">{settings.category || "-"}</div>
        </div>
      </div>

      {/* Keywords */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-gray-900 mb-2 block">Keywords</Label>
        <KeywordInput
          keywords={settings.keywords}
          onChange={keywords => updateSettings({ keywords })}
        />
      </div>

      {/* Organized By */}
      <div className="mb-8">
        <Label className="text-sm font-medium text-gray-900 mb-2 block">Organized by</Label>
        <Link
          href={settings.organizer.link || "#"}
          className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
        >
          {settings.organizer.name}
          <span className="text-lg">↗</span>
        </Link>
      </div>

      {/* Event Setting */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Setting</h2>
        <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900 mb-1">Make your event public?</p>
            <p className="text-sm text-gray-600">Public shared for all</p>
            <p className="text-sm text-gray-600">Private shared for selected audience</p>
          </div>

          <Switch
            checked={settings.isPublic}
            onCheckedChange={checked => updateSettings({ isPublic: checked })}
          />
        </div>
      </div>

      {/* Publishing Options */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Publishing Options</h2>
        <div className="flex gap-4">
          <Button
            variant={settings.publishingOption === "publish-now" ? "default" : "outline"}
            onClick={() => updateSettings({ publishingOption: "publish-now" })}
          >
            Publish Now
          </Button>

          <Button
            variant={settings.publishingOption === "schedule-later" ? "default" : "outline"}
            onClick={() => updateSettings({ publishingOption: "schedule-later" })}
          >
            Schedule For Later
          </Button>
        </div>

        {settings.publishingOption === "schedule-later" && (
          <div className="mt-2">
            <SchedulePicker
              date={settings.scheduledDate || ""}
              time={settings.scheduledTime || ""}
              onChangeDate={date => updateSettings({ scheduledDate: date })}
              onChangeTime={time => updateSettings({ scheduledTime: time })}
            />
          </div>
        )}
      </div>

      {/* Wizard Buttons for Publish */}
      <WizardButtons
        onBack={() => router.push(`/eventmodule/event/${eventId}/additional-sections`)}
        onSaveDraft={() => console.log("Save draft current state for publish")}
        onSaveAndContinue={handlePublish}
        nextLabel="Publish"
        backLabel="Back"
      />
    </div>
  );
}
