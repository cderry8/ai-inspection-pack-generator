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
