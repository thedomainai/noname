import { createServerClient } from "@/lib/supabase/server";

export async function checkStorageQuota(
  teamId: string,
  fileSize: number
): Promise<{ allowed: boolean; message?: string }> {
  const supabase = await createServerClient();

  const { data: team, error } = await supabase
    .from("teams")
    .select("storage_used_bytes, storage_limit_bytes")
    .eq("id", teamId)
    .single();

  if (error || !team) {
    return {
      allowed: false,
      message: "チーム情報の取得に失敗しました",
    };
  }

  const newUsage = team.storage_used_bytes + fileSize;

  if (newUsage > team.storage_limit_bytes) {
    return {
      allowed: false,
      message: `ストレージ容量を超過します（使用量: ${(newUsage / 1024 / 1024 / 1024).toFixed(2)} GB / 上限: ${(team.storage_limit_bytes / 1024 / 1024 / 1024).toFixed(2)} GB）`,
    };
  }

  return { allowed: true };
}

export async function updateStorageUsage(
  teamId: string,
  delta: number
): Promise<void> {
  const supabase = await createServerClient();

  const { error } = await supabase.rpc("update_storage_usage", {
    p_team_id: teamId,
    p_delta: delta,
  });

  if (error) {
    console.error("Error updating storage usage:", error);
    throw error;
  }
}
