const { By, until } = require("selenium-webdriver");
const TestData = require('../data/testData');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  get usernameEl() { return this.driver.findElement(By.id("user-name")) }
  get passwordEl() { return this.driver.findElement(By.id("password")) }
  get loginBtnEl() { return this.driver.findElement(By.id("login-button")) }
  get errLoginEl() { return this.driver.findElement(By.xpath("//h3[@data-test='error']")) }
 
   async login(username, password) {
    await this.driver.get(TestData.baseUrl);
    await this.driver.wait(until.elementIsVisible(this.usernameEl), 4000);
    await this.usernameEl.sendKeys(username)
    await this.passwordEl.sendKeys(password)
    await this.loginBtnEl.click()
  }

  async unSuccessfullLoginWithError(username, password) {
    await this.login(username, password);
    let errorMessage = await this.errLoginEl.getText();
    return errorMessage;
  }
}

module.exports = LoginPage;