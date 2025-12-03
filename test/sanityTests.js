const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const BaseTest = require("../test/baseTest");
const LoginPage = require("../pages/LoginPage");
const InventoryPage = require("../pages/InventoryPage");
const TestData = require('../config/testData');
const { step, attachment } = require("allure-js-commons");
const Logger = require("../utils/logger");

describe("Sanity tests", function () {
let base;
    let driver;
    let loginPage;

    beforeEach(async function () {
        base = new BaseTest();
        await base.setup();
        driver = base.driver;

        loginPage = new LoginPage(driver);
    });

    afterEach(async function () {
        await base.tearDown(this.currentTest);
    });

it("TC-006: Successful login as performance_glitch_user", async function testLoginWithPerformanceGlitch() {    
await loginPage.login(TestData.users.performance_glitch.username, TestData.users.performance_glitch.password);
const inventoryPage = new InventoryPage(driver);
assert.strictEqual(await driver.getCurrentUrl(), TestData.expected.inventoryPageUrl, "user was not redirected to the inventory page");
assert.strictEqual(await inventoryPage.getInventoryHeader(), TestData.expected.inventoryHeading, "the inventory header is not 'Products'");
});

it("TC-007: Unsuccessful login with empty fields", async function testLoginWithEmptyFields() {
    assert.strictEqual(await loginPage.attemptTologinWithEmptyFields(), TestData.errors.emptyUsernameField, "The error message for empty field is not correct");
});

it("TC-008: Unsuccessful login with non-existent user", async function testLoginNotExistedUser() {
    assert.strictEqual(await loginPage.loginWithInvalidCredentials(TestData.users.fake.username, TestData.users.fake.password), TestData.errors.notExistedUser, "The error message for fake user is not correct");
})

// it("TC-009: Navigate to the cart page", async function navigateToCart() {
// await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
// await inventoryPage.openCart();
// assert.strictEqual(await driver.getCurrentUrl(), TestData.expected.cartPageUrl, "user was not redirected to the cart page");
// })

})