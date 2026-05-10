"use client";

import { useState } from "react";
import InspectionForm from "@/components/input/inspectionform";
import PackPreview from "@/components/output/packpreview";
import Header from "@/components/layout/header";
import TopLoadingBar from "@/components/loading/toploadingbar";
import { useGeneratePack } from "@/hooks/usegeneratepack";
import { PackData, Risk } from "@/types";

export default function Home() {
  const { packData, isLoading, isExporting, error, generate, exportPdf, updatePackData, reset: resetPack } = useGeneratePack();
  const [hasGenerated, setHasGenerated] = useState(false);

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

  return (
    <>
      <TopLoadingBar isLoading={isLoading || isExporting} />
      <main className="relative z-10 min-h-screen px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <Header />
          <div className="flex flex-col items-center">
            {!hasGenerated || !packData ? (
              <InspectionForm onGenerate={handleGenerate} isLoading={isLoading} error={error} />
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
