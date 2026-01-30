const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { allure } = require("allure-mocha/runtime");
const { writeAllureEnvironment } = require("../utils/allureEnvironment");

class BaseTest {
    driver = null;

    static allureEnvWritten = false;

    async setup() {
        if (!BaseTest.allureEnvWritten) {
            writeAllureEnvironment();
            BaseTest.allureEnvWritten = true;
        }

        const options = new chrome.Options();

        options.addArguments(
            "--incognito",
            "--disable-dev-shm-usage",
            "--no-sandbox",
            "--disable-infobars",
            "--disable-extensions"
        );

        if (process.env.HEADLESS === "true") {
            options.addArguments(
                "--headless=new",
                "--disable-gpu",
                "--window-size=1920,1080"
            );
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

        try {
            if (test.state === "failed") {
                const img = await this.driver.takeScreenshot();
                allure.attachment(
                    "Failure screenshot",
                    Buffer.from(img, "base64"),
                    "image/png"
                );
            }
        } catch (e) {
            console.error("Screenshot failed:", e.message);
        }

        try {
            await Promise.race([
                this.driver.quit(),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("driver.quit timeout")), 11000)
                )
            ]);
        } catch (e) {
            console.error("driver.quit failed", e.message);
        } finally {
            this.driver = null;
        }
    }
}

module.exports = BaseTest;