import { createServerClient } from "@/lib/supabase/server";
import { CompanyCard } from "./CompanyCard";

export async function CompanyList({
  industry,
  region,
  fitScore,
}: {
  industry?: string;
  region?: string;
  fitScore?: string;
}) {
  const supabase = await createServerClient();

  let query = supabase
    .from("longlist_companies")
    .select("*")
    .order("fit_score", { ascending: false });

  if (industry) {
    query = query.eq("industry", industry);
  }
  if (region) {
    query = query.eq("region", region);
  }
  if (fitScore) {
    query = query.gte("fit_score", parseInt(fitScore));
  }

  const { data: companies } = await query;

  return (
    <div>
      {companies && companies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200/60">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p className="text-sm text-gray-500">企業がありません</p>
        </div>
      )}
    </div>
  );
}
