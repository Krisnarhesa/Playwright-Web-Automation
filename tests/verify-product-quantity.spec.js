import { expect, test } from '@playwright/test';

test('Verify Product quantity in Cart', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.locator('a[href="/product_details/1"]').first().click();

  await expect(page).toHaveURL(/.*product_details/);

  await page.fill('input#quantity', '4');

  await page.click('button.cart');

  await page.click('text=View Cart');

  const quantity = await page.locator('.cart_quantity button').first().textContent();
  expect(quantity?.trim()).toBe('4');
});
