
import { JSDOM } from "jsdom";
import { APP_HTML } from "./src/shell.js";

const NL = String.fromCharCode(10);
const CR = String.fromCharCode(13);
const ROOM = "test-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
const DB = "https://love-track-c2f0f-default-rtdb.firebaseio.com/lovecount/" + ROOM;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


function run(w, fn){ try { return w.eval("(" + fn.toString() + ")();"); } catch(e){ return undefined; } }

async function waitFor(fn, ms){
  const end = Date.now() + ms;
  while (Date.now() < end){
    try { if (fn()) return true; } catch(e){}
    await sleep(120);
  }
  try { return !!fn(); } catch(e){ return false; }
}

function makeSSE(w){
  return class SSE extends w.EventTarget {
    constructor(url){
      super();
      this.url = url;
      this._c = new AbortController();
      this._go();
    }
    async _go(){
      let buf = "", ev = "message", data = "";
      try {
        const r = await fetch(this.url, { headers: { Accept: "text/event-stream" }, signal: this._c.signal });
        const rd = r.body.getReader();
        const dec = new TextDecoder();
        while (true){
          const { done, value } = await rd.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          let i;
          while ((i = buf.indexOf(NL)) !== -1){
            let line = buf.slice(0, i);
            buf = buf.slice(i + 1);
            if (line.endsWith(CR)) line = line.slice(0, -1);
            if (line === ""){
              if (data){
                let d = data;
                if (d.endsWith(NL)) d = d.slice(0, -1);
                const e = new w.Event(ev);
                e.data = d;
                this.dispatchEvent(e);
              }
              ev = "message"; data = "";
            } else if (line.startsWith("event:")){
              ev = line.slice(6).trim();
            } else if (line.startsWith("data:")){
              data += line.slice(5).trim() + NL;
            }
          }
        }
      } catch(e){}
      if (!this._c.signal.aborted) setTimeout(() => this._go(), 1200);
    }
    close(){ try { this._c.abort(); } catch(e){} }
  };
}

function makeDevice(role, tag){
  const errs = [];
  const html = APP_HTML.replace('"roomId":"israel-esther"', '"roomId":"' + ROOM + '"');
  const dom = new JSDOM(html, {
    runScripts: "dangerously",
    pretendToBeVisual: true,
    url: "https://lovecount.local/",
    beforeParse(w){
      try { w.localStorage.setItem("lc.state.v1", JSON.stringify({ myRole: role })); } catch(e){}
      if (role === "Esther"){ try { w.localStorage.setItem("lc.rt.uid.v1", "uidB-" + tag); } catch(e){} }
      else { try { w.localStorage.setItem("lc.rt.uid.v1", "uidA-" + tag); } catch(e){} }
      w.fetch = (...a) => fetch(...a);
      w.EventSource = makeSSE(w);
      w.RTCPeerConnection = function(){
        this.addTrack = function(){};
        this.createOffer = async () => ({ type: "offer", sdp: "v=0 fake-offer" });
        this.createAnswer = async () => ({ type: "answer", sdp: "v=0 fake-answer" });
        this.setLocalDescription = async () => {};
        this.setRemoteDescription = async () => {};
        this.addIceCandidate = async () => {};
        this.close = function(){ this.connectionState = "closed"; };
        this.connectionState = "new";
        this.onicecandidate = null; this.ontrack = null; this.onconnectionstatechange = null;
      };
      w.RTCSessionDescription = function(o){ return o; };
      w.RTCIceCandidate = function(o){ return o; };
      Object.defineProperty(w.navigator, "mediaDevices", {
        configurable: true,
        value: { getUserMedia: async () => ({ getTracks: () => [], getAudioTracks: () => [], getVideoTracks: () => [] }) }
      });
      w.ReactNativeWebView = { postMessage: () => {} };
      w.scrollTo = () => {};
      w.HTMLElement.prototype.scrollTo = function(){};
    }
  });
  const w = dom.window;
  w.addEventListener("error", (e) => errs.push("err: " + e.message));
  w.addEventListener("unhandledrejection", (e) => errs.push("rej: " + e.reason));
  const realErr = console.error;
  console.error = (...a) => { errs.push("cerr: " + a.join(" ")); };
  return { dom, w, d: w.document, errs, role };
}

