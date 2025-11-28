const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class InventoryPage extends BasePage {
    constructor(driver) {
        super(driver);
   
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
        const actualInventoryHeader = await this.waitAndGetText(this.locators.inventTitle);
        // console.log("actualInventoryHeader =", actualInventoryHeader);
        return  actualInventoryHeader;

    }

    async hasMultipleProducts() {
        let webElementsProduct = await this.findElements(this.locators.products);
        // console.log("typeof webElementsProduct =", typeof webElementsProduct);
        // console.log("webElementsProduct.length =", webElementsProduct.length)
        return webElementsProduct.length > 1;
    }

    async allProductsHaveNameAndPrice() {
        let isAllProdContainsN_P;
        let productsArr = await this.findElements(this.locators.products);
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
        await this.safeClick(this.locators.burgerMenu);
        await this.safeClick(this.locators.logOutBtn);
    }

    async addOneItemToCart() {
        let itemsArray = await this.findElements(this.locators.addToCartBtns);
        // console.log("itemsArray.length =", itemsArray.length)
        if (itemsArray.length === 0) {
            throw new Error("The 'Add to cart' button isn't found on the page")
        }
        await itemsArray[0].click()
    }

    async isCartEmpty() {
        let empty;
        let cartBadgeEl = await this.findElement(this.locators.cartBadge);
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