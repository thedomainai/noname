import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatDate, formatRelativeTime } from "@/lib/utils/date";

describe("formatDate", () => {
  it("ISO文字列を正しくフォーマットする", () => {
    const isoString = "2024-03-15T14:30:00.000Z";
    const result = formatDate(isoString);

    // 環境に依存するため、Date オブジェクトが生成されることを確認
    expect(result).toMatch(/Mar \d{1,2}, 2024/);
    expect(result).toMatch(/\d{2}:\d{2}/);
  });

  it("タイムゾーンに応じて表示される", () => {
    const isoString = "2024-01-01T00:00:00.000Z";
    const result = formatDate(isoString);

    expect(result).toBeTruthy();
    expect(result).toContain("2024");
    expect(result).toContain("Jan");
  });

  it("有効な日付形式を返す", () => {
    const isoString = "2024-12-25T12:00:00.000Z";
    const result = formatDate(isoString);

    expect(result).toMatch(/Dec \d{1,2}, 2024, \d{2}:\d{2}/);
  });
});

describe("formatRelativeTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("1分未満の場合は 'just now' を返す", () => {
    const now = new Date("2024-03-15T14:30:00.000Z");
    vi.setSystemTime(now);

    const recentDate = new Date("2024-03-15T14:29:30.000Z").toISOString();
    const result = formatRelativeTime(recentDate);

    expect(result).toBe("just now");
  });

  it("1分以上1時間未満の場合は 'X minute(s) ago' を返す", () => {
    const now = new Date("2024-03-15T14:30:00.000Z");
    vi.setSystemTime(now);

    const date5MinAgo = new Date("2024-03-15T14:25:00.000Z").toISOString();
    const result5 = formatRelativeTime(date5MinAgo);
    expect(result5).toBe("5 minutes ago");

    const date1MinAgo = new Date("2024-03-15T14:29:00.000Z").toISOString();
    const result1 = formatRelativeTime(date1MinAgo);
    expect(result1).toBe("1 minute ago");
  });

  it("1時間以上24時間未満の場合は 'X hour(s) ago' を返す", () => {
    const now = new Date("2024-03-15T14:30:00.000Z");
    vi.setSystemTime(now);

    const date3HoursAgo = new Date("2024-03-15T11:30:00.000Z").toISOString();
    const result3 = formatRelativeTime(date3HoursAgo);
    expect(result3).toBe("3 hours ago");

    const date1HourAgo = new Date("2024-03-15T13:30:00.000Z").toISOString();
    const result1 = formatRelativeTime(date1HourAgo);
    expect(result1).toBe("1 hour ago");
  });

  it("1日以上7日以内の場合は 'X day(s) ago' を返す", () => {
    const now = new Date("2024-03-15T14:30:00.000Z");
    vi.setSystemTime(now);

    const date3DaysAgo = new Date("2024-03-12T14:30:00.000Z").toISOString();
    const result3 = formatRelativeTime(date3DaysAgo);
    expect(result3).toBe("3 days ago");

    const date1DayAgo = new Date("2024-03-14T14:30:00.000Z").toISOString();
    const result1 = formatRelativeTime(date1DayAgo);
    expect(result1).toBe("1 day ago");
  });

  it("7日を超える場合は formatDate にフォールバックする", () => {
    const now = new Date("2024-03-15T14:30:00.000Z");
    vi.setSystemTime(now);

    const date8DaysAgo = new Date("2024-03-07T14:30:00.000Z").toISOString();
    const result = formatRelativeTime(date8DaysAgo);

    // formatDate と同じ形式になる
    expect(result).toMatch(/Mar \d{1,2}, 2024/);
    expect(result).toMatch(/\d{2}:\d{2}/);
  });

  it("未来の日付でも正しく処理される", () => {
    const now = new Date("2024-03-15T14:30:00.000Z");
    vi.setSystemTime(now);

    const futureDate = new Date("2024-03-16T14:30:00.000Z").toISOString();
    const result = formatRelativeTime(futureDate);

    // 負の差分になるが、formatDate にフォールバックされる
    expect(result).toBeTruthy();
  });
});
