import { createServerClient } from "@/lib/supabase/server";

const phases = [
  { value: "sourcing", label: "ソーシング" },
  { value: "nda", label: "NDA" },
  { value: "im_review", label: "IM レビュー" },
  { value: "loi", label: "LOI" },
  { value: "dd", label: "DD 実行" },
  { value: "negotiation", label: "交渉" },
  { value: "closing", label: "クロージング" },
];

export async function PhaseTimeline({ dealId }: { dealId: string }) {
  const supabase = await createServerClient();

  const { data: deal } = await supabase
    .from("deals")
    .select("phase")
    .eq("id", dealId)
    .single();

  if (!deal) return null;

  const currentIndex = phases.findIndex((p) => p.value === deal.phase);

  return (
    <div className="bg-white rounded-xl border border-gray-200/60">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">フェーズ進捗</h3>
      </div>
      <div className="p-5">
        <div className="space-y-0">
          {phases.map((phase, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isLast = index === phases.length - 1;

            return (
              <div key={phase.value} className="flex items-start gap-3">
                {/* Timeline dot + line */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                      isCompleted
                        ? "bg-emerald-500 text-white"
                        : isCurrent
                        ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 h-6 ${isCompleted ? "bg-emerald-300" : "bg-gray-100"}`}></div>
                  )}
                </div>

                {/* Label */}
                <div className="pt-1">
                  <span
                    className={`text-sm ${
                      isCurrent
                        ? "font-semibold text-indigo-700"
                        : isCompleted
                        ? "font-medium text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    {phase.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
