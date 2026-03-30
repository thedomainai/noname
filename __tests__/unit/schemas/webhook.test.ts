import { describe, it, expect } from "vitest";
import {
  platformEnum,
  webhookConfigSchema,
  githubPullRequestPayloadSchema,
  gitlabMergeRequestPayloadSchema,
} from "@/lib/schemas/webhook";

describe("platformEnum", () => {
  it("有効なプラットフォーム値を受け入れる", () => {
    const validPlatforms = ["github", "gitlab"];

    validPlatforms.forEach((platform) => {
      expect(() => platformEnum.parse(platform)).not.toThrow();
    });
  });

  it("無効なプラットフォーム値で parse 失敗", () => {
    expect(() => platformEnum.parse("bitbucket")).toThrow();
  });
});

describe("webhookConfigSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      platform: "github",
      repository: "owner/repo",
      secret_key: "secret-key-12345",
      is_active: true,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    const result = webhookConfigSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("is_active が false でも parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      platform: "gitlab",
      repository: "owner/repo",
      secret_key: "secret-key-12345",
      is_active: false,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    const result = webhookConfigSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("platform が無効で parse 失敗", () => {
    const invalidInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      platform: "bitbucket",
      repository: "owner/repo",
      secret_key: "secret-key-12345",
      is_active: true,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    expect(() => webhookConfigSchema.parse(invalidInput)).toThrow();
  });

  it("repository が空文字列で parse 失敗", () => {
    const invalidInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      platform: "github",
      repository: "",
      secret_key: "secret-key-12345",
      is_active: true,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    expect(() => webhookConfigSchema.parse(invalidInput)).toThrow();
  });
});

describe("githubPullRequestPayloadSchema", () => {
  it("有効な GitHub Webhook ペイロードで parse 成功", () => {
    const validPayload = {
      action: "opened",
      number: 123,
      pull_request: {
        number: 123,
        title: "Add new feature",
        body: "This PR adds a new feature",
        html_url: "https://github.com/owner/repo/pull/123",
        user: {
          login: "john-doe",
        },
      },
      repository: {
        full_name: "owner/repo",
      },
    };

    const result = githubPullRequestPayloadSchema.parse(validPayload);

    expect(result).toEqual(validPayload);
  });

  it("body が null でも parse 成功", () => {
    const validPayload = {
      action: "opened",
      number: 123,
      pull_request: {
        number: 123,
        title: "Add new feature",
        body: null,
        html_url: "https://github.com/owner/repo/pull/123",
        user: {
          login: "john-doe",
        },
      },
      repository: {
        full_name: "owner/repo",
      },
    };

    const result = githubPullRequestPayloadSchema.parse(validPayload);

    expect(result).toEqual(validPayload);
  });

  it("number が負数で parse 失敗", () => {
    const invalidPayload = {
      action: "opened",
      number: -1,
      pull_request: {
        number: -1,
        title: "Add new feature",
        body: null,
        html_url: "https://github.com/owner/repo/pull/123",
        user: {
          login: "john-doe",
        },
      },
      repository: {
        full_name: "owner/repo",
      },
    };

    expect(() => githubPullRequestPayloadSchema.parse(invalidPayload)).toThrow();
  });

  it("html_url が無効で parse 失敗", () => {
    const invalidPayload = {
      action: "opened",
      number: 123,
      pull_request: {
        number: 123,
        title: "Add new feature",
        body: null,
        html_url: "invalid-url",
        user: {
          login: "john-doe",
        },
      },
      repository: {
        full_name: "owner/repo",
      },
    };

    expect(() => githubPullRequestPayloadSchema.parse(invalidPayload)).toThrow();
  });

  it("必須フィールド欠落で parse 失敗", () => {
    const invalidPayload = {
      action: "opened",
      number: 123,
      repository: {
        full_name: "owner/repo",
      },
    };

    expect(() => githubPullRequestPayloadSchema.parse(invalidPayload)).toThrow();
  });
});

describe("gitlabMergeRequestPayloadSchema", () => {
  it("有効な GitLab Webhook ペイロードで parse 成功", () => {
    const validPayload = {
      object_kind: "merge_request",
      object_attributes: {
        iid: 123,
        title: "Add new feature",
        description: "This MR adds a new feature",
        url: "https://gitlab.com/owner/repo/-/merge_requests/123",
        action: "open",
        author: {
          username: "john-doe",
        },
      },
      project: {
        path_with_namespace: "owner/repo",
      },
    };

    const result = gitlabMergeRequestPayloadSchema.parse(validPayload);

    expect(result).toEqual(validPayload);
  });

  it("description が null でも parse 成功", () => {
    const validPayload = {
      object_kind: "merge_request",
      object_attributes: {
        iid: 123,
        title: "Add new feature",
        description: null,
        url: "https://gitlab.com/owner/repo/-/merge_requests/123",
        action: "open",
        author: {
          username: "john-doe",
        },
      },
      project: {
        path_with_namespace: "owner/repo",
      },
    };

    const result = gitlabMergeRequestPayloadSchema.parse(validPayload);

    expect(result).toEqual(validPayload);
  });

  it("object_kind が 'merge_request' でない場合 parse 失敗", () => {
    const invalidPayload = {
      object_kind: "issue",
      object_attributes: {
        iid: 123,
        title: "Add new feature",
        description: null,
        url: "https://gitlab.com/owner/repo/-/merge_requests/123",
        action: "open",
        author: {
          username: "john-doe",
        },
      },
      project: {
        path_with_namespace: "owner/repo",
      },
    };

    expect(() => gitlabMergeRequestPayloadSchema.parse(invalidPayload)).toThrow();
  });

  it("iid が負数で parse 失敗", () => {
    const invalidPayload = {
      object_kind: "merge_request",
      object_attributes: {
        iid: -1,
        title: "Add new feature",
        description: null,
        url: "https://gitlab.com/owner/repo/-/merge_requests/123",
        action: "open",
        author: {
          username: "john-doe",
        },
      },
      project: {
        path_with_namespace: "owner/repo",
      },
    };

    expect(() => gitlabMergeRequestPayloadSchema.parse(invalidPayload)).toThrow();
  });

  it("url が無効で parse 失敗", () => {
    const invalidPayload = {
      object_kind: "merge_request",
      object_attributes: {
        iid: 123,
        title: "Add new feature",
        description: null,
        url: "invalid-url",
        action: "open",
        author: {
          username: "john-doe",
        },
      },
      project: {
        path_with_namespace: "owner/repo",
      },
    };

    expect(() => gitlabMergeRequestPayloadSchema.parse(invalidPayload)).toThrow();
  });
});
