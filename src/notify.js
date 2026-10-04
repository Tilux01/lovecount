
export const NOTIFY_CSS = `
  .lc-alert-banner{position:fixed;left:0;right:0;top:calc(env(safe-area-inset-top,0px) + 8px);
    z-index:100001;display:flex;justify-content:center;padding:0 0.75rem;pointer-events:none;
    font-family:'Plus Jakarta Sans',ui-sans-serif,system-ui,sans-serif;}
  .lc-alert-banner .lc-ab{pointer-events:auto;width:100%;max-width:28rem;display:flex;align-items:center;gap:.6rem;
    padding:.7rem .8rem;border-radius:1.25rem;background:rgba(255,255,255,0.96);
    -webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);
    box-shadow:0 18px 40px -14px rgba(30,34,51,0.35);border:1px solid rgba(244,63,122,0.14);
    transform:translateY(-140%);transition:transform .38s cubic-bezier(.2,.9,.3,1.2);}
  .lc-alert-banner.on .lc-ab{transform:translateY(0);}
  .lc-alert-banner .lc-ab-ico{width:2.35rem;height:2.35rem;flex:0 0 auto;border-radius:.9rem;
    display:flex;align-items:center;justify-content:center;color:#fff;
    background:linear-gradient(135deg,#FF8FB6,#F43F7A);font-size:1.15rem;}
  .lc-alert-banner .lc-ab-tt{font-size:13px;font-weight:700;color:#171b2b;line-height:1.15;}
  .lc-alert-banner .lc-ab-bd{font-size:12px;color:#6B7280;line-height:1.2;margin-top:1px;}
  .lc-alert-banner .lc-ab-time{font-size:10px;color:#9CA3AF;font-weight:600;letter-spacing:.04em;}
  .lc-notif-row{display:flex;align-items:center;justify-content:space-between;gap:.75rem;padding:.9rem 1rem;
    border-radius:1.25rem;background:#fff;box-shadow:0 8px 24px -6px rgba(30,34,51,0.08);margin-bottom:.6rem;}
  .lc-notif-row .lc-nr-ico{width:2.4rem;height:2.4rem;border-radius:.9rem;display:flex;align-items:center;
    justify-content:center;color:#fff;flex:0 0 auto;}
  .lc-notif-row .lc-nr-tt{font-size:14px;font-weight:700;color:#171b2b;}
  .lc-notif-row .lc-nr-bd{font-size:12px;color:#6B7280;margin-top:1px;}
  .lc-sw{position:relative;width:46px;height:27px;border-radius:999px;background:#dee1f9;flex:0 0 auto;
    transition:background .2s ease;border:none;}
  .lc-sw:after{content:'';position:absolute;top:3px;left:3px;width:21px;height:21px;border-radius:999px;
    background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.18);transition:transform .2s ease;}
  .lc-sw.on{background:#F43F7A;}
  .lc-sw.on:after{transform:translateX(19px);}
  .lc-quiet{display:flex;align-items:center;gap:.4rem;padding:.5rem .75rem;border-radius:999px;
    background:#f3f2ff;color:#404754;font-size:11px;font-weight:600;width:max-content;}
`;

export const NOTIFY_HTML = `
<div id="lc-alert-banner" class="lc-alert-banner"><div class="lc-ab">
  <div class="lc-ab-ico"><span class="material-symbols-outlined" id="lc-ab-ico-glyph">notifications</span></div>
  <div style="flex:1 1 auto;min-width:0;">
    <div class="lc-ab-tt" id="lc-ab-tt">LoveCount</div>
    <div class="lc-ab-bd" id="lc-ab-bd"></div>
  </div>
  <div class="lc-ab-time" id="lc-ab-time">now</div>
</div></div>
`;

