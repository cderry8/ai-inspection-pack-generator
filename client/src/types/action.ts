export type Priority = "Low" | "Medium" | "High";

export interface ActionItem {
  id: string;
  title: string;
  priority: Priority;
  assignee: string;
  dueDays: number;
}
