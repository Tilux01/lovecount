
import { JSDOM } from "jsdom";
import { APP_HTML } from "./src/shell.js";

const NL = String.fromCharCode(10);
const CR = String.fromCharCode(13);
const ROOM = "test-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
const DB = "https://love-track-c2f0f-default-rtdb.firebaseio.com/lovecount/" + ROOM;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
async function waitFor(fn, ms){
  const t0 = Date.now();
  while (Date.now() - t0 < ms){
    try { if (fn()) return true; } catch(e){}
    await sleep(200);
  }
  return false;
}

console.log("=== realtime two device harness ===");
console.log("  room:", ROOM);

const A = makeDevice("Israel", "a");
const B = makeDevice("Esther", "b");

const booted = await waitFor(() => A.w.LCRT && B.w.LCRT && A.w.LCRT.live && B.w.LCRT.live, 15000);
console.log("");
console.log("=== boot ===");
ok(booted, "both devices booted with the realtime layer live");
ok(A.w.LCRT && A.w.LCRT.uid, "device A has a persistent uid (" + (A.w.LCRT && A.w.LCRT.uid) + ")");
ok(B.w.LCRT && B.w.LCRT.uid && B.w.LCRT.uid !== (A.w.LCRT && A.w.LCRT.uid), "device B has its own distinct uid");

await sleep(1200);

console.log("");
console.log("=== chat: A -> B ===");
const tagA = "hi-esther-" + Date.now().toString(36);
A.w.LCRT.send(tagA);
const gotB = await waitFor(() => B.w.LCRT.messages().some((m) => m.text === tagA), 12000);
ok(gotB, "message from Israel reached Esther live (" + tagA + ")");
const msgB = B.w.LCRT.messages().find((m) => m.text === tagA);
ok(msgB && msgB.from === "Israel", "message is attributed to Israel on her device");

console.log("");
console.log("=== chat: B -> A ===");
const tagB = "hi-israel-" + Date.now().toString(36);
B.w.LCRT.send(tagB);
const gotA = await waitFor(() => A.w.LCRT.messages().some((m) => m.text === tagB), 12000);
ok(gotA, "reply from Esther reached Israel live (" + tagB + ")");
const msgA = A.w.LCRT.messages().find((m) => m.text === tagB);
ok(msgA && msgA.from === "Esther", "reply is attributed to Esther on his device");

console.log("");
console.log("=== chat renders into the real DOM ===");
const listB = B.d.getElementById("rt-list");
ok(!!listB && listB.innerHTML.indexOf(tagA) !== -1, "Esther's chat screen painted the incoming bubble");
ok(!!listB && listB.querySelectorAll(".rt-b").length >= 2, "both bubbles are present in her message list");
const dayB = B.d.querySelector("#rt-list .rt-day");
ok(!!dayB && /today/i.test(dayB.textContent), "day divider rendered (" + (dayB && dayB.textContent) + ")");

console.log("");
console.log("=== state sync A -> B ===");
const evTitle = "SyncProbe " + Date.now().toString(36);
A.w.LC.state().events.push({ id: "probe1", title: evTitle, date: "12-25", kind: "celebration", note: "", created: Date.now() });
A.w.LC.save();
const stateB = await waitFor(() => B.w.LC.state().events.some((e) => e.title === evTitle), 15000);
ok(stateB, "event added on his phone appeared on hers through realtime sync");
const localB = JSON.parse(B.w.localStorage.getItem("lc.state.v1") || "{}");
ok(localB.events && localB.events.some((e) => e.title === evTitle), "and it was persisted to her local storage");

console.log("");
console.log("=== role isolation ===");
ok(B.w.LC.state().myRole === "Esther", "her device kept its own role (Esther) after the sync");
ok(A.w.LC.state().myRole === "Israel", "his device kept its own role (Israel) after the sync");

console.log("");
console.log("=== calling: A rings B ===");
A.w.LCRT.call("audio");
ok(A.w.LCRT.callState === "calling", "caller entered the calling state");
const rang = await waitFor(() => B.w.LCRT.hasIncoming, 12000);
ok(rang, "the offer reached Esther and her device flagged an incoming call");
const inBox = B.d.getElementById("rt-incoming");
ok(!!inBox && inBox.className.indexOf("on") !== -1, "her incoming call screen is on");
const inName = B.d.getElementById("rt-in-name");
ok(!!inName && inName.textContent === "Israel", "her incoming screen names the caller (" + (inName && inName.textContent) + ")");
const callNode = await fetch(DB + "/call.json").then((r) => r.json());
ok(!!callNode && callNode.state === "ringing" && !!callNode.offer, "a real offer was written to the database");

console.log("");
console.log("=== calling: B declines ===");
B.d.getElementById("rt-decline").click();
const declined = await waitFor(() => A.w.LCRT.callState === "idle", 12000);
ok(declined, "the caller was torn down after the decline");
const cleared = await waitFor(async () => true, 10);
await sleep(1500);
const callAfter = await fetch(DB + "/call.json").then((r) => r.json());
ok(callAfter === null, "the call node was purged from the database");

console.log("");
console.log("=== calling: full answer handshake ===");
A.w.LCRT.call("video");
const rang2 = await waitFor(() => B.w.LCRT.hasIncoming, 12000);
ok(rang2, "second call reached her with the video flag");
B.d.getElementById("rt-accept").click();
const answered = await waitFor(() => A.w.LCRT.callState === "active", 12000);
ok(answered, "caller flipped to active once the answer came back");
const answerNode = await fetch(DB + "/call.json").then((r) => r.json());
ok(!!answerNode && answerNode.state === "accepted" && answerNode.answer && !!answerNode.answer.sdp, "a real answer sdp was written back to the database");
ok(B.w.LCRT.callState === "connecting" || B.w.LCRT.callState === "active", "she is holding a live call state (" + B.w.LCRT.callState + ")");
const callScreen = A.d.getElementById("rt-call");
ok(!!callScreen && callScreen.className.indexOf("on") !== -1, "his call screen is up");
const camBtn = A.d.getElementById("rt-cam");
ok(!!camBtn && camBtn.className.indexOf("rt-hide") === -1, "video calls expose the camera toggle");

console.log("");
console.log("=== calling: hang up ===");
A.w.LCRT.hang();
const hung = await waitFor(() => B.w.LCRT.callState === "idle", 12000);
ok(hung, "hanging up on him ended the call on her side too");
const gone = await waitFor(async () => true, 10);
await sleep(1500);
const callGone = await fetch(DB + "/call.json").then((r) => r.json());
ok(callGone === null, "call node purged after hang up");

console.log("");
console.log("=== cleanup ===");
const delRes = await fetch(DB + ".json", { method: "DELETE" });
ok(delRes.ok, "test room removed from the backend");

console.log("");
console.log("=== runtime errors ===");
const noise = (a) => a.filter((x) => x.indexOf("Not implemented") === -1 && x.indexOf("Could not parse CSS") === -1 && x.indexOf("rt-") === -1);
const ea = noise(A.errs), eb = noise(B.errs);
ok(ea.length === 0, "device A clean" + (ea.length ? " -> " + ea.slice(0, 3).join(" | ") : ""));
ok(eb.length === 0, "device B clean" + (eb.length ? " -> " + eb.slice(0, 3).join(" | ") : ""));

console.log("");
console.log("=== RESULT ===");
if (FAILED.length){ console.log("  " + FAILED.length + " CHECK(S) FAILED:"); FAILED.forEach((f) => console.log("   - " + f)); process.exit(1); }
else console.log("  ALL REALTIME CHECKS PASSED");
process.exit(0);
