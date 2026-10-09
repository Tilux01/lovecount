export const REALTIME_CSS = `#rt-list{display:flex;flex-direction:column;gap:.5rem;padding:.25rem 0 1rem;}
.rt-day{align-self:center;margin:.875rem 0 .25rem;padding:.3125rem .875rem;border-radius:9999px;background:#f3f2ff;color:#6B7280;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;}
.rt-row{display:flex;align-items:flex-end;gap:.375rem;max-width:100%;}
.rt-row-me{justify-content:flex-end;}
.rt-avs{width:1.75rem;height:1.75rem;border-radius:9999px;background:#EDE9FE;color:#712ae2;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.rt-b{max-width:79%;padding:.625rem .875rem;border-radius:1.25rem;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;line-height:20px;word-break:break-word;box-shadow:0 6px 18px -8px rgba(30,34,51,.22);}
.rt-me{background:linear-gradient(to bottom right,#005bb0,#0074dc);color:#fff;border-bottom-right-radius:.375rem;}
.rt-them{background:#FFFFFF;color:#171b2b;border-bottom-left-radius:.375rem;}
.rt-t{display:block;margin-top:.25rem;font-size:9px;font-weight:600;letter-spacing:.03em;text-align:right;color:rgba(255,255,255,.72);}
.rt-them .rt-t{color:#9CA3AF;}
.rt-img{display:block;width:100%;max-width:15rem;border-radius:1rem;}
.rt-link{color:inherit;text-decoration:underline;text-underline-offset:2px;}
.rt-composer{position:fixed;left:0;right:0;bottom:calc(5.5rem + env(safe-area-inset-bottom,0px));z-index:9998;display:flex;align-items:flex-end;gap:.5rem;width:100%;max-width:28rem;margin:0 auto;padding:.5rem .75rem;background:rgba(255,255,255,.94);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-radius:1.75rem;box-shadow:0 16px 36px -10px rgba(30,34,51,.18);}
.rt-input{flex:1;min-height:2.75rem;max-height:7rem;padding:.6875rem 1rem;border-radius:1.25rem;border:1px solid #F1ECF9;background:#faf8ff;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;line-height:20px;color:#171b2b;resize:none;box-sizing:border-box;}
.rt-input:focus{outline:none;border-color:#005bb0;box-shadow:0 0 0 3px rgba(0,91,176,.12);}
.rt-send,.rt-attach{width:2.75rem;height:2.75rem;flex-shrink:0;border-radius:9999px;border:0;display:flex;align-items:center;justify-content:center;cursor:pointer;}
.rt-send{background:linear-gradient(to right,#EC4899,#F43F5E);color:#fff;box-shadow:0 8px 20px -6px rgba(236,72,153,.5);}
.rt-attach{background:#f3f2ff;color:#712ae2;}
.rt-send:active,.rt-attach:active{transform:scale(.94);}
.rt-typing{align-self:center;padding:.25rem .75rem;border-radius:9999px;background:#EDE9FE;color:#712ae2;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;font-weight:700;letter-spacing:.04em;}
.rt-hide{display:none !important;}
.rt-icon-btn{width:2.25rem;height:2.25rem;border-radius:9999px;border:0;background:#FFFFFF;color:#005bb0;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px -4px rgba(30,34,51,.16);cursor:pointer;}
.rt-icon-btn:active{transform:scale(.94);}
.rt-live{position:absolute;bottom:-.125rem;right:-.125rem;width:.875rem;height:.875rem;border-radius:9999px;background:#9CA3AF;box-shadow:0 0 0 2px #fff;}
.rt-live.on{background:#10B981;}
.rt-call{position:fixed;inset:0;z-index:100001;display:none;flex-direction:column;align-items:center;justify-content:space-between;padding:calc(3rem + env(safe-area-inset-top,0px)) 1.25rem calc(2.5rem + env(safe-area-inset-bottom,0px));background:linear-gradient(to bottom,#1b1f33,#12141f 60%,#0b0d14);font-family:'Plus Jakarta Sans',sans-serif;}
.rt-call.on{display:flex;}
.rt-call-top{display:flex;flex-direction:column;align-items:center;gap:.5rem;text-align:center;z-index:2;}
.rt-call-av{width:7rem;height:7rem;border-radius:9999px;display:flex;align-items:center;justify-content:center;background:linear-gradient(to bottom right,#EC4899,#8B5CF6);color:#fff;box-shadow:0 20px 50px -12px rgba(236,72,153,.6);}
.rt-call-av.ring{animation:rtpulse 1.4s ease-in-out infinite;}
@keyframes rtpulse{0%,100%{transform:scale(1);box-shadow:0 20px 50px -12px rgba(236,72,153,.5);}50%{transform:scale(1.07);box-shadow:0 20px 60px -8px rgba(139,92,246,.7);}}
.rt-call-ctrl{display:flex;align-items:center;justify-content:center;gap:.875rem;z-index:3;}
.rt-ctrl{width:3.5rem;height:3.5rem;border-radius:9999px;border:0;background:rgba(255,255,255,.14);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;}
.rt-ctrl:active{transform:scale(.92);}
.rt-ctrl.off{background:#fff;color:#171b2b;}
.rt-end{background:#F43F5E;}
.rt-accept{background:#10B981;}
.rt-remote-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:none;background:#000;}
.rt-remote-video.on{display:block;}
.rt-local-video{position:absolute;top:calc(1rem + env(safe-area-inset-top,0px));right:1rem;width:6.5rem;height:9rem;border-radius:1rem;object-fit:cover;background:#000;display:none;z-index:4;box-shadow:0 12px 30px -8px rgba(0,0,0,.6);}
.rt-local-video.on{display:block;}
.rt-less{display:flex;align-items:center;gap:.375rem;padding:.375rem .75rem;border-radius:9999px;background:rgba(255,255,255,.12);color:#fff;font-size:11px;font-weight:700;}`;
export const REALTIME_HTML = `<section id="screen-chat" class="lt-screen">
<header class="fixed top-0 inset-x-0 z-50 pt-safe bg-[#FFFBF8]/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
  <div class="h-20 px-space-lg flex items-center justify-between">
    <div class="flex items-center gap-space-sm">
      <span class="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-bubble-pink to-secondary text-white">
        <span class="material-symbols-outlined text-[22px]">forum</span>
        <span id="rt-presence-mini" class="rt-live"></span>
      </span>
      <div class="flex flex-col">
        <div class="flex items-center gap-space-2xs">
          <span class="font-label-sm text-label-sm text-bubble-rose uppercase tracking-wider">Just Between Us</span>
          <span class="inline-block w-1.5 h-1.5 rounded-full bg-bubble-pink animate-pulse"></span>
        </div>
        <h1 class="font-headline-sm text-headline-sm text-on-surface leading-tight" id="rt-title">Our Chat</h1>
      </div>
    </div>
    <div class="flex items-center gap-space-xs">
      <button id="rt-call-audio" class="rt-icon-btn" type="button" aria-label="Voice call"><span class="material-symbols-outlined text-[20px]">call</span></button>
      <button id="rt-call-video" class="rt-icon-btn" type="button" aria-label="Video call"><span class="material-symbols-outlined text-[20px]">videocam</span></button>
      <div data-goto="settings" class="relative flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-bubble-pink via-bubble-yellow to-bubble-blue"><span class="material-symbols-outlined text-[18px] text-white">person</span></div>
    </div>
  </div>
</header>
<main class="flex-1 flex flex-col relative w-full pt-20 pb-40 px-margin-mobile bg-transparent">
  <div class="flex justify-center pt-1"><span id="rt-typing" class="rt-typing rt-hide"></span></div>
  <div id="rt-list" class="rt-list"></div>
</main>
<div class="rt-composer">
  <button id="rt-attach" class="rt-attach" type="button" aria-label="Attach photo"><span class="material-symbols-outlined text-[20px]">add_photo_alternate</span></button>
  <textarea id="rt-input" class="rt-input" rows="1" placeholder="Write something sweet..."></textarea>
  <button id="rt-send" class="rt-send" type="button" aria-label="Send message"><span class="material-symbols-outlined text-[20px]">send</span></button>
</div>
<input id="rt-file" type="file" accept="image/*" class="lc-hidden"/>
</section>

<div id="rt-call" class="rt-call">
  <video id="rt-remote-video" class="rt-remote-video" playsinline autoplay></video>
  <audio id="rt-remote-audio" autoplay></audio>
  <div class="rt-call-top">
    <div id="rt-call-av" class="rt-call-av"><span class="material-symbols-outlined text-[44px]">person</span></div>
    <h2 id="rt-call-name" class="font-headline-md text-headline-md text-white">Call</h2>
    <p id="rt-call-status" class="font-body-sm text-body-sm" style="color:rgba(255,255,255,.72)">Connecting...</p>
    <span id="rt-call-timer" class="font-label-lg text-label-lg text-white rt-hide">00:00</span>
    <span id="rt-call-warn" class="rt-less rt-hide"><span class="material-symbols-outlined text-[14px]">graphic_eq</span>Live audio</span>
  </div>
  <video id="rt-local-video" class="rt-local-video" playsinline autoplay muted></video>
  <div class="rt-call-ctrl">
    <button id="rt-mute" class="rt-ctrl" type="button" aria-label="Mute"><span class="material-symbols-outlined">mic</span></button>
    <button id="rt-cam" class="rt-ctrl" type="button" aria-label="Camera"><span class="material-symbols-outlined">videocam</span></button>
    <button id="rt-spk" class="rt-ctrl off" type="button" aria-label="Speaker"><span class="material-symbols-outlined">volume_up</span></button>
    <button id="rt-end" class="rt-ctrl rt-end" type="button" aria-label="End call"><span class="material-symbols-outlined">call_end</span></button>
  </div>
</div>

<div id="rt-incoming" class="rt-call">
  <div class="rt-call-top">
    <div class="rt-call-av ring"><span class="material-symbols-outlined text-[44px]">person</span></div>
    <h2 class="font-headline-md text-headline-md text-white" id="rt-in-name">Incoming</h2>
    <p class="font-body-sm text-body-sm" style="color:rgba(255,255,255,.72)" id="rt-in-sub">is calling you</p>
  </div>
  <div class="rt-call-ctrl">
    <button id="rt-decline" class="rt-ctrl rt-end" type="button" aria-label="Decline call"><span class="material-symbols-outlined">call_end</span></button>
    <button id="rt-accept" class="rt-ctrl rt-accept" type="button" aria-label="Accept call"><span class="material-symbols-outlined">call</span></button>
  </div>
</div>`;
export const REALTIME_JS = `
(function(){
  if (window.LCRT) return;
  var D = window.__LC_DATA__ || {};
  var CFG = (D.firebase && D.firebase.config) || {};
  var DB = String(CFG.databaseURL || '').trim(); while (DB.length && DB.charAt(DB.length - 1) === '/') { DB = DB.slice(0, -1); }
  var ROOM = String((D.firebase && D.firebase.roomId) || 'shared');
  var BASE = DB ? DB + '/lovecount/' + ROOM : '';
  var UKEY = 'lc.rt.uid.v1';
  var UID = '';
  try { UID = localStorage.getItem(UKEY) || ''; } catch(e){}
  if (!UID) { UID = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); try { localStorage.setItem(UKEY, UID); } catch(e){} }
  var hasFetch = typeof fetch === 'function';
  var hasES = typeof EventSource === 'function';
  var live = !!(BASE && hasFetch);

  var AK = CFG.apiKey || '';
  var AKEY = 'lc.rt.auth.v1';
  var AUTH = null;
  try { AUTH = JSON.parse(localStorage.getItem(AKEY) || 'null'); } catch(e){ AUTH = null; }
  function saveAuth(a){ AUTH = a; try { if (a) localStorage.setItem(AKEY, JSON.stringify(a)); } catch(e){} }
  function authToken(){ return (AUTH && AUTH.token && AUTH.exp > Date.now()) ? AUTH.token : ''; }
  function authParam(){ var t = authToken(); return t ? '?auth=' + encodeURIComponent(t) : ''; }
  function anonSignIn(){
    if (!AK || !hasFetch) return Promise.resolve(null);
    return fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + AK, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ returnSecureToken: true })
    }).then(function(r){ return r.json(); }).then(function(j){
      if (!j || !j.idToken) throw new Error('auth:' + ((j && j.error && j.error.message) || 'fail'));
      var a = { token: j.idToken, refresh: j.refreshToken, uid: j.localId, exp: Date.now() + (parseInt(j.expiresIn, 10) || 3600) * 1000 - 60000 };
      saveAuth(a); return a;
    });
  }
  function refreshAuth(){
    if (!AK || !hasFetch) return Promise.resolve(null);
    if (!AUTH || !AUTH.refresh) return anonSignIn().catch(function(){ return null; });
    return fetch('https://securetoken.googleapis.com/v1/token?key=' + AK, {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(AUTH.refresh)
    }).then(function(r){ return r.json(); }).then(function(j){
      if (!j || !j.id_token) return anonSignIn();
      var a = { token: j.id_token, refresh: j.refresh_token || AUTH.refresh, uid: j.user_id || AUTH.uid, exp: Date.now() + (parseInt(j.expires_in, 10) || 3600) * 1000 - 60000 };
      saveAuth(a); return a;
    }).catch(function(){ return anonSignIn(); });
  }
  function ensureAuth(){ return authToken() ? Promise.resolve(AUTH) : refreshAuth(); }
  var lastRev = 0;
  var pushT = null;
  var msgs = [];
  var lastKey = '';
  var lastTyping = {};
  var lastPresence = {};
  var partnerOnline = false;
  var typingAt = 0;
  var seenCand = {};

  function S(){ return (window.LC && window.LC.state) ? window.LC.state() : {}; }
  function pl(){ return (D.partner && D.partner.name) || 'Esther'; }
  function meName(){ return (D.me && D.me.name) || 'Tilux'; }
  function logStep(m){ try { console.log('[LCSTEP] ' + m); } catch(e){} }
  function whoami(){ var s = S(); return s.myRole || meName(); }
  function other(){ return whoami() === pl() ? meName() : pl(); }
  function enc(s){ return encodeURIComponent(String(s)); }
  function $(id){ return document.getElementById(id); }
  function toast(m, i){ try { if (window.LC && window.LC.toast) window.LC.toast(m, i); } catch(e){} }

  function esc(s){
    s = String(s == null ? '' : s);
    var o = '';
    for (var i = 0; i < s.length; i++){
      var c = s.charAt(i);
      if (c === '&') o += '&amp;';
      else if (c === '<') o += '&lt;';
      else if (c === '>') o += '&gt;';
      else if (c === '"') o += '&quot;';
      else o += c;
    }
    return o;
  }
  function nl(s){ return esc(s).split(String.fromCharCode(10)).join('<br/>'); }

  function clock(ms){
    var d = new Date(ms);
    var h = d.getHours(), m = d.getMinutes();
    var ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12; if (h === 0) h = 12;
    return h + ':' + (m < 10 ? '0' : '') + m + ' ' + ap;
  }
  function MON(){
    return ['January','February','March','April','May','June','July','August','September','October','November','December'];
  }
  function dayLabel(ms){
    var d = new Date(ms), t = new Date();
    var a = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var b = new Date(t.getFullYear(), t.getMonth(), t.getDate());
    var n = Math.round((b - a) / 86400000);
    if (n <= 0) return 'Today';
    if (n === 1) return 'Yesterday';
    if (n < 7) return n + ' days ago';
    return d.getDate() + ' ' + MON()[d.getMonth()] + (d.getFullYear() !== t.getFullYear() ? ' ' + d.getFullYear() : '');
  }

  function req(method, path, body){
    if (!live) return Promise.reject(new Error('offline'));
    var o = { method: method, cache: 'no-store' };
    if (body !== undefined) { o.headers = { 'Content-Type': 'application/json' }; o.body = JSON.stringify(body); }
    function attempt(){
      return fetch(BASE + path + '.json' + authParam(), o).then(function(r){
        if (r.status === 401 && AK) { return refreshAuth().then(function(){ return fetch(BASE + path + '.json' + authParam(), o); }); }
        return r;
      });
    }
    return attempt().then(function(r){
      if (!r.ok) throw new Error('rt-' + r.status);
      if (r.status === 204) return null;
      return r.text().then(function(t){ try { return JSON.parse(t); } catch(e){ return null; } });
    });
  }
  function get(p){ return req('GET', p); }
  function put(p, v){ return req('PUT', p, v); }
  function post(p, v){ return req('POST', p, v); }
  function patch(p, v){ return req('PATCH', p, v); }
  function del(p){ return req('DELETE', p); }

  var mirror = {};
  var watches = [];
  var streamOpen = false;

  function partsOf(p){
    var out = [];
    String(p || '').split('/').forEach(function(x){ if (x.length) out.push(x); });
    return out;
  }
  function valAt(obj, parts){
    var cur = obj;
    for (var i = 0; i < parts.length; i++){
      if (cur === null || cur === undefined || typeof cur !== 'object') return null;
      cur = cur[parts[i]];
    }
    return cur === undefined ? null : cur;
  }
  function setAt(obj, parts, v){
    var i, k, out = {};
    if (!parts.length) return (v === null || v === undefined) ? {} : v;
    Object.keys(obj || {}).forEach(function(key){ out[key] = obj[key]; });
    k = parts[0];
    if (parts.length === 1){
      if (v === null || v === undefined) delete out[k]; else out[k] = v;
    } else {
      var child = setAt(out[k], parts.slice(1), v);
      if (Object.keys(child).length === 0) delete out[k]; else out[k] = child;
    }
    return out;
  }
  function notify(){
    watches.forEach(function(w){
      var v = valAt(mirror, w.parts);
      if (v === w.last && !w.force) return;
      w.last = v;
      w.force = false;
      try { w.cb(v); } catch(e){ console.log(e); }
    });
  }
  function applyPut(path, data){
    var parts = partsOf(path);
    var v = data === undefined ? null : data;
    mirror = parts.length ? setAt(mirror, parts, v) : (v && typeof v === 'object' ? v : {});
    notify();
  }
  function applyPatch(path, data){
    var parts = partsOf(path);
    var base = valAt(mirror, parts);
    if (base === null || typeof base !== 'object') base = {};
    var merged = {};
    Object.keys(base).forEach(function(k){ merged[k] = base[k]; });
    Object.keys(data || {}).forEach(function(k){
      if (data[k] === null) delete merged[k]; else merged[k] = data[k];
    });
    mirror = parts.length ? setAt(mirror, parts, merged) : merged;
    notify();
  }

  function sub(path, cb){
    var w = { path: path, parts: partsOf(path), cb: cb, last: undefined, force: true };
    watches.push(w);
    return { close: function(){ watches = watches.filter(function(x){ return x !== w; }); } };
  }

  function openStream(){
    if (!live || streamOpen) return;
    streamOpen = true;
    if (!hasES){
      function pull(){ get('').then(function(v){ applyPut('', v); }).catch(function(){}); }
      pull();
      setInterval(pull, 3000);
      return;
    }
    var es = null;
    try { es = new EventSource(BASE + '.json' + authParam()); } catch(e){ streamOpen = false; return; }
    es.addEventListener('put', function(e){
      try { var d = JSON.parse(e.data); applyPut(d.path, d.data); }
      catch(err){ console.log('[LCRT] put', err); }
    });
    es.addEventListener('patch', function(e){
      try { var d = JSON.parse(e.data); applyPatch(d.path, d.data); }
      catch(err){ console.log('[LCRT] patch', err); }
    });
    es.addEventListener('cancel', function(){ try { es.close(); } catch(e){} streamOpen = false; });
    es.onerror = function(){
      if (es.readyState === 2){ streamOpen = false; setTimeout(openStream, 2500); }
    };
  }

  function applyRemote(v){
    if (!v || !v.state || v.by === UID) return;
    if (!(v.rev > lastRev)) return;
    lastRev = v.rev;
    var s = S();
    var role = s.myRole;
    Object.keys(v.state).forEach(function(k){ s[k] = v.state[k]; });
    if (role) s.myRole = role;
    try { localStorage.setItem('lc.state.v1', JSON.stringify(s)); } catch(e){}
    try { window.LC.renderAll(); window.LC.personalise(); } catch(e){}
    paintTitle();
  }

  function pushState(state){
    if (!live) return;
    clearTimeout(pushT);
    pushT = setTimeout(function(){
      var rev = Math.max(Date.now(), lastRev + 1);
      lastRev = rev;
      put('/state', { rev: rev, at: new Date().toISOString(), by: UID, state: state }).catch(function(){});
    }, 700);
  }

  function listify(v){
    var out = [];
    if (v && typeof v === 'object'){
      Object.keys(v).forEach(function(k){
        var m = v[k];
        if (!m || typeof m !== 'object') return;
        m.__k = k;
        if (typeof m.at !== 'number') m.at = parseInt(m.at, 10) || Date.now();
        out.push(m);
      });
    }
    out.sort(function(a, b){ return a.at - b.at; });
    if (out.length > 300) out = out.slice(out.length - 300);
    return out;
  }

  function bubble(m, mine){
    var body = m.img ? '<img class="rt-img" src="' + esc(m.img) + '" alt="shared photo"/>' : '<span>' + nl(m.text || '') + '</span>';
    var av = mine ? '' : '<span class="rt-avs"><span class="material-symbols-outlined text-[16px]">person</span></span>';
    return '<div class="rt-row ' + (mine ? 'rt-row-me' : 'rt-row-them') + '">' + av +
      '<div class="rt-b ' + (mine ? 'rt-me' : 'rt-them') + '">' + body + '<span class="rt-t">' + clock(m.at) + '</span></div></div>';
  }

  function paintTitle(){
    var t = $('rt-title');
    if (t) t.textContent = whoami() + ' & ' + other();
  }

  function renderChat(){
    var list = $('rt-list');
    if (!list) return;
    var me = whoami();
    if (!msgs.length){
      list.innerHTML = '<div class="lc-empty"><span class="material-symbols-outlined">forum</span><strong>No messages yet</strong><p>Say something sweet to ' + esc(other()) + ' - it lands here the moment you send it.</p></div>';
      paintTitle();
      return;
    }
    var html = '';
    var day = '';
    msgs.forEach(function(m){
      var d = dayLabel(m.at);
      if (d !== day){ day = d; html += '<div class="rt-day">' + esc(d) + '</div>'; }
      html += bubble(m, m.from === me);
    });
    list.innerHTML = html;
    paintTitle();
  }

  function scrollBottom(){
    setTimeout(function(){ try { window.scrollTo(0, document.body.scrollHeight); } catch(e){} }, 40);
  }

  function onChat(v){
    var arr = listify(v);
    var last = arr.length ? arr[arr.length - 1] : null;
    var key = last ? String(last.__k || '') + ':' + last.at : '';
    var fresh = !!key && key !== lastKey;
    lastKey = key;
    msgs = arr;
    renderChat();
    if (fresh && last && last.from !== whoami()){
      if (window.__ltCurrent === 'chat') scrollBottom();
      else {
        var snippet = String(last.img ? 'sent a photo' : (last.text || '')).slice(0, 64);
        toast(last.from + ': ' + snippet.slice(0, 42), 'chat_bubble');
        try { if (window.LCNotify) window.LCNotify.show(last.from, snippet || 'New message', 'chat-' + key, 'chat', 'chat'); } catch(e){}
      }
    }
  }

  function send(text){
    text = String(text || '').trim();
    if (!text) return;
    if (!live){ toast('You are offline - message not sent', 'cloud_off'); return; }
    msgs.push({ from: whoami(), text: text, at: Date.now(), kind: 'text' });
    renderChat();
    scrollBottom();
    post('/chat', { from: whoami(), text: text, at: Date.now(), kind: 'text' }).catch(function(){ toast('Message could not be sent', 'error'); });
    put('/typing/' + enc(whoami()), 0).catch(function(){});
  }

  function paintTyping(){
    var el = $('rt-typing');
    if (!el) return;
    var names = [];
    Object.keys(lastTyping || {}).forEach(function(k){
      if (k === whoami()) return;
      var t = parseInt(lastTyping[k], 10) || 0;
      if (t && Date.now() - t < 5000) names.push(k);
    });
    if (names.length){ el.className = 'rt-typing'; el.textContent = names[0] + ' is typing...'; }
    else el.className = 'rt-typing rt-hide';
  }

  function paintPresence(){
    var on = false;
    Object.keys(lastPresence || {}).forEach(function(k){
      if (k === whoami()) return;
      var p = lastPresence[k] || {};
      if (Date.now() - (parseInt(p.at, 10) || 0) < 45000) on = true;
    });
    partnerOnline = on;
    var dot = $('rt-presence-mini');
    if (dot) dot.className = on ? 'rt-live on' : 'rt-live';
  }

  function heartbeat(){
    if (!live) return;
    put('/presence/' + enc(whoami()), { at: Date.now(), name: whoami() }).catch(function(){});
    setTimeout(heartbeat, 20000);
  }

  function autogrow(el){
    try { el.style.height = 'auto'; el.style.height = Math.min(112, el.scrollHeight) + 'px'; } catch(e){}
  }

  function shrink(file, cb){
    var fr = new FileReader();
    fr.onload = function(){
      var img = new Image();
      img.onload = function(){
        var max = 720, w = img.width, h = img.height;
        if (w > h && w > max){ h = Math.round(h * max / w); w = max; }
        else if (h >= w && h > max){ w = Math.round(w * max / h); h = max; }
        var c = document.createElement('canvas');
        c.width = w; c.height = h;
        c.getContext('2d').drawImage(img, 0, 0, w, h);
        cb(c.toDataURL('image/jpeg', 0.6));
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  }

  var CALL = { pc: null, local: null, id: null, role: null, state: 'idle', type: 'audio', subs: [], pending: [], remote: null, remoteSet: false, incoming: null, timer: null, started: 0 };

  var actx = null, ringTimer = null;
  function ring(on){
    try {
      if (on){
        if (!actx){ var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; actx = new AC(); }
        if (actx.state === 'suspended'){ actx.resume(); }
        if (ringTimer) return;
        function beep(){
          try {
            var o = actx.createOscillator(), g = actx.createGain();
            o.type = 'sine'; o.frequency.value = 660;
            o.connect(g); g.connect(actx.destination);
            g.gain.setValueAtTime(0.0001, actx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.11, actx.currentTime + 0.06);
            g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + 0.62);
            o.start(actx.currentTime); o.stop(actx.currentTime + 0.66);
          } catch(e){}
        }
        beep();
        ringTimer = setInterval(beep, 1500);
      } else if (ringTimer){ clearInterval(ringTimer); ringTimer = null; }
    } catch(e){}
  }

  function setStatus(t){ var el = $('rt-call-status'); if (el) el.textContent = t; }

  function startTimer(){
    if (CALL.timer) return;
    CALL.started = Date.now();
    var tm = $('rt-call-timer');
    if (tm) tm.classList.remove('rt-hide');
    CALL.timer = setInterval(function(){
      var s = Math.floor((Date.now() - CALL.started) / 1000);
      var el = $('rt-call-timer');
      if (el) el.textContent = String(Math.floor(s / 60)) + ':' + ('0' + (s % 60)).slice(-2);
    }, 500);
  }
  function stopTimer(){
    if (CALL.timer){ clearInterval(CALL.timer); CALL.timer = null; }
    var tm = $('rt-call-timer');
    if (tm){ tm.classList.add('rt-hide'); tm.textContent = '00:00'; }
  }

  function newPC(){
    var pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'turn:openrelay.metered.ca:80', username: 'openrelayproject', credential: 'openrelayproject' }
      ],
      iceCandidatePoolSize: 4
    });
    pc.onicecandidate = function(e){
      if (!e.candidate || CALL.state === 'idle') return;
      var j = e.candidate.toJSON ? e.candidate.toJSON() : { candidate: e.candidate.candidate, sdpMid: e.candidate.sdpMid, sdpMLineIndex: e.candidate.sdpMLineIndex };
      post('/cand/' + (CALL.role === 'caller' ? 'caller' : 'callee'), { c: j, at: Date.now() }).catch(function(){});
    };
    pc.ontrack = function(e){
      var stream = (e.streams && e.streams[0]) ? e.streams[0] : null;
      if (!stream){ if (!CALL.remote) CALL.remote = new MediaStream(); CALL.remote.addTrack(e.track); stream = CALL.remote; }
      attachRemote(stream);
    };
    pc.onconnectionstatechange = function(){
      var s = pc.connectionState;
      if (s === 'connected'){ CALL.state = 'active'; setStatus('Connected'); startTimer(); }
      else if (s === 'failed'){ toast('Call failed - the network blocked it', 'error'); endCall(true); }
      else if (s === 'disconnected'){ setStatus('Reconnecting...'); }
    };
    return pc;
  }

  function media(type){
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return Promise.reject(new Error('no-media'));
    return navigator.mediaDevices.getUserMedia({ audio: true, video: type === 'video' ? { facingMode: 'user', width: { ideal: 640 } } : false });
  }

  function attachLocal(stream, type){
    var lv = $('rt-local-video');
    if (lv && type === 'video'){ lv.srcObject = stream; lv.className = 'rt-local-video on'; try { lv.play(); } catch(e){} }
  }

  function attachRemote(stream){
    var hasVideo = stream.getVideoTracks && stream.getVideoTracks().length > 0;
    var rv = $('rt-remote-video'), ra = $('rt-remote-audio');
    if (CALL.type === 'video' && hasVideo && rv){
      rv.srcObject = stream; rv.className = 'rt-remote-video on';
      try { rv.play(); } catch(e){}
      var av = $('rt-call-av'); if (av) av.style.display = 'none';
    }
    if (ra){ ra.srcObject = stream; if (CALL.type === 'video') ra.muted = true; try { ra.play(); } catch(e){} }
    setStatus('Connected');
    startTimer();
  }

  function drainIce(v, side){
    if (!v || typeof v !== 'object') return;
    Object.keys(v).forEach(function(k){
      var tag = side + ':' + k;
      if (seenCand[tag]) return;
      seenCand[tag] = 1;
      var c = v[k] && v[k].c;
      if (!c) return;
      if (!CALL.pc) return;
      if (!CALL.remoteSet){ CALL.pending.push(c); return; }
      try { CALL.pc.addIceCandidate(new RTCIceCandidate(c)).catch(function(){}); } catch(e){}
    });
  }
  function drain(){
    var q = CALL.pending.splice(0);
    q.forEach(function(c){
      if (!CALL.pc) return;
      try { CALL.pc.addIceCandidate(new RTCIceCandidate(c)).catch(function(){}); } catch(e){}
    });
  }

  function openUI(name, type, status){
    var box = $('rt-call');
    if (box) box.className = 'rt-call on';
    var n = $('rt-call-name'); if (n) n.textContent = name;
    setStatus(status);
    var av = $('rt-call-av');
    if (av){ av.style.display = ''; av.className = 'rt-call-av' + (CALL.state === 'calling' ? ' ring' : ''); }
    var cam = $('rt-cam');
    if (cam) cam.classList.toggle('rt-hide', type !== 'video');
    var lv = $('rt-local-video');
    if (lv) lv.className = 'rt-local-video' + (type === 'video' ? ' on' : '');
    var rv = $('rt-remote-video');
    if (rv) rv.className = 'rt-remote-video';
    var warn = $('rt-call-warn');
    if (warn) warn.classList.remove('rt-hide');
    stopTimer();
  }

  function closeUI(){
    var box = $('rt-call'); if (box) box.className = 'rt-call';
    var rm = $('rt-remote-video');
    if (rm){ rm.className = 'rt-remote-video'; try { rm.srcObject = null; } catch(e){} }
    var lv = $('rt-local-video');
    if (lv){ lv.className = 'rt-local-video'; try { lv.srcObject = null; } catch(e){} }
    var ra = $('rt-remote-audio');
    if (ra){ try { ra.srcObject = null; } catch(e){} }
    var box2 = $('rt-incoming'); if (box2) box2.className = 'rt-call';
  }

  function callSub(path, cb){
    var h = sub(path, cb);
    CALL.subs.push(h);
    return h;
  }

  function purgeCall(){
    del('/call').catch(function(){});
    del('/cand').catch(function(){});
    seenCand = {};
  }

  function teardown(){
    if (CALL.local){ CALL.local.getTracks().forEach(function(t){ try { t.stop(); } catch(e){} }); }
    try { if (CALL.pc) CALL.pc.close(); } catch(e){}
    CALL.subs.forEach(function(h){ try { h.close(); } catch(e){} });
    CALL.pc = null; CALL.local = null; CALL.id = null; CALL.role = null;
    CALL.subs = []; CALL.pending = []; CALL.remote = null; CALL.remoteSet = false;
    CALL.state = 'idle'; CALL.type = 'audio';
    ring(false); stopTimer(); closeUI();
  }

  function endCall(notify){
    var id = CALL.id;
    if (notify && id){
      patch('/call', { state: 'ended' }).then(function(){ setTimeout(purgeCall, 500); }).catch(function(){});
    } else if (id){
      purgeCall();
    }
    teardown();
  }

  function remoteEnded(){
    if (CALL.state === 'idle') return;
    toast(other() + ' ended the call', 'call_end');
    teardown();
  }

  function declineCall(){
    ring(false);
    var v = CALL.incoming;
    CALL.incoming = null;
    var box = $('rt-incoming'); if (box) box.className = 'rt-call';
    CALL.state = 'idle';
    if (v){ patch('/call', { state: 'declined' }).then(function(){ setTimeout(purgeCall, 500); }).catch(function(){}); }
  }

  function incomingCall(v){
    if (!v || !v.id || v.from === whoami()) return;
    if (CALL.state !== 'idle') return;
    if (v.state !== 'ringing') return;
    CALL.incoming = v;
    var box = $('rt-incoming'); if (box) box.className = 'rt-call on';
    var t = $('rt-in-name'); if (t) t.textContent = v.from;
    var s = $('rt-in-sub');
    if (s) s.textContent = (v.type === 'video' ? 'Video call' : 'Voice call') + ' is waiting';
    ring(true);
    try { if (window.LCNotify) window.LCNotify.show(v.from + ' is calling', (v.type === 'video' ? 'Video call' : 'Voice call') + ' - tap to answer', 'call-' + v.id, 'call', 'calls'); } catch(e){}
  }

  function startCall(type){
    if (CALL.state !== 'idle'){ toast('A call is already running', 'call'); return; }
    if (!live){ toast('Go online to place a call', 'cloud_off'); return; }
    if (!window.RTCPeerConnection || !navigator.mediaDevices){ toast('Calling is not available on this device', 'error'); return; }
    CALL.role = 'caller'; CALL.type = type; CALL.id = 'c' + Date.now().toString(36); CALL.state = 'calling';
    openUI(other(), type, 'Calling ' + other() + '...');
    logStep('ui-open');
    media(type).then(function(str){
      logStep('media-ok');
      CALL.local = str;
      attachLocal(str, type);
      CALL.pc = newPC();
      str.getTracks().forEach(function(t){ CALL.pc.addTrack(t, str); });
      return CALL.pc.createOffer();
    }).then(function(offer){
      logStep('offer-ok');
      return CALL.pc.setLocalDescription(offer).then(function(){ return offer; });
    }).then(function(offer){
      logStep('local-desc-ok');
      callSub('/cand/callee', function(v){ drainIce(v, 'callee'); });
      return patch('/call', {
        id: CALL.id, from: whoami(), to: other(), type: CALL.type, state: 'ringing',
        at: Date.now(), offer: { type: offer.type, sdp: offer.sdp }
      });
    }).catch(function(e){
      logStep('FAIL ' + (e && e.message));
      toast(e && e.message === 'no-media' ? 'Microphone permission was blocked' : 'Could not start the call', 'error');
      endCall(true);
    });
  }

  function acceptCall(){
    var v = CALL.incoming;
    if (!v) return;
    CALL.incoming = null;
    ring(false);
    var box = $('rt-incoming'); if (box) box.className = 'rt-call';
    CALL.role = 'callee'; CALL.type = v.type || 'audio'; CALL.id = v.id; CALL.state = 'connecting';
    openUI(v.from, CALL.type, 'Answering...');
    media(CALL.type).then(function(str){
      CALL.local = str;
      attachLocal(str, CALL.type);
      CALL.pc = newPC();
      str.getTracks().forEach(function(t){ CALL.pc.addTrack(t, str); });
      return CALL.pc.setRemoteDescription(new RTCSessionDescription(v.offer)).then(function(){
        CALL.remoteSet = true; drain();
        return CALL.pc.createAnswer();
      });
    }).then(function(ans){
      return CALL.pc.setLocalDescription(ans).then(function(){ return ans; });
    }).then(function(ans){
      callSub('/cand/caller', function(cv){ drainIce(cv, 'caller'); });
      return patch('/call', { state: 'accepted', answer: { type: ans.type, sdp: ans.sdp } });
    }).catch(function(){
      toast('Could not answer the call', 'error');
      declineCall();
    });
  }

  function onCall(v){
    if (!v || !v.id){
      if (CALL.state === 'calling' || CALL.state === 'connecting') remoteEnded();
      else if (CALL.state === 'active') remoteEnded();
      return;
    }
    if (CALL.state === 'idle' && v.state === 'ringing' && v.from !== whoami()){ incomingCall(v); return; }
    if (CALL.role === 'caller' && v.id === CALL.id){
      if (v.state === 'accepted' && v.answer && !CALL.remoteSet){
        CALL.remoteSet = true;
        CALL.state = 'active';
        try {
          CALL.pc.setRemoteDescription(new RTCSessionDescription(v.answer)).then(function(){
            setStatus('Connecting...'); drain();
          }).catch(function(){});
        } catch(e){}
      }
      if (v.state === 'declined'){ toast(other() + ' declined the call', 'call_end'); endCall(false); }
      if (v.state === 'ended'){ remoteEnded(); }
      return;
    }
    if (CALL.role === 'callee' && v.id === CALL.id && v.state === 'ended'){ remoteEnded(); }
  }

  function toggleMute(){
    if (!CALL.local) return;
    var on = true;
    CALL.local.getAudioTracks().forEach(function(t){ t.enabled = !t.enabled; on = t.enabled; });
    var b = $('rt-mute');
    if (b) b.className = 'rt-ctrl' + (on ? '' : ' off');
    var s = b && b.querySelector('span');
    if (s) s.textContent = on ? 'mic' : 'mic_off';
    toast(on ? 'Microphone on' : 'Muted', on ? 'mic' : 'mic_off');
  }
  function toggleCam(){
    if (!CALL.local) return;
    var on = true;
    CALL.local.getVideoTracks().forEach(function(t){ t.enabled = !t.enabled; on = t.enabled; });
    var b = $('rt-cam');
    if (b) b.className = 'rt-ctrl' + (on ? '' : ' off');
    var s = b && b.querySelector('span');
    if (s) s.textContent = on ? 'videocam' : 'videocam_off';
  }
  function toggleSpk(){
    var ra = $('rt-remote-audio');
    if (!ra) return;
    ra.muted = !ra.muted;
    var b = $('rt-spk');
    if (b) b.className = 'rt-ctrl' + (ra.muted ? ' off' : '');
    var s = b && b.querySelector('span');
    if (s) s.textContent = ra.muted ? 'volume_off' : 'volume_up';
  }

  function bindUI(){
    function hook(id, ev, fn){ var el = document.getElementById(id); if (el) el.addEventListener(ev, fn); }
    hook('rt-send', 'click', function(){
      var i = $('rt-input'); if (!i) return;
      send(i.value); i.value = ''; autogrow(i); i.focus();
    });
    var inp = $('rt-input');
    if (inp){
      inp.addEventListener('input', function(){
        autogrow(inp);
        var now = Date.now();
        if (now - typingAt < 2200) return;
        typingAt = now;
        put('/typing/' + enc(whoami()), now).catch(function(){});
      });
      inp.addEventListener('keydown', function(e){
        if (e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); send(inp.value); inp.value = ''; autogrow(inp); }
      });
    }
    hook('rt-attach', 'click', function(){ var f = $('rt-file'); if (f) f.click(); });
    var file = $('rt-file');
    if (file) file.addEventListener('change', function(){
      var f = file.files && file.files[0];
      file.value = '';
      if (!f) return;
      shrink(f, function(data){
        post('/chat', { from: whoami(), img: data, text: '', kind: 'image', at: Date.now() })
          .catch(function(){ toast('That photo is too large to send', 'image_not_supported'); });
      });
    });
    hook('rt-call-audio', 'click', function(){ startCall('audio'); });
    hook('rt-call-video', 'click', function(){ startCall('video'); });
    hook('rt-end', 'click', function(){ endCall(true); });
    hook('rt-accept', 'click', acceptCall);
    hook('rt-decline', 'click', declineCall);
    hook('rt-mute', 'click', toggleMute);
    hook('rt-cam', 'click', toggleCam);
    hook('rt-spk', 'click', toggleSpk);
  }

  function mountTab(){
    var bar = document.querySelector('#lt-footer .lt-bar');
    if (!bar || bar.querySelector('[data-tab="chat"]')) return;
    var a = document.createElement('a');
    a.className = 'lt-tab';
    a.setAttribute('data-tab', 'chat');
    a.setAttribute('data-goto', 'chat');
    a.setAttribute('role', 'tab');
    a.href = '#';
    a.innerHTML = '<span class="material-symbols-outlined lt-ico">forum</span><span class="lt-lbl">Chat</span>';
    var anchor = bar.querySelector('[data-tab="events"]');
    if (anchor) bar.insertBefore(a, anchor); else bar.appendChild(a);
  }

  function intercept(){
    window.triggerAction = function(type){
      if (type === 'message'){ window.__ltGo('chat'); var i = $('rt-input'); if (i) setTimeout(function(){ i.focus(); }, 120); return; }
      startCall(type === 'video' ? 'video' : 'audio');
    };
    document.addEventListener('click', function(e){
      var t = e.target;
      if (!t || !t.closest) return;
      var b = t.closest('button');
      if (b){
        var lab = String(b.getAttribute('aria-label') || '').toLowerCase();
        if (lab.indexOf('send hug') === 0){ e.preventDefault(); e.stopPropagation(); startCall('audio'); return; }
      }
      var g = t.closest('[data-goto="chat"]');
      if (g) setTimeout(function(){ renderChat(); scrollBottom(); }, 40);
    }, true);
    var go = window.__ltGo;
    if (go){
      window.__ltGo = function(s){
        go(s);
        if (s === 'chat'){ renderChat(); scrollBottom(); }
      };
    }
  }

  function start(){
   try {
    mountTab();
    bindUI();
    intercept();
    paintTitle();
    renderChat();
    if (!live){ console.log('[LCRT] local only'); return; }
    ensureAuth().catch(function(){}).then(function(){
    get('/state').then(function(v){
      if (v && v.state) applyRemote(v);
      else pushState(S());
    }).catch(function(){});
    sub('/state', applyRemote);
    sub('/chat', onChat);
    sub('/typing', function(v){ lastTyping = v || {}; paintTyping(); });
    sub('/presence', function(v){ lastPresence = v || {}; paintPresence(); });
    sub('/call', onCall);
    openStream();
    heartbeat();
    setInterval(function(){ paintTyping(); paintPresence(); }, 2500);
    console.log('[LCRT] live', ROOM, UID);
    });
   } catch(e){ console.log('[LCRT] start failed', e); }
  }

  window.LCRT = {
    start: start,
    pushState: pushState,
    renderChat: renderChat,
    send: send,
    call: startCall,
    hang: function(){ endCall(true); },
    room: ROOM,
    uid: UID,
    sub: sub,
    put: put,
    get: get,
    whoami: whoami,
    other: other,
    get live(){ return live; },
    get callState(){ return CALL.state; },
    get callType(){ return CALL.type; },
    get hasIncoming(){ return !!CALL.incoming; },
    get connected(){ return partnerOnline; },
    get online(){ return partnerOnline; },
    messages: function(){ return msgs; }
  };
})();
`;
