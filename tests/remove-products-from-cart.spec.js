import { expect, test } from '@playwright/test';

test('Remove Products From Cart', async ({ page }) => {
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

  await page.click('a[href="/view_cart"]');

  await expect(page).toHaveURL(/.*view_cart/);

  const cartItemsBeforeRemove = await page.locator('#cart_info tbody tr').count();
  await page.locator('.cart_quantity_delete').first().click();

  await page.waitForTimeout(1000);
  const cartItemsAfterRemove = await page.locator('#cart_info tbody tr').count();
  expect(cartItemsAfterRemove).toBeLessThan(cartItemsBeforeRemove);
});
