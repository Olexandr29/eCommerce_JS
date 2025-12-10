const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const Logger = require("../utils/logger");

class CartPage extends BasePage {
    constructor(driver) {
        super(driver);

        this.locators = {
            productContainer: By.css("[data-test='inventory-item']"),
            removeBtn: By.css("button[data-test^='remove']"),
            checkoutBtn: By.css("button[data-test='checkout']"),
        }
    }

      async cartHasProduct() {
        const webElementsProduct = await this.findElements(this.locators.productContainer);
        // console.log("typeof webElementsProduct =", typeof webElementsProduct);
        console.log("webElementsProduct.length =", webElementsProduct.length);
        return webElementsProduct.length >= 1;
    }

    async removeProduct() {
        Logger.info("Remove product");
        await this.safeClick(this.locators.removeBtn);
    }

    async openCheckout() {
        Logger.info("Open/navigate to checkout page");
        await this.safeClick(this.locators.checkoutBtn);
    } 

    async remove1OfItemsFromCart() {
        const removeBtns = await this.findElements(this.locators.removeBtn);
        for (let i = 0; i < removeBtns.length; i++) {
            removeBtns[i].click();
            break;
        }
    }


        }

module.exports = CartPage;