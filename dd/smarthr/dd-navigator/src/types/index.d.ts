export type Role = "owner" | "admin" | "member" | "viewer";

export type DealPhase =
  | "sourcing"
  | "nda"
  | "im_review"
  | "loi"
  | "dd"
  | "negotiation"
  | "closing"
  | "completed"
  | "abandoned";

export type DealStatus = "active" | "paused" | "completed" | "abandoned";

export type QACategory = "finance" | "legal" | "hr" | "it" | "business" | "other";

export type QAStatus = "draft" | "sent" | "received" | "clarification_needed";

export type QAPriority = "high" | "medium" | "low";

export type FindingCategory = "risk" | "opportunity" | "issue" | "information";

export type FindingSeverity = "critical" | "high" | "medium" | "low";

export type FindingStatus = "open" | "under_review" | "resolved" | "accepted";

export type ChecklistCategory = "bdd" | "fdd" | "ldd" | "itdd" | "hrdd" | "general";

export type Plan = "free" | "standard" | "premium";
