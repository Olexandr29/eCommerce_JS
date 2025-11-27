const { By } = require("selenium-webdriver");
const BasePage = require("./basePage");
const TestData = require('../config/testData');

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
  
    this.locators = {
    username: By.id("user-name"),
    password: By.id("password"),
    loginBtn: By.id("login-button"),
    errLoginMsg: By.xpath("//h3[@data-test='error']")
    }
  }

   async login(username, password) {
    await this.open(TestData.baseUrl);
    await this.type(this.locators.username, username);
    await this.type(this.locators.password, password);
    await this.click(this.locators.loginBtn);
  }

  async loginWithInvalidCredentials(username, password) {
    await this.login(username, password);
    let errorMessage = await this.waitAndGetText(this.locators.errLoginMsg);
    return errorMessage;
  }

}

module.exports = LoginPage;