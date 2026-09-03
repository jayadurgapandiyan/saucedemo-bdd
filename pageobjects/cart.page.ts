import { $, $$, browser, expect } from '@wdio/globals';

class CartPage {
  private get pageTitle() { return $('[data-test="title"]'); }
  private get cartItems() { return $$('[data-test="inventory-item"]'); }
  private get cartItemNames() { return $$('[data-test="inventory-item-name"]'); }
  private get checkoutButton() { return $('#checkout'); }

  async verifyCartPage(): Promise<void> {
    await expect(await browser.getUrl()).toContain('cart.html');
    await expect(this.pageTitle).toHaveText('Your Cart', {
      message: 'The Cart page title should be displayed.'
    });
  }

  async verifyExactlyProducts(expectedCount: number): Promise<void> {
    await expect(this.cartItems).toBeElementsArrayOfSize(expectedCount, {
      message: `The cart should contain exactly ${expectedCount} products.`
    });
  }

  async verifyExpectedProducts(productNames: string[]): Promise<void> {
    const actualProductNames = await this.cartItemNames.map((item) => item.getText());
    expect(actualProductNames).toEqual(expect.arrayContaining(productNames));
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.waitForDisplayed({ timeout: 10000 });
    await this.checkoutButton.scrollIntoView();
    await this.checkoutButton.waitForClickable({ timeout: 10000 });
    await this.checkoutButton.click();
    await expect(await browser.getUrl()).toContain('checkout-step-one.html');
  }
}

export default new CartPage();
