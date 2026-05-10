import { useState } from "react";
import { generatePack, exportPack } from "@/services/packs";
import { PackData } from "@/types";

interface UseGeneratePackReturn {
  packData: PackData | null;
  isLoading: boolean;
  isExporting: boolean;
  error: string | null;
  generate: (notes: string) => Promise<void>;
  exportPdf: () => Promise<void>;
  updatePackData: (updater: (prev: PackData) => PackData) => void;
  reset: () => void;
}

export function useGeneratePack(): UseGeneratePackReturn {
  const [packData, setPackData] = useState<PackData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (notes: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await generatePack(notes);
      setPackData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate pack");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const exportPdf = async () => {
    if (!packData) return;
    setIsExporting(true);
    setError(null);

    try {
      await exportPack(packData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to export PDF");
      throw err;
    } finally {
      setIsExporting(false);
    }
  };

  const updatePackData = (updater: (prev: PackData) => PackData) => {
    setPackData((prev) => (prev ? updater(prev) : null));
  };

  const reset = () => {
    setPackData(null);
    setError(null);
    setIsExporting(false);
  };

  return { packData, isLoading, isExporting, error, generate, exportPdf, updatePackData, reset };
}
