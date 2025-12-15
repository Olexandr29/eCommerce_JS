const {By, Builder} = require("selenium-webdriver");
const BasePage = require("../pages/BasePage");


class ConfirmationPage extends BasePage {
    constructor(driver) {
        super(driver)


        this.locators = {
            confirmText: By.css("h2[data-test='complete-header']"),
        }
    }

    async getConfirmationText() {
        return await this.waitAndGetText(this.locators.confirmText);
    }
}

module.exports = ConfirmationPage;