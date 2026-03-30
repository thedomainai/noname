import { test, expect } from "@playwright/test";

test.describe("Error Pages", () => {
  test("404 page renders correctly", async ({ page }) => {
    await page.goto("/nonexistent-page-xyz");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot("404-page.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
});
