"use client";

import { useState } from "react";
import InspectionForm from "@/components/input/InspectionForm";
import PackPreview from "@/components/output/PackPreview";
import PackHistory from "@/components/history/packhistory";
import Header from "@/components/layout/Header";
import TopLoadingBar from "@/components/loading/TopLoadingBar";
import { useGeneratePack } from "@/hooks/usegeneratepack";
import { PackData, Risk } from "@/types";

export default function Home() {
  const { packData, isLoading, isExporting, error, generate, exportPdf, viewPack, exportFromHistory, updatePackData, setPackData, reset: resetPack } = useGeneratePack();
  const [hasGenerated, setHasGenerated] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleGenerate = async (notes: string) => {
    try {
      await generate(notes);
      setHasGenerated(true);
    } catch (error) {
      console.error("Failed to generate pack:", error);
    }
  };

  const handleUpdateRiskConfidence = (id: string, confidence: "Low" | "Medium" | "High") => {
    updatePackData((prev: PackData) => ({
      ...prev,
      risks: prev.risks.map((risk: Risk) =>
        risk.id === id ? { ...risk, confidence } : risk
      ),
    }));
  };

  const handleExportPDF = async () => {
    try {
      await exportPdf();
    } catch (error) {
      console.error("Failed to export PDF:", error);
    }
  };

  const handleReset = () => {
    setHasGenerated(false);
    resetPack();
  };

  const handleShowHistory = () => {
    setShowHistory(true);
  };

  const handleBackFromHistory = () => {
    setShowHistory(false);
  };

  const handleViewPackFromHistory = async (id: string) => {
    try {
      await viewPack(id);
      setHasGenerated(true);
      setShowHistory(false);
    } catch {
      // error already set in hook
    }
  };

  const handleExportFromHistory = async (id: string) => {
    try {
      await exportFromHistory(id);
    } catch {
      // error already set in hook
    }
  };

  return (
    <>
      <TopLoadingBar isLoading={isLoading || isExporting} />
      <main className="relative z-10 min-h-screen px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <Header />
          <div className="flex flex-col items-center">
            {showHistory ? (
              <PackHistory
                onBack={handleBackFromHistory}
                onViewPack={handleViewPackFromHistory}
                onExportPack={handleExportFromHistory}
                isLoading={isLoading}
                isExporting={isExporting}
                error={error}
              />
            ) : !hasGenerated || !packData ? (
              <InspectionForm onGenerate={handleGenerate} isLoading={isLoading} error={error} onShowHistory={handleShowHistory} />
            ) : (
              <PackPreview
                data={packData}
                isExporting={isExporting}
                error={error}
                onUpdateRiskConfidence={handleUpdateRiskConfidence}
                onExportPDF={handleExportPDF}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
