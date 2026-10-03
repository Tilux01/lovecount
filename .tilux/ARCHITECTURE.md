# LoveCount - Architecture

Expo/React Native shell (App.js) hosting ONE self-contained WebView document.
Sources of truth:
- src/appHtml.js    : base design screens (welcome, home, events, birthday, notes, note_detail, moments, care, settings) + inline nav/behaviour
- src/newscreens.js : core interactive screens (event/moment/note detail, add forms, cycle, notifications, search, profile, role, auth, about) + PAGE_JS
- src/pages3.js     : NEW layer - hydration of user data, extra wiring, and the Timeline / Care Log / Privacy pages (MORE_SCREENS + MORE_JS)
- src/runtime.js    : client runtime (state store, nav override, renderers, sheets, reminder engine, native bridge)
- src/realtime.js   : realtime layer - RTDB transport, state reconciliation, chat engine, WebRTC calling stack
- src/styles.js     : sheet/scrim/toast/form CSS tokens
- src/shell.js      : assembles the single document
Rebuild: node generate_html.js   ->   index.html
Verify : node verify.js          (jsdom harness, offline behaviour + reminders + nav)
         node verify_rt.mjs      (two live devices against the real backend: sync, chat, calling)
Serve  : ./serve.sh 8933         (http://127.0.0.1:8933 - needed for mic/camera, a secure context)
State  : localStorage key lc.state.v1

## Realtime backend
Transport is Firebase RTDB REST + one multiplexed Server-Sent Events stream.
The room comes from data.js firebase.roomId. Nothing needs npm.
  /lovecount/<room>/state            { rev, at, by, state }
  /lovecount/<room>/chat/<key>       { from, text, at, kind, img }
  /lovecount/<room>/typing/<role>    <ms timestamp>
  /lovecount/<room>/presence/<role>  { at, name }
  /lovecount/<room>/call             { id, from, to, type, state, offer, answer, at }
  /lovecount/<room>/cand/caller/<k>  { c, at }
  /lovecount/<room>/cand/callee/<k>  { c, at }
One EventSource on the room root feeds a local mirror; watchers are notified only when
their own slice changed by reference, so a keystroke ping never re-renders the chat.
When EventSource is unavailable the layer falls back to 3s polling.
State pushes are debounced 700ms, carry rev = max(Date.now(), lastRev + 1), and are
applied only when by !== our uid and rev > lastRev. myRole is device-local and never
overwritten by a remote push.
