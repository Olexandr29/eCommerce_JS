const { By, until } = require("selenium-webdriver");
const TestData = require('../config/testData');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  
    this.locators = {
    username: By.id("user-name"),
    password: By.id("password"),
    loginBtn: By.id("login-button"),
    errLoginMsg: By.xpath("//h3[@data-test='error']")
    }
  }

   async login(username, password) {
    await this.driver.get(TestData.baseUrl);
    await this.driver.wait(until.elementLocated(this.locators.username), 5000);
    await this.driver.findElement(this.locators.username).sendKeys(username);
    await this.driver.findElement(this.locators.password).sendKeys(password);
    await this.driver.findElement(this.locators.loginBtn).click();
  }

  async loginWithInvalidCredentials(username, password) {
    await this.login(username, password);
    await this.driver.wait(until.elementsLocated(this.locators.errLoginMsg), 5000);
    let errorMessage = await this.driver.findElement(this.locators.errLoginMsg).getText();
    return errorMessage;
  }
}

module.exports = LoginPage;