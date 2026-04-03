const phaseConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  sourcing: { label: "ソーシング", bg: "bg-slate-50", text: "text-slate-700", dot: "bg-slate-400" },
  nda: { label: "NDA", bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-400" },
  im_review: { label: "IM", bg: "bg-cyan-50", text: "text-cyan-700", dot: "bg-cyan-400" },
  loi: { label: "LOI", bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-500" },
  dd: { label: "DD実行中", bg: "bg-violet-50", text: "text-violet-700", dot: "bg-violet-500" },
  negotiation: { label: "交渉", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  closing: { label: "クロージング", bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  completed: { label: "完了", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  abandoned: { label: "中止", bg: "bg-gray-50", text: "text-gray-500", dot: "bg-gray-400" },
};

export function PhaseBadge({ phase }: { phase: string }) {
  const config = phaseConfig[phase] || { label: phase, bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {config.label}
    </span>
  );
}
