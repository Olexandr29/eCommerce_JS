const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const Logger = require("../utils/logger");
const { step } = require("allure-js-commons");
const DataHelper = require("../utils/dataHelper");

class InventoryPage extends BasePage {
    constructor(driver) {
        super(driver);
   
        this.locators = {
            logo: By.css("div[class='app_logo']"),
            header: By.css("div[data-test*='header']"),
            inventoryList: By.css(".inventory_list"),
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
            removeBtn: By.css("button[data-test^='remove']"),
            addToCartBtnById: function (productId) {
                return By.id(`add-to-cart-${productId}`);
            }
        }
    }

    async getInventoryHeader() {
        const actualInventoryHeader = await this.waitAndGetText(this.locators.inventTitle);
        // console.log("actualInventoryHeader =", actualInventoryHeader);
        return  actualInventoryHeader;

    }

    async hasMultipleProducts() {
        return await this.logStep("Verify that multiple products are displayed on Inventory page", async () => {
        let webElementsProduct = await this.findElements(this.locators.products);
        // console.log("typeof webElementsProduct =", typeof webElementsProduct);
        // console.log("webElementsProduct.length =", webElementsProduct.length)
        return webElementsProduct.length > 1;
        });
    }

    async allProductsHaveNameAndPrice() {
        return await this.logStep("Verify that Inventory page contain pruoducts with name and price", async () => {
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
        });
    }

    async logOut() {
        return await this.logStep("Logout", async () => {
        await this.safeClick(this.locators.burgerMenu);
        await this.safeClick(this.locators.logOutBtn);
        });
    }

    async addProductToCartById(productId) {
        return await this.logStep(`Add product to cart: ${productId}`, async () => {
        const button = await this.findElement(
            this.locators.addToCartBtnById(productId)
        );
        await button.click();
         });
    }

     async sortByPriceAsc() {
        return await this.logStep("Sort by Price from Low to High", async () => {
        await this.safeClick(this.locators.sortContainer);
        await this.safeClick(this.locators.optionPriceAsc);
        await this.driver.sleep(500);
        return true;
        });
    }

    async sortByNameDesc() {
        return await this.logStep("Sort by Name from Z to A", async () => {
        await this.safeClick(this.locators.sortContainer);
        await this.safeClick(this.locators.optionNameDesc);
        await this.driver.sleep(500);
        return true;
        });
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
        return await this.logStep("Open Product Details Page (PDP)", async () => {
        const namesEl = await this.driver.findElements(this.locators.names);
        await namesEl[0].click();
        const currentUrl = await this.getCurrentUrl();
        return currentUrl;
        });
    }

    async addProductsToCart(products) {
        return await this.logStep(`Add ${products.length} products to cart`, async () => {
        for(const product of products) {
            await this.addProductToCartById(product.id);
        }
        });
        }

    async areLogoAndHeaderVisible() {
        const logo = await this.waitForVisible(this.locators.logo);
        const header = await this.waitForVisible(this.locators.header);
        return (await logo.isDisplayed() ) && (await header.isDisplayed() );
    }

    async isLayoutCorrect() {
        const logo = await this.waitForVisible(this.locators.logo);
        const header = await this.waitForVisible(this.locators.header);
        const inventoryList = await this.waitForVisible(this.locators.inventoryList);
        const cartIcon = await this.waitForVisible(this.common.cartIcon);

        // console.log(
        //     `await logo.isDisplayed(),  ${await logo.isDisplayed()},
        //     await header.isDisplayed(), ${await header.isDisplayed() },
        //     await inventoryList.isDisplayed(), ${await inventoryList.isDisplayed() },
        //     await cartIcon.isDisplayed(), ${await cartIcon.isDisplayed() }`
        // );

        return (
            await logo.isDisplayed() &&
            await header.isDisplayed() &&
            await inventoryList.isDisplayed() &&
            await cartIcon.isDisplayed()
        );
    }


    async clickAddToCart() {
        await this.safeClick(this.locators.addToCartBtns);
    }

    async clickRemove() {
        await this.safeClick(this.locators.removeBtn);
    }

    async getActionButtonText() {
        if (await this.safeFindElement(this.locators.removeBtn, 1000)) {
            return await (await this.findElement(this.locators.removeBtn)).getText();
        }
        if (await this.safeFindElement(this.locators.addToCartBtns, 1000)) {
            return await (await this.findElement(this.locators.addToCartBtns)).getText();
        }
        throw new Error("No action button (Add to cart / Remove) found on Inventory page");
    }

    
}

module.exports = InventoryPage;