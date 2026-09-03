import { After, Before } from '@wdio/cucumber-framework';
import { browser } from '@wdio/globals';

Before(async () => {
  await browser.deleteCookies();
});

After(async function ({ result }) {
  if (result?.status === 'FAILED') {
    const screenshot = await browser.takeScreenshot();
    await this.attach(screenshot, 'image/png');
  }
});
