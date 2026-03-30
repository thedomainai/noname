import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
  test("renders dashboard page with summary", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Should show dashboard heading
    await expect(
      page.getByRole("heading", { name: /Dashboard/i })
    ).toBeVisible();

    await expect(page).toHaveScreenshot("dashboard-empty.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("sidebar navigation is visible", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Check sidebar links
    await expect(page.getByRole("link", { name: /Dashboard/i })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Pull Requests/i })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Settings/i })).toBeVisible();

    await expect(page).toHaveScreenshot("dashboard-sidebar.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
});
