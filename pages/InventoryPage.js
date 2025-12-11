const { By } = require("selenium-webdriver");
const BasePage = require("./renameBasePage");
const Logger = require("../utils/logger");

class InventoryPage extends BasePage {
    constructor(driver) {
        super(driver);
   
        this.locators = {
            inventTitle: By.css("span[data-test='title']"),
            burgerMenu: By.id("react-burger-menu-btn"),
            logOutBtn: By.id("logout_sidebar_link"),
            products: By.css("div[data-test='inventory-item']"),
            names: By.css("div[data-test='inventory-item-name']"),
            prices: By.css("div[data-test='inventory-item-price']"),
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

     async sortByPriceAsc() {
        Logger.info("Sorting: Price low → high");
        await this.safeClick(this.locators.sortContainer);
        await this.safeClick(this.locators.optionPriceAsc);
        await this.driver.sleep(500);
        return true;
    }

    async sortByNameDesc() {
        Logger.info("Sorting: Name Z → A ");
        await this.safeClick(this.locators.sortContainer);
        await this.safeClick(this.locators.optionNameDesc);
        await this.driver.sleep(500);
        return true;
    }

    async getProductPrices() {
        const priceElements = await this.driver.findElements(this.locators.prices);
        const prices = [];
        for (const el of priceElements) {
            const text = await el.getText();
            prices.push(parseFloat(text.replace("$", "")));
        }
        return prices;
    }

    async getProductNames() {
        const nameElements = await this.driver.findElements(this.locators.names);
        const namesArr = [];
        for (const el of nameElements) {
            const text = await el.getText();
            namesArr.push(text);
        }
        return namesArr;
    }

    async isNumbersAsc(list) {
        const sorted = [...list].sort((a, b) => a - b);
        return JSON.stringify(list) === JSON.stringify(sorted);
    }

    async isNamesDesc(list) {
        const sorted = [...list].sort((a, b) => b - a);
        return JSON.stringify(list) === JSON.stringify(sorted);
    }

    async openProductDetailsPage() {
        const namesEl = await this.driver.findElements(this.locators.names);
        await namesEl[0].click();
        const currentUrl = await this.getCurrentUrl();
        return currentUrl;
    }

    async add3ItemsToCart() {
        const itemsArray = await this.findElements(this.locators.addToCartBtns);
        for(let i = 0; i < 3; i++) {
            await itemsArray[i].click();
        }
        }

   

}

module.exports = InventoryPage;