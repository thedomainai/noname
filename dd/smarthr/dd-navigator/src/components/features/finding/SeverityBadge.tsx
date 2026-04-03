const severityConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  critical: { label: "致命的", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  high: { label: "高", bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  medium: { label: "中", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
  low: { label: "低", bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" },
};

export function SeverityBadge({ severity }: { severity: string }) {
  const config = severityConfig[severity] ?? { label: severity, bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {config.label}
    </span>
  );
}
