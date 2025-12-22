// const { severity } = require("allure-js-commons");
const LoginPage = require("../pages/LoginPage");
const BaseTest = require("./baseTest");
const AllureSeverity = require("../utils/allureSeverity");
const InventoryPage = require("../pages/InventoryPage");
const testData = require("../config/testData");
const assert = require("assert");
const { step, label, description, severity } = require("allure-js-commons");


describe("@UI/UX and Negative tests", function () {
    let driver;
    let base;
    let loginPage;

    this.beforeEach(async function () {
        base = new BaseTest();
        await base.setup();
        driver = base.driver;
        loginPage = new LoginPage(driver);
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);

    });

    this.afterEach(async function () {
        await base.tearDown(this.currentTest);        
    });

    it("TC-025: Logo and header visibility", async function testLogoAndHeaderVisibility() {
        description(this.test.title);
        severity(AllureSeverity.TRIVIAL);
        const inventoryPage = new InventoryPage(driver);
        assert.strictEqual(await inventoryPage.areLogoAndHeaderVisible(), true, "Logo and Header art not visible");
    });

    it("TC-026: Browser window resizing", async function testResizing () {
        description(this.test.title);
        severity(AllureSeverity.NORMAL);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.resizeWindow(testData.windowSize.mobile.width, testData.windowSize.mobile.height);
        assert.strictEqual(await inventoryPage.isLayoutCorrect(), true, `Layout is broken on ${testData.windowSize.mobile.name} (${testData.windowSize.mobile.width}x${testData.windowSize.mobile.height})`);
        await inventoryPage.resizeWindow(testData.windowSize.tablet.width, testData.windowSize.tablet.height);
        assert.strictEqual(await inventoryPage.isLayoutCorrect(), true, `Layout is broken on ${testData.windowSize.tablet.name} (${testData.windowSize.tablet.width}x${testData.windowSize.tablet.height})`);
        await inventoryPage.resizeWindow(testData.windowSize.desktop.width, testData.windowSize.desktop.height);
        assert.strictEqual(await inventoryPage.isLayoutCorrect(), true, `Layout is broken on ${testData.windowSize.desktop.name} (${testData.windowSize.desktop.width}x${testData.windowSize.desktop.height})`);
    });

})