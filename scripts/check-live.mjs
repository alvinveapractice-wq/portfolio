import puppeteer from "puppeteer-core";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const url = process.argv[2] ?? "https://alvinmoncada.vercel.app/work/inbox-zero";

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const failed = [];
page.on("requestfailed", (r) => failed.push(`FAILED ${r.url()}`));
page.on("response", (r) => {
  if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
});

await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

const result = await page.evaluate(async () => {
  const v = document.querySelector("video");
  v.muted = true;
  const play = await v.play().then(() => "ok").catch((e) => `blocked:${e.name}`);
  await new Promise((r) => setTimeout(r, 2500));
  return {
    duration: Math.round(v.duration),
    currentTime: Number(v.currentTime.toFixed(2)),
    paused: v.paused,
    play,
    readyState: v.readyState,
    videoWidth: v.videoWidth,
    poster: !!v.poster,
    files: [...document.querySelectorAll(".cs-aside a")].map((a) => a.getAttribute("href")),
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    ogImage: document.querySelector('meta[property="og:image"]')?.content,
  };
});

console.log(JSON.stringify(result, null, 1));
console.log("failed:", failed.length ? failed : "none");

await browser.close();
