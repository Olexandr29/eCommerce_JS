const { By } = require("selenium-webdriver");

class InventoryPage {
    constructor(driver) {
        this.driver = driver;
    }

    get burgerMenuEl() { return this.driver.findElement(By.id("react-burger-menu-btn")) }
    get logOutBtnEl() { return this.driver.findElement(By.id("logout_sidebar_link")) }
    get addToCartBtnEl_s() { return this.driver.findElements(By.xpath("//button[text()='Add to cart']")) }
    get cartBadgeEl() { return this.driver.findElement(By.className("shopping_cart_badge")) }
    get inventTitleEl() { return this.driver.findElement(By.className("title")) }
    get productEl_s() { return this.driver.findElements(By.className("inventory_item")) }
    nameEl = By.className("inventory_item_name ")
    priceEl = By.className("inventory_item_price")

    async getInventoryHeader() {
        let actualInventoryHeader = await this.inventTitleEl.getText();
        return actualInventoryHeader;
    }

    async plpContainsMoreThan1Item() {
        let products = await this.productEl_s;
        // console.log("typeof products =", typeof products);
        // console.log("products.length =", products.length)
        return products.length > 1;
    }

    async productContainsNameAndPrice() {
        let isAllProdContainsN_P;
        let productsArr = await this.productEl_s;
        for (let i = 0; i < productsArr.length; i++) {
            let name = await productsArr[i].findElement(this.nameEl).getText()
            let price = await productsArr[i].findElement(this.priceEl).getText()
            // console.log(`productsArr${i + 1} has the name ${name} and price ${price}`)
            if (!name || !price) {
                isAllProdContainsN_P = false;
            } else {
                isAllProdContainsN_P = true;
            }
        }
        // console.log("isAllProdContainsN_P = ", isAllProdContainsN_P)
        return isAllProdContainsN_P;
    }

    async logOut() {
        await this.burgerMenuEl.click();
        await this.logOutBtnEl.click();

    }

    async addOneItemToCart() {
        let itemsArray = await this.addToCartBtnEl_s
        await itemsArray[0].click()
    }

    async isCartEmpty() {
        let empty;
        let textEmaunt = await this.cartBadgeEl.getText();
        if (!textEmaunt) {
            empty = true;
        } else {
            empty = false;

        }
        // console.log("empty =", empty)
        // console.log("textEmaunt =", textEmaunt)
        return empty;
    }

}

module.exports = InventoryPage;