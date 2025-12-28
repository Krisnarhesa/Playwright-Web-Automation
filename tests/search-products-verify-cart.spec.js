import { expect, test } from '@playwright/test';

test('Search Products and Verify Cart After Login', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Click on 'Products' button
  await page.click('a[href="/products"]');

  // 4. Verify user is navigated to ALL PRODUCTS page successfully
  await expect(page).toHaveURL(/.*products/);

  // 5. Enter product name in search input and click search button
  await page.fill('input#search_product', 'Jeans');
  await page.click('button#submit_search');

  // 6. Verify 'SEARCHED PRODUCTS' is visible
  await expect(page.locator('text=Searched Products')).toBeVisible();

  // 7. Verify all the products related to search are visible
  const searchResults = page.locator('.single-products');
  await expect(await searchResults.count()).toBeGreaterThan(0);

  // 8. Add those products to cart
  await searchResults.first().locator('a.add-to-cart').first().click();
  await page.click('button:has-text("Continue Shopping")');

  // 9. Click 'Cart' button and verify that products are visible in cart
  await page.click('a[href="/view_cart"]');
  await expect(page.locator('#cart_info tbody tr')).toHaveCount(1);

  // 10. Click 'Signup / Login' button and submit login details
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

  // 11. Again, go to Cart page
  await page.click('a[href="/view_cart"]');

  // 12. Verify that those products are visible in cart after login as well
  await expect(page.locator('#cart_info tbody tr')).toHaveCount(1);
  
  // Cleanup
  await page.click('a[href="/delete_account"]');
});
