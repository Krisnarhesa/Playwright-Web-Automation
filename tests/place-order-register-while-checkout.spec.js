import { expect, test } from '@playwright/test';

test('Place Order: Register while Checkout', async ({ page }) => {
  // 1-3. Navigate and verify home page
  await page.goto('http://automationexercise.com');
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Add products to cart
  await page.click('a[href="/products"]');
  const product = page.locator('.single-products').first();
  await product.hover();
  await product.locator('a.add-to-cart').first().click();
  await page.click('button:has-text("Continue Shopping")');

  // 5. Click 'Cart' button
  await page.click('a[href="/view_cart"]');

  // 6. Verify that cart page is displayed
  await expect(page).toHaveURL(/.*view_cart/);

  // 7. Click Proceed To Checkout
  await page.click('text=Proceed To Checkout');

  // 8. Click 'Register / Login' button
  await page.click('text=Register / Login');

  // 9. Fill all details in Signup and create account
  const timestamp = Date.now();
  const testEmail = `checkout${timestamp}@example.com`;
  const testName = 'Checkout Test';
  
  await page.fill('input[data-qa="signup-name"]', testName);
  await page.fill('input[data-qa="signup-email"]', testEmail);
  await page.click('button[data-qa="signup-button"]');
  
  await page.check('#id_gender1');
  await page.fill('input[data-qa="password"]', 'TestPass123');
  await page.selectOption('select[data-qa="days"]', '15');
  await page.selectOption('select[data-qa="months"]', '6');
  await page.selectOption('select[data-qa="years"]', '1990');
  await page.fill('input[data-qa="first_name"]', 'Checkout');
  await page.fill('input[data-qa="last_name"]', 'Test');
  await page.fill('input[data-qa="company"]', 'Test Co');
  await page.fill('input[data-qa="address"]', '123 Test Street');
  await page.fill('input[data-qa="address2"]', 'Apt 4B');
  await page.selectOption('select[data-qa="country"]', 'United States');
  await page.fill('input[data-qa="state"]', 'California');
  await page.fill('input[data-qa="city"]', 'Los Angeles');
  await page.fill('input[data-qa="zipcode"]', '90001');
  await page.fill('input[data-qa="mobile_number"]', '1234567890');
  await page.click('button[data-qa="create-account"]');

  // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
  await expect(page.locator('text=Account Created!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');

  // 11. Verify 'Logged in as username' at top
  await expect(page.locator(`text=${testName}`)).toBeVisible();

  // 12. Click 'Cart' button
  await page.click('a[href="/view_cart"]');

  // 13. Click 'Proceed To Checkout' button
  await page.click('text=Proceed To Checkout');

  // 14. Verify Address Details and Review Your Order
  await expect(page.locator('.checkout-information')).toBeVisible();

  // 15. Enter description in comment text area and click 'Place Order'
  await page.fill('textarea[name="message"]', 'Please deliver between 9 AM and 5 PM');
  await page.click('a[href="/payment"]');

  // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
  await page.fill('input[data-qa="name-on-card"]', 'Checkout Test');
  await page.fill('input[data-qa="card-number"]', '4242424242424242');
  await page.fill('input[data-qa="cvc"]', '123');
  await page.fill('input[data-qa="expiry-month"]', '12');
  await page.fill('input[data-qa="expiry-year"]', '2028');

  // 17. Click 'Pay and Confirm Order' button
  await page.click('button[data-qa="pay-button"]');

  // 18. Verify success message 'Your order has been placed successfully!'
  await expect(page.locator('text=Congratulations! Your order has been confirmed!')).toBeVisible();

  // 19. Click 'Delete Account' button
  await page.click('a[href="/delete_account"]');

  // 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await expect(page.locator('text=Account Deleted!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});
