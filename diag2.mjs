import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "/workspace/.chrome/chrome-headless-shell/linux-156.0.8078.73/chrome-headless-shell-linux64/chrome-headless-shell", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });

// A) fresh load, no hash
let p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("https://alvinmoncada.vercel.app", { waitUntil: "networkidle0" });
await new Promise(r=>setTimeout(r,2500));
console.log("A) fresh load, no hash → scrollY:", await p.evaluate(()=>Math.round(window.scrollY)), "| hash:", await p.evaluate(()=>location.hash||"(none)"));
await p.close();

// B) load with a hash
p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("https://alvinmoncada.vercel.app/#showcase", { waitUntil: "networkidle0" });
await new Promise(r=>setTimeout(r,2500));
console.log("B) load #showcase → scrollY:", await p.evaluate(()=>Math.round(window.scrollY)), "| showcase top:", await p.evaluate(()=>Math.round(document.getElementById("showcase").getBoundingClientRect().top)));
await p.close();

// C) refresh at a deep position
p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("https://alvinmoncada.vercel.app", { waitUntil: "networkidle0" });
await new Promise(r=>setTimeout(r,1200));
await p.evaluate(()=>{const el=document.getElementById("showcase");window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY+300,behavior:"instant"});});
await new Promise(r=>setTimeout(r,800));
const before = await p.evaluate(()=>Math.round(window.scrollY));
await p.reload({ waitUntil: "networkidle0" });
await new Promise(r=>setTimeout(r,2500));
console.log(`C) refresh: was at ${before} → after reload ${await p.evaluate(()=>Math.round(window.scrollY))}`);
await p.close();

// D) scroll in small steps, watch for jumps
p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("https://alvinmoncada.vercel.app", { waitUntil: "networkidle0" });
await new Promise(r=>setTimeout(r,1500));
const samples = [];
for (let i=0;i<22;i++){
  await p.evaluate(()=>window.scrollBy({top:250,behavior:"instant"}));
  await new Promise(r=>setTimeout(r,260));
  samples.push(await p.evaluate(()=>Math.round(window.scrollY)));
}
console.log("D) scrollY samples:", JSON.stringify(samples));
const deltas = samples.map((v,i)=> i? v-samples[i-1] : 0);
console.log("   deltas:", JSON.stringify(deltas), "| anomalous:", deltas.filter(d=>d!==250).join(",")||"none");
console.log("   docHeight:", await p.evaluate(()=>document.body.scrollHeight));
await p.close();
await b.close();
