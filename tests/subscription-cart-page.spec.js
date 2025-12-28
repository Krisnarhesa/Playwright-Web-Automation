import { expect, test } from '@playwright/test';

test('Verify Subscription in Cart page', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click 'Cart' button
  await page.click('a[href="/view_cart"]');

  // 5. Scroll down to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // 6. Verify text 'SUBSCRIPTION'
  await expect(page.locator('text=Subscription')).toBeVisible();

  // 7. Enter email address in input and click arrow button
  await page.fill('input#susbscribe_email', `test${Date.now()}@example.com`);
  await page.click('button#subscribe');

  // 8. Verify success message 'You have been successfully subscribed!' is visible
  await expect(page.locator('text=You have been successfully subscribed!')).toBeVisible();
});
