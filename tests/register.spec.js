import { expect, test } from '@playwright/test';

test('Register User', async ({ page }) => {

  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveTitle(/Automation Exercise/);
  
  await page.click('a[href="/login"]');

  await expect(page.locator('text=New User Signup!')).toBeVisible();

  const timestamp = Date.now();
  const testName = 'Test User';
  const testEmail = `testuser${timestamp}@example.com`;
  
  await page.fill('input[data-qa="signup-name"]', testName);
  await page.fill('input[data-qa="signup-email"]', testEmail);

  await page.click('button[data-qa="signup-button"]');

  await expect(page.locator('text=Enter Account Information')).toBeVisible();

  await page.check('#id_gender1');
  await page.fill('input[data-qa="password"]', 'TestPass123');
  await page.selectOption('select[data-qa="days"]', '15');
  await page.selectOption('select[data-qa="months"]', '6');
  await page.selectOption('select[data-qa="years"]', '1990');

  await page.check('#newsletter');

  await page.check('#optin');

 
  await page.fill('input[data-qa="first_name"]', 'Test');
  await page.fill('input[data-qa="last_name"]', 'User');
  await page.fill('input[data-qa="company"]', 'Test Company');
  await page.fill('input[data-qa="address"]', '123 Test Street');
  await page.fill('input[data-qa="address2"]', 'Apt 4B');
  await page.selectOption('select[data-qa="country"]', 'United States');
  await page.fill('input[data-qa="state"]', 'California');
  await page.fill('input[data-qa="city"]', 'Los Angeles');
  await page.fill('input[data-qa="zipcode"]', '90001');
  await page.fill('input[data-qa="mobile_number"]', '1234567890');

  await page.click('button[data-qa="create-account"]');

  await expect(page.locator('text=Account Created!')).toBeVisible();

  await page.click('a[data-qa="continue-button"]');

  await expect(page.locator('text=Logged in as')).toBeVisible();
  await expect(page.locator(`text=${testName}`)).toBeVisible();

  await page.click('a[href="/delete_account"]');

  await expect(page.locator('text=Account Deleted!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});
