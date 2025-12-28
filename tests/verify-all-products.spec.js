import { expect, test } from '@playwright/test';

test('Verify All Products and product detail page', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click on 'Products' button
  await page.click('a[href="/products"]');

  // 5. Verify user is navigated to ALL PRODUCTS page successfully
  await expect(page).toHaveURL(/.*products/);
  await expect(page.locator('text=All Products')).toBeVisible();

  // 6. The products list is visible
  const productsList = page.locator('.features_items');
  await expect(productsList).toBeVisible();
  const products = page.locator('.single-products');
  await expect(await products.count()).toBeGreaterThan(0);

  // 7. Click on 'View Product' of first product
  await page.locator('a[href="/product_details/1"]').first().click();

  // 8. User is landed to product detail page
  await expect(page).toHaveURL(/.*product_details/);

  // 9. Verify that detail is visible: product name, category, price, availability, condition, brand
  await expect(page.locator('.product-information h2')).toBeVisible(); // Product name
  await expect(page.locator('.product-information p', { hasText: 'Category' })).toBeVisible();
  await expect(page.locator('.product-information span span')).toBeVisible(); // Price
  await expect(page.locator('.product-information p', { hasText: 'Availability' })).toBeVisible();
  await expect(page.locator('.product-information p', { hasText: 'Condition' })).toBeVisible();
  await expect(page.locator('.product-information p', { hasText: 'Brand' })).toBeVisible();
});
