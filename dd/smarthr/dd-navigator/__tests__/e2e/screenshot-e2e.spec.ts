import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3002";
const SCREENSHOT_DIR = "__tests__/e2e/screenshots";

test.describe("DD Navigator Screenshot E2E Tests", () => {
  test.describe("Login Page", () => {
    test("displays login form correctly", async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/01-login-page.png`,
        fullPage: true,
      });
      await expect(page.locator("h1")).toContainText("DD Navigator");
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();
    });

    test("shows validation on empty submit", async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.waitForLoadState("networkidle");
      const emailInput = page.locator('input[type="email"]');
      await emailInput.fill("");
      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/02-login-validation.png`,
        fullPage: true,
      });
    });

    test("shows email sent state after valid submit", async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.waitForLoadState("networkidle");
      const emailInput = page.locator('input[type="email"]');
      await emailInput.fill("test@example.com");
      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(2000);
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/03-login-after-submit.png`,
        fullPage: true,
      });
    });
  });

  test.describe("Unauthenticated redirects", () => {
    test("redirects / to login", async ({ page }) => {
      const response = await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/04-root-redirect.png`,
        fullPage: true,
      });
      // Should redirect to login since not authenticated
      expect(page.url()).toContain("/login");
    });

    test("redirects /deals to login", async ({ page }) => {
      await page.goto(`${BASE_URL}/deals`);
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/05-deals-redirect.png`,
        fullPage: true,
      });
      expect(page.url()).toContain("/login");
    });

    test("redirects /longlist to login", async ({ page }) => {
      await page.goto(`${BASE_URL}/longlist`);
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/06-longlist-redirect.png`,
        fullPage: true,
      });
      expect(page.url()).toContain("/login");
    });

    test("redirects /settings to login", async ({ page }) => {
      await page.goto(`${BASE_URL}/settings`);
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/07-settings-redirect.png`,
        fullPage: true,
      });
      expect(page.url()).toContain("/login");
    });
  });

  test.describe("Login Page Responsive", () => {
    test("mobile viewport (375x667)", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(`${BASE_URL}/login`);
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/08-login-mobile.png`,
        fullPage: true,
      });
    });

    test("tablet viewport (768x1024)", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(`${BASE_URL}/login`);
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/09-login-tablet.png`,
        fullPage: true,
      });
    });

    test("desktop viewport (1440x900)", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`${BASE_URL}/login`);
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/10-login-desktop.png`,
        fullPage: true,
      });
    });
  });

  test.describe("404 Page", () => {
    test("shows not found page", async ({ page }) => {
      await page.goto(`${BASE_URL}/nonexistent-page`);
      await page.waitForLoadState("networkidle");
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/11-404-page.png`,
        fullPage: true,
      });
    });
  });

  test.describe("API Routes", () => {
    test("auth callback without code returns error", async ({ page }) => {
      const response = await page.goto(`${BASE_URL}/api/auth/callback`);
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/12-auth-callback-no-code.png`,
        fullPage: true,
      });
    });
  });
});
