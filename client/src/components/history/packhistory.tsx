"use client";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

interface Pack {
  id: string;
  title: string;
  date: string;
  risks: number;
  highRisks: number;
  missingDocuments: number;
  actionItems: number;
  status: "completed" | "in-progress" | "draft";
}

const mockPacks: Pack[] = [
  {
    id: "1",
    title: "Warehouse Safety Inspection - Q1 2026",
    date: "May 8, 2026",
    risks: 6,
    highRisks: 2,
    missingDocuments: 4,
    actionItems: 8,
    status: "completed",
  },
  {
    id: "2",
    title: "Construction Site Review - Block A",
    date: "May 5, 2026",
    risks: 12,
    highRisks: 5,
    missingDocuments: 7,
    actionItems: 15,
    status: "completed",
  },
  {
    id: "3",
    title: "Office Building Fire Safety Audit",
    date: "April 28, 2026",
    risks: 4,
    highRisks: 1,
    missingDocuments: 3,
    actionItems: 5,
    status: "in-progress",
  },
  {
    id: "4",
    title: "Factory Floor Electrical Systems Check",
    date: "April 22, 2026",
    risks: 9,
    highRisks: 3,
    missingDocuments: 5,
    actionItems: 11,
    status: "completed",
  },
  {
    id: "5",
    title: "Chemical Storage Compliance Review",
    date: "April 15, 2026",
    risks: 7,
    highRisks: 4,
    missingDocuments: 6,
    actionItems: 9,
    status: "draft",
  },
];

const statusStyles = {
  completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "in-progress": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  draft: "bg-slate-500/20 text-slate-300 border-slate-500/30",
};

const statusLabels = {
  completed: "Completed",
  "in-progress": "In Progress",
  draft: "Draft",
};

interface PackHistoryProps {
  onBack: () => void;
}

export default function PackHistory({ onBack }: PackHistoryProps) {
  return (
    <div className="w-full max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Previously Generated Packs</h2>
          <p className="text-slate-400 text-sm mt-1">View and manage your inspection packs</p>
        </div>
        <Button variant="ghost" onClick={onBack}>
          Back to Generator
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPacks.map((pack) => (
          <Card
            key={pack.id}
            padding="lg"
            className="group cursor-pointer transition-all duration-200 hover:border-purple-500/40 hover:bg-slate-900/50"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-white font-medium leading-snug line-clamp-2">
                  {pack.title}
                </h3>
                <span
                  className={`shrink-0 px-2 py-0.5 rounded text-xs font-medium border ${statusStyles[pack.status]}`}
                >
                  {statusLabels[pack.status]}
                </span>
              </div>

              <p className="text-sm text-slate-400">{pack.date}</p>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{pack.risks}</div>
                  <div className="text-xs text-slate-400">Risks</div>
                  {pack.highRisks > 0 && (
                    <div className="text-xs text-rose-400">{pack.highRisks} high</div>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{pack.missingDocuments}</div>
                  <div className="text-xs text-slate-400">Missing Docs</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{pack.actionItems}</div>
                  <div className="text-xs text-slate-400">Actions</div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="secondary" size="sm" className="flex-1">
                  View Pack
                </Button>
                <Button variant="ghost" size="sm">
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
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
