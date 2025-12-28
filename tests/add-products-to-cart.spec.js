import { expect, test } from '@playwright/test';

test('Add Products in Cart', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click 'Products' button
  await page.click('a[href="/products"]');

  // 5. Hover over first product and click 'Add to cart'
  const firstProduct = page.locator('.single-products').first();
  await firstProduct.hover();
  await firstProduct.locator('a.add-to-cart').first().click();

  // 6. Click 'Continue Shopping' button
  await page.click('button:has-text("Continue Shopping")');

  // 7. Hover over second product and click 'Add to cart'
  const secondProduct = page.locator('.single-products').nth(1);
  await secondProduct.hover();
  await secondProduct.locator('a.add-to-cart').first().click();

  // 8. Click 'View Cart' button
  await page.click('text=View Cart');

  // 9. Verify both products are added to Cart
  const cartProducts = page.locator('#cart_info tbody tr');
  await expect(await cartProducts.count()).toBeGreaterThanOrEqual(2);

  // 10. Verify their prices, quantity and total price
  const firstCartItem = cartProducts.first();
  await expect(firstCartItem.locator('.cart_price')).toBeVisible();
  await expect(firstCartItem.locator('.cart_quantity')).toBeVisible();
  await expect(firstCartItem.locator('.cart_total_price')).toBeVisible();
});
