import api from "./api";
import { PackData } from "@/types";
import { AxiosError } from "axios";

export async function generatePack(notes: string): Promise<PackData> {
  try {
    const response = await api.post("/aipg/packs/generate", { notes });
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ error?: string; message?: string }>;
    const backendMessage = error.response?.data?.error || error.response?.data?.message;
    throw new Error(backendMessage || "Failed to generate inspection pack");
  }
}

export async function exportPack(packData: PackData): Promise<void> {
  try {
    const response = await api.post("/aipg/packs/export", { packData }, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "inspection-pack.pdf";
    document.body.appendChild(link);
    link.click();

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        resolve();
      }, 1000);
    });
  } catch (err) {
    const error = err as AxiosError<Blob>;
    if (error.response?.data) {
      try {
        const text = await error.response.data.text();
        const parsed = JSON.parse(text);
        throw new Error(parsed.error || parsed.message || "Failed to export PDF");
      } catch {
        throw new Error("Failed to export PDF");
      }
    }
    throw new Error(error.message || "Failed to export PDF");
  }
}
