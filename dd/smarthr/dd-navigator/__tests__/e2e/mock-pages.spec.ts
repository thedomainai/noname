import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3002";
const SCREENSHOT_DIR = "__tests__/e2e/screenshots-mock";

test.describe("DD Navigator Mock Mode - All Pages", () => {
  test("01 - Dashboard", async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/01-dashboard.png`,
      fullPage: true,
    });
    // SummaryCards が表示されている
    await expect(page.locator("text=アクティブ案件")).toBeVisible();
    await expect(page.locator("text=ロングリスト企業")).toBeVisible();
  });

  test("02 - Dashboard (mobile)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/02-dashboard-mobile.png`,
      fullPage: true,
    });
  });

  test("03 - Deals list", async ({ page }) => {
    await page.goto(`${BASE_URL}/deals`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/03-deals-list.png`,
      fullPage: true,
    });
    await expect(page.locator("text=ABC テクノロジー買収案件")).toBeVisible();
  });

  test("04 - Deal detail", async ({ page }) => {
    await page.goto(`${BASE_URL}/deals/deal-001`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/04-deal-detail.png`,
      fullPage: true,
    });
  });

  test("05 - Deal Q&A", async ({ page }) => {
    await page.goto(`${BASE_URL}/deals/deal-001/qa`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/05-deal-qa.png`,
      fullPage: true,
    });
  });

  test("06 - Deal Documents", async ({ page }) => {
    await page.goto(`${BASE_URL}/deals/deal-001/documents`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/06-deal-documents.png`,
      fullPage: true,
    });
  });

  test("07 - Deal Findings", async ({ page }) => {
    await page.goto(`${BASE_URL}/deals/deal-001/findings`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/07-deal-findings.png`,
      fullPage: true,
    });
  });

  test("08 - Deal Checklist", async ({ page }) => {
    await page.goto(`${BASE_URL}/deals/deal-001/checklist`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/08-deal-checklist.png`,
      fullPage: true,
    });
  });

  test("09 - Longlist", async ({ page }) => {
    await page.goto(`${BASE_URL}/longlist`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/09-longlist.png`,
      fullPage: true,
    });
  });

  test("10 - Settings", async ({ page }) => {
    await page.goto(`${BASE_URL}/settings`);
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `${SCREENSHOT_DIR}/10-settings.png`,
      fullPage: true,
    });
  });
});
