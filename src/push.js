export const PUSH_JS = `
(function(){
  var D = (window.__LC_DATA__ || {});
  var CFG = (D.firebase && D.firebase.config) || {};
  var DB = String(CFG.databaseURL || '');
  while (DB.length && DB.charAt(DB.length - 1) === '/') { DB = DB.slice(0, -1); }
  var ROOM = String((D.firebase && D.firebase.roomId) || 'shared');
  var ROOT = DB ? DB + '/lovecount/' + ROOM : '';
  var VAPID = 'BGX8DqUFygw4SA3uWiz4RiJ8RhCLPA-lb7m4cw6aLIPRdXJJwaKevsJbbaXm6nmVmLOr9cWX1hDgbMRWL7ubDPE';
  var DEVKEY = 'lc.push.dev.v1';
  var SYNC_MS = 30 * 60 * 1000;

  function role(){
    try { var s = JSON.parse(localStorage.getItem('lc.state.v1')) || {}; if (s.myRole) return s.myRole; } catch(e){}
    return (D.me && D.me.name) || 'Israel';
  }

  function dev(){
    var v = '';
    try { v = localStorage.getItem(DEVKEY) || ''; } catch(e){}
    if (!v){
      v = 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      try { localStorage.setItem(DEVKEY, v); } catch(e){}
    }
    return v;
  }

  function u8(base64){
    var pad = '='.repeat((4 - base64.length % 4) % 4);
    var s = (base64 + pad).replace(/-/g, '+').replace(/_/g, '/');
    var raw = atob(s);
    var out = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }

  function supported(){
    return ('serviceWorker' in navigator) && ('PushManager' in window) && ('Notification' in window) && !!VAPID && !!ROOT;
  }

  function perm(){
    try { return ('Notification' in window) ? Notification.permission : 'unsupported'; } catch(e){ return 'unsupported'; }
  }

  function save(sub){
    if (!ROOT) return Promise.resolve(false);
    var body = JSON.stringify({ role: role(), at: Date.now(), ua: (navigator.userAgent || '').slice(0, 140), sub: sub });
    return fetch(ROOT + '/push/' + encodeURIComponent(dev()) + '.json', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: body
    }).then(function(r){ return r.ok; }).catch(function(){ return false; });
  }

  function enable(){
    if (!supported()) return Promise.resolve(false);
    return Notification.requestPermission().then(function(p){
      if (p !== 'granted') return false;
      return navigator.serviceWorker.ready.then(function(reg){
        return reg.pushManager.getSubscription().then(function(ex){
          if (ex) return ex;
          return reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: u8(VAPID) });
        });
      }).then(function(s){
        return save(JSON.parse(JSON.stringify(s)));
      }).catch(function(){ return false; });
    });
  }

  function sync(){
    if (!supported() || perm() !== 'granted') return;
    navigator.serviceWorker.ready.then(function(reg){
      return reg.pushManager.getSubscription();
    }).then(function(s){
      if (s) return save(JSON.parse(JSON.stringify(s)));
      return enable();
    }).catch(function(){});
  }

  function disable(){
    if (ROOT){
      try { fetch(ROOT + '/push/' + encodeURIComponent(dev()) + '.json', { method: 'DELETE' }); } catch(e){}
    }
    try {
      navigator.serviceWorker.ready.then(function(reg){ return reg.pushManager.getSubscription(); })
        .then(function(s){ if (s) s.unsubscribe(); }).catch(function(){});
    } catch(e){}
  }

  function status(){
    return { supported: supported(), permission: perm(), device: dev(), role: role(), hasVapid: !!VAPID, room: ROOM };
  }

  function hook(){
    var btn = document.getElementById('lc-notif-enable');
    if (btn) btn.addEventListener('click', function(){ setTimeout(enable, 250); });
    var off = document.getElementById('lc-notif-disable');
    if (off) off.addEventListener('click', function(){ disable(); });
  }

  function boot(){
    hook();
    setTimeout(sync, 2500);
    document.addEventListener('visibilitychange', function(){ if (!document.hidden) sync(); });
    setInterval(sync, SYNC_MS);
  }

  window.LCPush = {
    enable: enable,
    sync: sync,
    disable: disable,
    status: status,
    supported: supported
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else setTimeout(boot, 60);
  window.addEventListener('load', function(){ setTimeout(boot, 300); });
})();
`;
