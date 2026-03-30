import { test, expect } from "@playwright/test";

// Login page tests run WITHOUT auth state (no storageState dependency)
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Login Page", () => {
  test("renders login form", async ({ page }) => {
    await page.goto("/login");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { name: /QA Merge Desk/i })).toBeVisible();
    await expect(page.getByText("Continue with GitHub")).toBeVisible();
    await expect(page.getByText("Send magic link")).toBeVisible();

    await expect(page).toHaveScreenshot("login-page.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("shows email input and magic link button", async ({ page }) => {
    await page.goto("/login");
    await page.waitForLoadState("networkidle");

    const emailInput = page.getByPlaceholder("you@example.com");
    await expect(emailInput).toBeVisible();

    await emailInput.fill("test@example.com");
    await expect(page).toHaveScreenshot("login-email-filled.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("redirects unauthenticated users to login", async ({ page }) => {
    await page.goto("/");
    await page.waitForURL("**/login**");

    await expect(page).toHaveScreenshot("redirect-to-login.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
});
