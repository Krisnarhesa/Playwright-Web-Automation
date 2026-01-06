const { test, expect } = require("@playwright/test");

test("Verify Test Cases Page", async ({ page }) => {

  await page.goto("https://automationexercise.com", {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });

  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.locator("header")
    .getByRole("link", { name: "Test Cases" })
    .click();

  await expect(page).toHaveURL(/\/test_cases/);
});
