[![Linux only](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/ci-linux-allure-report.yml/badge.svg)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/ci-linux-allure-report.yml)

[![Matrix OS](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/ci-node-os-matrix.yml/badge.svg)](https://github.com/Olexandr29/eCommerce_JS/actions/workflows/ci-node-os-matrix.yml)

[![Allure Report](https://img.shields.io/badge/Allure-Report-blue)](https://olexandr29.github.io/eCommerce_JS/)

# JavaScript UI Automation Framework (Mocha + Selenium WebDriver)

## Overview

This repository contains a **portfolio-grade UI automation framework** for testing an eCommerce web application (**saucedemo.com**).

The project focuses not only on automated test implementation, but also on **architecture design, CI/CD reliability, reporting strategy, and test traceability**, mirroring real-world automation practices used in production QA teams.

The framework supports local execution and fully automated CI pipelines with live reporting via GitHub Pages.

## How I Built This Project

This project was designed as an **engineering-focused automation framework**, not as a simple collection of UI tests.

Key priorities during development were:

- test maintainability and ease of long-term support
- clear, structured, and readable test design
- clear separation between execution, reporting, and quality analysis

## Project Goals & Scope

**Primary goals**

- Build a scalable and maintainable UI automation framework for a real eCommerce-like application (saucedemo.com)
- Demonstrate industry-standard practices: 
  - Page Object Model
  - Layered reporting
  - CI/CD automation
  - Manual-to-automation traceability
- Provide transparent and review-friendly test results via live reporting (GitHub Pages + Allure)

**Scope**

- UI automation of critical user flows:
  - Authentication
  - Product browsing (PLP / PDP)
  - Cart management
  - Checkout and order confirmation
- Test coverage across:
  - Smoke
  - Sanity
  - Functional (E2E)
  - UI/UX
  - Negative scenarios

**Out of scope (intentional)**
- Backend / API testing
- Performance or load testing
- Mobile automation
- Visual regression testing

These areas were intentionally excluded to keep the project focused on **UI automation architecture and quality strategy**, rather than tool sprawl.

### Tech Stack & Design Decisions

- JavaScript (Node.js)

Chosen for fast iteration, strong ecosystem support, and alignment with modern web-focused automation environments.

- Mocha test framework

 Provides full control over test lifecycle, hooks, retries, and execution flow without opinionated abstractions.
  This flexibility was required to implement a selective retry strategy and advanced reporting integration.

- Selenium WebDriver

 Selected for it's explicit control over browser behavior, widespread industry adoption, and because hands-on experience of using Selenium with Java in previous project.

- [Page Object Model (POM)](#page-object-model-pom-conventions)

Enforces separation of concerns:
  - Tests describe *what* is verified
  - Page Objects define *how* the UI is interacted with 

This allows scaling test coverage without proportional maintenance growth.

- [GitHub Actions for CI/CD](#2-remote-cicd)

Used as the execution and free platform for CI pipelines.
  CI/CD design decisions and architecture are described in a dedicated section below.

- [Reporting tools(Mochawesome/Allure)](#reporting-tools-allure--mochawesome)
  - Mochawesome provides execution-level diagnostics for engineers
  - Allure provides documentation-level reporting, trends, and quality signals

## Architecture & CI/CD Flow

The CI pipeline is implemented using **GitHub Actions** and is designed with **reliability and observability** as first-class concerns.

Key architectural decisions:
- **Linux-only Allure publishing**:
  - Guarantees consistent filesystem behavior
  - Prevents Allure history corruption
  - Simplifies artifact aggregation and GitHub Pages deployment
- **Matrix execution (OS + Node.js versions)** ensures cross-platform reliability and early detection of environment-specific issues.
- **Separation of concerns in CI**:
  - Matrix jobs are responsible only for test execution.
  - A dedicated Linux-only workflow generates and publishes the aggregated Allure report.

This design avoids common CI issues where reporting becomes flaky or non-deterministic due to parallel execution.

<table>
  <tr>
    <td width="40%" valign="top">
      <a href="https://github.com/Olexandr29/eCommerce_JS/blob/main/docs/diagrams/architecture-ci.drawio.svg">
        <img src="https://github.com/Olexandr29/eCommerce_JS/blob/main/docs/diagrams/architecture-ci.png" alt="Architecture & CI Flow" />
      </a>
    </td>
    <td width="60%" valign="top">
      <p>
        The diagram illustrates the overall test automation architecture,
        including the CI pipeline execution, matrix strategy across Node.js
        versions and operating systems, test execution flow, reporting
        artifacts, and publication of Allure reports to GitHub Pages.
      </p>
      <p>
        Matrix CI ensures cross-platform reliability, while a dedicated
        Linux-only workflow is responsible for generating and publishing
        the aggregated Allure report with preserved execution history.
      </p>
      <p>
        <strong>The full-resolution diagram is available here:

- [View Architecture Diagram (SVG)](https://github.com/Olexandr29/eCommerce_JS/blob/main/docs/diagrams/architecture-ci.drawio.svg)
- [Edit Source Diagram (draw.io)](https://github.com/Olexandr29/eCommerce_JS/blob/main/docs/diagrams/architecture-ci.drawio)
</strong>
      </p>
    </td>
  </tr>
</table>

## Framework Design

### Page Object Model (POM) Conventions 

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
│   └── diagram/                # Diagram illustrating the test automation architecture and CI pipeline
│       └── architecture-ci.drawio                # Source file (XML) for editing in draw.io
│       └── architecture-ci.drawio.svg            # High quality scalable diagram for wiew (SVG format)
│       └── architecture-ci.png                   # Lightweight PNG preview for quick rendering in README
│   └── reports/                # Examples of Allure and Mochawesome Reports
│       └── 1 Allure_Overview-Statuses...png      # Allure report, Overview page
│       └── 2 Allure_Suites-History.png           # Allure report, Suites page
│       └── 3 Allure_Graphs-Trend-Retr...png      # Allure report, Graphs page
│       └── 4 Mochawesome Report.png              # Mochawesome report, general view
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

## Test Strategy

- Smoke tests validate application availability and critical flows
- Sanity tests verify core features after changes
- Functional tests cover end-to-end business scenarios
- UI/UX tests validate UI behavior and state transitions
- Negative tests validate system behavior for invalid inputs

#### Retry Strategy

- Retry logic is enabled only for Functional test suites
- Max retries: 2
- Smoke, Negative and UI/UX tests are excluded
- Retries are visible in Allure and Mochawesome reports

A test is considered `flaky` if it fails and passes intermittently across retries
or across multiple CI runs.
Such tests are candidates for refactoring, stabilization,
or temporary quarantine until fixed.

Retries are applied selectively and never used to mask deterministic failures.

A deterministic failure was intentionally introduced in TC-014 to validate retry behavior.
Test failed consistently across all retry attempts, confirming that retries do not mask real defects.

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

<table>
<tr>
<td width="40%" valign="middle">
<a href="docs/reports/4 Mochawesome Report.png">
  <img
  src="docs/reports/4 Mochawesome Report.png"
  alt="An example of the Machawesome report"
  />
  </a>
</td>
<td widh="60%" valign="top">
Mochawesome is used as a Mocha reporter to provide structured execution reports(Execution-Level View) in addition to console output.

#### Purpose

- Visualize test execution results
- Analyze passed/failed tests
- Review execution duration
- Useful for engineering debugging and CI artifacts
</td>
</tr>

<tr>
<td width="40%" valign="top">

#### Characteristics

- Based on Mocha test structure
- Does not understand Page Objects or business steps
- Focused on test execution, not documentation
</td>
<td widh="60%" valign="top">

#### Typical Output

- Test name
- Status (passed / failed)
- Execution time
- Stack traces on failure
</td>
</tr>
</table>


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

<table>
<tr>
<td width="40%" valign="top">
<a href="docs/reports/1 Allure_Overview-Statuses-Trend-Environment-Executors.png">
<img
 src="docs/reports/1 Allure_Overview-Statuses-Trend-Environment-Executors.png"
 alt="Allure Report, Overview page"
 />
 </a>
 <a href="docs/reports/2 Allure_Suites-History.png">
<img
src="docs/reports/2 Allure_Suites-History.png"
alt="Allure Report, Suites page"
/>
</a>
<a href="docs/reports/3 Allure_Graphs-Trend-Retries_Trend.png">
<img
src="docs/reports/3 Allure_Graphs-Trend-Retries_Trend.png"
alt="Allure Report, Graphs page"
>
</a>
</td>
<td width="60%" valign="top">

#### Allure Reporting Overview

Allure is used as a high-level reporting and documentation tool, built on top of Mocha execution and provides a business-readable view of automated test results.

 #### The Allure report includes:

- Overall pass/fail statistics
- Test suites grouped by test type (Smoke, Sanity, Functional, UI/UX, Negative)
- Step-by-step execution flow for each test
- Severity levels and metadata
- Execution environment
- Test executor metadata
- History across CI runs
- Screenshots and attachments on failures
- [Retry](#retry-strategy) information for flaky or unstable tests

</td>
</tr>

<tr>
<td width="40%" valign="top">

#### Example (Test Metadata)
```js
description(this.test.title);
severity(AllureSeverity.CRITICAL);
```
</td>

<td width="60%" valign="top">

#### Design Principles

- One logical user action = one Allure step
- Reusable actions (e.g. login) are documented once
- Avoid step noise and duplication
</td>
</tr>
</table>

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

The `Allure Trends tab` is used as the primary source for flaky test analysis, and demonstrates tests that have periodical pass/fail behavior or frequent retries across multiple CI runs, and they are flagged as unstable, and prioritized for stabilization.

This approach transforms automated tests into living quality documentation, rather than static execution output.

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
