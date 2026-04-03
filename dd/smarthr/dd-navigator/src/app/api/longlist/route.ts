import { createServerClient } from "@/lib/supabase/server";
import {
  createCompanySchema,
  listCompaniesQuerySchema,
} from "@/lib/schemas/longlist";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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

    const { searchParams } = request.nextUrl;
    const queryParams = {
      industry: searchParams.get("industry") || undefined,
      region: searchParams.get("region") || undefined,
      fit_score: searchParams.get("fit_score") || undefined,
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "20",
    };

    const validated = listCompaniesQuerySchema.safeParse(queryParams);

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

    const { industry, region, fit_score, page, limit } = validated.data;
    const offset = (page - 1) * limit;

    let query = supabase
      .from("longlist_companies")
      .select("*", { count: "exact" })
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (industry) {
      query = query.eq("industry", industry);
    }

    if (region) {
      query = query.eq("region", region);
    }

    if (fit_score) {
      query = query.eq("fit_score", fit_score);
    }

    const { data: companies, error, count } = await query;

    if (error) {
      console.error("Error fetching companies:", error);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "企業の取得に失敗しました" } },
        { status: 500 }
      );
    }

    return NextResponse.json({
      companies,
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

    const body = await request.json();
    const validated = createCompanySchema.safeParse(body);

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

    const { data: company, error } = await supabase
      .from("longlist_companies")
      .insert({
        ...validated.data,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating company:", error);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "企業の登録に失敗しました" } },
        { status: 500 }
      );
    }

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}
