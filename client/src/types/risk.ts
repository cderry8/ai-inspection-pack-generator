export type Confidence = "Low" | "Medium" | "High";

export interface Risk {
  id: string;
  title: string;
  description: string;
  confidence: Confidence;
}
