import { createServerClient } from "@/lib/supabase/server";
import { DocumentCard } from "./DocumentCard";

export async function DocumentList({
  dealId,
  category,
}: {
  dealId: string;
  category?: string;
}) {
  const supabase = await createServerClient();

  let query = supabase
    .from("deal_documents")
    .select("*")
    .eq("deal_id", dealId)
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data: documents } = await query;

  return (
    <div>
      {documents && documents.length > 0 ? (
        <div className="space-y-3">
          {documents.map((doc) => <DocumentCard key={doc.id} document={doc} />)}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200/60">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <p className="text-sm text-gray-500">資料がありません</p>
          <p className="text-xs text-gray-400 mt-1">ファイルをアップロードしてください</p>
        </div>
      )}
    </div>
  );
}
