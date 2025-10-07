const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");

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
        await loginPage.login("standard_user", "secret_sauce");

        const inventoryPage = new InventoryPage(driver);
        assert.ok((await driver.getCurrentUrl()).includes("/inventory.html"), "Redirection on the inventory page is not happened");
        assert.equal(await inventoryPage.getInventoryHeader(), "Products", "the inventory header is not 'Products'");
    } catch (error) {
        console.error("Test failed:", error);
    }
    finally {
        await driver.quit();
    }
}

async function unSuccessfulLoginTest() {
    const { driver, loginPage } = await setUp();
    try {
        const actualErrMsgForLockedU = await loginPage.unSuccessfullLoginWithError("locked_out_user", "secret_sauce");
        assert.equal(actualErrMsgForLockedU, "Epic sadface: Sorry, this user has been locked out.", "The error message is not the same as specified in requirements")
    } catch (error) {
        console.log("The error happened - ", error);
    } finally {
        await driver.quit()
    }
}

async function presenceOfPLP() {
    const { driver, loginPage } = await setUp();
    try {
        await loginPage.login("standard_user", "secret_sauce");
        const inventoryPage = new InventoryPage(driver);
        assert.ok(await inventoryPage.plpContainsMoreThan1Item(), "PLP contains not more than 1 product");
    } catch (error) {
        console.log("the error is -", error)
    }
    finally {
        await driver.quit();
    }
}

async function PDLcontainsNameAndPrice() {
    const { driver, loginPage } = await setUp();
    try {
        await loginPage.login("standard_user", "secret_sauce");
        const inventoryPage = new InventoryPage(driver);
        assert.ok(await inventoryPage.productContainsNameAndPrice(), "some product doesn't contain name and price");
    } catch (error) {
        console.log("the error is = ", error)
    } finally {
        await driver.quit();
    }

}

async function test4LogOut() {
    const { driver, loginPage } = await setUp();
    try {
        await loginPage.login("standard_user", "secret_sauce");
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.logOut();
        assert.equal(await driver.getCurrentUrl(), "https://www.saucedemo.com/", "redirection to home page after LogOut is not happened")
        await driver.sleep(1000)

    } catch (error) {
        console.log("error = ", error);
    } finally {
        console.log("time to close the browser");
        await driver.quit();
    }
}

async function test5AddToCart() {
    const { driver, loginPage } = await setUp();
    try {
        await loginPage.login("standard_user", "secret_sauce");
        const inventoryPage = new InventoryPage(driver);
        await inventoryPage.addOneItemToCart();

        assert.strictEqual(await inventoryPage.isCartEmpty(), false, "Cart is empty and the product is not added to cart")
    } catch (error) {
        console.log("error is - ", error);
    } finally {
        await driver.quit();
    }

}


(async () => {
    await successfulLoginTest();
    await unSuccessfulLoginTest();
    await presenceOfPLP();
    await PDLcontainsNameAndPrice();
    await test4LogOut();
    test5AddToCart()
})();