"use client";

import { useState } from "react";
import InspectionForm from "@/components/input/InspectionForm";
import PackPreview from "@/components/output/PackPreview";
import Header from "@/components/layout/Header";
import TopLoadingBar from "@/components/loading/TopLoadingBar";
import { PackData } from "@/types";
import { mockPackData } from "@/data/mockPackData";

export default function Home() {
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [packData, setPackData] = useState(mockPackData);

  const handleGenerate = async (notes: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setHasGenerated(true);
    setIsLoading(false);
  };

  const handleUpdateRiskConfidence = (id: string, confidence: "Low" | "Medium" | "High") => {
    setPackData((prev) => ({
      ...prev,
      risks: prev.risks.map((risk) =>
        risk.id === id ? { ...risk, confidence } : risk
      ),
    }));
  };

  const handleToggleDocCheck = (id: string) => {};

  const handleExportPDF = () => {};

  const handleReset = () => {
    setHasGenerated(false);
  };

  return (
    <>
      <TopLoadingBar isLoading={isLoading} />
      <main className="relative z-10 min-h-screen px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <Header />
          <div className="flex flex-col items-center">
            {!hasGenerated ? (
              <InspectionForm onGenerate={handleGenerate} isLoading={isLoading} />
            ) : (
              <PackPreview
                data={packData}
                onUpdateRiskConfidence={handleUpdateRiskConfidence}
                onToggleDocCheck={handleToggleDocCheck}
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
