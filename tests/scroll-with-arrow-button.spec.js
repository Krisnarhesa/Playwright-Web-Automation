import { expect, test } from '@playwright/test';

test('Verify Scroll Up using Arrow button and Scroll Down functionality', async ({ page }) => {
  await page.goto('https://automationexercise.com', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  await expect(page.locator('text=Subscription')).toBeVisible();

  await page.click('#scrollUp');

  await expect(
    page.getByRole('heading', {
      name: /Full-Fledged practice website/i
    })
  ).toBeVisible();
});
