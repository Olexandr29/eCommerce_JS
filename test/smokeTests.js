const assert = require("assert");
const BaseTest = require("../test/baseTest");
const LoginPage = require("../pages/LoginPage");
const InventoryPage = require("../pages/InventoryPage");
const TestData = require('../config/testData');
const Logger = require("../utils/logger");
const { step, label, description, severity } = require("allure-js-commons");
const AllureSeverity = require("../utils/allureSeverity");
const DataHelper = require("../utils/dataHelper");

describe("@Smoke tests", function () {
    let base;
    let driver;
    let loginPage;

    beforeEach(async function() {
        base = new BaseTest();
        await base.setup();
        driver = base.driver;

        loginPage = new LoginPage(driver);
    });

    afterEach(async function () {
        await base.tearDown(this.currentTest); 
    });

    it("TC-001: Successful login with valid credentials", async function testLoginSuccess() {   
        description(this.test.title);
        severity(AllureSeverity.BLOCKER); 
        await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        assert.strictEqual(await driver.getCurrentUrl(), TestData.expected.inventoryPageUrl, "user was not redirected to the inventory page");
        assert.strictEqual(await inventoryPage.getInventoryHeader(), TestData.expected.inventoryHeading, "the inventory header is not 'Products'");
        });

        it("TC-002: Unsuccessful login with locked user", async function testLoginFailure() {
            description(this.test.title);
            severity(AllureSeverity.CRITICAL);
            try {
                // const actualErrMsgForLockedU = await loginPage.loginWithInvalidCredentials(TestData.users.locked.username, TestData.users.locked.password);
                   const actualErrMsgForLockedU = await loginPage.loginWithInvalidCredentials(TestData.users.locked.username, TestData.users.locked.password);

                assert.strictEqual(actualErrMsgForLockedU, TestData.errors.lockedUserError, "The error message is not the same as specified in the requirements")
            } catch (error) {
                console.log("The error happened - ", error);
                 throw error;
            }
        });

        it("TC-003: Check presence of product list after login", async function testProductListPage() {
            description(this.test.title);
            severity(AllureSeverity.BLOCKER);
            try {
                await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
                const inventoryPage = new InventoryPage(driver);
                assert.strictEqual(await inventoryPage.hasMultipleProducts(), true, "PLP contains not more than 1 product");
                assert.strictEqual(await inventoryPage.allProductsHaveNameAndPrice(), true, "some product doesn't contain name and price");
            } catch (error) {
                console.log("the error is -", error)
                 throw error;
            }
        });

        it("TC-004: Logout from application", async function testLogOut() {
            description(this.test.title);
            severity(AllureSeverity.NORMAL);
            try {
                await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
                const inventoryPage = new InventoryPage(driver);
                await inventoryPage.logOut();
                assert.strictEqual(await driver.getCurrentUrl(), TestData.baseUrl, "redirection to home page after LogOut is not happened")
                // await driver.sleep(50)
            } catch (error) {
                console.log("error = ", error);
                throw error;
            }
        });

        it("TC-005: Add item to cart and check badge", async function testAddToCart() {
            description(this.test.title);
            severity(AllureSeverity.BLOCKER);
            try {
                const product = DataHelper.getRandomProduct();
                await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
                const inventoryPage = new InventoryPage(driver);
                await inventoryPage.addProductToCartById(product.id);
                assert.strictEqual(await inventoryPage.isCartEmpty(), false, "Cart is empty and the product is not added to cart")
            } catch (error) {
                console.log("error is - ", error);
                 throw error;
            }
        });

    })    