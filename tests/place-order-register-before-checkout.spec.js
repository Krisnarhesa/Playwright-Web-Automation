import { expect, test } from '@playwright/test';

test('Place Order: Register before Checkout', async ({ page }) => {
  // 1-3. Navigate and verify home page
  await page.goto('http://automationexercise.com');
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 5. Fill all details in Signup and create account
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

  // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
  await expect(page.locator('text=Account Created!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');

  // 7. Verify 'Logged in as username' at top
  await expect(page.locator(`text=${testName}`)).toBeVisible();

  // 8. Add products to cart
  await page.click('a[href="/products"]');
  const product = page.locator('.single-products').first();
  await product.hover();
  await product.locator('a.add-to-cart').first().click();
  await page.click('button:has-text("Continue Shopping")');

  // 9. Click 'Cart' button
  await page.click('a[href="/view_cart"]');

  // 10. Verify that cart page is displayed
  await expect(page).toHaveURL(/.*view_cart/);

  // 11. Click Proceed To Checkout
  await page.click('text=Proceed To Checkout');

  // 12. Verify Address Details and Review Your Order
  await expect(page.locator('.checkout-information')).toBeVisible();

  // 13. Enter description in comment text area and click 'Place Order'
  await page.fill('textarea[name="message"]', 'Fast delivery please');
  await page.click('a[href="/payment"]');

  // 14. Enter payment details
  await page.fill('input[data-qa="name-on-card"]', 'Before Checkout Test');
  await page.fill('input[data-qa="card-number"]', '4242424242424242');
  await page.fill('input[data-qa="cvc"]', '456');
  await page.fill('input[data-qa="expiry-month"]', '11');
  await page.fill('input[data-qa="expiry-year"]', '2029');

  // 15. Click 'Pay and Confirm Order' button
  await page.click('button[data-qa="pay-button"]');

  // 16. Verify success message
  await expect(page.locator('text=Congratulations! Your order has been confirmed!')).toBeVisible();

  // 17. Click 'Delete Account' button
  await page.click('a[href="/delete_account"]');

  // 18. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await expect(page.locator('text=Account Deleted!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});
