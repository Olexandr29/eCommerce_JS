const {By} = require("selenium-webdriver");
const Logger = require("../utils/logger");
const BasePage = require("./BasePage");

class CheckoutPage2 extends BasePage {
    constructor(driver) {
        super(driver);

        this.locators = {
            finishBtn: By.css("button[data-test='finish']"),
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

}
module.exports = CheckoutPage2;