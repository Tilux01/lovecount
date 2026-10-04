// ---------------------------------------------------------------------------
// LoveCount cloud layer - production auth + REAL-TIME sync.
//
// Why REST instead of the Firebase JS SDK?
//   This app ships as ONE inline HTML document inside a React Native WebView.
//   Its origin is null/about:blank, so the modular JS SDK cannot run (module
//   imports are blocked and Firebase Auth rejects a null origin). The REST
//   surface has no such problem, works offline-first, and needs no npm deps:
//
//     * Auth          -> Identity Toolkit REST (signup / signin / refresh / reset)
//     * Realtime DB   -> REST + Server-Sent Events  (true live two-way sync)
//     * Presence      -> heartbeat writes + onStream reconciliation
//     * Offline queue -> localStorage cache, auto-flush when the socket returns
//
// Exposes window.LCCloud.  No backticks and no "${" appear in this file on
// purpose, so it is safe to embed inside a template literal.
// ---------------------------------------------------------------------------
export const CLOUD_JS = `
(function(){
  if (window.LCCloud) return;
  var D = window.__LC_DATA__ || {};
  var C = D.firebase || {};
  var CFG = C.config || {};
  var API_KEY = CFG.apiKey || '';
  var PROJECT = CFG.projectId || '';
  var SK = 'lc.session.v1';
  var UK = 'lc.dburl.v1';
  var HB = 25000;

  var listeners = { state: [], ping: [], presence: [], pair: [], auth: [] };

  function log(){ try { var a = [].slice.call(arguments); a.unshift('[LCCloud]'); console.log.apply(console, a); } catch(e){} }
  function emit(ch, payload){ (listeners[ch] || []).forEach(function(f){ try { f(payload); } catch(e){ log('listener', e); } }); }
  function trimSlash(u){ u = String(u || ''); while (u.length && u.charAt(u.length - 1) === '/') u = u.slice(0, -1); return u; }
  function store(k, v){
    try {
      if (v === undefined) return localStorage.getItem(k);
      if (v === null) { localStorage.removeItem(k); return null; }
      localStorage.setItem(k, JSON.stringify(v)); return v;
    } catch(e){ return null; }
  }

  // ------------------------------------------------------------------ session
  var session = null;
  try { session = JSON.parse(localStorage.getItem(SK) || 'null'); } catch(e){ session = null; }
  function saveSession(s){
    session = s;
    try { if (s) localStorage.setItem(SK, JSON.stringify(s)); else localStorage.removeItem(SK); } catch(e){}
    emit('auth', s);
  }

  function fbError(j){
    var m = (j && j.error && j.error.message) || 'unknown_error';
    var map = {
      EMAIL_EXISTS: 'That email is already registered.',
      EMAIL_NOT_FOUND: 'No account found for that email.',
      INVALID_PASSWORD: 'Wrong password.',
      INVALID_LOGIN_CREDENTIALS: 'Wrong email or password.',
      INVALID_EMAIL: 'That email does not look right.',
      WEAK_PASSWORD: 'Password must be at least 6 characters.',
      MISSING_PASSWORD: 'Please enter a password.',
      TOO_MANY_ATTEMPTS_TRY_LATER: 'Too many attempts - try again later.',
      USER_DISABLED: 'This account has been disabled.',
      OPERATION_NOT_ALLOWED: 'Email sign-in is disabled in your Firebase project.',
      API_KEY_INVALID: 'Invalid Firebase API key.',
      QUOTA_EXCEEDED: 'Too many requests - try again shortly.',
      PASSWORD_LOGIN_DISABLED: 'Password sign-in is disabled in your Firebase project.'
    };
    return map[m] || String(m).replace(/_/g, ' ').toLowerCase();
  }

  function authPost(path, body){
    return fetch('https://identitytoolkit.googleapis.com/v1/accounts:' + path + '?key=' + API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function(r){
      return r.json().catch(function(){ return {}; }).then(function(j){
        if (!r.ok) { var e = new Error(fbError(j)); e.code = (j.error && j.error.message) || ''; throw e; }
        return j;
      });
    });
  }

  function fromIdToken(j, name){
    return {
      idToken: j.idToken,
      refreshToken: j.refreshToken,
      localId: j.localId,
      email: j.email,
      name: name || (session && session.name) || '',
      expiresAt: Date.now() + (parseInt(j.expiresIn, 10) || 3600) * 1000
    };
  }

  function refresh(){
    if (!session || !session.refreshToken) return Promise.reject(new Error('no session'));
    return fetch('https://securetoken.googleapis.com/v1/token?key=' + API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'grant_type=refresh_token&refresh_token=' + encodeURIComponent(session.refreshToken)
    }).then(function(r){
      return r.json().catch(function(){ return {}; }).then(function(j){
        if (!r.ok) throw new Error(fbError(j));
        return j;
      });
    }).then(function(j){
      var s = {
        idToken: j.id_token,
        refreshToken: j.refresh_token,
        localId: j.user_id,
        email: session.email,
        name: session.name || '',
        expiresAt: Date.now() + (parseInt(j.expires_in, 10) || 3600) * 1000
      };
      saveSession(s);
      return s.idToken;
    });
  }

  function token(){
    if (!session) return Promise.reject(new Error('not signed in'));
    if (session.expiresAt && session.expiresAt - Date.now() < 90000) {
      return refresh().catch(function(){ return session.idToken; });
    }
    return Promise.resolve(session.idToken);
  }

  // ---------------------------------------------------------------- database
  var dbUrl = store(UK) || C.databaseURL || '';
  var dbProbed = false;

  function candidates(){
    var p = PROJECT;
    var list = [];
    if (C.databaseURL) list.push(trimSlash(C.databaseURL));
    list.push('https://' + p + '-default-rtdb.firebaseio.com');
    list.push('https://' + p + '-default-rtdb.europe-west1.firebasedatabase.app');
    list.push('https://' + p + '-default-rtdb.asia-southeast1.firebasedatabase.app');
    list.push('https://' + p + '-default-rtdb.us-central1.firebasedatabase.app');
    list.push('https://' + p + '.firebaseio.com');
    return list;
  }

  function probe(){
    if (dbUrl && dbProbed) return Promise.resolve(dbUrl);
    var list = candidates();
    var i = 0;
    function attempt(){
      if (i >= list.length) return Promise.reject(new Error('Realtime Database not found for this project. Enable it in the Firebase console.'));
      var url = list[i++];
      var ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var t = setTimeout(function(){ if (ctl) ctl.abort(); }, 4500);
      return fetch(url + '/.json?shallow=true', ctl ? { signal: ctl.signal } : {})
        .then(function(r){ clearTimeout(t); dbUrl = url; dbProbed = true; store(UK, url); log('database', url, r.status); return url; })
        .catch(function(){ clearTimeout(t); return attempt(); });
    }
    return attempt();
  }

  function dbGet(path){
    return probe().then(function(){
      return token().then(function(t){
        return fetch(dbUrl + path + '.json?auth=' + encodeURIComponent(t))
          .then(function(r){ return r.json().catch(function(){ return null; }); });
      });
    });
  }

  function dbWrite(method, path, val){
    return probe().then(function(){
      return token().then(function(t){
        return fetch(dbUrl + path + '.json?auth=' + encodeURIComponent(t), {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(val)
        }).then(function(r){
          if (!r.ok) {
            return r.text().then(function(txt){
              if (r.status === 401 || r.status === 403) throw new Error('Database permission denied - paste the LoveCount rules in the Firebase console.');
              throw new Error('DB ' + r.status + ' ' + txt.slice(0, 160));
            });
          }
          return r.json().catch(function(){ return null; });
        });
      });
    });
  }

  function dbPut(path, val){ return dbWrite('PUT', path, val); }
  function dbPatch(path, val){ return dbWrite('PATCH', path, val); }
  function dbPost(path, val){ return dbWrite('POST', path, val); }
  function dbDelete(path){ return probe().then(function(){ return token().then(function(t){ return fetch(dbUrl + path + '.json?auth=' + encodeURIComponent(t), { method: 'DELETE' }); }); }); }

  // ------------------------------------------------------- live SSE streams
  var streams = {};

  function streamOpen(name, path, apply){
    if (streams[name]) { try { streams[name].close(); } catch(e){} streams[name] = null; }
    var mirror = {};
    var es = null;

    function connect(){
      token().then(function(t){
        if (!dbUrl) return probe().then(function(){ return token(); });
        return t;
      }).then(function(t){
        try {
          es = new EventSource(dbUrl + path + '.json?auth=' + encodeURIComponent(t));
        } catch(e){ fallback(); return; }
        streams[name] = es;
        es.addEventListener('put', function(ev){
          try {
            var msg = JSON.parse(ev.data);
            if (msg.path === '/') {
              mirror = msg.data || {};
            } else {
              setPath(mirror, msg.path, msg.data);
            }
            apply(mirror, 'put');
          } catch(e){ log('sse put parse', e); }
        });
        es.addEventListener('patch', function(ev){
          try {
            var msg = JSON.parse(ev.data);
            if (msg.path === '/') { Object.keys(msg.data || {}).forEach(function(k){ mirror[k] = msg.data[k]; }); }
            else { Object.keys(msg.data || {}).forEach(function(k){ setPath(mirror, msg.path + '/' + k, msg.data[k]); }); }
            apply(mirror, 'patch');
          } catch(e){ log('sse patch parse', e); }
        });
        es.addEventListener('keep-alive', function(){});
        es.addEventListener('cancel', function(){ fallback(); });
        es.addEventListener('auth_revoked', function(){ fallback(); });
        es.onerror = function(){ if (es && es.readyState === 2) fallback(); };
      }).catch(function(e){ log('stream open failed', name, e.message); fallback(); });

      function fallback(){
        if (streams[name] === 'polling') return;
        if (es) { try { es.close(); } catch(e){} }
        streams[name] = 'polling';
        log('stream fallback to polling:', name);
        setInterval(function(){
          if (streams[name] !== 'polling') return;
          token().then(function(t){
            return fetch(dbUrl + path + '.json?auth=' + encodeURIComponent(t));
          }).then(function(r){ return r.json(); }).then(function(j){
            mirror = j || {};
            apply(mirror, 'poll');
          }).catch(function(){});
        }, 8000);
      }
    }
    connect();
  }

  function setPath(obj, path, val){
    var parts = String(path).split('/').filter(function(s){ return s.length; });
    var cur = obj;
    for (var i = 0; i < parts.length - 1; i++) {
      if (typeof cur[parts[i]] !== 'object' || cur[parts[i]] === null) cur[parts[i]] = {};
      cur = cur[parts[i]];
    }
    if (parts.length) cur[parts[parts.length - 1]] = val;
  }

  function streamClose(name){ if (streams[name]) { try { streams[name].close(); } catch(e){} streams[name] = null; } }

  // ---------------------------------------------------------------- identity
  var user = session ? { uid: session.localId, email: session.email, name: session.name || '' } : null;
  var coupleId = null;
  var coupleCode = null;
  var profile = null;

  function me(){ return user; }

  function displayName(){
    if (profile && profile.name) return profile.name;
    if (user && user.name) return user.name;
    if (user && user.email) return String(user.email).split('@')[0];
    return 'You';
  }

  function code6(){
    var A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var s = '';
    for (var i = 0; i < 6; i++) s += A.charAt(Math.floor(Math.random() * A.length));
    return s;
  }

  function newId(){
    return 'c' + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
  }

  // -------------------------------------------------------------- account api
  function signUp(email, password, name){
    return authPost('signUp', { email: email, password: password, returnSecureToken: true })
      .then(function(j){
        saveSession(fromIdToken(j, name));
        user = { uid: j.localId, email: j.email, name: name || '' };
        return dbPut('/users/' + j.localId, { name: name || '', email: j.email, createdAt: Date.now() })
          .then(function(){ return user; }, function(){ return user; });
      });
  }

  function signIn(email, password){
    return authPost('signInWithPassword', { email: email, password: password, returnSecureToken: true })
      .then(function(j){
        saveSession(fromIdToken(j));
        user = { uid: j.localId, email: j.email, name: session.name || '' };
        return loadProfile().then(function(){ return user; });
      });
  }

  function resetPassword(email){
    return authPost('sendOobCode', { requestType: 'PASSWORD_RESET', email: email });
  }

  function signOut(){
    unlink();
    saveSession(null);
    user = null; coupleId = null; coupleCode = null; profile = null;
  }

  function loadProfile(){
    if (!user) return Promise.resolve(null);
    return dbGet('/users/' + user.uid).then(function(p){
      profile = p || null;
      if (profile) {
        if (profile.name) user.name = profile.name;
        if (profile.coupleId) coupleId = profile.coupleId;
        if (profile.code) coupleCode = profile.code;
      }
      return profile;
    }).catch(function(){ return null; });
  }

  // --------------------------------------------------------------- pairing
  function startPairing(name){
    if (!user) return Promise.reject(new Error('not signed in'));
    var cid = newId();
    var code = code6();
    coupleId = cid;
    coupleCode = code;
    var member = { name: name || displayName(), email: user.email, joinedAt: Date.now(), role: 'owner' };
    return dbPut('/couples/' + cid, {
      code: code,
      createdAt: Date.now(),
      members: (function(){ var o = {}; o[user.uid] = member; return o; })(),
      state: { rev: 1, updatedAt: Date.now(), updatedBy: user.uid, payload: null }
    })
      .then(function(){ return dbPut('/codes/' + code, cid); })
      .then(function(){ return dbPatch('/users/' + user.uid, { name: member.name, email: user.email, coupleId: cid, code: code }); })
      .then(function(){ profile = profile || {}; profile.coupleId = cid; return { coupleId: cid, code: code }; });
  }

  function joinPairing(code, name){
    if (!user) return Promise.reject(new Error('not signed in'));
    var up = String(code || '').trim().toUpperCase();
    if (up.length < 4) return Promise.reject(new Error('Enter the 6-character invite code.'));
    return dbGet('/codes/' + up).then(function(cid){
      if (!cid) throw new Error('That invite code does not exist. Check it with your partner.');
      coupleId = cid; coupleCode = up;
      var member = { name: name || displayName(), email: user.email, joinedAt: Date.now(), role: 'partner' };
      return dbPatch('/couples/' + cid + '/members/' + user.uid, member)
        .then(function(){ return dbPatch('/users/' + user.uid, { name: member.name, email: user.email, coupleId: cid, code: up }); })
        .then(function(){ profile = profile || {}; profile.coupleId = cid; return { coupleId: cid, code: up }; });
    });
  }

  function watchPairing(cb){
    if (!coupleId) return;
    streamOpen('pair', '/couples/' + coupleId + '/members', function(members){
      emit('pair', members || {});
      if (cb) cb(members || {});
    });
  }

  // ------------------------------------------------------------ state sync
  var rev = 0;
  var pushing = false;
  var pending = null;
  var stateApply = null;
  var lastRemoteRev = 0;

  function subscribeState(applyFn){
    stateApply = applyFn;
    if (!coupleId) return;
    streamOpen('state', '/couples/' + coupleId + '/state', function(node){
      if (!node || !node.payload) return;
      var r = node.rev || 0;
      if (r <= lastRemoteRev) return;
      lastRemoteRev = r;
      rev = r;
      try { applyFn(node.payload, node); } catch(e){ log('apply state', e); }
    });
  }

  function pushState(payload, meta){
    if (!coupleId || !user) return Promise.resolve(false);
    if (pushing) { pending = payload; return Promise.resolve(false); }
    pushing = true;
    rev += 1;
    return dbPut('/couples/' + coupleId + '/state', {
      rev: rev,
      updatedAt: Date.now(),
      updatedBy: user.uid,
      payload: payload
    }).then(function(){
      pushing = false;
      if (pending) { var p = pending; pending = null; return pushState(p, meta); }
      return true;
    }).catch(function(e){
      pushing = false;
      log('push failed', e.message);
      return false;
    });
  }

  // ------------------------------------------------------------- presence
  var hbTimer = null;

  function heartbeat(){
    if (!coupleId || !user) return;
    dbPatch('/presence/' + coupleId + '/' + user.uid, {
      name: displayName(),
      online: true,
      lastSeen: Date.now()
    }).catch(function(){});
  }

  function watchPresence(cb){
    if (!coupleId) return;
    if (hbTimer) clearInterval(hbTimer);
    heartbeat();
    hbTimer = setInterval(heartbeat, HB);
    streamOpen('presence', '/presence/' + coupleId, function(node){
      emit('presence', node || {});
      if (cb) cb(node || {});
    });
    window.addEventListener('beforeunload', function(){
      if (coupleId && user) {
        try {
          navigator.sendBeacon && navigator.sendBeacon(dbUrl + '/presence/' + coupleId + '/' + user.uid + '.json?auth=' + encodeURIComponent((session && session.idToken) || ''), JSON.stringify({ name: displayName(), online: false, lastSeen: Date.now() }));
        } catch(e){}
      }
    });
  }

  // --------------------------------------------------------------- pings
  function ping(kind){
    if (!coupleId || !user) return Promise.resolve(false);
    return dbPost('/couples/' + coupleId + '/pings', {
      from: user.uid,
      fromName: displayName(),
      kind: kind || 'kiss',
      at: Date.now()
    }).then(function(){ return true; }).catch(function(){ return false; });
  }

  var seenPing = {};
  function watchPings(cb){
    if (!coupleId) return;
    streamOpen('pings', '/couples/' + coupleId + '/pings', function(node){
      node = node || {};
      Object.keys(node).forEach(function(k){
        if (seenPing[k]) return;
        seenPing[k] = 1;
        var p = node[k] || {};
        if (p.from && user && p.from === user.uid) return;
        emit('ping', p);
        if (cb) cb(p);
      });
    });
  }

  function unlink(){
    Object.keys(streams).forEach(streamClose);
    if (hbTimer) { clearInterval(hbTimer); hbTimer = null; }
    if (coupleId && user) {
      dbPatch('/presence/' + coupleId + '/' + user.uid, { online: false, lastSeen: Date.now() }).catch(function(){});
    }
  }

  // ---------------------------------------------------------------- public
  window.LCCloud = {
    cfg: CFG,
    get enabled(){ return !!(API_KEY && PROJECT); },
    get user(){ return user; },
    get uid(){ return user ? user.uid : null; },
    get coupleId(){ return coupleId; },
    get code(){ return coupleCode; },
    get databaseUrl(){ return dbUrl; },
    get hasSession(){ return !!(session && session.refreshToken); },
    displayName: displayName,

    signUp: signUp,
    signIn: signIn,
    resetPassword: resetPassword,
    signOut: signOut,
    loadProfile: loadProfile,

    startPairing: startPairing,
    joinPairing: joinPairing,
    watchPairing: watchPairing,
    subscribeState: subscribeState,
    pushState: pushState,
    watchPresence: watchPresence,
    watchPings: watchPings,
    ping: ping,
    unlink: unlink,

    on: function(ch, fn){ (listeners[ch] = listeners[ch] || []).push(fn); return function(){ listeners[ch] = listeners[ch].filter(function(f){ return f !== fn; }); }; },
    probe: probe,
    dbGet: dbGet,
    dbPut: dbPut,
    dbPatch: dbPatch,
    dbPost: dbPost,
    dbDelete: dbDelete,
    _setDbUrl: function(u){ dbUrl = u; store(UK, u); }
  };

  log('ready', window.LCCloud.enabled ? 'live' : 'local-only');
})();
`;
