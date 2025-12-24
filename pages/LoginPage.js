const { By } = require("selenium-webdriver");
const BasePage = require("./BasePage");
const Logger = require("../utils/logger");
const TestData = require('../config/testData');
const { step } = require("allure-js-commons");

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
    // return await this.logStep("Perform login", async () => {
      await this.open(TestData.baseUrl);
      await this.type(this.locators.username, username);
      await this.type(this.locators.password, password);
      await this.click(this.locators.loginBtn);
    // });
  }

  async loginWithInvalidCredentials(username, password) {
    await this.login(username, password);
    return await this.logStep("Login with invalid credentials and get error", async () => {
      let errorMessage = await this.waitAndGetText(this.locators.errLoginMsg);
      // console.log("errorMessage=", errorMessage)
      return errorMessage;
    });
  }

  async attemptTologinWithEmptyFields() {
    return await this.logStep("Login with empty fields and get error", async () => {
      await this.open(TestData.baseUrl);
      await this.safeClick(this.locators.loginBtn);
      const emptyFieldsErrMsg = await this.waitAndGetText(this.locators.errLoginMsg);
      return emptyFieldsErrMsg;
    });
  }

  async attemptToLogin(username, password) {
    await this.login(username, password);
    const errorEl = await this.safeFindElement(this.locators.errLoginMsg, 2000);
    const usernameInput = await this.findElement(this.locators.username)
    const usernameValue = await usernameInput.getAttribute("value");
    return {
      errorMessage: errorEl ? await errorEl.getText() : null,
      actualUsernameLength: usernameValue.length
    };
  }




}

module.exports = LoginPage;