import { expect, test } from '@playwright/test';

test('Register User with existing email', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await page.click('a[href="/login"]');
  
  const timestamp = Date.now();
  const testName = 'Existing User';
  const testEmail = `existinguser${timestamp}@example.com`;
  
  await page.fill('input[data-qa="signup-name"]', testName);
  await page.fill('input[data-qa="signup-email"]', testEmail);
  await page.click('button[data-qa="signup-button"]');
  
  await page.check('#id_gender1');
  await page.fill('input[data-qa="password"]', 'TestPass123');
  await page.selectOption('select[data-qa="days"]', '1');
  await page.selectOption('select[data-qa="months"]', '1');
  await page.selectOption('select[data-qa="years"]', '1990');
  await page.fill('input[data-qa="first_name"]', 'Existing');
  await page.fill('input[data-qa="last_name"]', 'User');
  await page.fill('input[data-qa="company"]', 'Test Co');
  await page.fill('input[data-qa="address"]', '123 St');
  await page.selectOption('select[data-qa="country"]', 'United States');
  await page.fill('input[data-qa="state"]', 'CA');
  await page.fill('input[data-qa="city"]', 'LA');
  await page.fill('input[data-qa="zipcode"]', '90001');
  await page.fill('input[data-qa="mobile_number"]', '1234567890');
  await page.click('button[data-qa="create-account"]');
  await page.click('a[data-qa="continue-button"]');
  await page.click('a[href="/logout"]');

  await page.goto('http://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.click('a[href="/login"]');

  await expect(page.locator('text=New User Signup!')).toBeVisible();

  await page.fill('input[data-qa="signup-name"]', 'Another Name');
  await page.fill('input[data-qa="signup-email"]', testEmail);
  await page.click('button[data-qa="signup-button"]');

  await expect(page.locator('text=Email Address already exist!')).toBeVisible();
  
  await page.fill('input[data-qa="login-email"]', testEmail);
  await page.fill('input[data-qa="login-password"]', 'TestPass123');
  await page.click('button[data-qa="login-button"]');
  await page.click('a[href="/delete_account"]');
});
