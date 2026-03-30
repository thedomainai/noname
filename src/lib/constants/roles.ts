import type { UserRole } from "@/lib/auth";

export const ROLES: Record<UserRole, UserRole> = {
  admin: "admin",
  qa_engineer: "qa_engineer",
  viewer: "viewer",
};

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin",
  qa_engineer: "QA Engineer",
  viewer: "Viewer",
};
