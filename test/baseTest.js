const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { allure } = require("allure-mocha/runtime");
const { writeAllureEnvironment } = require("../utils/allureEnvironment");
const testData = require("../config/testData");

class BaseTest {
    driver = null;

    async setup() {
        writeAllureEnvironment();

        let options = new chrome.Options();
        options.addArguments("--incognito");

        if (process.env.HEADLESS === "true") {
            options.addArguments("--headless=new");
            options.addArguments("--disable-gpu");
            options.addArguments("--window-size=1920,1080");
        }

        this.driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
    }

    async tearDown(test) {
        if (!this.driver) {
            return;
        }
        if (test.state === "failed") {
            const img = await this.driver.takeScreenshot();
            // await 
            allure.attachment(
            "Failure screenshot",
            Buffer.from(img, "base64"),
            "image/png"
            );
        }

    await this.driver.quit();
    this.driver = null;
    }

}

module.exports = BaseTest;