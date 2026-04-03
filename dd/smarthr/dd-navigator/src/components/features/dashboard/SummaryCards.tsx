import { createServerClient } from "@/lib/supabase/server";

export async function SummaryCards() {
  const supabase = await createServerClient();

  const [
    { count: activeDeals },
    { count: completedDeals },
    { count: companies },
    { count: unansweredQA },
  ] = await Promise.all([
    supabase
      .from("deals")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    supabase
      .from("deals")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed"),
    supabase.from("longlist_companies").select("*", { count: "exact", head: true }),
    supabase
      .from("deal_qa")
      .select("*", { count: "exact", head: true })
      .is("answer", null),
  ]);

  const cards = [
    {
      label: "アクティブ案件",
      value: activeDeals || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      change: "2",
      changePositive: true,
    },
    {
      label: "完了案件",
      value: completedDeals || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      change: "1",
      changePositive: true,
    },
    {
      label: "ロングリスト企業",
      value: companies || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      change: null,
      changePositive: false,
    },
    {
      label: "未回答 Q&A",
      value: unansweredQA || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      change: "3",
      changePositive: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-xl border border-gray-200/60 p-5 hover:shadow-md hover:border-gray-300/60"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`${card.iconBg} ${card.iconColor} p-2.5 rounded-lg`}>
              {card.icon}
            </div>
            {card.change && (
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  card.changePositive
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {card.changePositive ? "+" : ""}{card.change} 今月
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{card.value}</div>
          <div className="text-sm text-gray-500">{card.label}</div>
        </div>
      ))}
    </div>
  );
}
