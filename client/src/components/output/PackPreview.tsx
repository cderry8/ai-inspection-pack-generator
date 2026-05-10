"use client";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import RiskSummary from "./risksummary";
import MissingDocs from "./missingdocs";
import ActionPlan from "./actionplan";

interface Risk {
  id: string;
  title: string;
  description: string;
  confidence: "Low" | "Medium" | "High";
}

interface Document {
  id: string;
  name: string;
  required: boolean;
  category: string;
}

interface ActionItem {
  id: string;
  title: string;
  priority: "Low" | "Medium" | "High";
  assignee: string;
  dueDays: number;
}

interface PackData {
  risks: Risk[];
  missingDocuments: Document[];
  actionItems: ActionItem[];
}

interface PackPreviewProps {
  data: PackData;
  onUpdateRiskConfidence: (id: string, confidence: "Low" | "Medium" | "High") => void;
  onExportPDF: () => void;
  onReset: () => void;
}

export default function PackPreview({
  data,
  onUpdateRiskConfidence,
  onExportPDF,
  onReset,
}: PackPreviewProps) {
  return (
    <div className="w-full max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Generated Inspection Pack</h2>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onReset}>
            New Pack
          </Button>
          <Button variant="secondary" onClick={onExportPDF}>
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <RiskSummary
            risks={data.risks}
            onUpdateConfidence={onUpdateRiskConfidence}
          />
        </div>
        <MissingDocs documents={data.missingDocuments} />
        <ActionPlan actions={data.actionItems} />
      </div>
    </div>
  );
}
