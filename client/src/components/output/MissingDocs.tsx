"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

interface Document {
  id: string;
  name: string;
  required: boolean;
  category: string;
}

interface MissingDocsProps {
  documents: Document[];
  onToggleCheck: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  Safety: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  Compliance: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Maintenance: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  Training: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  General: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

export default function MissingDocs({
  documents,
  onToggleCheck,
}: MissingDocsProps) {
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    const newChecked = new Set(checkedDocs);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedDocs(newChecked);
    onToggleCheck(id);
  };

  const checkedCount = checkedDocs.size;

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
          {checkedCount}/{documents.length} checked
        </span>
      </div>

      <div className="space-y-2">
        {documents.map((doc) => {
          const isChecked = checkedDocs.has(doc.id);
          const categoryStyle = categoryColors[doc.category] || categoryColors.General;

          return (
            <label
              key={doc.id}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                isChecked
                  ? "bg-slate-800/60 border-purple-500/40"
                  : "bg-slate-950/30 border-purple-500/20 hover:border-purple-500/30"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(doc.id)}
                className="w-4 h-4 rounded border-purple-500/30 bg-slate-950 text-cyan-500 focus:ring-cyan-400/50"
              />
              <div className="flex-1">
                <span className={`${isChecked ? "line-through text-slate-500" : "text-white"}`}>
                  {doc.name}
                </span>
                {doc.required && (
                  <span className="ml-2 text-xs text-rose-400">*Required</span>
                )}
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${categoryStyle}`}>
                {doc.category}
              </span>
            </label>
          );
        })}
      </div>
    </Card>
  );
}
