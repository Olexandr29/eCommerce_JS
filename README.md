# JavaScript UI Automation Framework (Mocha + WebDriver)

## 📌 Project Purpose

This project aims to build a scalable and maintainable **UI automation framework** for testing eShop (the web application **saucedemo.com**) using:
- JavaScript (Node.js)
- Mocha test framework
- WebDriver (Selenium WebDriver)
- [Page Object Model (POM)](#page-object-model-pom-conventions)
- GitHub Actions for CI/CD
- [Reporting tools(Allure/Mochawesome)](#reporting-tools-allure--mochawesome)

The goal is to create a professional-grade automation environment that demonstrates real industry practices and allows running automated tests locally and remotely.

---
## Page Object Model (POM) Conventions 

<details><summary> 1. Project Structure</summary>

```
project-root/
│
├── pages/                # Page Object files
│   ├── BasePage.js       # Parent class with UI helper methods
│   ├── LoginPage.js      # POM: Login page
│   └── InventoryPage.js  # POM: Inventory/products page
├── test/                 # Mocha test file/s
│   └── smokeTests.js
├── config/               # Configuration settings (baseUrl), credentials, test data, environment settings
│   └── testData.js
├── utils/                # Reusable helper functions (custom waits, screenshots, actions, wrappers)
├── .gitignore            # List of folders and files that will not be commited on GitHub
├── package.json          # json file with scripts and dependencies
├── README.md             # Description of the project
└── Task_TestCases.md     # List of implemented test cases (Smoke, Sanity, Functional, etc.) and other tasks with status 

```
The project follows a modular POM structure, where each UI page has its own class containing:
- locators
- helper methods
- reusable page-specific actions
</details>

---

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
login(), logOut(), addOneItemToCart()
- Helpers → descriptive names:
waitForVisible(), waitAndGetText(), safeClick()

</details>

---

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

---

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
</details>

---

This example demonstrates:

POM initialization

Using page-level methods instead of inline selectors

Clean, maintainable test structure

---


## Local Test Execution

Run all tests:

```

npm test

```

Mocha will run any test inside `/test`.

---


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

Allure is used as a high-level reporting and documentation tool, built on top of Mocha execution.

#### Purpose

- Represent automated tests as living documentation
- Bridge manual test cases and automation
- Provide business-readable reports

#### What Allure can add
- Steps (step)
- Descriptions (description)
- Severity levels (severity)
- Labels, features, stories
- Attachments (screenshots, logs)

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

Allure reports are generated separately and viewed as an HTML dashboard.


#### Running Tests with Allure

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

#### Running Tests with Allure via Batch Script

For convenience during local development, the three Allure-related commands were grouped into a single Windows batch script.

#### Script name:  [run-allure-tests.bat](https://github.com/Olexandr29/eCommerce_JS/blob/main/run-allure-tests.bat) 

#### Purpose: 
Run tests, generate the Allure report, and open it in a browser with a single command.

To execute the script manually, simply run:
```bash
./run-allure-tests.bat
```

#### Test Organization
- Tests are grouped by purpose:
  -  @Smoke
  - @Sanity
  - @Functional
- Metadata (severity, description) is defined at test level
- Steps are defined at page/action level

</details>

---

## Process & Methodology

- Project organized using SCRUM methodology (2-week sprints)

- Tasks tracked via Kanban board
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
