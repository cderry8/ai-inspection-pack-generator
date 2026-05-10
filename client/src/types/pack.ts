import { Risk } from "./risk";
import { Document } from "./document";
import { ActionItem } from "./action";

export interface PackData {
  id?: string;
  title?: string;
  summary: string;
  createdAt?: string;
  risks: Risk[];
  missingDocuments: Document[];
  actionItems: ActionItem[];
}
