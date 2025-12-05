const {By} = require("selenium-webdriver");
const Logger = require("../utils/logger");
const BasePage = require("./BasePage");

class CheckoutPage2 extends BasePage {
    constructor(driver) {
        super(driver);

        this.locators = {

        }
    }

    async navigateBackToInventory() {
        Logger.info("Navigate back to Inventory");
        await this.safeClick(this.common.cancelBtn);
        return this.getCurrentUrl();
    }
}
module.exports = CheckoutPage2;