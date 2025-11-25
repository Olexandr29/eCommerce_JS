const { By, until } = require("selenium-webdriver");

class InventoryPage {
    constructor(driver) {
        this.driver = driver;
   
        this.locators = {
            inventTitle: By.className("title"),
            burgerMenu: By.id("react-burger-menu-btn"),
            logOutBtn: By.id("logout_sidebar_link"),
            products: By.className("inventory_item"), 
            names: By.className("inventory_item_name "),
            prices: By.className("inventory_item_price"),
            addToCartBtns: By.xpath("//button[text()='Add to cart']"), 
            cartBadge: By.className("shopping_cart_badge")
        }
    }

    async getInventoryHeader() {
        let webElement = await this.driver.findElement(this.locators.inventTitle);
        let actualInventoryHeader = await webElement.getText();
        return actualInventoryHeader;
    }

    async hasMultipleProducts() {
        let webElementsProduct = await this.driver.findElements(this.locators.products)
        // console.log("typeof webElementsProduct =", typeof webElementsProduct);
        // console.log("webElementsProduct.length =", webElementsProduct.length)
        return webElementsProduct.length > 1;
    }

    async allProductsHaveNameAndPrice() {
        let isAllProdContainsN_P;
        let productsArr = await this.driver.findElements(this.locators.products);
        for (let i = 0; i < productsArr.length; i++) {
            let name = await productsArr[i].findElement(this.locators.names).getText()
            let price = await productsArr[i].findElement(this.locators.prices).getText()
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
        await this.driver.findElement(this.locators.burgerMenu).click();
        let logOutEl = await this.driver.wait(until.elementLocated(this.locators.logOutBtn), 5000, "Logout button not found");
        await this.driver.wait(until.elementIsVisible(logOutEl), 5000, "LogOut button not visible");
        await logOutEl.click();
    }

    async addOneItemToCart() {
        let itemsArray = await this.driver.findElements(this.locators.addToCartBtns);
        // console.log("itemsArray.length =", itemsArray.length)
        if (itemsArray.length === 0) {
            throw new Error("The 'Add to cart' button isn't found on the page")
        }
        await itemsArray[0].click()
    }

    async isCartEmpty() {
        let empty;
        let cartBadgeEl = await this.driver.findElement(this.locators.cartBadge);
        let cartBadgeText = await cartBadgeEl.getText();
        if (!cartBadgeText) {
            empty = true;
        } else {
            empty = false;

        }
        // console.log("empty =", empty)
        // console.log("CartTextAmount =", cartBadgeText)
        return empty;
    }

}

module.exports = InventoryPage;