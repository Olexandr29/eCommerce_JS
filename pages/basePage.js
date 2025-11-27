const { By, until } = require("selenium-webdriver");

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async open(url) {
        await this.driver.get(url);
    }

    async findElement(locator) {
        return await this.driver.findElement(locator);
    }

    async findElements(locator) {
        return await this.driver.findElements(locator);
    }
    
    async click(locator) {
        const element = await this.findElement(locator);
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
        const element = await this.driver.wait(until.elementLocated(locator), timeout);
        await this.driver.wait(until.elementIsVisible(element), timeout);
        return element;
    }

    async waitForClickable(locator, timeout = 5000) {
        const element = await this.waitForVisible(locator, timeout);
        await this.driver.wait(until.elementIsEnabled(element), timeout);
        return element;
    }

    async waitAndGetText(locator, timeout = 5000) {
        let actText = "";
        const element = await this.waitForVisible(locator, timeout);
        actText = await element.getText();
        return actText;
    }

    async scrollIntoView(locator) {
        const element = await this.findElement(locator);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    async safeCkick(locator) {
        await this.scrollIntoView(locator);
        const element = await this.waitForClickable(locator);
        await element.click();
    }
}

module.exports = BasePage;