
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
import { VENDOR_CSS, VENDOR_JS } from "./vendor.js";

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

html = html.replace("</head>", () => '<style id="lc-vendor">' + VENDOR_CSS + '</style><style id="lc-extra">' + EXTRA_CSS + '</style><style id="lc-rt">' + REALTIME_CSS + "</style></head>");

html = html.replace('<nav id="lt-footer"', () => NEW_SCREENS + "\n" + MORE_SCREENS + "\n" + REALTIME_HTML + "\n" + '<nav id="lt-footer"');

html = html.replace("</body>", () =>
  '<div id="lc-scrim"></div>' +
  '<div id="lc-sheet"></div>' +
  '<div id="lc-offline">Offline &#8212; your changes are saved on this phone</div>' +
  "<script>window.__LC_DATA__=" + payload + ";</script>" +
  "<script>" + CLOUD_JS + "</script>" +
  "<script>" + RUNTIME_JS + "</script>" +
  "<script>" + PAGE_JS + "</script>" +
  "<script>" + MORE_JS + "</script>" +
  "<script>" + REALTIME_JS + "</script>" +
  "</body>"
);

export const APP_HTML = html;
