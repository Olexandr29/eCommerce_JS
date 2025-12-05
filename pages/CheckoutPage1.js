const BasePage = require("./BasePage");
const {By} = require("selenium-webdriver");
const Logger = require("../utils/logger");

class CheckoutPage1 extends BasePage {
    constructor(driver) {
    super(driver)

    this.locators = {
        firstnameField: By.css("input[data-test='firstName']"),
        lastnameField: By.css("input[data-test='lastName']"),
        zipField: By.css("input[data-test='postalCode']"),
        continueBtn: By.css("input[data-test='continue']"),
    }
    }

    async fillCheckout1(firstName, lastName, zip) {
        Logger.info("Fill user info on the Checkout1");
        await this.type(this.locators.firstnameField, firstName);
        await this.type(this.locators.lastnameField, lastName);
        await this.type(this.locators.zipField, zip);
        await this.safeClick(this.locators.continueBtn);
    }

}
module.exports = CheckoutPage1;