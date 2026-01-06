import { expect, test } from '@playwright/test';

test('Search Product', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.click('a[href="/products"]');

  await expect(page).toHaveURL(/.*products/);
  await expect(page.locator('text=All Products')).toBeVisible();

  await page.fill('input#search_product', 'Dress');
  await page.click('button#submit_search');

  await expect(page.locator('text=Searched Products')).toBeVisible();

  const searchResults = page.locator('.single-products');
  await expect(await searchResults.count()).toBeGreaterThan(0);
});
