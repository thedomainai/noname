import { SeverityBadge } from "./SeverityBadge";
import type { DealFinding } from "@/types/deal-finding";

const categoryLabels: Record<string, { label: string; icon: string }> = {
  risk: { label: "リスク", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
  opportunity: { label: "機会", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  issue: { label: "課題", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  information: { label: "情報", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  open: { label: "未対応", color: "bg-red-50 text-red-700" },
  under_review: { label: "レビュー中", color: "bg-amber-50 text-amber-700" },
  resolved: { label: "解決済", color: "bg-emerald-50 text-emerald-700" },
  accepted: { label: "受容済", color: "bg-blue-50 text-blue-700" },
};

export function FindingCard({ finding }: { finding: DealFinding }) {
  const cat = categoryLabels[finding.category] ?? { label: finding.category, icon: "" };
  const status = statusConfig[finding.status] ?? { label: finding.status, color: "bg-gray-100 text-gray-600" };

  return (
    <div className="bg-white rounded-xl border border-gray-200/60 overflow-hidden">
      {/* Severity strip */}
      <div className={`h-1 ${
        finding.severity === "critical" ? "bg-red-500" :
        finding.severity === "high" ? "bg-orange-500" :
        finding.severity === "medium" ? "bg-amber-400" :
        "bg-gray-300"
      }`}></div>

      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            {cat.icon && (
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={cat.icon} />
                </svg>
              </div>
            )}
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-gray-900">{finding.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">{cat.label}</span>
                <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${status.color}`}>{status.label}</span>
              </div>
            </div>
          </div>
          <SeverityBadge severity={finding.severity} />
        </div>

        {finding.description && (
          <p className="text-sm text-gray-600 leading-relaxed">{finding.description}</p>
        )}

        {(finding.impact || finding.recommendation) && (
          <div className="space-y-3 pt-3 border-t border-gray-100">
            {finding.impact && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">インパクト</p>
                <p className="text-sm text-gray-700">{finding.impact}</p>
              </div>
            )}
            {finding.recommendation && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">推奨アクション</p>
                <p className="text-sm text-gray-700">{finding.recommendation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
