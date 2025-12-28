import { expect, test } from '@playwright/test';

test('Add review on product', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Click on 'Products' button
  await page.click('a[href="/products"]');

  // 4. Verify user is navigated to ALL PRODUCTS page successfully
  await expect(page).toHaveURL(/.*products/);

  // 5. Click on 'View Product' button
  await page.locator('a[href="/product_details/1"]').first().click();

  // 6. Verify 'Write Your Review' is visible
  await expect(page.locator('text=Write Your Review')).toBeVisible();

  // 7. Enter name, email and review
  await page.fill('input#name', 'Test Reviewer');
  await page.fill('input#email', 'reviewer@example.com');
  await page.fill('textarea#review', 'This is a great product! I really enjoyed using it.');

  // 8. Click 'Submit' button
  await page.click('button#button-review');

  // 9. Verify success message 'Thank you for your review.'
  await expect(page.locator('text=Thank you for your review.')).toBeVisible();
});
