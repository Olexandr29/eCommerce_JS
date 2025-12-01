class Logger {
    static start(testCaseId) {
        console.log(`[${testCaseId}] STARTED`);
    }

    static end(testCaseId) {
        console.log(`[${testCaseId}] COMPLETED`);
    }

    static checkpoint(message) {
        console.log(`[CHECKPOINT] ${message}`);
    }

    static warning(message) {
        console.warn(`[WARNING] ${message}`);
    }
}

module.exports = Logger;
