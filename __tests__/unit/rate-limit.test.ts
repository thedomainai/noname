import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

// Each test uses a unique key prefix to avoid cross-test state leakage
// (the in-memory Map persists across tests within the same file)
let testId = 0;
function uniqueKey(base = "user") {
  return `${base}:test-${testId++}`;
}

describe("checkRateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("制限内で success: true を返す", () => {
    vi.setSystemTime(new Date("2024-03-15T14:30:00.000Z"));

    const key = uniqueKey();
    const result = checkRateLimit(key, 10, 60000);

    expect(result.success).toBe(true);
    expect(result.limit).toBe(10);
    expect(result.remaining).toBe(9);
  });

  it("制限超過で success: false を返す", () => {
    vi.setSystemTime(new Date("2024-03-15T14:30:00.000Z"));

    const key = uniqueKey();
    const limit = 3;

    checkRateLimit(key, limit, 60000); // count: 1
    checkRateLimit(key, limit, 60000); // count: 2
    checkRateLimit(key, limit, 60000); // count: 3

    // count: 4 > limit: 3
    const result = checkRateLimit(key, limit, 60000);

    expect(result.success).toBe(false);
    expect(result.limit).toBe(limit);
    expect(result.remaining).toBe(0);
  });

  it("インターバル経過後にリセットされる", () => {
    vi.setSystemTime(new Date("2024-03-15T14:30:00.000Z"));

    const key = uniqueKey();
    const limit = 3;
    const intervalMs = 60000;

    checkRateLimit(key, limit, intervalMs);
    checkRateLimit(key, limit, intervalMs);
    checkRateLimit(key, limit, intervalMs);

    const resultBlocked = checkRateLimit(key, limit, intervalMs);
    expect(resultBlocked.success).toBe(false);

    // Advance past interval
    vi.setSystemTime(new Date("2024-03-15T14:31:00.001Z"));

    const resultAfterReset = checkRateLimit(key, limit, intervalMs);
    expect(resultAfterReset.success).toBe(true);
    expect(resultAfterReset.remaining).toBe(limit - 1);
  });

  it("remaining の計算が正しい", () => {
    vi.setSystemTime(new Date("2024-03-15T14:30:00.000Z"));

    const key = uniqueKey();
    const limit = 5;

    const result1 = checkRateLimit(key, limit, 60000);
    expect(result1.remaining).toBe(4); // count=1, remaining=5-1=4

    const result2 = checkRateLimit(key, limit, 60000);
    expect(result2.remaining).toBe(3); // count=2, remaining=5-2=3

    const result3 = checkRateLimit(key, limit, 60000);
    expect(result3.remaining).toBe(2); // count=3

    const result4 = checkRateLimit(key, limit, 60000);
    expect(result4.remaining).toBe(1); // count=4

    const result5 = checkRateLimit(key, limit, 60000);
    expect(result5.remaining).toBe(0); // count=5

    const result6 = checkRateLimit(key, limit, 60000);
    expect(result6.success).toBe(false); // count=6 > limit=5
    expect(result6.remaining).toBe(0);
  });

  it("異なるキーは独立してカウントされる", () => {
    vi.setSystemTime(new Date("2024-03-15T14:30:00.000Z"));

    const limit = 3;
    const keyA = uniqueKey("userA");
    const keyB = uniqueKey("userB");

    const result1 = checkRateLimit(keyA, limit, 60000);
    expect(result1.remaining).toBe(2); // keyA count=1

    const result2 = checkRateLimit(keyB, limit, 60000);
    expect(result2.remaining).toBe(2); // keyB count=1 (independent)

    const result3 = checkRateLimit(keyA, limit, 60000);
    expect(result3.remaining).toBe(1); // keyA count=2

    const result4 = checkRateLimit(keyB, limit, 60000);
    expect(result4.remaining).toBe(1); // keyB count=2
  });

  it("limit が 1 でも正しく動作する", () => {
    vi.setSystemTime(new Date("2024-03-15T14:30:00.000Z"));

    const key = uniqueKey();

    const result1 = checkRateLimit(key, 1, 60000);
    expect(result1.success).toBe(true);
    expect(result1.remaining).toBe(0);

    const result2 = checkRateLimit(key, 1, 60000);
    expect(result2.success).toBe(false);
    expect(result2.remaining).toBe(0);
  });

  it("interval 経過で新しいウィンドウが開始される", () => {
    const key = uniqueKey();

    vi.setSystemTime(new Date("2024-03-15T14:30:00.000Z"));
    checkRateLimit(key, 3, 60000);
    checkRateLimit(key, 3, 60000);

    // Advance past interval
    vi.setSystemTime(new Date("2024-03-15T14:31:00.001Z"));

    const result = checkRateLimit(key, 3, 60000);
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(2);
  });
});
