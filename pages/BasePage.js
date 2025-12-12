const { By, until } = require("selenium-webdriver");
const Logger = require("../utils/logger");
// const { step } = require("allure-js-commons");
const { allure } = require("allure-mocha/runtime");

class BasePage {
    constructor(driver) {
        this.driver = driver;

        this.common = {
            cartBadge: By.css("[data-test='shopping-cart-badge']"),
            cartIcon: By.css('[data-test="shopping-cart-link"]'),
            cancelBtn: By.css("button[data-test='cancel']"),

        }
    }

    async logStep(name, body) {
        Logger.info(name);
        // return await step(name, async () => {
        return await allure.step(name, async () => {
            return await body()
    });
    }

    async open(url) {
        return await this.logStep(`Opening URL: ${url}`, async () => {
        return await this.driver.get(url);
        });
    }

    async findElement(locator) {
        return await this.logStep(`findElement: ${locator}`, async () => {
        return await this.driver.findElement(locator);
        })
    }

    async findElements(locator) {
        return await this.logStep(`Find elements: ${locator}`, async () => {
        return await this.driver.findElements(locator);
        })
    }

    async safeFindElement(locator, timeout = 5000) {
        return await this.logStep(`Safe find element: ${locator}`, async ()=> {      
        try {
            await this.driver.wait(until.elementLocated(locator), timeout);
            return await this.driver.findElement(locator);
        } catch (err) {
            Logger.warning(`Element NOT FOUND: ${locator}`);
            return null;
        }
        });
    }

    async click(locator) {
        return await this.logStep(`Click element ${locator}`, async ()=> {     
        const element = await this.findElement(locator);
        // if (!element) {
        //     Logger.warning(`Click aborted. Missing element: ${locator}`);
        //     return;
        // }
        await element.click();
        });
    }

    async type(locator, text) {
        return await this.logStep(`Type into element: ${locator}`, async ()=> {
        const element = await this.waitForVisible(locator);
        await element.clear();
        await element.sendKeys(text);
        });
    }
    
    async waitForLocated(locator, timeout = 5000) {
        return await this.logStep(`Wait for element located: ${locator}`, async () => {
        return await this.driver.wait(until.elementLocated(locator), timeout);
        });
    }

    async waitForVisible(locator, timeout = 5000) {
        return await this.logStep(`Waiting for visible: ${locator}`, async () => {
        const element = await this.driver.wait(until.elementLocated(locator), timeout);
        await this.driver.wait(until.elementIsVisible(element), timeout);
        return element;
        });
    }

    async waitForClickable(locator, timeout = 5000) {
        return await this.logStep(`Waiting for clickable: ${locator}`, async () => {
        const element = await this.waitForVisible(locator, timeout);
        await this.driver.wait(until.elementIsEnabled(element), timeout);
        return element;
        });
    }

    async waitAndGetText(locator, timeout = 5000) {
        return await this.logStep(`Getting text from: ${locator}`, async () => {
        try {
            let actText = "";
            const element = await this.waitForVisible(locator, timeout);
            actText = await element.getText();
            return actText;
        } catch (err) {
            Logger.warning(`Cannot get TEXT - element missing or invisible: ${locator}`);
            return null;
        }
        });
    }

    async scrollIntoView(locator) {
        return await this.logStep(`Scrolling into view: ${locator}`, async ()=> {
        const element = await this.findElement(locator);
        return await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
        });
    }

    async safeClick(locator) {
        return await this.logStep(`Safe clicking: ${locator}`, async () => {
        await this.scrollIntoView(locator);
        const element = await this.waitForClickable(locator);
        await element.click();
        });
    }

    async getCurrentUrl() {
        return await this.logStep("Get current URL", async () => {
        return this.driver.getCurrentUrl();
        }); 
    }

    // async getCurrentUrl() {
    //     console.log("CurrentUrl is ", await this.driver.getCurrentUrl());
    //     return this.driver.getCurrentUrl();
    // }

    async openCart() {
        Logger.info("Opening cart");
        return this.safeClick(this.common.cartIcon);
    }

    async navigateToOtherPage() {
        Logger.info("Navigaition for other page");
        this.safeClick(locator);
        return this.getCurrentUrl();
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

    async getCartBadgeNum() {
        return await this.logStep("Getcart badge", async () => {
        const cartBadgeEl = await this.findElement(this.common.cartBadge);
        const cartBadgeText = await cartBadgeEl.getText();
        const cartBadgeNum = parseInt(cartBadgeText, 10)
        return await cartBadgeNum;
        });
    }


}

module.exports = BasePage;