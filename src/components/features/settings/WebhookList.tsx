import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WebhookConfig } from "@/types";
import { formatDate } from "@/lib/utils/date";

interface WebhookListProps {
  webhooks: WebhookConfig[];
}

export function WebhookList({ webhooks }: WebhookListProps) {
  if (webhooks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">
          No webhooks configured yet.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Platform</TableHead>
          <TableHead>Repository</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {webhooks.map((webhook) => (
          <TableRow key={webhook.id}>
            <TableCell>
              <Badge variant="outline" className="capitalize">
                {webhook.platform}
              </Badge>
            </TableCell>
            <TableCell className="font-medium">
              {webhook.repository}
            </TableCell>
            <TableCell>
              <Badge
                variant={webhook.is_active ? "success" : "secondary"}
              >
                {webhook.is_active ? "Active" : "Inactive"}
              </Badge>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {formatDate(webhook.created_at)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
