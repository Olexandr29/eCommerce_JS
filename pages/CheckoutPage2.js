const {By} = require("selenium-webdriver");
const Logger = require("../utils/logger");
const BasePage = require("./BasePage");

class CheckoutPage2 extends BasePage {
    constructor(driver) {
        super(driver);

        this.locators = {
            finishBtn: By.css("button[data-test='finish']"),
            prices: By.css("div[data-test='inventory-item-price']"),
            subTotal: By.css("div[data-test='subtotal-label']"),
            tax: By.css("div[data-test='tax-label']"),
            total: By.css("div[data-test='total-label']"),
        }
    }

    async navigateBackToInventory() {
        return await this.logStep("Navigate back to Inventory page", async () => {
        await this.safeClick(this.common.cancelBtn);
        return this.getCurrentUrl();
        });
    }

    async openConfirmationPage() {
        return await this.logStep("Open confirmation page", async () => {
        await this.safeClick(this.locators.finishBtn);
        return this.getCurrentUrl();
    });
    }

     async getPricesSum() {
         return await this.logStep("get prices sum", async () => {
        const priceArr = await this.findElements(this.locators.prices);
        let sum = 0;
        for (let i=0; i<priceArr.length; i++) {
            let text = await priceArr[i].getText();
            let digit = parseFloat(text.replace("$", ""));
            sum += digit;
        }
        return sum;
        });
    }

    async getSubtotalPrices() {
        const subtotalText = await this.waitAndGetText(this.locators.subTotal);
        const subtotalDigits = parseFloat(subtotalText.replace("Item total: $", ""));
        return subtotalDigits;
    }

    async getTax() {
        const taxText = await this.waitAndGetText(this.locators.tax);
        const taxDigits = parseFloat(taxText.replace("Tax: $", ""));
        return taxDigits;
    }

    async getTotal() {
        const totalText = await this.waitAndGetText(this.locators.total);
        const totalDigits = parseFloat(totalText.replace("Total: $", ""));
        return totalDigits;
    }

    async getSumOfSubtotalAndTax() {
        const sumTotal = await this.getSubtotalPrices() +
        await this.getTax();
        return sumTotal;
    }





}


module.exports = CheckoutPage2;