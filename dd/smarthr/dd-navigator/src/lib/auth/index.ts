export type UserRole = "admin" | "qa_engineer" | "viewer";

export interface UserWithRole {
  id: string;
  email: string;
  role: UserRole;
}

const STUB_USER: UserWithRole = {
  id: "00000000-0000-0000-0000-000000000000",
  email: "dev@example.com",
  role: "admin",
};

export async function requireAuth(): Promise<{ user: UserWithRole }> {
  return { user: STUB_USER };
}

export async function getCurrentUser(): Promise<UserWithRole> {
  return STUB_USER;
}

export async function requireRole(
  _allowedRoles: UserRole[]
): Promise<UserWithRole> {
  return STUB_USER;
}
