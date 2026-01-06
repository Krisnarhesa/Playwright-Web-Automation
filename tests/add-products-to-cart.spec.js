import { expect, test } from '@playwright/test';

test('Add Products in Cart', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.click('a[href="/products"]');

  const firstProduct = page.locator('.single-products').first();
  await firstProduct.hover();
  await firstProduct.locator('a.add-to-cart').first().click();

  await page.click('button:has-text("Continue Shopping")');

  const secondProduct = page.locator('.single-products').nth(1);
  await secondProduct.hover();
  await secondProduct.locator('a.add-to-cart').first().click();

  await page.click('text=View Cart');

  const cartProducts = page.locator('#cart_info tbody tr');
  await expect(await cartProducts.count()).toBeGreaterThanOrEqual(2);

  const firstCartItem = cartProducts.first();
  await expect(firstCartItem.locator('.cart_price')).toBeVisible();
  await expect(firstCartItem.locator('.cart_quantity')).toBeVisible();
  await expect(firstCartItem.locator('.cart_total_price')).toBeVisible();

  const secondCartItem = cartProducts.nth(1);
  await expect(secondCartItem.locator('.cart_price')).toBeVisible();
  await expect(secondCartItem.locator('.cart_quantity')).toBeVisible();
  await expect(secondCartItem.locator('.cart_total_price')).toBeVisible();
});
