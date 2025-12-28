import { expect, test } from '@playwright/test';

test('View & Cart Brand Products', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Click on 'Products' button
  await page.click('a[href="/products"]');

  // 4. Verify that Brands are visible on left side bar
  await expect(page.locator('.brands_products')).toBeVisible();
  await expect(page.locator('text=Brands')).toBeVisible();

  // 5. Click on any brand name
  await page.click('a[href="/brand_products/Polo"]');

  // 6. Verify that user is navigated to brand page and brand products are displayed
  await expect(page).toHaveURL(/.*brand_products/);
  await expect(page.locator('.title.text-center')).toContainText('Brand');
  await expect(page.locator('.features_items')).toBeVisible();

  // 7. On left side bar, click on any other brand link
  await page.click('a[href="/brand_products/H&M"]');

  // 8. Verify that user is navigated to that brand page and can see products
  await expect(page).toHaveURL(/.*brand_products\/H&M/);
  await expect(page.locator('.features_items')).toBeVisible();
});
