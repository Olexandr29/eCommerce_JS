const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const Logger = require("../utils/logger");

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
            sortContainer: By.css("select[data-test='product-sort-container']"),
            optionNameAsc: By.css("select[data-test='product-sort-container'] option[value='az']"),
            optionNameDesc: By.css("select[data-test='product-sort-container'] option[value='za']"),
            optionPriceAsc: By.css("select[data-test='product-sort-container'] option[value='lohi']"),
            optionPriceDesc: By.css("select[data-test='product-sort-container'] option[value='hilo']"),
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
        Logger.info("Logout");
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

    // async sortProducts() {
    // const select = await this.safeClick(this.locators.sortContainer);
    // const option = await select.safeClick(this.locators.optionNameA_Z);
    // }

     async sortByPriceAsc() {
        Logger.info("Sorting: Price low → high");
        await this.safeClick(this.locators.sortContainer);
        await this.safeClick(this.locators.optionPriceAsc);
        await this.driver.sleep(500);
        return true;
    }

    async getProductPrices() {
        const priceElements = await this.driver.findElements(By.css(".inventory_item_price"));
        const prices = [];
        for (const el of priceElements) {
            const text = await el.getText(); // "$29.99"
            prices.push(parseFloat(text.replace("$", "")));
        }
        return prices;
    }

    async isNumbersAsc(list) {
        const sorted = [...list].sort((a, b) => a - b);
        return JSON.stringify(list) === JSON.stringify(sorted);
    }


}

module.exports = InventoryPage;