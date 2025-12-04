const { By, until } = require("selenium-webdriver");
const Logger = require("../utils/logger");

class BasePage {
    constructor(driver) {
        this.driver = driver;
    
    this.common = {
        cartBadge: By.css("[data-test='shopping-cart-badge']"),
        cartIcon: By.css('[data-test="shopping-cart-link"]'),
    }
    }

    async open(url) {
        Logger.info(`Opening URL: ${url}`);
        await this.driver.get(url);
    }

    async findElement(locator) {
        Logger.debug(`findElement: ${locator}`);
        return await this.driver.findElement(locator);
    }

    async findElements(locator) {
        return await this.driver.findElements(locator);
    }

    async safeFindElement(locator, timeout = 5000) {
    try {
        await this.driver.wait(until.elementLocated(locator), timeout);
        return await this.driver.findElement(locator);
    } catch (err) {
        Logger.warning(`Element NOT FOUND: ${locator}`);
        return null;
    }
    }
    
    async click(locator) {
        const element = await this.findElement(locator);
        if (!element) {
            Logger.warning(`Click aborted. Missing element: ${locator}`);
            return;
        }
        await element.click();
    }

    async type(locator, text) {
        const element = await this.waitForVisible(locator);
        await element.clear();
        await element.sendKeys(text);
    }

    async waitForLocated(locator, timeout = 5000) {
        return await this.driver.wait(until.elementLocated(locator), timeout);
    }

    async waitForVisible(locator, timeout = 5000) {
        Logger.debug(`Waiting for visible: ${locator}`);
        const element = await this.driver.wait(until.elementLocated(locator), timeout);
        await this.driver.wait(until.elementIsVisible(element), timeout);
        return element;
    }

    async waitForClickable(locator, timeout = 5000) {
        Logger.info(`Waiting for clickable: ${locator}`);
        const element = await this.waitForVisible(locator, timeout);
        await this.driver.wait(until.elementIsEnabled(element), timeout);
        return element;
    }

    async waitAndGetText(locator, timeout = 5000) {
        Logger.info(`Getting text from: ${locator}`);
        try {
            let actText = "";
            const element = await this.waitForVisible(locator, timeout);
            actText = await element.getText();
            return actText;
        } catch (err) {
            Logger.warning(`Cannot get TEXT - element missing or invisible: ${locator}`);
            return null;
        }
    }

    async scrollIntoView(locator) {
        Logger.info(`Scrolling into view: ${locator}`);
        const element = await this.findElement(locator);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    async safeClick(locator) {
        Logger.info(`Safe clicking: ${locator}`);
        await this.scrollIntoView(locator);
        const element = await this.waitForClickable(locator);
        await element.click();
    }

    async getCurrentUrl() {
        return this.driver.getCurrentUrl();
    }

    async openCart() {
        Logger.info("Opening cart");
        return this.safeClick(this.common.cartIcon);
        }

        async isCartEmpty() {
        let empty;
        const cartBadgeEl = await this.findElement(this.common.cartBadge);
        const cartBadgeText = await cartBadgeEl.getText();
        if (!cartBadgeText) {
            empty = true;
        } else {
            empty = false;
        }
        // console.log("empty =", empty)
        // console.log("CartTextAmount =", cartBadgeText)
        return empty;
    }

    async isCartBadgePresent(timeout = 2000) {
    Logger.info("Checking if cart badge is present");
    const element = await this.safeFindElement(this.common.cartBadge, timeout);
    if (!element) {
        Logger.info("Cart badge is NOT present");
        return false;
    }
    try {
        const isDisplayed = await element.isDisplayed();
        Logger.info("Cart badge is present");
        return isDisplayed;
    } catch (err) {
        Logger.warning("Cart badge element disappeared after locating");
        return false;
    }
}


}

module.exports = BasePage;