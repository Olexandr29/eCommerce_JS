const assert = require("assert");
const { step, label, description, severity } = require("allure-js-commons");
const BaseTest = require("./baseTest");
const BasePage = require("../pages/BasePage");
const LoginPage = require("../pages/LoginPage");
const TestData = require("../config/testData");
const testData = require("../config/testData");
const allureSeverity = require("../utils/allureSeverity");

describe("@Negative tests", function () {
    let driver;
    let base;
    let loginPage;

    this.beforeEach(async function () {
        base = new BaseTest();
        await base.setup();
        driver = base.driver;
    });

    this.afterEach(async function () {
        await base.tearDown(this.currentTest);
    });

    it("TC-028: Entering SQL Injection in Username", async function testSQLinjection() {
        description(this.test.title);
        severity(allureSeverity.CRITICAL);
        loginPage = new LoginPage(driver);
        assert.strictEqual(await loginPage.loginWithInvalidCredentials(testData.sqlInjectionUserName, testData.users.standard.password),
        testData.errors.notExistedUser, "Error message for SQL injection for username is not correct");
    })


});