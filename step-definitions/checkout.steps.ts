import { Given, When, Then } from '@wdio/cucumber-framework';
import cartPage from '../pageobjects/cart.page';
import checkoutPage from '../pageobjects/checkout.page';
import inventoryPage from '../pageobjects/inventory.page';
import loginPage from '../pageobjects/login.page';
import { browser, expect } from '@wdio/globals';

const selectedProductIds = [
  'sauce-labs-backpack',
  'sauce-labs-bike-light',
  'sauce-labs-bolt-t-shirt',
  'sauce-labs-fleece-jacket'
];

const selectedProductNames = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket'
];

Given('I open the SauceDemo website', async () => {
  await loginPage.open();
});

When(
  'I login with username {string} and password {string}',
  async (username: string, password: string) => {
    await loginPage.login(username, password);
  }
);

When('I handle the popup if it appears', async () => {
  await loginPage.handleLoginAlertIfPresent();
});

When('I verify the Products page', async () => {
  await inventoryPage.verifyProductsPage();
});

When('I add the selected products to the cart', async () => {
  await inventoryPage.addMultipleProducts(selectedProductIds);
  await inventoryPage.verifyProductsAdded(selectedProductIds.length);
});

Then('I should see exactly {int} products in the cart', async (expectedCount: number) => {
  await inventoryPage.verifyProductsAdded(expectedCount);
});

When('I navigate to the cart page', async () => {
  await inventoryPage.openCart();
});

Then('I verify the Cart page', async () => {
  await cartPage.verifyCartPage();
  await cartPage.verifyExactlyProducts(selectedProductNames.length);
});

Then('I verify all selected products are displayed', async () => {
  await cartPage.verifyExpectedProducts(selectedProductNames);
});

When('I click the Checkout button', async () => {
  await cartPage.clickCheckout();
});

Then('I should see the Checkout Information page', async () => {
  await checkoutPage.verifyCheckoutInformationPage();
});

When('I enter first name {string}', async (firstName: string) => {
  await checkoutPage.enterCustomerDetails(firstName, '', '');
});

When('I enter last name {string}', async (lastName: string) => {
  await checkoutPage.enterCustomerDetails('', lastName, '');
});

When('I enter zip code {string}', async (postalCode: string) => {
  await checkoutPage.enterCustomerDetails('', '', postalCode);
});

When('I click the Continue button', async () => {
  await checkoutPage.clickContinue();
});

Then('I should see the Checkout Overview page', async () => {
  await checkoutPage.verifyCheckoutOverviewPage();
});

Then('I should see all selected products', async () => {
  await checkoutPage.verifySelectedProducts(selectedProductNames);
});

When('I click the Finish button', async () => {
  await checkoutPage.clickFinish();
});

Then(
  'I should see the order confirmation message {string}',
  async (expectedMessage: string) => {
    if (expectedMessage === 'Thank you for your order!') {
      await checkoutPage.verifyOrderConfirmation();
      return;
    }

    throw new Error(`Unsupported confirmation message: ${expectedMessage}`);
  }
);

Then('the URL should contain {string}', async (expectedUrlPart: string) => {
  await expect(await browser.getUrl()).toContain(expectedUrlPart);
});
