import { useState } from "react";
import { generatePack } from "@/services/packs";
import { PackData } from "@/types";

interface UseGeneratePackReturn {
  packData: PackData | null;
  isLoading: boolean;
  error: string | null;
  generate: (notes: string) => Promise<void>;
  updatePackData: (updater: (prev: PackData) => PackData) => void;
  reset: () => void;
}

export function useGeneratePack(): UseGeneratePackReturn {
  const [packData, setPackData] = useState<PackData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const updatePackData = (updater: (prev: PackData) => PackData) => {
    setPackData((prev) => (prev ? updater(prev) : null));
  };

  const reset = () => {
    setPackData(null);
    setError(null);
  };

  return { packData, isLoading, error, generate, updatePackData, reset };
}
