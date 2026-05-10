"use client";

import Card from "@/components/ui/card";
import ConfidenceSelector from "@/components/ui/confidenceselector";

interface Risk {
  id: string;
  title: string;
  description: string;
  confidence: "Low" | "Medium" | "High";
}

interface RiskSummaryProps {
  risks: Risk[];
  onUpdateConfidence: (id: string, confidence: "Low" | "Medium" | "High") => void;
}

export default function RiskSummary({
  risks,
  onUpdateConfidence,
}: RiskSummaryProps) {
  return (
    <Card padding="lg" className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <svg
            className="w-5 h-5 text-rose-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Risk Summary
        </h3>
        <span className="text-sm text-slate-400">{risks.length} risks identified</span>
      </div>

      <div className="space-y-4">
        {risks.map((risk) => (
          <div
            key={risk.id}
            className="border border-purple-500/20 rounded-lg p-4 bg-slate-950/30 hover:border-purple-500/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-medium text-white mb-1">{risk.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {risk.description}
                </p>
              </div>
              <div className="flex items-center">
                <ConfidenceSelector
                  value={risk.confidence}
                  onChange={(value) => onUpdateConfidence(risk.id, value)}
                  size="sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
