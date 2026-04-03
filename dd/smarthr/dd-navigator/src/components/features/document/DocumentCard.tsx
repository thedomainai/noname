import type { DealDocument } from "@/types/deal-document";

const categoryConfig: Record<string, { label: string; color: string }> = {
  im: { label: "IM", color: "bg-indigo-50 text-indigo-700" },
  financial: { label: "財務", color: "bg-emerald-50 text-emerald-700" },
  legal: { label: "法務", color: "bg-amber-50 text-amber-700" },
  operational: { label: "業務", color: "bg-blue-50 text-blue-700" },
  hr: { label: "人事", color: "bg-purple-50 text-purple-700" },
  other: { label: "その他", color: "bg-gray-50 text-gray-600" },
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const fileIcons: Record<string, string> = {
  "application/pdf": "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
};

export function DocumentCard({ document }: { document: DealDocument }) {
  const cat = categoryConfig[document.category ?? "other"] ?? { label: "その他", color: "bg-gray-50 text-gray-600" };
  const iconPath = fileIcons[document.mime_type ?? ""] ?? fileIcons["application/pdf"]!;

  return (
    <div className="bg-white rounded-xl border border-gray-200/60 p-5 hover:shadow-md hover:border-gray-300/60 transition-all">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={iconPath} />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate">{document.name}</h4>
              {document.description && (
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{document.description}</p>
              )}
            </div>
            <span className={`text-xs font-medium px-2 py-0.5 rounded shrink-0 ${cat.color}`}>
              {cat.label}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
            <span>{document.file_name}</span>
            <span>{formatFileSize(document.file_size)}</span>
            <span>{new Date(document.created_at).toLocaleDateString("ja-JP", { month: "short", day: "numeric" })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
