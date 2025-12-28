import { expect, test } from '@playwright/test';

test('Verify Test Cases Page', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click on 'Test Cases' button
  await page.click('a[href="/test_cases"]');

  // 5. Verify user is navigated to test cases page successfully
  await expect(page).toHaveURL(/.*test_cases/);
  await expect(page.locator('text=Test Cases')).toBeVisible();
});
