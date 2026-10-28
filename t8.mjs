import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "/workspace/.chrome/chrome-headless-shell/linux-156.0.8078.73/chrome-headless-shell-linux64/chrome-headless-shell", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
const errs = []; p.on("pageerror", e=>errs.push(String(e)));
await p.goto("http://localhost:3222/", { waitUntil: "networkidle0" });
await new Promise(r=>setTimeout(r,1000));

// header CTA is now a plain mailto, no modal
const hdr = await p.evaluate(()=>{
  const a = document.querySelector(".nav-cta");
  return { tag:a.tagName, text:a.textContent.trim(), href:a.getAttribute("href") };
});
console.log("1. header CTA:", JSON.stringify(hdr));

// BUG TEST: open the hero modal from a scrolled position (your #services case)
await p.evaluate(()=>{const el=document.getElementById("services");window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY,behavior:"instant"});});
await new Promise(r=>setTimeout(r,600));
await p.evaluate(()=>[...document.querySelectorAll(".hero-actions button")].find(x=>x.textContent.includes("Book a call"))?.click());
await new Promise(r=>setTimeout(r,700));
const modal = await p.evaluate(()=>{
  const panel = document.querySelector(".modal-panel");
  if (!panel) return { present:false };
  const r = panel.getBoundingClientRect();
  return {
    present:true,
    parentIsBody: document.body.contains(panel) && panel.closest(".site-header")===null,
    width: Math.round(r.width), height: Math.round(r.height),
    top: Math.round(r.top), left: Math.round(r.left),
    hasDate: !!panel.querySelector('input[type="date"]'),
    slotCount: panel.querySelectorAll(".slot").length,
    hasGoogleBtn: !!panel.querySelector(".modal-actions a.btn-primary"),
    viewportH: window.innerHeight,
  };
});
console.log("2. modal (opened while scrolled to #services):", JSON.stringify(modal));
await p.screenshot({ path: "/workspace/shots/v7-modal.png" });

// close it, confirm the page can scroll again
await p.evaluate(()=>document.querySelector(".modal-panel .carousel-btn")?.click());
await new Promise(r=>setTimeout(r,500));
const overflow = await p.evaluate(()=>document.body.style.overflow);
console.log("3. body overflow after close:", overflow || "(restored)");

// BUG TEST: Browse the library actually scrolls
await p.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
await new Promise(r=>setTimeout(r,400));
await p.evaluate(()=>document.querySelector('.hero-actions a[href="#showcase"]').click());
await new Promise(r=>setTimeout(r,1600));
const scrolled = await p.evaluate(()=>{
  const el = document.getElementById("showcase");
  const r = el.getBoundingClientRect();
  return { showcaseTop: Math.round(r.top), inView: r.top < window.innerHeight && r.bottom > 0, scrollY: Math.round(window.scrollY) };
});
console.log("4. Browse the library →", JSON.stringify(scrolled));

// all four services now say Available
const statuses = await p.evaluate(()=>[...document.querySelectorAll(".service-status")].map(e=>e.textContent.trim()));
console.log("5. service statuses:", JSON.stringify(statuses));
console.log("page errors:", errs.length?errs:"none");
await b.close();
