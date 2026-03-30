import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 認証不要なパスを先に除外
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/webhooks") ||
    pathname === "/login"
  ) {
    return NextResponse.next();
  }

  const { supabaseResponse, session } = await updateSession(request);

  if (!session) {
    // 未認証の場合はログインページへリダイレクト
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|_next/dev|favicon.ico|public).*)"],
};
