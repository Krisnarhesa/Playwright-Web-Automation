import { expect, test } from '@playwright/test';

test('Verify address details in checkout page', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.click('a[href="/login"]');

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
  
  await page.check('#id_gender2');
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

  await expect(page.locator('text=Account Created!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');

  await expect(page.locator('text=Logged in as')).toBeVisible();

  await page.click('a[href="/products"]');
  const product = page.locator('.single-products').first();
  await product.hover();
  await product.locator('a.add-to-cart').first().click();
  await page.click('button:has-text("Continue Shopping")');

  await page.click('a[href="/view_cart"]');

  await expect(page).toHaveURL(/.*view_cart/);

  await page.click('text=Proceed To Checkout');

  const deliveryAddress = page.locator('#address_delivery');
  await expect(deliveryAddress).toContainText(firstName);
  await expect(deliveryAddress).toContainText(lastName);
  await expect(deliveryAddress).toContainText(company);
  await expect(deliveryAddress).toContainText(address1);
  await expect(deliveryAddress).toContainText(address2);
  await expect(deliveryAddress).toContainText(city);
  await expect(deliveryAddress).toContainText(state);
  await expect(deliveryAddress).toContainText(zipcode);

  const billingAddress = page.locator('#address_invoice');
  await expect(billingAddress).toContainText(firstName);
  await expect(billingAddress).toContainText(lastName);
  await expect(billingAddress).toContainText(company);
  await expect(billingAddress).toContainText(address1);
  await expect(billingAddress).toContainText(address2);
  await expect(billingAddress).toContainText(city);
  await expect(billingAddress).toContainText(state);
  await expect(billingAddress).toContainText(zipcode);

  await page.click('a[href="/delete_account"]');

  await expect(page.locator('text=Account Deleted!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});
