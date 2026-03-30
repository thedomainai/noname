import { describe, it, expect } from "vitest";
import {
  checklistItemSchema,
  createChecklistItemSchema,
  toggleChecklistItemSchema,
  checklistTemplateSchema,
} from "@/lib/schemas/checklist";

describe("checklistItemSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      title: "Check browser compatibility",
      description: "Test on Chrome, Firefox, and Safari",
      is_completed: false,
      completed_at: null,
      completed_by_id: null,
      created_at: "2024-03-15T14:30:00.000Z",
    };

    const result = checklistItemSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("完了状態の入力で parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      title: "Check browser compatibility",
      description: "Test on Chrome, Firefox, and Safari",
      is_completed: true,
      completed_at: "2024-03-15T15:00:00.000Z",
      completed_by_id: "323e4567-e89b-12d3-a456-426614174002",
      created_at: "2024-03-15T14:30:00.000Z",
    };

    const result = checklistItemSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("description が null でも parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      title: "Check browser compatibility",
      description: null,
      is_completed: false,
      completed_at: null,
      completed_by_id: null,
      created_at: "2024-03-15T14:30:00.000Z",
    };

    const result = checklistItemSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("title が空文字列で parse 失敗", () => {
    const invalidInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      pull_request_id: "223e4567-e89b-12d3-a456-426614174001",
      title: "",
      description: null,
      is_completed: false,
      completed_at: null,
      completed_by_id: null,
      created_at: "2024-03-15T14:30:00.000Z",
    };

    expect(() => checklistItemSchema.parse(invalidInput)).toThrow();
  });
});

describe("createChecklistItemSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      title: "Check browser compatibility",
      description: "Test on Chrome, Firefox, and Safari",
    };

    const result = createChecklistItemSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("description が省略されても parse 成功", () => {
    const validInput = {
      title: "Check browser compatibility",
    };

    const result = createChecklistItemSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("title が 500 文字でも parse 成功", () => {
    const validInput = {
      title: "a".repeat(500),
    };

    const result = createChecklistItemSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("title が空文字列で parse 失敗", () => {
    const invalidInput = {
      title: "",
    };

    expect(() => createChecklistItemSchema.parse(invalidInput)).toThrow();
  });

  it("title が 500 文字超で parse 失敗", () => {
    const invalidInput = {
      title: "a".repeat(501),
    };

    expect(() => createChecklistItemSchema.parse(invalidInput)).toThrow();
  });

  it("description が 2000 文字超で parse 失敗", () => {
    const invalidInput = {
      title: "Check browser compatibility",
      description: "a".repeat(2001),
    };

    expect(() => createChecklistItemSchema.parse(invalidInput)).toThrow();
  });
});

describe("toggleChecklistItemSchema", () => {
  it("is_completed が true で parse 成功", () => {
    const validInput = {
      is_completed: true,
    };

    const result = toggleChecklistItemSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("is_completed が false で parse 成功", () => {
    const validInput = {
      is_completed: false,
    };

    const result = toggleChecklistItemSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("is_completed が boolean でない場合 parse 失敗", () => {
    const invalidInput = {
      is_completed: "true",
    };

    expect(() => toggleChecklistItemSchema.parse(invalidInput)).toThrow();
  });

  it("必須フィールド欠落で parse 失敗", () => {
    const invalidInput = {};

    expect(() => toggleChecklistItemSchema.parse(invalidInput)).toThrow();
  });
});

describe("checklistTemplateSchema", () => {
  it("有効な入力で parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Standard QA Checklist",
      description: "Default checklist for all pull requests",
      items: [
        {
          title: "Check browser compatibility",
          description: "Test on Chrome, Firefox, and Safari",
        },
        {
          title: "Verify responsive design",
        },
      ],
      is_active: true,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    const result = checklistTemplateSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("description が null でも parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Standard QA Checklist",
      description: null,
      items: [
        {
          title: "Check browser compatibility",
        },
      ],
      is_active: true,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    const result = checklistTemplateSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("items が空配列でも parse 成功", () => {
    const validInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Empty Template",
      description: null,
      items: [],
      is_active: false,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    const result = checklistTemplateSchema.parse(validInput);

    expect(result).toEqual(validInput);
  });

  it("items の title が空文字列で parse 失敗", () => {
    const invalidInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "Standard QA Checklist",
      description: null,
      items: [
        {
          title: "",
        },
      ],
      is_active: true,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    expect(() => checklistTemplateSchema.parse(invalidInput)).toThrow();
  });

  it("name が空文字列で parse 失敗", () => {
    const invalidInput = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "",
      description: null,
      items: [],
      is_active: true,
      created_at: "2024-03-15T14:30:00.000Z",
      updated_at: "2024-03-15T14:30:00.000Z",
    };

    expect(() => checklistTemplateSchema.parse(invalidInput)).toThrow();
  });
});
