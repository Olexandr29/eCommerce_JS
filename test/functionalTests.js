const {By, Builder} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const BaseTest = require("./baseTest");
const LoginPage = require("../pages/LoginPage");
const InventoryPage = require("../pages/InventoryPage");
const ProductDetailsPage = require("../pages/ProductDetailsPage");
const testData = require("../config/testData");
const assert = require("assert");
const CartPage = require("../pages/CartPage");

describe("@Functional tests", function () {

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

    it("TC-014: Sort products by price(low to high) @Functional", async function testSortByPriceAscending () {
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.sortByPriceAsc();
        const prices = await inventoryPage.getProductPrices();
        assert.strictEqual(await inventoryPage.isNumbersAsc(prices), true, "Products are not sorted by ascending price");
    });

    it("TC-015: Sort products by name (Z to A)", async function testSortByNameDescending () {
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.sortByNameDesc();
        const names = await inventoryPage.getProductNames();
        assert.strictEqual(await inventoryPage.isNamesDesc(names), true, "Products are not sorted by descending name");
    });

    it("TC-016: Product details view", async function testPDPview() {
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        const actualUrl = await inventoryPage.openProductDetailsPage();
        const expectedUrlWithoutIdNum = testData.expected.productDetailsPageUrl;
        assert.ok(actualUrl.startsWith(expectedUrlWithoutIdNum), `User was not redirected to PDP ${expectedUrlWithoutIdNum}, and actual now ${actualUrl}`);
        const productDetailsPage = new ProductDetailsPage(driver);
        assert.strictEqual(await productDetailsPage.isImagePresence(), true, "Image is not presence on PDP");
        assert.strictEqual(await productDetailsPage.isNamePresence(), true, "Name is not presence on PDP");
        assert.strictEqual(await productDetailsPage.isDescriptionPresence(), true, "Description is not presence on PDP");
        assert.strictEqual(await productDetailsPage.isPricePresence(), true, "Price is not presence on PDP");
    })

    it("TC-017: Add multiple items to cart", async function testAdd3itemsToCart() {
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.add3ItemsToCart();
        assert.strictEqual(await inventoryPage.getCartBadgeNum(), 3, "Added and displayed amount of items is not equal");
    })

    it("TC-018: Remove one of 3 items from cart", async function testRemove1of3itemsFromCart() {
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.add3ItemsToCart();
        assert.strictEqual(await inventoryPage.getCartBadgeNum(), 3, "Added and displayed amount of items is not equal");
        await inventoryPage.openCart();
        const cartPage = new CartPage(driver);
        await cartPage.remove1OfItemsFromCart();
        assert.strictEqual(await cartPage.getCartBadgeNum(), 2, "Cart Badge should show that only 2 items remain");
    })

})