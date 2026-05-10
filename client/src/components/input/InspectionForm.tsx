"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import TextArea from "@/components/ui/textarea";
import Card from "@/components/ui/card";

interface InspectionFormProps {
  onGenerate: (notes: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const MIN_NOTES_LENGTH = 50;

export default function InspectionForm({
  onGenerate,
  isLoading = false,
  error = null,
}: InspectionFormProps) {
  const [notes, setNotes] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = () => {
    setValidationError(null);

    if (!notes.trim()) {
      setValidationError("Please enter inspection notes");
      return;
    }

    if (notes.trim().length < MIN_NOTES_LENGTH) {
      setValidationError(`Notes are too short. Please provide at least ${MIN_NOTES_LENGTH} characters with specific inspection details.`);
      return;
    }

    onGenerate(notes);
  };

  return (
    <Card padding="lg" className="w-full max-w-3xl">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Inspection Notes
          </h2>
          <p className="text-slate-400 text-sm">
            Paste your inspection notes below to generate a professional pack
          </p>
        </div>

        <TextArea
          value={notes}
          onChange={(value) => {
            setNotes(value);
            setValidationError(null);
          }}
          placeholder="Enter your inspection notes here... Example: Electrical wiring exposed in warehouse section B. Fire suppression system last checked 6 months ago. Missing safety training records for 3 employees..."
          rows={10}
        />

        {(validationError || error) && (
          <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 text-sm">
            {validationError || error}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {notes.length} / min {MIN_NOTES_LENGTH} characters
          </span>
          <Button
            onClick={handleSubmit}
            disabled={!notes.trim() || isLoading}
            size="lg"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {isLoading ? "Generating..." : "Generate Pack"}
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
