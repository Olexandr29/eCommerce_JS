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
        errText: By.css("h3[data-test='error']"),
    }
    }

    async fillCheckout1(firstName, lastName, zip) {
        return await this.logStep("Fill user info on the Checkout step 1", async () => {
        await this.type(this.locators.firstnameField, firstName);
        await this.type(this.locators.lastnameField, lastName);
        await this.type(this.locators.zipField, zip);
        await this.safeClick(this.locators.continueBtn);
        });
    }

    async fillCheckout1WithEmptyFields() {
        await this.safeClick(this.locators.continueBtn);
        const errorText = await this.waitAndGetText(this.locators.errText);
        return await this.logStep(`Fill Checkout1 with empty fields and get ${errorText}`, async () => {
            return errorText;
        });
    }

}
module.exports = CheckoutPage1;