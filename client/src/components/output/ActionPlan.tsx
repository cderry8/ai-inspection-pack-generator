"use client";

import Card from "@/components/ui/card";

interface ActionItem {
  id: string;
  title: string;
  priority: "Low" | "Medium" | "High";
  assignee: string;
  dueDays: number;
}

interface ActionPlanProps {
  actions: ActionItem[];
}

const priorityColors = {
  Low: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  Medium: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  High: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

export default function ActionPlan({ actions }: ActionPlanProps) {
  const sortedActions = [...actions].sort((a, b) => {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <Card padding="lg" className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <svg
            className="w-5 h-5 text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          Action Plan
        </h3>
        <span className="text-sm text-slate-400">{actions.length} actions</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-purple-500/20">
              <th className="text-left py-3 px-2 text-sm font-medium text-slate-400">
                Action
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-slate-400">
                Priority
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-slate-400">
                Assignee
              </th>
              <th className="text-center py-3 px-2 text-sm font-medium text-slate-400">
                Due
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-500/10">
            {sortedActions.map((action) => (
              <tr
                key={action.id}
                className="hover:bg-slate-800/30 transition-colors"
              >
                <td className="py-3 px-2">
                  <span className="text-white">{action.title}</span>
                </td>
                <td className="py-3 px-2 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium border ${priorityColors[action.priority]}`}
                  >
                    {action.priority}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-slate-300">{action.assignee}</span>
                </td>
                <td className="py-3 px-2 text-center">
                  <span className="text-cyan-400 text-sm">{action.dueDays} days</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
