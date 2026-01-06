import { expect, test } from '@playwright/test';

test('Verify All Products and product detail page', async ({ page }) => {

  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.click('a[href="/products"]');

  await expect(page).toHaveURL(/.*products/);
  await expect(page.locator('text=All Products')).toBeVisible();

  const productsList = page.locator('.features_items');
  await expect(productsList).toBeVisible();
  const products = page.locator('.single-products');
  await expect(await products.count()).toBeGreaterThan(0);

  await page.locator('a[href="/product_details/1"]').first().click();

  await expect(page).toHaveURL(/.*product_details/);

  await expect(page.locator('.product-information h2')).toBeVisible(); 
  await expect(page.locator('.product-information p', { hasText: 'Category' })).toBeVisible();
  await expect(page.locator('.product-information span span')).toBeVisible();
  await expect(page.locator('.product-information p', { hasText: 'Availability' })).toBeVisible();
  await expect(page.locator('.product-information p', { hasText: 'Condition' })).toBeVisible();
  await expect(page.locator('.product-information p', { hasText: 'Brand' })).toBeVisible();
});
