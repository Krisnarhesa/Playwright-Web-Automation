import { expect, test } from '@playwright/test';

test('Verify address details in checkout page', async ({ page }) => {
  // 1-3. Navigate and verify home page
  await page.goto('http://automationexercise.com');
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click 'Signup / Login' button
  await page.click('a[href="/login"]');

  // 5. Fill all details in Signup and create account
  const timestamp = Date.now();
  const testEmail = `addresstest${timestamp}@example.com`;
  const firstName = 'Address';
  const lastName = 'Test';
  const company = 'Address Test Company';
  const address1 = '321 Address Street';
  const address2 = 'Suite 100';
  const state = 'Florida';
  const city = 'Miami';
  const zipcode = '33101';
  
  await page.fill('input[data-qa="signup-name"]', `${firstName} ${lastName}`);
  await page.fill('input[data-qa="signup-email"]', testEmail);
  await page.click('button[data-qa="signup-button"]');
  
  await page.check('#id_gender2'); // Mrs.
  await page.fill('input[data-qa="password"]', 'TestPass123');
  await page.selectOption('select[data-qa="days"]', '5');
  await page.selectOption('select[data-qa="months"]', '3');
  await page.selectOption('select[data-qa="years"]', '1995');
  await page.fill('input[data-qa="first_name"]', firstName);
  await page.fill('input[data-qa="last_name"]', lastName);
  await page.fill('input[data-qa="company"]', company);
  await page.fill('input[data-qa="address"]', address1);
  await page.fill('input[data-qa="address2"]', address2);
  await page.selectOption('select[data-qa="country"]', 'United States');
  await page.fill('input[data-qa="state"]', state);
  await page.fill('input[data-qa="city"]', city);
  await page.fill('input[data-qa="zipcode"]', zipcode);
  await page.fill('input[data-qa="mobile_number"]', '3051234567');
  await page.click('button[data-qa="create-account"]');

  // 6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
  await expect(page.locator('text=Account Created!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');

  // 7. Verify 'Logged in as username' at top
  await expect(page.locator('text=Logged in as')).toBeVisible();

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

  // 12. Verify that the delivery address is same address filled at the time registration of account
  const deliveryAddress = page.locator('#address_delivery');
  await expect(deliveryAddress).toContainText(firstName);
  await expect(deliveryAddress).toContainText(lastName);
  await expect(deliveryAddress).toContainText(company);
  await expect(deliveryAddress).toContainText(address1);
  await expect(deliveryAddress).toContainText(address2);
  await expect(deliveryAddress).toContainText(city);
  await expect(deliveryAddress).toContainText(state);
  await expect(deliveryAddress).toContainText(zipcode);

  // 13. Verify that the billing address is same address filled at the time registration of account
  const billingAddress = page.locator('#address_invoice');
  await expect(billingAddress).toContainText(firstName);
  await expect(billingAddress).toContainText(lastName);
  await expect(billingAddress).toContainText(company);
  await expect(billingAddress).toContainText(address1);
  await expect(billingAddress).toContainText(address2);
  await expect(billingAddress).toContainText(city);
  await expect(billingAddress).toContainText(state);
  await expect(billingAddress).toContainText(zipcode);

  // 14. Click 'Delete Account' button
  await page.click('a[href="/delete_account"]');

  // 15. Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await expect(page.locator('text=Account Deleted!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});
