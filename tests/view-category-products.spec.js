import { expect, test } from '@playwright/test';

test('View Category Products', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page.locator('.left-sidebar')).toBeVisible();
  await expect(page.locator('text=Category')).toBeVisible();

  await page.click('a[href="#Women"]');

  await page.click('a[href="/category_products/2"]');

  await expect(page).toHaveURL(/.*category_products/);
  await expect(page.locator('.title.text-center')).toContainText('Women - Tops Products');

  await page.click('a[href="#Men"]');
  await page.click('a[href="/category_products/3"]');

  await expect(page).toHaveURL(/.*category_products\/3/);
  await expect(page.locator('.title.text-center')).toContainText('Men');
});
