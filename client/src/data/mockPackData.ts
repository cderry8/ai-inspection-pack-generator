import { PackData } from "@/types";

export const mockPackData: PackData = {
  risks: [
    {
      id: "1",
      title: "Electrical Wiring Exposed",
      description: "Wiring in warehouse section B is exposed and poses shock hazard.",
      confidence: "High",
    },
    {
      id: "2",
      title: "Fire Suppression Outdated",
      description: "System last inspected 6 months ago, exceeding 3-month requirement.",
      confidence: "Medium",
    },
    {
      id: "3",
      title: "Missing Safety Training Records",
      description: "3 employees lack documented safety training completion.",
      confidence: "High",
    },
  ],
  missingDocuments: [
    { id: "1", name: "Electrical Safety Certificate", required: true, category: "Safety" },
    { id: "2", name: "Fire Suppression Inspection Report", required: true, category: "Compliance" },
    { id: "3", name: "Employee Training Log Q4 2024", required: true, category: "Training" },
    { id: "4", name: "Equipment Maintenance Records", required: false, category: "Maintenance" },
    { id: "5", name: "Emergency Evacuation Plan", required: true, category: "Safety" },
  ],
  actionItems: [
    { id: "1", title: "Schedule electrical audit", priority: "High", assignee: "Facilities Manager", dueDays: 3 },
    { id: "2", title: "Update fire suppression docs", priority: "High", assignee: "Safety Officer", dueDays: 7 },
    { id: "3", title: "Organize training records", priority: "Medium", assignee: "HR Department", dueDays: 14 },
    { id: "4", title: "Review maintenance schedule", priority: "Low", assignee: "Operations", dueDays: 30 },
  ],
};
