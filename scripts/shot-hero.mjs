import puppeteer from "puppeteer-core";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const url = process.argv[2] ?? "https://alvinmoncada.vercel.app";
const out = process.argv[3] ?? "C:\\Users\\DELL\\AppData\\Local\\Temp\\opencode\\shots\\hero-live.png";

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
await page.evaluate(() => window.scrollTo(0, 240));
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: out });

const info = await page.evaluate(() => {
  const cs = getComputedStyle(document.documentElement);
  const actions = document.querySelector(".hero-actions");
  return {
    scrollbarWidth: cs.scrollbarWidth,
    scrollbarColor: cs.scrollbarColor,
    heroChildren: [...(actions?.children ?? [])].map((el) => `${el.tagName}.${el.className}`),
    buttonsOnScreen: [...document.querySelectorAll("a.btn, button.btn, .nav-cta")].map((el) =>
      `${el.textContent.trim()} -> ${el.getAttribute("href") ?? "button"}`,
    ),
  };
});

console.log(JSON.stringify(info, null, 1));
await browser.close();
