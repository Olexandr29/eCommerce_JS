const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const TestData = require('../data/testData');

async function setUp() {
    let option = new chrome.Options();
    option.addArguments("--incognito");

    let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(option)
        .build();

    const loginPage = new LoginPage(driver);
    return { driver, loginPage };
}


async function successfulLoginTest() {
    const { driver, loginPage } = await setUp();
    try {
        await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        assert.strictEqual(await driver.getCurrentUrl(), TestData.expected.inventPage, "Redirection on the inventory page is not happened");
        assert.strictEqual(await inventoryPage.getInventoryHeader(), TestData.expected.inventHeading, "the inventory header is not 'Products'");
    } catch (error) {
        console.error("Test failed:", error);
    }
    finally {
        console.log("-----test#1-----")
        await driver.quit();
    }
}

async function unSuccessfulLoginTest() {
    const { driver, loginPage } = await setUp();
    try {
        const actualErrMsgForLockedU = await loginPage.unSuccessfullLoginWithError(TestData.users.locked.username, TestData.users.locked.password);
        assert.strictEqual(actualErrMsgForLockedU, TestData.errors.forLockedUser, "The error message is not the same as specified in the requirements")
    } catch (error) {
        console.log("The error happened - ", error);
    } finally {
                console.log("-----test#2-----")
        await driver.quit()
    }
}

async function presenceOfPLP() {
    const { driver, loginPage } = await setUp();
    try {
        await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        assert.ok(await inventoryPage.plpContainsMoreThan1Item(), "PLP contains not more than 1 product");
        assert.ok(await inventoryPage.productContainsNameAndPrice(), "some product doesn't contain name and price");
    } catch (error) {
        console.log("the error is -", error)
    }
    finally {
            console.log("-----test#3-----")
        await driver.quit();
    }
}

async function logOut() {
    const { driver, loginPage } = await setUp();
    try {
        await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.logOut();
        assert.equal(await driver.getCurrentUrl(), TestData.baseUrl, "redirection to home page after LogOut is not happened")
        await driver.sleep(50)
    } catch (error) {
        console.log("error = ", error);
    } finally {
        console.log("-----test#4-----")
        await driver.quit();
    }
}

async function addToCart() {
    const { driver, loginPage } = await setUp();
    try {
        await loginPage.login(TestData.users.standard.username, TestData.users.standard.password);
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.addOneItemToCart();
        assert.strictEqual(await inventoryPage.isCartEmpty(), false, "Cart is empty and the product is not added to cart")
    } catch (error) {
        console.log("error is - ", error);
    } finally {
        console.log("-----test#5-----")
        await driver.quit();
    }

}


(async () => {
    await successfulLoginTest();
    await unSuccessfulLoginTest();
    await presenceOfPLP();
    await logOut();
    await addToCart()
})();