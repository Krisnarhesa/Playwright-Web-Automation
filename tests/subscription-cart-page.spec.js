import { expect, test } from '@playwright/test';

test('Verify Subscription in Cart page', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.click('a[href="/view_cart"]');

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await expect(page.locator('text=Subscription')).toBeVisible();

  await page.fill('input#susbscribe_email', `test${Date.now()}@example.com`);
  await page.click('button#subscribe');
  
  await expect(page.locator('text=You have been successfully subscribed!')).toBeVisible();
});
