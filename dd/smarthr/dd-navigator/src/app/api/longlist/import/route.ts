import { createServerClient } from "@/lib/supabase/server";
import { createCompanySchema } from "@/lib/schemas/longlist";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
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

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const team_id = formData.get("team_id") as string;

    if (!file) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "ファイルを選択してください" } },
        { status: 400 }
      );
    }

    if (!team_id) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "チームIDは必須です" } },
        { status: 400 }
      );
    }

    // CSVファイルを読み込み
    const text = await file.text();
    const lines = text.split("\n").filter((line) => line.trim());

    if (lines.length < 2) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "CSVファイルが空です" } },
        { status: 400 }
      );
    }

    // ヘッダー行を解析
    const headers = lines[0]!.split(",").map((h) => h.trim());

    // データ行を解析
    const companies = [];
    const errors = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i]!.split(",").map((v) => v.trim());

      const rowData: Record<string, unknown> = { team_id };

      headers.forEach((header, index) => {
        const value = values[index]?.replace(/^"|"$/g, "") || undefined;
        if (value) {
          rowData[header] = value;
        }
      });

      const validated = createCompanySchema.safeParse(rowData);

      if (validated.success) {
        companies.push({
          ...validated.data,
          created_by: user.id,
        });
      } else {
        errors.push({
          row: i + 1,
          error: validated.error.format(),
        });
      }
    }

    if (companies.length === 0) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "有効なデータがありません",
            details: errors,
          },
        },
        { status: 400 }
      );
    }

    // 一括挿入
    const { data, error: insertError } = await supabase
      .from("longlist_companies")
      .insert(companies)
      .select();

    if (insertError) {
      console.error("Error importing companies:", insertError);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "企業のインポートに失敗しました" } },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        imported: data?.length ?? 0,
        errors: errors.length > 0 ? errors : undefined,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}
