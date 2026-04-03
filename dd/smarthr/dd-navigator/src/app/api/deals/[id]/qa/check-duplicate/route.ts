import { createServerClient } from "@/lib/supabase/server";
import { checkDuplicateQASchema } from "@/lib/schemas/qa";
import { detectDuplicateQuestions } from "@/lib/services/duplicate-detection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await request.json();

    const validated = checkDuplicateQASchema.safeParse({
      ...body,
      deal_id: id,
    });

    if (!validated.success) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "入力データが不正です",
            details: validated.error.format(),
          },
        },
        { status: 400 }
      );
    }

    const duplicates = await detectDuplicateQuestions(
      validated.data.deal_id,
      validated.data.question
    );

    return NextResponse.json({
      has_duplicate: duplicates.length > 0,
      duplicates: duplicates.length > 0 ? duplicates : undefined,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}
