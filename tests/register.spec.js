import { expect, test } from '@playwright/test';

test('Register User', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);
  
  // 4. Click on 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 5. Verify 'New User Signup!' is visible
  await expect(page.locator('text=New User Signup!')).toBeVisible();

  // 6. Enter name and email address
  const timestamp = Date.now();
  const testName = 'Test User';
  const testEmail = `testuser${timestamp}@example.com`;
  
  await page.fill('input[data-qa="signup-name"]', testName);
  await page.fill('input[data-qa="signup-email"]', testEmail);

  // 7. Click 'Signup' button
  await page.click('button[data-qa="signup-button"]');

  // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
  await expect(page.locator('text=Enter Account Information')).toBeVisible();

  // 9. Fill details: Title, Name, Email, Password, Date of birth
  await page.check('#id_gender1'); // Mr.
  await page.fill('input[data-qa="password"]', 'TestPass123');
  await page.selectOption('select[data-qa="days"]', '15');
  await page.selectOption('select[data-qa="months"]', '6');
  await page.selectOption('select[data-qa="years"]', '1990');

  // 10. Select checkbox 'Sign up for our newsletter!'
  await page.check('#newsletter');

  // 11. Select checkbox 'Receive special offers from our partners!'
  await page.check('#optin');

  // 12. Fill details: First name, Last name, Company, Address, etc.
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

  // 13. Click 'Create Account button'
  await page.click('button[data-qa="create-account"]');

  // 14. Verify that 'ACCOUNT CREATED!' is visible
  await expect(page.locator('text=Account Created!')).toBeVisible();

  // 15. Click 'Continue' button
  await page.click('a[data-qa="continue-button"]');

  // 16. Verify that 'Logged in as username' is visible
  await expect(page.locator('text=Logged in as')).toBeVisible();
  await expect(page.locator(`text=${testName}`)).toBeVisible();

  // 17. Click 'Delete Account' button
  await page.click('a[href="/delete_account"]');

  // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  await expect(page.locator('text=Account Deleted!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});
