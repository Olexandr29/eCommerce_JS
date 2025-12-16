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
        return webElementsProduct.length >= 1;
    }

    async removeProduct() {
        return await this.logStep("Remove product", async () => {
            await this.safeClick(this.locators.removeBtn);
        });
    }

    async openCheckout() {
        return await this.logStep("Open Checkout page", async () => {
            await this.safeClick(this.locators.checkoutBtn);
        });
    }

    async remove1OfItemsFromCart() {
        return await this.logStep("Remove 1 product from cart", async () => {
            const removeBtns = await this.findElements(this.locators.removeBtn);
            for (let i = 0; i < removeBtns.length; i++) {
                removeBtns[i].click();
                break;
            }
        });
    }


}

module.exports = CartPage;