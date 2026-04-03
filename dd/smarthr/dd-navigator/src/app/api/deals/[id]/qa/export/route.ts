import { createServerClient } from "@/lib/supabase/server";
import { QA_CATEGORY_LABELS } from "@/lib/constants/qa-categories";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "認証が必要です" } },
        { status: 401 }
      );
    }

    const { searchParams } = request.nextUrl;
    const format = searchParams.get("format") || "text";

    // Q&A一覧を取得
    const { data: qaItems, error } = await supabase
      .from("qa_items")
      .select("*")
      .eq("deal_id", id)
      .is("deleted_at", null)
      .order("category", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching QA items:", error);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "Q&Aの取得に失敗しました" } },
        { status: 500 }
      );
    }

    if (format === "csv") {
      // CSV形式でエクスポート
      const headers = [
        "カテゴリ",
        "質問",
        "回答",
        "ステータス",
        "優先度",
        "期限",
      ];

      const rows = qaItems?.map((item) => [
        QA_CATEGORY_LABELS[item.category as keyof typeof QA_CATEGORY_LABELS],
        `"${item.question.replace(/"/g, '""')}"`,
        item.answer ? `"${item.answer.replace(/"/g, '""')}"` : "",
        item.status,
        item.priority,
        item.due_date || "",
      ]);

      const csv = [headers.join(","), ...(rows?.map((r) => r.join(",")) || [])].join(
        "\n"
      );

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="qa_export_${id}.csv"`,
        },
      });
    }

    // テキスト形式でエクスポート（デフォルト）
    let text = "# Q&Aリスト\n\n";

    const groupedByCategory = qaItems?.reduce(
      (acc, item) => {
        const cat = item.category;
        if (!acc[cat]) {
          acc[cat] = [];
        }
        acc[cat].push(item);
        return acc;
      },
      {} as Record<string, typeof qaItems>
    );

    for (const [category, items] of Object.entries(groupedByCategory || {}) as [string, NonNullable<typeof qaItems>][]) {
      const categoryLabel =
        QA_CATEGORY_LABELS[category as keyof typeof QA_CATEGORY_LABELS];
      text += `## ${categoryLabel}\n\n`;

      items.forEach((item, index) => {
        text += `### Q${index + 1}. ${item.question}\n\n`;
        if (item.answer) {
          text += `**A**: ${item.answer}\n\n`;
        } else {
          text += `**A**: （未回答）\n\n`;
        }
        text += `- ステータス: ${item.status}\n`;
        text += `- 優先度: ${item.priority}\n`;
        if (item.due_date) {
          text += `- 期限: ${item.due_date}\n`;
        }
        text += "\n---\n\n";
      });
    }

    return new NextResponse(text, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="qa_export_${id}.txt"`,
      },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}
