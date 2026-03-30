const hits = new Map<string, { count: number; resetAt: number }>();

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
}

/**
 * Simple in-memory rate limiter.
 * Suitable for single-instance deployments (Vercel serverless functions share memory within a warm instance).
 */
export function checkRateLimit(
  key: string,
  limit: number,
  intervalMs: number
): RateLimitResult {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + intervalMs });
    return { success: true, limit, remaining: limit - 1 };
  }

  entry.count += 1;

  if (entry.count > limit) {
    return { success: false, limit, remaining: 0 };
  }

  return { success: true, limit, remaining: limit - entry.count };
}
