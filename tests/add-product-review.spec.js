import { expect, test } from '@playwright/test';

test('Add review on product', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.click('a[href="/products"]');

  await expect(page).toHaveURL(/.*products/);

  await page.locator('a[href="/product_details/1"]').first().click();

  await expect(page.locator('text=Write Your Review')).toBeVisible();

  await page.fill('input#name', 'Test Reviewer');
  await page.fill('input#email', 'reviewer@example.com');
  await page.fill('textarea#review', 'This is a great product! I really enjoyed using it.');
  await page.click('button#button-review');

  await expect(page.locator('text=Thank you for your review.')).toBeVisible();
});
