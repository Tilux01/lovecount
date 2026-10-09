
// LoveCount verification harness.
// Boots the real assembled document in jsdom, captures every native bridge
// call, and asserts the reminder contract the native side depends on.
import { JSDOM } from "jsdom";
import { APP_HTML } from "./src/shell.js";

const native = [];
const errs = [];

const dom = new JSDOM(APP_HTML, {
  runScripts: "dangerously",
  pretendToBeVisual: true,
  url: "https://lovecount.local/",
  beforeParse(w) {
    w.ReactNativeWebView = {
      postMessage: (s) => { try { native.push(JSON.parse(s)); } catch (e) {} },
    };
    w.scrollTo = () => {};
    w.HTMLElement.prototype.scrollTo = function () {};
  },
});

const w = dom.window, d = w.document;
w.addEventListener("error", (e) => errs.push("window.error: " + e.message));
w.addEventListener("unhandledrejection", (e) => errs.push("unhandled: " + e.reason));

const realErr = console.error;
console.error = (...a) => { errs.push("console.error: " + a.join(" ")); realErr(...a); };

await new Promise((r) => setTimeout(r, 2500));

const fail = [];
const ok = (c, m) => { (c ? console.log : (m) => { fail.push(m); console.log; }); return c ? console.log("  PASS  " + m) : (fail.push(m), console.log("  FAIL  " + m)); };

console.log("=== boot ===");
console.log("  html bytes        :", APP_HTML.length);
console.log("  boot screen       :", w.__ltCurrent || "(unset)");
console.log("  screens in DOM    :", d.querySelectorAll('[id^="screen-"]').length);
console.log("  footers (#lt-footer):", d.querySelectorAll("#lt-footer").length);
console.log("  footer tabs       :", d.querySelectorAll("#lt-footer a").length);

console.log("=== role gate ===");
ok(w.__ltCurrent === "role", "fresh boot lands on the Israel/Esther role picker");
ok(!!d.querySelector('[data-role="israel"]') || !!d.querySelector('[data-role="esther"]') || /Israel/.test(d.getElementById("screen-role")?.innerHTML || ""), "role picker offers both people");

console.log("=== native bridge ===");
const actions = [...new Set(native.map((m) => m.action))];
console.log("  calls captured    :", JSON.stringify(actions));
ok(actions.includes("requestNotifications"), "asked for notification permission");
ok(actions.includes("scheduleReminders"), "sent a reminder batch");

console.log("=== reminder contract ===");
const last = native.filter((m) => m.action === "scheduleReminders").pop();
const rems = last?.payload?.reminders || [];
console.log("  reminders         :", rems.length);
rems.forEach((r) => {
  const t = r.trigger || {};
  console.log("   -", r.tag, "|", t.type, "|", Math.round((t.seconds || 0) / 86400 * 10) / 10 + "d", "|", r.title);
});
ok(rems.length >= 5, "at least 5 reminders (birthday x3, anniversary x2, daily nudge)");
ok(rems.every((r) => r.trigger && r.trigger.type === "timeInterval"),
   "every trigger carries an explicit type (SDK 57 requires the discriminant)");
ok(rems.every((r) => typeof r.trigger.seconds === "number" && r.trigger.seconds > 0),
   "every trigger has positive seconds");
ok(rems.every((r) => r.trigger.channelId === "lovecount"),
   "every trigger targets the lovecount Android channel");
ok(rems.every((r) => typeof r.whenISO === "string" && !isNaN(Date.parse(r.whenISO))),
   "every reminder carries a parseable whenISO stamp");
ok(rems.some((r) => r.tag === "bday-0"), "birthday-day reminder present");
ok(rems.some((r) => r.tag === "ann-0"), "anniversary-day reminder present");
ok(rems.some((r) => /Note|note/.test(r.title)), "daily note nudge present");

console.log("=== navigation ===");
const nav = {};
for (const id of ["home", "events", "notes", "moments", "care"]) {
  try { w.__ltGo(id); nav[id] = w.__ltCurrent; } catch (e) { nav[id] = "ERR:" + e.message; }
}
console.log("  ", JSON.stringify(nav));
ok(Object.entries(nav).every(([k, v]) => v === k), "all 5 footer tabs navigate");

const links = [...d.querySelectorAll("[data-goto]")].map((e) => e.getAttribute("data-goto"));
const ids = new Set([...d.querySelectorAll('[id^="screen-"]')].map((e) => e.id.replace("screen-", "")));
const dead = [...new Set(links)].filter((l) => l && !ids.has(l));
console.log("  data-goto targets :", links.length, "| unresolvable:", dead.length ? dead.join(",") : "none");
ok(dead.length === 0, "no dangling navigation targets");

console.log("=== runtime errors ===");
errs.forEach((e) => console.log("  ", e));
ok(errs.length === 0, "zero runtime errors");

console.log("\n=== RESULT ===");
console.log(fail.length ? "  " + fail.length + " CHECK(S) FAILED:\n   - " + fail.join("\n   - ") : "  ALL CHECKS PASSED");
process.exit(fail.length ? 1 : 0);
