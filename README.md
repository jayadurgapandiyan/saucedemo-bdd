# SauceDemo Cucumber BDD Automation

End-to-end UI automation for [SauceDemo](https://www.saucedemo.com/) using WebdriverIO, TypeScript, Cucumber, Chrome, and the Page Object Model.

## Prerequisites

- Node.js 18.20 or newer
- Google Chrome

WebdriverIO v9 automatically manages a compatible ChromeDriver binary.

## Installation

```powershell
cd D:\saucedemo-bdd
npm install
```

## Execute the tests

Run the BDD suite:

```powershell
npm test
```

Run the checkout feature only:

```powershell
npm run test:checkout
```

Run TypeScript validation:

```powershell
npm run typecheck
```

## Framework flow

`features/checkout.feature` describes the business behavior in Gherkin. Each Given, When, and Then step is implemented in `step-definitions/checkout.steps.ts`. Step definitions provide test data and delegate browser interactions to the page objects under `pageobjects/`. The page objects own selectors, synchronization, navigation, and assertions.

The Cucumber hooks in `test/support/hooks.ts` clear cookies before each scenario and attach a screenshot when a scenario fails.

## Conversion from Mocha

The original Mocha spec has been replaced by a Gherkin feature and Cucumber step definitions. `wdio.conf.ts` now uses `framework: 'cucumber'` and `cucumberOpts.require`; all Mocha-specific settings and dependencies were removed. The page object selectors and SauceDemo workflow remain intact.

## Expected result

The checkout scenario passes after logging in, adding four products, completing checkout, and verifying `Thank you for your order!` and a URL containing `checkout-complete.html`.
