import Link from "next/link";
import { PhaseBadge } from "./PhaseBadge";
import type { Deal } from "@/types/deal";

export function DealCard({ deal }: { deal: Deal }) {
  const closingDate = deal.expected_closing_date
    ? new Date(deal.expected_closing_date)
    : null;
  const now = new Date();
  const daysUntilClosing = closingDate
    ? Math.ceil((closingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <Link href={`/deals/${deal.id}`}>
      <div className="bg-white rounded-xl border border-gray-200/60 p-5 hover:shadow-md hover:border-gray-300/60 group">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-base font-bold text-indigo-600">
                {(deal.target_company || deal.name).charAt(0)}
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 truncate">
                {deal.name}
              </h3>
              {deal.target_company && (
                <p className="text-xs text-gray-500 mt-0.5">{deal.target_company}</p>
              )}
            </div>
          </div>
          <PhaseBadge phase={deal.phase} />
        </div>

        {deal.description && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">{deal.description}</p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-50 text-xs text-gray-400">
          <div className="flex items-center gap-4">
            {deal.industry && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {deal.industry}
              </span>
            )}
          </div>
          {daysUntilClosing !== null && daysUntilClosing > 0 && (
            <span className={daysUntilClosing <= 90 ? "text-amber-500 font-medium" : ""}>
              あと{daysUntilClosing}日
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
