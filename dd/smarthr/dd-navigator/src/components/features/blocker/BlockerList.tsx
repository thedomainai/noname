import type { Blocker } from "@/types/qa-merge";
import { BlockerItem } from "./BlockerItem";

interface BlockerListProps {
  blockers: Blocker[];
  onResolve: (blockerId: string) => Promise<void>;
}

export function BlockerList({ blockers, onResolve }: BlockerListProps) {
  const unresolvedBlockers = blockers.filter((b) => !b.resolved);
  const resolvedBlockers = blockers.filter((b) => b.resolved);

  if (blockers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-500">No blockers reported.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Unresolved Blockers */}
      {unresolvedBlockers.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Active Blockers ({unresolvedBlockers.length})
          </h3>
          <div className="space-y-3">
            {unresolvedBlockers.map((blocker) => (
              <BlockerItem
                key={blocker.id}
                blocker={blocker}
                onResolve={onResolve}
              />
            ))}
          </div>
        </div>
      )}

      {/* Resolved Blockers */}
      {resolvedBlockers.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-3">
            Resolved Blockers ({resolvedBlockers.length})
          </h3>
          <div className="space-y-3 opacity-60">
            {resolvedBlockers.map((blocker) => (
              <BlockerItem
                key={blocker.id}
                blocker={blocker}
                onResolve={onResolve}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
