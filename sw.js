const CACHE = 'lovecount-v1';
const ICON = './assets/icon.png';

let REMS = [];
let fired = {};

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

function fire(r) {
  const tag = r.tag || ('lc-' + Date.now());
  if (fired[tag]) return;
  fired[tag] = 1;
  const opts = {
    body: r.body || '',
    tag,
    icon: ICON,
    badge: ICON,
    renotify: true,
    data: { tag },
    vibrate: [90, 60, 90]
  };
  if (Math.floor(Date.now() / 60000) === Math.floor(Date.now() / 60000)) {
    opts.silent = false;
  }
  return self.registration.showNotification(r.title || 'LoveCount', opts);
}

self.addEventListener('message', (event) => {
  const d = event.data || {};
  if (d.type === 'notify') {
    fire(d);
    if (d.persist) {
      REMS.push({ title: d.title, body: d.body, tag: d.tag, whenISO: d.whenISO || new Date(Date.now() + 1000).toISOString(), cat: d.cat });
    }
  } else if (d.type === 'store-reminders') {
    REMS = Array.isArray(d.reminders) ? d.reminders.slice(0, 60) : [];
    scheduleNext();
  } else if (d.type === 'clear') {
    REMS = [];
    fired = {};
  }
});

let timer = null;
function scheduleNext() {
  if (timer) { clearTimeout(timer); timer = null; }
  const now = Date.now();
  let next = null;
  for (const r of REMS) {
    const t = new Date(r.whenISO).getTime();
    if (!t || fired[r.tag]) continue;
    if (t <= now) { fired[r.tag] = 1; fire(r); continue; }
    if (next === null || t < next) next = t;
  }
  if (next !== null) {
    const delay = Math.min(next - now, 2147483000);
    timer = setTimeout(() => { scheduleNext(); }, delay);
  }
}

self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'lc-reminders') {
    event.waitUntil((async () => { scheduleNext(); })());
  }
});

self.addEventListener('sync', (event) => { scheduleNext(); });

self.addEventListener('push', (event) => {
  let payload = { title: 'LoveCount', body: 'You have a new update.' };
  try { if (event.data) payload = Object.assign(payload, event.data.json()); } catch (e) {
    try { payload.body = event.data.text(); } catch (e2) {}
  }
  event.waitUntil(fire(payload));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) {
      if ('focus' in c) { c.postMessage({ type: 'lc-open', tag: event.notification.data && event.notification.data.tag }); return c.focus(); }
    }
    if (self.clients.openWindow) return self.clients.openWindow('./index.html');
  })());
});
