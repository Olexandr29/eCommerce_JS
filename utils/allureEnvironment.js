const fs = require("fs");
const path = require("path");

function writeAllureEnvironment() {
    const resultsDir = process.env.ALLURE_RESULTS_DIR || "allure-results";

    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true });
    }

    const environmentFile = path.join(resultsDir, "environment.properties");

    const execution = process.env.CI ? "CI" : "Local";
    const browser = process.env.BROWSER || "Chrome";
    const baseUrl = process.env.BASE_URL || "https://www.saucedemo.com";

    const content = [
        `execution=${execution}`,
        `browser=${browser}`,
        `baseUrl=${baseUrl}`
    ].join("\n");

    fs.writeFileSync(environmentFile, content);
}

module.exports = { writeAllureEnvironment };