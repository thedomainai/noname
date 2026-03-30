import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth";
import { applyTemplateSchema } from "@/lib/schemas/checklist";
import { createErrorResponse } from "@/lib/schemas/error";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(["admin", "qa_engineer"]);

    const { id } = await params;
    const body = await request.json();
    const parsed = applyTemplateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        createErrorResponse(
          "VALIDATION_ERROR",
          "Invalid input",
          parsed.error.format()
        ),
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    // テンプレートを取得
    const { data: template, error: templateError } = await supabase
      .from("checklist_templates")
      .select("items")
      .eq("id", parsed.data.template_id)
      .single();

    if (templateError || !template) {
      return NextResponse.json(
        createErrorResponse("NOT_FOUND", "Template not found"),
        { status: 404 }
      );
    }

    // テンプレートアイテムをチェックリストとして追加
    const items = (template.items as Array<{ title: string; description?: string }>).map(
      (item) => ({
        pull_request_id: id,
        title: item.title,
        description: item.description || null,
      })
    );

    const { data, error } = await supabase
      .from("checklist_items")
      .insert(items)
      .select();

    if (error) {
      console.error("Failed to apply template:", error);
      return NextResponse.json(
        createErrorResponse("DATABASE_ERROR", "Failed to apply template"),
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error(
      "Unexpected error in POST /api/pull-requests/[id]/apply-template:",
      error
    );
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message === "Unauthorized") {
      return NextResponse.json(
        createErrorResponse("UNAUTHORIZED", "Authentication required"),
        { status: 401 }
      );
    }

    if (message === "Forbidden") {
      return NextResponse.json(
        createErrorResponse("FORBIDDEN", "Insufficient permissions"),
        { status: 403 }
      );
    }

    return NextResponse.json(
      createErrorResponse("INTERNAL_ERROR", "An unexpected error occurred"),
      { status: 500 }
    );
  }
}
