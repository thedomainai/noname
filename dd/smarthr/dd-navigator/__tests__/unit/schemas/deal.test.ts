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
  const validPhases = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  it.each(validPhases)("should accept valid phase: %i", (phase) => {
    expect(dealPhaseEnum.safeParse(phase).success).toBe(true);
  });

  it("should reject invalid phase (string)", () => {
    expect(dealPhaseEnum.safeParse("invalid").success).toBe(false);
  });

  it("should reject phase 0", () => {
    expect(dealPhaseEnum.safeParse(0).success).toBe(false);
  });

  it("should reject phase 10", () => {
    expect(dealPhaseEnum.safeParse(10).success).toBe(false);
  });
});

describe("dealStatusEnum", () => {
  const validStatuses = [
    "pending",
    "sourcing",
    "pre_dd",
    "dd_in_progress",
    "dd_completed",
    "negotiation",
    "closing",
    "closed",
    "cancelled",
  ];

  it.each(validStatuses)("should accept valid status: %s", (status) => {
    expect(dealStatusEnum.safeParse(status).success).toBe(true);
  });

  it("should reject invalid status", () => {
    expect(dealStatusEnum.safeParse("deleted").success).toBe(false);
  });
});

describe("createDealSchema", () => {
  const validInput = {
    code: "DEAL-001",
    name: "テスト案件",
    target_company: "テスト株式会社",
    status: "pending" as const,
    phase: 1,
  };

  it("should accept valid input with required fields only", () => {
    const result = createDealSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("should accept valid input with all fields", () => {
    const result = createDealSchema.safeParse({
      ...validInput,
      industry: "IT",
      deal_size: 100000000,
      started_at: "2026-04-01T00:00:00Z",
      expected_close_date: "2026-12-31",
    });
    expect(result.success).toBe(true);
  });

  it("should reject empty name", () => {
    const result = createDealSchema.safeParse({
      ...validInput,
      name: "",
    });
    expect(result.success).toBe(false);
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
  });

  it("should reject empty code", () => {
    const result = createDealSchema.safeParse({
      ...validInput,
      code: "",
    });
    expect(result.success).toBe(false);
  });

  it("should reject missing name", () => {
    const { name: _, ...withoutName } = validInput;
    const result = createDealSchema.safeParse(withoutName);
    expect(result.success).toBe(false);
  });

  it("should reject invalid status", () => {
    const result = createDealSchema.safeParse({
      ...validInput,
      status: "invalid",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid phase (string)", () => {
    const result = createDealSchema.safeParse({
      ...validInput,
      phase: "dd",
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

  it("should reject invalid dealId", () => {
    const result = updateDealPhaseSchema.safeParse({
      dealId: "not-a-uuid",
      phase: "dd",
    });
    expect(result.success).toBe(false);
  });

  it("should reject empty phase", () => {
    const result = updateDealPhaseSchema.safeParse({
      dealId: VALID_UUID,
      phase: "",
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
      phase: "sourcing",
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
