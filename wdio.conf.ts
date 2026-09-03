export const config: WebdriverIO.Config = {
  runner: 'local',
  specs: ['./features/**/*.feature'],
  maxInstances: 1,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--window-size=1440,1000']
      },
      acceptInsecureCerts: true
    }
  ],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://www.saucedemo.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,
  framework: 'cucumber',
  reporters: [
    'spec',
    ['allure', { outputDir: 'allure-results' }]
  ],
  cucumberOpts: {
    require: ['./step-definitions/**/*.ts', './test/support/**/*.ts'],
    timeout: 60000,
    backtrace: false,
    failFast: false,
    strict: true,
    colors: true,
    snippets: true,
    source: true
  },
  afterTest: async function (_test, _context, result) {
    if (!result.passed) {
      await browser.takeScreenshot();
    }
  }
};
