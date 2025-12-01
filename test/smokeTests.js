const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const LoginPage = require("../pages/LoginPage");
const InventoryPage = require("../pages/InventoryPage");
const TestData = require('../config/testData');
// const { allure } = require("allure-mocha/runtime");
const { step, attachment } = require("allure-js-commons");
const Logger = require("../utils/logger");
const {testCases} = require("../config/testData");

describe("Smoke tests", function () {
    let driver;
    let loginPage;

    this.beforeEach(async function () {

        let options = new chrome.Options();
        options.addArguments("--incognito");

        if (process.env.HEADLESS === "true") {
            options.addArguments("--headless=new");
            options.addArguments("--disable-gpu");
            options.addArguments("--window-size=1920,1080");
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
        }

        driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();

        loginPage = new LoginPage(driver);
    });

    this.afterEach(async function () {
        this.timeout(5000);
        
        if (driver) {
            if (this.currentTest.state === "failed") {
                try {
                    const img = await driver.takeScreenshot();
                    attachment("Screenshot on failure", 
                        Buffer.from(img, "base64"), "image/png");
                } catch (err) {
                    console.error("Error taking screenshot:", err);
                     throw error;
                }
            }
            await driver.quit();
        }
    });

    it("TC-001: Successful login with valid credentials", async function testLoginSuccess() {    
        const testCaseId = "TC001";
        Logger.start(testCaseId);
        await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
            const inventoryPage = new InventoryPage(driver);
            assert.strictEqual(await driver.getCurrentUrl(), TestData.expected.inventoryPageUrl, "user was not redirected to the inventory page");
            assert.strictEqual(await inventoryPage.getInventoryHeader(), TestData.expected.inventoryHeading, "the inventory header is not 'Products'");
        Logger.end(testCaseId)
        });

        it("TC-002: Unsuccessful login with locked user", async function testLoginFailure() {
            try {
                const actualErrMsgForLockedU = await loginPage.loginWithInvalidCredentials(TestData.users.locked.username, TestData.users.locked.password);
                assert.strictEqual(actualErrMsgForLockedU, TestData.errors.lockedUserError, "The error message is not the same as specified in the requirements")
            } catch (error) {
                console.log("The error happened - ", error);
                 throw error;
            }
        });

        it("TC-003: Check presence of product list after login", async function testProductListPage() {
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
            try {
                await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
                const inventoryPage = new InventoryPage(driver);
                await inventoryPage.addOneItemToCart();
                assert.strictEqual(await inventoryPage.isCartEmpty(), false, "Cart is empty and the product is not added to cart")
            } catch (error) {
                console.log("error is - ", error);
                 throw error;
            }
        });

    });    