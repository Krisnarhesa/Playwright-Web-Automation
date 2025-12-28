import { expect, test } from '@playwright/test';

test('Search Product', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click on 'Products' button
  await page.click('a[href="/products"]');

  // 5. Verify user is navigated to ALL PRODUCTS page successfully
  await expect(page).toHaveURL(/.*products/);
  await expect(page.locator('text=All Products')).toBeVisible();

  // 6. Enter product name in search input and click search button
  await page.fill('input#search_product', 'Dress');
  await page.click('button#submit_search');

  // 7. Verify 'SEARCHED PRODUCTS' is visible
  await expect(page.locator('text=Searched Products')).toBeVisible();

  // 8. Verify all the products related to search are visible
  const searchResults = page.locator('.single-products');
  await expect(await searchResults.count()).toBeGreaterThan(0);
});
