import { describe, it, expect } from "vitest";
import {
  qaCategoryEnum,
  qaStatusEnum,
  qaPriorityEnum,
  createQASchema,
  checkDuplicateQASchema,
  checkDuplicateQAResponseSchema,
} from "@/lib/schemas/qa";

const VALID_UUID = "550e8400-e29b-41d4-a716-446655440000";

describe("qaCategoryEnum", () => {
  const validCategories = ["finance", "legal", "hr", "it", "business", "other"];

  it.each(validCategories)("should accept valid category: %s", (category) => {
    expect(qaCategoryEnum.safeParse(category).success).toBe(true);
  });

  it("should reject invalid category", () => {
    expect(qaCategoryEnum.safeParse("tax").success).toBe(false);
  });

  it("should reject empty string", () => {
    expect(qaCategoryEnum.safeParse("").success).toBe(false);
  });
});

describe("qaStatusEnum", () => {
  const validStatuses = ["open", "answered", "closed"];

  it.each(validStatuses)("should accept valid status: %s", (status) => {
    expect(qaStatusEnum.safeParse(status).success).toBe(true);
  });

  it("should reject invalid status", () => {
    expect(qaStatusEnum.safeParse("draft").success).toBe(false);
  });
});

describe("qaPriorityEnum", () => {
  const validPriorities = ["high", "medium", "low"];

  it.each(validPriorities)("should accept valid priority: %s", (priority) => {
    expect(qaPriorityEnum.safeParse(priority).success).toBe(true);
  });

  it("should reject invalid priority", () => {
    expect(qaPriorityEnum.safeParse("urgent").success).toBe(false);
  });
});

describe("createQASchema", () => {
  const validInput = {
    deal_id: VALID_UUID,
    question: "売上の内訳を教えてください",
    priority: "medium" as const,
    status: "open" as const,
  };

  it("should accept valid input with required fields", () => {
    const result = createQASchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("should accept valid input with all fields", () => {
    const result = createQASchema.safeParse({
      ...validInput,
      category: "finance",
      answer: "回答テスト",
      assigned_to: VALID_UUID,
      due_date: "2026-04-15",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid deal_id", () => {
    const result = createQASchema.safeParse({
      ...validInput,
      deal_id: "not-a-uuid",
    });
    expect(result.success).toBe(false);
  });

  it("should reject empty question", () => {
    const result = createQASchema.safeParse({
      ...validInput,
      question: "",
    });
    expect(result.success).toBe(false);
  });

  it("should reject question exceeding 2000 characters", () => {
    const result = createQASchema.safeParse({
      ...validInput,
      question: "a".repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid priority", () => {
    const result = createQASchema.safeParse({
      ...validInput,
      priority: "urgent",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid status", () => {
    const result = createQASchema.safeParse({
      ...validInput,
      status: "invalid",
    });
    expect(result.success).toBe(false);
  });
});

describe("checkDuplicateQASchema", () => {
  it("should accept valid input", () => {
    const result = checkDuplicateQASchema.safeParse({
      deal_id: VALID_UUID,
      question: "売上の内訳は？",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid deal_id", () => {
    const result = checkDuplicateQASchema.safeParse({
      deal_id: "not-a-uuid",
      question: "売上の内訳は？",
    });
    expect(result.success).toBe(false);
  });

  it("should reject empty question", () => {
    const result = checkDuplicateQASchema.safeParse({
      deal_id: VALID_UUID,
      question: "",
    });
    expect(result.success).toBe(false);
  });

  it("should reject question exceeding 2000 characters", () => {
    const result = checkDuplicateQASchema.safeParse({
      deal_id: VALID_UUID,
      question: "q".repeat(2001),
    });
    expect(result.success).toBe(false);
  });
});

describe("checkDuplicateQAResponseSchema", () => {
  it("should accept response with no duplicates", () => {
    const result = checkDuplicateQAResponseSchema.safeParse({
      has_duplicate: false,
    });
    expect(result.success).toBe(true);
  });

  it("should accept response with duplicates", () => {
    const result = checkDuplicateQAResponseSchema.safeParse({
      has_duplicate: true,
      duplicates: [
        {
          id: VALID_UUID,
          question: "売上の内訳",
          similarity_score: 0.85,
          status: "open",
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it("should accept response with empty duplicates array", () => {
    const result = checkDuplicateQAResponseSchema.safeParse({
      has_duplicate: false,
      duplicates: [],
    });
    expect(result.success).toBe(true);
  });
});
