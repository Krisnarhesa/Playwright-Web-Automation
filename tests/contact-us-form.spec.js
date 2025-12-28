import { expect, test } from '@playwright/test';

test('Contact Us Form', async ({ page }) => {
  // 1. Launch browser & 2. Navigate to url
  await page.goto('http://automationexercise.com');

  // 3. Verify that home page is visible successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  // 4. Click on 'Contact Us' button
  await page.click('a[href="/contact_us"]');

  // 5. Verify 'GET IN TOUCH' is visible
  await expect(page.locator('text=Get In Touch')).toBeVisible();

  // 6. Enter name, email, subject and message
  await page.fill('input[data-qa="name"]', 'Test User');
  await page.fill('input[data-qa="email"]', 'testuser@example.com');
  await page.fill('input[data-qa="subject"]', 'Test Subject');
  await page.fill('textarea[data-qa="message"]', 'This is a test message for the contact form.');

  // 7. Upload file
  await page.setInputFiles('input[name="upload_file"]', {
    name: 'test.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('This is a test file')
  });

  // 8. Click 'Submit' button
  await page.click('input[data-qa="submit-button"]');

  // 9. Click OK button (handling alert dialog)
  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  // 10. Verify success message 'Success! Your details have been submitted successfully.' is visible
  await expect(page.locator('text=Success! Your details have been submitted successfully.')).toBeVisible();

  // 11. Click 'Home' button and verify that landed to home page successfully
  await page.click('a.btn.btn-success');
  await expect(page).toHaveURL('http://automationexercise.com');
});
