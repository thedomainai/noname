import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AssigneeWorkload } from "@/types";

interface WorkloadChartProps {
  workload: AssigneeWorkload[];
}

export function WorkloadChart({ workload }: WorkloadChartProps) {
  if (workload.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">
          No workload data available.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>QA Engineer</TableHead>
          <TableHead className="text-right">Total Assigned</TableHead>
          <TableHead className="text-right">Pending</TableHead>
          <TableHead className="text-right">In Progress</TableHead>
          <TableHead className="text-right">Testing</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workload.map((engineer) => (
          <TableRow key={engineer.assignee_id}>
            <TableCell>
              <div className="flex items-center gap-2">
                {engineer.assignee_avatar_url ? (
                  <img
                    src={engineer.assignee_avatar_url}
                    alt={engineer.assignee_name || "Unknown"}
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                    {(engineer.assignee_name || "?").charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="font-medium">
                  {engineer.assignee_name || "Unknown"}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-right font-semibold">
              {engineer.total_assigned}
            </TableCell>
            <TableCell className="text-right">{engineer.pending}</TableCell>
            <TableCell className="text-right">
              {engineer.in_progress}
            </TableCell>
            <TableCell className="text-right">{engineer.testing}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
