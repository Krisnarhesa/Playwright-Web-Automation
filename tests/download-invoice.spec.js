import { expect, test } from '@playwright/test';

test('Download Invoice after purchase order', async ({ page }) => {
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
  const testEmail = `invoice${timestamp}@example.com`;
  const testName = 'Invoice Test';
  
  await page.fill('input[data-qa="signup-name"]', testName);
  await page.fill('input[data-qa="signup-email"]', testEmail);
  await page.click('button[data-qa="signup-button"]');
  
  await page.check('#id_gender1');
  await page.fill('input[data-qa="password"]', 'TestPass123');
  await page.selectOption('select[data-qa="days"]', '25');
  await page.selectOption('select[data-qa="months"]', '12');
  await page.selectOption('select[data-qa="years"]', '1985');
  await page.fill('input[data-qa="first_name"]', 'Invoice');
  await page.fill('input[data-qa="last_name"]', 'Test');
  await page.fill('input[data-qa="company"]', 'Invoice Co');
  await page.fill('input[data-qa="address"]', '999 Invoice Blvd');
  await page.selectOption('select[data-qa="country"]', 'United States');
  await page.fill('input[data-qa="state"]', 'Arizona');
  await page.fill('input[data-qa="city"]', 'Phoenix');
  await page.fill('input[data-qa="zipcode"]', '85001');
  await page.fill('input[data-qa="mobile_number"]', '6021234567');
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
  await page.fill('textarea[name="message"]', 'Need invoice for this order');
  await page.click('a[href="/payment"]');

  // 16. Enter payment details
  await page.fill('input[data-qa="name-on-card"]', 'Invoice Test');
  await page.fill('input[data-qa="card-number"]', '4111111111111111');
  await page.fill('input[data-qa="cvc"]', '321');
  await page.fill('input[data-qa="expiry-month"]', '06');
  await page.fill('input[data-qa="expiry-year"]', '2030');

  // 17. Click 'Pay and Confirm Order' button
  await page.click('button[data-qa="pay-button"]');

  // 18. Verify success message
  await expect(page.locator('text=Congratulations! Your order has been confirmed!')).toBeVisible();

  // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully
  const downloadPromise = page.waitForEvent('download');
  await page.click('a.btn.btn-default.check_out');
  const download = await downloadPromise;
  
  // Verify download exists
  expect(download.suggestedFilename()).toContain('invoice');

  // 20. Click 'Continue' button
  await page.click('a[data-qa="continue-button"]');

  // 21. Click 'Delete Account' button
  await page.click('a[href="/delete_account"]');

  // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await expect(page.locator('text=Account Deleted!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});
