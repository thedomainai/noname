import { describe, it, expect } from "vitest";
import {
  assignQAEngineerSchema,
  toggleChecklistItemSchema,
  addChecklistItemSchema,
  applyChecklistTemplateSchema,
  addCommentSchema,
  addBlockerSchema,
  resolveBlockerSchema,
} from "@/lib/schemas/server-actions";

describe("assignQAEngineerSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      assigneeId: "223e4567-e89b-12d3-a456-426614174001",
    };

    const result = assignQAEngineerSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("assigneeId が null でも parse 成功", () => {
    const validInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      assigneeId: null,
    };

    const result = assignQAEngineerSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("pullRequestId が不正な UUID で parse 失敗", () => {
    const invalidInput = {
      pullRequestId: "invalid-uuid",
      assigneeId: null,
    };

    expect(() => assignQAEngineerSchema.parse(invalidInput)).toThrow();
  });

  it("assigneeId が不正な UUID で parse 失敗", () => {
    const invalidInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      assigneeId: "invalid-uuid",
    };

    expect(() => assignQAEngineerSchema.parse(invalidInput)).toThrow();
  });

  it("必須フィールド欠落で parse 失敗", () => {
    const invalidInput = {
      assigneeId: null,
    };

    expect(() => assignQAEngineerSchema.parse(invalidInput)).toThrow();
  });
});

describe("toggleChecklistItemSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      itemId: "123e4567-e89b-12d3-a456-426614174000",
      isCompleted: true,
    };

    const result = toggleChecklistItemSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("isCompleted が false でも parse 成功", () => {
    const validInput = {
      itemId: "123e4567-e89b-12d3-a456-426614174000",
      isCompleted: false,
    };

    const result = toggleChecklistItemSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("itemId が不正な UUID で parse 失敗", () => {
    const invalidInput = {
      itemId: "invalid-uuid",
      isCompleted: true,
    };

    expect(() => toggleChecklistItemSchema.parse(invalidInput)).toThrow();
  });

  it("isCompleted が boolean でない場合 parse 失敗", () => {
    const invalidInput = {
      itemId: "123e4567-e89b-12d3-a456-426614174000",
      isCompleted: "true",
    };

    expect(() => toggleChecklistItemSchema.parse(invalidInput)).toThrow();
  });
});

describe("addChecklistItemSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      title: "Check browser compatibility",
    };

    const result = addChecklistItemSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("title が 500 文字でも parse 成功", () => {
    const validInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      title: "a".repeat(500),
    };

    const result = addChecklistItemSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("title が空文字列で parse 失敗", () => {
    const invalidInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      title: "",
    };

    expect(() => addChecklistItemSchema.parse(invalidInput)).toThrow();
  });

  it("title が 500 文字超で parse 失敗", () => {
    const invalidInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      title: "a".repeat(501),
    };

    expect(() => addChecklistItemSchema.parse(invalidInput)).toThrow();
  });
});

describe("applyChecklistTemplateSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      templateId: "123e4567-e89b-12d3-a456-426614174000",
    };

    const result = applyChecklistTemplateSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("templateId が不正な UUID で parse 失敗", () => {
    const invalidInput = {
      templateId: "invalid-uuid",
    };

    expect(() => applyChecklistTemplateSchema.parse(invalidInput)).toThrow();
  });
});

describe("addCommentSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      content: "This looks good to me!",
    };

    const result = addCommentSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("content が 10000 文字でも parse 成功", () => {
    const validInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      content: "a".repeat(10000),
    };

    const result = addCommentSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("content が空文字列で parse 失敗", () => {
    const invalidInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      content: "",
    };

    expect(() => addCommentSchema.parse(invalidInput)).toThrow();
  });

  it("content が 10000 文字超で parse 失敗", () => {
    const invalidInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      content: "a".repeat(10001),
    };

    expect(() => addCommentSchema.parse(invalidInput)).toThrow();
  });
});

describe("addBlockerSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      title: "API endpoint not ready",
      description: "Waiting for backend team to implement /api/users endpoint",
    };

    const result = addBlockerSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("description が null でも parse 成功", () => {
    const validInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      title: "API endpoint not ready",
      description: null,
    };

    const result = addBlockerSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("title が空文字列で parse 失敗", () => {
    const invalidInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      title: "",
      description: null,
    };

    expect(() => addBlockerSchema.parse(invalidInput)).toThrow();
  });

  it("title が 500 文字超で parse 失敗", () => {
    const invalidInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      title: "a".repeat(501),
      description: null,
    };

    expect(() => addBlockerSchema.parse(invalidInput)).toThrow();
  });

  it("description が 5000 文字超で parse 失敗", () => {
    const invalidInput = {
      pullRequestId: "123e4567-e89b-12d3-a456-426614174000",
      title: "API endpoint not ready",
      description: "a".repeat(5001),
    };

    expect(() => addBlockerSchema.parse(invalidInput)).toThrow();
  });
});

describe("resolveBlockerSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      blockerId: "123e4567-e89b-12d3-a456-426614174000",
    };

    const result = resolveBlockerSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("blockerId が不正な UUID で parse 失敗", () => {
    const invalidInput = {
      blockerId: "invalid-uuid",
    };

    expect(() => resolveBlockerSchema.parse(invalidInput)).toThrow();
  });

  it("必須フィールド欠落で parse 失敗", () => {
    const invalidInput = {};

    expect(() => resolveBlockerSchema.parse(invalidInput)).toThrow();
  });
});
