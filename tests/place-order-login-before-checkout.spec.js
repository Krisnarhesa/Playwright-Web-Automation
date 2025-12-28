import { expect, test } from '@playwright/test';

test('Place Order: Login before Checkout', async ({ page }) => {
  // Setup: Create account first
  await page.goto('http://automationexercise.com');
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

  // Test starts here
  // 1-3. Navigate and verify home page
  await page.goto('http://automationexercise.com');
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 5. Fill email, password and click 'Login' button
  await page.fill('input[data-qa="login-email"]', testEmail);
  await page.fill('input[data-qa="login-password"]', testPassword);
  await page.click('button[data-qa="login-button"]');

  // 6. Verify 'Logged in as username' at top
  await expect(page.locator(`text=${testName}`)).toBeVisible();

  // 7. Add products to cart
  await page.click('a[href="/products"]');
  const product = page.locator('.single-products').first();
  await product.hover();
  await product.locator('a.add-to-cart').first().click();
  await page.click('button:has-text("Continue Shopping")');

  // 8. Click 'Cart' button
  await page.click('a[href="/view_cart"]');

  // 9. Verify that cart page is displayed
  await expect(page).toHaveURL(/.*view_cart/);

  // 10. Click Proceed To Checkout
  await page.click('text=Proceed To Checkout');

  // 11. Verify Address Details and Review Your Order
  await expect(page.locator('.checkout-information')).toBeVisible();

  // 12. Enter description in comment text area and click 'Place Order'
  await page.fill('textarea[name="message"]', 'Handle with care');
  await page.click('a[href="/payment"]');

  // 13. Enter payment details
  await page.fill('input[data-qa="name-on-card"]', 'Login Checkout Test');
  await page.fill('input[data-qa="card-number"]', '5555555555554444');
  await page.fill('input[data-qa="cvc"]', '789');
  await page.fill('input[data-qa="expiry-month"]', '09');
  await page.fill('input[data-qa="expiry-year"]', '2027');

  // 14. Click 'Pay and Confirm Order' button
  await page.click('button[data-qa="pay-button"]');

  // 15. Verify success message
  await expect(page.locator('text=Congratulations! Your order has been confirmed!')).toBeVisible();

  // 16. Click 'Delete Account' button
  await page.click('a[href="/delete_account"]');

  // 17. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await expect(page.locator('text=Account Deleted!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});