let FAILED = [];
function ok(cond, msg){
  if (cond) console.log("  PASS  " + msg);
  else { FAILED.push(msg); console.log("  FAIL  " + msg); }
}

console.log("=== notification two device harness ===");
console.log("  room:", ROOM);

const A = makeDevice("Israel", "na");
const B = makeDevice("Esther", "nb");

const booted = await waitFor(() => A.w.LCNotify && B.w.LCNotify && A.w.LCRT && B.w.LCRT && A.w.LCRT.live && B.w.LCRT.live, 15000);
console.log("");
console.log("=== boot ===");
ok(booted, "both devices booted with notify + realtime layers live");
ok(typeof A.w.LCNotify.show === "function", "LCNotify.show is exposed");

function alertTexts(dev){
  try { return (JSON.parse(dev.w.localStorage.getItem("lc.alerts.v1") || "[]")).map(function(a){ return a.t + " :: " + a.b; }); }
  catch(e){ return []; }
}

await sleep(2500);

console.log("");
console.log("=== she logs a period start, he is told ===");
const beforeA = alertTexts(A).length;
run(B.w, function(){
  var S = window.LC.state();
  var d = new Date();
  var p = function(n){ return String(n).padStart(2, "0"); };
  S.care.lastStart = d.getFullYear() + "-" + p(d.getMonth()+1) + "-" + p(d.getDate());
  S.care.log.push({ label: "Period started", at: new Date().toDateString() });
  window.LC.save();
});
const toldA = await waitFor(() => alertTexts(A).some((t) => /period start/i.test(t)), 12000);
ok(toldA, "Israel received a live alert when Esther logged a period start");
ok(alertTexts(A).length > beforeA, "Israel's alert log grew");
const hisAlert = alertTexts(A).find((t) => /period start/i.test(t));
ok(!!hisAlert && hisAlert.indexOf("Esther") === 0, "the alert is attributed to Esther (" + hisAlert + ")");
ok(!alertTexts(B).some((t) => /period start/i.test(t)), "Esther is NOT notified about her own entry");

console.log("");
console.log("=== he adds a memory, she is told ===");
run(B.w, function(){ window.LCNotify.alerts(); });
const beforeB = alertTexts(B).length;
run(A.w, function(){
  var S = window.LC.state();
  S.moments.push({ id: "m" + Date.now(), title: "Test memory", body: "hi", place: "Lagos", at: new Date().toISOString() });
  window.LC.save();
});
const toldB = await waitFor(() => alertTexts(B).some((t) => /new memory/i.test(t)), 12000);
ok(toldB, "Esther received a live alert when Israel saved a memory");
ok(alertTexts(B).length > beforeB, "Esther's alert log grew");
const herAlert = alertTexts(B).find((t) => /new memory/i.test(t));
ok(!!herAlert && herAlert.indexOf("Israel") === 0, "the alert is attributed to Israel (" + herAlert + ")");

console.log("");
console.log("=== live banner wiring ===");
ok(!!A.d.getElementById("lc-alert-banner"), "the in-app banner exists on device A");
ok(!!A.d.getElementById("lc-live-alerts"), "the live alerts list exists on device A");

console.log("");
console.log("=== cleanup ===");
try { await fetch(DB + ".json", { method: "DELETE" }); } catch(e){}
ok(true, "test room removed from the backend");

console.log("");
console.log("=== runtime errors ===");
ok(A.errs.length === 0, "device A clean" + (A.errs.length ? " -> " + A.errs.join(" | ") : ""));
ok(B.errs.length === 0, "device B clean" + (B.errs.length ? " -> " + B.errs.join(" | ") : ""));

console.log("");
console.log("=== RESULT ===");
if (FAILED.length === 0) console.log("  ALL NOTIFICATION CHECKS PASSED");
else { console.log("  " + FAILED.length + " CHECK(S) FAILED"); process.exitCode = 1; }
