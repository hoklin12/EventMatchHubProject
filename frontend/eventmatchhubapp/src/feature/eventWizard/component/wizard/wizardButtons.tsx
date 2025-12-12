"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface WizardButtonsProps {
  onBack?: () => void;
  onSaveDraft?: () => void;
  onSaveAndContinue: () => void;
  nextLabel?: string;
  backLabel?: string;
  hideDraft?: boolean;
}

export const WizardButtons: React.FC<WizardButtonsProps> = ({
  onBack,
  onSaveDraft,
  onSaveAndContinue,
  nextLabel = "Continue",
  backLabel = "Back",
  hideDraft = false,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-4 z-50">
      {onBack && (
        <Button variant="outline" onClick={onBack} className="px-6">
          {backLabel}
        </Button>
      )}

      {!hideDraft && onSaveDraft && (
        <Button variant="outline" onClick={onSaveDraft} className="px-6">
          Save as draft
        </Button>
      )}

      <Button
        onClick={onSaveAndContinue}
        className="px-6 bg-blue-600 text-white hover:bg-blue-700"
      >
        {nextLabel}
      </Button>
    </div>
  );
};
