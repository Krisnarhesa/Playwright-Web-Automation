import { expect, test } from '@playwright/test';

test('Verify Subscription in home page', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Scroll down to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // 5. Verify text 'SUBSCRIPTION'
  await expect(page.locator('text=Subscription')).toBeVisible();

  // 6. Enter email address in input and click arrow button
  await page.fill('input#susbscribe_email', `test${Date.now()}@example.com`);
  await page.click('button#subscribe');

  // 7. Verify success message 'You have been successfully subscribed!' is visible
  await expect(page.locator('text=You have been successfully subscribed!')).toBeVisible();
});
