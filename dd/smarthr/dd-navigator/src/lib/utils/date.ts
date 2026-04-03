import { format, formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "-";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "yyyy年M月d日", { locale: ja });
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return "-";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "yyyy年M月d日 HH:mm", { locale: ja });
}

export function formatRelativeTime(
  date: Date | string | null | undefined
): string {
  if (!date) return "-";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: ja });
}
