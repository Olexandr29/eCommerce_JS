const {By, Builder} = require("selenium-webdriver");
const BasePage = require("./BasePage");
const InventoryPage = require("../pages/InventoryPage");

class ProductDetailsPage extends BasePage {
    constructor(driver) {
        super(driver);

        this.locators = {
            image: By.css("img[class='inventory_details_img']"),
            name: By.css("div[data-test='inventory-item-name']"),
            description: By.css("div[data-test='inventory-item-desc']"),
            price: By.css("div[data-test='inventory-item-price']"),
            addToCartBtn: By.css("button[data-test='add-to-cart']"),

        }
    }

    async isImagePresence() {
        const imageEl = await this.waitForVisible(this.locators.image);
        return await imageEl.isDisplayed();
    }

     async isNamePresence() {
        const nameEl = await this.waitForVisible(this.locators.name);
        return await nameEl.isDisplayed();
    }

    async isDescriptionPresence() {
        const descriptionEl = await this.waitForVisible(this.locators.description);
        return await descriptionEl.isDisplayed();
    }

    async isPricePresence() {
        const priceEl = await this.waitForVisible(this.locators.price);
        return await priceEl.isDisplayed();
    }

    async verifyProducDetails() {
        return await this.logStep("Verify that PDP display full product info", async () => {
            return (
                await this.isImagePresence() &&
                await this.isNamePresence() &&
                await this.isDescriptionPresence() &&
                await this.isPricePresence()
            );
        });
    }
    

}

module.exports = ProductDetailsPage;