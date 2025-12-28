import { expect, test } from '@playwright/test';

test('View Category Products', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that categories are visible on left side bar
  await expect(page.locator('.left-sidebar')).toBeVisible();
  await expect(page.locator('text=Category')).toBeVisible();

  // 4. Click on 'Women' category
  await page.click('a[href="#Women"]');

  // 5. Click on any category link under 'Women' category, for example: Dress
  await page.click('a[href="/category_products/1"]');

  // 6. Verify that category page is displayed and confirm text 'WOMEN - DRESS PRODUCTS'
  await expect(page).toHaveURL(/.*category_products/);
  await expect(page.locator('.title.text-center')).toContainText('Women');

  // 7. On left side bar, click on any sub-category link of 'Men' category
  await page.click('a[href="#Men"]');
  await page.click('a[href="/category_products/3"]');

  // 8. Verify that user is navigated to that category page
  await expect(page).toHaveURL(/.*category_products\/3/);
  await expect(page.locator('.title.text-center')).toContainText('Men');
});
