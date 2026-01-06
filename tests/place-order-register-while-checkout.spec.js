import { test, expect } from '@playwright/test';

test('Place Order: Register while Checkout', async ({ page }) => {
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

  await expect(page.locator('input[data-qa="signup-name"]')).toBeVisible();

  const timestamp = Date.now();
  const testEmail = `checkout${timestamp}@example.com`;
  const testName = 'Checkout Test';

  await page.fill('input[data-qa="signup-name"]', testName);
  await page.fill('input[data-qa="signup-email"]', testEmail);
  await page.click('button[data-qa="signup-button"]');

  await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();

  await page.check('#id_gender1');
  await page.fill('#password', 'TestPass123');
  await page.selectOption('#days', '15');
  await page.selectOption('#months', '6');
  await page.selectOption('#years', '1990');

  await page.fill('#first_name', 'Checkout');
  await page.fill('#last_name', 'Test');
  await page.fill('#address1', '123 Test Street');
  await page.selectOption('#country', 'United States');
  await page.fill('#state', 'California');
  await page.fill('#city', 'Los Angeles');
  await page.fill('#zipcode', '90001');
  await page.fill('#mobile_number', '1234567890');

  await page.click('button[data-qa="create-account"]');

  await expect(page.getByText('ACCOUNT CREATED!')).toBeVisible();
  await page.click('a[data-qa="continue-button"]');

  await expect(page.getByText(testName)).toBeVisible();

  await page.click('a[href="/view_cart"]');
  await page.click('text=Proceed To Checkout');

  await expect(page.getByText('Address Details')).toBeVisible();
  await expect(page.getByText('Review Your Order')).toBeVisible();

  await page.fill('textarea[name="message"]', 'Please deliver between 9 AM and 5 PM');
  await page.click('text=Place Order');

  await page.fill('input[name="name_on_card"]', testName);
  await page.fill('input[name="card_number"]', '4242424242424242');
  await page.fill('input[name="cvc"]', '123');
  await page.fill('input[name="expiry_month"]', '12');
  await page.fill('input[name="expiry_year"]', '2028');

  await page.click('text=Pay and Confirm Order');

  await expect(
    page.getByText('Congratulations! Your order has been confirmed!')
  ).toBeVisible();

  await page.click('a[href="/delete_account"]');
  await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
});
