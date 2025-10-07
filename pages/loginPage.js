const { By } = require("selenium-webdriver");
const TestData = require('../data/testData');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async login(username, password) {
    await this.driver.get(TestData.baseUrl);
    await this.driver.sleep(200)
    await this.driver.findElement(By.id("user-name")).sendKeys(username);
    await this.driver.sleep(200)

    await this.driver.findElement(By.id("password")).sendKeys(password);
    await this.driver.sleep(200)

    await this.driver.findElement(By.id("login-button")).click();
    await this.driver.sleep(200)
  }

  async unSuccessfullLoginWithError(username, password) {
    await this.login(username, password);
    let errorMessage = await this.driver.findElement(By.xpath("//h3[@data-test='error']")).getText();
    console.log(errorMessage);
    return errorMessage;
  }
}

module.exports = LoginPage;