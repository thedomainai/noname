import { createServerClient } from "@/lib/supabase/server";
import type { Session, User } from "@supabase/supabase-js";

export type UserRole = "admin" | "qa_engineer" | "viewer";

export interface UserWithRole extends User {
  role: UserRole;
}

export async function requireAuth(): Promise<Session> {
  const supabase = await createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function getCurrentUser(): Promise<UserWithRole | null> {
  const supabase = await createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, name, avatar_url, role")
    .eq("id", session.user.id)
    .single();

  if (error || !user) {
    return null;
  }

  return {
    ...session.user,
    role: user.role as UserRole,
  };
}

export async function requireRole(
  allowedRoles: UserRole[]
): Promise<UserWithRole> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!allowedRoles.includes(user.role)) {
    throw new Error("Forbidden");
  }

  return user;
}
