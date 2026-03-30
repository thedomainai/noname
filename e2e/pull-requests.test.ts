import { test, expect } from "@playwright/test";

test.describe("Pull Requests", () => {
  test("renders pull requests page", async ({ page }) => {
    await page.goto("/pull-requests");
    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { name: /Pull Requests/i })
    ).toBeVisible();
    await expect(
      page.getByText("Manage QA reviews for all pull requests")
    ).toBeVisible();

    await expect(page).toHaveScreenshot("pull-requests-empty.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("status filter is displayed", async ({ page }) => {
    await page.goto("/pull-requests");
    await page.waitForLoadState("networkidle");

    // StatusFilter component should be visible
    const filterArea = page.locator('[class*="flex"]').filter({
      hasText: /pending|in_progress|testing|approved|blocked/i,
    });

    await expect(page).toHaveScreenshot("pull-requests-filter.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
});
