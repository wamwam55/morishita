const { chromium } = require('/Users/FISH/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
const path = require('path');

const baseUrl = 'http://127.0.0.1:4173';
const outputDir = path.resolve(__dirname);

async function capture(page, url, output, width, height) {
  await page.setViewportSize({ width, height });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({
    path: path.join(outputDir, output),
    clip: { x: 0, y: 0, width, height },
  });
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--profile-directory=Profile 1'],
  });
  const page = await browser.newPage();

  await capture(page, `${baseUrl}/design/html/pricing-cr001.html`, 'pricing-reference-1440.png', 1440, 5000);
  await capture(page, `${baseUrl}/.ai/visual-parity/pricing-app-harness.html`, 'pricing-actual-1440.png', 1440, 5000);
  await capture(page, `${baseUrl}/design/html/pricing-cr001.html`, 'pricing-reference-500.png', 500, 3000);
  await capture(page, `${baseUrl}/.ai/visual-parity/pricing-app-harness.html`, 'pricing-actual-500.png', 500, 3000);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/.ai/visual-parity/pricing-app-harness.html`, { waitUntil: 'networkidle' });
  const removedTextCount = await page.getByText('会計処理の目安', { exact: true }).count();
  const overflow = await page.evaluate(() => ({
    pageScrollWidth: document.documentElement.scrollWidth,
    pageClientWidth: document.documentElement.clientWidth,
  }));
  const corporateButton = page.locator('[data-tab-link="hojin"]');
  await corporateButton.click();
  const activeCorporateTab = await page.locator('#tab-hojin.active').count();

  if (removedTextCount !== 0 || activeCorporateTab !== 1 || overflow.pageScrollWidth !== overflow.pageClientWidth) {
    throw new Error(JSON.stringify({ removedTextCount, activeCorporateTab, overflow }));
  }
  process.stdout.write(`${JSON.stringify({ removedTextCount, activeCorporateTab, overflow })}\n`);

  await browser.close();
})();
