const {By, Builder} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const BaseTest = require("./baseTest");
const LoginPage = require("../pages/LoginPage");
const InventoryPage = require("../pages/InventoryPage");
const testData = require("../config/testData");
const assert = require("assert");

describe("Functional tests", function () {

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

    it("TC-014: Sort products by price(low to high)", async function testSortByPriceAscending () {
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.sortByPriceAsc();
        const prices = await inventoryPage.getProductPrices();
        assert.strictEqual(await inventoryPage.isNumbersAsc(prices), true, "Products were not sorted by ascending price");

    })

})