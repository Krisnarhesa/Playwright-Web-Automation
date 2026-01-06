import { expect, test } from '@playwright/test';

test('Place Order: Register before Checkout', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.click('a[href="/login"]');

  const timestamp = Date.now();
  const testEmail = `beforecheckout${timestamp}@example.com`;
  const testName = 'Before Checkout Test';
  
  await page.fill('input[data-qa="signup-name"]', testName);
  await page.fill('input[data-qa="signup-email"]', testEmail);
  await page.click('button[data-qa="signup-button"]');
  
  await page.check('#id_gender1');
  await page.fill('input[data-qa="password"]', 'TestPass123');
  await page.selectOption('select[data-qa="days"]', '10');
  await page.selectOption('select[data-qa="months"]', '5');
  await page.selectOption('select[data-qa="years"]', '1992');
  await page.fill('input[data-qa="first_name"]', 'Before');
  await page.fill('input[data-qa="last_name"]', 'Checkout');
  await page.fill('input[data-qa="company"]', 'Test Company');
  await page.fill('input[data-qa="address"]', '456 Test Ave');
  await page.selectOption('select[data-qa="country"]', 'United States');
  await page.fill('input[data-qa="state"]', 'New York');
  await page.fill('input[data-qa="city"]', 'New York');
  await page.fill('input[data-qa="zipcode"]', '10001');
  await page.fill('input[data-qa="mobile_number"]', '9876543210');
  await page.click('button[data-qa="create-account"]');

  await expect(page.locator('text=Account Created!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');

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

  await page.fill('textarea[name="message"]', 'Fast delivery please');
  await page.click('a[href="/payment"]');

  await page.fill('input[data-qa="name-on-card"]', 'Before Checkout Test');
  await page.fill('input[data-qa="card-number"]', '4242424242424242');
  await page.fill('input[data-qa="cvc"]', '456');
  await page.fill('input[data-qa="expiry-month"]', '11');
  await page.fill('input[data-qa="expiry-year"]', '2029');

  await page.click('button[data-qa="pay-button"]');

  await expect(page.locator('text=Congratulations! Your order has been confirmed!')).toBeVisible();

  await page.click('a[href="/delete_account"]');

  await expect(page.locator('text=Account Deleted!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});
