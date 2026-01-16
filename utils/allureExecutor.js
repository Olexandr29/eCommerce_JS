const fs = require("fs");
const path = require("path");

function writeAllureExecutor() {
    const resultDir = process.env.ALLURE_RESULTS_DIR || "allure-results";

    if(!fs.existsSync(resultDir)) {
        fs.mkdirSync(resultDir, {recursive: true});
    }

    const executorFile = path.join(resultDir, "executor.json");

    let executor;

    if (process.env.CI) {
        executor = {

            name: "GitHub Actions",
            type: "github",
            buildName: `Run #${process.env.GITHUB_RUN_NUMBER}`,
            buildUrl: `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
            reportName: "Allure Report"
        };
    } else {
        executor = {
            name: "Olexandr",
            type: "local",
            buildName: "Local run",
            reportName: "Allure Report (Local)"
        };
    }
    fs.writeFileSync(executorFile, JSON.stringify(executor, null, 2));
}

module.exports = {writeAllureExecutor};