const { By } = require("selenium-webdriver");

class InventoryPage {
    constructor(driver) {
        this.driver = driver;
        this.burgerMenuLocator = By.id("react-burger-menu-btn");
        this.AddtoCartBtnLocator = By.xpath("//button[text()='Add to cart']");
        this.CartBadgeLocator = By.className("shopping_cart_badge");
    }

    async getInventoryHeader() {
        let actualInventoryHeader = await this.driver.findElement(By.className("title")).getText();
        return actualInventoryHeader;
    }

    async plpContainsMoreThan1Item() {
        let products = await this.driver.findElements(By.className("inventory_item"));
        console.log("typeof products =", typeof products);
        console.log("products.length =", products.length)
        return products.length > 1;
    }


    async productContainsNameAndPrice() {
        await this.driver.sleep(3000)
        let isThereNameAndPrice = true;
        let products = await this.driver.findElements(By.className("inventory_item"));

        for (let i = 0; i < products.length; i++) {
            let Aproduct = products[i];

            let nameElements = await Aproduct.findElements(By.className("inventory_item_name "));
            let priceElements = await Aproduct.findElements(By.className("inventory_item_price"));

            let nameText = nameElements.length > 0 ? await nameElements[0].getText() : undefined;
            let priceText = priceElements.length > 0 ? await priceElements[0].getText() : undefined;

            console.log(`Product #${i + 1}: name is ${nameText} and price is ${priceText}`)

            if (nameText === undefined) {
                console.log("nameText = ", nameText);
                console.log(`the product ${Aproduct} doesn't contain 'name'`)
                isThereNameAndPrice = false;
            } else if (priceText === undefined) {
                console.log("priceText = ", priceText);
                console.log(`the product ${Aproduct} doesn't contain 'price'`)
                isThereNameAndPrice = false;
            }
            console.log("isThereNameAndPrice = ", isThereNameAndPrice)
        }
        return isThereNameAndPrice;
    }


    async logOut() {
        await this.driver.findElement(this.burgerMenuLocator).click();
        await this.driver.sleep(1000)
        await this.driver.findElement(By.id("logout_sidebar_link")).click();
                await this.driver.sleep(1000)

    }

    async addOneItemToCart() {
    let itemsArray = await this.driver.findElements(this.AddtoCartBtnLocator)
       await itemsArray[0].click()
}

    async isCartEmpty() {
        let empty;
    let textEmaunt = await this.driver.findElement(this.CartBadgeLocator).getText();
        if (!textEmaunt) {
            empty = true;
        } else {
            empty = false;

        }
        console.log("empty =", empty)
        console.log("textEmaunt =",textEmaunt)
        return empty;
    }


}

module.exports = InventoryPage;