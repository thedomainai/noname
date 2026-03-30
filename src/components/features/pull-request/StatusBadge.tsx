import { Badge } from "@/components/ui/badge";
import { QAStatus } from "@/types";

interface StatusBadgeProps {
  status: QAStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config: Record<
    QAStatus,
    { label: string; variant: "default" | "secondary" | "success" | "warning" | "destructive" }
  > = {
    pending: { label: "Pending", variant: "secondary" },
    in_progress: { label: "In Progress", variant: "default" },
    testing: { label: "Testing", variant: "warning" },
    approved: { label: "Approved", variant: "success" },
    blocked: { label: "Blocked", variant: "destructive" },
  };

  const { label, variant } = config[status];

  return <Badge variant={variant}>{label}</Badge>;
}
