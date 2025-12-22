const { severity } = require("allure-js-commons");
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
    });

    this.afterEach(async function () {
        await base.tearDown(this.currentTest);        
    });

    it("TC-025: Logo and header visibility", async function testLogoAndHeaderVisibility() {
        description(this.test.title);
        severity(AllureSeverity.TRIVIAL);
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        assert.strictEqual(await inventoryPage.areLogoAndHeaderVisible(), true, "Logo and Header art not visible");

    });


})