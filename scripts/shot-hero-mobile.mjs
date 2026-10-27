import puppeteer from "puppeteer-core";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const out = "C:\\Users\\DELL\\AppData\\Local\\Temp\\opencode\\shots\\hero-m-live.png";

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
await page.goto("https://alvinmoncada.vercel.app", { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: out });

const box = await page.evaluate(() => {
  const a = document.querySelector(".hero-actions");
  const r = a.getBoundingClientRect();
  return { width: Math.round(r.width), height: Math.round(r.height) };
});
console.log("hero-actions", JSON.stringify(box));
await browser.close();
