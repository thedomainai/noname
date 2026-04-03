import { z } from "zod";

export const userRoleEnum = z.enum(["admin", "dd_lead", "analyst", "viewer"]);

export const loginSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
});

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  display_name: z.string().nullable(),
  role: userRoleEnum,
  created_at: z.string(),
  updated_at: z.string(),
});

export type UserRole = z.infer<typeof userRoleEnum>;
export type LoginInput = z.infer<typeof loginSchema>;
export type User = z.infer<typeof userSchema>;
