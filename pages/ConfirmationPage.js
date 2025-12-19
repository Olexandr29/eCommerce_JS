const {By, Builder} = require("selenium-webdriver");
const BasePage = require("../pages/BasePage");
const Logger = require("../utils/logger");

class ConfirmationPage extends BasePage {
    constructor(driver) {
        super(driver)


        this.locators = {
            confirmText: By.css("h2[data-test='complete-header']"),
        }
    }

    async getConfirmationText() {
        return await this.logStep("Finish purchase and get confirmation text", async () => {
        return await this.waitAndGetText(this.locators.confirmText);
    });
    }

   

}
 
module.exports = ConfirmationPage;