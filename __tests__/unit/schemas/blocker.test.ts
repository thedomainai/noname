import { describe, it, expect } from "vitest";
import {
  blockerSchema,
  createBlockerSchema,
  resolveBlockerSchema,
} from "@/lib/schemas/blocker";

describe("blockerSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      title: "API endpoint not ready",
      description: "Waiting for backend team to implement /api/users endpoint",
      resolved: false,
      resolved_at: null,
      resolved_by_id: null,
      created_by_id: "323e4567-e89b-12d3-a456-426614174002",
      created_at: "2024-03-15T14:30:00.000Z",
    };

    const result = blockerSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("解決済みの入力で parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      title: "API endpoint not ready",
      description: "Waiting for backend team to implement /api/users endpoint",
      resolved: true,
      resolved_at: "2024-03-15T15:00:00.000Z",
      resolved_by_id: "423e4567-e89b-12d3-a456-426614174003",
      created_by_id: "323e4567-e89b-12d3-a456-426614174002",
      created_at: "2024-03-15T14:30:00.000Z",
    };

    const result = blockerSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("description が null でも parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      title: "API endpoint not ready",
      description: null,
      resolved: false,
      resolved_at: null,
      resolved_by_id: null,
      created_by_id: "323e4567-e89b-12d3-a456-426614174002",
      created_at: "2024-03-15T14:30:00.000Z",
    };

    const result = blockerSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("title が空文字列で parse 失敗", () => {
    const invalidInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      title: "",
      description: null,
      resolved: false,
      resolved_at: null,
      resolved_by_id: null,
      created_by_id: "323e4567-e89b-12d3-a456-426614174002",
      created_at: "2024-03-15T14:30:00.000Z",
    };

    expect(() => blockerSchema.parse(invalidInput)).toThrow();
  });

  it("id が不正な UUID で parse 失敗", () => {
    const invalidInput = {
      id: "invalid-uuid",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      title: "API endpoint not ready",
      description: null,
      resolved: false,
      resolved_at: null,
      resolved_by_id: null,
      created_by_id: "323e4567-e89b-12d3-a456-426614174002",
      created_at: "2024-03-15T14:30:00.000Z",
    };

    expect(() => blockerSchema.parse(invalidInput)).toThrow();
  });
});

describe("createBlockerSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      title: "API endpoint not ready",
      description: "Waiting for backend team to implement /api/users endpoint",
    };

    const result = createBlockerSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("description が省略されても parse 成功", () => {
    const validInput = {
      title: "API endpoint not ready",
    };

    const result = createBlockerSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("title が 500 文字でも parse 成功", () => {
    const validInput = {
      title: "a".repeat(500),
    };

    const result = createBlockerSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("title が空文字列で parse 失敗", () => {
    const invalidInput = {
      title: "",
    };

    expect(() => createBlockerSchema.parse(invalidInput)).toThrow();
  });

  it("title が 500 文字超で parse 失敗", () => {
    const invalidInput = {
      title: "a".repeat(501),
    };

    expect(() => createBlockerSchema.parse(invalidInput)).toThrow();
  });

  it("description が 2000 文字超で parse 失敗", () => {
    const invalidInput = {
      title: "API endpoint not ready",
      description: "a".repeat(2001),
    };

    expect(() => createBlockerSchema.parse(invalidInput)).toThrow();
  });
});

describe("resolveBlockerSchema", () => {
  it("resolved が true で parse 成功", () => {
    const validInput = {
      resolved: true,
    };

    const result = resolveBlockerSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("resolved が false で parse 成功", () => {
    const validInput = {
      resolved: false,
    };

    const result = resolveBlockerSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("resolved が boolean でない場合 parse 失敗", () => {
    const invalidInput = {
      resolved: "true",
    };

    expect(() => resolveBlockerSchema.parse(invalidInput)).toThrow();
  });

  it("必須フィールド欠落で parse 失敗", () => {
    const invalidInput = {};

    expect(() => resolveBlockerSchema.parse(invalidInput)).toThrow();
  });
});
