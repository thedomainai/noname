import type { DealPhase } from "@/types";

export const DEAL_PHASES: DealPhase[] = [
  "sourcing",
  "nda",
  "im_review",
  "loi",
  "dd",
  "negotiation",
  "closing",
  "completed",
  "abandoned",
];

export const DEAL_PHASE_LABELS: Record<DealPhase, string> = {
  sourcing: "ソーシング",
  nda: "NDA締結",
  im_review: "IM検討",
  loi: "LOI提出",
  dd: "デューデリジェンス",
  negotiation: "最終交渉",
  closing: "クロージング準備",
  completed: "完了",
  abandoned: "中止",
};
