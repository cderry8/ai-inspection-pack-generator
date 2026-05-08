import { Risk } from "./risk";
import { Document } from "./document";
import { ActionItem } from "./action";

export interface PackData {
  risks: Risk[];
  missingDocuments: Document[];
  actionItems: ActionItem[];
}
