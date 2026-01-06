import { expect, test } from '@playwright/test';

test('View & Cart Brand Products', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.click('a[href="/products"]');

  await expect(page.locator('.brands_products')).toBeVisible();
  await expect(page.locator('text=Brands')).toBeVisible();

  await page.click('a[href="/brand_products/Polo"]');

  await expect(page).toHaveURL(/.*brand_products/);
  await expect(page.locator('.title.text-center')).toContainText('Brand');
  await expect(page.locator('.features_items')).toBeVisible();

  await page.click('a[href="/brand_products/H&M"]');

  await expect(page).toHaveURL(/.*brand_products\/H&M/);
  await expect(page.locator('.features_items')).toBeVisible();
});
