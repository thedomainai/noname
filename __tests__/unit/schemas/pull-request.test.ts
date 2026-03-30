import { describe, it, expect } from "vitest";
import {
  qaStatusEnum,
  sourceEnum,
  pullRequestSchema,
  createPullRequestSchema,
  updateQAStatusSchema,
  listPullRequestsQuerySchema,
} from "@/lib/schemas/pull-request";

describe("qaStatusEnum", () => {
  it("有効なステータス値を受け入れる", () => {
    const validStatuses = [
      "pending",
      "in_progress",
      "testing",
      "approved",
      "blocked",
    ];

    validStatuses.forEach((status) => {
      expect(() => qaStatusEnum.parse(status)).not.toThrow();
    });
  });

  it("無効なステータス値で parse 失敗", () => {
    expect(() => qaStatusEnum.parse("invalid")).toThrow();
    expect(() => qaStatusEnum.parse("done")).toThrow();
  });
});

describe("sourceEnum", () => {
  it("有効なソース値を受け入れる", () => {
    const validSources = ["github", "gitlab", "manual"];

    validSources.forEach((source) => {
      expect(() => sourceEnum.parse(source)).not.toThrow();
    });
  });

  it("無効なソース値で parse 失敗", () => {
    expect(() => sourceEnum.parse("bitbucket")).toThrow();
  });
});

describe("pullRequestSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      number: 123,
      title: "Add new feature",
      description: "This PR adds a new feature",
      repository: "owner/repo",
      author: "john-doe",
      url: "https://github.com/owner/repo/pull/123",
      qa_status: "pending",
      assignee_id: "223e4567-e89b-12d3-a456-426614174001",
      source: "github",
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    const result = pullRequestSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("description と assignee_id が null でも parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      number: 123,
      title: "Add new feature",
      description: null,
      repository: "owner/repo",
      author: "john-doe",
      url: "https://github.com/owner/repo/pull/123",
      qa_status: "pending",
      assignee_id: null,
      source: "github",
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    const result = pullRequestSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("number が負数で parse 失敗", () => {
    const invalidInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      number: -1,
      title: "Add new feature",
      description: null,
      repository: "owner/repo",
      author: "john-doe",
      url: "https://github.com/owner/repo/pull/123",
      qa_status: "pending",
      assignee_id: null,
      source: "github",
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    expect(() => pullRequestSchema.parse(invalidInput)).toThrow();
  });

  it("url が無効で parse 失敗", () => {
    const invalidInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      number: 123,
      title: "Add new feature",
      description: null,
      repository: "owner/repo",
      author: "john-doe",
      url: "invalid-url",
      qa_status: "pending",
      assignee_id: null,
      source: "github",
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    expect(() => pullRequestSchema.parse(invalidInput)).toThrow();
  });
});

describe("createPullRequestSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      number: 123,
      title: "Add new feature",
      description: "This PR adds a new feature",
      repository: "owner/repo",
      author: "john-doe",
      url: "https://github.com/owner/repo/pull/123",
      source: "github",
    };

    const result = createPullRequestSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("description が省略されても parse 成功", () => {
    const validInput = {
      number: 123,
      title: "Add new feature",
      repository: "owner/repo",
      author: "john-doe",
      url: "https://github.com/owner/repo/pull/123",
    };

    const result = createPullRequestSchema.parse(validInput);

    expect(result.source).toBe("manual"); // デフォルト値
  });

  it("source が省略されると 'manual' がデフォルト", () => {
    const validInput = {
      number: 123,
      title: "Add new feature",
      repository: "owner/repo",
      author: "john-doe",
      url: "https://github.com/owner/repo/pull/123",
    };

    const result = createPullRequestSchema.parse(validInput);

    expect(result.source).toBe("manual");
  });

  it("title が 500 文字超で parse 失敗", () => {
    const invalidInput = {
      number: 123,
      title: "a".repeat(501),
      repository: "owner/repo",
      author: "john-doe",
      url: "https://github.com/owner/repo/pull/123",
    };

    expect(() => createPullRequestSchema.parse(invalidInput)).toThrow();
  });

  it("repository が 200 文字超で parse 失敗", () => {
    const invalidInput = {
      number: 123,
      title: "Add new feature",
      repository: "a".repeat(201),
      author: "john-doe",
      url: "https://github.com/owner/repo/pull/123",
    };

    expect(() => createPullRequestSchema.parse(invalidInput)).toThrow();
  });
});

describe("updateQAStatusSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      qa_status: "approved",
    };

    const result = updateQAStatusSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("無効なステータスで parse 失敗", () => {
    const invalidInput = {
      qa_status: "invalid",
    };

    expect(() => updateQAStatusSchema.parse(invalidInput)).toThrow();
  });
});

describe("listPullRequestsQuerySchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      status: "pending",
      assignee_id: "123e4567-e89b-12d3-a456-426614174000",
      repository: "owner/repo",
      page: 2,
      limit: 50,
    };

    const result = listPullRequestsQuerySchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("すべてのフィールドが省略されるとデフォルト値が適用される", () => {
    const emptyInput = {};

    const result = listPullRequestsQuerySchema.parse(emptyInput);

    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
  });

  it("文字列の page を数値に変換する", () => {
    const input = {
      page: "3",
      limit: "30",
    };

    const result = listPullRequestsQuerySchema.parse(input);

    expect(result.page).toBe(3);
    expect(result.limit).toBe(30);
  });

  it("limit が 100 超で parse 失敗", () => {
    const invalidInput = {
      limit: 101,
    };

    expect(() => listPullRequestsQuerySchema.parse(invalidInput)).toThrow();
  });

  it("page が 0 以下で parse 失敗", () => {
    const invalidInput = {
      page: 0,
    };

    expect(() => listPullRequestsQuerySchema.parse(invalidInput)).toThrow();
  });

  it("status が無効な値で parse 失敗", () => {
    const invalidInput = {
      status: "invalid",
    };

    expect(() => listPullRequestsQuerySchema.parse(invalidInput)).toThrow();
  });
});
