const { By, Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const BaseTest = require("./baseTest");
const LoginPage = require("../pages/LoginPage");
const InventoryPage = require("../pages/InventoryPage");
const ProductDetailsPage = require("../pages/ProductDetailsPage");
const testData = require("../config/testData");
const assert = require("assert");
const CartPage = require("../pages/CartPage");
const { step, label, description, severity } = require("allure-js-commons");
const CheckoutPage1 = require("../pages/CheckoutPage1");
const CheckoutPage2 = require("../pages/CheckoutPage2");
const ConfirmationPage = require("../pages/ConfirmationPage");
const Logger = require("../utils/logger");
const AllureSeverity = require("../utils/allureSeverity");
const DataHelper = require("../utils/dataHelper");

describe("@Functional tests", function () {
    let product;
    let products;
    let base;
    let driver;
    let loginPage;

    beforeEach(async function () {
        base = new BaseTest();
        await base.setup();
        driver = base.driver;
        loginPage = new LoginPage(driver);
        product = DataHelper.getRandomProduct();
        products = DataHelper.getRandomProducts(3);
    })

    afterEach(async function () {
        await base.attachFailureScreenshot(this.currentTest);
        await base.tearDown();
    });

    this.retries(2);

    it("TC-014: Sort products by price(low to high) @Functional", async function testSortByPriceAscending() {
        description(this.test.title);
        severity(AllureSeverity.NORMAL);
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.sortByPriceAsc();
        const prices = await inventoryPage.getProductPrices();
        assert.strictEqual(await inventoryPage.isNumbersAsc(prices), 
         true,
         "Products are not sorted by ascending price");
    });

    it("TC-015: Sort products by name (Z to A)", async function testSortByNameDescending() {
        description(this.test.title);
        severity(AllureSeverity.NORMAL);
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.sortByNameDesc();
        const names = await inventoryPage.getProductNames();
        assert.strictEqual(await inventoryPage.isNamesDesc(names), true, "Products are not sorted by descending name");
    });

    it("TC-016: Product details view", async function testPDPview() {
        description(this.test.title);
        severity(AllureSeverity.NORMAL);
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        const actualUrl = await inventoryPage.openProductDetailsPage();
        const expectedUrlWithoutIdNum = testData.expected.productDetailsPageUrl;
        assert.ok(actualUrl.startsWith(expectedUrlWithoutIdNum), `User was not redirected to PDP ${expectedUrlWithoutIdNum}, and actual now ${actualUrl}`);
        const productDetailsPage = new ProductDetailsPage(driver);
        // assert.strictEqual(await productDetailsPage.isImagePresence(), true, "Image is not presence on PDP");
        // assert.strictEqual(await productDetailsPage.isNamePresence(), true, "Name is not presence on PDP");
        // assert.strictEqual(await productDetailsPage.isDescriptionPresence(), true, "Description is not presence on PDP");
        // assert.strictEqual(await productDetailsPage.isPricePresence(), true, "Price is not presence on PDP");
        assert.strictEqual(await productDetailsPage.verifyProducDetails(), true, "Product details page does not contain full product info");
    })

    it("TC-017: Add multiple items to cart", async function testAdd3itemsToCart() {
        description(this.test.title);
        severity(AllureSeverity.CRITICAL);
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.addProductsToCart(products);
        assert.strictEqual(await inventoryPage.getCartBadgeNum(), 3, "Added and displayed amount of items is not equal");

    })

    it("TC-018: Remove one of 3 items from cart", async function testRemove1of3itemsFromCart() {
        description(this.test.title);
        severity(AllureSeverity.NORMAL);
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.addProductsToCart(products);
        assert.strictEqual(await inventoryPage.getCartBadgeNum(), 3, "Added and displayed amount of items is not equal");
        await inventoryPage.openCart();
        const cartPage = new CartPage(driver);
        await cartPage.remove1OfItemsFromCart();
        assert.strictEqual(await cartPage.getCartBadgeNum(), 2, "Cart Badge should show that only 2 items remain");
    })

    it("TC-019: Cart state persists across navigation", async function testPersitCartState() {
        description(this.test.title);
        severity(AllureSeverity.CRITICAL);
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.addProductToCartById(product.id);
        assert.strictEqual(await inventoryPage.isCartEmpty(), false, "Added product is not displayed in the cart");
        assert.strictEqual(await inventoryPage.getCartBadgeNum(), 1, "The wrong number is displayed in the cart badge");
        const productDetailsPage = new ProductDetailsPage(driver);

        const actualUrl = await inventoryPage.openProductDetailsPage();
        const expectedUrlWithoutIdNum = testData.expected.productDetailsPageUrl;

        assert.ok(actualUrl.startsWith(expectedUrlWithoutIdNum), `User was not redirected to PDP ${expectedUrlWithoutIdNum}, and actual now ${actualUrl}`);
        assert.strictEqual(await productDetailsPage.getCartBadgeNum(), 1, "Cart state is not persist across navigation, and cart badge is not 1 now");
    })

    it("TC-020: Full purchase flow", async function testFullPurchaseFlow() {
        description(this.test.title);
        severity(AllureSeverity.BLOCKER);
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.addProductToCartById(product.id);
        const cartPage = new CartPage(driver);
        await inventoryPage.openCart();
        const checkoutPage1 = new CheckoutPage1(driver);
        await cartPage.openCheckout();
        const randomData = testData.randomCheckout();
        Logger.info(`here is random data for this case - ${randomData.firstName}, ${randomData.lastName}, ${randomData.zip}`);
        await checkoutPage1.fillCheckout1(randomData.firstName, randomData.lastName, randomData.zip);
        const checkoutPage2 = new CheckoutPage2(driver);
        const confirmationPage = new ConfirmationPage(driver);
        assert.strictEqual(await checkoutPage2.openConfirmationPage(), testData.expected.confirmationPageUrl, "User is not redirected to the Confirmation page")
        assert.strictEqual(await confirmationPage.getConfirmationText(), testData.messages.confirmationPageText, "Confirmation page does not contain the text 'Thank you for your order!'");
    })

    it("TC-021:Checkout form validation", async function testCheckoutFormValidation() {
        description(this.test.title);
        severity(AllureSeverity.NORMAL);
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.addProductToCartById(product.id);
        await inventoryPage.openCart();
        const cartPage = new CartPage(driver);
        await cartPage.openCheckout();
        const checkoutPage1 = new CheckoutPage1(driver);
        assert.strictEqual(await checkoutPage1.fillCheckout1WithEmptyFields(), testData.errors.checkout1FirstName, "The error message is not correct");
    })

    it("TC-022: Total price with tax is calculated correctly", async function testCheckCalculations() {
        description(this.test.title);
        severity(AllureSeverity.BLOCKER);
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.addProductsToCart(products);
        await inventoryPage.openCart();
        const cartPage = new CartPage(driver);
        await cartPage.openCheckout();
        const checkoutPage1 = new CheckoutPage1(driver);
        const randomData = testData.randomCheckout();
        await checkoutPage1.fillCheckout1(randomData.firstName, randomData.lastName, randomData.zip);
        const checkoutPage2 = new CheckoutPage2(driver);
        const subTotalBill = await checkoutPage2.getSubtotalPrices();
        const recalculatedSubtotal = await checkoutPage2.getPricesSum();
        assert.strictEqual(subTotalBill, recalculatedSubtotal,"The subtotal price is not correct");
        await checkoutPage2.getTax();
        assert.strictEqual(await checkoutPage2.getTotal(), await checkoutPage2.getSumOfSubtotalAndTax(), "The sum of Subtotal and Tax is not equal to Total");
    });

    it("TC-023: Back from product detail to product list", async function testBackToPLP() {
        description(this.test.title);
        severity(AllureSeverity.NORMAL);
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        const productDetailsPage = new ProductDetailsPage(driver);
        const actualUrl = await inventoryPage.openProductDetailsPage();
        const expectedUrlWithoutIdNum = testData.expected.productDetailsPageUrl;
        assert.ok(actualUrl.startsWith(expectedUrlWithoutIdNum), `User was not redirected to PDP ${expectedUrlWithoutIdNum}, and actual now ${actualUrl}`);
        assert.strictEqual(await productDetailsPage.returnBackToPLP(), testData.expected.inventoryPageUrl, "navigation back to inventory page is not successful");
    });

    it("TC-024: Use browser back button from product detail", async function testBrowserBacktoPLP() {
        await loginPage.login(testData.users.standard.username, testData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        const productDetailsPage = new ProductDetailsPage(driver);
        await inventoryPage.openProductDetailsPage();
        assert.strictEqual(await productDetailsPage.goBackAndWait(testData.expected.inventoryPageUrl), testData.expected.inventoryPageUrl, "user is not redirected back to Inventory page via browser back button");
    });


})