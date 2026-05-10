"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { getPacks } from "@/services/packs";

interface Pack {
  id: string;
  title: string;
  date: string;
  risks: number;
  highRisks: number;
  missingDocuments: number;
  actionItems: number;
  status: string;
}

interface PackHistoryProps {
  onBack: () => void;
}

export default function PackHistory({ onBack }: PackHistoryProps) {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getPacks();
        if (mounted) setPacks(data);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Failed to load packs");
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Previously Generated Packs</h2>
          <Button variant="ghost" onClick={onBack}>Back to Generator</Button>
        </div>
        <div className="flex items-center justify-center py-20">
          <svg className="animate-spin h-8 w-8 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Previously Generated Packs</h2>
          <Button variant="ghost" onClick={onBack}>Back to Generator</Button>
        </div>
        <div className="p-4 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400 text-center">
          {error}
        </div>
      </div>
    );
  }

  if (packs.length === 0) {
    return (
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Previously Generated Packs</h2>
          <Button variant="ghost" onClick={onBack}>Back to Generator</Button>
        </div>
        <div className="text-center py-20">
          <svg className="w-12 h-12 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-slate-400 text-lg">No packs generated yet</p>
          <p className="text-slate-500 text-sm mt-1">Generate your first inspection pack to see it here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Previously Generated Packs</h2>
          <p className="text-slate-400 text-sm mt-1">{packs.length} pack{packs.length !== 1 ? "s" : ""} found</p>
        </div>
        <Button variant="ghost" onClick={onBack}>Back to Generator</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {packs.map((pack) => (
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
                <span className="shrink-0 px-2 py-0.5 rounded text-xs font-medium border bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  Completed
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
