"use client";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import RiskSummary from "./risksummary";
import MissingDocs from "./missingdocs";
import ActionPlan from "./actionplan";
import { PackData } from "@/types";

interface PackPreviewProps {
  data: PackData;
  isExporting: boolean;
  error?: string | null;
  onUpdateRiskConfidence: (id: string, confidence: "Low" | "Medium" | "High") => void;
  onExportPDF: () => void;
  onReset: () => void;
}

export default function PackPreview({
  data,
  isExporting,
  error,
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
          <Button variant="secondary" onClick={onExportPDF} disabled={isExporting}>
            {isExporting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Exporting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
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
              </span>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 text-sm text-center">
          {error}
        </div>
      )}

      {data.summary && (
        <Card padding="lg" className="w-full">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-bold text-white">Summary</h3>
          </div>
          <p className="text-slate-300 leading-relaxed">{data.summary}</p>
        </Card>
      )}

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
