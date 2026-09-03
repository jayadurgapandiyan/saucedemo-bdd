import { $, $$, browser, expect } from '@wdio/globals';

class CheckoutPage {
  private get pageTitle() { return $('[data-test="title"]'); }
  private get firstNameInput() { return $('#first-name'); }
  private get lastNameInput() { return $('#last-name'); }
  private get postalCodeInput() { return $('#postal-code'); }
  private get continueButton() { return $('#continue'); }
  private get overviewItems() { return $$('[data-test="inventory-item-name"]'); }
  private get finishButton() { return $('#finish'); }
  private get confirmationMessage() { return $('.complete-header'); }

  async verifyCheckoutInformationPage(): Promise<void> {
    await expect(await browser.getUrl()).toContain('checkout-step-one.html');
    await expect(this.pageTitle).toHaveText('Checkout: Your Information', {
      message: 'The Checkout: Your Information page title should be displayed.'
    });
  }

  async enterCustomerDetails(firstName: string, lastName: string, postalCode: string): Promise<void> {
    if (firstName) await this.firstNameInput.setValue(firstName);
    if (lastName) await this.lastNameInput.setValue(lastName);
    if (postalCode) await this.postalCodeInput.setValue(postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.waitForClickable({ timeout: 10000 });
    await this.continueButton.click();
  }

  async verifyCheckoutOverviewPage(): Promise<void> {
    await expect(await browser.getUrl()).toContain('checkout-step-two.html');
    await expect(this.pageTitle).toHaveText('Checkout: Overview', {
      message: 'The Checkout: Overview page title should be displayed.'
    });
  }

  async verifySelectedProducts(productNames: string[]): Promise<void> {
    const displayedProductNames = await this.overviewItems.map((item) => item.getText());
    expect(displayedProductNames).toEqual(expect.arrayContaining(productNames));
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.waitForClickable({ timeout: 10000 });
    await this.finishButton.click();
  }

  async verifyOrderConfirmation(): Promise<void> {
    await expect(this.confirmationMessage)
      .toHaveText('Thank you for your order!');
  }
}

export default new CheckoutPage();
