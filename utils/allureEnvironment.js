const fs = require("fs");
const path = require("path");
const os = require("os");

function writeAllureEnvironment() {
    const resultsDir = process.env.ALLURE_RESULTS_DIR || "allure-results";

    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true });
    }

    const environmentFile = path.join(resultsDir, "environment.properties");

    const execution = process.env.CI ? "CI" : "Local";
    const osPlatform = os.platform();
    const osRelease = os.release();
    const browser = process.env.BROWSER || "Chrome";

    const content = [
        `execution=${execution}`,
        `os=${osPlatform}`,
        `os_version=${osRelease}`,
        `browser=${browser}`
    ].join("\n");

    fs.writeFileSync(environmentFile, content);
}

module.exports = { writeAllureEnvironment };