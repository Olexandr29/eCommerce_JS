const { By, until } = require("selenium-webdriver");
const Logger = require("../utils/logger");
// const { step } = require("allure-js-commons");
let step;
if(process.env.ALLURE === "true") {
    ({step} = require("allure-js-commons"));
}

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

        if(!step) {
            return await body();
        }

        return await step(name, async () => {
            return await body();
        });
    }

    //  async logStep(name, body) {
    //     Logger.info(name);

    //     const step = global.step;
    //     if (step && typeof step === "function") {
    //         return await step(name, async () => {
    //             try {
    //                 const result = await body();
    //                 return result;
    //             } catch (err) {
    //                 throw err;
    //             }
    //         });
    //     }

    //     return await body();
    // }


    //  async logStep(name, body) {
    //     Logger.info(name);
    //     return await step(name, async () => {
    //         return await body();
    //     });
    // }
    

    async open(url) {
        // return await this.logStep(`Open page: ${url}`, async() => {
        await this.driver.get(url);
        //    });
    }

    async findElement(locator) {
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
            Logger.debug(`Element NOT FOUND: ${locator}`);
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
        try {
        const element = await this.driver.wait(until.elementLocated(locator), timeout);
        await this.driver.wait(until.elementIsVisible(element), timeout);
        return element;
        } catch (err) {
            Logger.error(`Element with locator ${locator} is not visible`);
        }
    }

    async waitForClickable(locator, timeout = 5000) {
        const element = await this.waitForVisible(locator, timeout);
        await this.driver.wait(until.elementIsEnabled(element), timeout);
        return element;
    }

    async waitAndGetText(locator, timeout = 5000) {
        try {
            let actText = "";
            const element = await this.waitForVisible(locator, timeout);
            actText = await element.getText();
            return actText;
        } catch (err) {
            Logger.error(`Failed to get text located on the locator ${locator}`);
            return err;
        }
    }

    async scrollIntoView(locator) {
        const element = await this.findElement(locator);
        return await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    async safeClick(locator) {
        try{
        await this.scrollIntoView(locator);
        const element = await this.waitForClickable(locator);
        await element.click(); 
         } catch(err) {
            Logger.error(`Click the ${locator} failed`);
            throw err;
         }
    }

    async getCurrentUrl() {
        console.log("CurrentUrl is ", await this.driver.getCurrentUrl());
        return this.driver.getCurrentUrl();
    }

    async openCart() {
        return await this.logStep("Open cart", async () => {
        return this.safeClick(this.common.cartIcon);
        });
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
        return empty;
    }

    async isCartBadgePresent(timeout = 2000) {
        const element = await this.safeFindElement(this.common.cartBadge, timeout);
        if (!element) {
            Logger.debug("Cart badge is NOT present");
            return false;
        }
        try {
            return await element.isDisplayed();
        } catch (err) {
            Logger.warning("Cart badge element disappeared after locating");
            return false;
        }
    }

    async getCartBadgeNum() {
        const cartBadgeEl = await this.findElement(this.common.cartBadge);
        const cartBadgeText = await cartBadgeEl.getText();
        const cartBadgeNum = parseInt(cartBadgeText, 10)
        return await cartBadgeNum;
    }

    async goBackAndWait(expectedUrlPart, timeout = 5000) {
        return await this.logStep("Browser back", async () => {
            await this.driver.navigate().back();
            await this.driver.wait(until.urlContains(expectedUrlPart), timeout);
            return await this.driver.getCurrentUrl();
        });
    }


}

module.exports = BasePage;