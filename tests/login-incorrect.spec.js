import { expect, test } from '@playwright/test';

test('Login User with incorrect email and password', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click on 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 5. Verify 'Login to your account' is visible
  await expect(page.locator('text=Login to your account')).toBeVisible();

  // 6. Enter incorrect email address and password
  await page.fill('input[data-qa="login-email"]', 'wrong@example.com');
  await page.fill('input[data-qa="login-password"]', 'WrongPassword123');

  // 7. Click 'login' button
  await page.click('button[data-qa="login-button"]');

  // 8. Verify error 'Your email or password is incorrect!' is visible
  await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
});
