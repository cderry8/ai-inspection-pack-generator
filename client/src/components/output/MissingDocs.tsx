"use client";

import Card from "@/components/ui/card";

interface Document {
  id: string;
  name: string;
  required: boolean;
  category: string;
}

interface MissingDocsProps {
  documents: Document[];
}

const categoryColors: Record<string, string> = {
  Safety: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  Compliance: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Maintenance: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Training: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  General: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

export default function MissingDocs({ documents }: MissingDocsProps) {
  return (
    <Card padding="lg" className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <svg
            className="w-5 h-5 text-amber-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Missing Documents
        </h3>
        <span className="text-sm text-slate-400">
          {documents.length} document{documents.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-2">
        {documents.map((doc) => {
          const categoryStyle = categoryColors[doc.category] || categoryColors.General;

          return (
            <div
              key={doc.id}
              className="flex items-center gap-3 p-3 rounded-lg border bg-slate-950/30 border-purple-500/20"
            >
              <div className="flex-1">
                <span className="text-white">{doc.name}</span>
                {doc.required && (
                  <span className="ml-2 text-xs text-rose-400">*Required</span>
                )}
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${categoryStyle}`}>
                {doc.category}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
