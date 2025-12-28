import { expect, test } from '@playwright/test';

test('Login User with correct email and password', async ({ page }) => {
  // Note: This test requires a pre-existing account
  // For demo purposes, we'll create an account first, then login
  
  // Step 1: Create account first
  await page.goto('http://automationexercise.com');
  await page.click('a[href="/login"]');
  
  const timestamp = Date.now();
  const testName = 'Login Test User';
  const testEmail = `logintest${timestamp}@example.com`;
  const testPassword = 'TestPass123';
  
  // Quick registration
  await page.fill('input[data-qa="signup-name"]', testName);
  await page.fill('input[data-qa="signup-email"]', testEmail);
  await page.click('button[data-qa="signup-button"]');
  
  await page.check('#id_gender1');
  await page.fill('input[data-qa="password"]', testPassword);
  await page.selectOption('select[data-qa="days"]', '1');
  await page.selectOption('select[data-qa="months"]', '1');
  await page.selectOption('select[data-qa="years"]', '1990');
  await page.fill('input[data-qa="first_name"]', 'Login');
  await page.fill('input[data-qa="last_name"]', 'Test');
  await page.fill('input[data-qa="company"]', 'Test Co');
  await page.fill('input[data-qa="address"]', '123 St');
  await page.selectOption('select[data-qa="country"]', 'United States');
  await page.fill('input[data-qa="state"]', 'CA');
  await page.fill('input[data-qa="city"]', 'LA');
  await page.fill('input[data-qa="zipcode"]', '90001');
  await page.fill('input[data-qa="mobile_number"]', '1234567890');
  await page.click('button[data-qa="create-account"]');
  await page.click('a[data-qa="continue-button"]');
  
  // Logout to test login
  await page.click('a[href="/logout"]');
  
  // Step 2: Now test the actual login flow
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click on 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 5. Verify 'Login to your account' is visible
  await expect(page.locator('text=Login to your account')).toBeVisible();

  // 6. Enter correct email address and password
  await page.fill('input[data-qa="login-email"]', testEmail);
  await page.fill('input[data-qa="login-password"]', testPassword);

  // 7. Click 'login' button
  await page.click('button[data-qa="login-button"]');

  // 8. Verify that 'Logged in as username' is visible
  await expect(page.locator('text=Logged in as')).toBeVisible();
  await expect(page.locator(`text=${testName}`)).toBeVisible();

  // 9. Click 'Delete Account' button
  await page.click('a[href="/delete_account"]');

  // 10. Verify that 'ACCOUNT DELETED!' is visible
  await expect(page.locator('text=Account Deleted!')).toBeVisible();
});
