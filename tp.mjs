import puppeteer from "puppeteer-core";
const b = await puppeteer.launch({ executablePath: "/workspace/.chrome/chrome-headless-shell/linux-156.0.8078.73/chrome-headless-shell-linux64/chrome-headless-shell", args: ["--no-sandbox","--disable-gpu","--hide-scrollbars"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
const errs=[]; p.on("pageerror",e=>errs.push(String(e)));
await p.goto("http://localhost:3222/", { waitUntil: "networkidle0" });
await new Promise(r=>setTimeout(r,1400));
await p.evaluate(()=>document.querySelector(".film").scrollIntoView({block:"center"}));
await new Promise(r=>setTimeout(r,800));
console.log("poster applied:", await p.evaluate(()=>document.querySelector(".video-player video")?.getAttribute("poster")));
console.log("native controls attr:", await p.evaluate(()=>document.querySelector(".video-player video")?.hasAttribute("controls")));
console.log("controlsList:", await p.evaluate(()=>document.querySelector(".video-player video")?.getAttribute("controlsList")));
console.log("custom play button:", await p.evaluate(()=>!!document.querySelector(".video-play")));
await p.screenshot({ path: "/workspace/shots/v14-poster.png" });
// click play -> video should start, bar appears, custom button gone
await p.evaluate(()=>document.querySelector(".video-play").click());
await new Promise(r=>setTimeout(r,2000));
console.log("after play → started:", await p.evaluate(()=>!!document.querySelector(".video-controls")), "| custom button gone:", await p.evaluate(()=>!document.querySelector(".video-play")));
console.log("playing:", await p.evaluate(()=>{const v=document.querySelector(".video-player video"); return {paused:v.paused, t:+v.currentTime.toFixed(2), dur:+v.duration.toFixed(1)};}));
await p.mouse.move(700, 500);
await new Promise(r=>setTimeout(r,600));
await p.screenshot({ path: "/workspace/shots/v14-playing.png" });
// right-click must not open a menu / must be blocked
const ctxBlocked = await p.evaluate(()=>{
  const v=document.querySelector(".video-player video");
  const ev=new MouseEvent("contextmenu",{bubbles:true,cancelable:true});
  v.dispatchEvent(ev);
  return ev.defaultPrevented;
});
console.log("contextmenu blocked on video:", ctxBlocked);
console.log("errors:", errs.length?errs:"none");
await b.close();
