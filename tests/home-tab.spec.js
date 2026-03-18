const { test, expect } = require("@playwright/test");

test.describe("Home tab", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // ── Default state ────────────────────────────────────────────────────────

  test("Home tab is active by default", async ({ page }) => {
    const homeTab = page.locator(".nav-tab[data-tab='home']");
    await expect(homeTab).toHaveClass(/active/);
  });

  test("Summary and Transactions tabs are not active by default", async ({ page }) => {
    await expect(page.locator(".nav-tab[data-tab='summary']")).not.toHaveClass(/active/);
    await expect(page.locator(".nav-tab[data-tab='transactions']")).not.toHaveClass(/active/);
  });

  test("Home section is visible on load", async ({ page }) => {
    await expect(page.locator("[data-section='home']")).toBeVisible();
  });

  test("Summary and Transactions sections are hidden on load", async ({ page }) => {
    await expect(page.locator("[data-section='summary']")).toBeHidden();
    await expect(page.locator("[data-section='transactions']")).toBeHidden();
  });

  // ── Content ──────────────────────────────────────────────────────────────

  test("Hero heading is present", async ({ page }) => {
    await expect(page.locator(".home-hero h2")).toHaveText("Your Personal Finance Tracker");
  });

  test("Hero description is present", async ({ page }) => {
    await expect(page.locator(".home-hero p")).toContainText("no accounts, no cloud, no subscriptions");
  });

  test("All three feature cards are visible", async ({ page }) => {
    const cards = page.locator(".home-feature");
    await expect(cards).toHaveCount(3);
    for (const card of await cards.all()) {
      await expect(card).toBeVisible();
    }
  });

  test("Feature card titles are correct", async ({ page }) => {
    const titles = page.locator(".home-feature h3");
    await expect(titles.nth(0)).toHaveText("Log Transactions");
    await expect(titles.nth(1)).toHaveText("Monthly Summary");
    await expect(titles.nth(2)).toHaveText("Filter & Review");
  });

  test("CTA text is present", async ({ page }) => {
    await expect(page.locator(".home-cta")).toContainText("Head to");
    await expect(page.locator(".home-cta")).toContainText("Summary");
    await expect(page.locator(".home-cta")).toContainText("Transactions");
  });

  // ── Navigation: Log Transactions card ───────────────────────────────────

  test("Clicking Log Transactions card switches to Transactions tab", async ({ page }) => {
    await page.locator(".home-feature-link[data-nav='transactions']").click();

    await expect(page.locator(".nav-tab[data-tab='transactions']")).toHaveClass(/active/);
    await expect(page.locator("[data-section='transactions']")).toBeVisible();
    await expect(page.locator("[data-section='home']")).toBeHidden();
  });

  test("Log Transactions card is keyboard-accessible via Enter", async ({ page }) => {
    await page.locator(".home-feature-link[data-nav='transactions']").focus();
    await page.keyboard.press("Enter");

    await expect(page.locator(".nav-tab[data-tab='transactions']")).toHaveClass(/active/);
    await expect(page.locator("[data-section='transactions']")).toBeVisible();
  });

  test("Log Transactions card is keyboard-accessible via Space", async ({ page }) => {
    await page.locator(".home-feature-link[data-nav='transactions']").focus();
    await page.keyboard.press("Space");

    await expect(page.locator(".nav-tab[data-tab='transactions']")).toHaveClass(/active/);
    await expect(page.locator("[data-section='transactions']")).toBeVisible();
  });

  // ── Navigation: CTA link ─────────────────────────────────────────────────

  test("Clicking Transactions CTA link switches to Transactions tab", async ({ page }) => {
    await page.locator(".home-cta a[data-nav='transactions']").click();

    await expect(page.locator(".nav-tab[data-tab='transactions']")).toHaveClass(/active/);
    await expect(page.locator("[data-section='transactions']")).toBeVisible();
    await expect(page.locator("[data-section='home']")).toBeHidden();
  });

  test("CTA Transactions link does not navigate away from the page", async ({ page }) => {
    const url = page.url();
    await page.locator(".home-cta a[data-nav='transactions']").click();
    expect(page.url()).toBe(url);
  });

  // ── Navigation: nav tabs still work ─────────────────────────────────────

  test("Clicking Summary nav tab from Home shows Summary section", async ({ page }) => {
    await page.locator(".nav-tab[data-tab='summary']").click();

    await expect(page.locator(".nav-tab[data-tab='summary']")).toHaveClass(/active/);
    await expect(page.locator("[data-section='summary']")).toBeVisible();
    await expect(page.locator("[data-section='home']")).toBeHidden();
  });

  test("Can navigate back to Home tab from another tab", async ({ page }) => {
    await page.locator(".nav-tab[data-tab='transactions']").click();
    await page.locator(".nav-tab[data-tab='home']").click();

    await expect(page.locator(".nav-tab[data-tab='home']")).toHaveClass(/active/);
    await expect(page.locator("[data-section='home']")).toBeVisible();
    await expect(page.locator("[data-section='transactions']")).toBeHidden();
  });
});
