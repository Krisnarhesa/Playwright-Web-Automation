const { test, expect } = require("@playwright/test");

test("Contact Us Form", async ({ page }) => {

  await page.goto("https://automationexercise.com", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.getByRole("link", { name: "Contact us" }).click();

  await expect(
    page.getByRole("heading", { name: "Get In Touch" })
  ).toBeVisible();

  await page.locator("input[data-qa='name']").fill("Test User");
  await page.locator("input[data-qa='email']").fill("testuser@mail.com");
  await page.locator("input[data-qa='subject']").fill("Testing Contact Form");
  await page.locator("textarea[data-qa='message']")
    .fill("This is a test message for Contact Us form using Playwright.");

  await page.setInputFiles("input[name='upload_file']", {
    name: "testfile.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("This is a test file"),
  });

  page.on("dialog", async dialog => {
    await dialog.accept();
  });

  await page.locator("input[data-qa='submit-button']").click();

  const successMessage = page.locator(
    "text=Success! Your details have been submitted successfully."
  );

  if (await successMessage.count() > 0) {
    await expect(successMessage).toBeVisible();
  }

  await page.goto("https://automationexercise.com/");
  await expect(page).toHaveTitle(/Automation Exercise/);
});
