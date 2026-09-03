import { $, browser, expect } from '@wdio/globals';

class InventoryPage {
  private get pageTitle() { return $('[data-test="title"]'); }
  private get cartIcon() { return $('[data-test="shopping-cart-link"]'); }

  async verifyProductsPage(): Promise<void> {
    await expect(await browser.getUrl()).toContain('inventory.html');
    await expect(this.pageTitle).toHaveText('Products', {
      message: 'The Products page title should be displayed.'
    });
  }

  async addProductToCart(productId: string): Promise<void> {
    const addButton = $(`#add-to-cart-${productId}`);
    await addButton.waitForClickable({ timeout: 10000 });
    await addButton.click();
  }

  async addMultipleProducts(productIds: string[]): Promise<void> {
    for (const productId of productIds) {
      await this.addProductToCart(productId);
    }
  }

  async verifyProductsAdded(expectedCount: number): Promise<void> {
    await expect(this.cartIcon).toHaveText(String(expectedCount), {
      message: `The cart badge should show ${expectedCount} selected products.`
    });
  }

  async openCart(): Promise<void> {
    await this.cartIcon.waitForClickable({ timeout: 10000 });
    await this.cartIcon.click();
  }
}

export default new InventoryPage();
