class Logger {

    static info(message) {
        console.log(`[INFO] ${message}`);
    }
   
    static warning(message) {
        console.warn(`[WARNING] ${message}`);
    }

    static error(message) {
        console.error(`[ERROR] ${message}`);
    }

    static debug(message) {
        if (process.env.DEBUG === "true") {
            console.log(`[DEBUG] ${message}`);
        }
    }
}

module.exports = Logger;
