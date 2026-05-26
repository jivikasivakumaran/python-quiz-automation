const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1080,
    height: 1920
  });

  const path = require('path');

  const filePath = 'file://' + path.join(__dirname, 'templates', 'generated.html');

  await page.goto(filePath);

  await page.screenshot({
    path: 'output/output.png'
  });
  console.log('Screenshot captured successfully!');
  await browser.close();
})();