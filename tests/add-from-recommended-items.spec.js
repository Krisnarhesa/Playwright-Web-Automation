import { expect, test } from '@playwright/test';

test('Add to cart from Recommended items', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Scroll to bottom of page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // 4. Verify 'RECOMMENDED ITEMS' are visible
  await expect(page.locator('text=recommended items')).toBeVisible();

  // 5. Click on 'Add To Cart' on Recommended product
  const recommendedSection = page.locator('.recommended_items');
  await recommendedSection.locator('.add-to-cart').first().click();

  // 6. Click on 'View Cart' button
  await page.click('text=View Cart');

  // 7. Verify that product is displayed in cart page
  await expect(page).toHaveURL(/.*view_cart/);
  const cartItems = page.locator('#cart_info tbody tr');
  await expect(await cartItems.count()).toBeGreaterThan(0);
});
