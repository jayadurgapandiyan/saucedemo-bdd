import { $, browser } from '@wdio/globals';

class LoginPage {
  private get usernameInput() { return $('#user-name'); }
  private get passwordInput() { return $('#password'); }
  private get loginButton() { return $('#login-button'); }

  async open(): Promise<void> {
    await browser.url('/');
    await this.usernameInput.waitForDisplayed({ timeout: 10000 });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.waitForClickable({ timeout: 10000 });
    await this.loginButton.click();
  }

  async handleLoginAlertIfPresent(): Promise<void> {
    if (await browser.isAlertOpen()) {
      await browser.acceptAlert();
    }
  }
}

export default new LoginPage();
