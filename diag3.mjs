import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "/workspace/.chrome/chrome-headless-shell/linux-156.0.8078.73/chrome-headless-shell-linux64/chrome-headless-shell", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("https://alvinmoncada.vercel.app", { waitUntil: "networkidle0" });
await new Promise(r=>setTimeout(r,1500));
const ids = ["top","about","services","build","showcase","process","contact"];
console.log("scrollY | nav-active | section at viewport top");
let prev = null;
for (let i=0;i<26;i++){
  await p.evaluate(()=>window.scrollBy({top:300,behavior:"instant"}));
  await new Promise(r=>setTimeout(r,320));
  const s = await p.evaluate((ids)=>{
    const act = document.querySelector('.nav a.nl[data-active="true"]')?.textContent?.trim() ?? "none";
    let top = "none";
    for (const id of ids){ const e=document.getElementById(id); if(e && e.getBoundingClientRect().top<=0) top=id; }
    return { y:Math.round(scrollY), act, top, h:document.body.scrollHeight };
  }, ids);
  const flag = (prev && s.act!==prev) ? "  ← CHANGED" : "";
  if (flag) console.log(`${String(s.y).padStart(5)} | ${s.act.padEnd(9)} | ${s.top.padEnd(10)}${flag}`);
  prev = s.act;
}
console.log("\nfinal docHeight:", await p.evaluate(()=>document.body.scrollHeight));
console.log("nav items:", await p.evaluate(()=>[...document.querySelectorAll(".nav a.nl")].map(a=>a.textContent.trim()).join(", ")));
console.log("page sections with ids:", await p.evaluate(()=>[...document.querySelectorAll("section[id]")].map(s=>s.id).join(", ")));
await b.close();
