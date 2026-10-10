
// ---------------------------------------------------------------------------
// Assembles the ONE HTML document that the WebView loads.
// Uses replacer FUNCTIONS (not strings) because the injected JS is full of
// "$$(" sequences, and "$$" inside a string replacement collapses to "$".
// ---------------------------------------------------------------------------
import { APP_HTML as BASE } from "./appHtml.js";
import { NEW_SCREENS, PAGE_JS } from "./newscreens.js";
import { MORE_SCREENS, MORE_JS } from "./pages3.js";
import { EXTRA_CSS } from "./styles.js";
import { RUNTIME_JS } from "./runtime.js";
import { DATA } from "./data.js";
import { CLOUD_JS } from "./cloud.js";
import { REALTIME_CSS, REALTIME_HTML, REALTIME_JS } from "./realtime.js";
import { NOTIFY_CSS, NOTIFY_HTML, NOTIFY_JS } from "./notify.js";
import { PUSH_JS } from "./push.js";
import { PHOTOS, PHOTOS_JS } from "./photos.js";
import { VENDOR_CSS, VENDOR_JS } from "./vendor.js";

function toBase64(str) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(str, "utf8").toString("base64");
  }
  if (typeof btoa === "function") {
    return btoa(unescape(encodeURIComponent(str)));
  }
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const encoded = unescape(encodeURIComponent(str));
  let out = "";
  for (let i = 0; i < encoded.length; i += 3) {
    const c1 = encoded.charCodeAt(i);
    const c2 = i + 1 < encoded.length ? encoded.charCodeAt(i + 1) : NaN;
    const c3 = i + 2 < encoded.length ? encoded.charCodeAt(i + 2) : NaN;

    out += chars.charAt(c1 >> 2);
    out += chars.charAt(((c1 & 3) << 4) | (c2 >> 4));
    out += isNaN(c2) ? "=" : chars.charAt(((c2 & 15) << 2) | (c3 >> 6));
    out += isNaN(c3) ? "=" : chars.charAt(c3 & 63);
  }
  return out;
}

const ICON_SVG = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><defs><linearGradient id='g' x1='.08' y1='0' x2='.92' y2='1'><stop offset='0' stop-color='#FF9BC0'/><stop offset='.46' stop-color='#F43F7A'/><stop offset='1' stop-color='#B4144C'/></linearGradient><linearGradient id='h' x1='.2' y1='0' x2='.85' y2='1'><stop offset='0' stop-color='#FFFFFF'/><stop offset='.7' stop-color='#FFF6F9'/><stop offset='1' stop-color='#FFE1EB'/></linearGradient></defs><rect width='64' height='64' rx='14.5' fill='url(%23g)'/><g transform='scale(.125)'><circle cx='256' cy='246' r='168' fill='none' stroke='#FFFFFF' stroke-opacity='.2' stroke-width='13'/><path d='M256 78A168 168 0 0 1 424 246' fill='none' stroke='#FFFFFF' stroke-opacity='.62' stroke-width='13' stroke-linecap='round'/><circle cx='424' cy='246' r='14' fill='#FFFFFF' opacity='.95'/><path d='M256 432C249 425 100 334 100 220C100 152 150 104 210 104C240 104 253 117 256 127C259 117 272 104 302 104C362 104 412 152 412 220C412 334 263 425 256 432Z' fill='url(%23h)'/></g></svg>";
const ICON_URI = "data:image/svg+xml;base64," + toBase64(ICON_SVG.replace(/%23/g, "#"));

const payload = JSON.stringify(DATA);

let html = BASE;


// ---------------------------------------------------------------- OFFLINE
// The original export pulled Tailwind + Google Fonts from a CDN. In a WebView
// that means an unstyled white frame on every cold boot, and a totally broken
// app with no internet. Strip the remote tags and inline the vendored copies
// instead. Function replacers are mandatory: the payloads contain "$$" which
// a string replacement would collapse.
html = html.replace(/<link[^>]*fonts\.(?:googleapis|gstatic)\.com[^>]*>/g, "");
html = html.replace(/<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/g,
  () => '<script id="lc-tailwind">' + VENDOR_JS + "</script>");

html = html.replace("</head>", () => '<link id="lc-manifest" rel="manifest" href="manifest.webmanifest"/><meta name="theme-color" content="#F43F7A"/><meta name="apple-mobile-web-app-capable" content="yes"/><meta name="apple-mobile-web-app-status-bar-style" content="default"/><meta name="apple-mobile-web-app-title" content="LoveCount"/><link rel="icon" type="image/svg+xml" href="' + ICON_URI + '"/><link rel="icon" type="image/png" sizes="192x192" href="./assets/icon-192.png"/><link rel="icon" type="image/png" sizes="512x512" href="./assets/icon-512.png"/><link rel="apple-touch-icon" sizes="180x180" href="./assets/apple-touch-icon.png"/><link rel="apple-touch-icon" sizes="167x167" href="./assets/apple-touch-icon-167.png"/><link rel="apple-touch-icon" sizes="152x152" href="./assets/apple-touch-icon-152.png"/><style id="lc-vendor">' + VENDOR_CSS + '</style><style id="lc-extra">' + EXTRA_CSS + '</style><style id="lc-rt">' + REALTIME_CSS + '</style><style id="lc-notify">' + NOTIFY_CSS + "</style></head>");

html = html.replace('<nav id="lt-footer"', () => NEW_SCREENS + "\n" + MORE_SCREENS + "\n" + REALTIME_HTML + "\n" + NOTIFY_HTML + "\n" + '<nav id="lt-footer"');

html = html.replace("</body>", () =>
  '<div id="lc-scrim"></div>' +
  '<div id="lc-sheet"></div>' +
  '<div id="lc-offline">Offline &#8212; your changes are saved on this phone</div>' +
  "<script>window.__LC_DATA__=" + payload + ";</script>" +
  "<script>window.__LC_PHOTOS__=" + JSON.stringify(PHOTOS) + ";</script>" +
  "<script>" + CLOUD_JS + "</script>" +
  "<script>" + RUNTIME_JS + "</script>" +
  "<script>" + PHOTOS_JS + "</script>" +
  "<script>" + PAGE_JS + "</script>" +
  "<script>" + MORE_JS + "</script>" +
  "<script>" + REALTIME_JS + "</script>" +
  "<script>" + NOTIFY_JS + "</script>" +
  "<script>" + PUSH_JS + "</script>" +
  "</body>"
);

// Every inlined brand mark was authored as a raw SVG data URI whose "#" hex
// colours acted as a URL fragment and truncated the payload, so 20+ logos
// rendered as broken images. Re-encode them once every screen is assembled.
html = html.replace(/data:image\/svg\+xml,<svg[\s\S]*?<\/svg>/g, function (m) {
  var svg = m.slice("data:image/svg+xml,".length).replace(/%23/g, "#");
  return "data:image/svg+xml;base64," + toBase64(svg);
});

export const APP_HTML = html;
