import { createServerClient } from "@/lib/supabase/server";
import { listDocumentsQuerySchema } from "@/lib/schemas/document";
import { getFileExtension } from "@/lib/utils/file";
import { checkStorageQuota, updateStorageUsage } from "@/lib/services/storage-quota";
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
    const queryParams = {
      category_id: searchParams.get("category_id") || undefined,
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "50",
    };

    const validated = listDocumentsQuerySchema.safeParse(queryParams);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "クエリパラメータが不正です",
            details: validated.error.format(),
          },
        },
        { status: 400 }
      );
    }

    const { category_id, page, limit } = validated.data;
    const offset = (page - 1) * limit;

    let query = supabase
      .from("documents")
      .select("*", { count: "exact" })
      .eq("deal_id", id)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (category_id) {
      query = query.eq("category_id", category_id);
    }

    const { data: documents, error, count } = await query;

    if (error) {
      console.error("Error fetching documents:", error);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "資料の取得に失敗しました" } },
        { status: 500 }
      );
    }

    return NextResponse.json({
      documents,
      total: count ?? 0,
      page,
      limit,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}

export async function POST(
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

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const name = formData.get("name") as string;
    const category_id = formData.get("category_id") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "ファイルを選択してください" } },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "資料名は必須です" } },
        { status: 400 }
      );
    }

    // 案件のteam_idを取得
    const { data: deal, error: dealError } = await supabase
      .from("deals")
      .select("team_id")
      .eq("id", id)
      .single();

    if (dealError || !deal) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "案件が見つかりません" } },
        { status: 404 }
      );
    }

    // ストレージ容量チェック
    const quotaCheck = await checkStorageQuota(deal.team_id, file.size);
    if (!quotaCheck.allowed) {
      return NextResponse.json(
        { error: { code: "QUOTA_EXCEEDED", message: quotaCheck.message } },
        { status: 413 }
      );
    }

    // ファイルをストレージにアップロード
    const extension = getFileExtension(file.name);
    const storagePath = `${deal.team_id}/${id}/${Date.now()}_${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(storagePath, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return NextResponse.json(
        { error: { code: "UPLOAD_ERROR", message: "ファイルのアップロードに失敗しました" } },
        { status: 500 }
      );
    }

    // ドキュメントレコードを作成
    const { data: document, error: docError } = await supabase
      .from("documents")
      .insert({
        deal_id: id,
        category_id: category_id || null,
        name,
        original_filename: file.name,
        file_extension: extension,
        file_size_bytes: file.size,
        mime_type: file.type,
        storage_path: storagePath,
        uploaded_by: user.id,
      })
      .select()
      .single();

    if (docError) {
      console.error("Error creating document record:", docError);
      // ストレージからファイルを削除
      await supabase.storage.from("documents").remove([storagePath]);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "資料の登録に失敗しました" } },
        { status: 500 }
      );
    }

    // ストレージ使用量を更新
    await updateStorageUsage(deal.team_id, file.size);

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}