export const NOTIFY_JS = `
(function(){
  var D = (window.__LC_DATA__ || {});
  var LOGO = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><defs><linearGradient id='g' x1='.08' y1='0' x2='.92' y2='1'><stop offset='0' stop-color='#FF9BC0'/><stop offset='.46' stop-color='#F43F7A'/><stop offset='1' stop-color='#B4144C'/></linearGradient><linearGradient id='h' x1='.2' y1='0' x2='.85' y2='1'><stop offset='0' stop-color='#FFFFFF'/><stop offset='.7' stop-color='#FFF6F9'/><stop offset='1' stop-color='#FFE1EB'/></linearGradient></defs><rect width='64' height='64' rx='14.5' fill='url(%23g)'/><g transform='scale(.125)'><circle cx='256' cy='246' r='168' fill='none' stroke='#FFFFFF' stroke-opacity='.2' stroke-width='13'/><path d='M256 78A168 168 0 0 1 424 246' fill='none' stroke='#FFFFFF' stroke-opacity='.62' stroke-width='13' stroke-linecap='round'/><circle cx='424' cy='246' r='14' fill='#FFFFFF' opacity='.95'/><path d='M256 432C249 425 100 334 100 220C100 152 150 104 210 104C240 104 253 117 256 127C259 117 272 104 302 104C362 104 412 152 412 220C412 334 263 425 256 432Z' fill='url(%23h)'/></g></svg>";

  function S(){ try{ return JSON.parse(localStorage.getItem('lc.state.v1')) || {}; }catch(e){ return {}; } }
  function role(){ var s=S(); return s.myRole || ((D.me&&D.me.name)||'Israel'); }
  function her(){ return (D.partner && D.partner.name) || 'Esther'; }
  function him(){ return (D.me && D.me.name) || 'Israel'; }
  function escn(s){ return String(s==null?'':s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }

  var CATOF = { care:'care', cycle:'care', moment:'events', events:'events', event:'events', note:'nudges', chat:'chat', call:'calls' };
  function st(){ try{ if (window.LC && window.LC.state) return window.LC.state(); }catch(e){} try{ return JSON.parse(localStorage.getItem('lc.state.v1')) || {}; }catch(e){ return {}; } }
  function prefOn(c){ if (!c) return true; var s=st(); var m=(s.settings && s.settings.notifCats) || {}; return m[c] !== false; }
  function setPref(c,v){ var s=st(); if(!s.settings) s.settings={}; if(!s.settings.notifCats) s.settings.notifCats={}; s.settings.notifCats[c]=!!v; try{ if(window.LC && window.LC.save) window.LC.save(); else localStorage.setItem('lc.state.v1', JSON.stringify(s)); }catch(e){} }

  var ICONS = {
    care:'water_drop', cycle:'water_drop', moment:'photo_camera', event:'event',
    note:'sticky_note_2', chat:'forum', call:'call', rem:'notifications_active',
    bday:'cake', ann:'volunteer_activism', info:'favorite'
  };

  function permission(){
    try{ if (window.ReactNativeWebView) return 'native'; }catch(e){}
    try{ return ('Notification' in window) ? Notification.permission : 'unsupported'; }catch(e){ return 'unsupported'; }
  }

  var permAsked = false;
  function requestPermission(){
    var p = permission();
    if (p === 'native'){ try{ window.LC.native('requestNotifications'); }catch(e){} return; }
    if (p === 'default' && !permAsked){
      permAsked = true;
      try{ var r = Notification.requestPermission(); if (r && r.then) r.then(function(){ paintSettings(); }); }catch(e){}
    }
  }

  var quiet = false;
  function setQuiet(v){ quiet = !!v; try{ localStorage.setItem('lc.quiet.v1', quiet?'1':'0'); }catch(e){} }

  function show(title, body, tag, kind, cat){
    if (cat && !prefOn(cat)) return false;
    tag = String(tag || ('lc-' + Date.now()));
    var p = permission();
    var delivered = false;
    var swc = null;
    try { swc = (navigator.serviceWorker && navigator.serviceWorker.controller) || null; } catch(e){ swc = null; }
    if (p === 'native'){
      try{ window.LC.native('notifyNow', { title:title, body:body, tag:tag, kind:kind||'info' }); delivered = true; }catch(e){}
    } else if (swc){
      try{ swc.postMessage({ type:'notify', title:String(title), body:String(body||''), tag:tag, cat:cat||'', persist:false }); delivered = true; }catch(e){}
    } else if (p === 'granted'){
      try{
        var n = new Notification(String(title), { body:String(body||''), tag:tag, icon:LOGO, badge:LOGO, renotify:true, silent:!quiet ? false : true });
        n.onclick = function(){ try{ window.focus(); }catch(e){} try{ n.close(); }catch(e){} };
        delivered = true;
      }catch(e){}
    }
    // Always mirror into the in-app banner so nothing is ever silently lost.
    banner(title, body, kind);
    logAlert(title, body, kind, tag);
    return delivered;
  }

  function banner(title, body, kind){
    var el = document.getElementById('lc-alert-banner');
    if (!el) return;
    var g = document.getElementById('lc-ab-ico-glyph');
    if (g) g.textContent = ICONS[kind] || 'favorite';
    var t = document.getElementById('lc-ab-tt'); if (t) t.textContent = String(title||'LoveCount');
    var b = document.getElementById('lc-ab-bd'); if (b) b.textContent = String(body||'');
    var tm = document.getElementById('lc-ab-time'); if (tm) tm.textContent = 'now';
    el.classList.add('on');
    clearTimeout(banner._t);
    banner._t = setTimeout(function(){ el.classList.remove('on'); }, 5200);
  }

  function logAlert(title, body, kind, tag){
    try{
      var all = JSON.parse(localStorage.getItem('lc.alerts.v1') || '[]');
      all.push({ t:String(title||''), b:String(body||''), k:kind||'info', tag:tag||'', at:Date.now() });
      if (all.length > 120) all = all.slice(all.length - 120);
      localStorage.setItem('lc.alerts.v1', JSON.stringify(all));
      paintAlerts();
    }catch(e){}
  }
  function alerts(){ try{ return JSON.parse(localStorage.getItem('lc.alerts.v1') || '[]'); }catch(e){ return []; } }
  function clearAlerts(){ try{ localStorage.setItem('lc.alerts.v1','[]'); paintAlerts(); }catch(e){} }

  function paintAlerts(){
    var box = document.getElementById('lc-live-alerts');
    if (!box) return;
    var all = alerts().slice().reverse().slice(0, 12);
    if (!all.length){
      box.innerHTML = '<div class="lc-empty"><span class="material-symbols-outlined">notifications_off</span><strong>No live alerts yet</strong><p>Chat, care updates and reminders land here.</p></div>';
      return;
    }
    box.innerHTML = all.map(function(a){
      var d = new Date(a.at);
      var hh = d.getHours(), mm = d.getMinutes(), ap = hh>=12?'PM':'AM'; hh = hh%12 || 12;
      return '<div class="lc-notif-row">' +
        '<div style="display:flex;align-items:center;gap:.7rem;min-width:0;">' +
        '<div class="lc-nr-ico" style="background:linear-gradient(135deg,#FF8FB6,#F43F7A);"><span class="material-symbols-outlined" style="font-size:20px;">' + (ICONS[a.k]||'favorite') + '</span></div>' +
        '<div style="min-width:0;"><div class="lc-nr-tt">' + escn(a.t) + '</div><div class="lc-nr-bd">' + escn(a.b) + '</div></div>' +
        '</div>' +
        '<div class="lc-ab-time">' + (d.getDate() + '/' + (d.getMonth()+1) + ' ' + hh + ':' + (mm<10?'0':'') + mm + ' ' + ap) + '</div>' +
        '</div>';
    }).join('');
  }

  function paintPrefs(){
    var sws = document.querySelectorAll('[data-ncat]');
    for (var i = 0; i < sws.length; i++){
      var sw = sws[i], cat = sw.getAttribute('data-ncat');
      sw.classList.toggle('on', prefOn(cat));
    }
  }

  function toast(msg, icon){
    try { if (window.LC && window.LC.toast) return window.LC.toast(msg, icon); }catch(e){}
  }

  function registerSW(){
    try {
      if (!('serviceWorker' in navigator)) return;
      if (location.protocol === 'file:') return;
      navigator.serviceWorker.register('./sw.js').then(function(reg){
        try { if (reg.periodicSync && reg.periodicSync.register) reg.periodicSync.register('lc-reminders', { minInterval: 6 * 60 * 60 * 1000 }).catch(function(){}); }catch(e){}
      }).catch(function(){});
    }catch(e){}
  }

  function paintSettings(){
    var p = permission();
    var st = document.getElementById('lc-notif-status');
    if (st){
      var label = p === 'granted' ? 'OS notifications ON' : p === 'native' ? 'Delivered by the app' : p === 'denied' ? 'Blocked in browser settings' : p === 'unsupported' ? 'In-app alerts only' : 'Tap to enable';
      st.textContent = label;
      st.setAttribute('data-state', p);
    }
    var b = document.getElementById('lc-notif-enable');
    if (b){ b.style.display = (p === 'granted' || p === 'native') ? 'none' : 'flex'; }
  }

  // ---------- cross-device activity ----------
  var seen = {};
  var primed = false;

  function emit(kind, text){
    try{
      if (!window.LCRT || !window.LCRT.live || !window.LCRT.put) return;
      var key = Date.now().toString(36) + Math.random().toString(36).slice(2,6);
      window.LCRT.put('/activity/' + key, { from: role(), kind: kind, text: text, at: Date.now() });
    }catch(e){}
  }

  function initActivity(){
    if (!window.LCRT || !window.LCRT.sub) return;
    window.LCRT.sub('/activity', function(v){
      if (!v || typeof v !== 'object') return;
      var keys = Object.keys(v);
      if (!primed){ keys.forEach(function(k){ seen[k] = 1; }); primed = true; return; }
      keys.forEach(function(k){
        if (seen[k]) return;
        seen[k] = 1;
        var a = v[k];
        if (!a || !a.at) return;
        if (a.from === role()) return;
        if (Date.now() - a.at > 10 * 60 * 1000) return;
        var cat = CATOF[a.kind] || 'nudges';
        if (!prefOn(cat)) return;
        var title = (a.kind === 'care' || a.kind === 'cycle') ? (her() + ' - care update') : her();
        show(title, a.text || 'New activity', 'act-' + k, a.kind || 'info', cat);
      });
    });
  }

  // ---------- local change detection (so the partner is told) ----------
  var snap = null;
  function stats(){
    var s = S();
    var cl = (s.care && s.care.log) ? s.care.log : [];
    return {
      care: cl.length,
      lastLabel: cl.length ? String(cl[cl.length-1].label || '') : '',
      moments: (s.moments || []).length,
      events: (s.events || []).length,
      notes: (s.notes || []).length
    };
  }
  function diffAndEmit(){
    var cur = stats();
    if (!snap){ snap = cur; return; }
    if (cur.care > snap.care){
      var isStart = /period started/i.test(cur.lastLabel);
      emit('care', isStart ? (role() + ' logged a period start.') : (role() + ' added a care entry: ' + cur.lastLabel));
    }
    if (cur.moments > snap.moments) emit('moment', role() + ' added a new memory. Go look.');
    if (cur.events > snap.events) emit('event', role() + ' added a new event.');
    if (cur.notes > snap.notes) emit('note', role() + ' wrote you a new note.');
    snap = cur;
  }
  function watchLocal(){
    snap = stats();
    try{
      var orig = window.LC.save;
      window.LC.save = function(){
        var r = orig && orig.apply(this, arguments);
        try{ setTimeout(diffAndEmit, 60); }catch(e){}
        return r;
      };
    }catch(e){}
  }

  // ---------- web-scheduled alerts (work while the tab is alive / backgrounded) ----------
  var fired = {};
  var timers = [];
  function armWebAlerts(rems){
    try {
      if (navigator.serviceWorker && navigator.serviceWorker.controller){
        navigator.serviceWorker.controller.postMessage({ type:'store-reminders', reminders: (rems||[]).map(function(r){ return { title:r.title, body:r.body, tag:r.tag, whenISO:r.whenISO, cat:r.cat }; }) });
      }
    } catch(e){}
    if (permission() === 'native') return;
    try{ fired = JSON.parse(localStorage.getItem('lc.fired.v1') || '{}'); }catch(e){ fired = {}; }
    timers.forEach(function(t){ clearTimeout(t); });
    timers = [];
    var now = Date.now();
    (rems || []).forEach(function(r){
      var when = r.whenISO ? new Date(r.whenISO).getTime() : 0;
      if (!when) return;
      var dt = when - now;
      if (dt < 0 || dt > 26 * 60 * 60 * 1000) return;
      if (fired[r.tag]) return;
      var id = setTimeout(function(){
        if (fired[r.tag]) return;
        fired[r.tag] = 1;
        try{ localStorage.setItem('lc.fired.v1', JSON.stringify(fired)); }catch(e){}
        show(r.title, r.body, r.tag, r.tag && r.tag.indexOf('bday')===0 ? 'bday' : r.tag && r.tag.indexOf('ann')===0 ? 'ann' : r.tag && r.tag.indexOf('cyc')===0 ? 'cycle' : 'rem', r.cat);
      }, dt);
      timers.push(id);
    });
  }
  // Daily rollover: re-arm once the clock passes midnight so tomorrow's reminders arm.
  var lastArmDay = '';
  function rollover(){
    var d = new Date().toDateString();
    if (d !== lastArmDay){
      lastArmDay = d;
      try{ if (window.__LC_REMS) armWebAlerts(window.__LC_REMS); }catch(e){}
    }
  }

  function bindButtons(){
    var en = document.getElementById('lc-notif-enable');
    if (en) en.addEventListener('click', function(){ requestPermission(); setTimeout(paintSettings, 400); });
    var q = document.getElementById('lc-quiet-sw');
    if (q){
      q.classList.toggle('on', quiet);
      q.addEventListener('click', function(){ setQuiet(!quiet); q.classList.toggle('on', quiet); });
    }
    var cl = document.getElementById('lc-alerts-clear');
    if (cl) cl.addEventListener('click', function(){ clearAlerts(); });
    paintPrefs();
    var tb = document.getElementById('lc-notif-test');
    if (tb) tb.addEventListener('click', function(){ show('Test alert', 'Notifications are working. You are all set.', 'lc-test-' + Date.now(), 'info'); toast('Test alert sent', 'notifications'); });
  }

  // ---------- boot ----------
  function boot(){
    try{ quiet = localStorage.getItem('lc.quiet.v1') === '1'; }catch(e){}
    watchLocal();
    paintSettings();
    paintAlerts();
    document.addEventListener('visibilitychange', function(){ if (!document.hidden) { paintAlerts(); paintSettings(); } });
    // A single gesture is enough to let the browser ask for notification permission.
    document.addEventListener('click', function once(){ requestPermission(); document.removeEventListener('click', once); }, { once:true });
    initActivity();
    registerSW();
    bindButtons();
    setInterval(function(){ var on = document.getElementById('lc-prefs'); if (on && on.offsetParent !== null) paintPrefs(); }, 2500);
    setInterval(function(){ rollover(); paintSettings(); }, 30000);
    setInterval(function(){ try{ if (window.LCRT && window.LCRT.live && !primed) initActivity(); }catch(e){} }, 4000);
  }

  window.LCNotify = {
    show: show,
    emit: emit,
    banner: banner,
    permission: permission,
    request: requestPermission,
    armWebAlerts: armWebAlerts,
    alerts: alerts,
    clearAlerts: clearAlerts,
    paintAlerts: paintAlerts,
    isQuiet: function(){ return quiet; },
    setQuiet: setQuiet,
    prefOn: prefOn,
    setPref: setPref,
    paintPrefs: paintPrefs,
    rearm: function(){ try{ if (window.__LC_REMS) armWebAlerts(window.__LC_REMS); }catch(e){} }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else setTimeout(boot, 40);
  window.addEventListener('load', function(){ setTimeout(boot, 200); });
})();
`;
