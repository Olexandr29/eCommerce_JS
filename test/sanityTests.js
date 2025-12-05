const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const BaseTest = require("../test/baseTest");
const LoginPage = require("../pages/LoginPage");
const InventoryPage = require("../pages/InventoryPage");
const CartPage = require("../pages/CartPage");
const CheckoutPage1 = require("../pages/CheckoutPage1");
const CheckoutPage2 = require("../pages/CheckoutPage2");
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

it("TC-009: Navigate to the cart page", async function testNavigateToCart() {
await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
const inventoryPage = new InventoryPage(driver);
await inventoryPage.openCart();
const cartPage = new CartPage(driver);
assert.strictEqual(await cartPage.getCurrentUrl(), TestData.expected.cartPageUrl, "user was not redirected to the cart page");
})

it("TC-010: Remove item from the cart", async function testRemoveFromCart() {
    await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
    const inventoryPage = new InventoryPage(driver);
    await inventoryPage.addOneItemToCart();
    assert.strictEqual(await inventoryPage.isCartEmpty(), false, "Cart is empty and the product is not added to cart")
    const cartPage = new CartPage(driver);
    await inventoryPage.openCart();
    assert.strictEqual(await cartPage.cartHasProduct(), true, "any product is displayed in the cart");
    await cartPage.removeProduct();
    assert.strictEqual(await cartPage.cartHasProduct(), false, "some product is displayed in the cart after removal");
    assert.strictEqual(await cartPage.isCartBadgePresent(), false, "cart badge is present after removel");
})

it("TC-011: Proceed to checkout", async function testNavigateToCheckout1() {
    await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
    const inventoryPage = new InventoryPage(driver);
    await inventoryPage.addOneItemToCart();
    await inventoryPage.openCart();
    const cartPage = new CartPage(driver);
    await cartPage.openCheckout();
    const checkoutPage1 = new CheckoutPage1(driver);
    assert.strictEqual(await checkoutPage1.getCurrentUrl(), TestData.expected.checkoutPage1Url, "user was not redirected to the checkout step 1 page");
})

it("TC-012: Fill in user information at the checkout", async function testFillCheckout1() {
    await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
    const inventoryPage = new InventoryPage(driver);
    await inventoryPage.addOneItemToCart();
    await inventoryPage.openCart();
    const cartPage = new CartPage(driver);
    await cartPage.openCheckout();
    const checkoutPage1 = new CheckoutPage1(driver);
    // const data = TestData.random();
    // Logger.info(`Generated random customer: ${data.firstName} ${data.lastName}, zip: ${data.zip}`)
    // await checkoutPage1.fillCheckout1(data.firstName, data.lastName, data.zip);
    await checkoutPage1.fillCheckout1(TestData.infoForCheckout1.firstName, TestData.infoForCheckout1.lastName, TestData.infoForCheckout1.zip);
    const checkoutPage2 = new CheckoutPage2(driver);
    assert.strictEqual(await checkoutPage2.getCurrentUrl(), TestData.expected.checkoutPage1Ur2, "user was not redirected to the checkout step 2 page");
}),

it("TC-013: Cancel from the overview page", async function testNavigateBackToInventory() {
    await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
    const inventoryPage = new InventoryPage(driver);
    await inventoryPage.addOneItemToCart();
    await inventoryPage.openCart();
    const cartPage = new CartPage(driver);
    await cartPage.openCheckout();
    const checkoutPage1 = new CheckoutPage1(driver);
    await checkoutPage1.fillCheckout1(TestData.infoForCheckout1.firstName, TestData.infoForCheckout1.lastName, TestData.infoForCheckout1.zip);
    const checkoutPage2 = new CheckoutPage2(driver);
    assert.strictEqual(await checkoutPage2.navigateBackToInventory(),
    TestData.expected.inventoryPageUrl, "user was not redirected back to inventory page");
})

})