[![Run Tests](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml/badge.svg)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/tests.yml)

[![Allure Report](https://img.shields.io/badge/Allure-Report-blue)](https://olexandr29.github.io/eCommerce_JS/)

# JavaScript UI Automation Framework (Mocha + Selenium WebDriver)

## 📌 Project Purpose

This project aims to build a scalable and maintainable **UI automation framework** for testing eShop (the web application **saucedemo.com**) using:
- JavaScript (Node.js)
- Mocha test framework
- Selenium WebDriver
- [Page Object Model (POM)](#page-object-model-pom-conventions)
- [GitHub Actions for CI/CD](#2-remote-cicd)
- [Reporting tools(Allure/Mochawesome)](#reporting-tools-allure--mochawesome)

The goal is to create a professional-grade automation environment that demonstrates real industry practices and allows running automated tests locally and remotely.

## Page Object Model (POM) Conventions 

<details><summary> 1. Project Structure</summary>

```
project-root/
│
├── pages/                      # Page Object files
│   ├── BasePage.js             # Parent class with UI helper methods, explicit waits, safe actions, scrolling, logging and Allure step wrapper
│   ├── LoginPage.js            # POM: Login page
│   └── InventoryPage.js        # POM: Inventory/products page (PLP)
│   └── ProductDetailsPage.js   # POM: Inventory item id page (PDP)
│   └── CartPage.js             # POM: Cart page
│   └── CheckoutPage1.js        # POM: Checkout step one page
│   └── CheckoutPage2.js        # POM: Checkout step two page
│   └── ConfirmationPage.js     # POM: Checkout complete page
│
├── test/                       # Automated test suite (Mocha)
│   └── baseTest.js             # Test lifecycle management (WebDriver setup/teardown, screenshots on failure, Allure integration)
│   └── smokeTests.js           # Smoke tests - verify app availability and critical user flow
│   └── sanityTests.js          # Sanity tests - verify core features after changes or deployments
│   └── functionalTests.js      # Functional tests - verify end-to-end business scenarios and user workflows
│   └── uiUXtests.js            # UI/UX tests - verify UI behavior, state changes, navigation and visual interactions
│   └── negativeTests.js        # Negative tests - verify system behavior for invalid inputs and edge cases
│
├── config/                     # Configuration settings (baseUrl), credentials, test data, environment settings
│   └── users.json              # Test users credentials
│   └── testData.js             # Shared test data and helpers
│
├── fixtures/                   # Static test fixtures and predefined datasets
│   └── product.json            # Product-related test data used in cart and checkout tests
│
├── utils/                      # Cross-cutting utilities (logging, data generation, test helpers, Allure metadata)
│   └── logger.js               # Centralized logging abstraction
│   └── dataHelper.js           # Test data helpers (random product selection, etc.)
│   └── randomData.js           # Randomized user/test data generation
│   └── allureSeverity.js       # Allure severity enum mapping
│   └── allureEnvironment.js    # Allure environment metadata such as execution (on local machine or CI pipeline), browser and base URL
│   └── viewportHelper.js       # Centralized viewport definitions and browser resizing helper for UI/UX tests
│
├── docs/                       # Project documentation and QA artifacts
│   └── Task_TestCases.md       # List of implemented test cases grouped by test type and other tasks with status 
│   └── manual-to-automation-traceability.md      # Manual → Automated test coverage mapping (traceability matrix)
│
├── .gitignore                  # List of folders and files that will not be commited on GitHub
├── package.json                # json file with scripts and dependencies
├── README.md                   # Description of the project
└── run-allure-tests.bat        # Helper script to run tests with Allure enabled and generate/open Allure report
```
The project follows a modular POM structure, where each UI page has its own class containing:
- locators
- helper methods
- reusable page-specific actions

Common UI logic, explicit waits, safe actions and Allure step handling are centralized in BasePage.
Test lifecycle management (driver setup/teardown, screenshots on failure) is handled by BaseTest.

</details>


<details><summary>2. Naming Rules</summary>

**Files**
- Page Objects and Base class - use PascalCase because each file contains a class → LoginPage.js, InventoryPage.js, BasePage.js
- Tests, Utils and other files - use camelCase because each file does not contain a class → smokeTests.js, waitUtils.js

**Classes**
- Each page class use PascalCase → class LoginPage extends BasePage {}

**Locators**
- Stored inside a single object →
```
this.locators = { 
    username: By.id("user-name"), 
    loginBtn: By.id("login-button") 
    };
```
- Named in camelCase → loginBtn, errorMessage

**Methods**

Named in verb-based camelCase:
- Page actions → verbs:
login(), logOut(), addProductToCartById()
- Helpers → descriptive names:
waitForVisible(), waitAndGetText(), safeClick()

</details>


<details><summary>3. Locator Strategy</summary>

Follow a stability-first approach:

1. **ID** – primary locator (most stable)
2. **CSS selector** – clean, flexible, recommended for most cases
3. **ClassName** – acceptable when the class is simple and unique
4. **XPath** – use when other locators are not unique or available

Examples:

```js
By.id("user-name")
By.css(".shopping_cart_badge")
By.className("inventory_item")
By.xpath("//h3[@data-test='error']")
```

Best practices used:

- Prefer short, stable locators

- Avoid long XPath expressions

- Avoid indexes in XPath ((//div)[3])

- Locators grouped inside this.locators object for clarity and reusability

</details>


<details><summary>4. Example Usage (Test + POM)</summary>

```js
const { Builder } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");

describe("Smoke Tests", function () {
    this.timeout(15000);

    let driver;
    let loginPage;
    let inventoryPage;

    before(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);
    });

    after(async () => {
        await driver.quit();
    });

    it("should login successfully", async () => {
        await loginPage.login("standard_user", "secret_sauce");
        const header = await inventoryPage.getInventoryHeader();

        expect(header).to.equal("Products");
    });
});
```
This example demonstrates:
- POM initialization
- Using page-level methods instead of inline selectors
- Clean, maintainable test structure

</details>


## Test Execution:
### 1 Local

<details><summary>Run all tests:
</summary>

```

npm test

```

By default, Mocha will run all test files inside `/test` directory (based on the configured test command).

</details>

<details><summary>Run a specific test suite or test case</summary>

- **Run a single test suite (file)**

Temprorary modify the `describe` block in your test file

from:
```js
describe("@Negative tests", function () {

```
to:
```js
describe.only("@Negative tests", function () {

```

- **Run a single test case**

Temprorary modify `it` block in your test file

from:
```js
it("TC-029: Long Value in Username Field", async function testLongUsername() {
```
to:
```js
it.only("TC-029: Long Value in Username Field", async function testLongUsername() {
```

Then run:
```
npm test
```

*Important*

Always remove `.only` before commit changes to the repository.
</details>


### 2 Remote (CI/CD)

<details><summary>Run all tests:
</summary>
This project is fully integrated with a CI pipeline and automated reporting to ensure transparent and repeatable test execution.

#### CI Pipeline Flow

The CI pipeline is implemented using `GitHub Actions` and is automatically triggered on each push or pull request to the main branch and the flow consists of:
- Checkout repository
- Install Node.js dependencies
- Execute UI automation tests (Mocha + WebDriver)
- Generate execution-level reports
- Generate Allure results
- Publish Allure report to GitHub Pages

The current pipeline status is always visible via the CI badge at the top of this README.

</details>
 

## Reporting tools (Allure / Mochawesome) 

<details><summary>1 Mochawesome Reporting (Execution-Level)  </summary>

Mochawesome is used as a Mocha reporter to provide structured execution reports in addition to console output.

#### Purpose

- Visualize test execution results
- Analyze passed/failed tests
- Review execution duration
- Useful for engineering debugging and CI artifacts

#### Characteristics

- Based on Mocha test structure
- Does not understand Page Objects or business steps
- Focused on test execution, not documentation

#### Typical Output

- Test name
- Status (passed / failed)
- Execution time
- Stack traces on failure

#### Example (console output):
```test
✔ TC-020: Full purchase flow (4200ms)
20 passing (1m)
```

Mochawesome can generate HTML/JSON reports that are suitable for:

- CI pipelines
- Test history analysis
- Engineering-level reporting

For enhanced console output visibility, page objects were extended with a custom Logger at an early stage of the project.

At a later stage, Logger was united with Allure steps and refactored into a reusable `logStep` abstraction.

This approach allows a single action to be logged simultaneously:
- in the console (execution-level)
- in the Allure report (documentation-level)

An example of this implementation is provided in the **Allure Reporting** section under
[Example (Page-Level Step)](#example-page-level-step).
</details>


<details><summary>2 Allure Reporting (Documentation-Level)</summary>

#### Allure Reporting Overview

Allure is used as a high-level reporting and documentation tool, built on top of Mocha execution and provide a business-readable view of automated test results.

#### The Allure report includes:

- Test suites grouped by test type (Smoke, Sanity, Functional, UI/UX, Negative)
- Step-by-step execution flow for each test
- Severity levels and metadata
- Screenshots and attachments on failures
- [Retry](#retry-strategy) information for flaky or unstable tests

#### Design Principles

- One logical user action = one Allure step
- Reusable actions (e.g. login) are documented once
- Avoid step noise and duplication

#### Example (Test Metadata)
```js
description(this.test.title);
severity(AllureSeverity.CRITICAL);
```

#### Example (Page-Level Step)
```js
return this.logStep("Perform Login", async () => {
    await this.open(baseUrl);
    await this.type(this.locators.username, username);
    await this.type(this.locators.password, password);
    await this.click(this.locators.loginBtn);
});
```

Allure reports are generated and viewed as an HTML dashboard.


#### Running Tests with Allure:
<details><summary> 1.1 Locally via commands</summary>

Run tests with Allure reporting enabled:
```bash
npm run test:allure
```

Generate report:
```bash
npm run allure:generate
```

Open report:
```bash
npm run allure:open
```
</details>

<details><summary> 1.2 Locally via Batch Script</summary>

For convenience during local development, the three Allure-related commands were grouped into a single Windows batch script.

#### Script name:  [run-allure-tests.bat](https://github.com/Olexandr29/eCommerce_JS/blob/main/run-allure-tests.bat) 

#### Purpose: 
Run tests, generate the Allure report, and open it in a browser with a single command.

To execute the script manually, simply run:
```bash
./run-allure-tests.bat
```
</details>

<details><summary>2 Remotely</summary>
Remote (CI\CD) tests running with Allure implemented using GitHub Actions and is automatically triggered on each push or pull request to the main branch. The details is described in [previous section](#2-remote-cicd)

#### Live Allure Report

The latest Allure report is published automatically after each CI run and is available via GitHub Pages:

👉 https://olexandr29.github.io/eCommerce_JS/

This allows reviewers to inspect test results without running the project locally.

</details>

#### History & Trends

Allure reporting preserves execution history across CI runs, enabling:
- Analysis of test stability over time
- Detection of flaky tests
- Visibility of [retries](#retry-strategy) and repeated failures
- Trend-based quality assessment instead of single-run results
- This transforms automated tests into living quality documentation, rather than static execution output.

#### Retry Strategy

- Retry logic is enabled only for Functional test suites
- Max retries: 2
- Smoke, Negative and UI/UX tests are excluded
- Retries are visible in Allure and Mochawesome reports
- Deterministic failures are not masked (Deterministic failure was intentionally introduced in TC-014 to validate retry behavior.
Test failed consistently across all retry attempts, confirming that retries do not mask real defects.
Allure report shows multiple failed retries with final FAILED status)

</details>


## Test Documentation & Traceability

This project maintains a clear mapping between manual test cases and automated tests to ensure transparent test coverage for the -

 `Smoke`, `Sanity`, `Functional`, `UI/UX` and `Negative` test types.

Each automated test references its corresponding Manual TC ID, allowing easy validation of coverage and test intent.
Where applicable, automation uses data-driven approaches and randomized product selection via `DataHelper` to reduce hardcoded dependencies and increase coverage.

Related documentations - [Manual test cases](https://github.com/Olexandr29/eCommerce_JS/blob/main/docs/Task_TestCases.md), 
[Automated tests](https://github.com/Olexandr29/eCommerce_JS/tree/main/test) and
[Traceability matrix](https://github.com/Olexandr29/eCommerce_JS/blob/main/docs/manual-to-automation-traceability.md).


## Process & Methodology

- Project organized using SCRUM methodology (2-week sprints)

- Tasks tracked via Kanban board
- Starting from Sprint 4, task management is migrated to GitHub Projects → https://github.com/users/Olexandr29/projects/1
- Incremental implementation:
  - feature → test → reporting → refactoring


## Summary

This framework demonstrates:

- Clean Page Object architecture
- Separation of execution logs and reporting
- Dual reporting strategy:
  -  Mochawesome for execution diagnostics
  - Allure for documentation and stakeholder visibility
- CI-ready structure aligned with real-world automation practices
