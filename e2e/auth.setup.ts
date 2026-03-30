import { test as setup, expect } from "@playwright/test";

const SUPABASE_URL = "http://127.0.0.1:54331";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

setup("authenticate", async ({ page }) => {
  // 1. Get session tokens from Supabase auth API
  const res = await page.request.post(
    `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
      },
      data: {
        email: "test@example.com",
        password: "testpassword123",
      },
    }
  );
  expect(res.ok()).toBeTruthy();
  const session = await res.json();

  // 2. Navigate to login page (loads the Next.js app)
  await page.goto("http://localhost:3000/login");
  await page.waitForLoadState("networkidle");

  // 3. Set session cookies via document.cookie
  // @supabase/ssr uses cookie name: sb-{hostname.split(".")[0]}-auth-token
  // For http://127.0.0.1:54331, hostname = "127.0.0.1", split(".")[0] = "127"
  // Cookie key: "sb-127-auth-token"
  //
  // The @supabase/ssr reader supports "base64-" prefixed values.
  // We use base64url encoding to avoid cookie size/charset issues.
  const sessionJSON = JSON.stringify({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_at: session.expires_at,
    expires_in: session.expires_in,
    token_type: "bearer",
    user: session.user,
  });

  const cookieKey = "sb-127-auth-token";

  // Set cookie via document.cookie (same mechanism as @supabase/ssr browser client)
  // Use base64url encoding with "base64-" prefix for reliability
  await page.evaluate(
    ({ key, json }) => {
      // base64url encode (browser-compatible)
      const base64 = btoa(json)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
      const value = "base64-" + base64;

      // Check if chunking is needed (MAX_CHUNK_SIZE = 3180)
      const encoded = encodeURIComponent(value);
      const maxAge = 100 * 365 * 24 * 60 * 60; // ~100 years
      const options = `; path=/; max-age=${maxAge}; samesite=lax`;

      if (encoded.length <= 3180) {
        document.cookie = `${key}=${encoded}${options}`;
      } else {
        // Chunk the encoded value
        let remaining = encoded;
        let i = 0;
        while (remaining.length > 0) {
          let chunk = remaining.slice(0, 3180);
          // Don't split a %-encoded sequence
          const lastPct = chunk.lastIndexOf("%");
          if (lastPct > 3180 - 3) {
            chunk = chunk.slice(0, lastPct);
          }
          remaining = remaining.slice(chunk.length);
          document.cookie = `${key}.${i}=${chunk}${options}`;
          i++;
        }
      }
    },
    { key: cookieKey, json: sessionJSON }
  );

  // 4. Verify authentication by navigating to dashboard
  await page.goto("http://localhost:3000/");
  await page.waitForLoadState("networkidle");

  // 5. Save state for other tests
  await page.context().storageState({ path: "e2e/.auth/user.json" });
});
