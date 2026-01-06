import { expect, test } from '@playwright/test';

test('Search Products and Verify Cart After Login', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await page.click('a[href="/products"]');

  await expect(page).toHaveURL(/.*products/);

  await page.fill('input#search_product', 'Jeans');
  await page.click('button#submit_search');

  await expect(page.locator('text=Searched Products')).toBeVisible();

  const searchResults = page.locator('.single-products');
  await expect(await searchResults.count()).toBeGreaterThan(0);

  await searchResults.first().locator('a.add-to-cart').first().click();
  await page.click('button:has-text("Continue Shopping")');

  await page.click('a[href="/view_cart"]');
  await expect(page.locator('#cart_info tbody tr')).toHaveCount(1);

  const timestamp = Date.now();
  const testEmail = `searchtest${timestamp}@example.com`;
  const testPassword = 'TestPass123';
  
  await page.click('a[href="/login"]');
  await page.fill('input[data-qa="signup-name"]', 'Search Test');
  await page.fill('input[data-qa="signup-email"]', testEmail);
  await page.click('button[data-qa="signup-button"]');
  
  await page.check('#id_gender1');
  await page.fill('input[data-qa="password"]', testPassword);
  await page.selectOption('select[data-qa="days"]', '1');
  await page.selectOption('select[data-qa="months"]', '1');
  await page.selectOption('select[data-qa="years"]', '1990');
  await page.fill('input[data-qa="first_name"]', 'Search');
  await page.fill('input[data-qa="last_name"]', 'Test');
  await page.fill('input[data-qa="company"]', 'Test Co');
  await page.fill('input[data-qa="address"]', '123 St');
  await page.selectOption('select[data-qa="country"]', 'United States');
  await page.fill('input[data-qa="state"]', 'CA');
  await page.fill('input[data-qa="city"]', 'LA');
  await page.fill('input[data-qa="zipcode"]', '90001');
  await page.fill('input[data-qa="mobile_number"]', '1234567890');
  await page.click('button[data-qa="create-account"]');
  await page.click('a[data-qa="continue-button"]');

  await page.click('a[href="/view_cart"]');

  await expect(page.locator('#cart_info tbody tr')).toHaveCount(1);
  
  await page.click('a[href="/delete_account"]');
});
