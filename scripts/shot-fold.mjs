import puppeteer from "puppeteer-core";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = process.argv[2] ?? "https://alvinmoncada.vercel.app";
const out = "C:\\Users\\DELL\\AppData\\Local\\Temp\\opencode\\shots";

const sizes = [
  { name: "fold-desktop", width: 1440, height: 900, mobile: false },
  { name: "fold-mobile", width: 390, height: 844, mobile: true },
];

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
for (const s of sizes) {
  const page = await browser.newPage();
  await page.setViewport({
    width: s.width,
    height: s.height,
    deviceScaleFactor: 1,
    isMobile: s.mobile,
    hasTouch: s.mobile,
  });
  await page.goto(base, { waitUntil: "networkidle2", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({ path: `${out}\\${s.name}.png` });

  const film = await page.evaluate(() => {
    const el = document.querySelector(".hero-film video");
    if (!el) return null;
    const b = el.getBoundingClientRect();
    return { top: Math.round(b.top), height: Math.round(b.height), playing: !el.paused };
  });
  console.log(s.name, JSON.stringify(film));
  await page.close();
}
await browser.close();
