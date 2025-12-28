import { expect, test } from '@playwright/test';

test('Verify Product quantity in Cart', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click 'View Product' for any product on home page
  await page.locator('a[href="/product_details/1"]').first().click();

  // 5. Verify product detail is opened
  await expect(page).toHaveURL(/.*product_details/);

  // 6. Increase quantity to 4
  await page.fill('input#quantity', '4');

  // 7. Click 'Add to cart' button
  await page.click('button.cart');

  // 8. Click 'View Cart' button
  await page.click('text=View Cart');

  // 9. Verify that product is displayed in cart page with exact quantity
  const quantity = await page.locator('.cart_quantity button').first().textContent();
  expect(quantity?.trim()).toBe('4');
});
