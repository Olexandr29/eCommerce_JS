const products = require("../fixtures/product.json");

class DataHelper {

    static getRandomProduct() {
        const index = Math.floor(Math.random() * products.all.length);
        return products.all[index];
    }

    static getRandomProducts(count) {
        const result = [];

        for (let i = 0; result.length < count; i++) {
            const index = Math.floor(Math.random() * products.all.length);
            const product = products.all[index];

            if (!result.includes(product)) {
                result.push(product);
            }
        }

        return result;
    }

    static getAllProducts() {
        return products.all;
    }


}

module.exports = DataHelper;