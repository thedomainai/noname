import type { DashboardSummary } from "@/types/qa-merge";

interface QASummaryCardsProps {
  summary: DashboardSummary;
}

export function QASummaryCards({ summary }: QASummaryCardsProps) {
  const cards = [
    {
      label: "Total PRs",
      value: summary.total_prs,
      color: "text-gray-900",
    },
    {
      label: "Pending",
      value: summary.pending_prs,
      color: "text-gray-600",
    },
    {
      label: "In Progress",
      value: summary.in_progress_prs,
      color: "text-blue-600",
    },
    {
      label: "Testing",
      value: summary.testing_prs,
      color: "text-yellow-600",
    },
    {
      label: "Approved",
      value: summary.approved_prs,
      color: "text-green-600",
    },
    {
      label: "Blocked",
      value: summary.blocked_prs,
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:border-indigo-200 transition-colors"
        >
          <p className="text-sm text-gray-500 mb-1">{card.label}</p>
          <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
