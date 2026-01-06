import { expect, test } from '@playwright/test';

test('Download Invoice after purchase order', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.click('a[href="/products"]');

  const product = page.locator('.single-products').first();
  await expect(product).toBeVisible();

  await product.hover();
  await product.locator('a.add-to-cart').first().click();
  await page.click('button:has-text("Continue Shopping")');

  await page.click('a[href="/view_cart"]');
  await expect(page).toHaveURL(/view_cart/);

  await page.click('text=Proceed To Checkout');
  await page.click('text=Register / Login');

  await page.goto('https://automationexercise.com/login');
  await expect(page).toHaveURL(/\/login/);

  const timestamp = Date.now();
  const testEmail = `invoice${timestamp}@example.com`;
  const testName = 'Invoice Test';

  await expect(page.locator('input[data-qa="signup-name"]')).toBeVisible();
  await page.fill('input[data-qa="signup-name"]', testName);
  await page.fill('input[data-qa="signup-email"]', testEmail);
  await page.click('button[data-qa="signup-button"]');

  await page.check('#id_gender1');
  await page.fill('#password', 'TestPass123');
  await page.selectOption('#days', '25');
  await page.selectOption('#months', '12');
  await page.selectOption('#years', '1985');

  await page.fill('#first_name', 'Invoice');
  await page.fill('#last_name', 'Test');
  await page.fill('#company', 'Invoice Co');
  await page.fill('#address1', '999 Invoice Blvd');
  await page.selectOption('#country', 'United States');
  await page.fill('#state', 'Arizona');
  await page.fill('#city', 'Phoenix');
  await page.fill('#zipcode', '85001');
  await page.fill('#mobile_number', '6021234567');

  await page.click('button[data-qa="create-account"]');

  await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');

  await expect(page.getByText('Logged in as')).toBeVisible();
  await expect(page.getByText(testName)).toBeVisible();

  await page.click('a[href="/view_cart"]');
  await page.click('text=Proceed To Checkout');

  await expect(page.getByText('Address Details')).toBeVisible();
  await expect(page.getByText('Review Your Order')).toBeVisible();

  await page.fill('textarea[name="message"]', 'Need invoice for this order');
  await page.click('text=Place Order');

  await page.fill('input[name="name_on_card"]', testName);
  await page.fill('input[name="card_number"]', '4111111111111111');
  await page.fill('input[name="cvc"]', '321');
  await page.fill('input[name="expiry_month"]', '06');
  await page.fill('input[name="expiry_year"]', '2030');

  await page.click('text=Pay and Confirm Order');

  await expect(
    page.getByText('Congratulations! Your order has been confirmed!')
  ).toBeVisible();

  const downloadPromise = page.waitForEvent('download');
  await page.click('a.btn.btn-default.check_out');
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toContain('invoice');

  await page.click('a[data-qa="continue-button"]');

  await page.click('a[href="/delete_account"]');
  await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');
});
