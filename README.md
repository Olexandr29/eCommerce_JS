# JavaScript UI Automation Framework (Mocha + WebDriver)

## 📌 Project Purpose

This project aims to build a scalable and maintainable **UI automation framework** for testing eShop (the web application **saucedemo.com**) using:
- JavaScript (Node.js)
- Mocha test framework
- WebDriver (Selenium WebDriver)
- [Page Object Model (POM)](#page-object-model-pom-conventions)
- GitHub Actions for CI/CD
- Reporting tools (Allure / Mochawesome)


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

Mocha will run any test inside `/tests`.

---





<br>
Additional Information:

- Project organized using SCRUM methodology (weekly sprints).
- Task management performed using Trello Kanban board