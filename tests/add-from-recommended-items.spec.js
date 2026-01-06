import { expect, test } from '@playwright/test';

test('Add to cart from Recommended items', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await expect(page.locator('text=recommended items')).toBeVisible();

  const recommendedSection = page.locator('.recommended_items');
  await recommendedSection.locator('.add-to-cart').first().click();

  await page.click('text=View Cart');

  await expect(page).toHaveURL(/.*view_cart/);
  const cartItems = page.locator('#cart_info tbody tr');
  await expect(await cartItems.count()).toBeGreaterThan(0);
});
