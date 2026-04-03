import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // モックモード: 認証をバイパス
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    return NextResponse.next();
  }

  // 認証不要なパスを先に除外
  if (pathname.startsWith("/api/auth") || pathname === "/login") {
    return NextResponse.next();
  }

  const { supabaseResponse, session } = await updateSession(request);

  if (!session) {
    // 未認証の場合
    if (pathname.startsWith("/api/")) {
      // API ルートは 401 を返す
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "Authentication required" } },
        { status: 401 }
      );
    }

    // それ以外はログインページへリダイレクト
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
