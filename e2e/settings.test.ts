import { test, expect } from "@playwright/test";

test.describe("Settings", () => {
  test("renders settings page", async ({ page }) => {
    await page.goto("/settings");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot("settings-page.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("renders webhooks settings page", async ({ page }) => {
    await page.goto("/settings/webhooks");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot("settings-webhooks.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
});
