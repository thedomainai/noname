import { describe, it, expect } from "vitest";
import {
  dealPhaseEnum,
  dealStatusEnum,
  createDealSchema,
  updateDealPhaseSchema,
  listDealsQuerySchema,
} from "@/lib/schemas/deal";

const VALID_UUID = "550e8400-e29b-41d4-a716-446655440000";

describe("dealPhaseEnum", () => {
  const validPhases = [
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

  it.each(validPhases)("should accept valid phase: %s", (phase) => {
    expect(dealPhaseEnum.safeParse(phase).success).toBe(true);
  });

  it("should reject invalid phase", () => {
    expect(dealPhaseEnum.safeParse("invalid").success).toBe(false);
  });

  it("should reject empty string", () => {
    expect(dealPhaseEnum.safeParse("").success).toBe(false);
  });
});

describe("dealStatusEnum", () => {
  const validStatuses = ["active", "paused", "completed", "abandoned"];

  it.each(validStatuses)("should accept valid status: %s", (status) => {
    expect(dealStatusEnum.safeParse(status).success).toBe(true);
  });

  it("should reject invalid status", () => {
    expect(dealStatusEnum.safeParse("deleted").success).toBe(false);
  });
});

describe("createDealSchema", () => {
  const validInput = {
    name: "テスト案件",
    target_company: "テスト株式会社",
    team_id: VALID_UUID,
  };

  it("should accept valid input with required fields only", () => {
    const result = createDealSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("should accept valid input with all fields", () => {
    const result = createDealSchema.safeParse({
      ...validInput,
      expected_closing_date: "2026-12-31",
      longlist_company_id: VALID_UUID,
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty name", () => {
    const result = createDealSchema.safeParse({
      ...validInput,
      name: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.message).toBe("案件名は必須です");
    }
  });

  it("should reject name exceeding 200 characters", () => {
    const result = createDealSchema.safeParse({
      ...validInput,
      name: "a".repeat(201),
    });
    expect(result.success).toBe(false);
  });

  it("should reject empty target_company", () => {
    const result = createDealSchema.safeParse({
      ...validInput,
      target_company: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.message).toBe("対象会社名は必須です");
    }
  });

  it("should reject invalid team_id (not UUID)", () => {
    const result = createDealSchema.safeParse({
      ...validInput,
      team_id: "not-a-uuid",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.message).toBe(
        "有効なチームIDを指定してください"
      );
    }
  });

  it("should reject missing name", () => {
    const { name: _, ...withoutName } = validInput;
    const result = createDealSchema.safeParse(withoutName);
    expect(result.success).toBe(false);
  });

  it("should reject invalid longlist_company_id", () => {
    const result = createDealSchema.safeParse({
      ...validInput,
      longlist_company_id: "not-a-uuid",
    });
    expect(result.success).toBe(false);
  });
});

describe("updateDealPhaseSchema", () => {
  it("should accept valid input", () => {
    const result = updateDealPhaseSchema.safeParse({
      dealId: VALID_UUID,
      phase: "dd",
    });
    expect(result.success).toBe(true);
  });

  it("should accept input with notes", () => {
    const result = updateDealPhaseSchema.safeParse({
      dealId: VALID_UUID,
      phase: "dd",
      notes: "フェーズ移行メモ",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid dealId", () => {
    const result = updateDealPhaseSchema.safeParse({
      dealId: "not-a-uuid",
      phase: "dd",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid phase", () => {
    const result = updateDealPhaseSchema.safeParse({
      dealId: VALID_UUID,
      phase: "invalid_phase",
    });
    expect(result.success).toBe(false);
  });
});

describe("listDealsQuerySchema", () => {
  it("should accept empty input with defaults", () => {
    const result = listDealsQuerySchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(1);
      expect(result.data.limit).toBe(20);
    }
  });

  it("should accept valid query parameters", () => {
    const result = listDealsQuerySchema.safeParse({
      phase: "dd",
      status: "active",
      page: 2,
      limit: 50,
    });
    expect(result.success).toBe(true);
  });

  it("should coerce string numbers", () => {
    const result = listDealsQuerySchema.safeParse({
      page: "3",
      limit: "10",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(3);
      expect(result.data.limit).toBe(10);
    }
  });

  it("should reject page less than 1", () => {
    const result = listDealsQuerySchema.safeParse({ page: 0 });
    expect(result.success).toBe(false);
  });

  it("should reject limit greater than 100", () => {
    const result = listDealsQuerySchema.safeParse({ limit: 101 });
    expect(result.success).toBe(false);
  });

  it("should reject invalid phase", () => {
    const result = listDealsQuerySchema.safeParse({ phase: "invalid" });
    expect(result.success).toBe(false);
  });
});
