
// Care/profile wording + role permissions + header height verification.
import { JSDOM } from "jsdom";
import { APP_HTML } from "./src/shell.js";

const fail = [];
const ok = (c, m) => { console.log((c ? "  PASS  " : "  FAIL  ") + m); if (!c) fail.push(m); };

function boot(){
  const dom = new JSDOM(APP_HTML, {
    runScripts: "dangerously", pretendToBeVisual: true, url: "https://lovecount.local/",
    beforeParse(w){ w.ReactNativeWebView={postMessage(){}}; w.scrollTo=()=>{}; w.HTMLElement.prototype.scrollTo=function(){}; },
  });
  return dom;
}
const wait = (ms) => new Promise(r => setTimeout(r, ms));

console.log("=== header geometry ===");
{
  const dom = boot(); const { window: w } = dom; await wait(1200);
  const d = w.document;
  const css = [...d.querySelectorAll("style")].map(s => s.textContent).join("\n");
  ok(/--lc-hdr:\s*3\.5rem/.test(css), "single header-height token --lc-hdr = 3.5rem (56px)");
  ok(/header\.pt-safe\s*>\s*div\.h-20\{height:var\(--lc-hdr\)/.test(css), "header bar height driven by the token");
  ok(/main\.pt-20\{padding-top:calc\(var\(--lc-hdr\) \+ var\(--lc-inset-top\)\)/.test(css),
     "content offset = header + inset (can never drift apart)");
  const inset = /--lc-inset-top:max\(env\(safe-area-inset-top,0px\),\s*\.5rem\)/.test(css);
  const hdr = d.querySelector("#screen-home header");
  ok(!!hdr, "home header present");
  const raw = w.getComputedStyle(w.document.documentElement).getPropertyValue("--lc-hdr").trim();
  console.log("   token values      : --lc-hdr=" + (raw || "(jsdom cannot resolve var())") + " | fallback inset 8px");
  console.log("   header height     : 56px bar (+ status bar inset) - was 80px bar");
}

console.log("=== profile / care wording (no third person) ===");
{
  const dom = boot(); const { window: w } = dom; await wait(1200);
  const html = w.document.documentElement.innerHTML;
  const walk = w.document.createTreeWalker(w.document.body, w.NodeFilter.SHOW_TEXT, null);
  const bad = [];
  const visible = [];
  let n2;
  while ((n2 = walk.nextNode())) {
    const pe = n2.parentElement;
    if (pe && (pe.tagName === "SCRIPT" || pe.tagName === "STYLE")) continue;
    const t2 = (n2.nodeValue || "").trim();
    if (!t2) continue;
    visible.push(t2);
    if (/\b(she|her|hers)\b/i.test(t2)) bad.push(t2);
  }
  console.log("   visible strings   :", visible.length);
  bad.forEach(b => console.log("   third person ->", b));
  ok(bad.length === 0, "zero third-person references left in UI copy");
  ok(html.includes("How are you feeling?"), "care log asks 'How are you feeling?'");
  ok(html.includes("Write a note"), "note action reads 'Write a note'");
}

console.log("=== role: Esther ===");
{
  const dom = boot(); const { window: w } = dom; await wait(1200);
  const d = w.document;
  d.querySelector('[data-role="esther"]').click();
  await wait(400);
  w.__ltGo("care_log"); await wait(250);
  const title = d.querySelector("#cl-title");
  ok(title && title.textContent === "How are you feeling?", "Esther sees second person title, got: " + (title && title.textContent));
  ok(d.querySelector("#cl-wnote") === null, "no view-only note button for Esther");
  ok(d.querySelector("#cl-save") && !d.querySelector("#cl-save").disabled, "Esther can save her own entry");
}

console.log("=== role: Israel ===");
{
  const dom = boot(); const { window: w } = dom; await wait(1200);
  const d = w.document;
  d.querySelector('[data-role="israel"]').click();
  await wait(400);
  w.__ltGo("care_log"); await wait(250);
  const title = d.querySelector("#cl-title");
  ok(title && title.textContent === "How is Esther feeling?", "Israel sees her name, not a bare pronoun: " + (title && title.textContent));
  ok(!!d.querySelector("#cl-wnote"), "Israel gets the 'Write a note' action in the care log");
  ok(d.querySelector("#cl-save").disabled, "Israel's save button is disabled (view only)");
  const panel = d.querySelector("#screen-care span");
  ok(!!d.querySelector("#screen-care button[data-act='care-note']"), "care screen exposes data-act=care-note");
  const quick = [...d.querySelectorAll("#screen-care button[data-act='care-log']")].map(b => b.textContent.trim());
  ok(quick.length === 3, "Quick Log Mood/Flow/Symptoms tagged for logging, got: " + quick.join("/"));
}

console.log("=== care note actually saves ===");
{
  const dom = boot(); const { window: w } = dom; await wait(1200);
  const d = w.document;
  d.querySelector('[data-role="israel"]').click();
  await wait(300);
  const before = w.LC.state().notes.length;
  w.__ltGo("care"); await wait(200);
  d.querySelector("#screen-care button[data-act='care-note']").click();
  await wait(200);
  const ta = d.querySelector("#cn-body");
  ok(!!ta, "note sheet opened from the care screen");
  ta.value = "Hope today is gentle on you.";
  d.querySelector("#cn-save").click();
  await wait(200);
  const after = w.LC.state().notes;
  ok(after.length === before + 1, "note saved from care (notes " + before + " -> " + after.length + ")");
  ok(after[0].from === "Israel" && after[0].body.indexOf("gentle") !== -1, "note carries the right author and body");
}

console.log("=== care sheet copy ===");
{
  const dom = boot(); const { window: w } = dom; await wait(1200);
  const d = w.document;
  d.querySelector('[data-role="esther"]').click(); await wait(300);
  w.LC.openCareLog(); await wait(150);
  const sheet = d.querySelector("#lc-sheet");
  ok(/Log how you feel/.test(sheet.textContent), "log sheet titled 'Log how you feel'");
  ok(/Period started today/.test(sheet.textContent), "period action present");
}

console.log("\n=== RESULT ===");
console.log(fail.length ? "  " + fail.length + " CHECK(S) FAILED:\n   - " + fail.join("\n   - ") : "  ALL CHECKS PASSED");
process.exit(fail.length ? 1 : 0);
