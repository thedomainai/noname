import { z } from "zod";

export const createTeamSchema = z.object({
  name: z.string().min(1, "チーム名は必須です").max(100),
  plan: z.enum(["free", "standard", "premium"]).default("free"),
});

export const inviteMemberSchema = z.object({
  team_id: z.string().uuid("有効なチームIDを指定してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  role: z.enum(["admin", "member", "viewer"]),
});

export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
