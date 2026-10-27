import puppeteer from "puppeteer-core";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const out = "C:\\Users\\DELL\\AppData\\Local\\Temp\\opencode\\shots";
const base = process.env.BASE ?? "http://localhost:3100";

const targets = [
  { name: "home-desktop", url: "/", width: 1440, height: 900, mobile: false },
  { name: "home-mobile", url: "/", width: 390, height: 844, mobile: true },
  { name: "work-desktop", url: "/work/inbox-zero", width: 1440, height: 900, mobile: false },
  { name: "work-mobile", url: "/work/inbox-zero", width: 390, height: 844, mobile: true },
];

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });

for (const t of targets) {
  const page = await browser.newPage();
  await page.setViewport({
    width: t.width,
    height: t.height,
    deviceScaleFactor: 1,
    isMobile: t.mobile,
    hasTouch: t.mobile,
  });
  await page.goto(base + t.url, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 800));
  const overflow = await page.evaluate(() => ({
    doc: document.documentElement.scrollWidth,
    win: window.innerWidth,
  }));
  console.log(t.name, "scrollWidth", overflow.doc, "innerWidth", overflow.win);
  await page.screenshot({ path: `${out}\\${t.name}.png`, fullPage: true });
  await page.close();
}

await browser.close();
