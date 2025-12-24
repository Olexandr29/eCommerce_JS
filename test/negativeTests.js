const assert = require("assert");
const { step, label, description, severity, logStep } = require("allure-js-commons");
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
        const loginPage = new LoginPage(driver);
        assert.strictEqual(await loginPage.loginWithInvalidCredentials(testData.sqlInjectionUserName, testData.users.standard.password),
        testData.errors.notExistedUser, "Error message for SQL injection for username is not correct");
    });

    it("TC-029: Long Value in Username Field", async function testLongUsername() {
        description(this.test.title);
        severity(allureSeverity.NORMAL);
        const loginPage = new LoginPage(driver);
        const result = await loginPage.logStep(
        "Attempt login with 500-character username",
        async () => loginPage.attemptToLogin(testData.longName500, 
            testData.users.standard.password));

        assert.ok(
            result.errorMessage === testData.errors.notExistedUser ||
            result.actualUsernameLength < testData.longName500.length,
            `Login was not rejected correctly for long username.
            Expected: error message OR trunced input.
            Actual: errorMessage=${result.errorMessage}, actualUsernameLength=${result.actualUsernameLength}`);
    });

    it("TC-030: Login with Leading/Trailing Spaces in Username", async function testUsernameWithSpaces() {
        description(this.test.title);
        severity(allureSeverity.MINOR);
        const loginPage = new LoginPage(driver);
        const result = await await loginPage.logStep(
        "Attempt login with leading and trailing spaces in username",
        async () => loginPage.attemptToLogin(" standard_user ", testData.users.standard.password));
        assert.ok(
            result.errorMessage === testData.errors.notExistedUser ||
            result.actualUsernameLength === testData.users.standard.username.length,
            `System is not trimming spaces Leading/Trailing Spaces in Username.
            Expected: error message OR trimmed input.
            Actual: errorMessage=${result.errorMessage}, actualUsernameLength=${result.actualUsernameLength}`);
    });


})