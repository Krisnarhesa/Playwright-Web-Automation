import { expect, test } from '@playwright/test';

test('Login User with incorrect email and password', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.click('a[href="/login"]');

  await expect(page.locator('text=Login to your account')).toBeVisible();

  await page.fill('input[data-qa="login-email"]', 'wrong@example.com');
  await page.fill('input[data-qa="login-password"]', 'WrongPassword123');

  await page.click('button[data-qa="login-button"]');

  await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
});
