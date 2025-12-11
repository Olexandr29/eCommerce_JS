const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const Logger = require("../utils/logger");
const TestData = require('../config/testData');

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
  
    this.locators = {
    username: By.id("user-name"),
    password: By.id("password"),
    loginBtn: By.id("login-button"),
    errLoginMsg: By.css("[data-test='error']"),
    }
  }

   async login(username, password) {
    await this.open(TestData.baseUrl);
    await this.type(this.locators.username, username);
    await this.type(this.locators.password, password);
    await this.click(this.locators.loginBtn);
  }

  async loginWithInvalidCredentials(username, password) {
    Logger.info("Attempt login with invalid credentials");
    await this.login(username, password);
    let errorMessage = await this.waitAndGetText(this.locators.errLoginMsg);
    return errorMessage;
  }

  async attemptTologinWithEmptyFields() {
    Logger.info("Attempt login with empty fields");
    await this.open(TestData.baseUrl);
    await this.safeClick(this.locators.loginBtn);
    const emptyFieldsErrMsg = await this.waitAndGetText(this.locators.errLoginMsg);
    return emptyFieldsErrMsg;
  }

}

module.exports = LoginPage;