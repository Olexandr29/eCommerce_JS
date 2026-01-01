const LoginPage = require("../pages/LoginPage");
const BaseTest = require("./baseTest");
const AllureSeverity = require("../utils/allureSeverity");
const InventoryPage = require("../pages/InventoryPage");
const testData = require("../config/testData");
const assert = require("assert");
const { description, severity } = require("allure-js-commons");
const { viewports } = require("../utils/viewportHelper");

describe("@UI/UX tests", function () {
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

    it.only("TC-026: Browser window resizing", async function testResizing() {
        description(this.test.title);
        severity(AllureSeverity.NORMAL);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.setViewport(viewports.mobile);
        assert.strictEqual(await inventoryPage.isLayoutCorrect(), true, `Layout is broken on ${viewports.mobile.name} (${viewports.mobile.width}x${viewports.mobile.height})`);
        await inventoryPage.setViewport(viewports.tablet);
        assert.strictEqual(await inventoryPage.isLayoutCorrect(), true, `Layout is broken on ${viewports.tablet.name} (${viewports.tablet.width}x${viewports.tablet.height})`);
        await inventoryPage.setViewport(viewports.desktop);
        assert.strictEqual(await inventoryPage.isLayoutCorrect(), true, `Layout is broken on ${viewports.desktop.name} (${viewports.desktop.width}x${viewports.desktop.height})`);
    });

    it("TC-027: Button state change on interaction", async function testButtonInteraction() {
        description(this.test.title);
        severity(AllureSeverity.BLOCKER);
        const inventoryPage = new InventoryPage(driver);

        await inventoryPage.logStep("Validate initial button state", async () => {
            const text = await inventoryPage.getActionButtonText();
            assert.strictEqual(text, "Add to cart");
        });

        await inventoryPage.logStep("Perform triggering action", async () => {
            await inventoryPage.clickAddToCart();
        });

        await inventoryPage.logStep("Verify updated button state", async () => {
            const text = await inventoryPage.getActionButtonText();
            assert.strictEqual(text, "Remove");
        });

        await inventoryPage.clickRemove();

        const finalText = await inventoryPage.getActionButtonText();
        assert.strictEqual(finalText, "Add to cart");

    });

})