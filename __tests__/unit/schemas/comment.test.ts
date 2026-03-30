import { describe, it, expect } from "vitest";
import {
  commentSchema,
  createCommentSchema,
  commentWithAuthorSchema,
} from "@/lib/schemas/comment";

describe("commentSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      author_id: "323e4567-e89b-12d3-a456-426614174002",
      content: "This looks good to me!",
      screenshot_url: "https://example.com/screenshot.png",
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    const result = commentSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("screenshot_url が null でも parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      author_id: "323e4567-e89b-12d3-a456-426614174002",
      content: "This looks good to me!",
      screenshot_url: null,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    const result = commentSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("content が空文字列で parse 失敗", () => {
    const invalidInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      author_id: "323e4567-e89b-12d3-a456-426614174002",
      content: "",
      screenshot_url: null,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    expect(() => commentSchema.parse(invalidInput)).toThrow();
  });

  it("screenshot_url が無効な URL で parse 失敗", () => {
    const invalidInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      author_id: "323e4567-e89b-12d3-a456-426614174002",
      content: "This looks good to me!",
      screenshot_url: "invalid-url",
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    expect(() => commentSchema.parse(invalidInput)).toThrow();
  });

  it("id が不正な UUID で parse 失敗", () => {
    const invalidInput = {
      id: "invalid-uuid",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      author_id: "323e4567-e89b-12d3-a456-426614174002",
      content: "This looks good to me!",
      screenshot_url: null,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    expect(() => commentSchema.parse(invalidInput)).toThrow();
  });
});

describe("createCommentSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      content: "This looks good to me!",
      screenshot_url: "https://example.com/screenshot.png",
    };

    const result = createCommentSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("screenshot_url が省略されても parse 成功", () => {
    const validInput = {
      content: "This looks good to me!",
    };

    const result = createCommentSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("content が 5000 文字でも parse 成功", () => {
    const validInput = {
      content: "a".repeat(5000),
    };

    const result = createCommentSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("content が空文字列で parse 失敗", () => {
    const invalidInput = {
      content: "",
    };

    expect(() => createCommentSchema.parse(invalidInput)).toThrow();
  });

  it("content が 5000 文字超で parse 失敗", () => {
    const invalidInput = {
      content: "a".repeat(5001),
    };

    expect(() => createCommentSchema.parse(invalidInput)).toThrow();
  });

  it("screenshot_url が無効な URL で parse 失敗", () => {
    const invalidInput = {
      content: "This looks good to me!",
      screenshot_url: "invalid-url",
    };

    expect(() => createCommentSchema.parse(invalidInput)).toThrow();
  });
});

describe("commentWithAuthorSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      author_id: "323e4567-e89b-12d3-a456-426614174002",
      content: "This looks good to me!",
      screenshot_url: "https://example.com/screenshot.png",
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
      author_name: "John Doe",
      author_email: "john@example.com",
      author_avatar_url: "https://example.com/avatar.jpg",
    };

    const result = commentWithAuthorSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("author_avatar_url が null でも parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      author_id: "323e4567-e89b-12d3-a456-426614174002",
      content: "This looks good to me!",
      screenshot_url: null,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
      author_name: "John Doe",
      author_email: "john@example.com",
      author_avatar_url: null,
    };

    const result = commentWithAuthorSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("author_avatar_url が省略されても parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      author_id: "323e4567-e89b-12d3-a456-426614174002",
      content: "This looks good to me!",
      screenshot_url: null,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
      author_name: "John Doe",
      author_email: "john@example.com",
    };

    const result = commentWithAuthorSchema.parse(validInput);

    expect(result.author_avatar_url).toBeUndefined();
  });

  it("author_name が空文字列でも parse 成功（z.string() に min 制約なし）", () => {
    const input = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      author_id: "323e4567-e89b-12d3-a456-426614174002",
      content: "This looks good to me!",
      screenshot_url: null,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
      author_name: "",
      author_email: "john@example.com",
    };

    const result = commentWithAuthorSchema.parse(input);
    expect(result.author_name).toBe("");
  });

  it("author_avatar_url が無効な URL で parse 失敗", () => {
    const invalidInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      author_id: "323e4567-e89b-12d3-a456-426614174002",
      content: "This looks good to me!",
      screenshot_url: null,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
      author_name: "John Doe",
      author_email: "john@example.com",
      author_avatar_url: "invalid-url",
    };

    expect(() => commentWithAuthorSchema.parse(invalidInput)).toThrow();
  });
});
