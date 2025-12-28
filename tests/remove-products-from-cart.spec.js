import { expect, test } from '@playwright/test';

test('Remove Products From Cart', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Add products to cart
  await page.click('a[href="/products"]');
  const firstProduct = page.locator('.single-products').first();
  await firstProduct.hover();
  await firstProduct.locator('a.add-to-cart').first().click();
  await page.click('button:has-text("Continue Shopping")');

  // 5. Click 'Cart' button
  await page.click('a[href="/view_cart"]');

  // 6. Verify that cart page is displayed
  await expect(page).toHaveURL(/.*view_cart/);

  // 7. Click 'X' button corresponding to particular product
  const cartItemsBeforeRemove = await page.locator('#cart_info tbody tr').count();
  await page.locator('.cart_quantity_delete').first().click();

  // 8. Verify that product is removed from the cart
  await page.waitForTimeout(1000); // Wait for removal animation
  const cartItemsAfterRemove = await page.locator('#cart_info tbody tr').count();
  expect(cartItemsAfterRemove).toBeLessThan(cartItemsBeforeRemove);
});
