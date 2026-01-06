import { expect, test } from '@playwright/test';

test('Place Order: Login before Checkout', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await page.click('a[href="/login"]');
  
  const timestamp = Date.now();
  const testEmail = `logincheckout${timestamp}@example.com`;
  const testPassword = 'TestPass123';
  const testName = 'Login Checkout Test';
  
  await page.fill('input[data-qa="signup-name"]', testName);
  await page.fill('input[data-qa="signup-email"]', testEmail);
  await page.click('button[data-qa="signup-button"]');
  
  await page.check('#id_gender1');
  await page.fill('input[data-qa="password"]', testPassword);
  await page.selectOption('select[data-qa="days"]', '20');
  await page.selectOption('select[data-qa="months"]', '8');
  await page.selectOption('select[data-qa="years"]', '1988');
  await page.fill('input[data-qa="first_name"]', 'Login');
  await page.fill('input[data-qa="last_name"]', 'Checkout');
  await page.fill('input[data-qa="company"]', 'Login Test Co');
  await page.fill('input[data-qa="address"]', '789 Login St');
  await page.selectOption('select[data-qa="country"]', 'United States');
  await page.fill('input[data-qa="state"]', 'Texas');
  await page.fill('input[data-qa="city"]', 'Houston');
  await page.fill('input[data-qa="zipcode"]', '77001');
  await page.fill('input[data-qa="mobile_number"]', '5551234567');
  await page.click('button[data-qa="create-account"]');
  await page.click('a[data-qa="continue-button"]');
  await page.click('a[href="/logout"]');

  await page.goto('http://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.click('a[href="/login"]');

  await page.fill('input[data-qa="login-email"]', testEmail);
  await page.fill('input[data-qa="login-password"]', testPassword);
  await page.click('button[data-qa="login-button"]');

  await expect(page.locator(`text=${testName}`)).toBeVisible();

  await page.click('a[href="/products"]');
  const product = page.locator('.single-products').first();
  await product.hover();
  await product.locator('a.add-to-cart').first().click();
  await page.click('button:has-text("Continue Shopping")');

  await page.click('a[href="/view_cart"]');

  await expect(page).toHaveURL(/.*view_cart/);

  await page.click('text=Proceed To Checkout');

  await expect(page.locator('.checkout-information')).toBeVisible();

  await page.fill('textarea[name="message"]', 'Handle with care');
  await page.click('a[href="/payment"]');

  await page.fill('input[data-qa="name-on-card"]', 'Login Checkout Test');
  await page.fill('input[data-qa="card-number"]', '5555555555554444');
  await page.fill('input[data-qa="cvc"]', '789');
  await page.fill('input[data-qa="expiry-month"]', '09');
  await page.fill('input[data-qa="expiry-year"]', '2027');

  await page.click('button[data-qa="pay-button"]');

  await expect(page.locator('text=Congratulations! Your order has been confirmed!')).toBeVisible();

  await page.click('a[href="/delete_account"]');

  await expect(page.locator('text=Account Deleted!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});
