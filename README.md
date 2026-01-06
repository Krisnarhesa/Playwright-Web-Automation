# Automation Exercise - Playwright Test Suite

This project contains automated end-to-end tests using Playwright for [automationexercise.com](https://automationexercise.com). The test suite covers 26 test cases that validate various functionalities of the e-commerce website.

## Overview

This test automation suite provides comprehensive test coverage for the Automation Exercise website, including:
- User registration and authentication
- Product management and shopping cart operations
- Checkout and order placement workflows
- Product reviews
- Navigation and search functionality
- Subscription features

## Technology Stack

- **[Playwright](https://playwright.dev/)** v1.57.0 - Modern end-to-end testing framework
- **Node.js** - JavaScript runtime environment
- **JavaScript** - Programming language

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Krisnarhesa/Playwright-Web-Automation.git
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run a specific test file
```bash
npx playwright test tests/<test-file-name>.spec.js
```

Example:
```bash
npx playwright test tests/login-correct.spec.js
```

### Run tests in UI mode
```bash
npx playwright test --ui
```

### Run tests on specific browsers
```bash
# Chromium
npx playwright test --project=chromium

# Firefox
npx playwright test --project=firefox

# WebKit (Safari)
npx playwright test --project=webkit
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

## Viewing Test Reports

After running tests, view the HTML report with:
```bash
npx playwright show-report
```

## Test Cases

| No | Test Case | File |
|----|-----------|------|
| 1 | Register User | `register.spec.js` |
| 2 | Login User with Correct Credentials | `login-correct.spec.js` |
| 3 | Login User with Incorrect Credentials | `login-incorrect.spec.js` |
| 4 | Logout User | `logout-user.spec.js` |
| 5 | Register User with Existing Email | `register-existing-email.spec.js` |
| 6 | Contact Us Form | `contact-us-form.spec.js` |
| 7 | Verify Test Cases Page | `verify-test-cases-page.spec.js` |
| 8 | Verify All Products | `verify-all-products.spec.js` |
| 9 | Search Product | `search-product.spec.js` |
| 10 | Verify Subscription on Home Page | `subscription-home-page.spec.js` |
| 11 | Verify Subscription on Cart Page | `subscription-cart-page.spec.js` |
| 12 | Add Products to Cart | `add-products-to-cart.spec.js` |
| 13 | Verify Product Quantity in Cart | `verify-product-quantity.spec.js` |
| 14 | Place Order: Register while Checkout | `place-order-register-while-checkout.spec.js` |
| 15 | Place Order: Register before Checkout | `place-order-register-before-checkout.spec.js` |
| 16 | Place Order: Login before Checkout | `place-order-login-before-checkout.spec.js` |
| 17 | Remove Products from Cart | `remove-products-from-cart.spec.js` |
| 18 | View Category Products | `view-category-products.spec.js` |
| 19 | View & Cart Brand Products | `view-cart-brand-products.spec.js` |
| 20 | Search Products and Verify Cart | `search-products-verify-cart.spec.js` |
| 21 | Add Product Review | `add-product-review.spec.js` |
| 22 | Add Recommended Items | `add-from-recommended-items.spec.js` |
| 23 | Verify Address Details in Checkout | `verify-address-checkout.spec.js` |
| 24 | Download Invoice | `download-invoice.spec.js` |
| 25 | Scroll Up with Arrow Button | `scroll-with-arrow-button.spec.js` |
| 26 | Scroll Up without Arrow Button | `scroll-without-arrow-button.spec.js` |

## Project Structure

```
UAS QA testing/
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI/CD workflow configuration
├── tests/                       # Test specification files
│   ├── register.spec.js
│   ├── login-correct.spec.js
│   ├── login-incorrect.spec.js
│   └── ...
├── playwright.config.js         # Playwright configuration
├── package.json                 # Project dependencies
├── .gitignore                   # Git ignore rules
└── README.md                    # Project documentation
```

## Configuration

The `playwright.config.js` file contains test configuration settings:
- **Test Directory**: `./tests`
- **Parallel Execution**: Enabled
- **Retries**: 2 retries on CI environments
- **Reporter**: HTML report
- **Browsers**: Chromium, Firefox, and WebKit

## Continuous Integration

This project uses GitHub Actions for automated testing. Tests are automatically executed on every push or pull request to the `main` or `master` branch.

Workflow configuration can be found at: `.github/workflows/playwright.yml`

## Debugging

### Trace Viewer
View trace files for failed tests:
```bash
npx playwright show-trace trace.zip
```

### Screenshots and Videos
Playwright automatically captures screenshots and videos for failed tests. These artifacts are stored in the `test-results/` directory.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Project Purpose

Created for UAS (Final Exam) - Software Quality Assurance, Semester 7

## References

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Automation Exercise](https://automationexercise.com)
- [Test Cases Reference](https://automationexercise.com/test_cases)

## Additional Notes

- Use the `--headed` flag to visually observe browser execution during test runs
- Use the `--ui` flag for an interactive debugging experience
- Test reports are generated in the `playwright-report/` directory
- Use `test.only()` to run specific tests during development
- All tests are automatically executed via GitHub Actions on push/pull request events
