import { describe, it, expect } from "vitest";
import { formatDate, formatDateTime, formatRelativeTime } from "@/lib/utils/date";

describe("formatDate", () => {
  it("should return '-' for null", () => {
    expect(formatDate(null)).toBe("-");
  });

  it("should return '-' for undefined", () => {
    expect(formatDate(undefined)).toBe("-");
  });

  it("should format ISO string to Japanese date", () => {
    expect(formatDate("2026-03-15T10:30:00Z")).toBe("2026年3月15日");
  });

  it("should format Date object to Japanese date", () => {
    const date = new Date(2026, 0, 1); // Jan 1, 2026
    expect(formatDate(date)).toBe("2026年1月1日");
  });

  it("should format date without leading zeros", () => {
    expect(formatDate("2026-01-05")).toBe("2026年1月5日");
  });
});

describe("formatDateTime", () => {
  it("should return '-' for null", () => {
    expect(formatDateTime(null)).toBe("-");
  });

  it("should return '-' for undefined", () => {
    expect(formatDateTime(undefined)).toBe("-");
  });

  it("should format ISO string with time", () => {
    // Note: timezone-dependent — using a Date object with explicit local time
    const date = new Date(2026, 2, 15, 14, 30); // Mar 15, 2026 14:30
    expect(formatDateTime(date)).toBe("2026年3月15日 14:30");
  });

  it("should format midnight correctly", () => {
    const date = new Date(2026, 0, 1, 0, 0);
    expect(formatDateTime(date)).toBe("2026年1月1日 00:00");
  });
});

describe("formatRelativeTime", () => {
  it("should return '-' for null", () => {
    expect(formatRelativeTime(null)).toBe("-");
  });

  it("should return '-' for undefined", () => {
    expect(formatRelativeTime(undefined)).toBe("-");
  });

  it("should return relative time string for past dates", () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const result = formatRelativeTime(fiveMinutesAgo);
    expect(result).toContain("前");
  });

  it("should return relative time string for recent dates", () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const result = formatRelativeTime(oneHourAgo);
    expect(result).toContain("前");
  });

  it("should handle string dates", () => {
    const recentDate = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();
    const result = formatRelativeTime(recentDate);
    expect(result).toContain("前");
  });
});
