const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 1080,
    height: 1920
  });

  await page.goto('file:///D:/my_work/python_quizz_reels/templates/generated.html');

  await page.screenshot({
    path: 'output/output.png'
  });
  console.log('Screenshot captured successfully!');
  await browser.close();
})();