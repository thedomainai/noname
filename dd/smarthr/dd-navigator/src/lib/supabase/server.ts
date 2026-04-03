import { createServerClient as createClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createMockSupabaseClient } from "@/lib/mocks/supabase";

export async function createServerClient() {
  if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
    return createMockSupabaseClient() as unknown as ReturnType<typeof createClient>;
  }

  const cookieStore = await cookies();

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Component から呼ばれた場合は set できない
          }
        },
      },
    }
  );
}
