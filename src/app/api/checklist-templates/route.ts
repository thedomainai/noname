import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth";
import { createErrorResponse } from "@/lib/schemas/error";

export async function GET() {
  try {
    await requireAuth();

    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from("checklist_templates")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch checklist templates:", error);
      return NextResponse.json(
        createErrorResponse("DATABASE_ERROR", "Failed to fetch checklist templates"),
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error("Unexpected error in GET /api/checklist-templates:", error);
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message === "Unauthorized") {
      return NextResponse.json(
        createErrorResponse("UNAUTHORIZED", "Authentication required"),
        { status: 401 }
      );
    }

    return NextResponse.json(
      createErrorResponse("INTERNAL_ERROR", "An unexpected error occurred"),
      { status: 500 }
    );
  }
}
