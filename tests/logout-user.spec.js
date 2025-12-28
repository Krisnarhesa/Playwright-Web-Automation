import { expect, test } from '@playwright/test';

test('Logout User', async ({ page }) => {
  // Setup: Create and login to account first
  await page.goto('http://automationexercise.com');
  await page.click('a[href="/login"]');
  
  const timestamp = Date.now();
  const testName = 'Logout Test User';
  const testEmail = `logouttest${timestamp}@example.com`;
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
  await page.fill('input[data-qa="first_name"]', 'Logout');
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

  // Test starts here
  // 1-3. Already navigated and logged in
  
  // 8. Verify that 'Logged in as username' is visible
  await expect(page.locator('text=Logged in as')).toBeVisible();

  // 9. Click 'Logout' button
  await page.click('a[href="/logout"]');

  // 10. Verify that user is navigated to login page
  await expect(page).toHaveURL(/.*login/);
  await expect(page.locator('text=Login to your account')).toBeVisible();
});
