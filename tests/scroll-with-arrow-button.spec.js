import { expect, test } from '@playwright/test';

test('Verify Scroll Up using Arrow button and Scroll Down functionality', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Scroll down page to bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // 5. Verify 'SUBSCRIPTION' is visible
  await expect(page.locator('text=Subscription')).toBeVisible();

  // 6. Click on arrow at bottom right side to move upward
  await page.click('#scrollUp');

  // 7. Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen
  await page.waitForTimeout(1000); // Wait for scroll animation
  await expect(page.locator('text=Full-Fledged practice website for Automation Engineers')).toBeVisible();
});
